
import React from 'react';
import { format } from "date-fns";
import { useNotificationStore } from "@/lib/notification/notification-store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Bell, Check, Info, Trash2, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const NotificationsPage: React.FC = () => {
  const navigate = useNavigate();
  const { notifications, markAsRead, removeNotification, clearAllNotifications } = useNotificationStore();

  const getNotificationIcon = (notification: Notification) => {
    switch (notification.type) {
      case 'warning':
        return <AlertCircle className="h-6 w-6 text-amber-500" />;
      case 'success':
        return <Check className="h-6 w-6 text-green-500" />;
      case 'error':
        return <X className="h-6 w-6 text-red-500" />;
      case 'info':
      default:
        return <Info className="h-6 w-6 text-blue-500" />;
    }
  };

  const handleNotificationClick = (notification: Notification) => {
    markAsRead(notification.id);
    if (notification.linkTo) {
      navigate(notification.linkTo);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Notifications</h1>
          <p className="text-muted-foreground">View and manage your notifications</p>
        </div>
        {notifications.length > 0 && (
          <Button 
            variant="outline" 
            onClick={clearAllNotifications}
            className="flex items-center gap-2"
          >
            <Trash2 className="h-4 w-4" />
            Clear All
          </Button>
        )}
      </div>

      {notifications.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Bell className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No Notifications</h3>
            <p className="text-muted-foreground text-center mt-1">
              You don't have any notifications at the moment
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {notifications.map((notification) => (
            <Card 
              key={notification.id} 
              className={cn(
                "transition-colors",
                !notification.read && "bg-slate-50 border-l-4 border-l-primary"
              )}
            >
              <CardHeader className="pb-2 pt-4 flex flex-row items-start gap-4">
                <div className="mt-1">
                  {getNotificationIcon(notification)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <CardTitle className="text-lg">{notification.title}</CardTitle>
                    <div className="text-xs text-muted-foreground">
                      {format(new Date(notification.createdAt), "MMM d, yyyy 'at' h:mm a")}
                    </div>
                  </div>
                  <CardDescription className="mt-1 text-sm text-gray-600">
                    {notification.source.charAt(0).toUpperCase() + notification.source.slice(1)} notification
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="pb-3">
                <p className="text-sm">{notification.message}</p>
              </CardContent>
              <CardFooter className="flex justify-end gap-2 py-2">
                <Button 
                  variant="ghost" 
                  className="h-8" 
                  onClick={() => removeNotification(notification.id)}
                >
                  Dismiss
                </Button>
                {notification.linkTo && (
                  <Button 
                    variant="default" 
                    className="h-8" 
                    onClick={() => handleNotificationClick(notification)}
                  >
                    {!notification.read ? "Mark as read & View" : "View"}
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;
