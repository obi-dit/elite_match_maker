import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");

    if (!authHeader) {
      return NextResponse.json(
        { error: "No authorization header" },
        { status: 401 }
      );
    }

    const formData = await request.formData();

    // Create a new FormData for the backend
    const backendFormData = new FormData();

    // Add all form fields
    backendFormData.append("title", formData.get("title") as string);
    backendFormData.append(
      "description",
      formData.get("description") as string
    );
    backendFormData.append("status", formData.get("status") as string);
    backendFormData.append("type", formData.get("type") as string);
    backendFormData.append("categories", formData.get("categories") as string);

    if (formData.get("scheduledAt")) {
      backendFormData.append(
        "scheduledAt",
        formData.get("scheduledAt") as string
      );
    }

    // Add files if they exist
    const audioFile = formData.get("audioFile") as File;
    const videoFile = formData.get("videoFile") as File;
    const thumbnailFile = formData.get("thumbnailFile") as File;

    if (audioFile && audioFile.size > 0) {
      backendFormData.append("audioFile", audioFile);
    }

    if (videoFile && videoFile.size > 0) {
      backendFormData.append("videoFile", videoFile);
    }

    if (thumbnailFile && thumbnailFile.size > 0) {
      backendFormData.append("thumbnailFile", thumbnailFile);
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/podcasts/upload`,
      {
        method: "POST",
        headers: {
          Authorization: authHeader,
        },
        body: backendFormData,
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to upload podcast" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in admin podcast upload API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}




