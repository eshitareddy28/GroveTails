// app/dogs/page.tsx
import { DogGrid } from "@/components/DogGrid";
import { sampleDogs } from "@/lib/mockPets";
import { PawPrint } from "lucide-react";

export default function DogsPage() {
  return (
    <div className="min-h-screen bg-light-background dark:bg-dark-background">
      <div className="container mx-auto px-4 sm:px-6 py-2">
        {/* Hero Section */}
        <header className="text-center mb-12  ">
          <h1 className="text-xl md:text-2xl font-bold text-light-primary dark:text-dark-primary mb-3">
            Meet Our{" "}
            <span className="text-light-accent dark:text-dark-accent">
              Furry Friends
            </span>
          </h1>
          <p className="text-light-text/80 dark:text-dark-text/80 text-lg max-w-2xl mx-auto">
            Discover your perfect companion from our loving pack of rescue dogs
          </p>
        </header>

        {/* Dog Grid */}
        <div className="mb-16">
          <DogGrid dogs={sampleDogs} />
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-xl font-semibold text-light-primary dark:text-dark-primary mb-3">
            Can't find your match?
          </h2>
          <p className="text-light-muted dark:text-dark-muted mb-6 max-w-2xl mx-auto">
            New dogs arrive weekly - check back soon or join our waiting list
          </p>
          <button className="px-5 py-2.5 bg-light-accent hover:bg-light-accent/90 dark:bg-dark-accent dark:hover:bg-dark-accent/90 text-white font-medium rounded-full transition-colors">
            Get Notified
          </button>
        </div>
      </div>
    </div>
  );
}
