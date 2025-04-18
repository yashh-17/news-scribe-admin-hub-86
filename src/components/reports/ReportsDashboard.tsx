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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, Trash2, Search } from "lucide-react";
import { format } from "date-fns";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { NewsReport } from "@/types";

// Mock data for reports
const mockReports: NewsReport[] = [
  {
    id: "REP-001",
    articleId: "NEWS-1",
    articleTitle: "Breaking News: Important Event",
    reporter: "John Doe",
    reason: "Inappropriate content",
    reportedAt: new Date().toISOString(),
  },
  {
    id: "REP-002",
    articleId: "NEWS-2",
    articleTitle: "Technology Update",
    reporter: "Jane Smith",
    reason: "Misinformation",
    reportedAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

export function ReportsDashboard() {
  const [reports, setReports] = useState<NewsReport[]>(mockReports);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    // Filter reports based on search term
    const filtered = mockReports.filter(report =>
      report.articleTitle.toLowerCase().includes(event.target.value.toLowerCase()) ||
      report.reporter.toLowerCase().includes(event.target.value.toLowerCase()) ||
      report.reason.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setReports(filtered);
  };

  const handleDelete = (reportId: string) => {
    setReports(reports.filter(report => report.id !== reportId));
    toast({
      title: "Report deleted",
      description: "The report has been permanently removed.",
    });
  };

  const handleView = (articleId: string) => {
    navigate(`/news/${articleId}`);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search reports..."
            value={searchTerm}
            onChange={handleSearch}
            className="pl-8"
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Article Title</TableHead>
              <TableHead>Reporter</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Reported Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reports.map((report) => (
              <TableRow key={report.id}>
                <TableCell className="font-medium">{report.articleTitle}</TableCell>
                <TableCell>{report.reporter}</TableCell>
                <TableCell>{report.reason}</TableCell>
                <TableCell>{format(new Date(report.reportedAt), "PPP")}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleView(report.articleId)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" size="icon">
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Report</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete this report? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(report.id)}
                            className="bg-red-500 hover:bg-red-600"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
