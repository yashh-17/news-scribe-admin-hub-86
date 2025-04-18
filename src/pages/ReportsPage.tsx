
import React from 'react';
import { ReportsDashboard } from '@/components/reports/ReportsDashboard';

const ReportsPage = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Reports Management</h1>
      <ReportsDashboard />
    </div>
  );
};

export default ReportsPage;
