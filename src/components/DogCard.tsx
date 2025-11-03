"use client";

import Image from "next/image";
import {
  Heart,
  PawPrint,
  Dog as DogIcon,
  Ruler,
  Syringe,
  Home,
  Ribbon,
  Mars,
  Venus,
} from "lucide-react";
import { Dog } from "@/lib/type";
import { useEffect, useState } from "react";
import Link from "next/link";

export const DogCard = ({ dog }: { dog: Dog }) => {
  const [greeting, setGreeting] = useState("");

  const capitalizeName = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  useEffect(() => {
    const greetings = [
      `Hi! I'm ${capitalizeName(dog.name)} 🐾 Will you be my friend?`,
      `Looking for love! I'm ${capitalizeName(dog.name)} 💖`,
      `${capitalizeName(dog.name)} here! Ready for adventures!`,
      `Woof! ${capitalizeName(dog.name)} at your service!`,
      `Adopt me? I'm ${capitalizeName(dog.name)} and I promise to be good!`,
    ];
    setGreeting(greetings[Math.floor(Math.random() * greetings.length)]);
  }, [dog.name]);

  return (
    <div className="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 h-80">
      {/* Dog Image - updated to use photos array */}
      <div className="relative h-full w-full">
        <Image
          src={dog.photos?.[0]?.url || "/default-pet.jpg"}
          alt={dog.photos?.[0]?.alt || dog.name}
          fill
          className="object-cover transition-all duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          priority={dog.featured}
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300" />
      </div>

      {/* Card Content */}
      <div className="absolute inset-0 flex flex-col justify-between p-4 text-white z-10">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold drop-shadow-md">
              {capitalizeName(dog.name)}
            </h3>
            <div className="flex flex-wrap gap-1 mt-1">
              <span className="px-2 py-0.5 bg-black/30 backdrop-blur-sm rounded-full text-xs">
                {dog.breed}
              </span>
              <span className="px-2 py-0.5 bg-black/30 backdrop-blur-sm rounded-full text-xs">
                {dog.age} {dog.age === 1 ? "year" : "years"}
              </span>
            </div>
          </div>
          <button
            className="p-1.5 bg-black/30 rounded-full hover:bg-mint-400/30 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              console.log("Favorite", dog.name);
            }}
          >
            <Heart className="w-4 h-4" />
          </button>
        </div>

        <div className="translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 bg-black/80 backdrop-blur-md p-4 rounded-xl space-y-3">
          {greeting && <p className="text-center font-medium">{greeting}</p>}

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-1.5">
              <Ruler className="w-3 h-3 text-mint-200" />
              <span>{dog.size}</span>
            </div>
            <div className="flex items-center gap-1.5">
              {dog.gender === "female" ? (
                <Venus className="w-3 h-3 text-pink-400" /> // Female
              ) : (
                <Mars className="w-3 h-3 text-blue-400" /> // Male (♂ symbol)
              )}
              <span className="text-sm">{dog.gender}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Syringe className="w-3 h-3 text-mint-400" />
              <span>{dog.isVaccinated ? "Vaccinated" : "Needs shots"}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Home className="w-3 h-3 text-mint-200" />
              <span>{dog.isHouseTrained ? "Trained" : "In training"}</span>
            </div>
          </div>

          <div className="flex justify-center pt-2">
            <Link
              href={`/pet/${dog.id}`}
              className="flex items-center gap-1 px-4 py-2 bg-mint-400 hover:bg-mint-500 rounded-full text-sm font-medium transition-colors"
            >
              <DogIcon className="w-4 h-4" />
              <span>Learn About Me</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Personality Tags - updated to use tags */}
      <div className="absolute bottom-4 left-4 flex flex-wrap gap-1">
        {dog.tags?.slice(0, 3).map((trait) => (
          <span
            key={trait}
            className="px-2 py-0.5 text-white bg-mint-400/20 backdrop-blur-sm rounded-full text-xs"
          >
            {trait}
          </span>
        ))}
      </div>
    </div>
  );
};
