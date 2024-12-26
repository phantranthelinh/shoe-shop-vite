import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar/AppSidebar";
import { useAuth } from "@/hooks/api/useAuth";
import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { getFromLocal } from "@/utils/local-storage.util";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated && !getFromLocal("token")) {
      navigate({
        to: "/login",
      });
    }
  }, [isAuthenticated]);
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <SidebarTrigger />
        <div className="p-4 w-full">{children}</div>
      </main>
    </SidebarProvider>
  );
}
