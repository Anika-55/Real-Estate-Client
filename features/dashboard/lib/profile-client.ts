import { authApiRequest } from "@/features/auth/lib/auth-client";

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
  const data = await authApiRequest<ProfileApiPayload>("/user/profile", {
    method: "PATCH",
    body: JSON.stringify(input),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return { data, message: "User profile updated successfully" };
}

export async function uploadMyProfileAvatar(file: File) {
  const formData = new FormData();
  formData.append("avatar", file);

  return authApiRequest<ProfileApiPayload>("/user/profile/avatar", {
    method: "PATCH",
    body: formData,
  });
}
