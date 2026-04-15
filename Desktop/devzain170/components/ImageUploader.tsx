'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Upload, X, Check } from 'lucide-react';

type ImagePosition = 'front' | 'top' | 'left' | 'right';

interface UploadedImage {
  position: ImagePosition;
  file: File | null;
  preview: string | null;
}

interface ImageUploaderProps {
  onAnalyze: (images: Record<ImagePosition, File | null>) => void;
  isAnalyzing: boolean;
}

const POSITIONS = [
  { position: 'front' as ImagePosition, label: 'Front View', description: 'Face directly facing camera' },
  { position: 'top' as ImagePosition, label: 'Top View', description: 'Looking down at top of head' },
  { position: 'left' as ImagePosition, label: 'Left Side', description: 'Profile view from left' },
  { position: 'right' as ImagePosition, label: 'Right Side', description: 'Profile view from right' },
];

export function ImageUploader({ onAnalyze, isAnalyzing }: ImageUploaderProps) {
  const [images, setImages] = useState<Record<ImagePosition, UploadedImage>>({
    front: { position: 'front', file: null, preview: null },
    top: { position: 'top', file: null, preview: null },
    left: { position: 'left', file: null, preview: null },
    right: { position: 'right', file: null, preview: null },
  });

  const [showPositionSelector, setShowPositionSelector] = useState(false);
  const [selectedPositionForUpload, setSelectedPositionForUpload] = useState<ImagePosition | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handlePositionSelect = (position: ImagePosition) => {
    setSelectedPositionForUpload(position);
    setShowPositionSelector(false);
    setTimeout(() => {
      fileInputRef.current?.click();
    }, 0);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !selectedPositionForUpload) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const preview = event.target?.result as string;
      setImages((prev) => ({
        ...prev,
        [selectedPositionForUpload]: { position: selectedPositionForUpload, file, preview },
      }));
    };
    reader.readAsDataURL(file);
    
    e.target.value = '';
  };

  const removeImage = (position: ImagePosition) => {
    setImages((prev) => ({
      ...prev,
      [position]: { position, file: null, preview: null },
    }));
  };

  const uploadedCount = Object.values(images).filter((img) => img.file !== null).length;
  const hasAtLeastOneImage = uploadedCount > 0;

  const handleAnalyze = () => {
    if (!hasAtLeastOneImage) {
      alert('Please upload at least 1 photo');
      return;
    }

    const filesRecord: Record<ImagePosition, File | null> = {
      front: images.front.file,
      top: images.top.file,
      left: images.left.file,
      right: images.right.file,
    };

    onAnalyze(filesRecord);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">Hair Analysis Pro</h1>
        <p className="text-muted-foreground text-lg">Upload photos of your head for AI-powered baldness analysis</p>
      </div>

      {/* Upload Progress */}
      <Card className="p-6 mb-8 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Photos Uploaded (Minimum: 1)</p>
            <p className="text-3xl font-bold text-primary">{uploadedCount} / 4</p>
          </div>
          <div className="w-32 h-32 flex items-center justify-center">
            <div className="relative w-24 h-24">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  className="text-border"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeDasharray={`${(uploadedCount / 4) * 283} 283`}
                  className="text-primary transition-all duration-300"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-center">
                <span className="text-lg font-bold text-primary">{Math.round((uploadedCount / 4) * 100)}%</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Uploaded Images Display */}
      {uploadedCount > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">Your Uploads</h2>
          <div className="grid grid-cols-2 gap-4">
            {POSITIONS.map(({ position, label }) => (
              <div key={position} className="relative">
                {images[position].preview ? (
                  <div className="relative rounded-lg overflow-hidden border-2 border-primary bg-white">
                    <img
                      src={images[position].preview!}
                      alt={label}
                      className="w-full h-32 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        onClick={() => removeImage(position)}
                        className="bg-white rounded-lg p-2 hover:bg-gray-100"
                      >
                        <X size={20} className="text-black" />
                      </button>
                    </div>
                    <div className="absolute top-2 right-2 bg-primary text-white rounded-full p-2">
                      <Check size={16} />
                    </div>
                    <div className="bg-primary/10 p-2 text-center">
                      <p className="text-xs font-medium text-primary">{label}</p>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-lg border-2 border-dashed border-border h-32 flex items-center justify-center bg-muted/30">
                    <div className="text-center">
                      <p className="text-xs font-medium text-muted-foreground">{label}</p>
                      <p className="text-xs text-muted-foreground mt-1">Not uploaded</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Position Selector Modal */}
      {showPositionSelector && (
        <Card className="p-8 mb-8 bg-white border-2 border-primary">
          <h2 className="text-2xl font-bold text-foreground mb-6">Which side of your head?</h2>
          <div className="grid grid-cols-2 gap-4 mb-6">
            {POSITIONS.map(({ position, label, description }) => (
              <button
                key={position}
                onClick={() => handlePositionSelect(position)}
                disabled={images[position].file !== null}
                className={`p-4 rounded-lg border-2 text-left transition-all ${
                  images[position].file !== null
                    ? 'border-primary bg-primary/5 opacity-50 cursor-not-allowed'
                    : 'border-border hover:border-primary hover:bg-primary/5 cursor-pointer'
                }`}
              >
                <p className="font-semibold text-foreground">{label}</p>
                <p className="text-sm text-muted-foreground mt-1">{description}</p>
                {images[position].file !== null && (
                  <div className="mt-2 flex items-center gap-2">
                    <Check size={16} className="text-primary" />
                    <span className="text-xs font-medium text-primary">Uploaded</span>
                  </div>
                )}
              </button>
            ))}
          </div>
          <button
            onClick={() => setShowPositionSelector(false)}
            className="w-full py-2 px-4 rounded-lg border border-border text-foreground hover:bg-muted transition-colors"
          >
            Cancel
          </button>
        </Card>
      )}

      {/* Upload Button */}
      <div className="flex gap-4">
        <Button
          onClick={() => setShowPositionSelector(true)}
          disabled={uploadedCount === 4 || showPositionSelector}
          size="lg"
          className="flex-1 gap-2"
        >
          <Upload size={20} />
          Upload Image ({uploadedCount}/4)
        </Button>
        <Button
          onClick={handleAnalyze}
          disabled={!hasAtLeastOneImage || isAnalyzing}
          size="lg"
          className="flex-1"
        >
          {isAnalyzing ? 'Analyzing...' : 'Analyze Hair'}
        </Button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
}
