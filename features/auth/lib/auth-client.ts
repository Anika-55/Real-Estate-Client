import { apiClient } from "@/lib/api-client";

interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
  phone: string | null;
  createdAt: string;
  updatedAt: string;
}

interface AuthPayload {
  user: AuthUser;
  accessToken: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

export async function login(input: LoginInput) {
  return apiClient<AuthPayload>("/auth/login", {
    method: "POST",
    body: input,
  });
}

export async function register(input: RegisterInput) {
  return apiClient<AuthPayload>("/auth/register", {
    method: "POST",
    body: input,
  });
}
