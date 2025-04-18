
import React, { ReactNode } from 'react';
import { AppSidebar } from './AppSidebar';
import { AppHeader } from './AppHeader';
import { SidebarProvider } from "@/components/ui/sidebar";

interface AppLayoutProps {
  children: ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden">
        <AppSidebar />
        <div className="flex-1 overflow-auto">
          <AppHeader />
          <main className="bg-gray-50 min-h-[calc(100vh-53px)]">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};
