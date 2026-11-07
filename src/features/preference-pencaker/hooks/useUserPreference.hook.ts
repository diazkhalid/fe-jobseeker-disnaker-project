import { useState, useEffect, useRef } from "react";
import {
  JobSeekerPreference,
  JobSeekerPreferenceData,
  WorkSystem,
} from "../types/UserPreference.type";
import {
  getDistrictOptions,
  getIndustryOptions,
  getJobPositionOptions,
} from "@/shared/services/options.service";
import { Districts } from "@/shared/types/districtsList.type";
import {
  createJobSeekerPreference,
  getJobSeekerPreference,
} from "../services/preference.service";
import { useLocalStorage } from "@/shared/hooks/useLocalStorage";
import { useToast } from "@/shared/contexts/ToastContext";
import { OptionItem } from "@/shared/types/option.type";

export function useJobSeekerPreference() {
  const [token] = useLocalStorage("access-token", null);
  const [districtList, setDistrictList] = useState<Districts[] | []>([]);
  const [selectedDistrictsList, setSelectedDistrictsList] = useState<
    Districts[] | []
  >([]);
  const { addToast } = useToast();

  const [preferences, setPreferences] = useState<JobSeekerPreference>({
    desiredPositions: [],
    industries: [],
    jobTypes: [],
    workSystems: [],
    expectedSalaryMin: "",
    expectedSalaryMax: "",
    relocationStatus: "",
    jobStatus: "",
  });

  const [jobSeekerPreference, setJobSeekerPreference] =
    useState<JobSeekerPreferenceData | null>(null);

  const [preferPositionList, setPreferPositionList] = useState<OptionItem[]>(
    [],
  );
  const [industriesList, setIndustriesList] = useState<OptionItem[]>([]);

  const [positionSearch, setPositionSearch] = useState("");
  const [isPositionOpen, setIsPositionOpen] = useState(false);

  const [industrySearch, setIndustrySearch] = useState("");
  const [isIndustryOpen, setIsIndustryOpen] = useState(false);

  const [districtSearch, setDistrictSearch] = useState("");
  const [isDistrictOpen, setIsDistrictOpen] = useState(false);

  // REFS DROPDOWN
  const positionRef = useRef<HTMLDivElement>(null);
  const industryRef = useRef<HTMLDivElement>(null);
  const districtRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);

  const [triggerUpdate, setTriggerUpdate] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const result = await getDistrictOptions();
      if (result.status !== 200) return;
      setDistrictList(result.data.data);
    };
    const fetch2 = async () => {
      const result = await getIndustryOptions();
      if (result.status !== 200) return;
      setIndustriesList(result.data.data);
    };

    const fetch3 = async () => {
      const result = await getJobPositionOptions();
      if (result.status !== 200) return;
      setPreferPositionList(result.data.data);
    };

    fetch();
    fetch2();
    fetch3();
  }, []);

  const mapPayloadToJobType = (type: string) => {
    switch (type) {
      case "full_time":
        return "Penuh Waktu (Full-time)";
      case "part_time":
        return "Paruh Waktu (Part-time)";
      case "contract_project":
        return "Kontrak / Proyek";
      case "internship":
        return "Magang (Internship)";
      case "freelance":
        return "Lepas / Freelance";
      default:
        return type;
    }
  };

  const mapPayloadToWorkSystem = (sys: string) => {
    switch (sys) {
      case "on_site":
        return "Kerja di Kantor (On-site)";
      case "hybrid":
        return "Hibrida (Hybrid)";
      case "remote":
        return "Kerja dari Rumah (Remote)";
      default:
        return sys;
    }
  };

  const mapPayloadToJobStatus = (statusKey: string) => {
    switch (statusKey) {
      case "actively_looking":
        return "Aktif mencari pekerjaan (Open to Work)";
      case "open_to_offers":
        return "Terbuka untuk penawaran (Passive Candidate)";
      case "not_looking":
        return "Tidak sedang mencari kerja";
      default:
        return "";
    }
  };

  useEffect(() => {
    const fetchPref = async () => {
      if (!token) return;
      const result = await getJobSeekerPreference(token);
      if (result.status !== 200) return;
      const data = result.data.data;
      if (!data) return;
      setJobSeekerPreference(data);
      if (data?.preferred_districts) {
        setSelectedDistrictsList(data.preferred_districts);
      }

      setPreferences({
        desiredPositions: data.preferred_positions || [],
        industries: data.preferred_industries || [],
        jobTypes: data.job_types?.map(mapPayloadToJobType) || [],
        workSystems: data.work_arrangements?.map(mapPayloadToWorkSystem) || [],
        expectedSalaryMin: data.min_salary ? data.min_salary.toString() : "",
        expectedSalaryMax: data.max_salary ? data.max_salary.toString() : "",
        relocationStatus: data.willing_to_relocate
          ? "Ya, siap ditempatkan di mana saja"
          : "Tidak bersedia relokasi",
        jobStatus: mapPayloadToJobStatus(data.job_search_status),
      });
    };

    if (industriesList.length > 0 || preferPositionList.length > 0) {
      fetchPref();
    }
  }, [token, triggerUpdate, industriesList, preferPositionList]);

  // Filter Posisi
  const filteredPositions = preferPositionList.filter(
    (pos) =>
      pos.name.toLowerCase().includes(positionSearch.toLowerCase()) &&
      !preferences.desiredPositions?.some((item) => item.id === pos.id),
  );

  // Filter Industri
  const filteredIndustries = industriesList.filter(
    (ind) =>
      ind.name.toLowerCase().includes(industrySearch.toLowerCase()) &&
      !preferences.industries?.some((item) => item.id === ind.id),
  );

  // Global Click Outside Handler
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;

      if (positionRef.current && !positionRef.current.contains(target)) {
        setIsPositionOpen(false);
      }
      if (industryRef.current && !industryRef.current.contains(target)) {
        setIsIndustryOpen(false);
      }
      if (districtRef.current && !districtRef.current.contains(target)) {
        setIsDistrictOpen(false);
      }
      if (optionsRef.current && !optionsRef.current.contains(target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handler Multi-select Posisi
  const handleAddPosition = (pos: OptionItem) => {
    if (!preferences.desiredPositions.some((item) => item.id === pos.id)) {
      setPreferences({
        ...preferences,
        desiredPositions: [...preferences.desiredPositions, pos],
      });
    }
    setPositionSearch("");
    setIsPositionOpen(false);
  };

  const handleRemovePosition = (posIdToRemove: number) => {
    setPreferences({
      ...preferences,
      desiredPositions: preferences.desiredPositions.filter(
        (pos) => pos.id !== posIdToRemove,
      ),
    });
  };

  // Handler Multi-select Industri
  const handleAddIndustry = (ind: OptionItem) => {
    if (!preferences.industries.some((item) => item.id === ind.id)) {
      setPreferences({
        ...preferences,
        industries: [...preferences.industries, ind],
      });
    }
    setIndustrySearch("");
    setIsIndustryOpen(false);
  };

  const handleRemoveIndustry = (indIdToRemove: number) => {
    setPreferences({
      ...preferences,
      industries: preferences.industries.filter(
        (ind) => ind.id !== indIdToRemove,
      ),
    });
  };

  // Handler Wilayah / Kecamatan
  const filteredDistricts = districtList.filter(
    (item) =>
      item.name.toLowerCase().includes(districtSearch.toLowerCase()) &&
      !selectedDistrictsList.some((selected) => selected.code === item.code),
  );

  const handleAddDistrict = (district: Districts) => {
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

  const [isSaved, setIsSaved] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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

  const toggleJobType = (type: string) => {
    setPreferences((prev) => ({
      ...prev,
      jobTypes: prev.jobTypes.includes(type)
        ? prev.jobTypes.filter((t) => t !== type)
        : [...prev.jobTypes, type],
    }));
  };

  const toggleWorkSystem = (system: WorkSystem) => {
    setPreferences((prev) => ({
      ...prev,
      workSystems: prev.workSystems.includes(system)
        ? prev.workSystems.filter((s) => s !== system)
        : [...prev.workSystems, system],
    }));
  };

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
        return "on_site";
      case "Hibrida (Hybrid)":
        return "hybrid";
      case "Kerja dari Rumah (Remote)":
        return "remote";
      default:
        return sys.toLowerCase();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    const currentSelectedStatusObj = jobStatuses.find(
      (s) => s.value === preferences.jobStatus,
    );

    const payload = {
      industry_id: preferences.industries.map((ind) => ind.id),
      preferred_position_id: preferences.desiredPositions.map((pos) => pos.id),
      preferred_district_codes: selectedDistrictsList.map((item) => item.code),
      job_types: preferences.jobTypes.map(mapJobTypeToPayload),
      work_arrangements: preferences.workSystems.map(
        mapWorkSystemToPayload,
      ) as WorkSystem[],
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

    const result = await createJobSeekerPreference(token, payload);

    if (result.status !== 200) {
      addToast("Gagal menambahkan preferensi!", "warning");
      return;
    }
    addToast("Berhasil menambahkan preferensi", "success");
    setTriggerUpdate(!triggerUpdate);
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
    industrySearch,
    setIndustrySearch,
    isIndustryOpen,
    setIsIndustryOpen,
    districtSearch,
    setDistrictSearch,
    isDistrictOpen,
    setIsDistrictOpen,
    positionRef,
    industryRef,
    districtRef,
    optionsRef,
    filteredPositions,
    filteredIndustries,
    filteredDistricts,
    handleAddPosition,
    handleRemovePosition,
    handleAddIndustry,
    handleRemoveIndustry,
    handleAddDistrict,
    handleRemoveDistrict,
    isSaved,
    isOpen,
    setIsOpen,
    jobStatuses,
    selectedStatus,
    toggleJobType,
    toggleWorkSystem,
    handleSubmit,
    jobSeekerPreference,
    setJobSeekerPreference,
  };
}
