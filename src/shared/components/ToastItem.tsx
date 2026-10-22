"use client";
import React, { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from "lucide-react";
import { Toast, ToastPosition, ToastType } from "../contexts/ToastContext";

interface ToastItemProps {
  toast: Toast;
  removeToast: (id: number) => void;
}

interface TypeStyles {
  card: string;
  icon: string;
  progress: string;
}

export default function ToastItem({ toast, removeToast }: ToastItemProps) {
  const [timeLeft, setTimeLeft] = useState<number>(
    Math.ceil(toast.duration / 1000),
  );

  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 1 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  // Fungsi varian dengan penyesuaian Spring Physics yang lebih organik
  const getVariants = (position: ToastPosition): Variants => {
    const isRight = position.includes("right");
    const isLeft = position.includes("left");
    const isTop = position.includes("top");
    const isBottom = position.includes("bottom");
    const isCenter = position.includes("center");

    return {
      initial: {
        opacity: 0,
        scale: 0.85,
        y: isTop ? -40 : isBottom ? 40 : 0,
        x: isRight ? 80 : isLeft ? -80 : 0,
      },
      animate: {
        opacity: 1,
        scale: 1,
        y: 0,
        x: 0,
        transition: {
          type: "spring",
          stiffness: 380, // Lebih cepat merespon
          damping: 30, // Mengurangi guncangan berlebih agar terlihat stabil
        },
      },
      exit: {
        opacity: 0,
        scale: 0.92,
        transition: {
          duration: 0.15,
          ease: "easeInOut",
        },
      },
    };
  };

  // Preset tema warna modern dengan saturasi border mikro (1px border style)
  const getTypeStyles = (type: ToastType): TypeStyles => {
    switch (type) {
      case "success":
        return {
          card: "border-green-500/50 dark:border-green-500/20 shadow-green-500/[0.02] bg-white/75 dark:bg-zinc-900/75",
          icon: "text-green-500 bg-green-500/10",
          progress: "bg-green-500 dark:bg-green-400",
        };
      case "error":
        return {
          card: "border-rose-500/50 dark:border-rose-500/20 shadow-rose-500/[0.02] bg-white/75 dark:bg-zinc-900/75",
          icon: "text-rose-500 bg-rose-500/10",
          progress: "bg-rose-500 dark:bg-rose-400",
        };
      case "warning":
        return {
          card: "border-amber-500/50 dark:border-amber-500/20 shadow-amber-500/[0.02] bg-white/75 dark:bg-zinc-900/75",
          icon: "text-amber-500 bg-amber-500/10",
          progress: "bg-amber-500 dark:bg-amber-400",
        };
      case "info":
        return {
          card: "border-blue-500/50 dark:border-blue-500/20 shadow-blue-500/[0.02] bg-white/75 dark:bg-zinc-900/75",
          icon: "text-blue-500 bg-blue-500/10",
          progress: "bg-blue-500 dark:bg-blue-400",
        };
      default:
        return {
          card: "border-zinc-500/50 dark:border-zinc-500/20 shadow-zinc-500/[0.02] bg-white/75 dark:bg-zinc-900/75",
          icon: "text-zinc-500 bg-zinc-500/10",
          progress: "bg-zinc-500 dark:bg-zinc-400",
        };
    }
  };

  const getTypeIcon = (type: ToastType): React.ReactNode => {
    switch (type) {
      case "success":
        return <CheckCircle2 size={15} strokeWidth={2.5} />;
      case "error":
        return <XCircle size={15} strokeWidth={2.5} />;
      case "warning":
        return <AlertTriangle size={15} strokeWidth={2.5} />;
      default:
        return <Info size={15} strokeWidth={2.5} />;
    }
  };

  const styles = getTypeStyles(toast.type);
  const variants = getVariants(toast.position);

  const defaultTitle: Record<ToastType, string> = {
    success: "Success",
    error: "Error",
    warning: "Warning",
    info: "Info",
  };

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      layout
      className={`relative min-w-[320px] shadow-md max-w-[380px] rounded-xl border backdrop-blur-md shadow-lg flex flex-col justify-between overflow-hidden pointer-events-auto select-none transition-shadow duration-300 hover:shadow-xl dark:shadow-black/20 ${styles.card}`}
    >
      {/* Konten Utama */}
      <div className="flex justify-between items-start gap-3 p-4">
        <div className="flex items-start gap-3">
          {/* Badge Ikon Lingkaran Kecil */}
          <div
            className={`p-1.5 rounded-lg shrink-0 flex items-center justify-center ${styles.icon}`}
          >
            {getTypeIcon(toast.type)}
          </div>

          {/* Area Teks Informasi */}
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-2">
              <h4 className="text-[13px] font-semibold text-zinc-900 dark:text-zinc-50 tracking-tight">
                {toast.title || defaultTitle[toast.type]}
              </h4>
              {/* Countdown Kapsul Digital Minimalis */}
              <span className="text-[10px] font-medium font-mono px-1.5 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500">
                {timeLeft}s
              </span>
            </div>
            <p className="text-[12px] leading-relaxed text-zinc-500 dark:text-zinc-400 font-normal break-words max-w-[260px]">
              {toast.message}
            </p>
          </div>
        </div>

        {/* Tombol Close Tepi Kanan Atas */}
        <button
          onClick={() => removeToast(toast.id)}
          className="text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer shrink-0"
        >
          <X size={14} strokeWidth={2} />
        </button>
      </div>

      {/* Progress Bar (Garis Tipis Menyatu di Garis Batas Paling Bawah) */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] w-full bg-transparent overflow-hidden">
        <motion.div
          className={`h-full w-full ${styles.progress}`}
          style={{ transformOrigin: "left" }}
          initial={{ scaleX: 1 }}
          animate={{ scaleX: 0 }}
          transition={{ duration: toast.duration / 1000, ease: "linear" }}
        />
      </div>
    </motion.div>
  );
}
