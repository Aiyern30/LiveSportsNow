"use client";

import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, addDays, subDays, startOfWeek } from "date-fns";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";

const DateCarousel = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [visibleDays, setVisibleDays] = useState(7); // Default: Show 7 dates

  // Get the start of the week (Monday)
  const startOfCurrentWeek = startOfWeek(selectedDate, { weekStartsOn: 1 });

  // Adjust number of visible dates based on screen size
  useEffect(() => {
    const updateVisibleDays = () => {
      if (window.innerWidth >= 1024) {
        setVisibleDays(7); // Large screens
      } else if (window.innerWidth >= 768) {
        setVisibleDays(5); // Tablets
      } else if (window.innerWidth >= 480) {
        setVisibleDays(3); // Small screens
      } else {
        setVisibleDays(1); // Very small screens
      }
    };

    updateVisibleDays();
    window.addEventListener("resize", updateVisibleDays);
    return () => window.removeEventListener("resize", updateVisibleDays);
  }, []);

  // Generate the number of dates to display
  const weekDates = Array.from({ length: visibleDays }, (_, i) =>
    addDays(startOfCurrentWeek, i)
  );

  return (
    <div className="flex items-center space-x-2 p-4 bg-white shadow-md rounded-lg w-full">
      {/* Left Arrow - Previous Week */}
      <button
        className="p-2 rounded-full hover:bg-gray-200 transition"
        onClick={() => setSelectedDate(subDays(selectedDate, visibleDays))}
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Scrollable Week Carousel */}
      <div className="flex-1 overflow-hidden">
        <div className="flex justify-center items-center space-x-2 overflow-x-auto scrollbar-hide w-full">
          {weekDates.map((date) => (
            <button
              key={date.toString()}
              className={`w-[60px] sm:w-[70px] md:w-[80px] lg:w-[100px] min-h-[80px] px-4 py-2 rounded-lg transition flex flex-col items-center ${
                format(date, "yyyy-MM-dd") ===
                format(selectedDate, "yyyy-MM-dd")
                  ? "bg-blue-500 text-white font-semibold"
                  : "bg-gray-100 text-gray-700"
              }`}
              onClick={() => setSelectedDate(date)}
            >
              <span className="text-sm">{format(date, "EEE")}</span>
              <span className="text-lg">{format(date, "MMM d")}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Right Arrow - Next Week */}
      <button
        className="p-2 rounded-full hover:bg-gray-200 transition"
        onClick={() => setSelectedDate(addDays(selectedDate, visibleDays))}
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Date Picker Button */}
      <DatePicker
        selected={selectedDate}
        onChange={(date: Date | null) => date && setSelectedDate(date)}
        customInput={
          <button className="p-2 rounded-full hover:bg-gray-200 transition">
            <Calendar className="w-5 h-5" />
          </button>
        }
      />
    </div>
  );
};

export default DateCarousel;
