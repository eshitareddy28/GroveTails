"use client";

import { Dog, DogGender, DogSize } from "@/types/dog";
import {
  MapPin,
  Heart,
  Users,
  Home,
  Gift,
  Syringe,
  House,
  Baby,
  DogIcon,
  Cat,
  Share2,
  Bookmark,
  PawPrint,
  CalendarDays,
  Accessibility,
  VenetianMask,
  Ribbon,
  Ruler,
  EggOff,
  ShieldCheck,
  Egg,
  ShieldX,
  Mars,
  Venus,
  Smartphone,
  Mail,
} from "lucide-react";
import PetImageCarousel from "./reusable-components/PetImageCarousel";
import { Button } from "./ui/button";
import { useState } from "react";
import { FormType } from "./pet-action-forms/type";
import { ActionsDrawer } from "./pet-action-forms/ActionsDrawer";

interface PetDetailsProps {
  pet: Dog;
}

export default function PetDetails({ pet }: PetDetailsProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeForm, setActiveForm] = useState<FormType>("adopt"); // Default to adopt

  const sizeDisplayMap: Record<DogSize, string> = {
    "x-small": "Extra Small",
    small: "Small",
    medium: "Medium",
    large: "Large",
    "x-large": "Extra Large",
  };

  const openDrawer = (formType: FormType) => {
    setActiveForm(formType);
    setDrawerOpen(true);
  };

  const genderDisplayMap: Record<DogGender, string> = {
    male: "Male",
    female: "Female",
  };

  const petFeatures = [
    {
      name: "Gender",
      value: genderDisplayMap[pet.gender],
      icon:
        pet.gender === "male" ? (
          <Mars className="w-4 h-4 text-blue-500" /> // Male icon
        ) : (
          <Venus className="w-4 h-4 text-pink-500" /> // Female icon
        ),
    },
    {
      name: "Size",
      value: sizeDisplayMap[pet.size],
      icon: <Ruler className="w-4 h-4" />,
    },
    {
      name: "Age",
      value: `${pet.age} years`,
      icon: <CalendarDays className="w-4 h-4" />,
    },
    {
      name: "Vaccinated",
      value: pet.isVaccinated ? "Yes" : "No",
      icon: <Syringe className="w-4 h-4" />,
    },
    {
      name: "House Trained",
      value: pet.isHouseTrained ? "Yes" : "No",
      icon: <House className="w-4 h-4" />,
    },
    {
      name: "Spay/Neuter",
      value: pet.isSpayedNeutered
        ? pet.gender === "female"
          ? "Spayed"
          : "Neutered"
        : pet.gender === "female"
        ? "Not Spayed"
        : "Not Neutered",
      icon: pet.isSpayedNeutered ? (
        pet.gender === "female" ? (
          <EggOff className="w-4 h-4 text-pink-500" />
        ) : (
          <ShieldCheck className="w-4 h-4 text-blue-500" />
        )
      ) : pet.gender === "female" ? (
        <Egg className="w-4 h-4 text-pink-500" />
      ) : (
        <ShieldX className="w-4 h-4 text-blue-500" />
      ),
    },
  ];

  const compatibilityFeatures = [
    {
      name: "Good with Kids",
      value: pet.goodWithChildren,
      icon: <Baby className="w-4 h-4" />,
    },
    {
      name: "Good with Dogs",
      value: pet.goodWithDogs,
      icon: <DogIcon className="w-4 h-4" />,
    },
    {
      name: "Good with Cats",
      value: pet.goodWithCats,
      icon: <Cat className="w-4 h-4" />,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-2">
      {/* Drawer component */}
      <ActionsDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        formType={activeForm}
        petName={pet.name}
      />
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column - Image Gallery */}
        <div className="lg:w-1/2">
          <div className="sticky top-4">
            <PetImageCarousel images={pet.photos} />

            {/* Additional Info Card */}
            <div className="mt-6 bg-gray-50 rounded-lg p-4 border border-gray-200">
              <h3 className="font-medium text-gray-900 mb-2">Location</h3>
              <div className="flex items-center gap-2 text-gray-700">
                <MapPin className="w-4 h-4 text-rose-500" />
                <p>
                  {pet.address}, {pet.city}, {pet.state} {pet.zipCode}
                </p>
              </div>

              {/* Map Placeholder */}
              <div className="mt-4 aspect-video bg-gray-100 rounded-md flex items-center justify-center">
                <p className="text-gray-400 text-sm">Map would display here</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Content */}
        <div className="lg:w-1/2">
          {/* Header Section */}
          <div className="mb-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{pet.name}</h1>
                <p className="text-lg text-gray-600">{pet.breed}</p>
              </div>
              <div className="flex gap-2">
                <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
                  <Share2 className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
                  <Bookmark className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Tags */}
            {pet.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {pet.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-mint-200/70 text-mint-700 rounded-full text-xs font-medium "
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Key Features */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Details
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {petFeatures.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-gray-100">
                    {feature.icon}
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{feature.name}</p>
                    <p className="font-medium text-gray-900">{feature.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Compatibility */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Compatibility
            </h2>
            <div className="flex flex-wrap gap-4">
              {compatibilityFeatures.map((feature, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg ${
                    feature.value ? "bg-green-50" : "bg-rose-50"
                  }`}
                >
                  <div
                    className={`p-2 rounded-full ${
                      feature.value ? "bg-green-100" : "bg-rose-100"
                    }`}
                  >
                    {feature.icon}
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{feature.name}</p>
                    <p
                      className={`font-medium ${
                        feature.value ? "text-green-700" : "text-rose-700"
                      }`}
                    >
                      {feature.value ? "Yes" : "No"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              About {pet.name}
            </h2>
            <p className="text-gray-700">{pet.description}</p>
          </div>

          {/* Special Needs */}
          {pet.hasSpecialNeeds && pet.specialNeedsDescription && (
            <div className="mb-8 bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
              <h3 className="font-bold text-amber-800 flex items-center gap-2">
                <Accessibility className="w-5 h-5" /> Special Needs
              </h3>
              <p className="text-amber-700 mt-1">
                {pet.specialNeedsDescription}
              </p>
            </div>
          )}

          {/* Medical History */}
          {pet.medicalHistory && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                Medical History
              </h2>
              <p className="text-gray-700">{pet.medicalHistory}</p>
            </div>
          )}

          {/* Contact Info */}

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              Contact Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Email */}
              {pet.email && (
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="p-2 rounded-full bg-blue-100">
                    <Mail className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <a
                      href={`mailto:${pet.email}`}
                      className="font-medium text-gray-900 hover:text-blue-600 hover:underline"
                    >
                      {pet.email}
                    </a>
                  </div>
                </div>
              )}

              {/* Primary Phone */}
              {pet.phone && (
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="p-2 rounded-full bg-green-100">
                    <Smartphone className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <a
                      href={`tel:${pet.phone}`}
                      className="font-medium text-gray-900 hover:text-green-600 hover:underline"
                    >
                      {pet.phone}
                    </a>
                  </div>
                </div>
              )}

              {/* Alternate Phone */}
              {pet.altPhone && (
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="p-2 rounded-full bg-purple-100">
                    <Smartphone className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Alternate Phone</p>
                    <a
                      href={`tel:${pet.altPhone}`}
                      className="font-medium text-gray-900 hover:text-purple-600 hover:underline"
                    >
                      {pet.altPhone}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="sticky bottom-0 bg-white py-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button
                onClick={() => openDrawer("adopt")}
                className="w-full py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2
                  bg-mint-500 hover:bg-mint-600 text-white
                  shadow-md hover:shadow-lg shadow-mint-500/30
                  transition-all duration-200"
              >
                <Users className="w-5 h-5" />
                Adopt
              </Button>
              <Button
                onClick={() => openDrawer("foster")}
                className="w-full py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2
                  bg-mint-400 hover:bg-mint-500 text-white
                  shadow-md hover:shadow-lg shadow-mint-400/30
                  transition-all duration-200"
              >
                <Home className="w-5 h-5" />
                Foster
              </Button>
              <Button
                onClick={() => openDrawer("sponsor")}
                className="w-full py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2
                  bg-mint-300 hover:bg-mint-400 text-mint-800 dark:text-white
                  shadow-md hover:shadow-lg shadow-mint-300/30
                  transition-all duration-200"
              >
                <Gift className="w-5 h-5" />
                Sponsor
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
