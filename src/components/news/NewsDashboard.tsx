
import { useState } from "react";
import { NewsHeader } from "./NewsHeader";
import { NewsTable } from "./NewsTable";
import { NewsCreateEditModal } from "./NewsCreateEditModal";
import { useToast } from "@/hooks/use-toast";
import { NewsDeleteConfirmation } from "./NewsDeleteConfirmation";
import { NewsFilters } from "./NewsFilters";
import { useNewsStore } from "@/lib/news/news-store";

export const NewsDashboard = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const [deletingNewsId, setDeletingNewsId] = useState<string | null>(null);
  const { toast } = useToast();
  
  // Access store values directly, avoiding selectors that might cause re-renders
  const searchTerm = useNewsStore(state => state.searchTerm);
  const setSearchTerm = useNewsStore(state => state.setSearchTerm);
  const selectedCategory = useNewsStore(state => state.selectedCategory);
  const setSelectedCategory = useNewsStore(state => state.setSelectedCategory);

  const handleCreateNews = () => {
    setEditingNews(null);
    setIsCreateModalOpen(true);
  };

  const handleEditNews = (news: NewsItem) => {
    setEditingNews(news);
    setIsCreateModalOpen(true);
  };

  const handleDeleteNews = (newsId: string) => {
    setDeletingNewsId(newsId);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (deletingNewsId) {
      // Use direct method call instead of getState which can cause loops
      const deleteNews = useNewsStore.getState().deleteNews;
      deleteNews(deletingNewsId);
      
      toast({
        title: "News Deleted",
        description: "The news item has been successfully deleted.",
      });
      setIsDeleteModalOpen(false);
      setDeletingNewsId(null);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <NewsHeader onCreateNews={handleCreateNews} />
      
      <div className="mt-6">
        <NewsFilters 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      </div>
      
      <div className="mt-6 bg-white rounded-lg shadow">
        <NewsTable 
          onEdit={handleEditNews}
          onDelete={handleDeleteNews}
        />
      </div>
      
      <NewsCreateEditModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)}
        editingNews={editingNews}
      />
      
      <NewsDeleteConfirmation
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
};
