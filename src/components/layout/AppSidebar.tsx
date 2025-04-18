
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Newspaper, 
  BarChart3, 
  Users, 
  FileText, 
  Flag,
  Bell,
  MenuIcon
} from 'lucide-react';
import { useSidebar } from '@/components/ui/sidebar';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuBadge,
  SidebarTrigger
} from '@/components/ui/sidebar';
import { useNotificationStore } from '@/lib/notification/notification-store';

export const AppSidebar = () => {
  const { state } = useSidebar();
  const location = useLocation();
  const unreadCount = useNotificationStore(state => state.unreadCount);
  
  const menuItems = [
    {
      title: "News",
      path: "/",
      icon: Newspaper,
      exact: true
    },
    {
      title: "Analytics",
      path: "/analytics",
      icon: BarChart3
    },
    {
      title: "Advertisements",
      path: "/advertisements",
      icon: FileText
    },
    {
      title: "Users",
      path: "/users",
      icon: Users
    },
    {
      title: "Reports",
      path: "/reports",
      icon: Flag
    },
    {
      title: "Notifications",
      path: "/notifications",
      icon: Bell,
      badge: unreadCount > 0 ? unreadCount : undefined
    }
  ];

  const isActive = (path: string, exact?: boolean) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <Sidebar 
      collapsible="icon"
      className="border-r border-gray-200"
      onMouseEnter={() => {}}
      onMouseLeave={() => {}}
    >
      <SidebarHeader className="h-14 flex items-center px-3 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
            <Newspaper className="h-4 w-4" />
          </div>
          <span className="font-semibold text-gray-900">News Admin</span>
        </div>
        <div className="ml-auto">
          <SidebarTrigger>
            <MenuIcon className="h-4 w-4" />
          </SidebarTrigger>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-2">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.path}>
              <SidebarMenuButton
                asChild
                tooltip={item.title}
                isActive={isActive(item.path, item.exact)}
              >
                <Link to={item.path}>
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
              {item.badge && (
                <SidebarMenuBadge>
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-md bg-red-500 px-1.5 text-xs font-medium text-white">
                    {item.badge}
                  </span>
                </SidebarMenuBadge>
              )}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
};
