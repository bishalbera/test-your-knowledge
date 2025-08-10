"use client";

import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import GlassCard from "@/components/ui/GlassCard";

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
    <GlassCard className="w-full p-4">
      <h2 className="mb-2 text-sm text-slate-300/80">Select Date</h2>
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        className="calendar-custom"
      />
      <div className="mt-4">
        <h3 className="text-sm text-slate-300/80">Select Time Slot</h3>
        <input
          type="time"
          className="mt-2 rounded bg-white/10 px-3 py-2 text-white placeholder:text-slate-400 outline-none ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-indigo-400"
          value={selectedTime || ""}
          onChange={handleTimeChange}
        />
      </div>
    </GlassCard>
  );
};
export default CustomDateTimePicker;
