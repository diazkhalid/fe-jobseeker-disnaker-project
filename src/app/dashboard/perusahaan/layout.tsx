import NavbarDashboardPerusahaan from "@/features/dashboard-perusahaan/components/Navbar";
import Sidebar from "@/features/dashboard-perusahaan/components/Sidebar";
import React from "react";

export default function DashboardPerusahaanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-row w-full bg-slate-100/30">
      <Sidebar></Sidebar>
      <div className="flex flex-col min-h-screen w-[85%]">
        <NavbarDashboardPerusahaan></NavbarDashboardPerusahaan>
        <div className="p-7">{children}</div>
      </div>
    </div>
  );
}
