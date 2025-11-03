"use client";
import { Gift, HeartPulse, EyeOff } from "lucide-react";
import { NumberInput } from "@/components/reusable-components/NumberInput";
import { CheckboxInput } from "@/components/reusable-components/CheckboxInput";
import { TextareaInput } from "@/components/reusable-components/TextAreaInput";
import { RadioGroupInput } from "@/components/reusable-components/RadioGroupInput";

export const SponsorSpecificSection = ({ control }: { control: any }) => {
  return (
    <section className="space-y-6 ml-1 mr-1">
      <h3 className="text-lg font-medium flex items-center gap-2">
        <Gift className="h-5 w-5" />
        Sponsorship Details
      </h3>

      <RadioGroupInput
        name="sponsorshipType"
        label="Sponsorship Type"
        control={control}
        options={[
          { value: "full", label: "Full Sponsorship" },
          { value: "partial", label: "Partial Sponsorship" },
          { value: "medical", label: "Medical Sponsorship" },
        ]}
      />

      <NumberInput
        name="amount"
        label="Monthly Amount ($)"
        control={control}
        placeholder="50"
        min={10}
        icon={<span className="text-sm">$</span>}
      />

      <RadioGroupInput
        name="paymentFrequency"
        label="Payment Frequency"
        control={control}
        options={[
          { value: "monthly", label: "Monthly" },
          { value: "quarterly", label: "Quarterly" },
          { value: "one-time", label: "One-Time" },
        ]}
      />

      <CheckboxInput
        name="anonymity"
        label={
          <>
            <EyeOff className="inline h-4 w-4 mr-2" />
            Remain anonymous
          </>
        }
        control={control}
      />

      <TextareaInput
        name="dedication"
        label="Dedication Message (Optional)"
        control={control}
        placeholder="In memory of... or other dedication"
        rows={3}
        optional
      />
    </section>
  );
};
