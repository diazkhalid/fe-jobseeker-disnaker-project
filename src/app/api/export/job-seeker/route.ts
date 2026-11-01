/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import puppeteer from "puppeteer";
import getLogo from "@/shared/utils/getLogo";
import { renderJobSeekerReport } from "@/shared/utils/renderJobSeekerExportReport";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const dataList = body.data || [];
    const filterParams = body.filter || null; // Ambil parameter filter

    // Dapatkan base64 logo Pemda Kabupaten Sumbawa
    const logo = getLogo();

    // Render HTML dengan menyertakan filterParams
    const html = await renderJobSeekerReport(dataList, logo, filterParams, {
      adminName: body.admin_name,
    });

    const browser = await puppeteer.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--allow-file-access-from-files",
      ],
    });

    const page = await browser.newPage();

    await page.setContent(html, {
      waitUntil: "networkidle0" as any,
    });

    const pdfBuffer = await page.pdf({
      format: "A4",
      landscape: true,
      printBackground: true,
      margin: {
        top: "10mm",
        bottom: "15mm",
        left: "10mm",
        right: "10mm",
      },
      displayHeaderFooter: true,
      headerTemplate: "<div></div>",
      footerTemplate: `
        <div style="font-size: 8px; text-align: right; width: 95%; font-family: Arial, sans-serif; color: #555;">
          Halaman <span class="pageNumber"></span> dari <span class="totalPages"></span> | Dokumen Resmi Disnakertrans Kab. Sumbawa (Samawa Karir)
        </div>
      `,
    });

    await browser.close();

    const fileName = `Laporan_Pelamar_SamawaKarir_${new Date().getTime()}.pdf`;

    return new Response(Buffer.from(pdfBuffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=${fileName}`,
      },
    });
  } catch (error: any) {
    console.error("Gagal Generate PDF Laporan Pelamar:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}
