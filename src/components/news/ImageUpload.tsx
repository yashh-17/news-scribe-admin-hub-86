
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { ImageIcon, X, Upload } from "lucide-react";

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
  onUploadStart?: () => void;
  progress?: number;
}

export const ImageUpload = ({
  value,
  onChange,
  onUploadStart,
  progress = 0,
}: ImageUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // In a real app, you would upload the file to a server
    // For now, we'll simulate the upload and use a data URL
    setIsUploading(true);
    if (onUploadStart) onUploadStart();

    // Simulate file upload and create a data URL
    setTimeout(() => {
      const reader = new FileReader();
      reader.onload = () => {
        onChange(reader.result as string);
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }, 2000);
  };

  const handleRemove = () => {
    onChange("");
  };

  if (value) {
    return (
      <div className="relative rounded-md overflow-hidden border border-gray-200">
        <img
          src={value}
          alt="Uploaded image"
          className="w-full h-48 object-cover"
        />
        <Button
          type="button"
          variant="destructive"
          size="icon"
          className="absolute top-2 right-2 h-8 w-8 bg-gray-800/60 hover:bg-red-600"
          onClick={handleRemove}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  if (isUploading) {
    return (
      <div className="border border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center bg-gray-50">
        <div className="mb-4 text-gray-500">Uploading image...</div>
        <Progress value={progress} className="w-full" />
      </div>
    );
  }

  return (
    <div className="border border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 cursor-pointer">
      <Input
        type="file"
        accept="image/*"
        className="hidden"
        id="image-upload"
        onChange={handleFileChange}
      />
      <label
        htmlFor="image-upload"
        className="flex flex-col items-center cursor-pointer"
      >
        <div className="bg-gray-200 p-3 rounded-full mb-3">
          <ImageIcon className="h-6 w-6 text-gray-600" />
        </div>
        <div className="text-sm font-medium text-gray-700 mb-1">
          Upload image
        </div>
        <div className="text-xs text-gray-500">
          SVG, PNG, JPG or GIF (max. 2MB)
        </div>
      </label>
    </div>
  );
};
