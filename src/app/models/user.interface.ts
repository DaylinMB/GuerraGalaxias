// user.interface.ts
export interface InterSignup {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

export interface InterLogin {
  email: string;
  password: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  token?: string;
}