
import React from 'react';
import { ReportsDashboard } from '@/components/reports/ReportsDashboard';

const ReportsPage: React.FC = () => {
  return (
    <div className="h-full">
      <h1 className="text-2xl font-bold mb-6">Reports Management</h1>
      <ReportsDashboard />
    </div>
  );
};

export default ReportsPage;
