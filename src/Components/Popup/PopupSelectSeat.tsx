import React, { useState } from "react";
import HeaderSelectionPopup, { SeatType } from "./HeaderSeat";
import SeatSelection, { Seat } from "./SeatSelection";

const generateSeatData = (coach: string, type: string, availability: number): Seat[] => {
  const totalSeats = 64;
  const availableSeats = Math.min(availability, totalSeats);
  const seats: Seat[] = [];
  const isSeatCoach = coach.includes("Toa 1") || coach.includes("Toa 2");

  for (let i = 1; i <= totalSeats; i++) {
    seats.push({
      seatNumber: isSeatCoach ? `${i}` : `G${i}`,
      isAvailable: i <= availableSeats,
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
  onClose?: () => void;
  onContinue?: () => void;
  tripDirection?: 'outbound' | 'return';
  roundTrip?: boolean;
  selectedOutboundTrip?: { operator: string; departureTime: string; seats?: string[] } | null;
  selectedReturnTrip?: { operator: string; departureTime: string; seats?: string[] } | null;
  setSelectedOutboundTrip?: React.Dispatch<React.SetStateAction<{ operator: string; departureTime: string; seats?: string[] } | null>>;
  setSelectedReturnTrip?: React.Dispatch<React.SetStateAction<{ operator: string; departureTime: string; seats?: string[] } | null>>;
}

const HeaderSelection: React.FC<HeaderSelectionProps> = ({
  departure,
  arrival,
  date,
  trainName,
  seatTypes,
  onCoachClick,
  onClose,
  onContinue,
  tripDirection,
  roundTrip,
  selectedOutboundTrip,
  selectedReturnTrip,
  setSelectedOutboundTrip,
  setSelectedReturnTrip,
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

  const handleBook = (selectedSeats: string[]) => {
    if (tripDirection === "outbound" && setSelectedOutboundTrip) {
      setSelectedOutboundTrip((prev) => prev ? { ...prev, seats: selectedSeats } : { operator: "", departureTime: "", seats: selectedSeats });
    } else if (tripDirection === "return" && setSelectedReturnTrip) {
      setSelectedReturnTrip((prev) => prev ? { ...prev, seats: selectedSeats } : { operator: "", departureTime: "", seats: selectedSeats });
    }
    console.log("Xử lý đặt vé từ HeaderSelection:", {
      departure,
      arrival,
      date,
      trainName,
      coach: selectedCoach,
      selectedSeats,
    });
  };

  const currentAvailability = seatTypes.find((st) => st.coach === selectedCoach)?.availability || 0;

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-2">
      <div className="bg-white shadow-lg rounded-lg relative">
        <div className="absolute top-4 right-4">
          <img
            src="https://res.ivivu.com/train/images/icon/ic_close.svg"
            alt="close"
            className="w-6 h-6 object-contain cursor-pointer"
            onClick={onClose}
          />
        </div>
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
            onBook={handleBook}
            onContinue={onContinue}
            departure={departure}
            arrival={arrival}
            date={date}
            trainName={trainName}
            tripDirection={tripDirection}
            roundTrip={roundTrip}
            selectedOutboundTrip={selectedOutboundTrip}
            selectedReturnTrip={selectedReturnTrip}
          />
        )}
      </div>
    </div>
  );
};

export default HeaderSelection;