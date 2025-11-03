"use client";
import { User, Smartphone, Mail } from "lucide-react";
import { TextInput } from "@/components/reusable-components/TextInput";

export const BasicDetailsSection = ({ control }: { control: any }) => {
  return (
    <section className="space-y-6 mr-1 ml-1">
      <h3 className="text-lg font-medium flex items-center gap-2">
        <User className="h-5 w-5" />
        Your Information
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TextInput
          name="fullName"
          label="Full Name"
          control={control}
          placeholder="Enter your name"
          icon={<User className="h-4 w-4" />}
        />
        <TextInput
          name="email"
          label="Email"
          control={control}
          placeholder="your@email.com"
          type="email"
          icon={<Mail className="h-4 w-4" />}
        />
        <TextInput
          name="phone"
          label="Phone Number"
          control={control}
          placeholder="(123) 456-7890"
          icon={<Smartphone className="h-4 w-4" />}
        />
      </div>
    </section>
  );
};
