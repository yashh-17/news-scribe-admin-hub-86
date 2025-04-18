
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AdvertisementForm } from "./AdvertisementForm";

interface AdvertisementCreateEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingAd: Advertisement | null;
}

export const AdvertisementCreateEditModal = ({
  isOpen,
  onClose,
  editingAd,
}: AdvertisementCreateEditModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {editingAd ? "Edit" : "Create"} Advertisement
          </DialogTitle>
        </DialogHeader>
        <AdvertisementForm editingAd={editingAd} onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
};
