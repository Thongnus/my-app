import React, { useState } from "react";
import HeaderSelectionPopup, { SeatType } from "./HeaderSeat";
import SeatSelection, { Seat } from "./SeatSelection";

// Hàm tạo dữ liệu ghế với tổng cộng 64 ghế
const generateSeatData = (coach: string, type: string, availability: number): Seat[] => {
  const totalSeats = 64; // Mỗi toa có 64 ghế
  const availableSeats = Math.min(availability, totalSeats); // Số ghế trống không vượt quá 64
  const seats: Seat[] = [];
  const isSeatCoach = coach.includes("Toa 1") || coach.includes("Toa 2");

  for (let i = 1; i <= totalSeats; i++) {
    seats.push({
      seatNumber: isSeatCoach ? `${i}` : `G${i}`,
      isAvailable: i <= availableSeats, // Các ghế đầu tiên là trống, các ghế sau là đã bán
      type: isSeatCoach ? "Ngồi mềm" : "Giường nằm",
      tier: isSeatCoach ? undefined : (i % 3 === 0 ? 3 : i % 3),
      compartment: isSeatCoach ? undefined : Math.ceil(i / 6),
    });
  }

  return seats;
};

interface HeaderSelectionProps {
  departure: string;
  arrival: string;
  date: string;
  trainName: string;
  seatTypes: SeatType[];
  onCoachClick: (coach: string) => void;
}

const HeaderSelection: React.FC<HeaderSelectionProps> = ({
  departure,
  arrival,
  date,
  trainName,
  seatTypes,
  onCoachClick,
}) => {
  const seatData: { [key: string]: Seat[] } = {};
  seatTypes.forEach((seatType) => {
    seatData[seatType.coach] = generateSeatData(seatType.coach, seatType.type, seatType.availability);
  });

  const [selectedCoach, setSelectedCoach] = useState<string | null>("Toa 1");

  const handleCoachClick = (coach: string) => {
    setSelectedCoach(coach);
    onCoachClick(coach);
  };

  const handleSeatClick = (seatNumber: string) => {
    console.log(`Đã chọn ghế: ${seatNumber} trong ${selectedCoach}`);
  };

  const currentAvailability = seatTypes.find((st) => st.coach === selectedCoach)?.availability || 0;

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-2">
      <div className="bg-white shadow-lg rounded-lg">
        <HeaderSelectionPopup
          departure={departure}
          arrival={arrival}
          date={date}
          trainName={trainName}
          seatTypes={seatTypes}
          onCoachClick={handleCoachClick}
        />
        {selectedCoach && seatData[selectedCoach] && (
          <SeatSelection
            coach={selectedCoach}
            seats={seatData[selectedCoach]}
            onSeatClick={handleSeatClick}
            totalAvailableSeats={currentAvailability}
          />
        )}
      </div>
    </div>
  );
};

export default HeaderSelection;