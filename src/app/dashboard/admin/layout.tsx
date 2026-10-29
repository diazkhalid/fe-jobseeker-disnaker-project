"use client";
import NavbarDashboardAdmin from "@/features/dashboard-admin/components/Navbar";
import SidebarAdmin from "@/features/dashboard-admin/components/Sidebar";
import NavbarDashboardPerusahaan from "@/features/dashboard-perusahaan/components/Navbar";
import Sidebar from "@/features/dashboard-perusahaan/components/Sidebar";
import { useAuthUser } from "@/shared/contexts/SessionContext";
import { useToast } from "@/shared/contexts/ToastContext";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function DashboardAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, isLoading } = useAuthUser();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkLogin = () => {
      if (isLoading) return;

      if (user?.account_type !== "admin_disnakertrans") {
        setIsAuthorized(false);
        router.push("/403");
        return;
      }
      setIsAuthorized(true);
    };
    checkLogin();
  }, [user, isLoading, router]);
  if (!isAuthorized) return null;
  return (
    <div className="flex flex-row w-full bg-slate-100/30">
      <SidebarAdmin></SidebarAdmin>
      <div className="flex flex-col min-h-screen w-[85%]">
        <NavbarDashboardAdmin></NavbarDashboardAdmin>
        <div className="p-7">{children}</div>
      </div>
    </div>
  );
}
