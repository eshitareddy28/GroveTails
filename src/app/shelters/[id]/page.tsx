// app/shelters/[id]/page.tsx
"use client";
import { DogGrid } from "@/components/DogGrid";
import { Button } from "@/components/ui/button";
import { MapPin, Mail, Phone, Globe, Users, Heart } from "lucide-react";
import Image from "next/image";
import { sampleShelters } from "@/lib/mockShelters";
import { sampleDogs } from "@/lib/mockPets";

export default function ShelterDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const shelter = sampleShelters.find((s) => s.id === params.id);
  const shelterDogs = sampleDogs.filter((dog) => dog.shelterId === params.id);

  if (!shelter) {
    return (
      <div className="min-h-screen bg-light-background dark:bg-dark-background flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold mb-4">Shelter not found</h1>
          <p className="text-muted-foreground mb-6">
            The shelter you're looking for doesn't exist or may have been
            removed.
          </p>
          <Button href="/shelters">Back to Shelters</Button>
        </div>
      </div>
    );
  }

  // Ensure image path is valid
  const imagePath = shelter.image?.startsWith("http")
    ? shelter.image
    : `/shelters/${shelter.image || "shelter1.jpg"}`;

  return (
    <div className="min-h-screen bg-light-background dark:bg-dark-background">
      <div className="container mx-auto px-4 sm:px-6 py-8">
        {/* Shelter Header */}
        <section className="mb-12">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Shelter Image */}
            <div className="w-full md:w-1/3">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100">
                <Image
                  src={imagePath}
                  alt={shelter.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/shelters/shelter1.jpg";
                  }}
                />
              </div>
            </div>

            {/* Shelter Info */}
            <div className="w-full md:w-2/3 space-y-4">
              <h1 className="text-2xl md:text-3xl font-bold">{shelter.name}</h1>

              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-5 h-5" />
                <span>{shelter.location || "Location not specified"}</span>
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {shelter.contactEmail && (
                  <div className="flex items-center gap-2">
                    <Mail className="w-5 h-5" />
                    <span>{shelter.contactEmail}</span>
                  </div>
                )}
                {shelter.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-5 h-5" />
                    <span>{shelter.phone}</span>
                  </div>
                )}
                {shelter.website && (
                  <div className="flex items-center gap-2">
                    <Globe className="w-5 h-5" />
                    <a
                      href={
                        shelter.website.startsWith("http")
                          ? shelter.website
                          : `https://${shelter.website}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {shelter.website.replace(/^https?:\/\//, "")}
                    </a>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>
                    Capacity: {shelter.currentOccupancy || 0}/
                    {shelter.maxCapacity || 0}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4 flex-wrap">
                <Button className="bg-mint-400 hover:bg-mint-500">
                  <Heart className="mr-2 h-4 w-4" />
                  Sponsor Shelter
                </Button>
                <Button variant="outline">Contact Shelter</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Shelter Description */}
        {shelter.description && (
          <section className="mb-12">
            <h2 className="text-xl font-semibold mb-4">About Us</h2>
            <p className="text-muted-foreground whitespace-pre-line">
              {shelter.description}
            </p>
          </section>
        )}

        {/* Dogs Available */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">
              Available Dogs{" "}
              {shelterDogs.length > 0 && `(${shelterDogs.length})`}
            </h2>
            {shelterDogs.length > 0 && (
              <Button variant="ghost">View All</Button>
            )}
          </div>
          {shelterDogs.length > 0 ? (
            <DogGrid dogs={shelterDogs} />
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <p>No dogs currently available at this shelter</p>
            </div>
          )}
        </section>

        {/* Map Section */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Location</h2>
          <div className="h-64 bg-gray-200 rounded-xl flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <MapPin className="w-12 h-12 mx-auto mb-2" />
              <p>{shelter.location}</p>
              <p className="text-sm mt-2">Map integration coming soon</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
