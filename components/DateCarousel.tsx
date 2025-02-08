import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, addDays, startOfWeek } from "date-fns";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";

interface DateCarouselProps {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  disabledDates: string[]; // New prop to receive disabled dates
}

const DateCarousel: React.FC<DateCarouselProps> = ({
  selectedDate,
  setSelectedDate,
  disabledDates,
}) => {
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

  // Handle date selection
  const handleDateSelect = (date: Date) => {
    const formattedDate = format(date, "yyyy-MM-dd");
    if (!disabledDates.includes(formattedDate)) {
      setSelectedDate(date); // Only select if the date is **enabled**
    }
  };

  // Function to get nearest enabled date from the current selection
  const getNearestEnabledDate = (direction: "next" | "prev") => {
    const formattedSelectedDate = format(selectedDate, "yyyy-MM-dd");

    // Get all the available dates sorted
    const sortedAvailableDates = disabledDates.sort();
    let nearestDate = null;

    if (direction === "next") {
      nearestDate = sortedAvailableDates.find(
        (date) => date > formattedSelectedDate
      );
    } else if (direction === "prev") {
      nearestDate = [...sortedAvailableDates]
        .reverse()
        .find((date) => date < formattedSelectedDate);
    }

    return nearestDate ? new Date(nearestDate) : selectedDate;
  };

  // Handle moving to the next set of dates
  const handleNext = () => {
    const newSelectedDate = getNearestEnabledDate("next");
    setSelectedDate(newSelectedDate);
  };

  // Handle moving to the previous set of dates
  const handlePrev = () => {
    const newSelectedDate = getNearestEnabledDate("prev");
    setSelectedDate(newSelectedDate);
  };

  return (
    <div className="flex items-center space-x-2 p-4 bg-white shadow-md rounded-lg w-full">
      {/* Left Arrow - Previous Week */}
      <button
        className="p-2 rounded-full hover:bg-gray-200 transition"
        onClick={handlePrev}
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Scrollable Week Carousel */}
      <div className="flex-1 overflow-hidden">
        <div className="flex justify-center items-center space-x-2 overflow-x-auto scrollbar-hide w-full">
          {weekDates.map((date) => {
            const formattedDate = format(date, "yyyy-MM-dd");
            const isDisabled = !disabledDates.includes(formattedDate); // Correct logic: If it's in the disabledDates, it's disabled.

            return (
              <button
                key={date.toString()}
                className={`w-[60px] sm:w-[70px] md:w-[80px] lg:w-[100px] min-h-[80px] px-4 py-2 rounded-lg transition flex flex-col items-center ${
                  isDisabled
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed" // Disabled button styles
                    : format(date, "yyyy-MM-dd") ===
                      format(selectedDate, "yyyy-MM-dd")
                    ? "bg-blue-500 text-white font-semibold" // Selected date styles
                    : "bg-gray-100 text-gray-700" // Regular date styles
                }`}
                onClick={() => handleDateSelect(date)}
                disabled={isDisabled} // Disable the button if the date is in disabledDates
              >
                <span className="text-sm">{format(date, "EEE")}</span>
                <span className="text-lg">{format(date, "MMM d")}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Arrow - Next Week */}
      <button
        className="p-2 rounded-full hover:bg-gray-200 transition"
        onClick={handleNext}
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
