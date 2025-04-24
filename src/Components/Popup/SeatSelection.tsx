import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SeatSelectionProps } from "../../Entity/Entity";

const SeatSelection: React.FC<SeatSelectionProps> = ({
  coach,
  seats,
  onSeatClick,
  totalAvailableSeats = 0,
  onContinue,
  onBook,
  departure,
  arrival,
  date,
  trainName,
  tripDirection,
  roundTrip,
  selectedOutboundTrip,
  selectedReturnTrip,
}) => {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleSeatClick = (seatNumber: string) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
    onSeatClick?.(seatNumber);
  };

  const handleButtonClick = () => {
    if (selectedSeats.length === 0) {
      alert("Vui lòng chọn ít nhất một ghế trước khi tiếp tục!");
      return;
    }

    onBook?.(selectedSeats);

    if (roundTrip && tripDirection === "outbound") {
      onContinue?.();
    } else {
      console.log("Thông tin đặt vé:", {
        departure,
        arrival,
        date,
        trainName,
        coach,
        selectedSeats,
        tripDirection,
      });

      // Đảm bảo dữ liệu đầy đủ trong selectedOutboundTrip và selectedReturnTrip
      const outboundTripData = selectedOutboundTrip || {
        operator: "",
        departureTime: "",
        seats: selectedSeats,
        departure: departure || "",
        arrival: arrival || "",
        date: date?.split('/').reverse().join('-') || "",
        trainName: trainName || "",
        coach: coach || "",
        pricePerSeat: 0,
      };

      const returnTripData = selectedReturnTrip || null;

      navigate("/payment", {
        state: {
          outboundTrip: outboundTripData,
          returnTrip: roundTrip ? returnTripData : null,
          outboundSeats: selectedSeats,
          returnSeats: roundTrip && selectedReturnTrip ? selectedReturnTrip.seats : [],
        },
      });
    }
  };

  const showBookButton = !roundTrip || (roundTrip && tripDirection === "return" && selectedOutboundTrip?.seats && selectedOutboundTrip.seats.length > 0);

  const coachNumber = parseInt(coach.replace("Toa ", ""));
  const isSeatCoach = coachNumber <= 2;
  const isBedCoach = coachNumber >= 3;
  const seatRows = 4;
  const seatsPerSide = 8;
  const seatCols = seatsPerSide * 2;
  const bedsPerCompartment = 6;
  const compartments = isBedCoach ? Math.ceil(seats.length / bedsPerCompartment) : 1;

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-sm sm:p-4">
      <h2 className="text-xl font-semibold mb-4 sm:text-lg text-gray-800">
        {coach} {isSeatCoach ? "Ngồi mềm điều hòa" : isBedCoach ? "Giường nằm khoang 6 điều hòa" : ""}
      </h2>
      <div className="flex justify-center">
        <div className="w-full max-w-5xl">
          {isSeatCoach ? (
            <div className="flex flex-col gap-3 sm:gap-2">
              {Array.from({ length: seatRows }).map((_, rowIdx) => {
                const rowSeats = seats.slice(rowIdx * seatCols, (rowIdx + 1) * seatCols);
                const leftSeats = rowSeats.slice(0, seatsPerSide).filter(seat => seat);
                const rightSeats = rowSeats.slice(seatsPerSide).filter(seat => seat);

                return (
                  <div key={rowIdx} className="flex justify-center items-center gap-2 sm:gap-1">
                    <div className="flex justify-end gap-2 sm:gap-1">
                      {leftSeats.map((seat) => {
                        const isSelected = selectedSeats.includes(seat.seatNumber);
                        return (
                          <div
                            key={seat.seatNumber}
                            className={`relative group w-12 h-16 sm:w-10 sm:h-14 rounded-xl flex flex-col items-center justify-center transition-all duration-200
                              ${isSelected ? "border-2 border-blue-500 shadow-md bg-white cursor-pointer" : seat.isAvailable ? "border border-gray-300 hover:shadow-md hover:border-gray-400 bg-white cursor-pointer" : "border border-gray-300 bg-gray-200 cursor-not-allowed"}`}
                            onClick={() => seat.isAvailable && handleSeatClick(seat.seatNumber)}
                          >
                            <span className="font-bold text-sm sm:text-xs text-gray-800">{seat.seatNumber}</span>
                            {seat.isAvailable && (
                              <span className="text-[10px] sm:text-[9px] text-gray-600">
                                {`${Math.round(seat.isAvailable ? 582 : 906)}K`}
                              </span>
                            )}
                            <div
                              className={`absolute top-[-30px] sm:top-[-26px] text-xs sm:text-[10px] text-white px-2 sm:px-1.5 py-1 rounded shadow hidden group-hover:block ${isSelected ? "bg-blue-500" : seat.isAvailable ? "bg-green-500" : "bg-gray-500"}`}
                            >
                              {isSelected ? "Chỗ đang chọn" : seat.isAvailable ? "Chỗ còn trống" : "Chỗ đã bán"}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="bg-gray-200 w-4 sm:w-3 h-12 sm:h-10 rounded"></div>
                    </div>
                    <div className="flex justify-start gap-2 sm:gap-1">
                      {rightSeats.map((seat) => {
                        const isSelected = selectedSeats.includes(seat.seatNumber);
                        return (
                          <div
                            key={seat.seatNumber}
                            className={`relative group w-12 h-16 sm:w-10 sm:h-14 rounded-xl flex flex-col items-center justify-center transition-all duration-200
                              ${isSelected ? "border-2 border-blue-500 shadow-md bg-white cursor-pointer" : seat.isAvailable ? "border border-gray-300 hover:shadow-md hover:border-gray-400 bg-white cursor-pointer" : "border border-gray-300 bg-gray-200 cursor-not-allowed"}`}
                            onClick={() => seat.isAvailable && handleSeatClick(seat.seatNumber)}
                          >
                            <span className="font-bold text-sm sm:text-xs text-gray-800">{seat.seatNumber}</span>
                            {seat.isAvailable && (
                              <span className="text-[10px] sm:text-[9px] text-gray-600">
                                {`${Math.round(seat.isAvailable ? 582 : 906)}K`}
                              </span>
                            )}
                            <div
                              className={`absolute top-[-30px] sm:top-[-26px] text-xs sm:text-[10px] text-white px-2 sm:px-1.5 py-1 rounded shadow hidden group-hover:block ${isSelected ? "bg-blue-500" : seat.isAvailable ? "bg-green-500" : "bg-gray-500"}`}
                            >
                              {isSelected ? "Chỗ đang chọn" : seat.isAvailable ? "Chỗ còn trống" : "Chỗ đã bán"}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <div className="flex flex-row gap-4 sm:gap-3">
                {Array.from({ length: compartments }).map((_, compIdx) => (
                  <div key={compIdx} className="flex-shrink-0 bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                    <h3 className="text-lg sm:text-base font-medium mb-3 text-gray-700">Khoang {compIdx + 1}</h3>
                    <div className="flex flex-row gap-4 sm:gap-3">
                      <div className="flex flex-col gap-2 sm:gap-1.5">
                        {Array.from({ length: 3 }).map((_, tierIdx) => {
                          const seatIdx = compIdx * bedsPerCompartment + tierIdx;
                          const seat = seats[seatIdx];
                          if (!seat) return null;
                          const isSelected = selectedSeats.includes(seat.seatNumber);
                          return (
                            <div
                              key={seat.seatNumber}
                              className={`relative group w-24 h-14 sm:w-20 sm:h-12 rounded-xl flex flex-col items-center justify-center transition-all duration-200
                                ${isSelected ? "border-2 border-blue-500 shadow-md bg-white cursor-pointer" : seat.isAvailable ? "border border-gray-300 hover:shadow-md hover:border-gray-400 bg-white cursor-pointer" : "border border-gray-300 bg-gray-200 cursor-not-allowed"}`}
                              onClick={() => seat.isAvailable && handleSeatClick(seat.seatNumber)}
                            >
                              <span className="font-bold text-sm sm:text-xs text-gray-800">{seat.seatNumber}</span>
                              <span className="text-[10px] sm:text-[9px] text-gray-600">
                                T{seat.tier || tierIdx + 1}
                              </span>
                              {seat.isAvailable && (
                                <span className="text-[10px] sm:text-[9px] text-gray-600">
                                  {`${Math.round(seat.isAvailable ? 582 : 906)}K`}
                                </span>
                              )}
                              <div
                                className={`absolute top-[-30px] sm:top-[-26px] text-xs sm:text-[10px] text-white px-2 sm:px-1.5 py-1 rounded shadow hidden group-hover:block ${isSelected ? "bg-blue-500" : seat.isAvailable ? "bg-green-500" : "bg-gray-500"}`}
                              >
                                {isSelected ? "Chỗ đang chọn" : seat.isAvailable ? "Chỗ còn trống" : "Chỗ đã bán"}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <div className="flex flex-col justify-center">
                        <div className="w-4 sm:w-3 h-40 sm:h-36 bg-gray-200 rounded"></div>
                      </div>
                      <div className="flex flex-col gap-2 sm:gap-1.5">
                        {Array.from({ length: 3 }).map((_, tierIdx) => {
                          const seatIdx = compIdx * bedsPerCompartment + 3 + tierIdx;
                          const seat = seats[seatIdx];
                          if (!seat) return null;
                          const isSelected = selectedSeats.includes(seat.seatNumber);
                          return (
                            <div
                              key={seat.seatNumber}
                              className={`relative group w-24 h-14 sm:w-20 sm:h-12 rounded-xl flex flex-col items-center justify-center transition-all duration-200
                                ${isSelected ? "border-2 border-blue-500 shadow-md bg-white cursor-pointer" : seat.isAvailable ? "border border-gray-300 hover:shadow-md hover:border-gray-400 bg-white cursor-pointer" : "border border-gray-300 bg-gray-200 cursor-not-allowed"}`}
                              onClick={() => seat.isAvailable && handleSeatClick(seat.seatNumber)}
                            >
                              <span className="font-bold text-sm sm:text-xs text-gray-800">{seat.seatNumber}</span>
                              <span className="text-[10px] sm:text-[9px] text-gray-600">
                                T{seat.tier || tierIdx + 1}
                              </span>
                              {seat.isAvailable && (
                                <span className="text-[10px] sm:text-[9px] text-gray-600">
                                  {`${Math.round(seat.isAvailable ? 582 : 906)}K`}
                                </span>
                              )}
                              <div
                                className={`absolute top-[-30px] sm:top-[-26px] text-xs sm:text-[10px] text-white px-2 sm:px-1.5 py-1 rounded shadow hidden group-hover:block ${isSelected ? "bg-blue-500" : seat.isAvailable ? "bg-green-500" : "bg-gray-500"}`}
                              >
                                {isSelected ? "Chỗ đang chọn" : seat.isAvailable ? "Chỗ còn trống" : "Chỗ đã bán"}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center mt-6 sm:space-y-0 space-y-3">
        <div className="flex space-x-6 sm:space-x-4">
          <div className="flex items-center space-x-2 sm:space-x-1.5">
            <div className="w-5 h-5 sm:w-4 sm:h-4 bg-white border border-gray-300 rounded"></div>
            <span className="text-sm sm:text-xs text-gray-700">Chỗ trống</span>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-1.5">
            <div className="w-5 h-5 sm:w-4 sm:h-4 bg-gray-200 border border-gray-300 rounded"></div>
            <span className="text-sm sm:text-xs text-gray-700">Chỗ đã bán</span>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-1.5">
            <div className="w-5 h-5 sm:w-4 sm:h-4 bg-white border-2 border-blue-500 rounded"></div>
            <span className="text-sm sm:text-xs text-gray-700">Chỗ đang chọn</span>
          </div>
        </div>
        <div className="text-orange-600 text-sm sm:text-xs font-medium">
          Đã chọn: {selectedSeats.length}/{totalAvailableSeats} chỗ
        </div>
      </div>
      <div className="flex justify-end mt-6">
        <button
          onClick={handleButtonClick}
          className="bg-orange-500 text-white px-6 py-2 sm:px-4 sm:py-1.5 rounded-lg flex items-center text-sm sm:text-xs hover:bg-orange-600 transition-colors cursor-pointer"
        >
          {showBookButton ? "Đặt vé" : "Tiếp tục chọn chuyến về"}
          {showBookButton ? (
            <svg className="w-4 h-4 sm:w-3 sm:h-3 ml-2 sm:ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          ) : (
            <svg className="w-4 h-4 sm:w-3 sm:h-3 ml-2 sm:ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default SeatSelection;