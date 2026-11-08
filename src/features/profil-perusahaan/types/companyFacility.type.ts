export interface CompanyFacilityData {
  id: number;
  facility_name: string;
  display_order: number;
  benefit_category: string;
  icon_key: string;
}

export interface UpdateCompanyFacilitiesDto {
  facilities: UpdateCompanyFacilityItemDto[];
}

export interface UpdateCompanyFacilityItemDto {
  facility_name: string;
  display_order: number;
  benefit_category: string;
  icon_key: string;
}
