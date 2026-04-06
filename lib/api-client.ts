import { appConfig } from "@/lib/config";
import { ApiClientError, type ApiEnvelope } from "@/types";

type ApiClientOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
  baseUrl?: string;
};

function toUrl(baseUrl: string, path: string): string {
  const normalizedBase = baseUrl.replace(/\/+$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${normalizedBase}${normalizedPath}`;
}

export async function apiClient<T>(
  path: string,
  options: ApiClientOptions = {}
): Promise<ApiEnvelope<T>> {
  const { body, baseUrl = appConfig.publicApiBaseUrl, headers, ...rest } = options;

  const response = await fetch(toUrl(baseUrl, path), {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
    credentials: "include",
    cache: "no-store",
  });

  let payload: unknown = null;
  try {
    payload = await response.json();
  } catch {
    payload = null;
  }

  if (!response.ok) {
    const message =
      typeof payload === "object" &&
      payload !== null &&
      "message" in payload &&
      typeof (payload as { message?: unknown }).message === "string"
        ? (payload as { message: string }).message
        : `Request failed with status ${response.status}`;

    throw new ApiClientError(message, response.status, payload);
  }

  return payload as ApiEnvelope<T>;
}
