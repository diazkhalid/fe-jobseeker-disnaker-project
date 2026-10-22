// context/ConfirmContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle } from "lucide-react";

type ConfirmFunction = (message: string, title?: string) => Promise<boolean>;

const ConfirmContext = createContext<ConfirmFunction | undefined>(undefined);

interface ConfirmOptions {
  message: string;
  title: string;
}

interface ConfirmProviderProps {
  children: ReactNode;
}

export const ConfirmProvider = ({ children }: ConfirmProviderProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [options, setOptions] = useState<ConfirmOptions>({
    message: "",
    title: "",
  });
  const [resolvePromise, setResolvePromise] = useState<
    ((value: boolean) => void) | null
  >(null);

  const confirm = useCallback(
    (message: string, title: string = "Konfirmasi") => {
      setIsOpen(true);
      setOptions({ message, title });
      return new Promise<boolean>((resolve) => {
        setResolvePromise(() => resolve);
      });
    },
    [],
  );

  const handleConfirm = () => {
    setIsOpen(false);
    resolvePromise?.(true);
  };

  const handleCancel = () => {
    setIsOpen(false);
    resolvePromise?.(false);
  };

  return (
    <ConfirmContext.Provider value={confirm}>
      {children}

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            {/* Backdrop dengan warna gelap yang solid dan elegan */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCancel}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-md"
            />

            {/* Kontainer Modal Simetris & Terpusat */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ type: "spring", duration: 0.3 }}
              className="relative bg-white w-full max-w-sm rounded-2xl p-6 shadow-xl border border-slate-100 z-10 flex flex-col items-center text-center"
            >
              {/* Lingkaran Ikon Minimalis Terpusat */}
              <div className="w-12 h-12 rounded-full bg-orange-50 border border-orange-200/80 flex items-center justify-center text-orange-400 shadow-inner mb-4">
                <AlertCircle size={20} strokeWidth={2.5} />
              </div>

              {/* Konten Teks */}
              <div className="space-y-2 mb-6">
                <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                  {options.title}
                </h2>
                <p className="text-xs font-normal text-slate-500 leading-relaxed max-w-[90%] mx-auto">
                  {options.message}
                </p>
              </div>

              {/* Tombol Aksi Vertikal / Full-Width Stacked */}
              <div className="w-full flex flex-col gap-2">
                <button
                  type="button"
                  onClick={handleConfirm}
                  className="w-full py-2.5 bg-secondary-600 hover:bg-secondary-600/95 text-white font-semibold text-xs rounded-xl shadow-sm transition-all cursor-pointer transform active:scale-[0.99]"
                >
                  Ya, Lanjutkan
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="w-full py-2.5 bg-slate-100 hover:bg-slate-50 text-slate-500 font-medium text-xs rounded-xl border border-transparent hover:border-slate-200/60 transition-all cursor-pointer transform active:scale-[0.99]"
                >
                  Batalkan
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </ConfirmContext.Provider>
  );
};

export const useConfirm = (): ConfirmFunction => {
  const context = useContext(ConfirmContext);
  if (!context) {
    throw new Error("useConfirm harus digunakan dalam <ConfirmProvider>");
  }
  return context;
};
