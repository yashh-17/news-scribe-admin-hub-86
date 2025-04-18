
import { NewsReport } from "@/types";
import { createReportNotification, useNotificationStore } from "@/lib/notification/notification-store";

// This would typically come from a database or API
const reportedArticles: NewsReport[] = [
  {
    id: "REP-001",
    articleId: "NEWS-1MF93K",
    articleTitle: "New Technology Breakthrough in AI",
    reporter: "John Doe",
    reason: "Inappropriate content",
    reportedAt: new Date().toISOString(),
  },
  {
    id: "REP-002",
    articleId: "NEWS-2AB7CD",
    articleTitle: "Global Summit on Climate Change Begins",
    reporter: "Jane Smith",
    reason: "Misinformation",
    reportedAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

/**
 * Checks if a news article has been reported
 */
export const isArticleReported = (articleId: string): boolean => {
  return reportedArticles.some(report => report.articleId === articleId);
};

/**
 * Gets all reported article IDs
 */
export const getReportedArticleIds = (): string[] => {
  return reportedArticles.map(report => report.articleId);
};

/**
 * Gets report details for a specific article
 */
export const getReportForArticle = (articleId: string): NewsReport | undefined => {
  return reportedArticles.find(report => report.articleId === articleId);
};

/**
 * Gets all reports
 */
export const getAllReports = (): NewsReport[] => {
  return [...reportedArticles];
};

/**
 * Creates a new report
 */
export const createReport = (report: Omit<NewsReport, "id" | "reportedAt">): NewsReport => {
  const newReport = {
    ...report,
    id: `REP-${reportedArticles.length + 1}`.padStart(7, '0'),
    reportedAt: new Date().toISOString()
  };
  
  reportedArticles.push(newReport);
  
  // Notify admin about the new report
  const { addNotification } = useNotificationStore.getState();
  addNotification(createReportNotification(report.articleTitle, report.articleId));
  
  return newReport;
};

/**
 * Delete a report
 */
export const deleteReport = (reportId: string): boolean => {
  const initialLength = reportedArticles.length;
  const index = reportedArticles.findIndex(report => report.id === reportId);
  
  if (index !== -1) {
    reportedArticles.splice(index, 1);
    return reportedArticles.length < initialLength;
  }
  
  return false;
};
