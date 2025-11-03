import { notFound } from "next/navigation";
import { getDogById } from "@/lib/api/dogs";
import PetDetails from "@/components/PetDetailsPage";

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function Page({ params }: PageProps) {
  const pet = await getDogById(params.slug);

  if (!pet) {
    return notFound();
  }

  return <PetDetails pet={pet} />;
}
