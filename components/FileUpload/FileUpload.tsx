"use client";

import { useRef } from "react";
import { FaPlus } from "react-icons/fa6";

const FileUpload = () => {
  const fileInputRef = useRef(null);

  const handleOnClick = () => {
    fileInputRef?.current?.click();
  };

  const handleFileChange = async (event) => {
    const files = event.target.files;
    const formData = new FormData();
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
        onClick={handleOnClick}
        className="bg-button-color text-white border border-white fixed bottom-4 right-4 p-4 rounded-full shadow-lg hover:bg-button-hover-color focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:bg-blue-700"
      >
        <FaPlus className=" h-6 w-6" />
      </button>
    </>
  );
};

export default FileUpload;
