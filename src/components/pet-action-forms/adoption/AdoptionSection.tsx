"use client";
import { Home, Users, Clock, HeartPulse } from "lucide-react";
import { TextareaInput } from "@/components/reusable-components/TextAreaInput";
import { CheckboxInput } from "@/components/reusable-components/CheckboxInput";
import { TextInput } from "@/components/reusable-components/TextInput";
import { RadioGroupInput } from "@/components/reusable-components/RadioGroupInput";

export const AdoptionSpecificSection = ({ control }: { control: any }) => {
  return (
    <section className="space-y-6 mr-1 ml-1">
      <h3 className="text-lg font-medium flex items-center gap-2">
        <Home className="h-5 w-5" />
        Living Situation
      </h3>

      <RadioGroupInput
        name="residenceType"
        label="Do you own or rent your home?"
        control={control}
        options={[
          { value: "own", label: "I own my home" },
          { value: "rent", label: "I rent my home" },
        ]}
      />

      <TextInput
        name="householdMembers"
        label="Who lives in your household?"
        control={control}
        placeholder="e.g., 2 adults, 1 child"
      />

      <TextInput
        name="childrenAges"
        label="Ages of children (if any)"
        control={control}
        placeholder="e.g., 5, 8"
        optional
      />

      <h3 className="text-lg font-medium flex items-center gap-2 mt-8">
        <Users className="h-5 w-5" />
        Pet Experience
      </h3>

      <TextInput
        name="currentPets"
        label="Current Pets"
        control={control}
        placeholder="e.g., 1 dog, 2 cats"
        optional
      />

      <TextareaInput
        name="petExperience"
        label="Your experience with pets"
        control={control}
        placeholder="Describe your experience caring for pets"
        rows={4}
      />

      <TextareaInput
        name="dailyRoutine"
        label="Daily Routine"
        control={control}
        placeholder="Describe your typical daily schedule"
        rows={4}
      />

      <TextInput
        name="vetReference"
        label="Veterinarian Reference (if any)"
        control={control}
        placeholder="Clinic name and phone number"
        optional
      />
    </section>
  );
};
