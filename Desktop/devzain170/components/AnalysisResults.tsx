// 'use client';

// import { Button } from '@/components/ui/button';
// import { Card } from '@/components/ui/card';
// import { Download, ArrowLeft, Printer } from 'lucide-react';
// import { useRef } from 'react';

// export interface HairAnalysis {
//   baldnessPercentage: number;
//   norwoodScale: string;
//   hairType: string;
//   hairColor: string;
//   affectedAreas: Array<{
//     name: string;
//     severity: string;
//   }>;
//   recommendations: string[];
//   markedImages: {
//     front: string;
//     top: string;
//     left: string;
//     right: string;
//   };
// }

// interface AnalysisResultsProps {
//   analysis: HairAnalysis;
//   onBack: () => void;
// }

// export function AnalysisResults({ analysis, onBack }: AnalysisResultsProps) {
//   const reportRef = useRef<HTMLDivElement>(null);

//   const handleExportPDF = () => {
//     if (!reportRef.current) return;

//     const printWindow = window.open('', '', 'height=600,width=800');
//     if (!printWindow) {
//       alert('Please allow pop-ups to export PDF');
//       return;
//     }

//     const content = reportRef.current.innerHTML;
//     printWindow.document.write(`
//       <!DOCTYPE html>
//       <html>
//         <head>
//           <title>Hair Analysis Report</title>
//           <style>
//             body {
//               font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
//               padding: 20px;
//               background: white;
//               color: #333;
//             }
//             @media print {
//               body { padding: 0; }
//               .no-print { display: none !important; }
//             }
//             .report-title {
//               font-size: 28px;
//               font-weight: bold;
//               margin-bottom: 20px;
//               color: #1a3a52;
//             }
//             .report-section {
//               margin-bottom: 30px;
//               page-break-inside: avoid;
//             }
//             .section-title {
//               font-size: 18px;
//               font-weight: 600;
//               margin-bottom: 15px;
//               color: #2c5aa0;
//               border-bottom: 2px solid #e0e0e0;
//               padding-bottom: 10px;
//             }
//             .images-grid {
//               display: grid;
//               grid-template-columns: 1fr 1fr;
//               gap: 20px;
//               margin-bottom: 20px;
//             }
//             .image-container {
//               text-align: center;
//               page-break-inside: avoid;
//             }
//             .image-container img {
//               max-width: 100%;
//               height: auto;
//               border: 1px solid #ddd;
//               border-radius: 8px;
//             }
//             .image-label {
//               margin-top: 10px;
//               font-weight: 600;
//               color: #555;
//             }
//             .metrics-grid {
//               display: grid;
//               grid-template-columns: 1fr 1fr;
//               gap: 20px;
//               margin-bottom: 20px;
//             }
//             .metric-card {
//               border: 1px solid #e0e0e0;
//               border-radius: 8px;
//               padding: 15px;
//               background: #f9f9f9;
//             }
//             .metric-label {
//               font-size: 12px;
//               color: #666;
//               text-transform: uppercase;
//               letter-spacing: 0.5px;
//               margin-bottom: 8px;
//             }
//             .metric-value {
//               font-size: 24px;
//               font-weight: bold;
//               color: #2c5aa0;
//             }
//             .severity-mild { color: #10b981; }
//             .severity-moderate { color: #f59e0b; }
//             .severity-severe { color: #ef4444; }
//             .recommendations-list {
//               list-style: none;
//               padding: 0;
//             }
//             .recommendations-list li {
//               padding: 10px 0;
//               padding-left: 25px;
//               position: relative;
//               border-bottom: 1px solid #f0f0f0;
//             }
//             .recommendations-list li:before {
//               content: "✓";
//               position: absolute;
//               left: 0;
//               color: #10b981;
//               font-weight: bold;
//             }
//           </style>
//         </head>
//         <body>
//           <div class="report-title">Hair Analysis Report</div>
//           ${content}
//         </body>
//       </html>
//     `);
//     printWindow.document.close();

//     setTimeout(() => {
//       printWindow.print();
//     }, 250);
//   };

//   const getSeverityColor = (severity: string) => {
//     switch (severity.toLowerCase()) {
//       case 'mild':
//         return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
//       case 'moderate':
//         return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
//       case 'severe':
//         return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
//       default:
//         return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
//     }
//   };

//   const getNorwoodDescription = (scale: string) => {
//     const descriptions: Record<string, string> = {
//       'I': 'No hair loss. Completely normal hairline.',
//       'II': 'Minimal hair loss at temples, barely noticeable.',
//       'III': 'Noticeable receding hairline, obvious hair loss begins.',
//       'IV': 'Significant receding with increased temple hair loss.',
//       'V': 'Temples and crown are bald with a band of hair remaining.',
//       'VI': 'Crown and temples are bald, hairline continues to recede.',
//       'VII': 'Most severe: only small amounts of hair remain.',
//       '1': 'No hair loss. Completely normal hairline.',
//       '2': 'Minimal hair loss at temples, barely noticeable.',
//       '3': 'Noticeable receding hairline, obvious hair loss begins.',
//       '4': 'Significant receding with increased temple hair loss.',
//       '5': 'Temples and crown are bald with a band of hair remaining.',
//       '6': 'Crown and temples are bald, hairline continues to recede.',
//       '7': 'Most severe: only small amounts of hair remain.',
//     };
//     return descriptions[scale] || 'Unknown scale';
//   };

//   return (
//     <div className="w-full max-w-6xl mx-auto py-8">
//       <div className="flex items-center justify-between mb-8">
//         <div>
//           <h1 className="text-4xl font-bold text-foreground mb-2">Analysis Results</h1>
//           <p className="text-muted-foreground">Your comprehensive AI-powered hair analysis report</p>
//         </div>
//         <div className="flex gap-4">
//           <Button onClick={onBack} variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/5">
//             <ArrowLeft size={20} className="mr-2" />
//             New Analysis
//           </Button>
//         </div>
//       </div>

//       <div ref={reportRef} className="bg-white dark:bg-slate-950 rounded-lg p-8 space-y-8">
//         {/* Summary Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//           <Card className="p-6 bg-gradient-to-br from-primary/15 to-primary/5 border border-primary/30">
//             <p className="text-sm font-medium text-primary/70 mb-2 uppercase tracking-wide">Baldness Level</p>
//             <p className="text-4xl font-bold text-primary">{analysis.baldnessPercentage}%</p>
//             <p className="text-xs text-muted-foreground mt-2">Of scalp affected</p>
//           </Card>

//           <Card className="p-6 bg-gradient-to-br from-primary/15 to-primary/5 border border-primary/30">
//             <p className="text-sm font-medium text-primary/70 mb-2 uppercase tracking-wide">Norwood Scale</p>
//             <p className="text-4xl font-bold text-primary">{analysis.norwoodScale}</p>
//             <p className="text-xs text-muted-foreground mt-2">Classification level</p>
//           </Card>

//           <Card className="p-6 bg-gradient-to-br from-primary/10 to-white border border-primary/20">
//             <p className="text-sm font-medium text-foreground/60 mb-2 uppercase tracking-wide">Hair Type</p>
//             <p className="text-xl font-bold text-foreground">{analysis.hairType}</p>
//             <p className="text-xs text-muted-foreground mt-2">Pattern classification</p>
//           </Card>

//           <Card className="p-6 bg-gradient-to-br from-primary/10 to-white border border-primary/20">
//             <p className="text-sm font-medium text-foreground/60 mb-2 uppercase tracking-wide">Hair Color</p>
//             <p className="text-xl font-bold text-foreground">{analysis.hairColor}</p>
//             <p className="text-xs text-muted-foreground mt-2">Detected color tone</p>
//           </Card>
//         </div>

//         {/* Marked Images */}
//         <div>
//           <h2 className="text-2xl font-bold text-foreground mb-4">Analyzed Images with Baldness Detection</h2>
//           <p className="text-muted-foreground mb-6">Red boxes indicate areas of detected baldness</p>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {(['front', 'top', 'left', 'right'] as const).map((position) => (
//               <div key={position} className="rounded-lg overflow-hidden border border-border bg-card">
//                 <img
//                   src={analysis.markedImages[position]}
//                   alt={`${position} view with analysis`}
//                   className="w-full h-auto"
//                 />
//                 <div className="p-4 bg-muted/50">
//                   <p className="font-semibold text-foreground capitalize">{position} View</p>
//                   <p className="text-sm text-muted-foreground">Analyzed with OpenAI Vision</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Detailed Analysis */}
//         <div className="space-y-6">
//           <div>
//             <h2 className="text-2xl font-bold text-foreground mb-4">Affected Areas</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//               {analysis.affectedAreas.map((area) => (
//                 <div key={area.name} className="flex items-center justify-between p-4 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors">
//                   <span className="font-medium text-foreground">{area.name}</span>
//                   <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSeverityColor(area.severity)}`}>
//                     {area.severity}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div>
//             <h2 className="text-2xl font-bold text-foreground mb-4">Norwood Scale Details</h2>
//             <Card className="p-6 bg-muted/50">
//               <p className="text-lg font-semibold text-foreground mb-2">{analysis.norwoodScale} - {getNorwoodDescription(analysis.norwoodScale)}</p>
//               <p className="text-sm text-muted-foreground">
//                 The Norwood Scale is the most widely used classification system for male pattern baldness. Your current classification indicates the extent and pattern of hair loss.
//               </p>
//             </Card>
//           </div>

//           <div>
//             <h2 className="text-2xl font-bold text-foreground mb-4">Personalized Recommendations</h2>
//             <div className="space-y-3">
//               {analysis.recommendations.map((rec, index) => (
//                 <div key={index} className="flex gap-4 p-4 rounded-lg border border-border bg-primary/5">
//                   <div className="flex-shrink-0">
//                     <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-primary/20">
//                       <span className="text-sm font-bold text-primary">{index + 1}</span>
//                     </div>
//                   </div>
//                   <p className="text-foreground">{rec}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="border-t border-border pt-8 mt-8">
//           <p className="text-xs text-muted-foreground text-center">
//             This analysis is generated using AI vision technology and should not be considered a medical diagnosis. For professional medical advice, consult a dermatologist.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

export interface HairAnalysis {
  baldnessPercentage: number;
  norwoodScale: string;
  hairType: string;
  hairColor: string;
  affectedAreas: Array<{
    name: string;
    severity: string;
  }>;
  recommendations: string[];
  markedImages: {
    front?: string;
    top?: string;
    left?: string;
    right?: string;
  };
}

interface AnalysisResultsProps {
  analysis: HairAnalysis;
  onBack: () => void;
}

export function AnalysisResults({ analysis, onBack }: AnalysisResultsProps) {
  const reportRef = useRef<HTMLDivElement>(null);

  // ✅ Track which images are VALID (loaded successfully)
  const [loadedImages, setLoadedImages] = useState<
    Partial<Record<'front' | 'top' | 'left' | 'right', boolean>>
  >({});

  // ✅ Preload & validate images
  useEffect(() => {
    const positions = ['front', 'top', 'left', 'right'] as const;

    positions.forEach((position) => {
      const src = analysis.markedImages[position];
      if (!src) return;

      const img = new Image();
      img.src = src;

      img.onload = () => {
        setLoadedImages((prev) => ({ ...prev, [position]: true }));
      };

      img.onerror = () => {
        setLoadedImages((prev) => ({ ...prev, [position]: false }));
      };
    });
  }, [analysis.markedImages]);

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'mild':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'moderate':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'severe':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const getNorwoodDescription = (scale: string) => {
    const descriptions: Record<string, string> = {
      'I': 'No hair loss. Completely normal hairline.',
      'II': 'Minimal hair loss at temples, barely noticeable.',
      'III': 'Noticeable receding hairline, obvious hair loss begins.',
      'IV': 'Significant receding with increased temple hair loss.',
      'V': 'Temples and crown are bald with a band of hair remaining.',
      'VI': 'Crown and temples are bald, hairline continues to recede.',
      'VII': 'Most severe: only small amounts of hair remain.',
      '1': 'No hair loss. Completely normal hairline.',
      '2': 'Minimal hair loss at temples, barely noticeable.',
      '3': 'Noticeable receding hairline, obvious hair loss begins.',
      '4': 'Significant receding with increased temple hair loss.',
      '5': 'Temples and crown are bald with a band of hair remaining.',
      '6': 'Crown and temples are bald, hairline continues to recede.',
      '7': 'Most severe: only small amounts of hair remain.',
    };
    return descriptions[scale] || 'Unknown scale';
  };

  // ✅ Get only successfully loaded images
  const validImages = (['front', 'top', 'left', 'right'] as const).filter(
    (pos) => loadedImages[pos]
  );

  return (
    <div className="w-full max-w-6xl mx-auto py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Analysis Results
          </h1>
          <p className="text-muted-foreground">
            Your comprehensive hair analysis report
          </p>
        </div>

        <Button onClick={onBack} variant="outline" size="lg">
          <ArrowLeft
            onClick={() => window.location.reload()}
            size={20}
            className="mr-2"
          />
          New Analysis
        </Button>
      </div>

      <div
        ref={reportRef}
        className="bg-white dark:bg-slate-950 rounded-lg p-8 space-y-8"
      >
        {/* Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-6">
            <p className="text-sm text-muted-foreground">Baldness</p>
            <p className="text-3xl font-bold text-primary">
              {analysis.baldnessPercentage}%
            </p>
          </Card>

          <Card className="p-6">
            <p className="text-sm text-muted-foreground">Norwood</p>
            <p className="text-3xl font-bold">{analysis.norwoodScale}</p>
          </Card>

          <Card className="p-6">
            <p className="text-sm text-muted-foreground">Hair Type</p>
            <p className="text-xl font-bold">{analysis.hairType}</p>
          </Card>

          <Card className="p-6">
            <p className="text-sm text-muted-foreground">Hair Color</p>
            <p className="text-xl font-bold">{analysis.hairColor}</p>
          </Card>
        </div>

        {/* Images */}
        {validImages.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">
              Analyzed Images with Baldness Detection
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {validImages.map((position) => (
                <div
                  key={position}
                  className="rounded-lg overflow-hidden border bg-card"
                >
                  <img
                    src={analysis.markedImages[position]}
                    alt={`${position} view`}
                    className="w-full h-auto"
                  />

                  <div className="p-4 bg-muted/50">
                    <p className="font-semibold capitalize">
                      {position} View
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Affected Areas */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Affected Areas</h2>

          <div className="grid md:grid-cols-2 gap-3">
            {analysis.affectedAreas.map((area) => (
              <div
                key={area.name}
                className="flex justify-between p-4 border rounded-lg"
              >
                <span>{area.name}</span>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${getSeverityColor(
                    area.severity
                  )}`}
                >
                  {area.severity}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Norwood */}
        <div>
          <h2 className="text-2xl font-bold mb-4">
            Norwood Scale Details
          </h2>

          <Card className="p-6">
            <p className="font-semibold">
              {analysis.norwoodScale} -{' '}
              {getNorwoodDescription(analysis.norwoodScale)}
            </p>
          </Card>
        </div>

        {/* Recommendations */}
        <div>
          <h2 className="text-2xl font-bold mb-4">
            Recommendations
          </h2>

          <div className="space-y-3">
            {analysis.recommendations.map((rec, i) => (
              <div key={i} className="p-4 border rounded-lg">
                {rec}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
