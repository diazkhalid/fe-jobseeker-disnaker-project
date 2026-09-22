"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  HelpCircle,
  ChevronDown,
  MessageCircleQuestion,
  ArrowRight,
} from "lucide-react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  accent?: "teal" | "amber";
}

const faqData: FAQItem[] = [
  {
    id: "faq-1",
    question: "Apa itu Samawa Karir?",
    answer:
      "Samawa Karir adalah platform portal informasi lowongan kerja digital terpadu untuk Kabupaten Sumbawa yang menghubungkan pencari kerja lokal secara langsung dengan perusahaan terpercaya dan instansi resmi.",
    accent: "teal",
  },
  {
    id: "faq-2",
    question: "Apakah pendaftaran pencari kerja gratis?",
    answer:
      "Ya, pendaftaran dan seluruh fasilitas pencarian hingga pengajuan lamaran bagi pencari kerja di Samawa Karir dapat diakses 100% gratis tanpa dipungut biaya apapun.",
    accent: "amber",
  },
  {
    id: "faq-3",
    question: "Bagaimana cara melamar lowongan kerja?",
    answer:
      "Buat akun dan lengkapi profil CV Anda terlebih dahulu. Pilih lowongan yang sesuai, lalu klik tombol 'Lamar Sekarang' untuk mengirimkan berkas digital Anda secara instan.",
    accent: "teal",
  },
  {
    id: "faq-4",
    question: "Apakah semua lowongan kerja di platform sudah diverifikasi?",
    answer:
      "Ya, setiap lowongan dan profil perusahaan melewati proses validasi data internal serta verifikasi kualifikasi untuk menjamin keamanan dari potensi informasi palsu atau penipuan.",
    accent: "amber",
  },
  {
    id: "faq-5",
    question: "Bagaimana cara perusahaan dapat memasang lowongan?",
    answer:
      "Perusahaan dapat mendaftar akun khusus pemberi kerja (Employer), melengkapi identitas legalitas perusahaan, dan mengajukan draf lowongan kerja melalui dasbor perusahaan.",
    accent: "teal",
  },
  {
    id: "faq-6",
    question: "Apakah pencari kerja dari luar Sumbawa dapat mendaftar?",
    answer:
      "Tentu saja. Siapa saja dapat mendaftar, namun prioritas penempatan dan penyerapan tenaga kerja disesuaikan dengan kualifikasi serta kebijakan masing-masing perusahaan perekrut.",
    accent: "amber",
  },
  {
    id: "faq-7",
    question: "Bagaimana cara memperbarui isi CV digital saya?",
    answer:
      "Masuk ke dasbor akun pencari kerja Anda, pilih menu 'Profil Saya' atau 'Riwayat CV', lalu Anda dapat menambahkan sertifikasi, pengalaman kerja, atau pendidikan terbaru kapan saja.",
    accent: "teal",
  },
  {
    id: "faq-8",
    question: "Bagaimana cara melihat status lamaran yang telah dikirim?",
    answer:
      "Buka menu 'Lamaran Saya' di dasbor akun. Anda dapat memantau status secara real-time, mulai dari 'Terkirim', 'Ditinjau', 'Lolos Berkas', hingga 'Panggilan Wawancara'.",
    accent: "amber",
  },
];

export default function FAQSection() {
  const [openId, setOpenId] = useState<string | null>("faq-1");

  const toggleAccordion = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="bg-slate-50 py-14 border-t border-slate-200">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 border border-teal-200 px-3 py-0.5 text-[10px] font-semibold text-teal-700 mb-2">
            <HelpCircle className="h-3 w-3 text-teal-600" />
            <span>Pusat Bantuan & Pertanyaan</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Sering Diajukan (FAQ)
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-slate-600">
            Temukan jawaban cepat mengenai penggunaan platform, proses melamar,
            dan verifikasi di Samawa Karir.
          </p>
        </div>

        {/* Accordion Grid - items-start menjaga posisi elemen tetap di atas saat ekspansi */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-start">
          {faqData.map((faq) => {
            const isOpen = openId === faq.id;
            const isAmber = faq.accent === "amber";

            return (
              <div
                key={faq.id}
                className={`rounded-xl border transition-colors duration-200 overflow-hidden ${
                  isOpen
                    ? isAmber
                      ? "bg-white border-amber-300 shadow-sm"
                      : "bg-white border-teal-300 shadow-sm"
                    : "bg-white/80 border-slate-200 hover:border-slate-300"
                }`}
              >
                {/* Header Question Button */}
                <button
                  type="button"
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full flex items-center justify-between gap-3 p-4 text-left select-none"
                  aria-expanded={isOpen}
                >
                  <span
                    className={`text-xs sm:text-sm font-bold transition-colors ${
                      isOpen
                        ? isAmber
                          ? "text-amber-800"
                          : "text-teal-800"
                        : "text-slate-900"
                    }`}
                  >
                    {faq.question}
                  </span>

                  {/* Rotated Chevron Icon Animation */}
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className={`p-1 rounded-full shrink-0 ${
                      isOpen
                        ? isAmber
                          ? "bg-amber-100 text-amber-700"
                          : "bg-teal-100 text-teal-700"
                        : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    <ChevronDown className="h-3.5 w-3.5" />
                  </motion.div>
                </button>

                {/* Smooth Slide-Down Answer Animation */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 pt-1 border-t border-slate-100 text-xs text-slate-600 leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Bottom Help Banner */}
        <div className="mt-5 p-4 rounded-xl bg-slate-100/80 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-white border border-slate-200 text-amber-600 shrink-0">
              <MessageCircleQuestion className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">
                Punya pertanyaan lain yang belum terjawab?
              </p>
              <p className="text-[11px] text-slate-500">
                Tim layanan bantuan kami siap membantu Anda kapan saja.
              </p>
            </div>
          </div>

          <Link
            href="/bantuan"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:text-teal-800 bg-white hover:bg-teal-50 border border-slate-200 px-3.5 py-2 rounded-lg transition-colors shrink-0 shadow-sm"
          >
            <span>Hubungi Layanan Bantuan</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
