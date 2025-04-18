
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NewsHeaderProps {
  onCreateNews: () => void;
}

export const NewsHeader = ({ onCreateNews }: NewsHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">News Management</h1>
        <p className="text-gray-600 mt-1">Create, edit and manage news content</p>
      </div>
      <Button 
        onClick={onCreateNews} 
        className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700"
      >
        <PlusCircle className="mr-2 h-4 w-4" />
        Add News
      </Button>
    </div>
  );
};
