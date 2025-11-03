"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { FeaturesSection } from "./pet-form-sections/FeaturesSection";
import { MedicalSection } from "./pet-form-sections/MedicalSection";
import { PhotosSection } from "./pet-form-sections/PhotosSection";
import { Loader2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { BasicDetailsSection } from "./pet-form-sections/DetailsSection";
import { TagsSection } from "./pet-form-sections/TagsSection";
import { useEffect } from "react";
import { LocationSection } from "../reusable-components/LocationSection";
import { ContactSection } from "./pet-form-sections/ContactSection";
import { petFormSchema } from "@/lib/validations/petRegistration";
//import { useToast } from "@/components/ui/use-toast";

export const PetRegistrationForm = ({
  onCancel = () => window.history.back(), // Default fallback
  onSuccess = () => window.location.reload(), // Default fallback
}: {
  onCancel?: () => void;
  onSuccess?: () => void;
} = {}) => {
  //const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(petFormSchema),
    defaultValues: {
      name: "",
      type: undefined,
      breed: "",
      age: 0,
      gender: undefined,
      size: undefined,
      intakeDate: new Date().toISOString().split("T")[0],
      description: "",
      shelterContact: {
        email: "",
        phone: "",
        altPhone: "",
      },
      address: {
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
      },
      isVaccinated: false,
      isSpayedNeutered: false,
      isHouseTrained: false,
      goodWithChildren: false,
      goodWithDogs: false,
      goodWithCats: false,
      hasSpecialNeeds: false,
      specialNeedsDescription: "",
      medicalHistory: "",
      tags: [],
      photos: [],
    },
  });

  useEffect(() => {
    console.log("Form current values:", form.getValues());
    console.log("Form errors:", form.formState.errors);
  }, [form, form.formState.errors]);

  //

  const handleSubmit = async (data: any) => {
    try {
      // Convert date to ISO string for backend
      const submissionData = {
        ...data,
        intakeDate: data.intakeDate.toISOString(),
      };

      console.log("petdata", submissionData);

      const response = await fetch("/api/pets/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      const result = await response.json();

      if (!response.ok) {
        // Handle server validation errors
        if (result.errors) {
          result.errors.forEach((error: any) => {
            form.setError(error.path[0], {
              type: "server",
              message: error.message,
            });
          });
        }
        throw new Error(result.error || "Failed to submit form");
      }

      // Success!
      alert("Pet registered successfully!");
      onSuccess();
    } catch (error) {
      console.error("Submission error:", error);
      alert(error.message || "Something went wrong");
    }
  };

  return (
    <div className="flex flex-col h-full bg-mint-50 dark:bg-dark-mint-800 text-foreground">
      <header className="sticky top-0 z-10 bg-mint-200/70 dark:bg-dark-mint-700 flex items-center px-6 h-16 shadow-header shadow-mint dark:shadow-mint">
        <h2 className="text-xl font-semibold text-light-primary">
          Pet Registration
        </h2>
      </header>

      <ScrollArea className="flex-1 p-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-8"
            id="pet-registration-form"
          >
            <BasicDetailsSection />
            <ContactSection />
            <LocationSection control={form.control} setValue={form.setValue} />
            <FeaturesSection control={form.control} />
            <MedicalSection control={form.control} />
            <TagsSection
              existingTags={["Playful", "Energetic", "Calm", "Friendly"]}
            />
            <PhotosSection />
          </form>
        </Form>
      </ScrollArea>

      <footer className="sticky bottom-0 z-10 bg-mint-200/70 dark:bg-dark-mint-700 flex items-center justify-end px-6 h-16 shadow-footer shadow-mint dark:shadow-mint">
        <div className="flex space-x-4">
          <Button
            variant="outline"
            onClick={() => onCancel()}
            disabled={form.formState.isSubmitting}
            className="border border-light-primary"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={form.handleSubmit(handleSubmit)}
            disabled={form.formState.isSubmitting}
            form="pet-registration-form"
            className="bg-light-primary"
          >
            {form.formState.isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </div>
      </footer>
    </div>
  );
};
