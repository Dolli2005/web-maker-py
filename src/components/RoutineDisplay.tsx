import { Routine, SkinType, Concern } from "@/types/skincare";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, RotateCcw } from "lucide-react";
import { generateRoutineText } from "@/lib/recommendations";
import { toast } from "sonner";

interface RoutineDisplayProps {
  routine: Routine;
  skinType: SkinType;
  concern: Concern;
  onReset: () => void;
}

export const RoutineDisplay = ({ routine, skinType, concern, onReset }: RoutineDisplayProps) => {
  const handleDownload = () => {
    const text = generateRoutineText(skinType, concern, routine);
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "skincare-routine.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Routine downloaded successfully!");
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2 animate-[fadeIn_0.5s_ease-out]">
        <h2 className="text-3xl font-bold gradient-primary bg-clip-text text-transparent animate-[scaleIn_0.6s_ease-out]">
          Your Personalized Routine ✨
        </h2>
        <p className="text-muted-foreground animate-[fadeIn_0.6s_ease-out_0.2s] opacity-0 [animation-fill-mode:forwards]">
          Skin Type: <span className="font-semibold capitalize">{skinType}</span> | 
          Concern: <span className="font-semibold capitalize">{concern}</span>
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="glass-card shadow-glow border-primary/20 animate-[slideInUp_0.6s_ease-out_0.3s] opacity-0 [animation-fill-mode:forwards] hover:shadow-[0_0_40px_hsl(var(--primary)/0.3)] hover:scale-[1.02] transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <span className="animate-[scaleIn_0.5s_ease-out_0.5s] inline-block opacity-0 [animation-fill-mode:forwards]">🌞</span>
              Morning Routine
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {routine.morning.map((step, index) => (
              <div 
                key={index} 
                className="flex gap-3 items-start animate-[fadeIn_0.4s_ease-out] opacity-0 [animation-fill-mode:forwards]"
                style={{ animationDelay: `${0.6 + index * 0.1}s` }}
              >
                <span className="text-xl flex-shrink-0">✅</span>
                <p className="text-foreground/90">{step}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="glass-card shadow-glow border-primary/20 animate-[slideInUp_0.6s_ease-out_0.4s] opacity-0 [animation-fill-mode:forwards] hover:shadow-[0_0_40px_hsl(var(--primary)/0.3)] hover:scale-[1.02] transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <span className="animate-[scaleIn_0.5s_ease-out_0.6s] inline-block opacity-0 [animation-fill-mode:forwards]">🌙</span>
              Night Routine
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {routine.night.map((step, index) => (
              <div 
                key={index} 
                className="flex gap-3 items-start animate-[fadeIn_0.4s_ease-out] opacity-0 [animation-fill-mode:forwards]"
                style={{ animationDelay: `${0.8 + index * 0.1}s` }}
              >
                <span className="text-xl flex-shrink-0">🌜</span>
                <p className="text-foreground/90">{step}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {routine.tips && routine.tips.length > 0 && (
        <Card className="glass-card shadow-glow border-accent/30 animate-[slideInUp_0.6s_ease-out_0.5s] opacity-0 [animation-fill-mode:forwards] hover:shadow-[0_0_40px_hsl(var(--accent)/0.3)] hover:scale-[1.02] transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <span className="animate-[scaleIn_0.5s_ease-out_0.7s] inline-block opacity-0 [animation-fill-mode:forwards]">💡</span>
              Extra Tips
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {routine.tips.map((tip, index) => (
              <div 
                key={index} 
                className="flex gap-3 items-start animate-[fadeIn_0.4s_ease-out] opacity-0 [animation-fill-mode:forwards]"
                style={{ animationDelay: `${1.2 + index * 0.1}s` }}
              >
                <span className="text-xl flex-shrink-0">👉</span>
                <p className="text-foreground/90">{tip}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      <div className="flex flex-col sm:flex-row gap-3 justify-center animate-[fadeIn_0.6s_ease-out_1s] opacity-0 [animation-fill-mode:forwards]">
        <Button
          onClick={handleDownload}
          size="lg"
          className="gap-2 transition-all duration-300 hover:scale-105 hover:shadow-glow"
        >
          <Download className="w-5 h-5" />
          Download Routine
        </Button>
        <Button
          onClick={onReset}
          size="lg"
          variant="outline"
          className="gap-2 transition-all duration-300 hover:scale-105"
        >
          <RotateCcw className="w-5 h-5" />
          Try Another
        </Button>
      </div>
    </div>
  );
};
