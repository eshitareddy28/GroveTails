// app/shelters/page.tsx
import { ShelterGrid } from "@/components/ShelterGrid";
import { sampleShelters } from "@/lib/mockShelters";
import { Home } from "lucide-react";

export default function SheltersPage() {
  return (
    <div className="min-h-screen bg-light-background dark:bg-dark-background">
      <div className="container mx-auto px-4 sm:px-6 py-2">
        {/* Hero Section */}
        <header className="text-center mb-12">
          <h1 className="text-xl md:text-2xl font-bold text-light-primary dark:text-dark-primary mb-3">
            Our{" "}
            <span className="text-light-accent dark:text-dark-accent">
              Shelter Partners
            </span>
          </h1>
          <p className="text-light-text/80 dark:text-dark-text/80 text-lg max-w-2xl mx-auto">
            Discover the wonderful shelters helping animals find their forever
            homes
          </p>
        </header>

        {/* Shelter Grid */}
        <div className="mb-16">
          <ShelterGrid shelters={sampleShelters} />
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-xl font-semibold text-light-primary dark:text-dark-primary mb-3">
            Want to join our network?
          </h2>
          <p className="text-light-muted dark:text-dark-muted mb-6 max-w-2xl mx-auto">
            We're always looking to partner with more shelters and rescues
          </p>
          <button className="px-5 py-2.5 bg-light-accent hover:bg-light-accent/90 dark:bg-dark-accent dark:hover:bg-dark-accent/90 text-white font-medium rounded-full transition-colors">
            Become a Partner
          </button>
        </div>
      </div>
    </div>
  );
}
