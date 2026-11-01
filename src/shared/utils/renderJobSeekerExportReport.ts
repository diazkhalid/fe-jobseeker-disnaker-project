/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from "fs";
import path from "path";
import {
  AdminExportJobSeekerResult,
  AdminExportJobSeekerFilter,
} from "@/features/dashboard-admin/types/AdminJobSeeker.type";
import { userGenderMap } from "./userGenderMap";
import { mapPayloadToJobStatus, mapPayloadToJobSystem } from "./userJobMap";
import { employmentTypeMap } from "./emplymentTypeMap";
import { getDistrictNameByCode } from "./districtCodeNameMap";
import {
  getIndustriesName,
  getJobCategoryName,
  getJobPositionName,
} from "./getOptionName";

function escapeRegex(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function formatRupiah(num: number) {
  if (num === undefined || num === null) return "0";
  return new Intl.NumberFormat("id-ID").format(num);
}

// Helper untuk menyusun deskripsi filter yang aktif ke dalam bentuk Tabel Sub-Grid 2 Kolom
async function generateFilterTableSummary(
  filter?: AdminExportJobSeekerFilter,
): Promise<string> {
  if (!filter) {
    return '<span style="color: #64748b; font-style: italic;">Semua Data (Tanpa Kriteria Filter Khusus)</span>';
  }

  const items: { label: string; value: string }[] = [];

  if (filter.education_level) {
    items.push({
      label: "Pendidikan Terakhir",
      value: filter.education_level,
    });
  }

  if (filter.gender) {
    items.push({
      label: "Jenis Kelamin",
      value: filter.gender === "male" ? "Laki-laki" : "Perempuan",
    });
  }

  if (filter.district_code) {
    items.push({
      label: "Domisili (Kecamatan)",
      value: getDistrictNameByCode(filter.district_code),
    });
  }

  if (filter.preferred_district_code) {
    items.push({
      label: "Pref. Tempat Kerja",
      value: getDistrictNameByCode(filter.preferred_district_code),
    });
  }

  // Industri
  if (filter.industry_id !== null) {
    items.push({
      label: "Industri",
      value: await getIndustriesName(filter.industry_id),
    });
  }
  // Bidang Pekerjaan
  if (filter.job_field_id !== null) {
    items.push({
      label: "Bidang Pekerjaan",
      value: await getJobCategoryName(filter.job_field_id),
    });
  }
  // Posisi Pekerjaan
  if (filter.position_id !== null) {
    items.push({
      label: "Posisi Pekerjaan",
      value: await getJobPositionName(filter.position_id),
    });
  }

  if (filter.min_age !== null || filter.max_age !== null) {
    items.push({
      label: "Rentang Usia",
      value: `${filter.min_age ?? 0} s.d. ${filter.max_age ?? "∞"} Tahun`,
    });
  }

  if (filter.min_salary !== null || filter.max_salary !== null) {
    items.push({
      label: "Ekspektasi Gaji",
      value: `Rp ${formatRupiah(filter.min_salary ?? 0)} - Rp ${formatRupiah(filter.max_salary ?? 0)}`,
    });
  }

  if (filter.job_type) {
    items.push({
      label: "Jenis Pekerjaan",
      value: employmentTypeMap[filter.job_type] || filter.job_type,
    });
  }

  if (filter.work_arrangement) {
    items.push({
      label: "Sistem Kerja",
      value:
        mapPayloadToJobSystem(filter.work_arrangement) ||
        filter.work_arrangement,
    });
  }

  if (filter.job_search_status) {
    items.push({
      label: "Status Pencarian",
      value:
        mapPayloadToJobStatus(filter.job_search_status) ||
        filter.job_search_status,
    });
  }

  if (filter.willing_to_relocate !== null) {
    items.push({
      label: "Kesediaan Relokasi",
      value: filter.willing_to_relocate ? "Ya (Bersedia)" : "Tidak Bersedia",
    });
  }

  if (filter.is_fresh_graduate !== null) {
    items.push({
      label: "Status Fresh Graduate",
      value: filter.is_fresh_graduate ? "Ya" : "Tidak",
    });
  }

  if (items.length === 0) {
    return '<span style="color: #64748b; font-style: italic;">Semua Data (Tanpa Kriteria Filter Khusus)</span>';
  }

  let tableHtml = '<table class="filter-subtable"><tr>';

  items.forEach((item, index) => {
    tableHtml += `
        <td width="20%" style="font-weight: bold; color: #475569;">• ${item.label}</td>
        <td width="30%" style="color: #0f172a;">: ${item.value}</td>
      `;

    if ((index + 1) % 2 === 0 && index < items.length - 1) {
      tableHtml += "</tr><tr>";
    }
  });

  tableHtml += "</tr></table>";

  return tableHtml;
}

export async function renderJobSeekerReport(
  dataList: AdminExportJobSeekerResult[],
  logoBase64: string,
  filterParams?: AdminExportJobSeekerFilter,
  metaInfo?: { adminName?: string; signedBy?: string; nip?: string },
) {
  // 1. Render Baris Tabel Data Pelamar
  const rowsDetail =
    dataList.length > 0
      ? dataList
          .map((item, index) => {
            const genderStr = userGenderMap[item.Gender] || item.Gender || "-";
            const statusStr =
              mapPayloadToJobStatus(item.JobSearchStatus) || "Aktif";

            const positionsHtml =
              item.PreferredPositions && item.PreferredPositions.length > 0
                ? item.PreferredPositions.map(
                    (pos) => `<span class="badge-tag">${pos}</span>`,
                  ).join(" ")
                : "-";

            const preferredDistrictsStr =
              item.PreferredDistricts && item.PreferredDistricts.length > 0
                ? item.PreferredDistricts.join(", ")
                : "-";

            return `
              <tr>
                <td class="center">${index + 1}</td>
                <td>
                  <strong>${item.FullName || "-"}</strong><br />
                  <span style="font-family: monospace; font-size: 8.5px; color: #444;">NIK: ${item.NIK || "-"}</span>
                </td>
                <td>
                  <strong>${item.Education || "-"}</strong><br />
                  <span style="font-size: 8.5px; color: #555;">${genderStr} • ${item.Age || 0} Thn</span>
                </td>
                <td>
                  <strong>Dom:</strong> ${item.DistrictName || "-"}<br />
                  <span style="font-size: 8.5px; color: #555;"><strong>Pref:</strong> ${preferredDistrictsStr}</span>
                </td>
                <td>${positionsHtml}</td>
                <td class="right bold" style="color: #0f766e;">
                  Rp ${formatRupiah(item.MinSalary)} - Rp ${formatRupiah(item.MaxSalary)}
                </td>
                <td class="center">
                  <span style="font-weight: bold; font-size: 8.5px;">${statusStr}</span>
                </td>
              </tr>
            `;
          })
          .join("")
      : `<tr><td colspan="7" class="center" style="padding: 20px;">Tidak ada data pelamar yang sesuai dengan kriteria filter.</td></tr>`;

  // 2. Baca Berkas Template HTML Laporan
  const templatePath = path.join(
    process.cwd(),
    "src/shared/templates/laporan-export-jobseeker.html",
  );
  let html = fs.readFileSync(templatePath, "utf8");

  const todayStr = new Date().toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // 3. Siapkan Objek Data Placeholder (Key disesuaikan dengan HTML)
  const preparedData: Record<string, any> = {
    logo: logoBase64,
    rowsDetail,
    total_data: dataList.length,
    tanggal_cetak: todayStr,
    tanggal_ttd: todayStr,
    filter_applied_table: await generateFilterTableSummary(filterParams),
    nama_admin: metaInfo?.adminName || "Administrator System",
    nama_penandatangan:
      metaInfo?.signedBy || "DR. H. MUHAMMAD IKBAL, S.SKM., M.SI",
    nip_penandatangan: metaInfo?.nip || "19750812 200003 1 004",
    signature_img_tag: "",
  };

  // 4. Inject Placeholder ke HTML String
  Object.entries(preparedData).forEach(([key, value]) => {
    const regex = new RegExp(`{{\\s*${escapeRegex(key)}\\s*}}`, "g");
    html = html.replace(regex, String(value ?? ""));
  });

  return html;
}
