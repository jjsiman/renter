export interface UserProfile {
  email: string;
}

export interface TokenResponse {
  token: string;
  expiry: string;
}

export interface SignupError {
  email?: string[];
  password?: string[];
}
