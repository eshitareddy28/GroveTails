"use client";
import { useState } from "react";
import { CheckboxInput } from "@/components/reusable-components/CheckboxInput";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export const TermsSection = ({
  variant,
  control,
}: {
  variant: "adopt" | "foster" | "sponsor";
  control: any;
}) => {
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  const termsContent = {
    adopt: {
      title: "Adoption Agreement",
      summaryPoints: [
        "I agree to provide proper care for the pet",
        "I understand there's a non-refundable adoption fee",
        "I consent to a home visit if required",
      ],
      fullTerms: [
        {
          title: "1. Adoption Commitment",
          content:
            "By adopting this pet, you commit to providing a loving, permanent home and meeting all of the animal's physical and emotional needs for its entire life.",
        },
        {
          title: "2. Adoption Fees",
          content:
            "The non-refundable adoption fee of $250 covers initial veterinary expenses including spay/neuter surgery, vaccinations, microchipping, and deworming treatments.",
        },
        {
          title: "3. Home Environment",
          content:
            "You agree to provide adequate shelter, proper nutrition, clean water, regular exercise, and veterinary care as needed. The pet must live indoors as part of the family.",
        },
        {
          title: "4. Follow-up Visits",
          content:
            "Our organization reserves the right to conduct follow-up visits or request updates about the pet's wellbeing for up to one year post-adoption.",
        },
        {
          title: "5. Return Policy",
          content:
            "If you can no longer care for the pet, you must contact our organization immediately. Under no circumstances should the pet be sold, given away, or surrendered to another shelter.",
        },
        {
          title: "6. Legal Ownership",
          content:
            "Full legal ownership transfers to you after a 30-day trial period, provided all terms are being met. During this period, we may reclaim the pet if terms are violated.",
        },
      ],
    },
    foster: {
      title: "Foster Agreement",
      summaryPoints: [
        "I agree to temporary care of the pet",
        "I will return the pet when requested",
        "I consent to regular check-ins",
      ],
      fullTerms: [
        {
          title: "1. Foster Period",
          content:
            "The foster period is typically 2-8 weeks but may be extended by mutual agreement. The exact duration will be specified in your foster contract.",
        },
        {
          title: "2. Care Requirements",
          content:
            "You agree to provide daily care including feeding, exercise, socialization, and administering any required medications as directed by our veterinary team.",
        },
        {
          title: "3. Medical Care",
          content:
            "All medical decisions and treatments must be approved by our organization. Emergency veterinary care should be obtained immediately if needed, with notification to us within 24 hours.",
        },
        {
          title: "4. Updates & Communication",
          content:
            "Weekly updates including photos and behavior notes are required. You must be available for scheduled check-ins with our foster coordinator.",
        },
        {
          title: "5. Return Policy",
          content:
            "The pet must be returned immediately upon request. Foster pets cannot be rehomed or transferred without explicit written authorization from our organization.",
        },
        {
          title: "6. Liability",
          content:
            "Our organization carries liability insurance for foster animals. You are responsible for any damages caused by negligence or failure to follow foster guidelines.",
        },
      ],
    },
    sponsor: {
      title: "Sponsorship Terms",
      summaryPoints: [
        "I understand this is a charitable donation",
        "I will receive updates about the pet",
        "Payments are non-refundable",
      ],
      fullTerms: [
        {
          title: "1. Donation Nature",
          content:
            "Sponsorship payments are considered charitable donations and may be tax-deductible to the extent allowed by law. You will receive a donation receipt for your records.",
        },
        {
          title: "2. Sponsorship Benefits",
          content:
            "As a sponsor, you'll receive monthly updates including photos, health reports, and behavioral updates about your sponsored pet. Premium sponsors may receive additional perks.",
        },
        {
          title: "3. Payment Terms",
          content:
            "Payments are processed monthly and are non-refundable. You may cancel your sponsorship at any time, but already processed payments will not be refunded.",
        },
        {
          title: "4. Pet Care Decisions",
          content:
            "Sponsorship does not grant decision-making authority regarding the pet's care or placement. All care decisions remain with our organization.",
        },
        {
          title: "5. Communication",
          content:
            "Updates will be sent via email on the 15th of each month. You may request additional updates through our sponsorship coordinator.",
        },
        {
          title: "6. Sponsorship Duration",
          content:
            "Your sponsorship continues until canceled. If the sponsored pet is adopted, you'll be notified and given the option to sponsor another animal.",
        },
      ],
    },
  };

  const currentTerms = termsContent[variant];

  return (
    <section className="space-y-4 p-6 border rounded-lg bg-card shadow-sm">
      <h3 className="text-lg font-semibold text-primary">
        {currentTerms.title}
      </h3>

      <ul className="space-y-2 pl-5 list-disc text-sm text-muted-foreground">
        {currentTerms.summaryPoints.map((point, index) => (
          <li key={index}>{point}</li>
        ))}
      </ul>

      <CheckboxInput
        name="termsAgreed"
        control={control}
        label={
          <Button
            variant="link"
            type="button"
            className="h-auto p-0 text-primary underline hover:text-primary/80"
            onClick={() => setIsTermsOpen(true)}
          >
            View full terms and conditions
          </Button>
        }
      />
      <Dialog open={isTermsOpen} onOpenChange={setIsTermsOpen}>
        <DialogContent
          className="flex flex-col max-h-[90vh] max-w-lg p-0 overflow-hidden"
          hideCloseButton
        >
          {/* Sticky Header with Close Button in Corner */}
          <div className="sticky top-0 z-10 bg-blue-200/70 dark:bg-dark-mint-700 px-6 py-4 border-b">
            <div className="flex items-start justify-between">
              <div className="pr-4">
                {" "}
                {/* Added padding to prevent text overlap */}
                <DialogTitle className="text-lg font-semibold">
                  {currentTerms.title}
                </DialogTitle>
                <DialogDescription className="text-sm mt-1">
                  Please read these terms carefully before agreeing
                </DialogDescription>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 ml-auto -mt-1 -mr-3"
                onClick={() => setIsTermsOpen(false)}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
            </div>
          </div>

          {/* Scrollable Body */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-6">
              {currentTerms.fullTerms.map((term, index) => (
                <div key={index} className="space-y-2">
                  <h4 className="font-medium text-foreground">{term.title}</h4>
                  <p className="text-muted-foreground text-sm">
                    {term.content}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Sticky Footer */}
          <div className="sticky bottom-0 bg-background border-t px-6 py-4 flex justify-end">
            <Button
              onClick={() => setIsTermsOpen(false)}
              className="min-w-[120px] bg-mint-200 hover:bg-mint-300 text-black"
            >
              I Understand
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};
