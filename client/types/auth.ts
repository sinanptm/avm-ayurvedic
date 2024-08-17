export interface LoginCredentials {
  phone: string;
  password: string;
}

export interface LoginResponse {
  user: {
    id: string;
    email: string;
    name: string;
    phone: string;
  };
  token: string;
}

export interface AuthState {
  token: string | null;
}
