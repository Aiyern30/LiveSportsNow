import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, addDays, startOfWeek } from "date-fns";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";

interface DateCarouselProps {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  enabledDates: string[];
}

const DateCarousel: React.FC<DateCarouselProps> = ({
  selectedDate,
  setSelectedDate,
  enabledDates,
}) => {
  const [visibleDays, setVisibleDays] = useState(7);
  const [isNextDisabled, setIsNextDisabled] = useState(false);
  const [isPrevDisabled, setIsPrevDisabled] = useState(false);

  const startOfCurrentWeek = startOfWeek(selectedDate, { weekStartsOn: 1 });

  useEffect(() => {
    const updateVisibleDays = () => {
      if (window.innerWidth >= 1024) {
        setVisibleDays(7);
      } else if (window.innerWidth >= 768) {
        setVisibleDays(5);
      } else if (window.innerWidth >= 480) {
        setVisibleDays(3);
      } else {
        setVisibleDays(1);
      }
    };

    updateVisibleDays();
    window.addEventListener("resize", updateVisibleDays);
    return () => window.removeEventListener("resize", updateVisibleDays);
  }, []);

  const weekDates = Array.from({ length: visibleDays }, (_, i) =>
    addDays(startOfCurrentWeek, i)
  );

  useEffect(() => {
    if (enabledDates.length > 0) {
      const sortedDates = enabledDates
        .map((date) => new Date(date))
        .sort((a, b) => b.getTime() - a.getTime());

      const latestEnabledDate = sortedDates[0];
      setSelectedDate(latestEnabledDate);
    }
  }, [enabledDates, setSelectedDate]);

  const handleDateSelect = (date: Date) => {
    const formattedDate = format(date, "yyyy-MM-dd");
    if (enabledDates.includes(formattedDate)) {
      setSelectedDate(date);
    }
  };

  const getNearestEnabledDate = (direction: "next" | "prev") => {
    const formattedSelectedDate = format(selectedDate, "yyyy-MM-dd");

    const sortedAvailableDates = enabledDates
      .map((date) => new Date(date))
      .sort((a, b) => a.getTime() - b.getTime());

    let nearestDate = null;

    if (direction === "next") {
      nearestDate = sortedAvailableDates.find(
        (date) => date > new Date(formattedSelectedDate)
      );
    } else if (direction === "prev") {
      nearestDate = [...sortedAvailableDates]
        .reverse()
        .find((date) => date < new Date(formattedSelectedDate));
    }

    return nearestDate ? nearestDate : selectedDate;
  };

  const handleNext = () => {
    const newSelectedDate = getNearestEnabledDate("next");
    setSelectedDate(newSelectedDate);
  };

  const handlePrev = () => {
    const newSelectedDate = getNearestEnabledDate("prev");
    setSelectedDate(newSelectedDate);
  };

  useEffect(() => {
    const formattedSelectedDate = format(selectedDate, "yyyy-MM-dd");

    const sortedAvailableDates = enabledDates
      .map((date) => new Date(date))
      .sort((a, b) => a.getTime() - b.getTime());

    const nextEnabledDate = sortedAvailableDates.find(
      (date) => date > new Date(formattedSelectedDate)
    );
    setIsNextDisabled(!nextEnabledDate);

    const prevEnabledDate = [...sortedAvailableDates]
      .reverse()
      .find((date) => date < new Date(formattedSelectedDate));
    setIsPrevDisabled(!prevEnabledDate);
  }, [selectedDate, enabledDates]);

  return (
    <div className="flex items-center space-x-2 shadow-md rounded-lg w-full">
      {!isPrevDisabled && (
        <button
          className="p-2 rounded-full hover:bg-gray-200 transition"
          onClick={handlePrev}
          disabled={isPrevDisabled}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}

      <div className="flex-1 overflow-hidden">
        <div className="flex justify-center items-center space-x-2 overflow-x-auto scrollbar-hide w-full">
          {weekDates.map((date) => {
            const formattedDate = format(date, "yyyy-MM-dd");
            const isEnabled = enabledDates.includes(formattedDate);

            return (
              <button
                key={date.toString()}
                className={`w-[60px] sm:w-[70px] md:w-[80px] lg:w-[100px] min-h-[80px] px-4 py-2 rounded-lg transition flex flex-col items-center ${
                  isEnabled
                    ? format(date, "yyyy-MM-dd") ===
                      format(selectedDate, "yyyy-MM-dd")
                      ? "bg-blue-500 text-white font-semibold"
                      : "bg-gray-100 text-gray-700"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
                onClick={() => handleDateSelect(date)}
                disabled={!isEnabled}
              >
                <span className="text-sm">{format(date, "EEE")}</span>
                <span className="text-lg">{format(date, "MMM d")}</span>
              </button>
            );
          })}
        </div>
      </div>
      {!isNextDisabled && (
        <button
          className="p-2 rounded-full hover:bg-gray-200 transition"
          onClick={handleNext}
          disabled={isNextDisabled}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}

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
