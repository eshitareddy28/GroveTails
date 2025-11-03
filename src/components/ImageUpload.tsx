// components/ImageUpload.tsx
"use client";

import { useState, useCallback } from "react";
import { Button } from "./ui/button";
import { ImagePlus, X } from "lucide-react";

export function ImageUpload() {
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files) return;

      const newPreviewUrls: string[] = [];
      for (let i = 0; i < files.length; i++) {
        newPreviewUrls.push(URL.createObjectURL(files[i]));
      }
      setPreviewUrls([...previewUrls, ...newPreviewUrls]);
    },
    [previewUrls]
  );

  const removeImage = (index: number) => {
    const newUrls = [...previewUrls];
    URL.revokeObjectURL(newUrls[index]);
    newUrls.splice(index, 1);
    setPreviewUrls(newUrls);
  };

  return (
    <div className="space-y-4">
      {/* Hidden file input */}
      <input
        type="file"
        id="image-upload"
        multiple
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Upload area */}
      <label
        htmlFor="image-upload"
        className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer transition-colors ${
          isDragging ? "border-primary bg-primary/10" : "border-muted"
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          // Handle dropped files here if needed
        }}
      >
        <ImagePlus className="w-8 h-8 mb-2 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">
          Drag & drop images here, or click to select
        </p>
        <Button variant="ghost" size="sm" className="mt-2">
          Select Files
        </Button>
      </label>

      {/* Preview grid */}
      {previewUrls.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {previewUrls.map((url, index) => (
            <div key={index} className="relative group">
              <img
                src={url}
                alt={`Preview ${index}`}
                className="h-32 w-full object-cover rounded-md"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
