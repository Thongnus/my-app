import React, { useState } from "react";
import HeaderSelectionPopup from "./HeaderSeat";
import SeatSelection from "./SeatSelection";
import { HeaderSelectionProps, Seat } from "../../Entity/Entity";

const generateSeatData = (coach: string, type: string, availability: number): Seat[] => {
  const totalSeats = 64;
  const availableSeats = Math.min(availability, totalSeats);
  const seats: Seat[] = [];
  const isSeatCoach = coach.includes("Toa 1") || coach.includes("Toa 2");
  const isBedCoach = coach.includes("Toa 3") || coach.includes("Toa 4");
  const isLuxuryBedCoach = coach.includes("Toa 5") || coach.includes("Toa 6");

  for (let i = 1; i <= totalSeats; i++) {
    seats.push({
      seatNumber: isSeatCoach ? `${i}` : `G${i}`,
      isAvailable: i <= availableSeats,
      type: isSeatCoach ? "Ngồi mềm" : (isLuxuryBedCoach ? "Giường nằm VIP" : "Giường nằm"),
      compartment: isSeatCoach ? undefined : Math.ceil(i / 6),
      tier: isSeatCoach ? undefined : (i % 3 === 0 ? 3 : i % 3),
      price: isSeatCoach 
        ? 582000 
        : isLuxuryBedCoach 
          ? (i % 3 === 0 ? 906000 : i % 3 === 1 ? 856000 : 806000)
          : (i % 3 === 0 ? 756000 : i % 3 === 1 ? 706000 : 656000)
    });
  }

  return seats;
};

const HeaderSelection: React.FC<HeaderSelectionProps> = ({
  departure,
  arrival,
  date,
  trainName,
  coach,
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
  coach.forEach((Coach: { coach: string; type: string; availability: number }) => {
    seatData[Coach.coach] = generateSeatData(Coach.coach, Coach.type, Coach.availability);
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
      setSelectedOutboundTrip((prev) =>
        prev ? { ...prev, seats: selectedSeats } : {
          operator: "",
          departureTime: "",
          seats: selectedSeats,
          departure: departure,
          arrival: arrival,
          date: date,
          trainName: trainName,
          coach: selectedCoach || "",
          pricePerSeat: (coach.find(c => c.coach === selectedCoach)?.price || 0) / 1000
        }
      );
    } else if (tripDirection === "return" && setSelectedReturnTrip) {
      setSelectedReturnTrip((prev) =>
        prev ? { ...prev, seats: selectedSeats } : {
          operator: "",
          departureTime: "",
          seats: selectedSeats,
          departure: departure,
          arrival: arrival,
          date: date,
          trainName: trainName,
          coach: selectedCoach || "",
          pricePerSeat: (coach.find(c => c.coach === selectedCoach)?.price || 0) / 1000
        }
      );
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

  const selectedCoachObj = coach.find((st: { coach: string; type: string; availability: number }) => st.coach === selectedCoach);
  const currentAvailability = selectedCoachObj?.availability || 0;

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
          Coach={coach}
          onCoachClick={handleCoachClick}
        />
        {selectedCoach && seatData[selectedCoach] && selectedCoachObj && (
          <SeatSelection
            coach={selectedCoachObj}
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