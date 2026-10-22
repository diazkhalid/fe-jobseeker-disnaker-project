/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";

// Menggunakan tipe data Generic <T> agar tipe nilainya dinamis namun tetap strict
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (newValue: T) => void] {
  const [value, setValue] = useState<T>(initialValue);

  // Get item saat pertama mount
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const stored = localStorage.getItem(key);
        if (stored !== null) {
          // Coba parse dulu jika berupa JSON string ter-enkripsi
          try {
            const parsed = JSON.parse(stored) as T;
            setValue(parsed);
          } catch {
            // Kalau gagal parse, berarti string biasa. Dipaksa (cast) menjadi tipe T
            setValue(stored as unknown as T);
          }
        }
      }
    } catch (err) {
      console.error("useLocalStorage read error:", err);
    }
  }, [key]);

  const setStoredValue = (newValue: T) => {
    try {
      setValue(newValue);
      if (typeof window !== "undefined") {
        if (typeof newValue === "object" && newValue !== null) {
          localStorage.setItem(key, JSON.stringify(newValue));
        } else {
          // Mengonversi data primitif (string/number/boolean) ke bentuk string untuk localStorage
          localStorage.setItem(key, String(newValue));
        }
      }
    } catch (err) {
      console.error("Error saving to localStorage:", err);
    }
  };

  // Mengembalikan data berupa Tuple tipe data strict [Value, Setter]
  return [value, setStoredValue];
}
