
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Video, FileAudio, Link } from "lucide-react";

interface MediaUploadProps {
  type: "audio" | "video";
  value: string;
  onChange: (value: string) => void;
}

export const MediaUpload = ({ type, value, onChange }: MediaUploadProps) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // In a real app, you would upload the file to a server
    // For now, we'll just use a placeholder
    const placeholderUrl = type === "video" 
      ? "https://example.com/video.mp4" 
      : "https://example.com/audio.mp3";
      
    onChange(placeholderUrl);
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const iconComponent = type === "video" ? (
    <Video className="h-5 w-5 text-gray-600" />
  ) : (
    <FileAudio className="h-5 w-5 text-gray-600" />
  );

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <div className="flex-1">
          <Input
            type="text"
            placeholder={`Enter ${type} URL`}
            value={value}
            onChange={handleUrlChange}
            className="w-full"
          />
        </div>
        <div>
          <Input
            type="file"
            accept={type === "video" ? "video/*" : "audio/*"}
            className="hidden"
            id={`${type}-upload`}
            onChange={handleFileChange}
          />
          <label htmlFor={`${type}-upload`}>
            <Button type="button" variant="outline" asChild>
              <span className="cursor-pointer">
                {iconComponent}
                <span className="sr-only">Upload {type}</span>
              </span>
            </Button>
          </label>
        </div>
      </div>
      
      {value && (
        <div className="flex items-center text-sm text-blue-600">
          <Link className="h-4 w-4 mr-1" />
          {value.length > 40 ? `${value.substring(0, 40)}...` : value}
        </div>
      )}
    </div>
  );
};
