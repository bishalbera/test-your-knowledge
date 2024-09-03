"use client";

import { useState } from "react";
import DateTimePicker from "react-datetime-picker";

const ScheduleExam = () => {
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(
    new Date()
  );

  return (
    <div className="min-h-screen w-full bg-primary-color text-white flex flex-col justify-center p-4 items-center">
      <h1 className="text-cus-white text-3xl p-2">Schedule Your Exam</h1>
      <div className="w-[700px] h-[800px] bg-custom-dark flex flex-col  rounded-lg border mt-4 p-4">
        <div className="flex justify-between items-center mb-8">
          <div className="flex-1 text-center">
            <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto">
              1
            </div>
            <p className="text-sm mt-2">Exam Detail</p>
          </div>
          <div className="flex-1 h-1 bg-green-500"></div>
          <div className="flex-1 text-center">
            <div className="w-8 h-8 rounded-full text-white bg-green-500 flex justify-center items-center mx-auto">
              2
            </div>
            <p className="text-sm mt-2 ">Time & Date</p>
          </div>
          <div className="flex-1 h-1 bg-gray-500"></div>
          <div className="flex-1 text-center">
            <div className="w-8 h-8 rounded-full text-white bg-gray-500 flex justify-center items-center mx-auto">
              3
            </div>
            <p className="text-sm mt-2">Payment</p>
          </div>
        </div>
        <div className="my-4">
          <h3 className="text-lg mb-2">Select Date and Time</h3>
          <DateTimePicker
            onChange={setSelectedDateTime}
            value={selectedDateTime}
            className="text-black bg-white rounded-lg p-2"
          />
        </div>
        <div className="mt-4">
          {selectedDateTime && (
            <p className="text-lg">
              Selected: {selectedDateTime.toLocaleDateString()}
              {selectedDateTime.toLocaleTimeString()}
            </p>
          )}
        </div>
        <button className="mt-auto p-2 bg-cus-white text-black rounded-lg">
          Next
        </button>
      </div>
    </div>
  );
};

export default ScheduleExam;
