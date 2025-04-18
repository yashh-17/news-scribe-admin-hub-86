
import React from 'react';
import { Bell } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { format, formatDistanceToNow } from "date-fns";
import { useNotificationStore } from "@/lib/notification/notification-store";
import { cn } from "@/lib/utils";

export const NotificationBell = () => {
  const navigate = useNavigate();
  const { 
    notifications, 
    unreadCount,
    markAsRead, 
    markAllAsRead 
  } = useNotificationStore();

  const handleNotificationClick = (notification: AppNotification) => {
    markAsRead(notification.id);
    if (notification.linkTo) {
      navigate(notification.linkTo);
    }
  };

  const getNotificationIcon = (type: AppNotification['type']) => {
    switch (type) {
      case 'warning':
        return "⚠️";
      case 'success':
        return "✅";
      case 'error':
        return "❌";
      case 'info':
      default:
        return "ℹ️";
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative p-2 h-10 w-10 rounded-full">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Notifications</span>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              className="h-auto p-1 text-xs"
              onClick={() => markAllAsRead()}
            >
              Mark all as read
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="max-h-80 overflow-y-auto">
          <DropdownMenuGroup>
            {notifications.length === 0 ? (
              <div className="text-center py-4 text-muted-foreground">
                No notifications
              </div>
            ) : (
              notifications.map((notification) => (
                <DropdownMenuItem 
                  key={notification.id}
                  className={cn(
                    "flex flex-col items-start p-3 cursor-pointer",
                    !notification.read && "bg-slate-50"
                  )}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className="flex w-full justify-between">
                    <span className="font-medium flex items-center gap-2">
                      <span>{getNotificationIcon(notification.type)}</span>
                      {notification.title}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                </DropdownMenuItem>
              ))
            )}
          </DropdownMenuGroup>
        </div>
        {notifications.length > 0 && (
          <>
            <DropdownMenuSeparator />
            <div className="p-2 flex justify-center">
              <Button 
                variant="outline" 
                className="w-full text-sm h-8"
                onClick={() => navigate('/notifications')}
              >
                View all notifications
              </Button>
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
