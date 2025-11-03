"use client";
import { ShieldCheck, FileText, Landmark } from "lucide-react";
import { TextInput } from "@/components/reusable-components/TextInput";
import { NumberInput } from "@/components/reusable-components/NumberInput";
import { FileUpload } from "@/components/reusable-components/FileUpload";

export const VerificationSection = ({ control }: { control: any }) => {
  return (
    <section className="space-y-6">
      <h3 className="text-lg font-medium flex items-center gap-2">
        <ShieldCheck className="h-5 w-5" />
        Verification
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mr-1 ml-1">
        <NumberInput
          name="yearFounded"
          label="Year Founded"
          control={control}
          placeholder="Establishment year"
          min={1800}
          max={new Date().getFullYear()}
          required
        />

        <TextInput
          name="taxId"
          label="Tax ID/EIN"
          control={control}
          placeholder="12-3456789"
          description="Format: XX-XXXXXXX"
          icon={<Landmark className="h-4 w-4" />}
        />

        <FileUpload
          name="addressProof"
          label="Address Proof"
          control={control}
          accept=".pdf,.jpg,.png"
          description="Upload utility bill or government document"
          className="md:col-span-2"
        />
      </div>
    </section>
  );
};
