"use client";

import { UploadDropzone as UploadDropzoneOriginal } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";

export function UploadDropzone({
  endpoint,
  ...props
}: {
  endpoint: keyof OurFileRouter;
} & React.ComponentProps<typeof UploadDropzoneOriginal>) {
  return <UploadDropzoneOriginal endpoint={endpoint} {...props} />;
}
