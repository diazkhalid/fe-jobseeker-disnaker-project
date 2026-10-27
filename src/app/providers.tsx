import { ConfirmProvider } from "@/shared/contexts/ConfirmDialogContext";
import { AuthUserProvider } from "@/shared/contexts/SessionContext";
import { ToastProvider } from "@/shared/contexts/ToastContext";
import React from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <ConfirmProvider>
        <AuthUserProvider>{children}</AuthUserProvider>
      </ConfirmProvider>
    </ToastProvider>
  );
}
