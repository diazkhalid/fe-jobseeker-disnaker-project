import {
  Coffee,
  HeartHandshake,
  ShieldCheck,
  GraduationCap,
  Laptop,
  Clock,
  Car,
  Plane,
  Gift,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

export const getFacilityIcon = (iconKey: string): LucideIcon => {
  switch (iconKey) {
    case "Coffee":
      return Coffee;
    case "HeartHandshake":
      return HeartHandshake;
    case "ShieldCheck":
      return ShieldCheck;
    case "GraduationCap":
      return GraduationCap;
    case "Laptop":
      return Laptop;
    case "Clock":
      return Clock;
    case "Car":
      return Car;
    case "Plane":
      return Plane;
    case "Gift":
      return Gift;
    default:
      return Coffee;
  }
};
