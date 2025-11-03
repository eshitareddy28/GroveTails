"use client";
import {
  Mail,
  Phone,
  Globe,
  Smartphone,
  Globe2,
  GlobeIcon,
} from "lucide-react";
import { TextInput } from "@/components/reusable-components/TextInput";
import { TextareaInput } from "@/components/reusable-components/TextAreaInput";

export const ContactSection = ({ control }: { control: any }) => {
  return (
    <section className="space-y-6">
      <h3 className="text-lg font-medium flex items-center gap-2">
        <Mail className="h-5 w-5" />
        Contact Information
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mr-1 ml-1">
        <TextInput
          name="email"
          label="Email"
          control={control}
          placeholder="contact@shelter.org"
          type="email"
          className="md:col-span-2"
          icon={<Mail className="h-4 w-4" />}
          required
        />

        <TextInput
          name="phone"
          label="Phone"
          control={control}
          placeholder="(123) 456-7890"
          type="tel"
          icon={<Smartphone className="h-4 w-4" />}
          required
        />

        <TextInput
          name="altPhone"
          label="Alternate Phone"
          control={control}
          placeholder="Optional secondary number"
          type="tel"
          icon={<Smartphone className="h-4 w-4" />}
        />

        <TextInput
          name="website"
          label="Website"
          control={control}
          placeholder="https://yourshelter.org"
          type="url"
          className="md:col-span-2"
          icon={<GlobeIcon className="h-4 w-4" />}
        />

        <TextareaInput
          name="description"
          label="Description"
          control={control}
          placeholder="Tell us about your shelter's mission..."
          className="md:col-span-2"
          rows={4}
          required
        />
      </div>
    </section>
  );
};
