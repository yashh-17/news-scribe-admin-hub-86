
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

interface AdvertisementHeaderProps {
  onCreateAd: () => void;
}

export const AdvertisementHeader = ({ onCreateAd }: AdvertisementHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 px-2">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Advertisements</h1>
        <p className="text-muted-foreground mt-1">
          Manage advertisements across your platform
        </p>
      </div>
      <Button 
        onClick={onCreateAd} 
        className="mt-4 sm:mt-0"
      >
        <PlusCircle className="mr-2 h-4 w-4" />
        New Advertisement
      </Button>
    </div>
  );
};
