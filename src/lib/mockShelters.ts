// lib/mockShelters.ts
export interface Shelter {
  id: string;
  name: string;
  location: string;
  image: string;
  maxCapacity: number;
  currentOccupancy: number;
  description: string;
  contact: string;
  accepts: string[]; // Add this field
  facilities: string[]; // Add this field
}

export const sampleShelters: Shelter[] = [
  {
    id: "shelter1",
    name: "Paws Haven",
    location: "New York, NY",
    image: "shelter1.jpg",
    maxCapacity: 50,
    currentOccupancy: 42,
    description: "No-kill shelter specializing in senior dog care",
    contact: "contact@pawshaven.org",
    accepts: ["dogs", "cats"],
    facilities: ["outdoor space", "vet clinic", "grooming"],
  },
  {
    id: "shelter2",
    name: "Second Chance Rescue",
    location: "Chicago, IL",
    image: "/shelter2.jpg",
    maxCapacity: 30,
    currentOccupancy: 28,
    description: "Focuses on rehabilitation of abused animals",
    contact: "info@secondchancerescue.org",
    accepts: ["dogs", "cats", "rabbits"],
    facilities: ["training area", "isolation rooms"],
  },
  // Add more shelters as needed
];
