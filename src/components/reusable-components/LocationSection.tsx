"use client";
import { MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { City, Country, State } from "country-state-city";
import { useFormContext, useWatch } from "react-hook-form";
import { SelectInput } from "@/components/reusable-components/SelectInput";
import { TextInput } from "@/components/reusable-components/TextInput";
import { TextareaInput } from "@/components/reusable-components/TextAreaInput";

export const LocationSection = () => {
  const { control, setValue } = useFormContext();
  const [countries, setCountries] = useState<
    { value: string; label: string }[]
  >([]);
  const [states, setStates] = useState<{ value: string; label: string }[]>([]);
  const [cities, setCities] = useState<{ value: string; label: string }[]>([]);

  // Watch the nested address fields
  const address = useWatch({ control, name: "address" });
  const selectedCountry = address?.country;
  const selectedState = address?.state;

  useEffect(() => {
    setCountries(
      Country.getAllCountries().map((c) => ({
        value: c.isoCode,
        label: c.name,
      }))
    );
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      const countryStates = State.getStatesOfCountry(selectedCountry).map(
        (s) => ({
          value: s.isoCode,
          label: s.name,
        })
      );
      setStates(countryStates);
      setCities([]);
      setValue("address.state", "");
      setValue("address.city", "");
    }
  }, [selectedCountry, setValue]);

  useEffect(() => {
    if (selectedCountry && selectedState) {
      const stateCities = City.getCitiesOfState(
        selectedCountry,
        selectedState
      ).map((c) => ({
        value: c.name,
        label: c.name,
      }));
      setCities(stateCities);
      setValue("address.city", "");
    }
  }, [selectedCountry, selectedState, setValue]);

  return (
    <section className="space-y-6 mr-1 ml-1">
      <h3 className="text-lg font-medium flex items-center gap-2">
        <MapPin className="h-5 w-5" />
        Location
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SelectInput
          name="address.country"
          label="Country"
          options={countries}
          placeholder="Select country"
          onValueChange={(value) => {
            setValue("address.country", value);
            setValue("address.state", "");
            setValue("address.city", "");
          }}
          required
        />

        <SelectInput
          name="address.state"
          label="State/Province"
          options={states}
          placeholder="Select state"
          disabled={!selectedCountry}
          onValueChange={(value) => {
            setValue("address.state", value);
            setValue("address.city", "");
          }}
          required
        />

        <SelectInput
          name="address.city"
          label="City"
          options={cities}
          placeholder="Select city"
          disabled={!selectedState}
          required
        />

        <TextInput
          name="address.zipCode"
          label="Zip/Postal Code"
          placeholder="Enter zip code"
          icon={<MapPin className="h-4 w-4" />}
          required
        />

        <TextareaInput
          name="address.street"
          label="Full Address"
          placeholder="Street address, apartment, etc."
          className="md:col-span-2"
          rows={3}
          required
        />
      </div>
    </section>
  );
};
