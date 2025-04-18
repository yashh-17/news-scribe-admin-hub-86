
import { PlusCircle, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth/authContext";
import { useNavigate } from "react-router-dom";

interface NewsHeaderProps {
  onCreateNews: () => void;
}

export const NewsHeader = ({ onCreateNews }: NewsHeaderProps) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">News Management</h1>
        <p className="text-gray-600 mt-1">Create, edit and manage news content</p>
      </div>
      <div className="flex gap-4 mt-4 md:mt-0">
        <Button 
          onClick={onCreateNews} 
          className="bg-blue-600 hover:bg-blue-700"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Add News
        </Button>
        <Button 
          onClick={handleLogout}
          variant="outline"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
};
