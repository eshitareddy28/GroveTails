// components/DogGrid.tsx

import { Dog } from "@/lib/type";
import { DogCard } from "./DogCard";

export const DogGrid = ({ dogs }: { dogs: Dog[] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {dogs.map((dog) => (
        <DogCard key={dog.id} dog={dog} />
      ))}
    </div>
  );
};
