export interface UserCreate extends UserProfile, UserLogin {}

export interface UserLogin {
  email: string;
  inputPassword?: string;
  password?: string;
}

export interface UserProfile {
  id: string;
  full_name: string;
  age: number;
  image_url: string;
}

export interface UserLogged extends UserLogin {
  id: string;
  authToken: string;
  profile: UserProfile;
}

// Queries Return Types
export type LoginData = { login: UserLogged };
export type SignUpData = { createUser: UserLogged };
