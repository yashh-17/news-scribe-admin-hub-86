
import { 
  LayoutDashboard, 
  NewspaperIcon, 
  StickyNote, 
  Users,
  ChevronLeft,
  BarChart
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
    title: "Analytics",
    url: "/analytics",
    icon: BarChart,
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
  
  // Use a try-catch to safely access the sidebar context
  let open = false;
  let setOpen = (value: boolean) => {};
  
  try {
    const { open: contextOpen, setOpen: contextSetOpen } = useSidebar();
    open = contextOpen;
    setOpen = contextSetOpen;
  } catch (error) {
    console.error("Sidebar context not available:", error);
    // Fallback behavior is handled by the default values above
  }

  const handleMouseEnter = () => setOpen(true);
  const handleMouseLeave = () => setOpen(false);

  return (
    <Sidebar 
      className="border-r border-gray-200 transition-all duration-300 ease-in-out" 
      collapsible="icon"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <SidebarContent>
        <div className="flex items-center justify-between px-4 py-4">
          <h2 className={`text-xl font-semibold text-gray-800 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`}>
            Admin Panel
          </h2>
          <SidebarTrigger>
            <ChevronLeft className={`h-5 w-5 transition-transform duration-300 ${!open ? 'rotate-180' : ''}`} />
          </SidebarTrigger>
        </div>
        <SidebarGroup>
          <SidebarGroupLabel className={`transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`}>
            Menu
          </SidebarGroupLabel>
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
                      className="w-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
                    >
                      <item.icon className="shrink-0" />
                      <span className={`transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`}>
                        {item.title}
                      </span>
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
