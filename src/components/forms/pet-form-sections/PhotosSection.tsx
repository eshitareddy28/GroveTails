"use client";
import { Image } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";

export const PhotosSection = () => {
  const { register, setValue, watch } = useFormContext();
  const photos = watch("photos") || [];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setValue("photos", [...photos, ...files]);
  };

  return (
    <section className="space-y-6">
      <h3 className="text-lg font-medium flex items-center gap-2">
        <Image className="h-5 w-5" />
        Photos
      </h3>
      <div className="border-2 border-dashed rounded-lg p-8 text-center">
        <div className="flex flex-col items-center justify-center gap-2">
          <Image className="h-8 w-8 text-muted-foreground" />
          <input
            type="file"
            id="photos"
            multiple
            accept="image/*"
            {...register("photos")}
            onChange={handleFileChange}
            className="hidden"
          />
          <label htmlFor="photos">
            <Button type="button" variant="outline" className="mt-2" asChild>
              <span>Select Files</span>
            </Button>
          </label>
        </div>
      </div>

      {photos.length > 0 && (
        <div className="grid grid-cols-3 gap-4 mt-4">
          {photos.map((photo, index) => (
            <div key={index} className="relative group">
              {/* Render previews here */}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
