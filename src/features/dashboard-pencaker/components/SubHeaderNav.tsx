"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { allNavItems } from "../utils/navConfig.util";

export default function SubHeaderNav() {
  const pathname = usePathname() || "/dashboard";

  return (
    <div className="bg-white border-b border-slate-200 hidden md:block">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav
          aria-label="Akses cepat"
          className="flex items-center gap-6 overflow-x-auto no-scrollbar py-2 text-xs"
        >
          <span className="text-slate-400 font-bold uppercase text-[10px] shrink-0">
            Akses Cepat:
          </span>
          {allNavItems.slice(4).map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1.5 py-1 px-2.5 rounded-full font-medium shrink-0 transition-colors ${
                  isActive
                    ? "bg-app-navy-700 text-white"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
