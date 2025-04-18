
import React from 'react';
import { NewsAnalyticsDashboard } from "@/components/analytics/NewsAnalyticsDashboard";
import { Card } from "@/components/ui/card";

export default function NewsAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">News Analytics</h1>
        <p className="text-muted-foreground">Monitor engagement and performance across all news articles</p>
      </div>
      <Card className="p-6">
        <NewsAnalyticsDashboard />
      </Card>
    </div>
  );
}
