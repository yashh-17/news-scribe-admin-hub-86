
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNewsStore } from '@/lib/news/news-store';
import { format } from 'date-fns';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CalendarIcon, SortAsc, SortDesc } from "lucide-react";

type SortField = 'title' | 'likes' | 'comments' | 'createdAt';
type SortOrder = 'asc' | 'desc';

export function NewsAnalyticsDashboard() {
  const navigate = useNavigate();
  const newsItems = useNewsStore((state) => state.newsItems);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<SortField>('createdAt');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  const sortedNews = [...newsItems]
    .filter(item => 
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const modifier = sortOrder === 'asc' ? 1 : -1;
      
      if (sortField === 'title') {
        return a.title.localeCompare(b.title) * modifier;
      } else if (sortField === 'createdAt') {
        return (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) * modifier;
      }
      
      // For demo, generate random likes/comments counts
      const aValue = sortField === 'likes' ? 
        Math.floor(Math.random() * 100) : 
        Math.floor(Math.random() * 50);
      const bValue = sortField === 'likes' ? 
        Math.floor(Math.random() * 100) : 
        Math.floor(Math.random() * 50);
      
      return (aValue - bValue) * modifier;
    });

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null;
    return sortOrder === 'asc' ? <SortAsc className="w-4 h-4 ml-2" /> : <SortDesc className="w-4 h-4 ml-2" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
        <Button variant="outline" size="icon">
          <CalendarIcon className="h-4 w-4" />
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead 
                className="cursor-pointer"
                onClick={() => handleSort('title')}
              >
                <div className="flex items-center">
                  Title
                  <SortIcon field="title" />
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer"
                onClick={() => handleSort('likes')}
              >
                <div className="flex items-center">
                  Likes
                  <SortIcon field="likes" />
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer"
                onClick={() => handleSort('comments')}
              >
                <div className="flex items-center">
                  Comments
                  <SortIcon field="comments" />
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer"
                onClick={() => handleSort('createdAt')}
              >
                <div className="flex items-center">
                  Published
                  <SortIcon field="createdAt" />
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedNews.map((news) => (
              <TableRow
                key={news.id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => navigate(`/news/${news.id}`)}
              >
                <TableCell>{news.title}</TableCell>
                <TableCell>{Math.floor(Math.random() * 100)}</TableCell>
                <TableCell>{Math.floor(Math.random() * 50)}</TableCell>
                <TableCell>
                  {format(new Date(news.createdAt), 'MMM d, yyyy')}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
