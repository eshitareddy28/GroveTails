"use client";
import { Home, HomeIcon } from "lucide-react";
import { TextInput } from "@/components/reusable-components/TextInput";
import { SelectInput } from "@/components/reusable-components/SelectInput";
import { MultiSelectInput } from "@/components/reusable-components/MultiSelectInput";
import { NumberInput } from "@/components/reusable-components/NumberInput";

export const DetailsSection = ({ control }: { control: any }) => {
  return (
    <section className="space-y-6 mr-1 ml-1">
      <h3 className="text-lg font-medium flex items-center gap-2">
        <Home className="h-5 w-5" />
        Shelter Details
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
        <TextInput
          name="name"
          label="Shelter Name"
          control={control}
          placeholder="Enter shelter name"
          icon={<HomeIcon className="h-4 w-4" />}
          required
        />

        <SelectInput
          name="shelterType"
          label="Shelter Type"
          control={control}
          placeholder="Select type"
          options={[
            { value: "non-profit", label: "Non-Profit" },
            { value: "private", label: "Private" },
            { value: "government", label: "Government" },
            { value: "foster", label: "Foster Network" },
          ]}
          required
        />

        <NumberInput
          name="maxCapacity"
          label="Max Capacity"
          control={control}
          placeholder="Total animals supported"
          min={0}
          required
        />

        <NumberInput
          name="currentOccupancy"
          label="Current Occupancy"
          control={control}
          placeholder="Currently housed animals"
          min={0}
          required
        />

        <MultiSelectInput
          name="accepts"
          label="Accepts"
          control={control}
          options={[
            { value: "dog", label: "Dogs" },
            { value: "cat", label: "Cats" },
            { value: "rabbit", label: "Rabbits" },
            { value: "bird", label: "Birds" },
            { value: "squirrel", label: "Squirrels" },
            { value: "other", label: "Other Animals" },
          ]}
          placeholder="Select animal types"
          className="w-[250px]"
          required
        />
      </div>
    </section>
  );
};
