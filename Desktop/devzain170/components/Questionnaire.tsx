// 'use client';

// import { useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { Card } from '@/components/ui/card';
// import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
// import { Label } from '@/components/ui/label';
// import { Input } from '@/components/ui/input';
// import { AlertCircle } from 'lucide-react';

// export interface QuestionnaireResponse {
//   fullName: string;
//   gender: 'male' | 'female';
//   ageGroup: 'under18' | '18-25' | '26-35' | '35+';
//   hairStage: 'stage0' | 'stage1' | 'stage2' | 'stage3' | 'stage4' | 'stage5';
//   familyHistory: 'father' | 'mother' | 'both' | 'none';
//   hairLossDuration: '<6m' | '6-12m' | '1-3y' | '3+y';
//   hairFallSeverity: 'mild' | 'moderate' | 'severe';
//   dandruff: 'none' | 'mild' | 'severe';
//   scalpType: 'normal' | 'oily' | 'dry';
//   minoxidilUse: 'no' | 'worked' | 'noResult';
//   finasterideUse: 'no' | 'working' | 'notWorking' | 'sideEffects';
//   healthConcerns: 'none' | 'bloodPressure' | 'lowLibido' | 'planningChild';
// }

// const HAIR_STAGES = [
//   { value: 'stage0', label: 'Full Hair (No Loss)', icon: '😊' },
//   { value: 'stage1', label: 'Slight Hairline Recession', icon: '🤔' },
//   { value: 'stage2', label: 'M-Shaped Hairline', icon: '😐' },
//   { value: 'stage3', label: 'Crown Thinning', icon: '😟' },
//   { value: 'stage4', label: 'Front + Crown Loss', icon: '😞' },
//   { value: 'stage5', label: 'Almost Bald', icon: '😔' },
// ];

// interface QuestionnaireProps {
//   onComplete: (response: QuestionnaireResponse) => void;
// }

// export function Questionnaire({ onComplete }: QuestionnaireProps) {
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [formData, setFormData] = useState<Partial<QuestionnaireResponse>>({});
//   const [errors, setErrors] = useState<Record<string, string>>({});

//   const questions: Array<{
//     key: keyof QuestionnaireResponse;
//     title: string;
//     type: 'text' | 'radio' | 'select';
//     options?: Array<{ label: string; value: string }>;
//     required?: boolean;
//   }> = [
//     {
//       key: 'fullName',
//       title: 'What is your full name?',
//       type: 'text',
//       required: true,
//     },
//     {
//       key: 'gender',
//       title: 'What is your gender?',
//       type: 'radio',
//       options: [
//         { label: 'Male', value: 'male' },
//         { label: 'Female', value: 'female' },
//       ],
//     },
//     {
//       key: 'ageGroup',
//       title: 'What is your age group?',
//       type: 'radio',
//       options: [
//         { label: 'Under 18', value: 'under18' },
//         { label: '18–25', value: '18-25' },
//         { label: '26–35', value: '26-35' },
//         { label: '35+', value: '35+' },
//       ],
//     },
//     {
//       key: 'hairStage',
//       title: 'Select your hair loss stage:',
//       type: 'radio',
//       options: HAIR_STAGES.map((stage) => ({
//         label: stage.label,
//         value: stage.value,
//       })),
//     },
//     {
//       key: 'familyHistory',
//       title: 'Family history of baldness?',
//       type: 'radio',
//       options: [
//         { label: 'Father Side', value: 'father' },
//         { label: 'Mother Side', value: 'mother' },
//         { label: 'Both', value: 'both' },
//         { label: 'None', value: 'none' },
//       ],
//     },
//     {
//       key: 'hairLossDuration',
//       title: 'How long have you experienced hair loss?',
//       type: 'radio',
//       options: [
//         { label: 'Less than 6 months', value: '<6m' },
//         { label: '6–12 months', value: '6-12m' },
//         { label: '1–3 years', value: '1-3y' },
//         { label: '3+ years', value: '3+y' },
//       ],
//     },
//     {
//       key: 'hairFallSeverity',
//       title: 'Hair fall severity?',
//       type: 'radio',
//       options: [
//         { label: 'Mild', value: 'mild' },
//         { label: 'Moderate', value: 'moderate' },
//         { label: 'Severe', value: 'severe' },
//       ],
//     },
//     {
//       key: 'dandruff',
//       title: 'Do you have dandruff or itching?',
//       type: 'radio',
//       options: [
//         { label: 'No', value: 'none' },
//         { label: 'Mild Dandruff', value: 'mild' },
//         { label: 'Severe Dandruff / Itching', value: 'severe' },
//       ],
//     },
//     {
//       key: 'scalpType',
//       title: 'What is your scalp type?',
//       type: 'radio',
//       options: [
//         { label: 'Normal', value: 'normal' },
//         { label: 'Oily', value: 'oily' },
//         { label: 'Dry', value: 'dry' },
//       ],
//     },
//     {
//       key: 'minoxidilUse',
//       title: 'Have you used Minoxidil (hair serum)?',
//       type: 'radio',
//       options: [
//         { label: 'No', value: 'no' },
//         { label: 'Yes (worked)', value: 'worked' },
//         { label: 'Yes (no result)', value: 'noResult' },
//       ],
//     },
//     {
//       key: 'finasterideUse',
//       title: 'Have you used Finasteride?',
//       type: 'radio',
//       options: [
//         { label: 'No', value: 'no' },
//         { label: 'Yes (working)', value: 'working' },
//         { label: 'Yes (not working)', value: 'notWorking' },
//         { label: 'Yes (side effects)', value: 'sideEffects' },
//       ],
//     },
//     {
//       key: 'healthConcerns',
//       title: 'Any health concerns?',
//       type: 'radio',
//       options: [
//         { label: 'None', value: 'none' },
//         { label: 'Blood Pressure / Heart Disease', value: 'bloodPressure' },
//         { label: 'Low Libido Concerns', value: 'lowLibido' },
//         { label: 'Planning Child', value: 'planningChild' },
//       ],
//     },
//   ];

//   const currentQ = questions[currentQuestion];
//   const progress = ((currentQuestion + 1) / questions.length) * 100;

//   const handleNext = () => {
//     if (!formData[currentQ.key]) {
//       setErrors({ [currentQ.key]: 'This field is required' });
//       return;
//     }
//     setErrors({});

//     if (currentQuestion < questions.length - 1) {
//       setCurrentQuestion(currentQuestion + 1);
//     } else {
//       onComplete(formData as QuestionnaireResponse);
//     }
//   };

//   const handleBack = () => {
//     if (currentQuestion > 0) {
//       setCurrentQuestion(currentQuestion - 1);
//       setErrors({});
//     }
//   };

//   const handleInputChange = (value: string) => {
//     setFormData((prev) => ({
//       ...prev,
//       [currentQ.key]: value,
//     }));
//     setErrors({});
//   };

//   const isAgeGroupIneligible = formData.ageGroup === 'under18';

//   return (
//     <div className="w-full max-w-2xl mx-auto py-8">
//       {isAgeGroupIneligible && (
//         <div className="mb-6 p-4 rounded-lg bg-red-100 border border-red-300 flex items-start gap-3">
//           <AlertCircle className="text-red-600 mt-0.5 flex-shrink-0" size={20} />
//           <div>
//             <p className="font-semibold text-red-800">Age Restriction</p>
//             <p className="text-sm text-red-700 mt-1">
//               This treatment is not suitable for users under 18 years old. Please consult with a healthcare professional.
//             </p>
//           </div>
//         </div>
//       )}

//       <Card className="p-8">
//         {/* Progress Bar */}
//         <div className="mb-8">
//           <div className="flex justify-between items-center mb-2">
//             <h2 className="text-2xl font-bold">Radiance360 Hair Assessment</h2>
//             <span className="text-sm font-medium text-muted-foreground">
//               Question {currentQuestion + 1} of {questions.length}
//             </span>
//           </div>
//           <div className="w-full bg-muted rounded-full h-2">
//             <div
//               className="bg-primary h-2 rounded-full transition-all duration-300"
//               style={{ width: `${progress}%` }}
//             />
//           </div>
//         </div>

//         {/* Question */}
//         <div className="mb-8">
//           <h3 className="text-xl font-semibold mb-6">{currentQ.title}</h3>

//           {currentQ.type === 'text' && (
//             <div>
//               <Input
//                 type="text"
//                 placeholder="Enter your full name"
//                 value={(formData[currentQ.key] as string) || ''}
//                 onChange={(e) => handleInputChange(e.target.value)}
//                 className="text-lg py-3"
//               />
//               {errors[currentQ.key] && (
//                 <p className="text-red-500 text-sm mt-2">{errors[currentQ.key]}</p>
//               )}
//             </div>
//           )}

//           {currentQ.type === 'radio' && (
//             <div className="space-y-3">
//               <RadioGroup
//                 value={(formData[currentQ.key] as string) || ''}
//                 onValueChange={handleInputChange}
//               >
//                 {currentQ.options?.map((option) => (
//                   <div key={option.value} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted transition-colors">
//                     <RadioGroupItem value={option.value} id={option.value} />
//                     <Label htmlFor={option.value} className="cursor-pointer flex-1 font-normal">
//                       {option.label}
//                     </Label>
//                   </div>
//                 ))}
//               </RadioGroup>
//               {errors[currentQ.key] && (
//                 <p className="text-red-500 text-sm mt-2">{errors[currentQ.key]}</p>
//               )}
//             </div>
//           )}
//         </div>

//         {/* Navigation */}
//         <div className="flex gap-4">
//           <Button
//             onClick={handleBack}
//             disabled={currentQuestion === 0}
//             variant="outline"
//             size="lg"
//             className="flex-1"
//           >
//             Back
//           </Button>
//           <Button
//             onClick={handleNext}
//             disabled={isAgeGroupIneligible && currentQuestion === 1}
//             size="lg"
//             className="flex-1"
//           >
//             {currentQuestion === questions.length - 1 ? 'Complete' : 'Next'}
//           </Button>
//         </div>
//       </Card>
//     </div>
//   );
// }


'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { AlertCircle } from 'lucide-react';

export interface QuestionnaireResponse {
  fullName: string;
  gender: 'male' | 'female';
  ageGroup: 'under18' | '18-25' | '26-35' | '35+';
  hairStage:
    | 'stage0'
    | 'stage1'
    | 'stage2'
    | 'stage3'
    | 'stage4'
    | 'stage5'
    | 'stage6'
    | 'stage7';
  familyHistory: 'father' | 'mother' | 'both' | 'none';
  hairLossDuration: '<6m' | '6-12m' | '1-3y' | '3+y';
  hairFallSeverity: 'mild' | 'moderate' | 'severe';
  dandruff: 'none' | 'mild' | 'severe';
  scalpType: 'normal' | 'oily' | 'dry';
  minoxidilUse: 'no' | 'worked' | 'noResult';
  finasterideUse: 'no' | 'working' | 'notWorking' | 'sideEffects';
  healthConcerns: 'none' | 'bloodPressure' | 'lowLibido' | 'planningChild';
}

const HAIR_STAGES = Array.from({ length: 8 }, (_, i) => ({
  value: `stage${i}`,
  label:
    i === 0
      ? 'Full Hair (No Loss)'
      : i === 1
      ? 'Slight Hairline Recession'
      : i === 2
      ? 'M-Shaped Hairline'
      : i === 3
      ? 'Crown Thinning'
      : i === 4
      ? 'Front + Crown Loss'
      : i === 5
      ? 'Almost Bald'
      : i === 6
      ? 'Advanced Balding'
      : 'Severe Balding',
  image: `/norwood scale/norwood-scale-${i}.png`,
}));

interface QuestionnaireProps {
  onComplete: (response: QuestionnaireResponse) => void;
}

export function Questionnaire({ onComplete }: QuestionnaireProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [formData, setFormData] = useState<Partial<QuestionnaireResponse>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const questions: Array<{
    key: keyof QuestionnaireResponse;
    title: string;
    type: 'text' | 'radio';
    options?: Array<{ label: string; value: string; image?: string }>;
  }> = [
    {
      key: 'fullName',
      title: 'What is your full name?',
      type: 'text',
    },
    {
      key: 'gender',
      title: 'What is your gender?',
      type: 'radio',
      options: [
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
      ],
    },
    {
      key: 'ageGroup',
      title: 'What is your age group?',
      type: 'radio',
      options: [
        { label: 'Under 18', value: 'under18' },
        { label: '18–25', value: '18-25' },
        { label: '26–35', value: '26-35' },
        { label: '35+', value: '35+' },
      ],
    },
    {
      key: 'hairStage',
      title: 'Select your hair loss stage:',
      type: 'radio',
      options: HAIR_STAGES,
    },
    {
      key: 'familyHistory',
      title: 'Family history of baldness?',
      type: 'radio',
      options: [
        { label: 'Father Side', value: 'father' },
        { label: 'Mother Side', value: 'mother' },
        { label: 'Both', value: 'both' },
        { label: 'None', value: 'none' },
      ],
    },
    {
      key: 'hairLossDuration',
      title: 'How long have you experienced hair loss?',
      type: 'radio',
      options: [
        { label: 'Less than 6 months', value: '<6m' },
        { label: '6–12 months', value: '6-12m' },
        { label: '1–3 years', value: '1-3y' },
        { label: '3+ years', value: '3+y' },
      ],
    },
    {
      key: 'hairFallSeverity',
      title: 'Hair fall severity?',
      type: 'radio',
      options: [
        { label: 'Mild', value: 'mild' },
        { label: 'Moderate', value: 'moderate' },
        { label: 'Severe', value: 'severe' },
      ],
    },
    {
      key: 'dandruff',
      title: 'Do you have dandruff or itching?',
      type: 'radio',
      options: [
        { label: 'No', value: 'none' },
        { label: 'Mild Dandruff', value: 'mild' },
        { label: 'Severe Dandruff / Itching', value: 'severe' },
      ],
    },
    {
      key: 'scalpType',
      title: 'What is your scalp type?',
      type: 'radio',
      options: [
        { label: 'Normal', value: 'normal' },
        { label: 'Oily', value: 'oily' },
        { label: 'Dry', value: 'dry' },
      ],
    },
    {
      key: 'minoxidilUse',
      title: 'Have you used Minoxidil (hair serum)?',
      type: 'radio',
      options: [
        { label: 'No', value: 'no' },
        { label: 'Yes (worked)', value: 'worked' },
        { label: 'Yes (no result)', value: 'noResult' },
      ],
    },
    {
      key: 'finasterideUse',
      title: 'Have you used Finasteride?',
      type: 'radio',
      options: [
        { label: 'No', value: 'no' },
        { label: 'Yes (working)', value: 'working' },
        { label: 'Yes (not working)', value: 'notWorking' },
        { label: 'Yes (side effects)', value: 'sideEffects' },
      ],
    },
    {
      key: 'healthConcerns',
      title: 'Any health concerns?',
      type: 'radio',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Blood Pressure / Heart Disease', value: 'bloodPressure' },
        { label: 'Low Libido Concerns', value: 'lowLibido' },
        { label: 'Planning Child', value: 'planningChild' },
      ],
    },
  ];

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleNext = () => {
    if (!formData[currentQ.key]) {
      setErrors({ [currentQ.key]: 'This field is required' });
      return;
    }

    setErrors({});

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      onComplete(formData as QuestionnaireResponse);
    }
  };

  const handleBack = () => {
    setCurrentQuestion((prev) => prev - 1);
    setErrors({});
  };

  const handleInputChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      [currentQ.key]: value,
    }));
  };

  const isAgeGroupIneligible = formData.ageGroup === 'under18';

  return (
    <div className="w-full max-w-2xl mx-auto py-8">
      {isAgeGroupIneligible && (
        <div className="mb-6 p-4 rounded-lg bg-red-100 border border-red-300 flex gap-3">
          <AlertCircle className="text-red-600 mt-1" size={20} />
          <div>
            <p className="font-semibold text-red-800">Age Restriction</p>
            <p className="text-sm text-red-700">
              Not suitable for users under 18.
            </p>
          </div>
        </div>
      )}

      <Card className="p-8 border border-border shadow-lg">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-2xl font-bold text-foreground">
              Radiance360 Hair Assessment
            </h2>
            <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
              Step {currentQuestion + 1} of {questions.length}
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-primary to-primary/80 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <h3 className="text-xl font-semibold mb-6">{currentQ.title}</h3>

        {/* TEXT */}
        {currentQ.type === 'text' && (
          <Input
            placeholder="Enter your full name"
            value={(formData[currentQ.key] as string) || ''}
            onChange={(e) => handleInputChange(e.target.value)}
          />
        )}

        {/* RADIO */}
        {currentQ.type === 'radio' && (
          <RadioGroup
            value={(formData[currentQ.key] as string) || ''}
            onValueChange={handleInputChange}
          >
            {currentQ.key === 'hairStage' ? (
              <div className="grid grid-cols-2 gap-4">
                {currentQ.options?.map((option) => (
                  <label
                    key={option.value}
                    htmlFor={option.value}
                    className={`border rounded-xl p-4 cursor-pointer text-center ${
                      formData[currentQ.key] === option.value
                        ? 'border-primary bg-primary/5'
                        : 'hover:bg-muted'
                    }`}
                  >
                    <RadioGroupItem
                      value={option.value}
                      id={option.value}
                      className="hidden"
                    />

                    <Image
                      src={option.image!}
                      alt={option.label}
                      width={100}
                      height={100}
                      className="mx-auto mb-2"
                    />

                    <p className="text-sm">{option.label}</p>
                  </label>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {currentQ.options?.map((option) => (
                  <div key={option.value} className="flex items-center gap-2">
                    <RadioGroupItem value={option.value} id={option.value} />
                    <Label htmlFor={option.value}>{option.label}</Label>
                  </div>
                ))}
              </div>
            )}
          </RadioGroup>
        )}

        {errors[currentQ.key] && (
          <p className="text-red-500 mt-2 text-sm">
            {errors[currentQ.key]}
          </p>
        )}

        {/* Buttons */}
        <div className="flex gap-4 mt-8">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentQuestion === 0}
            className="flex-1 border-primary text-primary hover:bg-primary/5"
          >
            Back
          </Button>

          <Button
            onClick={handleNext}
            disabled={isAgeGroupIneligible && currentQuestion === 1}
            className="flex-1 bg-primary hover:bg-primary/90 text-white"
          >
            {currentQuestion === questions.length - 1
              ? 'Complete'
              : 'Next'}
          </Button>
        </div>
      </Card>
    </div>
  );
}
