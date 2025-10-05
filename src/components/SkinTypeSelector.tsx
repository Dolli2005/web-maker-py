import { SkinType } from "@/types/skincare";
import { Button } from "@/components/ui/button";

interface SkinTypeSelectorProps {
  selectedType: SkinType | null;
  onSelect: (type: SkinType) => void;
}

const skinTypes: { type: SkinType; emoji: string; description: string }[] = [
  { type: "oily", emoji: "💧", description: "Oily" },
  { type: "dry", emoji: "🏜️", description: "Dry" },
  { type: "normal", emoji: "✨", description: "Normal" },
  { type: "combination", emoji: "🌓", description: "Combination" },
  { type: "sensitive", emoji: "🌸", description: "Sensitive" }
];

export const SkinTypeSelector = ({ selectedType, onSelect }: SkinTypeSelectorProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-center">Choose Your Skin Type</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {skinTypes.map(({ type, emoji, description }) => (
          <Button
            key={type}
            variant={selectedType === type ? "default" : "outline"}
            className="h-24 flex flex-col gap-2 text-lg transition-all duration-300 hover:scale-105"
            onClick={() => onSelect(type)}
          >
            <span className="text-3xl">{emoji}</span>
            <span className="capitalize">{description}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};
