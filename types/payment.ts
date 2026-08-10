export interface PaymentChannel {
  code: string;
  name: string;
  fee_type: "percent" | "flat";
  fee_value: string;
  icon: string | null;
  sort_order: number;
}

export interface PaymentChannelsResponse {
  success: boolean;
  data: PaymentChannel[];
}

export interface TopupRequest {
  quantity: number;
  payment_channel_code: string;
}

export type TopupStatus = "pending" | "paid" | "failed" | "expired";

export interface TopupOrder {
  success: boolean;
  order_id: string;
  quantity: number;
  coin_price: number;
  amount: number;
  service_fee: number;
  total: number;
  payment_method: string;
  payment_url: string;
  snap_token: string;
  status: TopupStatus;
  paid_at?: string | null;
  expired_at: string;
  created_at?: string;
}

export interface TopupHistoryItem {
  order_id: string;
  quantity: number;
  coin_price: number;
  amount: number;
  service_fee: number;
  total: number;
  payment_method: string;
  status: TopupStatus;
  paid_at: string | null;
  expired_at: string;
  created_at: string;
}

export interface TopupHistoryResponse {
  success: boolean;
  data: TopupHistoryItem[];
}
