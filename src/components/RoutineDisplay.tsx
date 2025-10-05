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
    <div className="space-y-6 animate-fade-in">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold gradient-primary bg-clip-text text-transparent">
          Your Personalized Routine ✨
        </h2>
        <p className="text-muted-foreground">
          Skin Type: <span className="font-semibold capitalize">{skinType}</span> | 
          Concern: <span className="font-semibold capitalize">{concern}</span>
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="glass-card shadow-glow border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <span>🌞</span>
              Morning Routine
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {routine.morning.map((step, index) => (
              <div key={index} className="flex gap-3 items-start">
                <span className="text-xl flex-shrink-0">✅</span>
                <p className="text-foreground/90">{step}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="glass-card shadow-glow border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <span>🌙</span>
              Night Routine
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {routine.night.map((step, index) => (
              <div key={index} className="flex gap-3 items-start">
                <span className="text-xl flex-shrink-0">🌜</span>
                <p className="text-foreground/90">{step}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {routine.tips && routine.tips.length > 0 && (
        <Card className="glass-card shadow-glow border-accent/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <span>💡</span>
              Extra Tips
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {routine.tips.map((tip, index) => (
              <div key={index} className="flex gap-3 items-start">
                <span className="text-xl flex-shrink-0">👉</span>
                <p className="text-foreground/90">{tip}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button
          onClick={handleDownload}
          size="lg"
          className="gap-2"
        >
          <Download className="w-5 h-5" />
          Download Routine
        </Button>
        <Button
          onClick={onReset}
          size="lg"
          variant="outline"
          className="gap-2"
        >
          <RotateCcw className="w-5 h-5" />
          Try Another
        </Button>
      </div>
    </div>
  );
};
