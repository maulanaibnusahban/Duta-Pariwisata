import api from '@/lib/config/api.config';
import type { NextAd, CompleteAdRequest, CompleteAdResponse } from '@/types/ads';

/**
 * Mengambil data iklan berikutnya untuk user.
 */
export const getNextAd = async (): Promise<NextAd> => {
  const response = await api.get<NextAd>('/ads/next');
  return response.data;
};

/**
 * Menyelesaikan proses menonton iklan dan mengklaim reward koin.
 * @param payload Data penyelesaian iklan (ad_id, watch_duration, ad_token)
 */
export const completeAd = async (payload: CompleteAdRequest): Promise<CompleteAdResponse> => {
  const response = await api.post<CompleteAdResponse>('/ads/complete', payload);
  return response.data;
};
