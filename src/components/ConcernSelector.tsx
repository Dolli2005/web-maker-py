import { Concern } from "@/types/skincare";
import { Button } from "@/components/ui/button";

interface ConcernSelectorProps {
  selectedConcern: Concern | null;
  onSelect: (concern: Concern) => void;
}

const concerns: { concern: Concern; emoji: string; description: string }[] = [
  { concern: "acne", emoji: "🔴", description: "Acne" },
  { concern: "aging", emoji: "⏰", description: "Aging" },
  { concern: "dark spots", emoji: "🌑", description: "Dark Spots" },
  { concern: "sensitivity", emoji: "💗", description: "Sensitivity" },
  { concern: "none", emoji: "😊", description: "None" }
];

export const ConcernSelector = ({ selectedConcern, onSelect }: ConcernSelectorProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-center">Any Specific Concern?</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {concerns.map(({ concern, emoji, description }) => (
          <Button
            key={concern}
            variant={selectedConcern === concern ? "default" : "outline"}
            className="h-24 flex flex-col gap-2 text-lg transition-all duration-300 hover:scale-105"
            onClick={() => onSelect(concern)}
          >
            <span className="text-3xl">{emoji}</span>
            <span className="capitalize">{description}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};
