
import React from 'react';
import { ReportsDashboard } from "@/components/reports/ReportsDashboard";
import { Card } from "@/components/ui/card";

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
        <p className="text-muted-foreground">Manage and review reported news articles</p>
      </div>
      <Card className="p-6">
        <ReportsDashboard />
      </Card>
    </div>
  );
}
