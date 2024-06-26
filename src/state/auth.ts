export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string | null;
  status: 'ACTIVE' | 'INACTIVE';
  date_joined: string | null;
  password_last_changed: string | null;
  url: string | null;
  last_active: string | null;
  terms_accepted: boolean;
  otp: string | null;
  user_group: string | null;
}

export interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  role: string | null;
  isOnboarding: boolean;
}