import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useAdvertisementStore } from "@/lib/advertisement/advertisement-store";
import { Edit, Trash2, Link, ExternalLink } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useNewsStore } from "@/lib/news/news-store";
import { Pagination } from "@/components/news/Pagination";
import { useState } from "react";

interface AdvertisementTableProps {
  onEdit: (ad: Advertisement) => void;
  onDelete: (adId: string) => void;
}

export const AdvertisementTable = ({ onEdit, onDelete }: AdvertisementTableProps) => {
  const { advertisements, toggleAdvertisementStatus } = useAdvertisementStore();
  const { newsItems } = useNewsStore();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const getPostTitle = (postId: string) => {
    const post = newsItems.find(item => item.id === postId);
    return post ? post.title : 'Unknown Post';
  };

  // Calculate the start and end index for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Slice the advertisements array to get only the items for the current page
  const paginatedAdvertisements = advertisements.slice(startIndex, endIndex);

  const totalPages = Math.ceil(advertisements.length / itemsPerPage);

  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Status</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Associated Posts</TableHead>
            <TableHead>Redirect URL</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedAdvertisements.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-12">
                <p className="text-muted-foreground">No advertisements found</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Create a new advertisement to get started
                </p>
              </TableCell>
            </TableRow>
          ) : (
            paginatedAdvertisements.map((ad) => (
              <TableRow key={ad.id}>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={ad.isActive}
                      onCheckedChange={() => toggleAdvertisementStatus(ad.id)}
                    />
                    <Badge
                      variant={ad.isActive ? "default" : "outline"}
                      className={ad.isActive ? "bg-green-500" : ""}
                    >
                      {ad.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell>
                  {ad.image ? (
                    <div className="h-14 w-14 overflow-hidden rounded-md">
                      <img
                        src={ad.image}
                        alt={ad.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="h-14 w-14 bg-muted rounded-md flex items-center justify-center">
                      <span className="text-xs text-muted-foreground">No image</span>
                    </div>
                  )}
                </TableCell>
                <TableCell className="font-medium">{ad.title}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1 max-w-[200px]">
                    {ad.postIds.length > 0 ? (
                      ad.postIds.slice(0, 3).map((postId) => (
                        <Badge key={postId} variant="outline" className="text-xs">
                          {getPostTitle(postId).length > 20 
                            ? getPostTitle(postId).substring(0, 20) + '...' 
                            : getPostTitle(postId)}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-muted-foreground text-sm">None</span>
                    )}
                    {ad.postIds.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{ad.postIds.length - 3} more
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  {ad.redirectUrl ? (
                    <div className="flex items-center space-x-2">
                      <Link className="h-4 w-4 text-muted-foreground" />
                      <a
                        href={ad.redirectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline flex items-center text-sm truncate max-w-[150px]"
                      >
                        {ad.redirectUrl}
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </div>
                  ) : (
                    <span className="text-muted-foreground text-sm">N/A</span>
                  )}
                </TableCell>
                <TableCell>
                  <span className="text-muted-foreground text-sm">
                    {formatDistanceToNow(new Date(ad.updatedAt), { addSuffix: true })}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(ad)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(ad.id)}
                      className="text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      
      {totalPages > 1 && (
        <div className="py-4 px-6 border-t">
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
};
