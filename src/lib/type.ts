// types/dog.ts
export type DogSize = "x-small" | "small" | "medium" | "large" | "x-large";
export type DogGender = "male" | "female";

export type Dog = {
  id: string;
  name: string;
  type: string;
  breed: string;
  age: number;
  gender: DogGender;
  size: DogSize;
  intakeDate: string; // ISO date string
  description: string;
  email: string;
  phone: string;
  altPhone: string;
  country: string;
  state: string;
  city: string;
  zipCode: string;
  address: string;
  isVaccinated: boolean;
  isSpayedNeutered: boolean;
  isHouseTrained: boolean;
  goodWithChildren: boolean;
  goodWithDogs: boolean;
  goodWithCats: boolean;
  hasSpecialNeeds: boolean;
  specialNeedsDescription?: string;
  medicalHistory: string;
  tags: string[];
  photos: {
    url: string;
    alt?: string;
  }[];
  featured?: boolean;
};

export type DogGridProps = {
  dogs?: Dog[];
  hasMore?: boolean;
  isLoading?: boolean;
  onLoadMore?: () => void;
  className?: string;
};
