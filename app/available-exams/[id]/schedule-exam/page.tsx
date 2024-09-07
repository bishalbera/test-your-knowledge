"use client";

import CustomDateTimePicker from "@/components/CustomDateTimePicker/CustomDateTmePicker";
import Spinner from "@/components/Spinner/Spinner";
import { getStripe } from "@/utils/stripe";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ScheduleExam = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(2);
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null);

  const fetchExamDetails = async (id: string) => {
    const res = await fetch(`/api/available-exams/${id}`);
    if (!res.ok) throw new Error("Failed to fetch exam details");
    return res.json();
  };
  const {
    data: examDetails,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["examDetails", id],
    queryFn: () => fetchExamDetails(id),
  });
  // TODO; store selectedDateTime in localStorage
  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     const savedDateTime = localStorage.getItem(`selectedDateTime-${id}`);
  //     if (savedDateTime) {
  //       console.log(savedDateTime);
  //       setSelectedDateTime(new Date(savedDateTime));
  //     } else {
  //       setSelectedDateTime(new Date());
  //     }
  //   }
  // }, [id]);

  // useEffect(() => {
  //   if (selectedDateTime && typeof window !== "undefined") {
  //     localStorage.setItem(
  //       `selectedDateTime-${id}`,
  //       selectedDateTime.toISOString()
  //     );
  //   }
  // }, [selectedDateTime, id]);
  //

  const examTitle = examDetails?.title;
  const imageUrl = examDetails?.imageUrl;
  const cost = examDetails?.cost;

  const handlePayClick = async () => {
    const stripe = await getStripe();
    const userId = await fetch("/api/get-user", { method: "GET" });

    try {
      const response = await fetch("/api/stripe", {
        method: "POST",
        body: JSON.stringify({ userId, examTitle, imageUrl, cost }),
      });
      const stripeSession = await response.json();
      if (stripe) {
        const result = await stripe.redirectToCheckout({
          sessionId: stripeSession.id,
        });

        if (result.error) {
          console.log("payment failed");
        }
      }
    } catch (error) {
      console.error("An error occured", error);
    }
  };

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

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <div>Failed to load exam. Please try again later.</div>;
  }

  return (
    <div className="min-h-screen w-full bg-primary-color text-white flex flex-col justify-center p-4 items-center">
      <h1 className="text-cus-white text-3xl p-2">Schedule Your Exam</h1>
      <div className="w-[700px] h-[800px] bg-custom-dark flex flex-col  rounded-lg border mt-4 p-4">
        <div className="flex justify-between items-center mb-8">
          <div className="flex-1 text-center">
            <div
              className={`w-8 h-8 ${currentStep >= 1 ? "bg-green-500" : "bg-gray-500"
                } text-white rounded-full flex items-center justify-center mx-auto`}
            >
              1
            </div>
            <p className="text-sm mt-2">Exam Detail</p>
          </div>
          <div
            className={`flex-1 h-1 ${currentStep >= 2 ? "bg-green-500" : "bg-gray-500"
              }`}
          ></div>
          <div className="flex-1 text-center">
            <div
              className={`w-8 h-8 rounded-full text-white ${currentStep >= 2 ? "bg-green-500" : "bg-gray-500"
                } flex justify-center items-center mx-auto`}
            >
              2
            </div>
            <p className="text-sm mt-2 ">Time & Date</p>
          </div>
          <div
            className={`flex-1 h-1 ${currentStep >= 3 ? "bg-green-500" : "bg-gray-500"
              }`}
          ></div>
          <div className="flex-1 text-center">
            <div
              className={`w-8 h-8 ${currentStep >= 3 ? "bg-green-500" : "bg-gray-500"
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
        {currentStep === 3 && (
          <div className="my-4 text-center">
            <h2 className="font-bold mb-4 text-xl">{examDetails?.title}</h2>
            <img
              src={examDetails?.imageUrl || "/default-image.jpg"}
              width={40}
              height={40}
              className="w-40 h-40 mx-auto mb-4"
              alt="exam-image"
            />
            <p className="text-lg mb-4 font-[700]">
              Cost: INR {examDetails?.cost}
            </p>
            <button
              className="p-2 bg-green-500 hover:bg-green-600 text-cus-white rounded-lg font-medium"
              onClick={handlePayClick}
            >
              Proceed to Payment
            </button>
          </div>
        )}
        <div className="mt-auto flex justify-between">
          <button
            onClick={previousStep}
            className={`p-2 bg-cus-white text-black rounded-lg ${currentStep === 1 ? "opacity-50 cursor-not-allowed" : ""
              } ${currentStep === 3 ? "hover:bg-cus-white/70" : ""}`}
            disabled={currentStep === 1}
          >
            Previous
          </button>
          <button
            className={`p-2 bg-cus-white text-black rounded-lg ${currentStep === 3 || !selectedDateTime
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
