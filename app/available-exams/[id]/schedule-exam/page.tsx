"use client";

import CustomDateTimePicker from "@/components/CustomDateTimePicker/CustomDateTmePicker";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ScheduleExam = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(2);
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(
    new Date()
  );
  const [examDetails, setExamDetails] = useState<{
    title: string;
    image: string;
    cost: string;
  } | null>(null);

  useEffect(() => {
    const fetchExamDetails = async () => {
      try {
        const res = await fetch(`/api/available-exams/${id}`);
        if (res.ok) {
          const data = await res.json();
          setExamDetails({
            title: data.title,
            image: data.image,
            cost: data.cost,
          });
        } else {
          console.log("Failed to fetch exam details:", res.statusText);
        }
      } catch (error) {
        console.log("An error occurred while fetching exam details", error);
      }
    };

    fetchExamDetails();
  }, [id]);
  const nextStep = async () => {
    if (currentStep < 3) {
      try {
        const res = await fetch(`/api/available-exams/${id}/schedule-exam`, {
          method: "POST",
          body: JSON.stringify({
            id,
            scheduledDateTime: selectedDateTime,
          }),
        });

        if (!res.ok) {
          console.error("Failed to schedule exam:", res.status, res.statusText);
          const errDetails = await res.json();
          throw new Error(errDetails?.message || "unknown error occurred");
        }

        const result = await res.json();

        if (result.status === 201) {
          setCurrentStep(currentStep + 1);
         
          // router.push("")
        } else {
          console.error(
            "Failed to schedule exammmmmm:",
            result?.message || "unknown response format"
          );
        }
      } catch (error) {
        console.error("An unexpected error occurred:", error.message || error);
      }
    }
  };
  const previousStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
    if (currentStep === 2) router.back();
  };

  return (
    <div className="min-h-screen w-full bg-primary-color text-white flex flex-col justify-center p-4 items-center">
      <h1 className="text-cus-white text-3xl p-2">Schedule Your Exam</h1>
      <div className="w-[700px] h-[800px] bg-custom-dark flex flex-col  rounded-lg border mt-4 p-4">
        <div className="flex justify-between items-center mb-8">
          <div className="flex-1 text-center">
            <div
              className={`w-8 h-8 ${
                currentStep >= 1 ? "bg-green-500" : "bg-gray-500"
              } text-white rounded-full flex items-center justify-center mx-auto`}
            >
              1
            </div>
            <p className="text-sm mt-2">Exam Detail</p>
          </div>
          <div
            className={`flex-1 h-1 ${
              currentStep >= 2 ? "bg-green-500" : "bg-gray-500"
            }`}
          ></div>
          <div className="flex-1 text-center">
            <div
              className={`w-8 h-8 rounded-full text-white ${
                currentStep >= 2 ? "bg-green-500" : "bg-gray-500"
              } flex justify-center items-center mx-auto`}
            >
              2
            </div>
            <p className="text-sm mt-2 ">Time & Date</p>
          </div>
          <div
            className={`flex-1 h-1 ${
              currentStep >= 3 ? "bg-green-500" : "bg-gray-500"
            }`}
          ></div>
          <div className="flex-1 text-center">
            <div
              className={`w-8 h-8 ${
                currentStep >= 3 ? "bg-green-500" : "bg-gray-500"
              } text-white rounded-full flex items-center justify-center mx-auto`}
            >
              3
            </div>
            <p className="text-sm mt-2">Payment</p>
          </div>
        </div>
        {currentStep === 2 && (
          <div className="my-4">
            <CustomDateTimePicker onDateTimeChange={setSelectedDateTime} />
          </div>
        )}
        <div className="mt-auto flex justify-between">
          <button
            onClick={previousStep}
            className={`p-2 bg-cus-white text-black rounded-lg ${
              currentStep === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={currentStep === 1}
          >
            Previous
          </button>
          <button
            className={`p-2 bg-cus-white text-black rounded-lg ${
              currentStep === 3 || !selectedDateTime
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            onClick={nextStep}
            disabled={!selectedDateTime}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScheduleExam;
