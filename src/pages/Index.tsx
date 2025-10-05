import { useState } from "react";
import { SkinType, Concern, UserSelection, Routine } from "@/types/skincare";
import { SkinTypeSelector } from "@/components/SkinTypeSelector";
import { ConcernSelector } from "@/components/ConcernSelector";
import { RoutineDisplay } from "@/components/RoutineDisplay";
import { getRecommendations } from "@/lib/recommendations";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [step, setStep] = useState<"skinType" | "concern" | "results">("skinType");
  const [selection, setSelection] = useState<UserSelection>({
    skinType: null,
    concern: null,
  });
  const [routine, setRoutine] = useState<Routine | null>(null);

  const handleSkinTypeSelect = (skinType: SkinType) => {
    setSelection({ ...selection, skinType });
    setTimeout(() => setStep("concern"), 300);
  };

  const handleConcernSelect = (concern: Concern) => {
    setSelection({ ...selection, concern });
    if (selection.skinType) {
      const generatedRoutine = getRecommendations(selection.skinType, concern);
      if (generatedRoutine) {
        setRoutine(generatedRoutine);
        setTimeout(() => setStep("results"), 300);
      }
    }
  };

  const handleReset = () => {
    setSelection({ skinType: null, concern: null });
    setRoutine(null);
    setStep("skinType");
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-3 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold gradient-primary bg-clip-text text-transparent">
            🌸 Skin Care Assistant 🌸
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get personalized skincare recommendations based on your skin type and concerns
          </p>
        </div>

        {/* Progress Indicator */}
        {step !== "results" && (
          <div className="flex justify-center gap-2">
            <div className={`h-2 w-24 rounded-full transition-all ${step === "skinType" ? "bg-primary" : "bg-primary/30"}`} />
            <div className={`h-2 w-24 rounded-full transition-all ${step === "concern" ? "bg-primary" : "bg-primary/30"}`} />
          </div>
        )}

        {/* Content */}
        <div className="glass-card rounded-3xl p-6 md:p-10 shadow-glow animate-fade-in">
          {step === "skinType" && (
            <SkinTypeSelector
              selectedType={selection.skinType}
              onSelect={handleSkinTypeSelect}
            />
          )}

          {step === "concern" && (
            <div className="space-y-6">
              <ConcernSelector
                selectedConcern={selection.concern}
                onSelect={handleConcernSelect}
              />
              <div className="flex justify-center">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelection({ ...selection, concern: null });
                    setStep("skinType");
                  }}
                >
                  Back to Skin Type
                </Button>
              </div>
            </div>
          )}

          {step === "results" && routine && selection.skinType && selection.concern && (
            <RoutineDisplay
              routine={routine}
              skinType={selection.skinType}
              concern={selection.concern}
              onReset={handleReset}
            />
          )}
        </div>

        {/* Footer */}
        <div className="text-center text-muted-foreground text-sm animate-fade-in">
          <p>💖 Stay glowing with personalized skincare ✨</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
