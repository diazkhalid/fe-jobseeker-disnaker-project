"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl";
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = "lg",
}: ModalProps) {
  // Tutup modal saat menekan tombol ESC Keyboard
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      // Mencegah scroll pada halaman latar belakang saat modal terbuka
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Penentuan ukuran lebar modal
  const getMaxWidthClass = () => {
    switch (maxWidth) {
      case "sm":
        return "max-w-sm";
      case "md":
        return "max-w-md";
      case "xl":
        return "max-w-xl";
      case "2xl":
        return "max-w-2xl";
      case "lg":
      default:
        return "max-w-lg";
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* BACKDROP / OVERLAY (EFEL FADE IN/OUT) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
          />

          {/* KONTEN MODAL (ANIMASI POP-UP SCALE & FADE) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25,
            }}
            className={`relative w-full ${getMaxWidthClass()} bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden z-10 my-auto`}
          >
            {/* MODAL HEADER */}
            {title && (
              <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-slate-50/50">
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                  {title}
                </h3>
                <button
                  onClick={onClose}
                  className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-lg transition-colors cursor-pointer"
                  title="Tutup (Esc)"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* MODAL BODY */}
            <div className="p-5 sm:p-6 max-h-[80vh] overflow-y-auto">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
