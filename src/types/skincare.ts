export type SkinType = "oily" | "dry" | "normal" | "combination" | "sensitive";
export type Concern = "acne" | "aging" | "dark spots" | "sensitivity" | "none";

export interface Routine {
  morning: string[];
  night: string[];
  tips?: string[];
}

export interface UserSelection {
  skinType: SkinType | null;
  concern: Concern | null;
}
