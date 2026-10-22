"use client";
import { useAuthUser } from "@/shared/contexts/SessionContext";
import { useToast } from "@/shared/contexts/ToastContext";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, isLoading } = useAuthUser();
  const { addToast } = useToast();

  useEffect(() => {
    if (isLoading) return;

    if (!user) {
      addToast("Sesi habis, silahkan login kembali", "warning", 3000);
      router.push("/login");
    }
  }, [user, isLoading, router]);
  return <div>{children}</div>;
}
