"use client";
import { useAuthUser } from "@/shared/contexts/SessionContext";
import { userDashboardPath } from "@/shared/utils/userDashboardPath";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function DashboardPage() {
  const router = useRouter();
  const { user, isLoading } = useAuthUser();

  useEffect(() => {
    const checkAccountType = () => {
      if (!user) return;
      if (isLoading) return;
      console.log(user);

      router.push(userDashboardPath[user.account_type]);
    };
    checkAccountType();
  }, [user]);
  return null;
}
