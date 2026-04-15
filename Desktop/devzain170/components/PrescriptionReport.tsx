'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PrescriptionResult } from '@/lib/prescriptionLogic';
import { AlertCircle, CheckCircle, Download, ArrowLeft } from 'lucide-react';

interface PrescriptionReportProps {
  prescription: PrescriptionResult;
  hairAnalysis: any;
  onBack: () => void;
}

export function PrescriptionReport({ prescription, hairAnalysis, onBack }: PrescriptionReportProps) {
  const [selectedStrategy, setSelectedStrategy] = useState<'quit' | 'maintenance' | null>(null);

  const getTreatmentProducts = () => prescription.recommendedProducts.filter((p) => p.category === 'treatment');
  const getScalpCareProducts = () => prescription.recommendedProducts.filter((p) => p.category === 'scalp-care');

  const hairScoreColor = prescription.hairScore >= 70 ? 'text-green-600' : prescription.hairScore >= 40 ? 'text-yellow-600' : 'text-red-600';

  return (
    <div className="w-full max-w-4xl mx-auto py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Radiance360 Prescription</h1>
          <p className="text-muted-foreground">Personalized AI-Powered Hair Treatment Plan</p>
        </div>
        <Button onClick={onBack} variant="outline" size="lg">
          <ArrowLeft size={20} className="mr-2" />
          Back
        </Button>
      </div>

      {/* Doctor Referral Alert */}
      {prescription.doctorReferral && (
        <div className="mb-6 p-4 rounded-lg bg-orange-100 border border-orange-300 flex items-start gap-3">
          <AlertCircle className="text-orange-600 mt-0.5 flex-shrink-0" size={20} />
          <div>
            <p className="font-semibold text-orange-800">Doctor Consultation Required</p>
            <p className="text-sm text-orange-700 mt-1">{prescription.doctorReferralReason}</p>
          </div>
        </div>
      )}

      {/* Patient Info & Scores */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="p-6 bg-gradient-to-br from-primary/15 to-primary/5 border border-primary/30">
          <p className="text-sm font-medium text-primary/70 mb-2 uppercase tracking-wide">Patient Name</p>
          <p className="text-2xl font-bold text-foreground">{prescription.patientName}</p>
        </Card>

        <Card className={`p-6 bg-gradient-to-br from-primary/15 to-primary/5 border border-primary/30`}>
          <p className="text-sm font-medium text-primary/70 mb-2 uppercase tracking-wide">Hair Health Score</p>
          <p className={`text-4xl font-bold ${hairScoreColor}`}>{prescription.hairScore}/100</p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-primary/10 to-white border border-primary/20">
          <p className="text-sm font-medium text-foreground/60 mb-2 uppercase tracking-wide">Hair Loss Stage</p>
          <p className="text-lg font-bold text-foreground">{prescription.hairStage}</p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-primary/10 to-white border border-primary/20">
          <p className="text-sm font-medium text-foreground/60 mb-2 uppercase tracking-wide">Baldness %</p>
          <p className="text-3xl font-bold text-primary">{hairAnalysis.baldnessPercentage}%</p>
        </Card>
      </div>

      {/* Condition Summary */}
      <Card className="p-6 mb-8 border-l-4 border-primary">
        <h2 className="text-xl font-bold text-foreground mb-2">Condition Summary</h2>
        <p className="text-muted-foreground leading-relaxed">{prescription.conditionSummary}</p>
      </Card>

      {/* Reason for Plan */}
      <Card className="p-6 mb-8 bg-accent/5">
        <h2 className="text-xl font-bold text-foreground mb-2">Why This Plan?</h2>
        <p className="text-muted-foreground leading-relaxed italic">{prescription.reasonForPlan}</p>
      </Card>

      {/* Recommended Products */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-4">Recommended Treatment Plan</h2>

        {/* Treatment Products */}
        {getTreatmentProducts().length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-foreground mb-3">Primary Treatment</h3>
            <div className="space-y-3">
              {getTreatmentProducts().map((product) => (
                <Card key={product.id} className="p-4 border-l-4 border-primary">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-bold text-foreground text-lg">{product.name}</p>
                      <p className="text-sm text-muted-foreground mt-1">{product.description}</p>
                      <div className="mt-2 text-sm text-muted-foreground">
                        <p>
                          <strong>Ingredients:</strong> {product.ingredients}
                        </p>
                        <p>
                          <strong>Frequency:</strong> {product.frequency}
                        </p>
                      </div>
                      {product.safetyNote && (
                        <div className="mt-2 p-2 bg-yellow-100 border border-yellow-300 rounded text-sm text-yellow-800">
                          ⚠️ {product.safetyNote}
                        </div>
                      )}
                    </div>
                    <CheckCircle className="text-green-600 mt-1 flex-shrink-0" size={24} />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Scalp Care Products */}
        {getScalpCareProducts().length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3">Scalp Care Support</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {getScalpCareProducts().map((product) => (
                <Card key={product.id} className="p-4 bg-muted/50">
                  <p className="font-semibold text-foreground">{product.name}</p>
                  <p className="text-sm text-muted-foreground mt-1">{product.description}</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    <strong>Frequency:</strong> {product.frequency}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Usage Instructions */}
      <Card className="p-6 mb-8">
        <h2 className="text-xl font-bold text-foreground mb-4">Usage Instructions</h2>
        <ol className="space-y-2">
          {prescription.usageInstructions.map((instruction, idx) => (
            <li key={idx} className="flex gap-3">
              <span className="font-bold text-primary flex-shrink-0">{idx + 1}.</span>
              <span className="text-muted-foreground">{instruction}</span>
            </li>
          ))}
        </ol>
      </Card>

      {/* Follow-up Timeline */}
      <Card className="p-6 mb-8 bg-blue-50 dark:bg-blue-950">
        <h2 className="text-xl font-bold text-foreground mb-2">Follow-up Timeline</h2>
        <p className="text-muted-foreground">{prescription.followUpTimeline}</p>
      </Card>

      {/* Post-Treatment Strategy */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-4">After Treatment: What's Next?</h2>
        <p className="text-muted-foreground mb-6">When you achieve desired results, you have two options:</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Quit Strategy */}
          <Card
            className={`p-6 cursor-pointer transition-all ${
              selectedStrategy === 'quit' ? 'border-2 border-primary bg-primary/5' : 'border-2 border-transparent'
            }`}
            onClick={() => setSelectedStrategy('quit')}
          >
            <h3 className="text-lg font-bold text-foreground mb-3">Quit Strategy</h3>
            <ul className="space-y-2 text-sm text-muted-foreground mb-4">
              <li className="flex gap-2">
                <span>✓</span>
                <span>Gradually taper dose over 4-8 weeks</span>
              </li>
              <li className="flex gap-2">
                <span>✓</span>
                <span>Completely stop treatment within 2 months</span>
              </li>
              <li className="flex gap-2">
                <span>✓</span>
                <span>Repeat full treatment cycle 4-6 months later</span>
              </li>
              <li className="flex gap-2">
                <span>✓</span>
                <span>Scalp care continues as preventive measure</span>
              </li>
            </ul>
            <p className="text-xs text-muted-foreground italic">Best for: Temporary treatment cycles with breaks</p>
          </Card>

          {/* Maintenance Strategy */}
          <Card
            className={`p-6 cursor-pointer transition-all ${
              selectedStrategy === 'maintenance' ? 'border-2 border-primary bg-primary/5' : 'border-2 border-transparent'
            }`}
            onClick={() => setSelectedStrategy('maintenance')}
          >
            <h3 className="text-lg font-bold text-foreground mb-3">Maintenance Strategy</h3>
            <ul className="space-y-2 text-sm text-muted-foreground mb-4">
              <li className="flex gap-2">
                <span>✓</span>
                <span>Do not completely stop treatment</span>
              </li>
              <li className="flex gap-2">
                <span>✓</span>
                <span>Reduce to maintenance dose: 2x per week</span>
              </li>
              <li className="flex gap-2">
                <span>✓</span>
                <span>Continue indefinitely for sustained results</span>
              </li>
              <li className="flex gap-2">
                <span>✓</span>
                <span>Low risk of hair loss relapse</span>
              </li>
            </ul>
            <p className="text-xs text-muted-foreground italic">Best for: Long-term hair retention</p>
          </Card>
        </div>
      </div>

      {/* Disclaimer */}
      <Card className="p-4 bg-muted/50 border-0">
        <p className="text-xs text-muted-foreground text-center">
          This prescription is AI-generated based on your questionnaire responses and hair analysis. It is not a medical diagnosis or prescription. Always consult a qualified dermatologist or healthcare professional before starting any treatment. Results may vary based on individual factors.
        </p>
      </Card>
    </div>
  );
}
