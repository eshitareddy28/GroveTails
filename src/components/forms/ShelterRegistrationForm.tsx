"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { PhotosSection } from "./pet-form-sections/PhotosSection";
import { useEffect } from "react";
import { shelterFormSchema } from "./schemas/shelterForm";
import { DetailsSection } from "./shelter-form-sections/ShelterDetails";
import { ContactSection } from "./shelter-form-sections/ShelterContact";
import { VerificationSection } from "./shelter-form-sections/ShelterVerification";
import { LocationSection } from "../reusable-components/LocationSection";

export const ShelterRegistrationForm = ({
  onCancel = () => window.history.back(),
  onSuccess = () => window.location.reload(),
}: {
  onCancel?: () => void;
  onSuccess?: () => void;
} = {}) => {
  const form = useForm({
    resolver: zodResolver(shelterFormSchema),
    defaultValues: {
      // Details
      name: "",
      shelterType: "",
      maxCapacity: 0,
      currentOccupancy: 0,
      accepts: [],
      // Contact
      email: "",
      phone: "",
      altPhone: "",
      website: "",
      description: "",
      // Location
      address: {
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
      },
      // Verification
      yearFounded: new Date().getFullYear(),
      taxId: "",
      addressProof: undefined,
      // Photos
      photos: undefined,
    },
  });

  useEffect(() => {
    console.log("Form values:", form.getValues());
    console.log("Form errors:", form.formState.errors);
  }, [form, form.formState.errors]);

  const handleSubmit = async (data: any) => {
    try {
      console.log("Form submission data:", JSON.stringify(data, null, 2));

      const response = await fetch("/api/shelters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Server error:", errorData);
        throw new Error(errorData.error || "Failed to submit form");
      }

      const result = await response.json();
      console.log("Success:", result);
      onSuccess();
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  return (
    <div className="flex flex-col h-full bg-mint-50 dark:bg-dark-mint-800 text-foreground">
      <header className="sticky top-0 z-10 bg-mint-200/70 dark:bg-dark-mint-700 flex items-center px-6 h-16 shadow-header shadow-mint dark:shadow-mint">
        <h2 className="text-xl font-semibold text-light-primary">
          Shelter Registration
        </h2>
      </header>

      <ScrollArea className="flex-1 p-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-8"
            id="shelter-registration-form"
          >
            <DetailsSection control={form.control} />
            <ContactSection control={form.control} />
            <LocationSection />
            <VerificationSection control={form.control} />
            <PhotosSection control={form.control} />
          </form>
        </Form>
      </ScrollArea>

      <footer className="sticky bottom-0 z-10 bg-mint-200/70 dark:bg-dark-mint-700 flex items-center justify-end px-6 h-16 shadow-footer shadow-mint dark:shadow-mint">
        <div className="flex space-x-4">
          <Button
            variant="outline"
            onClick={onCancel}
            disabled={form.formState.isSubmitting}
            className="border border-light-primary"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            form="shelter-registration-form"
            className="bg-light-primary"
          >
            {form.formState.isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Registering...
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
