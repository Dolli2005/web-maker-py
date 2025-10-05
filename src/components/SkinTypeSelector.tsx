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
            className="h-24 flex flex-col gap-2 text-lg transition-all duration-300 hover:scale-105 hover:shadow-glow animate-[fadeIn_0.4s_ease-out] hover:-translate-y-1"
            style={{ animationDelay: `${skinTypes.findIndex(st => st.type === type) * 0.1}s` }}
            onClick={() => onSelect(type)}
          >
            <span className="text-3xl transition-transform duration-300 group-hover:scale-110">{emoji}</span>
            <span className="capitalize">{description}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};
