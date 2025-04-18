
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
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuBadge
} from '@/components/ui/sidebar';
import { useNotificationStore } from '@/lib/notification/notification-store';
import { Badge } from '@/components/ui/badge';

export const AppSidebar = () => {
  const { state } = useSidebar();
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
          {state === "expanded" && (
            <div className="font-semibold text-lg">News Admin</div>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="News">
              <Link to="/" className={isActive('/') ? 'data-[active=true]' : ''}>
                <Newspaper className={iconClass} />
                <span>News</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Analytics">
              <Link to="/analytics" className={isActive('/analytics') ? 'data-[active=true]' : ''}>
                <BarChart className={iconClass} />
                <span>Analytics</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Advertisements">
              <Link to="/advertisements" className={isActive('/advertisements') ? 'data-[active=true]' : ''}>
                <FileText className={iconClass} />
                <span>Advertisements</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Users">
              <Link to="/users" className={isActive('/users') ? 'data-[active=true]' : ''}>
                <Users className={iconClass} />
                <span>Users</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Reports">
              <Link to="/reports" className={isActive('/reports') ? 'data-[active=true]' : ''}>
                <Flag className={iconClass} />
                <span>Reports</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Notifications">
              <Link to="/notifications" className={isActive('/notifications') ? 'data-[active=true]' : ''}>
                <Bell className={iconClass} />
                <span>Notifications</span>
              </Link>
            </SidebarMenuButton>
            {unreadCount > 0 && (
              <SidebarMenuBadge>
                <Badge variant="destructive" className="h-5 min-w-5 flex items-center justify-center p-0 text-xs">
                  {unreadCount}
                </Badge>
              </SidebarMenuBadge>
            )}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t p-3">
        <div className="flex items-center justify-center">
          <div className="text-xs text-gray-500">v1.0.0</div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};
