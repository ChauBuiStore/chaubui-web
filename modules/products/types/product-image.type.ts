import { FileUpload } from "@/lib/types/file.type";

export interface ProductImage {
  id: string;
  file: FileUpload;
  alt: string;
  sortOrder: number;
  isThumbnail: boolean;
}

