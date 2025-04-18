
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronUp, ChevronDown, Edit, Trash2, Mail, Phone, MapPin } from "lucide-react";
import { useUserStore } from "@/lib/user/user-store";
import { Pagination } from "@/components/news/Pagination";

interface UserTableProps {
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
}

export const UserTable = ({ onEdit, onDelete }: UserTableProps) => {
  // Access store state
  const users = useUserStore((state) => state.users);
  const searchTerm = useUserStore((state) => state.searchTerm);
  const sortField = useUserStore((state) => state.sortField);
  const sortDirection = useUserStore((state) => state.sortDirection);
  const currentPage = useUserStore((state) => state.currentPage);
  const itemsPerPage = useUserStore((state) => state.itemsPerPage);
  const setSorting = useUserStore((state) => state.setSorting);
  const setCurrentPage = useUserStore((state) => state.setCurrentPage);

  // Filter users based on search term
  const filteredUsers = users.filter((user) => {
    if (!searchTerm) return true;
    
    const searchTermLower = searchTerm.toLowerCase();
    return (
      user.name.toLowerCase().includes(searchTermLower) ||
      user.email.toLowerCase().includes(searchTermLower) ||
      user.mobile.toLowerCase().includes(searchTermLower) ||
      user.location.toLowerCase().includes(searchTermLower) ||
      user.role.toLowerCase().includes(searchTermLower)
    );
  });

  // Sort users if a sort field is selected
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (!sortField) return 0;
    
    const aValue = a[sortField].toLowerCase();
    const bValue = b[sortField].toLowerCase();
    
    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  // Paginate users
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = sortedUsers.slice(startIndex, startIndex + itemsPerPage);
  
  // Calculate total pages
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  // Handle sorting
  const handleSort = (field: keyof User) => {
    if (sortField === field) {
      // Toggle direction if clicking the same field
      setSorting(field, sortDirection === "asc" ? "desc" : "asc");
    } else {
      // Default to ascending for a new field
      setSorting(field, "asc");
    }
  };

  // Render sort indicator
  const renderSortIndicator = (field: keyof User) => {
    if (sortField !== field) {
      return null;
    }
    return sortDirection === "asc" ? (
      <ChevronUp className="h-4 w-4 ml-1" />
    ) : (
      <ChevronDown className="h-4 w-4 ml-1" />
    );
  };

  // Sortable column header
  const SortableHeader = ({ 
    field, 
    children,
    className = ""
  }: { 
    field: keyof User, 
    children: React.ReactNode,
    className?: string 
  }) => (
    <TableHead
      className={`cursor-pointer hover:bg-gray-50 ${className}`}
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center">
        {children}
        {renderSortIndicator(field)}
      </div>
    </TableHead>
  );

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <SortableHeader field="name">Name</SortableHeader>
              <SortableHeader field="email">Email</SortableHeader>
              <SortableHeader field="mobile" className="hidden md:table-cell">Mobile</SortableHeader>
              <SortableHeader field="location" className="hidden md:table-cell">Location</SortableHeader>
              <SortableHeader field="role" className="hidden md:table-cell">Role</SortableHeader>
              <SortableHeader field="status">Status</SortableHeader>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  No users found matching your search criteria.
                </TableCell>
              </TableRow>
            ) : (
              paginatedUsers.map((user) => (
                <TableRow key={user.id} className="hover:bg-muted/40">
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 text-muted-foreground mr-2" />
                      <span className="text-sm">{user.email}</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 text-muted-foreground mr-2" />
                      <span className="text-sm">{user.mobile}</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-muted-foreground mr-2" />
                      <span className="text-sm">{user.location}</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge variant="outline">{user.role}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={user.status === "active" ? "default" : "secondary"}
                      className={user.status === "active" ? "bg-green-100 text-green-800 hover:bg-green-100" : "bg-gray-100 text-gray-800 hover:bg-gray-100"}
                    >
                      {user.status === "active" ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEdit(user)}
                        className="h-8 w-8"
                      >
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDelete(user.id)}
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
      </div>

      {totalPages > 1 && (
        <div className="py-4 px-2 flex justify-center border-t">
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
