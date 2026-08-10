import api from "@/lib/config/api.config";
import type { 
  PaymentChannel, 
  PaymentChannelsResponse, 
  TopupRequest, 
  TopupOrder, 
  TopupHistoryItem, 
  TopupHistoryResponse 
} from "@/types/payment";

export const getPaymentChannels = async (): Promise<PaymentChannel[]> => {
  const response = await api.get<PaymentChannelsResponse>("/api/payment-channels");
  return response.data.data;
};

export const createTopup = async (payload: TopupRequest): Promise<TopupOrder> => {
  const response = await api.post<TopupOrder>("/api/topup", payload);
  return response.data;
};

export const getTopupStatus = async (orderId: string): Promise<TopupOrder> => {
  try {
    const response = await api.get<TopupOrder>(`/api/topup/${orderId}`);
    return response.data;
  } catch (error: unknown) {
    if (
      typeof error === "object" &&
      error !== null &&
      "response" in error &&
      typeof (error as { response?: { status?: number } }).response?.status === "number" &&
      (error as { response: { status: number } }).response.status === 404
    ) {
      throw new Error("Order tidak ditemukan");
    }
    throw error;
  }
};

export const getTopupHistory = async (): Promise<TopupHistoryItem[]> => {
  const response = await api.get<TopupHistoryResponse>("/api/topup/history");
  return response.data.data;
};
