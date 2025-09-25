import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

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

    // Validate required fields
    const title = formData.get("title") as string;
    if (!title || title.trim() === "") {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    // Create a new FormData for the backend
    const backendFormData = new FormData();

    // Add all form fields
    backendFormData.append("title", title);
    backendFormData.append(
      "description",
      (formData.get("description") as string) || ""
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

    // Add files if they exist and are valid
    const audioFile = formData.get("audioFile") as File;
    const videoFile = formData.get("videoFile") as File;
    const thumbnailFile = formData.get("thumbnailFile") as File;

    if (audioFile && audioFile.size > 0) {
      // Validate audio file size (max 100MB)
      if (audioFile.size > 100 * 1024 * 1024) {
        return NextResponse.json(
          { error: "Audio file too large. Maximum size is 100MB." },
          { status: 400 }
        );
      }
      backendFormData.append("audioFile", audioFile);
    }

    if (videoFile && videoFile.size > 0) {
      // Validate video file size (max 500MB)
      if (videoFile.size > 500 * 1024 * 1024) {
        return NextResponse.json(
          { error: "Video file too large. Maximum size is 500MB." },
          { status: 400 }
        );
      }
      backendFormData.append("videoFile", videoFile);
    }

    if (thumbnailFile && thumbnailFile.size > 0) {
      // Validate thumbnail file size (max 10MB)
      if (thumbnailFile.size > 10 * 1024 * 1024) {
        return NextResponse.json(
          { error: "Thumbnail file too large. Maximum size is 10MB." },
          { status: 400 }
        );
      }
      backendFormData.append("thumbnailFile", thumbnailFile);
    }

    console.log("Uploading podcast to backend:", {
      title,
      hasAudio: !!audioFile,
      hasVideo: !!videoFile,
      hasThumbnail: !!thumbnailFile,
    });

    const response = await fetch(`${API_BASE_URL}/admin/podcasts/upload`, {
      method: "POST",
      headers: {
        Authorization: authHeader,
      },
      body: backendFormData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Backend upload error:", errorData);
      return NextResponse.json(
        {
          error:
            errorData.message || errorData.error || "Failed to upload podcast",
          details: errorData,
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log("Podcast uploaded successfully:", data);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in admin podcast upload API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
