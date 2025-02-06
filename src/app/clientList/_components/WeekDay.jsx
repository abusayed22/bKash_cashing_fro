'use client'
import React, { useEffect, useState } from "react";

const WeekDay = (props) => {
  
    const [weekDates, setWeekDates] = useState([]);
    const [currentDay, setCurrentDay] = useState(null);
    
    useEffect(() => {
      const today = new Date();
      const currentDayIndex = today.getDay(); // 0 = Sun, 1 = Mon, ..., 6 = Sat
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - currentDayIndex); // Adjust to get Sunday (start of the week)
      
      const dates = Array.from({ length: 7 }, (_, i) => {
        const date = new Date(startOfWeek);
        date.setDate(startOfWeek.getDate() + i); // Get each day of the week
        return date.getDate(); // Get the day of the month
      });
      
      setWeekDates(dates);
      setCurrentDay(currentDayIndex);
    }, []);
  return (
    <div>
       <div className="flex justify-between items-center mb-4 border-b pb-2">
      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => (
        <div
          key={index}
          className={`flex flex-col items-center px-2 ${currentDay === index ? "text-indigo-600 font-bold" : "text-gray-500"}`}
        >
          <span className="text-xs">{day}</span>
          <span
            className={`w-6 h-6 flex items-center justify-center rounded-full ${currentDay === index ? "bg-indigo-600 text-white" : "bg-gray-100"}`}
          >
            {weekDates[index]} {/* Display the dynamic date for each day */}
          </span>
        </div>
      ))}
    </div>
    </div>
  )
};

export default WeekDay;
