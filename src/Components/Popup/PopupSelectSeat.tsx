import React, { useState } from "react";
import { SeatType } from "./HeaderSeat";
import HeaderSelectionPopup from "./HeaderSeat";
import SeatSelection, { Seat } from "./SeatSelection";

// Hàm tạo dữ liệu ghế giả lập dựa trên availability
const generateSeatData = (coach: string, type: string, availability: number): Seat[] => {
  const isSeatCoach = coach.includes("Toa 1") || coach.includes("Toa 2");
  const seats: Seat[] = [];
  for (let i = 1; i <= availability; i++) {
    seats.push({
      seatNumber: isSeatCoach ? `${i}` : `G${i}`,
      isAvailable: Math.random() > 0.3,
      type: isSeatCoach ? "Ngồi mềm" : "Giường nằm",
      tier: isSeatCoach ? undefined : (i % 3 === 0 ? 3 : i % 3),
      compartment: isSeatCoach ? undefined : Math.ceil(i / 6),
    });
  }
  return seats;
};

const HeaderSelection: React.FC = () => {
  const seatTypes: SeatType[] = [
    { coach: "Toa 1", type: "Ngồi mềm điều hòa", availability: 64, price: "586K - 606K" },
    { coach: "Toa 3", type: "Giường nằm khoang 6 điều hòa", availability: 64, price: "800K - 1021K" },
    { coach: "Toa 4", type: "Giường nằm khoang 6 điều hòa", availability: 64, price: "800K - 1021K" },
    { coach: "Toa 4", type: "Giường nằm khoang 6 điều hòa", availability: 64, price: "800K - 1021K" },
    { coach: "Toa 4", type: "Giường nằm khoang 6 điều hòa", availability: 64, price: "800K - 1021K" },
    { coach: "Toa 4", type: "Giường nằm khoang 6 điều hòa", availability: 64, price: "800K - 1021K" },
  ];

  // Tạo dữ liệu ghế dựa trên availability từ seatTypes
  const seatData: { [key: string]: Seat[] } = {};
  seatTypes.forEach((seatType) => {
    seatData[seatType.coach] = generateSeatData(seatType.coach, seatType.type, seatType.availability);
  });

  const [selectedCoach, setSelectedCoach] = useState<string | null>("Toa 1");

  const handleCoachClick = (coach: string) => {
    setSelectedCoach(coach);
  };

  const handleSeatClick = (seatNumber: string) => {
    console.log(`Đã chọn ghế: ${seatNumber} trong ${selectedCoach}`);
  };

  // Lấy availability của toa hiện tại
  const currentAvailability = seatTypes.find((st) => st.coach === selectedCoach)?.availability || 0;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-2">
      <div className="bg-white shadow-lg rounded-lg">
        <HeaderSelectionPopup
          departure="Ga Hà Nội"
          arrival="Ga Đà Nẵng"
          date="16/04/2025"
          trainName="Tàu Tốc Hành SE7"
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