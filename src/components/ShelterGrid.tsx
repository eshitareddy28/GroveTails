import { Shelter } from "@/lib/shelterType";
import { ShelterCard } from "./ShelterCard";

export const ShelterGrid = ({ shelters }: { shelters: Shelter[] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {shelters.map((shelter) => (
        <ShelterCard key={shelter.id} shelter={shelter} />
      ))}
    </div>
  );
};
