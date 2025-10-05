import { SkinType, Concern, Routine } from "@/types/skincare";

export const getRecommendations = (skinType: SkinType, concern: Concern): Routine | null => {
  const routines: Record<SkinType, Routine> = {
    oily: {
      morning: [
        "Cleanse with gentle foaming cleanser",
        "Use lightweight, oil-free moisturizer",
        "Apply broad-spectrum matte sunscreen SPF 30+"
      ],
      night: [
        "Double cleanse to remove oil & dirt",
        "Apply salicylic acid toner (2-3x per week)",
        "Use gel-based night moisturizer"
      ]
    },
    dry: {
      morning: [
        "Wash with hydrating cream cleanser",
        "Use hyaluronic acid serum",
        "Apply nourishing sunscreen SPF 30+"
      ],
      night: [
        "Cleanse with gentle cream cleanser",
        "Apply rich night cream or face oil",
        "Use overnight hydrating mask (1-2x per week)"
      ]
    },
    normal: {
      morning: [
        "Cleanse with mild gel cleanser",
        "Moisturize lightly",
        "Always wear sunscreen"
      ],
      night: [
        "Cleanse and apply toner",
        "Use niacinamide or antioxidant serum",
        "Moisturize with a balanced night cream"
      ]
    },
    combination: {
      morning: [
        "Cleanse gently",
        "Use lightweight moisturizer on T-zone",
        "Apply sunscreen SPF 30+"
      ],
      night: [
        "Cleanse deeply in oily areas",
        "Hydrate dry areas with thicker moisturizer",
        "Use clay mask weekly"
      ]
    },
    sensitive: {
      morning: [
        "Cleanse with fragrance-free gentle cleanser",
        "Apply soothing moisturizer with aloe vera",
        "Use mineral sunscreen (zinc oxide)"
      ],
      night: [
        "Cleanse with micellar water",
        "Apply calming cream with ceramides",
        "Avoid active serums, stick to gentle hydration"
      ]
    }
  };

  const concernTips: Record<Concern, string[]> = {
    acne: ["Add benzoyl peroxide or salicylic acid spot treatment."],
    aging: ["Include retinol at night & vitamin C serum in the morning."],
    "dark spots": ["Use niacinamide or vitamin C serum for brightening."],
    sensitivity: ["Avoid alcohol-based toners & fragrance-heavy products."],
    none: []
  };

  const routine = routines[skinType];
  if (!routine) {
    return null;
  }

  const result = { ...routine };
  
  if (concern !== "none" && concernTips[concern]?.length > 0) {
    result.tips = concernTips[concern];
  }

  return result;
};

export const generateRoutineText = (skinType: SkinType, concern: Concern, routine: Routine): string => {
  let text = `🌸 Skin Type: ${skinType}\n`;
  text += `🎯 Concern: ${concern}\n\n`;
  
  text += "🌞 Morning Routine:\n";
  routine.morning.forEach(step => {
    text += `  ✅ ${step}\n`;
  });
  
  text += "\n🌙 Night Routine:\n";
  routine.night.forEach(step => {
    text += `  🌜 ${step}\n`;
  });
  
  if (routine.tips && routine.tips.length > 0) {
    text += "\n💡 Extra Tips:\n";
    routine.tips.forEach(tip => {
      text += `  👉 ${tip}\n`;
    });
  }
  
  return text;
};
