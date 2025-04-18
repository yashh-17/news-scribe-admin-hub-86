
import React from 'react';
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useAuth } from "@/lib/auth/authContext";
import { useNavigate } from "react-router-dom";
import { NotificationBell } from '@/components/notifications/NotificationBell';

export const AppHeader = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="border-b bg-white py-2 px-4 flex justify-between items-center">
      <div className="flex-1">
        {/* Left side content if needed */}
      </div>
      <div className="flex items-center gap-2">
        <NotificationBell />
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          <span className="hidden sm:inline">Logout</span>
        </Button>
      </div>
    </header>
  );
};
