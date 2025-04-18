
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Image, Video, File, FileAudio, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useNewsStore } from "@/lib/news/news-store";
import { Pagination } from "./Pagination";

interface NewsTableProps {
  onEdit: (news: NewsItem) => void;
  onDelete: (id: string) => void;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const NewsTable = ({ 
  onEdit, 
  onDelete, 
  currentPage,
  onPageChange
}: NewsTableProps) => {
  const { paginatedNewsItems, totalPages } = useNewsStore();
  
  const getMediaIcon = (news: NewsItem) => {
    const icons = [];
    
    if (news.image) icons.push(<Image key="image" className="h-4 w-4 text-blue-500" />);
    if (news.video) icons.push(<Video key="video" className="h-4 w-4 text-red-500" />);
    if (news.audio) icons.push(<FileAudio key="audio" className="h-4 w-4 text-green-500" />);
    
    return icons.length ? (
      <div className="flex space-x-1">{icons}</div>
    ) : (
      <File className="h-4 w-4 text-gray-400" />
    );
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">Post ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="hidden md:table-cell">Category</TableHead>
            <TableHead className="hidden md:table-cell">Media</TableHead>
            <TableHead className="hidden md:table-cell">Keywords</TableHead>
            <TableHead className="hidden md:table-cell">Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedNewsItems.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                No news items found. Create your first news post to get started.
              </TableCell>
            </TableRow>
          ) : (
            paginatedNewsItems.map((news) => (
              <TableRow key={news.id}>
                <TableCell className="font-mono text-xs">{news.id.substring(0, 8)}</TableCell>
                <TableCell>
                  <div className="font-medium">{news.title}</div>
                  <div className="text-sm text-gray-500 md:hidden mt-1">
                    {news.category}
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    {news.category}
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {getMediaIcon(news)}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <div className="flex flex-wrap gap-1">
                    {news.keywords.map((keyword, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell text-gray-500 text-sm">
                  {new Date(news.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Link to={`/news/${news.id}`}>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-blue-500 hover:text-blue-700 hover:bg-blue-50"
                      >
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View</span>
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(news)}
                      className="h-8 w-8"
                    >
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(news.id)}
                      className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      
      {totalPages > 1 && (
        <div className="py-4 px-6 border-t border-gray-100">
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </div>
  );
};
