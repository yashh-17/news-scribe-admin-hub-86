
import React from 'react';
import { ReportsDashboard } from '@/components/reports/ReportsDashboard';

const ReportsPage: React.FC = () => {
  return (
    <div className="h-full flex flex-col">
      <h1 className="text-2xl font-bold mb-6">Reports Management</h1>
      <div className="flex-1">
        <ReportsDashboard />
      </div>
    </div>
  );
};

export default ReportsPage;
