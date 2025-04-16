// Header.tsx
import React from 'react';

// Define the types for seat data
export interface SeatType {
  coach: string; // e.g., "Toa 1"
  type: string; // e.g., "Ngồi mềm điều hòa"
  availability: number; // e.g., 11
  price: string; // e.g., "333K" or "572K - 664K"
}

export interface HeaderProps {
  departure: string;
  arrival: string;
  date: string;
  trainName: string;
  seatTypes: SeatType[];
  onCoachClick?: (coach: string) => void; // Callback for coach click
}

const HeaderSelectionPopup: React.FC<HeaderProps> = ({
  departure,
  arrival,
  date,
  trainName,
  seatTypes,
  onCoachClick,
}) => {
  return (
    <div className="bg-white shadow-md">
      {/* Top Section: Route Info, Train Name, Close Button */}
      <div className="grid grid-cols-12 p-4 items-center">
        <div className="col-span-4 flex items-center">
          <div className="text-lg font-medium">
            <span>{departure}</span>
            <span className="mx-2">→</span>
            <span>{arrival} | {date}</span>
          </div>
        </div>
        <div className="col-span-4 text-center text-xl font-semibold">
          {trainName}
        </div>
        <div className="col-span-4 flex justify-end">
          <img
            src="https://res.ivivu.com/train/images/icon/ic_close.svg"
            alt="close"
            className="w-6 h-6 object-contain cursor-pointer" // Fixed h-42 to h-6
          />
        </div>
      </div>

      {/* Train Coaches Section */}
      <div className="p-4">
        <div className="flex items-flex items-center justify-end p-4">
          {/* Scrollable Coaches Container */}
          <div className="flex overflow-x-auto overflow-y-hidden scrollbar-hide">
            {/* Coaches in reverse order (Toa 9 to Toa 1) */}
            {seatTypes.slice().reverse().map((seat, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-48 h-24 bg-gray-100 border border-gray-300 rounded-l-lg flex items-center justify-between px-3 mr-1 last:mr-0 relative cursor-pointer hover:bg-gray-200"
                onClick={() => onCoachClick?.(seat.coach)} // Trigger callback on click
              >
                {/* Coach Info */}
                <div className="overflow-hidden">
                  <div className="text-base font-medium whitespace-nowrap">
                    {seat.coach}: {seat.type}
                  </div>
                  <div className="text-sm text-gray-500 whitespace-nowrap">
                    <span>Còn {seat.availability} chỗ | </span>
                    <span>
                      Giá {seat.price.includes('-') ? 'từ' : 'chỉ'} {seat.price}
                    </span>
                  </div>
                </div>
                {/* Right border to connect coaches visually */}
                {index !== seatTypes.length - 1 && (
                  <div className="absolute right-0 h-12 w-1 bg-gray-300"></div>
                )}
              </div>
            ))}
          </div>

          {/* Train Head (Nose) */}
          <div className="flex-shrink-0">
            <img
              src="https://res.ivivu.com/train/images/trainlist/head-train-desktop.svg"
              alt="train-head"
              className="w-12 h-[100%] object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderSelectionPopup; 