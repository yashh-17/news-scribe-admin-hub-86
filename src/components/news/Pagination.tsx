
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    // Calculate start and end page numbers to display
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    // Adjust startPage if endPage is at maximum
    if (endPage === totalPages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    // First page
    if (startPage > 1) {
      pages.push(
        <Button
          key="1"
          variant="ghost"
          size="sm"
          onClick={() => goToPage(1)}
          className="h-8 w-8 p-0"
        >
          1
        </Button>
      );
      
      if (startPage > 2) {
        pages.push(
          <span key="ellipsis1" className="px-2 text-gray-400">
            ...
          </span>
        );
      }
    }
    
    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <Button
          key={i}
          variant={i === currentPage ? "default" : "ghost"}
          size="sm"
          onClick={() => goToPage(i)}
          className={`h-8 w-8 p-0 ${i === currentPage ? "bg-blue-600 text-white" : ""}`}
        >
          {i}
        </Button>
      );
    }
    
    // Last page
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <span key="ellipsis2" className="px-2 text-gray-400">
            ...
          </span>
        );
      }
      
      pages.push(
        <Button
          key={totalPages}
          variant="ghost"
          size="sm"
          onClick={() => goToPage(totalPages)}
          className="h-8 w-8 p-0"
        >
          {totalPages}
        </Button>
      );
    }
    
    return pages;
  };

  return (
    <div className="flex items-center justify-between">
      <div className="text-sm text-gray-500">
        Page {currentPage} of {totalPages}
      </div>
      <div className="flex items-center space-x-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="h-8 w-8 p-0"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous</span>
        </Button>
        
        <div className="flex items-center">{renderPageNumbers()}</div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="h-8 w-8 p-0"
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next</span>
        </Button>
      </div>
    </div>
  );
};
