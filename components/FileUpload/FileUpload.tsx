"use client";

import { ChangeEvent, useRef } from "react";
import { FaPlus } from "react-icons/fa6";

const FileUpload = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleOnClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    const formData = new FormData();
    if (files && files.length > 0) {
      formData.append("file", files[0]);

      const response = await fetch("/api/upload-exam", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("File uploaded successfully");
      } else {
        console.log("File upload failed");
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
        className="fixed bottom-4 right-4 rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 p-4 text-white shadow-lg shadow-indigo-500/20 transition-all hover:translate-y-[-1px] hover:shadow-fuchsia-500/30"
      >
        <FaPlus className="h-6 w-6" />
      </button>
    </>
  );
};

export default FileUpload;
