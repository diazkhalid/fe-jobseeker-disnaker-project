import { ToastProvider } from "@/shared/contexts/ToastContext";
import React from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <ToastProvider>{children}</ToastProvider>;
}
