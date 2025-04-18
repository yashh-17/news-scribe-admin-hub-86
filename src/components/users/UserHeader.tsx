
import { Button } from "@/components/ui/button";
import { PlusCircle, Users } from "lucide-react";

interface UserHeaderProps {
  onCreateUser: () => void;
}

export const UserHeader = ({ onCreateUser }: UserHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
      <div className="flex items-center">
        <Users className="h-6 w-6 mr-2 text-blue-600" />
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">User Management</h1>
          <p className="text-gray-600 mt-1">Manage your system users</p>
        </div>
      </div>
      <Button 
        onClick={onCreateUser} 
        className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700"
      >
        <PlusCircle className="mr-2 h-4 w-4" />
        Add User
      </Button>
    </div>
  );
};
