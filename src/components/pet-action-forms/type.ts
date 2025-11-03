// types.ts
export type FormType = "pet" | "shelter" | "adopt" | "foster" | "sponsor";

// Extended version with more specific types if needed
export type PetActionType = "adopt" | "foster" | "sponsor";
export type RegistrationType = "pet" | "shelter";

// Union type for all possible forms
export type AllFormTypes = FormType | PetActionType | RegistrationType;
