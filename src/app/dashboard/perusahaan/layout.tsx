"use client";
import NavbarDashboardPerusahaan from "@/features/dashboard-perusahaan/components/Navbar";
import Sidebar from "@/features/dashboard-perusahaan/components/Sidebar";
import { useAuthUser } from "@/shared/contexts/SessionContext";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function DashboardPerusahaanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, isLoading } = useAuthUser();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const checkLogin = () => {
      if (isLoading) return;

      if (user?.account_type !== "company") {
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
      <Sidebar></Sidebar>
      <div className="flex flex-col min-h-screen w-[85%]">
        <NavbarDashboardPerusahaan></NavbarDashboardPerusahaan>
        <div className="p-7">{children}</div>
      </div>
    </div>
  );
}
