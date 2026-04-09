import { appConfig } from "@/lib/config";
import { apiClient } from "@/lib/api-client";

interface ProfileApiPayload {
  id: string;
  name: string;
  email: string;
  avatarUrl: string | null;
  role: "USER" | "ADMIN" | "AGENT";
  phone: string | null;
  createdAt: string;
  updatedAt: string;
}

interface UpdateProfileInput {
  name: string;
  email: string;
  phone?: string;
}

export async function updateMyProfile(input: UpdateProfileInput) {
  const token = localStorage.getItem("realestate_access_token");

  if (!token) {
    throw new Error("Session expired. Please login again.");
  }

  return apiClient<ProfileApiPayload>("/user/profile", {
    method: "PATCH",
    body: input,
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
}

export async function uploadMyProfileAvatar(file: File) {
  const token = localStorage.getItem("realestate_access_token");
  if (!token) {
    throw new Error("Session expired. Please login again.");
  }

  const formData = new FormData();
  formData.append("avatar", file);

  const response = await fetch(
    `${appConfig.publicApiBaseUrl.replace(/\/+$/, "")}/user/profile/avatar`,
    {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${token}`,
      },
      body: formData,
      credentials: "include",
      cache: "no-store",
    }
  );

  const payload = (await response.json().catch(() => null)) as
    | { message?: string; data?: ProfileApiPayload }
    | null;

  if (!response.ok || !payload?.data) {
    const message =
      payload?.message && typeof payload.message === "string"
        ? payload.message
        : `Avatar upload failed with status ${response.status}`;
    throw new Error(message);
  }

  return payload.data;
}
