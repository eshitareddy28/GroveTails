"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

import { useEffect } from "react";
import {
  AdoptionFormSchema,
  FosterFormSchema,
  SponsorFormSchema,
} from "./schemas/petActions";
import { AdoptionSpecificSection } from "./adoption/AdoptionSection";
import { TermsSection } from "./terms/TermsSection";
import { BasicDetailsSection } from "./BasicDetailsSection";
import { FosterSpecificSection } from "./foster/FosterSection";
import { SponsorSpecificSection } from "./sponsor/SponsorSection";
import { LocationSection } from "../reusable-components/LocationSection";

type FormVariant = "adopt" | "foster" | "sponsor";

export const PetActionForm = ({
  petName,
  variant = "adopt",
  onCancel = () => window.history.back(),
  onSuccess = () => window.location.reload(),
}: {
  petName: string;
  variant: FormVariant;
  onCancel?: () => void;
  onSuccess?: () => void;
}) => {
  const schema = {
    adopt: AdoptionFormSchema,
    foster: FosterFormSchema,
    sponsor: SponsorFormSchema,
  }[variant];

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      // Shared fields
      fullName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      termsAgreed: false,

      // Adoption-specific
      residenceType: undefined,
      landlordApproval: false,

      // Foster-specific
      fosterDuration: undefined,
      emergencyContact: "",

      // Sponsor-specific
      sponsorshipType: undefined,
      amount: 50,
      anonymity: false,
    },
  });

  useEffect(() => {
    console.log("Form values:", form.getValues());
  }, [form, form.formState.errors]);

  const handleSubmit = async (data: any) => {
    try {
      const endpoint = {
        adopt: "/api/adoptions",
        foster: "/api/foster-applications",
        sponsor: "/api/sponsorships",
      }[variant];

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ petName, ...data }),
      });

      if (!response.ok) throw new Error(await response.text());
      onSuccess();
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  const getTitle = () => {
    switch (variant) {
      case "adopt":
        return `Adopt ${petName}`;
      case "foster":
        return `Foster ${petName}`;
      case "sponsor":
        return `Sponsor ${petName}`;
    }
  };

  return (
    <div className="flex flex-col h-full bg-mint-50 dark:bg-dark-mint-800 text-foreground">
      <header className="sticky top-0 z-10 bg-mint-200/70 dark:bg-dark-mint-700 flex items-center px-6 h-16 shadow-header shadow-mint dark:shadow-mint">
        <h2 className="text-xl font-semibold text-light-primary">
          {getTitle()}
        </h2>
      </header>

      <ScrollArea className="flex-1 p-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-8"
            id="pet-action-form"
          >
            <BasicDetailsSection control={form.control} />
            <LocationSection control={form.control} setValue={form.setValue} />

            {variant === "adopt" && (
              <AdoptionSpecificSection control={form.control} />
            )}
            {variant === "foster" && (
              <FosterSpecificSection control={form.control} />
            )}
            {variant === "sponsor" && (
              <SponsorSpecificSection control={form.control} />
            )}

            <TermsSection variant={variant} control={form.control} />
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
            form="pet-action-form"
            disabled={form.formState.isSubmitting}
            className="bg-light-primary"
          >
            {form.formState.isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : variant === "adopt" ? (
              "Submit Application"
            ) : variant === "foster" ? (
              "Apply to Foster"
            ) : (
              "Complete Sponsorship"
            )}
          </Button>
        </div>
      </footer>
    </div>
  );
};
