import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// =========================
// TYPES
// =========================
interface BaldnessArea {
  name: string;
  severity: 'Mild' | 'Moderate' | 'Severe';
  x: number;
  y: number;
  width: number;
  height: number;
}

interface UserProfile {
  gender: string;
  minoxidilUse: string;
  finasterideUse: string;
  dandruff: string;
  healthConcerns: string;
  norwoodStage: number;
}

interface AnalysisResponse {
  baldnessPercentage: number;
  norwoodScale: string;
  hairType: string;
  hairColor: string;
  affectedAreas: { name: string; severity: string }[];
  recommendations: string[];
  markedImages: Record<string, string>;
}

// =========================
// AI IMAGE ANALYSIS
// =========================
async function analyzeImageWithOpenAI(imageBase64: string, position: string) {
  const prompt = `
Analyze this ${position} image for hair loss and hair characteristics.

Return ONLY valid JSON object with these fields:
{
  "baldnessLevel": "none|mild|moderate|severe",
  "estimatedPercentage": a number between 0-100,
  "norwoodStage": a number between 0-7,
  "affectedAreas": [
    {"name": "string describing area", "severity": "Mild|Moderate|Severe"}
  ],
  "hairType": "straight|wavy|curly|coily",
  "hairColor": "string describing color",
  "hairDensity": "high|medium|low",
  "observations": "string with detailed observations about hair loss pattern"
}
`;

  const response = await client.chat.completions.create({
    model: 'gpt-5.4',
    response_format: { type: 'json_object' },
    messages: [
      {
        role: 'user',
        content: [
          { type: 'image_url', image_url: { url: `data:image/jpeg;base64,${imageBase64}` } },
          { type: 'text', text: prompt },
        ],
      },
    ],
  });

  return JSON.parse(response.choices[0].message.content || '{}');
}



// =========================
// AI REFINEMENT
// =========================
async function refineRecommendationsWithAI(profile: UserProfile, analysisData: any) {
  try {
    console.log('Refining recommendations with AI for profile:', profile);
    const response = await client.chat.completions.create({
      model: 'gpt-4-turbo',
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'user',
          content: `
Based on the hair loss analysis and user profile below, provide personalized treatment recommendations and actionable insights.

User Profile:
- Gender: ${profile.gender}
- Currently using Minoxidil: ${profile.minoxidilUse}
- Currently using Finasteride: ${profile.finasterideUse}
- Dandruff severity: ${profile.dandruff}
- Health concerns: ${profile.healthConcerns}
- Detected Norwood Stage: ${profile.norwoodStage}

Hair Analysis Data:
- Baldness Percentage: ${analysisData.baldnessPercentage}%
- Hair Type: ${analysisData.hairType}
- Hair Color: ${analysisData.hairColor}
- Affected Areas: ${analysisData.affectedAreas.map((a: any) => a.name).join(', ') || 'General thinning'}

Provide 3-5 specific, actionable recommendations tailored to this user's situation. Include treatment options, lifestyle changes, and next steps.

Return ONLY valid JSON:
{
  "recommendations": [
    "recommendation 1",
    "recommendation 2",
    "recommendation 3"
  ],
  "immediateActions": ["action 1", "action 2"],
  "outlook": "brief prognosis or outlook message"
}
          `,
        },
      ],
    });

    const result = JSON.parse(response.choices[0].message.content || '{}');
    return result.recommendations || [];
  } catch (error) {
    console.error('AI refinement error:', error);
    return [];
  }
}

// =========================
// IMAGE MARKING
// =========================
async function markImage(imageBuffer: Buffer, areas: BaldnessArea[]) {
  const meta = await sharp(imageBuffer).metadata();
  const width = meta.width || 1000;
  const height = meta.height || 1000;

  let svg = `<svg width="${width}" height="${height}">`;

  areas.forEach((a) => {
    const x = (a.x / 100) * width;
    const y = (a.y / 100) * height;
    const w = (a.width / 100) * width;
    const h = (a.height / 100) * height;

    svg += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="red" stroke-width="3"/>`;
  });

  svg += `</svg>`;

  return sharp(imageBuffer)
    .composite([{ input: Buffer.from(svg) }])
    .jpeg()
    .toBuffer();
}

// =========================
// MAIN API - DYNAMIC IMAGE COUNT
// =========================
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    console.log('Received form data entries');

    const positions = ['front', 'top', 'left', 'right'] as const;
    const images: any = {};
    const analysisResults: any = {};
    const uploadedPositions: (typeof positions[number])[] = [];

    // USER DATA
    const userProfile: UserProfile = {
      gender: formData.get('gender') as string,
      minoxidilUse: formData.get('minoxidilUse') as string,
      finasterideUse: formData.get('finasterideUse') as string,
      dandruff: formData.get('dandruff') as string,
      healthConcerns: formData.get('healthConcerns') as string,
      norwoodStage: 0,
    };

    // PROCESS ONLY UPLOADED IMAGES (DYNAMIC COUNT)
    for (const pos of positions) {
      const file = formData.get(pos) as File | null;
      
      // Skip if no file provided for this position
      if (!file || file.size === 0) {
        continue;
      }

      uploadedPositions.push(pos);
      const buffer = Buffer.from(await file.arrayBuffer());
      const jpeg = await sharp(buffer).jpeg().toBuffer();

      images[pos] = jpeg;

      const base64 = jpeg.toString('base64');
      analysisResults[pos] = await analyzeImageWithOpenAI(base64, pos);
    }

    // Ensure at least one image was uploaded
    if (uploadedPositions.length === 0) {
      return NextResponse.json(
        { error: 'At least one image is required for analysis' },
        { status: 400 }
      );
    }

    // NORWOOD DETECTION (from any available image)
    const detectedNorwood =
      analysisResults.front?.norwoodStage ??
      analysisResults.top?.norwoodStage ??
      analysisResults.left?.norwoodStage ??
      analysisResults.right?.norwoodStage ??
      0;

    userProfile.norwoodStage = detectedNorwood;

    // AVERAGE BALDNESS (based on uploaded images only)
    const baldnessValues = uploadedPositions
      .map((pos) => analysisResults[pos]?.estimatedPercentage || 0)
      .filter((val) => val > 0);

    const avg = baldnessValues.length > 0 
      ? Math.round(baldnessValues.reduce((a, b) => a + b, 0) / baldnessValues.length)
      : 0;

    // AREAS
    const areas = uploadedPositions.flatMap(
      (pos) => analysisResults[pos]?.affectedAreas || []
    );

    // MARK IMAGES (only for uploaded images)
    const markedImages: any = {};
    for (const pos of uploadedPositions) {
      const buf = await markImage(images[pos], analysisResults[pos].affectedAreas || []);
      markedImages[pos] = `data:image/jpeg;base64,${buf.toString('base64')}`;
    }

    // Build analysis summary
    const analysisSummary = {
      baldnessPercentage: avg,
      norwoodScale: String(detectedNorwood),
      hairType: analysisResults.front?.hairType || analysisResults.top?.hairType || 'Unknown',
      hairColor: analysisResults.front?.hairColor || analysisResults.top?.hairColor || 'Unknown',
      affectedAreas: areas,
      imagesAnalyzed: uploadedPositions.length,
      observations: uploadedPositions.map(
        (pos) => `${pos}: ${analysisResults[pos]?.observations || 'No specific observations'}`
      ),
    };

    const finalRec = await refineRecommendationsWithAI(userProfile, analysisSummary);

    const result: AnalysisResponse = {
      baldnessPercentage: avg,
      norwoodScale: String(detectedNorwood),
      hairType: analysisSummary.hairType,
      hairColor: analysisSummary.hairColor,
      affectedAreas: areas,
      recommendations: finalRec,
      markedImages,
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error('Analysis error:', error);
    return NextResponse.json(
      { error: 'Server error during analysis. Please try again.' },
      { status: 500 }
    );
  }
}
