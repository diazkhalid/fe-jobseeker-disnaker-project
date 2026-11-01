import {
  getIndustryOptions,
  getJobCategoryOptions,
  getJobPositionOptions,
} from "../services/options.service";
import { OptionItem } from "../types/option.type";

export const getIndustriesName = async (
  id: number | null | undefined,
): Promise<string> => {
  if (id === null || id === undefined) return "Semua";

  const result = await getIndustryOptions();

  if (result.status !== 200) {
    return "Error";
  }

  const data = result.data.data;

  return (
    data.find((industry: OptionItem) => industry.id === id)?.name ?? "Semua"
  );
};

export const getJobCategoryName = async (
  id: number | null | undefined,
): Promise<string> => {
  if (id === null || id === undefined) return "Semua";

  const result = await getJobCategoryOptions();

  if (result.status !== 200) {
    return "Error";
  }

  const data = result.data.data;

  return data.find((field: OptionItem) => field.id === id)?.name ?? "Semua";
};

export const getJobPositionName = async (
  id: number | null | undefined,
): Promise<string> => {
  if (id === null || id === undefined) return "Semua";

  const result = await getJobPositionOptions();

  if (result.status !== 200) {
    return "Error";
  }

  const data = result.data.data;

  return data.find((field: OptionItem) => field.id === id)?.name ?? "Semua";
};

export const getOptionName = (
  options: OptionItem[],
  id: number | null | undefined,
  fallback: string = "Semua",
): string => {
  if (id === null || id === undefined) return fallback;
  return options.find((option) => option.id === id)?.name ?? fallback;
};
