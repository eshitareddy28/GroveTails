import { sampleDogs } from "../mockPets";
import { Dog } from "../type";

export async function getDogById(id: string): Promise<Dog | undefined> {
  // Find the dog in our sample data
  return sampleDogs.find((dog) => dog.id === id);
}

export async function getAllDogs(): Promise<Dog[]> {
  // Return all sample dogs
  return sampleDogs;
}
