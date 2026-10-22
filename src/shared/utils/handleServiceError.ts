/* eslint-disable @typescript-eslint/no-explicit-any */

export function handleServiceError(error: any) {
  const errorMessage = error.response?.data?.message || "Terjadi Kesalahan";
  const status = error.response?.status || 500;

  return {
    success: false,
    status: Number(status),
    message: String(errorMessage),
    data: [],
  };
}
