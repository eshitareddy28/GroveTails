// components/ShelterCard.tsx
"use client";
import Image from "next/image";
import { Home, MapPin, Heart } from "lucide-react";
import Link from "next/link";
import { Progress } from "./ui/progress";
import { Shelter } from "@/lib/mockShelters";

export const ShelterCard = ({ shelter }: { shelter: Shelter }) => {
  const occupancyPercentage = Math.round(
    (shelter.currentOccupancy / shelter.maxCapacity) * 100
  );

  // Simple image path construction
  const imagePath = `/shelters/${shelter.image}`;

  return (
    <div className="group overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 h-80 border border-light-secondary dark:border-dark-secondary">
      {/* Shelter Image - SIMPLIFIED */}
      <div className="relative h-1/2 w-full bg-gray-100">
        {shelter.image ? (
          <Image
            src={imagePath}
            alt={shelter.name}
            fill
            className="object-cover transition-all duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={false}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <Home className="w-12 h-12 text-gray-400" />
          </div>
        )}
      </div>

      {/* Shelter Info */}
      <div className="p-4 h-1/2 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-bold">{shelter.name}</h3>
            <button className="text-muted-foreground hover:text-primary">
              <Heart className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>{shelter.location}</span>
          </div>
        </div>

        {/* Capacity Indicator */}
        <div className="mt-2">
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium">Capacity</span>
            <span>
              {shelter.currentOccupancy}/{shelter.maxCapacity} (
              {occupancyPercentage}%)
            </span>
          </div>
          <Progress value={occupancyPercentage} className="h-2" />
        </div>

        {/* Action Button */}
        <Link
          href={`/shelters/${shelter.id}`}
          className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 rounded-full text-sm font-medium text-white transition-colors"
        >
          <Home className="w-4 h-4" />
          <span>View Shelter</span>
        </Link>
      </div>
    </div>
  );
};
