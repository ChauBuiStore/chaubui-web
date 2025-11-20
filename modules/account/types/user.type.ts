export enum Gender {
  MALE = "male",
  FEMALE = "female",
}

export interface User {
  id: string;
  userName: string;
  email: string;
  password: string;
  fullName: string;
  gender?: Gender;
  phone?: string;
  address?: string;
  birthday?: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

