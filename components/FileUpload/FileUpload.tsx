"use client";

import { ChangeEvent, useRef, useState } from "react";
import { FaPlus } from "react-icons/fa6";

const FileUpload = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleOnClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    const formData = new FormData();
    if (files && files.length > 0) {
      setUploading(true);
      formData.append("file", files[0]);

      try {
        const response = await fetch("/api/upload-exam", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          alert("Exam file uploaded successfully!");
          // Reset file input
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
        } else {
          const error = await response.text();
          alert(`File upload failed: ${error}`);
        }
      } catch (error) {
        alert("File upload failed. Please try again.");
        console.error("Upload error:", error);
      } finally {
        setUploading(false);
      }
    }
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      <button
        aria-label="Upload exam file"
        onClick={handleOnClick}
        disabled={uploading}
        className="fixed bottom-4 right-4 rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 p-4 text-white shadow-lg shadow-indigo-500/20 transition-all hover:translate-y-[-1px] hover:shadow-fuchsia-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {uploading ? (
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent" />
        ) : (
          <FaPlus className="h-6 w-6" />
        )}
      </button>
    </>
  );
};

export default FileUpload;
