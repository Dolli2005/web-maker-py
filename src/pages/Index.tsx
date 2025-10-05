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
        <div className="text-center space-y-3 animate-[fadeIn_0.6s_ease-out]">
          <h1 className="text-5xl md:text-6xl font-bold gradient-primary bg-clip-text text-transparent animate-[scaleIn_0.8s_ease-out]">
            🌸 Skin Care Assistant 🌸
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-[fadeIn_0.8s_ease-out_0.3s] opacity-0 [animation-fill-mode:forwards]">
            Get personalized skincare recommendations based on your skin type and concerns
          </p>
        </div>

        {/* Progress Indicator */}
        {step !== "results" && (
          <div className="flex justify-center gap-2 animate-[fadeIn_0.5s_ease-out]">
            <div className={`h-2 w-24 rounded-full transition-all duration-500 ${step === "skinType" ? "bg-primary scale-105" : "bg-primary/30"}`} />
            <div className={`h-2 w-24 rounded-full transition-all duration-500 ${step === "concern" ? "bg-primary scale-105" : "bg-primary/30"}`} />
          </div>
        )}

        {/* Content */}
        <div className="glass-card rounded-3xl p-6 md:p-10 shadow-glow animate-[scaleIn_0.6s_ease-out] hover:shadow-[0_0_50px_hsl(var(--primary)/0.3)] transition-shadow duration-500">
          {step === "skinType" && (
            <div className="animate-[slideInUp_0.5s_ease-out]">
              <SkinTypeSelector
                selectedType={selection.skinType}
                onSelect={handleSkinTypeSelect}
              />
            </div>
          )}

          {step === "concern" && (
            <div className="space-y-6 animate-[slideInUp_0.5s_ease-out]">
              <ConcernSelector
                selectedConcern={selection.concern}
                onSelect={handleConcernSelect}
              />
              <div className="flex justify-center animate-[fadeIn_0.5s_ease-out_0.3s] opacity-0 [animation-fill-mode:forwards]">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelection({ ...selection, concern: null });
                    setStep("skinType");
                  }}
                  className="transition-all duration-300 hover:scale-105"
                >
                  Back to Skin Type
                </Button>
              </div>
            </div>
          )}

          {step === "results" && routine && selection.skinType && selection.concern && (
            <div className="animate-[scaleIn_0.6s_ease-out]">
              <RoutineDisplay
                routine={routine}
                skinType={selection.skinType}
                concern={selection.concern}
                onReset={handleReset}
              />
            </div>
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
