import { apiClient } from "@/lib/api-client";
import { appConfig } from "@/lib/config";
import { ApiClientError } from "@/types";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatarUrl: string | null;
  role: string;
  phone: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AuthPayload {
  user: AuthUser;
  accessToken: string;
}

const ACCESS_TOKEN_KEY = "realestate_access_token";
const USER_KEY = "realestate_user";

function persistAuth(payload: AuthPayload) {
  localStorage.setItem(ACCESS_TOKEN_KEY, payload.accessToken);
  localStorage.setItem(USER_KEY, JSON.stringify(payload.user));
}

export function clearAuthStorage() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function getStoredAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
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
  const response = await apiClient<AuthPayload>("/auth/login", {
    method: "POST",
    body: input,
  });

  persistAuth(response.data);
  return response;
}

export async function register(input: RegisterInput) {
  const response = await apiClient<AuthPayload>("/auth/register", {
    method: "POST",
    body: input,
  });

  persistAuth(response.data);
  return response;
}

export async function refreshAccessToken() {
  const response = await apiClient<AuthPayload>("/auth/refresh-token", {
    method: "POST",
  });

  persistAuth(response.data);
  return response.data.accessToken;
}

export async function logoutFromServer() {
  try {
    await apiClient<null>("/auth/logout", {
      method: "POST",
    });
  } finally {
    clearAuthStorage();
  }
}

async function executeAuthorizedRequest(
  path: string,
  init: RequestInit = {},
  token?: string
) {
  const nextHeaders = new Headers(init.headers ?? {});
  if (token) {
    nextHeaders.set("authorization", `Bearer ${token}`);
  }

  return fetch(`${appConfig.publicApiBaseUrl.replace(/\/+$/, "")}${path}`, {
    ...init,
    headers: nextHeaders,
    credentials: "include",
    cache: "no-store",
  });
}

export async function authApiRequest<T>(
  path: string,
  init: RequestInit = {}
): Promise<T> {
  let token = getStoredAccessToken() ?? undefined;
  let response = await executeAuthorizedRequest(path, init, token);

  if (response.status === 401) {
    try {
      token = await refreshAccessToken();
      response = await executeAuthorizedRequest(path, init, token);
    } catch (error) {
      clearAuthStorage();
      if (error instanceof Error) {
        throw error;
      }
      throw new ApiClientError("Session expired. Please login again.", 401);
    }
  }

  const payload = (await response.json().catch(() => null)) as
    | { message?: string; data?: T }
    | null;

  if (!response.ok) {
    const message =
      payload?.message && typeof payload.message === "string"
        ? payload.message
        : `Request failed with status ${response.status}`;
    throw new ApiClientError(message, response.status, payload);
  }

  return (payload?.data ?? null) as T;
}
