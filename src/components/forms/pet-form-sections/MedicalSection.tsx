"use client";
import { TextareaInput } from "@/components/reusable-components/TextAreaInput";
import { HeartPulse } from "lucide-react";

interface MedicalSectionProps {
  control: any;
}

export const MedicalSection = ({ control }: MedicalSectionProps) => {
  return (
    <section className="space-y-6 px-1">
      <h3 className="text-lg font-medium flex items-center gap-2">
        <HeartPulse className="h-5 w-5" />
        Medical Information
      </h3>
      <TextareaInput
        name="medicalHistory"
        label=""
        control={control}
        placeholder="Any known medical conditions, allergies, or history..."
        rows={5}
      />
    </section>
  );
};
