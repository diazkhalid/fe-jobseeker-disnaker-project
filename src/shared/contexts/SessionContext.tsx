/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { usePathname } from "next/navigation";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useToast } from "./ToastContext";
import { me } from "@/features/auth/services/auth.service";

// 1. Definisikan interface untuk tipe data User Anda (Sesuaikan dengan payload API Anda)
interface UserData {
  id: string;
  name: string;
  email: string;
  role?: string;
  [key: string]: any; // fallback untuk property opsional lainnya
}

// 2. Definisikan interface untuk Value Context
interface AuthContextType {
  user: UserData | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  toggleUpdate: boolean;
  setToggleUpdateAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

// 3. Inisialisasi Context dengan tipe data yang jelas
const AuthUserContext = createContext<AuthContextType | undefined>(undefined);

interface AuthUserProviderProps {
  children: ReactNode;
}

export const AuthUserProvider = ({ children }: AuthUserProviderProps) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const pathname = usePathname();
  const [toggleUpdate, setToggleUpdateAuth] = useState<boolean>(false);
  const { addToast } = useToast();

  useEffect(() => {
    async function fetchSession() {
      // Pastikan kode ini hanya berjalan di sisi client (browser)
      if (typeof window === "undefined") return;

      const token = localStorage.getItem("access-token");
      if (!token) {
        setUser(null);
        setIsLoading(false);
        return;
      }

      try {
        console.log(token);

        const authenticatedUser = await me(token);

        // PENCEGAHAN CRASH: Cek apakah response valid dan tidak gagal
        console.log(authenticatedUser);
        if (!authenticatedUser || authenticatedUser.success === false) {
          if (authenticatedUser?.status === 401) {
            localStorage.removeItem("access-token");
            setUser(null);
          } else {
            // Jika status 500 atau server error lainnya
            addToast(
              authenticatedUser?.message || "Kesalahan sistem pada server",
              "error",
            );
          }
          setIsLoading(false);
          return;
        }

        // Jika sukses dan data tersedia
        if (authenticatedUser?.data) {
          setUser(authenticatedUser.data);
        } else {
          setUser(null);
        }
      } catch (error) {
        // Menjaga jika fungsi session() melempar error tak terduga yang belum di-catch
        console.error("Auth session check failed:", error);
        addToast("Gagal memuat sesi autentikasi", "error");
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    }

    fetchSession();
  }, [pathname, toggleUpdate]);

  const authConfig: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    toggleUpdate,
    setToggleUpdateAuth,
  };

  return (
    <AuthUserContext.Provider value={authConfig}>
      {children}
    </AuthUserContext.Provider>
  );
};

// 4. Custom hook yang aman dengan proteksi TypeScript
export const useAuthUser = (): AuthContextType => {
  const context = useContext(AuthUserContext);
  if (context === undefined) {
    throw new Error("useAuthUser must be used within an AuthUserProvider");
  }
  return context;
};
