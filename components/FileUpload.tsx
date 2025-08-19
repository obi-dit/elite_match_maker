"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";

interface FileUploadProps {
  onUploadSuccess: (url: string) => void;
  onUploadError: (error: string) => void;
  accept: "image" | "video";
  multiple?: boolean;
  maxFiles?: number;
  className?: string;
  label: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:6000";

export default function FileUpload({
  onUploadSuccess,
  onUploadError,
  accept,
  multiple = false,
  maxFiles = 3,
  className = "",
  label,
}: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);

    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch(`${API_BASE_URL}/upload/${accept}`, {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Upload failed");
        }

        const result = await response.json();
        return result.url;
      });

      const urls = await Promise.all(uploadPromises);

      if (multiple) {
        setUploadedFiles((prev) => [...prev, ...urls].slice(0, maxFiles));
        urls.forEach((url) => onUploadSuccess(url));
      } else {
        setUploadedFiles(urls);
        onUploadSuccess(urls[0]);
      }
    } catch (error) {
      console.error("Upload error:", error);
      onUploadError(
        error instanceof Error ? error.message : "Failed to upload file"
      );
    } finally {
      setIsUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <label className="block">
        <span className="text-gray-900 font-medium">{label}</span>
        <div className="mt-1">
          <input
            ref={fileInputRef}
            type="file"
            multiple={multiple}
            accept={
              accept === "image"
                ? "image/*"
                : "video/mp4,video/avi,video/mov,video/wmv,video/flv,video/webm"
            }
            onChange={handleFileChange}
            className="w-full p-3 border border-gray-500 rounded-lg bg-gray-100 focus:ring-2 focus:ring-[#bfa521] focus:border-transparent"
            disabled={isUploading}
          />
        </div>
      </label>

      {isUploading && (
        <div className="text-blue-600 font-medium">
          Uploading... Please wait.
        </div>
      )}

      {uploadedFiles.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm text-gray-600 font-medium">Uploaded files:</p>
          <div className="space-y-2">
            {uploadedFiles.map((url, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
              >
                <span className="text-sm text-gray-700 truncate flex-1">
                  {url.split("/").pop()}
                </span>
                <motion.button
                  type="button"
                  onClick={() => removeFile(index)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="ml-2 text-red-600 hover:text-red-800 text-sm font-medium"
                >
                  Remove
                </motion.button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
