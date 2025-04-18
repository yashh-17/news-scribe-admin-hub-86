
import { 
  LayoutDashboard, 
  NewspaperIcon, 
  StickyNote, 
  Users,
  ChevronLeft
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useSidebar } from "@/components/ui/sidebar/sidebar-context";
import { useEffect } from "react";

const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "News",
    url: "/",
    icon: NewspaperIcon,
  },
  {
    title: "Advertisements",
    url: "/advertisements",
    icon: StickyNote,
  },
  {
    title: "Users",
    url: "/users",
    icon: Users,
  },
];

export function AppSidebar() {
  const location = useLocation();
  const { setOpen } = useSidebar();

  // Function to handle mouse enter/leave events
  const handleMouseEnter = () => setOpen(true);
  const handleMouseLeave = () => setOpen(false);

  return (
    <Sidebar 
      className="border-r border-gray-200" 
      collapsible="icon" 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <SidebarContent>
        <div className="flex items-center justify-between px-4 py-4">
          <h2 className="text-xl font-semibold text-gray-800">Admin Panel</h2>
          <SidebarTrigger>
            <ChevronLeft className="h-5 w-5" />
          </SidebarTrigger>
        </div>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location.pathname === item.url}
                    tooltip={item.title}
                  >
                    <Link 
                      to={item.url} 
                      className="w-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <item.icon className="shrink-0" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
