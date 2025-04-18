
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Newspaper, 
  BarChart, 
  Users, 
  FileText, 
  Flag,
  Bell
} from 'lucide-react';
import { useSidebar } from '@/components/ui/sidebar';
import {
  Sidebar,
  SidebarFooter,
  SidebarSection,
  SidebarHeader,
  SidebarItem,
  SidebarItemIcon,
  SidebarItemText,
  SidebarTrigger,
  SidebarContent,
} from '@/components/ui/sidebar';
import { useNotificationStore } from '@/lib/notification/notification-store';
import { Badge } from '@/components/ui/badge';

export const AppSidebar = () => {
  const { isOpen } = useSidebar();
  const location = useLocation();
  const unreadCount = useNotificationStore(state => state.unreadCount);
  
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const linkClass = (path: string) => {
    return `flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
      isActive(path) ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100 text-gray-700'
    }`;
  };

  const iconClass = 'w-5 h-5';

  return (
    <Sidebar>
      <SidebarHeader className="border-b py-4">
        <div className="flex items-center px-3">
          <div className="w-8 h-8 rounded bg-blue-600 text-white flex items-center justify-center mr-2">
            <Newspaper className="w-4 h-4" />
          </div>
          {isOpen && (
            <div className="font-semibold text-lg">News Admin</div>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarSection>
          <SidebarItem>
            <Link to="/" className={linkClass('/')}>
              <SidebarItemIcon>
                <Newspaper className={iconClass} />
              </SidebarItemIcon>
              <SidebarItemText>News</SidebarItemText>
            </Link>
          </SidebarItem>
          <SidebarItem>
            <Link to="/analytics" className={linkClass('/analytics')}>
              <SidebarItemIcon>
                <BarChart className={iconClass} />
              </SidebarItemIcon>
              <SidebarItemText>Analytics</SidebarItemText>
            </Link>
          </SidebarItem>
          <SidebarItem>
            <Link to="/advertisements" className={linkClass('/advertisements')}>
              <SidebarItemIcon>
                <FileText className={iconClass} />
              </SidebarItemIcon>
              <SidebarItemText>Advertisements</SidebarItemText>
            </Link>
          </SidebarItem>
          <SidebarItem>
            <Link to="/users" className={linkClass('/users')}>
              <SidebarItemIcon>
                <Users className={iconClass} />
              </SidebarItemIcon>
              <SidebarItemText>Users</SidebarItemText>
            </Link>
          </SidebarItem>
          <SidebarItem>
            <Link to="/reports" className={linkClass('/reports')}>
              <SidebarItemIcon>
                <Flag className={iconClass} />
              </SidebarItemIcon>
              <SidebarItemText>Reports</SidebarItemText>
            </Link>
          </SidebarItem>
          <SidebarItem>
            <Link to="/notifications" className={linkClass('/notifications')}>
              <SidebarItemIcon>
                <Bell className={iconClass} />
              </SidebarItemIcon>
              <SidebarItemText>
                <div className="flex items-center gap-2">
                  Notifications
                  {unreadCount > 0 && (
                    <Badge variant="destructive" className="h-5 min-w-5 flex items-center justify-center p-0 text-xs">
                      {unreadCount}
                    </Badge>
                  )}
                </div>
              </SidebarItemText>
            </Link>
          </SidebarItem>
        </SidebarSection>
      </SidebarContent>
      <SidebarFooter className="border-t p-3">
        <SidebarTrigger />
      </SidebarFooter>
    </Sidebar>
  );
};

console.log('Sidebar context not available:', {
  _type: 'Error',
  value: {
    name: 'Error',
    message: 'useSidebar must be used within a SidebarProvider',
    stack: 'Error: useSidebar must be used within a SidebarProvider\n    at useSidebar (https://9a308c48-a7c5-48f5-8833-31986cbb2b4b.lovableproject.com/src/components/ui/sidebar/sidebar-context.tsx:21:15)\n    at AppSidebar (https://9a308c48-a7c5-48f5-8833-31986cbb2b4b.lovableproject.com/src/components/layout/AppSidebar.tsx:54:64)\n    at renderWithHooks (https://9a308c48-a7c5-48f5-8833-31986cbb2b4b.lovableproject.com/node_modules/.vite/deps/chunk-T2SWDQEL.js?v=1e8b365a:11548:26)\n    at mountIndeterminateComponent (https://9a308c48-a7c5-48f5-8833-31986cbb2b4b.lovableproject.com/node_modules/.vite/deps/chunk-T2SWDQEL.js?v=1e8b365a:14926:21)\n    at beginWork (https://9a308c48-a7c5-48f5-8833-31986cbb2b4b.lovableproject.com/node_modules/.vite/deps/chunk-T2SWDQEL.js?v=1e8b365a:15914:22)\n    at beginWork$1 (https://9a308c48-a7c5-48f5-8833-31986cbb2b4b.lovableproject.com/node_modules/.vite/deps/chunk-T2SWDQEL.js?v=1e8b365a:19753:22)\n    at performUnitOfWork (https://9a308c48-a7c5-48f5-8833-31986cbb2b4b.lovableproject.com/node_modules/.vite/deps/chunk-T2SWDQEL.js?v=1e8b365a:19198:20)\n    at workLoopSync (https://9a308c48-a7c5-48f5-8833-31986cbb2b4b.lovableproject.com/node_modules/.vite/deps/chunk-T2SWDQEL.js?v=1e8b365a:19137:13)\n    at renderRootSync (https://9a308c48-a7c5-48f5-8833-31986cbb2b4b.lovableproject.com/node_modules/.vite/deps/chunk-T2SWDQEL.js?v=1e8b365a:19116:15)\n    at performSyncWorkOnRoot (https://9a308c48-a7c5-48f5-8833-31986cbb2b4b.lovableproject.com/node_modules/.vite/deps/chunk-T2SWDQEL.js?v=1e8b365a:18874:28)'
  }
});
