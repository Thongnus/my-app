import React, { useState } from "react";

export interface Seat {
  seatNumber: string;
  isAvailable: boolean;
  type: string;
  tier?: number;
  compartment?: number;
}

export interface SeatSelectionProps {
  coach: string;
  seats: Seat[];
  onSeatClick?: (seatNumber: string) => void;
  totalAvailableSeats?: number;
}

const SeatSelection: React.FC<SeatSelectionProps> = ({
  coach,
  seats,
  onSeatClick,
  totalAvailableSeats = 0,
}) => {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const handleSeatClick = (seatNumber: string) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
    onSeatClick?.(seatNumber);
  };

  const coachNumber = parseInt(coach.replace("Toa ", ""));
  const isSeatCoach = coachNumber <= 2;
  const isBedCoach = coachNumber >= 3;

  const seatRows = 4;
  const seatsPerSide = 8;
  const seatCols = seatsPerSide * 2;

  const bedsPerCompartment = 6;
  const compartments = isBedCoach ? Math.ceil(seats.length / bedsPerCompartment) : 1;

  // SVG Icon cho ghế
  const SeatIcon = ({ isSelected, isAvailable }: { isSelected: boolean; isAvailable: boolean }) => (
    <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect
        x="4"
        y="4"
        width="16"
        height="16"
        rx="2"
        fill={isSelected ? "#3B82F6" : isAvailable ? "#22C55E" : "#9CA3AF"}
      />
      <path d="M6 8H18V12H6V8Z" fill="white" fillOpacity="0.2" />
      <path d="M8 12H16V18H8V12Z" fill="white" fillOpacity="0.1" />
    </svg>
  );

  // SVG Icon cho giường
  const BedIcon = ({ isSelected, isAvailable }: { isSelected: boolean; isAvailable: boolean }) => (
    <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect
        x="4"
        y="4"
        width="16"
        height="16"
        rx="2"
        fill={isSelected ? "#3B82F6" : isAvailable ? "#22C55E" : "#9CA3AF"}
      />
      <path d="M6 6H18V10H6V6Z" fill="white" fillOpacity="0.2" />
      <path d="M6 10H18V18H6V10Z" fill="white" fillOpacity="0.1" />
      <path d="M6 10H18" stroke="white" strokeOpacity="0.3" strokeWidth="1" />
    </svg>
  );

  return (
    <div className="bg-white p-6 rounded-lg sm:p-4">
      <h2 className="text-2xl font-semibold mb-6 sm:text-xl">
        {coach} {isSeatCoach ? "Ngồi mềm điều hòa" : isBedCoach ? "Giường nằm khoang 6 điều hòa" : ""}
      </h2>
      <div className="flex justify-center">
        <div className="w-full max-w-5xl">
          {isSeatCoach ? (
            <div className="flex flex-col gap-4 sm:gap-3">
              {Array.from({ length: seatRows }).map((_, rowIdx) => {
                const rowSeats = seats.slice(rowIdx * seatCols, (rowIdx + 1) * seatCols);
                const leftSeats = rowSeats.slice(0, seatsPerSide).filter(seat => seat); // Lọc bỏ ghế trống
                const rightSeats = rowSeats.slice(seatsPerSide).filter(seat => seat); // Lọc bỏ ghế trống

                return (
                  <div key={rowIdx} className="flex justify-center items-center gap-2 sm:gap-1">
                    {/* Ghế bên trái */}
                    <div className="flex justify-end gap-2 sm:gap-1">
                      {leftSeats.map((seat) => {
                        const isSelected = selectedSeats.includes(seat.seatNumber);
                        return (
                          <div
                            key={seat.seatNumber}
                            className={`relative group w-12 h-12 sm:w-10 sm:h-10 flex flex-col items-center justify-center rounded cursor-pointer
                              ${isSelected ? "border-2 border-blue-600" : seat.isAvailable ? "border-2 border-green-600 hover:border-green-700" : "border-2 border-gray-500 cursor-not-allowed"}`}
                            onClick={() => seat.isAvailable && handleSeatClick(seat.seatNumber)}
                          >
                            <SeatIcon isSelected={isSelected} isAvailable={seat.isAvailable} />
                            <div className="absolute flex flex-col items-center">
                              <span className="font-medium text-sm sm:text-xs text-white">{seat.seatNumber}</span>
                              {seat.isAvailable && (
                                <span className="text-xs sm:text-[10px] text-white">
                                  {`${Math.round(seat.isAvailable ? 582 : 906)}K`}
                                </span>
                              )}
                            </div>
                            <div
                              className={`absolute top-[-32px] sm:top-[-28px] text-sm sm:text-xs text-white px-2 sm:px-1.5 py-1 rounded hidden group-hover:block ${isSelected ? "bg-blue-600" : seat.isAvailable ? "bg-green-600" : "bg-gray-600"}`}
                            >
                              {isSelected ? "Chỗ đang chọn" : seat.isAvailable ? "Chỗ còn trống" : "Chỗ đã bán"}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    {/* Lối đi */}
                    <div className="flex flex-col items-center">
                      <div className="bg-gray-200 w-4 sm:w-3 h-12 sm:h-10 rounded"></div>
                    </div>
                    {/* Ghế bên phải */}
                    <div className="flex justify-start gap-2 sm:gap-1">
                      {rightSeats.map((seat) => {
                        const isSelected = selectedSeats.includes(seat.seatNumber);
                        return (
                          <div
                            key={seat.seatNumber}
                            className={`relative group w-12 h-12 sm:w-10 sm:h-10 flex flex-col items-center justify-center rounded cursor-pointer
                              ${isSelected ? "border-2 border-blue-600" : seat.isAvailable ? "border-2 border-green-600 hover:border-green-700" : "border-2 border-gray-500 cursor-not-allowed"}`}
                            onClick={() => seat.isAvailable && handleSeatClick(seat.seatNumber)}
                          >
                            <SeatIcon isSelected={isSelected} isAvailable={seat.isAvailable} />
                            <div className="absolute flex flex-col items-center">
                              <span className="font-medium text-sm sm:text-xs text-white">{seat.seatNumber}</span>
                              {seat.isAvailable && (
                                <span className="text-xs sm:text-[10px] text-white">
                                  {`${Math.round(seat.isAvailable ? 582 : 906)}K`}
                                </span>
                              )}
                            </div>
                            <div
                              className={`absolute top-[-32px] sm:top-[-28px] text-sm sm:text-xs text-white px-2 sm:px-1.5 py-1 rounded hidden group-hover:block ${isSelected ? "bg-blue-600" : seat.isAvailable ? "bg-green-600" : "bg-gray-600"}`}
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
                  <div key={compIdx} className="flex-shrink-0">
                    <h3 className="text-xl sm:text-lg font-medium mb-3">Khoang {compIdx + 1}</h3>
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
                              className={`relative group w-16 h-16 sm:w-14 sm:h-14 flex flex-col items-center justify-center rounded cursor-pointer
                                ${isSelected ? "border-2 border-blue-600" : seat.isAvailable ? "border-2 border-green-600 hover:border-green-700" : "border-2 border-gray-500 cursor-not-allowed"}`}
                              onClick={() => seat.isAvailable && handleSeatClick(seat.seatNumber)}
                            >
                              <BedIcon isSelected={isSelected} isAvailable={seat.isAvailable} />
                              <div className="absolute flex flex-col items-center">
                                <span className="font-medium text-sm sm:text-xs text-white">{seat.seatNumber}</span>
                                <span className="text-xs sm:text-[10px] text-white">
                                  T{seat.tier || tierIdx + 1}
                                </span>
                                {seat.isAvailable && (
                                  <span className="text-xs sm:text-[10px] text-white">
                                    {`${Math.round(seat.isAvailable ? 582 : 906)}K`}
                                  </span>
                                )}
                              </div>
                              <div
                                className={`absolute top-[-32px] sm:top-[-28px] text-sm sm:text-xs text-white px-2 sm:px-1.5 py-1 rounded hidden group-hover:block ${isSelected ? "bg-blue-600" : seat.isAvailable ? "bg-green-600" : "bg-gray-600"}`}
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
                              className={`relative group w-16 h-16 sm:w-14 sm:h-14 flex flex-col items-center justify-center rounded cursor-pointer
                                ${isSelected ? "border-2 border-blue-600" : seat.isAvailable ? "border-2 border-green-600 hover:border-green-700" : "border-2 border-gray-500 cursor-not-allowed"}`}
                              onClick={() => seat.isAvailable && handleSeatClick(seat.seatNumber)}
                            >
                              <BedIcon isSelected={isSelected} isAvailable={seat.isAvailable} />
                              <div className="absolute flex flex-col items-center">
                                <span className="font-medium text-sm sm:text-xs text-white">{seat.seatNumber}</span>
                                <span className="text-xs sm:text-[10px] text-white">
                                  T{seat.tier || tierIdx + 1}
                                </span>
                                {seat.isAvailable && (
                                  <span className="text-xs sm:text-[10px] text-white">
                                    {`${Math.round(seat.isAvailable ? 582 : 906)}K`}
                                  </span>
                                )}
                              </div>
                              <div
                                className={`absolute top-[-32px] sm:top-[-28px] text-sm sm:text-xs text-white px-2 sm:px-1.5 py-1 rounded hidden group-hover:block ${isSelected ? "bg-blue-600" : seat.isAvailable ? "bg-green-600" : "bg-gray-600"}`}
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
          <div className="flex items-center space-x-3 sm:space-x-2">
            <div className="w-5 h-5 sm:w-4 sm:h-4 bg-green-500 border border-green-600"></div>
            <span className="text-base sm:text-sm">Chỗ trống</span>
          </div>
          <div className="flex items-center space-x-3 sm:space-x-2">
            <div className="w-5 h-5 sm:w-4 sm:h-4 bg-gray-400 border border-gray-500"></div>
            <span className="text-base sm:text-sm">Chỗ đã bán</span>
          </div>
          <div className="flex items-center space-x-3 sm:space-x-2">
            <div className="w-5 h-5 sm:w-4 sm:h-4 bg-blue-500 border border-blue-600"></div>
            <span className="text-base sm:text-sm">Chỗ đang chọn</span>
          </div>
        </div>
        <div className="text-orange-500 text-base sm:text-sm">
          Đã chọn: {selectedSeats.length}/{totalAvailableSeats} chỗ
        </div>
      </div>
      <div className="flex justify-end mt-6">
        <button className="bg-orange-500 text-white px-6 py-3 sm:px-4 sm:py-2 rounded-lg flex items-center text-base sm:text-sm">
          Tiếp tục chọn chuyến về
          <svg className="w-5 h-5 sm:w-4 sm:h-4 ml-3 sm:ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SeatSelection;