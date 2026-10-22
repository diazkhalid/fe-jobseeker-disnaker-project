"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  ReactNode,
} from "react";
import ToastItem from "../components/ToastItem";
import { AnimatePresence } from "framer-motion";

// 1. Definisikan Tipe-Tipe Data (Type Definitions)
export type ToastType = "success" | "error" | "warning" | "info";
export type ToastPosition =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "top-center"
  | "bottom-center";

export interface Toast {
  id: number;
  message: string;
  title?: string;
  type: ToastType;
  duration: number;
  position: ToastPosition;
  isExiting: boolean;
}

interface ToastContextType {
  addToast: (
    message: string,
    type?: ToastType,
    duration?: number,
    position?: ToastPosition,
    title?: string,
  ) => void;
}

// 2. Buat Context dengan Tipe Data yang Sesuai
const ToastContext = createContext<ToastContextType | undefined>(undefined);

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Menerapkan tipe NodeJS.Timeout atau nomor biasa untuk kecocokan browser/node environment
  const timersRef = useRef<Record<number, ReturnType<typeof setTimeout>>>({});

  const removeToast = useCallback((id: number) => {
    setToasts((prev) =>
      prev.map((toast) =>
        toast.id === id ? { ...toast, isExiting: true } : toast,
      ),
    );

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
      delete timersRef.current[id];
    }, 300); // durasi animasi keluar (cocok dengan CSS animation-duration)
  }, []);

  const addToast = useCallback(
    (
      message: string,
      type: ToastType = "success",
      duration: number = 3000,
      position: ToastPosition = "top-right",
      title?: string,
    ) => {
      const id = Date.now();

      setToasts((prev) => [
        ...prev,
        { id, message, type, duration, position, isExiting: false, title },
      ]);

      const timer = setTimeout(() => {
        removeToast(id);
      }, duration);

      timersRef.current[id] = timer;
    },
    [removeToast],
  );

  // Mengelompokkan toast berdasarkan properti posisinya
  const groupedToasts = toasts.reduce<Record<string, Toast[]>>((acc, toast) => {
    acc[toast.position] = acc[toast.position] || [];
    acc[toast.position].push(toast);
    return acc;
  }, {});

  const getPositionClass = (position: ToastPosition): string => {
    switch (position) {
      case "top-left":
        return "top-4 left-4 sm:left-4";
      case "top-right":
        return "top-4 right-4 sm:right-4";
      case "bottom-left":
        return "bottom-4 left-4 sm:left-4";
      case "bottom-right":
        return "bottom-4 right-4 sm:right-4";
      case "top-center":
        return "top-4 left-1/2 -translate-x-1/2";
      case "bottom-center":
        return "bottom-4 left-1/2 -translate-x-1/2";
      default:
        return "top-4 right-4";
    }
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}

      {Object.entries(groupedToasts).map(([position, group]) => (
        <div
          key={position}
          className={`fixed space-y-2 z-[99999] ${getPositionClass(position as ToastPosition)} w-full px-3 sm:w-auto sm:px-0 pointer-events-none flex flex-col items-center sm:items-start`}
        >
          {/* Bungkus map kelompok toast Anda di sini */}
          <AnimatePresence>
            {group.map((toast) => (
              <ToastItem
                key={toast.id}
                toast={toast}
                removeToast={removeToast}
              />
            ))}
          </AnimatePresence>
        </div>
      ))}
    </ToastContext.Provider>
  );
};

// 3. Custom Hook dengan Validasi Proteksi Null/Undefined
export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error(
      "useToast harus digunakan di dalam komponen <ToastProvider>",
    );
  }
  return context;
};
