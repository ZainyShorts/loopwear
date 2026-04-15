import { QuestionnaireResponse } from '@/components/Questionnaire';

export interface Product {
  id: string;
  name: string;
  category: 'treatment' | 'scalp-care';
  description: string;
  ingredients: string;
  usage: string;
  frequency: string;
  safetyNote?: string;
}

export interface PrescriptionResult {
  patientName: string;
  hairScore: number;
  hairStage: string;
  conditionSummary: string;
  recommendedProducts: Product[];
  reasonForPlan: string;
  usageInstructions: string[];
  followUpTimeline: string;
  postTreatmentStrategy?: 'quit' | 'maintenance';
  doctorReferral: boolean;
  doctorReferralReason?: string;
}

// Product Database
const PRODUCTS: Record<string, Product> = {
  'xtra-hair': {
    id: 'xtra-hair',
    name: 'Xtra Hair (5% Minoxidil + 0.1% Finasteride)',
    category: 'treatment',
    description: 'Mild strength treatment for early stage hair loss. Safe for first-time users.',
    ingredients: '5% Minoxidil + 0.1% Finasteride',
    usage: 'Apply 1ml to affected scalp areas',
    frequency: 'Twice daily (morning and night)',
  },
  'xtra-hair-pro': {
    id: 'xtra-hair-pro',
    name: 'Xtra Hair Pro (6% Minoxidil + 0.3% Finasteride)',
    category: 'treatment',
    description: 'Enhanced strength for moderate hair loss. For users with prior treatment history.',
    ingredients: '6% Minoxidil + 0.3% Finasteride',
    usage: 'Apply 1ml to affected scalp areas',
    frequency: 'Twice daily (morning and night)',
  },
  'xtra-hair-pro-marshal': {
    id: 'xtra-hair-pro-marshal',
    name: 'Xtra Hair Pro Marshal (7% Minoxidil + Advanced Actives)',
    category: 'treatment',
    description: 'Maximum strength with advanced actives. For resistant or severe cases.',
    ingredients: '7% Minoxidil + Advanced actives',
    usage: 'Apply 1ml to affected scalp areas',
    frequency: 'Twice daily (morning and night)',
    safetyNote: 'Requires medical supervision',
  },
  'xtra-hair-ds': {
    id: 'xtra-hair-ds',
    name: 'Xtra Hair DS (6% Minoxidil + Dutasteride)',
    category: 'treatment',
    description: 'Specialized formula for users resistant to Finasteride.',
    ingredients: '6% Minoxidil + Dutasteride',
    usage: 'Apply 1ml to affected scalp areas',
    frequency: 'Twice daily (morning and night)',
    safetyNote: 'Requires medical supervision',
  },
  'xtra-hair-her': {
    id: 'xtra-hair-her',
    name: 'Xtra Hair HER (Female Formula)',
    category: 'treatment',
    description: 'Specially formulated for female hair loss patterns.',
    ingredients: 'Female-optimized Minoxidil + actives',
    usage: 'Apply 1ml to affected scalp areas',
    frequency: 'Twice daily (morning and night)',
  },
  'dhtra-pro-shampoo': {
    id: 'dhtra-pro-shampoo',
    name: 'DHTra Pro Shampoo (Ketoconazole)',
    category: 'scalp-care',
    description: 'Medicated shampoo for severe dandruff and scalp health.',
    ingredients: 'Ketoconazole 2%',
    usage: 'Massage into scalp and hair',
    frequency: '3-4 times per week',
  },
  'amynix-shampoo': {
    id: 'amynix-shampoo',
    name: 'Amynix Shampoo (Growth Support)',
    category: 'scalp-care',
    description: 'Growth-supporting formula for scalp health and hair vitality.',
    ingredients: 'Natural growth supporting compounds',
    usage: 'Massage into scalp and hair',
    frequency: 'Daily use',
  },
  'dandruff-x-serum': {
    id: 'dandruff-x-serum',
    name: 'DandruffX Pro Complex Serum',
    category: 'scalp-care',
    description: 'Advanced serum for severe dandruff and scalp inflammation.',
    ingredients: 'Salicylic Acid + Piroctone Olamine + Climbazole',
    usage: 'Apply to scalp sections',
    frequency: 'Twice daily after main treatment',
  },
};

function calculateHairScore(response: QuestionnaireResponse): number {
  let score = 100;

  // Stage penalty
  const stagePenalties: Record<string, number> = {
    stage0: 0,
    stage1: 10,
    stage2: 20,
    stage3: 35,
    stage4: 55,
    stage5: 85,
  };
  score -= stagePenalties[response.hairStage] || 0;

  // Duration penalty
  const durationPenalties: Record<string, number> = {
    '<6m': 5,
    '6-12m': 10,
    '1-3y': 15,
    '3+y': 20,
  };
  score -= durationPenalties[response.hairLossDuration] || 0;

  // Severity bonus loss
  if (response.hairFallSeverity === 'moderate') score -= 10;
  if (response.hairFallSeverity === 'severe') score -= 15;

  return Math.max(0, score);
}

function getHairStageLabel(stage: string): string {
  const labels: Record<string, string> = {
    stage0: 'No Hair Loss',
    stage1: 'Slight Hairline Recession',
    stage2: 'M-Shaped Hairline',
    stage3: 'Crown Thinning (Moderate)',
    stage4: 'Front + Crown Loss (Advanced)',
    stage5: 'Almost Bald (Severe)',
  };
  return labels[stage] || 'Unknown';
}

export function generatePrescription(response: QuestionnaireResponse): PrescriptionResult {
  const hairScore = calculateHairScore(response);
  const isEarlyStage = ['stage0', 'stage1', 'stage2'].includes(response.hairStage);
  const isModerateStage = ['stage3', 'stage4'].includes(response.hairStage);
  const isSevereStage = response.hairStage === 'stage5';
  const hasHealthConcern = response.healthConcerns !== 'none';
  const hasBPConcern = response.healthConcerns === 'bloodPressure';

  // Step 1: Gender-based
  const recommendedProducts: Product[] = [];
  let treatmentProduct = '';

  if (response.gender === 'female') {
    treatmentProduct = 'xtra-hair-her';
  } else {
    // Step 2: Safety Filter
    if (hasBPConcern) {
      treatmentProduct = 'xtra-hair';
    }
    // Step 3: First-time user rule
    else if (response.minoxidilUse === 'no') {
      treatmentProduct = 'xtra-hair';
    }
    // Step 4: Stage-based logic
    else if (isEarlyStage) {
      treatmentProduct = 'xtra-hair';
    } else if (isModerateStage) {
      if (response.minoxidilUse === 'no') {
        treatmentProduct = 'xtra-hair';
      } else {
        treatmentProduct = 'xtra-hair-pro';
      }
    } else if (isSevereStage) {
      // Step 5: Treatment history
      if (response.minoxidilUse === 'noResult') {
        treatmentProduct = 'xtra-hair-pro-marshal';
      } else {
        treatmentProduct = 'xtra-hair-pro';
      }
    }

    // Step 5: Treatment history overrides
    if (response.finasterideUse === 'notWorking') {
      treatmentProduct = 'xtra-hair-ds';
    }
  }

  if (treatmentProduct) {
    recommendedProducts.push(PRODUCTS[treatmentProduct]);
  }

  // Step 6: Dandruff logic
  if (response.dandruff === 'severe') {
    recommendedProducts.push(PRODUCTS['dhtra-pro-shampoo']);
    recommendedProducts.push(PRODUCTS['dandruff-x-serum']);
  } else if (response.dandruff === 'mild') {
    recommendedProducts.push(PRODUCTS['amynix-shampoo']);
    recommendedProducts.push(PRODUCTS['dandruff-x-serum']);
  } else {
    recommendedProducts.push(PRODUCTS['amynix-shampoo']);
  }

  // Determine if doctor referral needed
  let doctorReferral = false;
  let doctorReferralReason = '';

  if (isSevereStage && hasBPConcern) {
    doctorReferral = true;
    doctorReferralReason = 'Your hair loss stage is advanced and you have blood pressure concerns. Medical consultation is necessary before treatment.';
  }

  // Generate reason and instructions
  const conditionSummary = `Your hair is in the ${getHairStageLabel(response.hairStage)} stage with a hair health score of ${hairScore}/100. ${
    response.hairFallSeverity === 'severe'
      ? 'Severe hair fall is observed.'
      : response.hairFallSeverity === 'moderate'
        ? 'Moderate hair fall is noted.'
        : 'Mild hair fall is present.'
  }`;

  const reasonForPlan = generateReasonForPlan(response, hairScore);
  const usageInstructions = generateUsageInstructions(recommendedProducts);
  const followUpTimeline = generateFollowUpTimeline(response, hairScore);

  return {
    patientName: response.fullName,
    hairScore,
    hairStage: getHairStageLabel(response.hairStage),
    conditionSummary,
    recommendedProducts,
    reasonForPlan,
    usageInstructions,
    followUpTimeline,
    doctorReferral,
    doctorReferralReason,
  };
}

function generateReasonForPlan(response: QuestionnaireResponse, hairScore: number): string {
  const isNewUser = response.minoxidilUse === 'no';
  const stage = getHairStageLabel(response.hairStage);

  if (response.gender === 'female') {
    return `Aap female patient hain, isliye aapko Xtra Hair HER (female-specific formula) prescribe kiya ja raha hai jo aapke hair loss pattern ke liye optimized hai.`;
  }

  if (isNewUser) {
    return `Aap pehli bar treatment le rahe hain. Hum "Start Low, Escalate" approach follow karte hain. Xtra Hair se shuru karenge jo safe aur effective hai. Hair score: ${hairScore}/100.`;
  }

  if (response.minoxidilUse === 'noResult') {
    return `Minoxidil se aapko expected results nahi mile. Isliye Xtra Hair Pro Marshal recommend kiya ja raha hai jo stronger formulation hai.`;
  }

  if (response.finasterideUse === 'notWorking') {
    return `Finasteride aapke liye effective nahi raha. Xtra Hair DS (Dutasteride ke saath) try karte hain jo advanced option hai.`;
  }

  return `Your hair loss stage is ${stage}. We recommend this treatment plan based on your medical history and response to previous treatments.`;
}

function generateUsageInstructions(products: Product[]): string[] {
  const instructions: string[] = [];

  const treatmentProduct = products.find((p) => p.category === 'treatment');
  if (treatmentProduct) {
    instructions.push(`${treatmentProduct.name}: ${treatmentProduct.usage} ${treatmentProduct.frequency}`);
    if (treatmentProduct.safetyNote) {
      instructions.push(`Safety Note: ${treatmentProduct.safetyNote}`);
    }
  }

  const scalpProducts = products.filter((p) => p.category === 'scalp-care');
  scalpProducts.forEach((product) => {
    instructions.push(`${product.name}: ${product.usage} ${product.frequency}`);
  });

  instructions.push('Consistency is key. Apply treatments at the same time every day for best results.');
  instructions.push('Keep scalp clean and avoid harsh chemicals during treatment.');

  return instructions;
}

function generateFollowUpTimeline(response: QuestionnaireResponse, hairScore: number): string {
  if (hairScore >= 80) {
    return 'Follow-up in 3 months to monitor initial response. No urgent changes expected.';
  } else if (hairScore >= 50) {
    return 'Follow-up in 2-3 months to assess treatment efficacy. Be prepared for potential dosage adjustment.';
  } else {
    return 'Follow-up in 1-2 months. Early intervention is critical. Close monitoring required.';
  }
}
