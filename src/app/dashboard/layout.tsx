"use client";
import { useAuthUser } from "@/shared/contexts/SessionContext";
import { useToast } from "@/shared/contexts/ToastContext";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { motion } from "framer-motion";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, isLoading } = useAuthUser();
  const { addToast } = useToast();

  useEffect(() => {
    const checkLogin = () => {
      console.log(user);
      console.log(isLoading);

      if (isLoading) return;

      if (!user && !isLoading) {
        addToast("Sesi habis, silahkan login kembali", "warning", 3000);
        router.push("/login");
      }
    };
    checkLogin();
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center gap-4 bg-zinc-50 dark:bg-zinc-950">
        <div className="relative flex items-center justify-center">
          {/* Ring Luar (Latar Belakang Spinner) */}
          <div className="h-8 w-8 rounded-full border-2 border-zinc-200 dark:border-zinc-800" />
          {/* Ring Aktif yang Berputar */}
          <div className="absolute h-8 w-8 animate-spin rounded-full border-2 border-t-secondary-600 border-r-transparent border-b-transparent border-l-transparent" />
        </div>

        {/* Teks dengan Efek Fade-in Motion */}
        <motion.p
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-[12px] font-medium tracking-tight text-zinc-500 dark:text-zinc-400"
        >
          Memuat sesi...
        </motion.p>
      </div>
    );
  }
  return <div>{children}</div>;
}
