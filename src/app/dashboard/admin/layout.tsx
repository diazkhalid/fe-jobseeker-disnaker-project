import NavbarDashboardAdmin from "@/features/dashboard-admin/components/Navbar";
import SidebarAdmin from "@/features/dashboard-admin/components/Sidebar";
import NavbarDashboardPerusahaan from "@/features/dashboard-perusahaan/components/Navbar";
import Sidebar from "@/features/dashboard-perusahaan/components/Sidebar";
import React from "react";

export default function DashboardAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
