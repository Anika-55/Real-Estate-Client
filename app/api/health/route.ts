import { NextResponse } from "next/server";
import { appConfig } from "@/lib/config";
import { apiClient } from "@/lib/api-client";
import { ApiClientError } from "@/types";

export async function GET() {
  try {
    const response = await apiClient<{ status: string; timestamp: string }>(
      "/health",
      { baseUrl: appConfig.serverApiBaseUrl }
    );

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    if (error instanceof ApiClientError) {
      return NextResponse.json(
        {
          success: false,
          message: "Backend health check failed",
          details: error.details,
        },
        { status: error.status || 502 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Unexpected error while checking backend health",
      },
      { status: 500 }
    );
  }
}
