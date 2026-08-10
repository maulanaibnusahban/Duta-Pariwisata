export interface NextAd {
  ad_id: number;
  title: string;
  video_url: string;
  duration_seconds: number;
  reward_coins: number;
  advertiser: string;
  ad_token: string;
}

export interface CompleteAdRequest {
  ad_id: number;
  watch_duration: number;
  ad_token: string;
}

export interface CompleteAdResponse {
  success: boolean;
  reward_coins: number;
  new_balance: number;
  message: string;
}
