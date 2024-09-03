"use client";

import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

type Value = Date | null;

type CalendarValue = Value | [Value, Value];

interface CustomDateTimePickerProps {
  onDateTimeChange: (dateTime: Date | null) => void;
}

const CustomDateTimePicker = ({
  onDateTimeChange,
}: CustomDateTimePickerProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const handleDateChange = (value: CalendarValue) => {
    if (Array.isArray(value)) {
      setSelectedDate(value[0]);
    } else {
      setSelectedDate(value);
    }
  };
  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTime(event.target.value);
  };

  useEffect(() => {
    if (selectedDate && selectedTime) {
      const [hours, minutes] = selectedTime.split(":").map(Number);
      const updatedDate = new Date(selectedDate);
      updatedDate.setHours(hours);
      updatedDate.setMinutes(minutes);
      onDateTimeChange(updatedDate);
    } else {
      onDateTimeChange(null);
    }
  }, [selectedDate, selectedTime]);

  return (
    <div className="p-4 bg-custom-dark rounded-lg w-full">
      <h2 className="text-cus-white text-sm mb-4">Select Date</h2>
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        className="calendar-custom"
      />
      <div className="mt-4">
        <h3 className="text-cus-white text-sm">Select Time Slot</h3>
        <input
          type="time"
          className="mt-2 p-2 bg-white text-black rounded"
          value={selectedTime || ""}
          onChange={handleTimeChange}
        />
      </div>
    </div>
  );
};
export default CustomDateTimePicker;
