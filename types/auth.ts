export interface Voter {
  id: number;
  google_id: string;
  name: string;
  email: string;
  avatar: string;
  is_active: boolean;
}

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  avatar: string;
  coin_balance: number;
}

export interface GoogleLoginRequest {
  id_token: string;
}

export interface GoogleLoginResponse {
  success?: boolean;
  message?: string;
  data?: {
    token: string;
    voter?: Voter;
    user?: Voter;
  };
  token?: string;
  voter?: Voter;
  user?: Voter;
}

export interface LogoutResponse {
  success?: boolean;
  message?: string;
}
