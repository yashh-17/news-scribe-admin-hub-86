
import { useState } from "react";
import { UserHeader } from "./UserHeader";
import { UserTable } from "./UserTable";
import { UserSearch } from "./UserSearch";
import { Card, CardContent } from "@/components/ui/card";
import { UserDeleteConfirmation } from "./UserDeleteConfirmation";
import { UserCreateEditModal } from "./UserCreateEditModal";
import { useUserStore } from "@/lib/user/user-store";
import { useToast } from "@/hooks/use-toast";

export const UserDashboard = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deletingUserId, setDeletingUserId] = useState<string | null>(null);
  const { toast } = useToast();
  const { deleteUser } = useUserStore();

  const handleCreateUser = () => {
    setEditingUser(null);
    setIsCreateModalOpen(true);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setIsCreateModalOpen(true);
  };

  const handleDeleteUser = (userId: string) => {
    setDeletingUserId(userId);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (deletingUserId) {
      deleteUser(deletingUserId);
      
      toast({
        title: "User Deleted",
        description: "The user has been successfully deleted.",
      });
      setIsDeleteModalOpen(false);
      setDeletingUserId(null);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <UserHeader onCreateUser={handleCreateUser} />
      
      <div className="mt-6">
        <UserSearch />
      </div>
      
      <Card className="mt-6">
        <CardContent className="p-0">
          <UserTable 
            onEdit={handleEditUser}
            onDelete={handleDeleteUser}
          />
        </CardContent>
      </Card>
      
      <UserCreateEditModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)}
        editingUser={editingUser}
      />
      
      <UserDeleteConfirmation
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
};
