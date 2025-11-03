// components/DogFilterPanel.tsx
"use client";

import { Button } from "@/components/ui/button";
import { SlidersHorizontal, X } from "lucide-react";
import { Dog, DogGender, DogSize } from "@/lib/type";

interface DogFilterPanelProps {
  filters: Partial<Dog>;
  setFilters: (filters: Partial<Dog>) => void;
}

export const DogFilterPanel = ({
  filters,
  setFilters,
}: DogFilterPanelProps) => {
  const sizes: DogSize[] = ["x-small", "small", "medium", "large", "x-large"];
  const genders: DogGender[] = ["male", "female"];
  const goodWithOptions = ["children", "dogs", "cats"] as const;

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setFilters({})}
          className="text-sm"
        >
          Clear all
        </Button>
      </div>

      <div className="space-y-6">
        {/* Size Filter */}
        <div>
          <h4 className="text-sm font-medium mb-2">Size</h4>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <Button
                key={size}
                variant={filters.size === size ? "default" : "outline"}
                size="sm"
                onClick={() =>
                  setFilters({
                    ...filters,
                    size: filters.size === size ? undefined : size,
                  })
                }
              >
                {size.replace("-", " ")}
              </Button>
            ))}
          </div>
        </div>

        {/* Gender Filter */}
        <div>
          <h4 className="text-sm font-medium mb-2">Gender</h4>
          <div className="flex flex-wrap gap-2">
            {genders.map((gender) => (
              <Button
                key={gender}
                variant={filters.gender === gender ? "default" : "outline"}
                size="sm"
                onClick={() =>
                  setFilters({
                    ...filters,
                    gender: filters.gender === gender ? undefined : gender,
                  })
                }
              >
                {gender}
              </Button>
            ))}
          </div>
        </div>

        {/* "Good With" Toggles */}
        <div>
          <h4 className="text-sm font-medium mb-2">Good With</h4>
          <div className="flex flex-wrap gap-2">
            {goodWithOptions.map((option) => (
              <Button
                key={option}
                variant={
                  filters[
                    `goodWith${
                      option.charAt(0).toUpperCase() + option.slice(1)
                    }` as keyof Dog
                  ]
                    ? "default"
                    : "outline"
                }
                size="sm"
                onClick={() =>
                  setFilters({
                    ...filters,
                    [`goodWith${
                      option.charAt(0).toUpperCase() + option.slice(1)
                    }`]:
                      !filters[
                        `goodWith${
                          option.charAt(0).toUpperCase() + option.slice(1)
                        }`
                      ],
                  })
                }
              >
                {option}
              </Button>
            ))}
          </div>
        </div>

        {/* Special Needs Toggle */}
        <div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="specialNeeds"
              checked={filters.hasSpecialNeeds || false}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  hasSpecialNeeds: e.target.checked || undefined,
                })
              }
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label htmlFor="specialNeeds" className="text-sm">
              Special Needs Only
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
