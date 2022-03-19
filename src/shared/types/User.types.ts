export interface UserCreate extends UserProfile, UserLogin {}

export interface UserLogin {
  email: string;
  password: string;
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
