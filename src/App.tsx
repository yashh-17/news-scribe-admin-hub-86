
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from '@/lib/auth/authContext';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { LoginPage } from '@/pages/LoginPage';
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import NewsView from "./pages/NewsView";
import AdvertisementPage from "./pages/AdvertisementPage";
import UserPage from "./pages/UserPage";
import { AppLayout } from "./components/layout/AppLayout";

// Create a new QueryClient instance outside the component
const queryClient = new QueryClient();

const App = () => (
  // Remove React.StrictMode to fix the hook issues
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <Index />
                  </AppLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/news/:id"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <NewsView />
                  </AppLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/advertisements"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <AdvertisementPage />
                  </AppLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/users"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <UserPage />
                  </AppLayout>
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
