"use client";
import { CatIcon, Dog, DogIcon } from "lucide-react";
import { breeds } from "../data/breeds";
import { TextInput } from "@/components/reusable-components/TextInput";
import { SelectInput } from "@/components/reusable-components/SelectInput";
import { TextareaInput } from "@/components/reusable-components/TextAreaInput";
import { FormDatePicker } from "@/components/reusable-components/form-date-picker";
import { NumberInput } from "@/components/reusable-components/NumberInput";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { City, Country, State } from "country-state-city";

interface ShelterDropdownItem {
  value: string;
  label: string;
}

interface ShelterDetails {
  id: number;
  name: string;
  email: string;
  phone: string;
  altPhone?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    latitude?: number;
    longitude?: number;
  };
}

export const BasicDetailsSection = () => {
  const { control, setValue, watch } = useFormContext();
  const [shelters, setShelters] = useState<ShelterDropdownItem[]>([]);
  const [loadingShelters, setLoadingShelters] = useState(false);
  const [loadingShelterDetails, setLoadingShelterDetails] = useState(false);

  // Watch shelterId for changes
  const shelterId = watch("shelterId");

  // Load shelters for dropdown
  useEffect(() => {
    const fetchShelters = async () => {
      setLoadingShelters(true);
      try {
        const res = await fetch("/api/shelters");
        const data = await res.json();
        if (data.success) {
          setShelters(data.shelters);
        }
      } catch (error) {
        console.error("Failed to load shelters:", error);
      } finally {
        setLoadingShelters(false);
      }
    };
    fetchShelters();
  }, []);

  // Handle shelter selection changes
  useEffect(() => {
    const fetchShelterDetails = async () => {
      if (!shelterId) {
        // Clear fields if no shelter selected
        resetShelterFields();
        return;
      }

      setLoadingShelterDetails(true);
      try {
        const res = await fetch(`/api/shelters?id=${shelterId}`);
        const data = await res.json();

        if (data.success && data.shelter) {
          updateFormWithShelterData(data.shelter);
        }
      } catch (error) {
        console.error("Failed to fetch shelter details:", error);
      } finally {
        setLoadingShelterDetails(false);
      }
    };

    fetchShelterDetails();
  }, [shelterId, setValue]);

  const resetShelterFields = () => {
    setValue("shelterContact.email", "");
    setValue("shelterContact.phone", "");
    setValue("shelterContact.altPhone", "");
    setValue("address.street", "");
    setValue("address.city", "");
    setValue("address.state", "");
    setValue("address.zipCode", "");
    setValue("address.country", "");
  };

  const updateFormWithShelterData = (shelter: ShelterDetails) => {
    // Set contact info
    setValue("shelterContact.email", shelter.email);
    setValue("shelterContact.phone", shelter.phone);
    setValue("shelterContact.altPhone", shelter.altPhone || "");

    // Set address info if available
    if (shelter.address) {
      setValue("address.street", shelter.address.street);
      setValue("address.zipCode", shelter.address.zipCode);

      // Find matching country ISO code
      const country = Country.getAllCountries().find(
        (c) => c.name === shelter.address?.country
      );
      if (country) {
        setValue("address.country", country.isoCode);

        // After country is set, find matching state
        setTimeout(() => {
          const state = State.getStatesOfCountry(country.isoCode).find(
            (s) => s.name === shelter.address?.state
          );
          if (state) {
            setValue("address.state", state.isoCode);

            // After state is set, find matching city
            setTimeout(() => {
              const city = City.getCitiesOfState(
                country.isoCode,
                state.isoCode
              ).find((c) => c.name === shelter.address?.city);
              if (city) {
                setValue("address.city", city.name);
              }
            }, 100);
          }
        }, 100);
      }
    }
  };

  const petTypes = [
    { value: "DOG", label: "Dog" },
    { value: "CAT", label: "Cat" },
    { value: "RABBIT", label: "Rabbit" },
    { value: "OTHERS", label: "Others" },
  ];

  const genders = [
    { value: "MALE", label: "Male" },
    { value: "FEMALE", label: "Female" },
    { value: "UNKNOWN", label: "Unknown" },
  ];

  const sizes = [
    { value: "SMALL", label: "Small" },
    { value: "MEDIUM", label: "Medium" },
    { value: "LARGE", label: "Large" },
    { value: "XLARGE", label: "XLarge" },
  ];

  const breedOptions = breeds.map((breed) => ({ value: breed, label: breed }));

  return (
    <section className="space-y-6 mr-1 ml-1">
      <h3 className="text-lg font-medium flex items-center gap-2">
        <Dog className="h-5 w-5" />
        Details
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
        <TextInput
          name="name"
          label="Name"
          control={control}
          placeholder="Enter pet name"
          icon={<CatIcon className="h-4 w-4" />}
        />

        <SelectInput
          name="type"
          label="Type"
          control={control}
          placeholder="Select type"
          options={petTypes}
        />

        <SelectInput
          name="breed"
          label="Breed"
          control={control}
          placeholder="Select breed"
          options={breedOptions}
        />

        <NumberInput
          name="age"
          label="Age (years)"
          control={control}
          placeholder="Enter age"
        />

        <SelectInput
          name="gender"
          label="Gender"
          control={control}
          placeholder="Select gender"
          options={genders}
        />

        <SelectInput
          name="size"
          label="Size"
          control={control}
          placeholder="Select size"
          options={sizes}
        />

        <FormDatePicker
          name="intakeDate"
          label="Intake Date"
          control={control}
          placeholder="Select intake date"
        />

        <SelectInput
          name="shelterId"
          label="Affiliated Shelter"
          control={control}
          options={[
            { value: "", label: "None (independent registration)" },
            ...shelters,
          ]}
          placeholder="Select shelter (optional)"
          optional
          isLoading={loadingShelters || loadingShelterDetails}
        />

        <TextareaInput
          name="description"
          label="Description"
          control={control}
          placeholder="Tell us about this pet..."
          className="md:col-span-2"
          rows={5}
        />
      </div>
    </section>
  );
};
