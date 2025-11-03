// Base shelter type
export type Shelter = {
  id: string;
  name: string;
  location: string;
  image?: string;
  maxCapacity: number;
  currentOccupancy: number;
  description?: string;
  contact: string;
  website?: string;
  establishedDate?: Date;
  accepts: AnimalType[]; // ['dog', 'cat', 'rabbit', etc.]
  facilities: Facility[];
  rating?: number;
  reviews?: Review[];
};

// Supporting types
export type AnimalType = "dog" | "cat" | "rabbit" | "bird" | "other";

export type Facility =
  | "medical"
  | "outdoor"
  | "grooming"
  | "training"
  | "isolation"
  | "foster-network";

export type Review = {
  id: string;
  userId: string;
  rating: number;
  comment: string;
  date: Date;
};

// Filter types
export type ShelterFilters = {
  location?: string;
  capacityStatus?: "high" | "medium" | "low";
  animalType?: AnimalType;
  facilities?: Facility[];
  searchQuery?: string;
};

// Props for components
export type ShelterGridProps = {
  shelters: Shelter[];
  className?: string;
};

export type ShelterCardProps = {
  shelter: Shelter;
  variant?: "compact" | "detailed";
  onFavoriteToggle?: (shelterId: string) => void;
};

// API response types
export type ShelterAPIResponse = {
  data: Shelter[];
  pagination: {
    total: number;
    page: number;
    limit: number;
  };
};

// For forms
export type ShelterRegistrationFormValues = {
  name: string;
  location: string;
  maxCapacity: number;
  contactEmail: string;
  phone: string;
  // ... other form fields
};
