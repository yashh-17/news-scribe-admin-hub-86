
import { useState } from "react";
import { AdvertisementHeader } from "./AdvertisementHeader";
import { AdvertisementTable } from "./AdvertisementTable";
import { AdvertisementCreateEditModal } from "./AdvertisementCreateEditModal";
import { AdvertisementDeleteConfirmation } from "./AdvertisementDeleteConfirmation";
import { useToast } from "@/hooks/use-toast";
import { useAdvertisementStore } from "@/lib/advertisement/advertisement-store";
import { Card } from "@/components/ui/card";

export const AdvertisementDashboard = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingAd, setEditingAd] = useState<Advertisement | null>(null);
  const [deletingAdId, setDeletingAdId] = useState<string | null>(null);
  const { toast } = useToast();
  const { deleteAdvertisement } = useAdvertisementStore();

  const handleCreateAd = () => {
    setEditingAd(null);
    setIsCreateModalOpen(true);
  };

  const handleEditAd = (ad: Advertisement) => {
    setEditingAd(ad);
    setIsCreateModalOpen(true);
  };

  const handleDeleteAd = (adId: string) => {
    setDeletingAdId(adId);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (deletingAdId) {
      deleteAdvertisement(deletingAdId);
      
      toast({
        title: "Advertisement Deleted",
        description: "The advertisement has been successfully deleted.",
      });
      setIsDeleteModalOpen(false);
      setDeletingAdId(null);
    }
  };

  return (
    <div className="w-full space-y-6">
      <AdvertisementHeader onCreateAd={handleCreateAd} />
      
      <Card className="overflow-hidden">
        <AdvertisementTable 
          onEdit={handleEditAd}
          onDelete={handleDeleteAd}
        />
      </Card>
      
      <AdvertisementCreateEditModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)}
        editingAd={editingAd}
      />
      
      <AdvertisementDeleteConfirmation
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
};
