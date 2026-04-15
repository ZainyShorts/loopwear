'use client';

import { useState } from 'react';
import { ImageUploader } from '@/components/ImageUploader';
import { AnalysisResults, HairAnalysis } from '@/components/AnalysisResults';
import { Questionnaire, QuestionnaireResponse } from '@/components/Questionnaire';
import { PrescriptionReport } from '@/components/PrescriptionReport';
import { generatePrescription, PrescriptionResult } from '@/lib/prescriptionLogic';

type AppStep = 'questionnaire' | 'image-upload' | 'analysis-results' | 'prescription';

export default function Home() {
  const [currentStep, setCurrentStep] = useState<AppStep>('questionnaire');
  const [questionnaire, setQuestionnaire] = useState<QuestionnaireResponse | null>(null);
  const [analysis, setAnalysis] = useState<HairAnalysis | null>(null);
  const [prescription, setPrescription] = useState<PrescriptionResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleQuestionnaireComplete = (response: QuestionnaireResponse) => {
    if (response.ageGroup === 'under18') {
      alert('This treatment is not suitable for users under 18. Please consult a healthcare professional.');
      return;
    }
    setQuestionnaire(response);
    setCurrentStep('image-upload');
  };

  const handleAnalyze = async (images: Record<string, File | null>) => {
    if (!questionnaire) return;
    setIsAnalyzing(true);
    setError(null);

    const formData = new FormData();

    try {
      // Only append files that are not null (dynamic image count support)
      Object.entries(images).forEach(([position, file]) => {
        if (file) {
          formData.append(position, file);
        }
      });

    // ✅ ADD THIS
    formData.append('gender', questionnaire.gender);
    formData.append('minoxidilUse', questionnaire.minoxidilUse);
    formData.append('finasterideUse', questionnaire.finasterideUse);
    formData.append('dandruff', questionnaire.dandruff);
    formData.append('healthConcerns', questionnaire.healthConcerns);

      console.log('[v0] Sending analysis request to API...');
      const response = await fetch('/api/analyze-hair', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Analysis failed');
      }

      const result = await response.json();
      console.log('[v0] Analysis completed:', result);
      setAnalysis(result);
      setCurrentStep('analysis-results');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred during analysis';
      console.error('[v0] Analysis error:', err);
      setError(message);
      alert(`Error: ${message}`);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleGeneratePrescription = () => {
    if (questionnaire && analysis) {
      const generatedPrescription = generatePrescription(questionnaire);
      setPrescription(generatedPrescription);
      setCurrentStep('prescription');
    }
  };

  const handleBackToQuestionnaire = () => {
    setCurrentStep('questionnaire');
    setQuestionnaire(null);
    setAnalysis(null);
    setPrescription(null);
  };

  const handleBackFromPrescription = () => {
    setCurrentStep('analysis-results');
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-white font-bold text-lg">H</span>
            </div>
            <h1 className="text-xl font-bold text-foreground">Hair Analysis Pro</h1>
          </div>
          <div className="text-sm text-muted-foreground">AI-Powered Baldness Analysis</div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        {currentStep === 'questionnaire' && (
          <Questionnaire onComplete={handleQuestionnaireComplete} />
        )}

        {currentStep === 'image-upload' && (
          <ImageUploader onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
        )}

        {currentStep === 'analysis-results' && analysis && (
          <div>
            <AnalysisResults analysis={analysis} onBack={handleBackToQuestionnaire} />
            <div className="mt-8 flex justify-center">
              <button
                onClick={handleGeneratePrescription}
                className="px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl"
              >
                Generate Radiance360 Prescription
              </button>
            </div>
          </div>
        )}

        {currentStep === 'prescription' && prescription && analysis && (
          <PrescriptionReport
            prescription={prescription}
            hairAnalysis={analysis}
            onBack={handleBackFromPrescription}
          />
        )}
      </div>
    </main>
  );
}
