export const mapPayloadToJobType = (type: string) => {
  switch (type) {
    case "full_time":
      return "Penuh Waktu";
    case "part_time":
      return "Paruh Waktu";
    case "contract_project":
      return "Kontrak / Proyek";
    case "internship":
      return "Magang";
    case "freelance":
      return "Freelance";
    default:
      return type;
  }
};

export const mapPayloadToJobStatus = (statusKey: string) => {
  switch (statusKey) {
    case "actively_looking":
      return "Open to Work";
    case "open_to_offers":
      return "Passive Candidate";
    default:
      return "Off to Work";
  }
};
