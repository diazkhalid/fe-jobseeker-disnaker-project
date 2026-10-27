import { useState, useEffect, useRef } from "react";
import { JobSeekerPreference } from "../types/UserPreference.type";
import {
  industriesDummyData,
  jobFieldsDummyData,
  preferredPositionsDummyData,
} from "@/shared/data/JobReferenceData";

export function useJobSeekerPreference() {
  // Data District Berbasis Objek (Code & Name)
  const districtDummyData = [
    { code: "52.04.05", name: "Alas" },
    { code: "52.04.17", name: "Alas Barat" },
    { code: "52.04.07", name: "Batu Lanteh" },
    { code: "52.04.20", name: "Buer" },
    { code: "52.04.14", name: "Empang" },
    { code: "52.04.19", name: "Labangka" },
    { code: "52.04.18", name: "Labuhan Badas" },
    { code: "52.04.29", name: "Lantung" },
    { code: "52.04.12", name: "Lape" },
    { code: "52.04.27", name: "Lenangguar" },
    { code: "52.04.26", name: "Lopok" },
    { code: "52.04.02", name: "Lunyuk" },
    { code: "52.04.24", name: "Maronge" },
    { code: "52.04.09", name: "Moyo Hilir" },
    { code: "52.04.10", name: "Moyo Hulu" },
    { code: "52.04.23", name: "Moyo Utara" },
    { code: "52.04.28", name: "Orong Telu" },
    { code: "52.04.13", name: "Plampang" },
    { code: "52.04.21", name: "Rhee" },
    { code: "52.04.11", name: "Ropang" },
    { code: "52.04.08", name: "Sumbawa" },
    { code: "52.04.25", name: "Tarano" },
    { code: "52.04.22", name: "Unter Iwes" },
    { code: "52.04.06", name: "Utan" },
  ];

  const [districtList] = useState(districtDummyData);
  const [selectedDistrictsList, setSelectedDistrictsList] = useState<
    { code: string; name: string }[]
  >([]);

  const [preferences, setPreferences] = useState<JobSeekerPreference>({
    desiredPositions: [],
    jobCategory: "",
    industry: "",
    jobTypes: [],
    workSystems: [],
    expectedSalaryMin: "",
    expectedSalaryMax: "",
    relocationStatus: "",
    jobStatus: "",
  });

  useEffect(() => {
    console.log(preferences);
  }, [preferences]);

  const [preferPositionList, setPreferPositionList] = useState(
    preferredPositionsDummyData,
  );
  const [jobCategoriesList, setJobCategoriesList] =
    useState(jobFieldsDummyData);
  const [industriesList, setIndustriesList] = useState(industriesDummyData);

  const [positionSearch, setPositionSearch] = useState("");
  const [isPositionOpen, setIsPositionOpen] = useState(false);

  const [jobCategorySearch, setJobCategorySearch] = useState("");
  const [isJobCategoryOpen, setIsJobCategoryOpen] = useState(false);

  const [industrySearch, setIndustrySearch] = useState("");
  const [isIndustryOpen, setIsIndustryOpen] = useState(false);

  const [districtSearch, setDistrictSearch] = useState("");
  const [isDistrictOpen, setIsDistrictOpen] = useState(false);

  const districtRef = useRef<HTMLDivElement>(null);

  const filteredPositions = preferPositionList.filter(
    (pos) =>
      pos.toLowerCase().includes(positionSearch.toLowerCase()) &&
      !preferences.desiredPositions.includes(pos),
  );

  const filteredJobCategories = jobCategoriesList.filter((cat) =>
    cat.toLowerCase().includes(jobCategorySearch.toLowerCase()),
  );

  const filteredIndustries = industriesList.filter((ind) =>
    ind.toLowerCase().includes(industrySearch.toLowerCase()),
  );

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsPositionOpen(false);
        setIsJobCategoryOpen(false);
        setIsIndustryOpen(false);
      }
      if (
        districtRef.current &&
        !districtRef.current.contains(event.target as Node)
      ) {
        setIsDistrictOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handler Posisi (Multi-select)
  const handleAddPosition = (pos: string) => {
    if (!preferences.desiredPositions.includes(pos)) {
      setPreferences({
        ...preferences,
        desiredPositions: [...preferences.desiredPositions, pos],
      });
    }
    setPositionSearch("");
    setIsPositionOpen(false);
  };

  const handleRemovePosition = (posToRemove: string) => {
    setPreferences({
      ...preferences,
      desiredPositions: preferences.desiredPositions.filter(
        (pos) => pos !== posToRemove,
      ),
    });
  };

  // Filter data kecamatan berdasarkan pencarian & pastikan belum terpilih
  const filteredDistricts = districtList.filter(
    (item) =>
      item.name.toLowerCase().includes(districtSearch.toLowerCase()) &&
      !selectedDistrictsList.some((selected) => selected.code === item.code),
  );

  const handleAddDistrict = (district: { code: string; name: string }) => {
    if (!selectedDistrictsList.some((item) => item.code === district.code)) {
      setSelectedDistrictsList([...selectedDistrictsList, district]);
    }
    setDistrictSearch("");
    setIsDistrictOpen(false);
  };

  const handleRemoveDistrict = (districtCode: string) => {
    setSelectedDistrictsList(
      selectedDistrictsList.filter((item) => item.code !== districtCode),
    );
  };

  // Alert State
  const [isSaved, setIsSaved] = useState(false);

  const optionsRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        optionsRef.current &&
        !optionsRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const jobStatuses = [
    {
      value: "Aktif mencari pekerjaan (Open to Work)",
      label: "Aktif mencari pekerjaan (Siap langsung bekerja)",
      color: "bg-green-500",
      payloadKey: "actively_looking",
    },
    {
      value: "Terbuka untuk penawaran (Passive Candidate)",
      label: "Terbuka untuk penawaran menarik (Masih bekerja)",
      color: "bg-yellow-400",
      payloadKey: "open_to_offers",
    },
    {
      value: "Tidak sedang mencari kerja",
      label: "Tidak sedang mencari pekerjaan",
      color: "bg-red-500",
      payloadKey: "not_looking",
    },
  ];

  const selectedStatus = jobStatuses.find(
    (status) => status.value === preferences.jobStatus,
  );

  // Toggle Selection
  const toggleJobType = (type: string) => {
    setPreferences((prev) => ({
      ...prev,
      jobTypes: prev.jobTypes.includes(type)
        ? prev.jobTypes.filter((t) => t !== type)
        : [...prev.jobTypes, type],
    }));
  };

  const toggleWorkSystem = (system: string) => {
    setPreferences((prev) => ({
      ...prev,
      workSystems: prev.workSystems.includes(system)
        ? prev.workSystems.filter((s) => s !== system)
        : [...prev.workSystems, system],
    }));
  };

  // Helper mapping untuk mengubah teks UI ke format database / backend payload
  const mapJobTypeToPayload = (type: string) => {
    switch (type) {
      case "Penuh Waktu (Full-time)":
        return "full_time";
      case "Paruh Waktu (Part-time)":
        return "part_time";
      case "Kontrak / Proyek":
        return "contract_project";
      case "Magang (Internship)":
        return "internship";
      case "Lepas / Freelance":
        return "freelance";
      default:
        return type.toLowerCase();
    }
  };

  const mapWorkSystemToPayload = (sys: string) => {
    switch (sys) {
      case "Kerja di Kantor (On-site)":
        return "onsite";
      case "Hibrida (Hybrid)":
        return "hybrid";
      case "Kerja dari Rumah (Remote)":
        return "remote";
      default:
        return sys.toLowerCase();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Membentuk payload akhir sesuai permintaan
    const currentSelectedStatusObj = jobStatuses.find(
      (s) => s.value === preferences.jobStatus,
    );

    const payload = {
      job_field: preferences.jobCategory,
      industry: preferences.industry,
      preferred_positions: preferences.desiredPositions,
      preferred_district_codes: selectedDistrictsList.map((item) => item.code),
      job_types: preferences.jobTypes.map(mapJobTypeToPayload),
      work_arrangements: preferences.workSystems.map(mapWorkSystemToPayload),
      willing_to_relocate:
        preferences.relocationStatus.includes("Ya") ||
        preferences.relocationStatus.includes("seluruh wilayah"),
      min_salary: preferences.expectedSalaryMin
        ? Number(preferences.expectedSalaryMin.replace(/\D/g, ""))
        : 0,
      max_salary: preferences.expectedSalaryMax
        ? Number(preferences.expectedSalaryMax.replace(/\D/g, ""))
        : 0,
      job_search_status: currentSelectedStatusObj
        ? currentSelectedStatusObj.payloadKey
        : "actively_looking",
    };

    console.log("FINAL PAYLOAD:", JSON.stringify(payload, null, 2));

    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 4000);
  };

  return {
    preferences,
    setPreferences,
    districtList,
    selectedDistrictsList,
    setSelectedDistrictsList,
    positionSearch,
    setPositionSearch,
    isPositionOpen,
    setIsPositionOpen,
    jobCategorySearch,
    setJobCategorySearch,
    isJobCategoryOpen,
    setIsJobCategoryOpen,
    industrySearch,
    setIndustrySearch,
    isIndustryOpen,
    setIsIndustryOpen,
    districtSearch,
    setDistrictSearch,
    isDistrictOpen,
    setIsDistrictOpen,
    districtRef,
    dropdownRef,
    filteredPositions,
    filteredJobCategories,
    filteredIndustries,
    filteredDistricts,
    handleAddPosition,
    handleRemovePosition,
    handleAddDistrict,
    handleRemoveDistrict,
    isSaved,
    optionsRef,
    isOpen,
    setIsOpen,
    jobStatuses,
    selectedStatus,
    toggleJobType,
    toggleWorkSystem,
    handleSubmit,
  };
}
