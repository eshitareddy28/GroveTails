"use client";
import { CheckboxInput } from "@/components/reusable-components/CheckboxInput";
import { TextareaInput } from "@/components/reusable-components/TextAreaInput";
import {
  Syringe,
  Scissors,
  Home,
  Baby,
  Dog,
  Cat,
  AlertCircle,
} from "lucide-react";

interface FeaturesSectionProps {
  control: any;
}

export const FeaturesSection = ({ control }: FeaturesSectionProps) => {
  return (
    <section className="space-y-6 px-1">
      <h3 className="text-lg font-medium flex items-center gap-2">
        <Syringe className="h-5 w-5" />
        Features
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mr-1 ml-1">
        <CheckboxInput
          name="isVaccinated"
          label="Vaccinated"
          control={control}
        />

        <CheckboxInput
          name="isSpayedNeutered"
          label="Spayed/Neutered"
          control={control}
        />

        <CheckboxInput
          name="isHouseTrained"
          label="House Trained"
          control={control}
        />

        <CheckboxInput
          name="goodWithChildren"
          label="Good With Children"
          control={control}
        />

        <CheckboxInput
          name="goodWithDogs"
          label="Good With Dogs"
          control={control}
        />

        <CheckboxInput
          name="goodWithCats"
          label="Good With Cats"
          control={control}
        />

        <CheckboxInput
          name="hasSpecialNeeds"
          label="Has Special Needs"
          control={control}
        />
      </div>

      <TextareaInput
        name="specialNeedsDescription"
        label="Description"
        control={control}
        placeholder="Describe any special needs..."
        rows={4}
      />
    </section>
  );
};
