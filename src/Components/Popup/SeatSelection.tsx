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
}

const SeatSelection: React.FC<SeatSelectionProps> = ({
  coach,
  seats,
  onSeatClick,
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

  // Toa ghế ngồi: 4 cặp hàng, mỗi cặp hàng 16 ghế (8 ghế mỗi bên lối đi, 4 ghế mỗi cột, 2 cột mỗi bên)
  const seatRows = 4; // 4 cặp hàng
  const seatsPerSidePerColumn = 4; // 4 ghế mỗi cột
  const columnsPerSide = 2; // 2 cột mỗi bên lối đi
  const seatsPerSide = seatsPerSidePerColumn * columnsPerSide; // 8 ghế mỗi bên lối đi
  const seatCols = seatsPerSide * 2; // Tổng số ghế mỗi cặp hàng (16 ghế)

  // Toa giường nằm: mỗi khoang 6 giường (3 tầng, 2 bên)
  const bedsPerCompartment = 6;
  const compartments = isBedCoach ? Math.ceil(seats.length / bedsPerCompartment) : 1;

  return (
    <div className="bg-white p-4 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">
        {coach} {isSeatCoach ? "💺 Ngồi mềm điều hòa" : isBedCoach ? "🛏️ Giường nằm khoang 6 điều hòa" : ""}
      </h2>
      <div className="flex justify-center">
        <div className="w-full max-w-3xl">
          {isSeatCoach ? (
            // Ghế ngồi: 4 cặp hàng, mỗi cặp hàng 16 ghế (8 ghế mỗi bên lối đi, 4 ghế mỗi cột, 2 cột mỗi bên)
            <div className="flex flex-col gap-4">
              {Array.from({ length: seatRows }).map((_, rowIdx) => (
                <div key={rowIdx} className="flex items-stretch gap-2">
                  {/* Ghế bên trái (2 cột, mỗi cột 4 ghế) */}
                  <div className="flex gap-2">
                    {Array.from({ length: columnsPerSide }).map((_, colIdx) => (
                      <div key={`left-col-${colIdx}`} className="flex flex-col gap-2">
                        {Array.from({ length: seatsPerSidePerColumn }).map((_, seatIdx) => {
                          const seatIndex =
                            rowIdx * seatCols + colIdx * seatsPerSidePerColumn + seatIdx;
                          const seat = seats[seatIndex];
                          if (!seat) return <div key={`empty-left-${colIdx}-${seatIdx}`} className="w-14 h-14" />;
                          const isSelected = selectedSeats.includes(seat.seatNumber);
                          return (
                            <div
                              key={seat.seatNumber}
                              className={`relative group w-14 h-14 flex flex-col items-center justify-center rounded cursor-pointer
                                ${isSelected ? "bg-blue-500 text-white border-blue-600" : seat.isAvailable ? "bg-green-500 text-white border-green-600 hover:bg-green-600" : "bg-gray-400 text-white border-gray-500 cursor-not-allowed"}`}
                              onClick={() => seat.isAvailable && handleSeatClick(seat.seatNumber)}
                            >
                              <span className="font-medium">{seat.seatNumber}</span>
                              <span>💺</span>
                              {/* Tooltip */}
                              <div
                                className={`absolute top-[-30px] text-xs text-white px-2 py-1 rounded hidden group-hover:block ${isSelected ? "bg-blue-600" : seat.isAvailable ? "bg-green-600" : "bg-gray-600"}`}
                              >
                                {isSelected ? "Chỗ đang chọn" : seat.isAvailable ? "Chỗ còn trống" : "Chỗ đã bán"}
                              </div>
                              {/* Giá */}
                              {seat.isAvailable && (
                                <div className="absolute top-[60px] text-xs text-gray-700">
                                  {`${Math.round(seat.isAvailable ? 582 : 906)}K`}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                  {/* Lối đi và bàn */}
                  <div className="flex flex-col items-center">
                    {rowIdx === 0 ? (
                      <>
                        <div className="bg-gray-100 h-6 w-20 flex items-center justify-center">
                          <span className="text-gray-500 text-xs">BÀN</span>
                        </div>
                        <div className="bg-gray-200 w-4 flex-1 rounded"></div>
                      </>
                    ) : (
                      <div className="bg-gray-200 w-4 flex-1 rounded"></div>
                    )}
                  </div>
                  {/* Ghế bên phải (2 cột, mỗi cột 4 ghế) */}
                  <div className="flex gap-2">
                    {Array.from({ length: columnsPerSide }).map((_, colIdx) => (
                      <div key={`right-col-${colIdx}`} className="flex flex-col gap-2">
                        {Array.from({ length: seatsPerSidePerColumn }).map((_, seatIdx) => {
                          const seatIndex =
                            rowIdx * seatCols +
                            seatsPerSide +
                            colIdx * seatsPerSidePerColumn +
                            seatIdx;
                          const seat = seats[seatIndex];
                          if (!seat) return <div key={`empty-right-${colIdx}-${seatIdx}`} className="w-14 h-14" />;
                          const isSelected = selectedSeats.includes(seat.seatNumber);
                          return (
                            <div
                              key={seat.seatNumber}
                              className={`relative group w-14 h-14 flex flex-col items-center justify-center rounded cursor-pointer
                                ${isSelected ? "bg-blue-500 text-white border-blue-600" : seat.isAvailable ? "bg-green-500 text-white border-green-600 hover:bg-green-600" : "bg-gray-400 text-white border-gray-500 cursor-not-allowed"}`}
                              onClick={() => seat.isAvailable && handleSeatClick(seat.seatNumber)}
                            >
                              <span className="font-medium">{seat.seatNumber}</span>
                              <span>💺</span>
                              {/* Tooltip */}
                              <div
                                className={`absolute top-[-30px] text-xs text-white px-2 py-1 rounded hidden group-hover:block ${isSelected ? "bg-blue-600" : seat.isAvailable ? "bg-green-600" : "bg-gray-600"}`}
                              >
                                {isSelected ? "Chỗ đang chọn" : seat.isAvailable ? "Chỗ còn trống" : "Chỗ đã bán"}
                              </div>
                              {/* Giá */}
                              {seat.isAvailable && (
                                <div className="absolute top-[60px] text-xs text-gray-700">
                                  {`${Math.round(seat.isAvailable ? 582 : 906)}K`}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Giường nằm: các khoang xếp theo hàng ngang, có thanh cuộn ngang
            <div className="overflow-x-auto">
              <div className="flex flex-row gap-4">
                {Array.from({ length: compartments }).map((_, compIdx) => (
                  <div key={compIdx} className="flex-shrink-0">
                    <h3 className="text-lg font-medium mb-2">Khoang {compIdx + 1}</h3>
                    <div className="flex flex-row gap-4">
                      {/* Bên trái khoang (xếp theo cột) */}
                      <div className="flex flex-col gap-2">
                        {Array.from({ length: 3 }).map((_, tierIdx) => {
                          const seatIdx = compIdx * bedsPerCompartment + tierIdx;
                          const seat = seats[seatIdx];
                          if (!seat) return <div key={`empty-bed-left-${tierIdx}`} className="w-16 h-12" />;
                          const isSelected = selectedSeats.includes(seat.seatNumber);
                          return (
                            <div
                              key={seat.seatNumber}
                              className={`relative group w-16 h-12 flex flex-col items-center justify-center rounded cursor-pointer
                                ${isSelected ? "bg-blue-500 text-white border-blue-600" : seat.isAvailable ? "bg-green-500 text-white border-green-600 hover:bg-green-600" : "bg-gray-400 text-white border-gray-500 cursor-not-allowed"}`}
                              onClick={() => seat.isAvailable && handleSeatClick(seat.seatNumber)}
                            >
                              <span className="font-medium">{seat.seatNumber}</span>
                              <span>🛏️ T{seat.tier || tierIdx + 1}</span>
                              {/* Tooltip */}
                              <div
                                className={`absolute top-[-30px] text-xs text-white px-2 py-1 rounded hidden group-hover:block ${isSelected ? "bg-blue-600" : seat.isAvailable ? "bg-green-600" : "bg-gray-600"}`}
                              >
                                {isSelected ? "Chỗ đang chọn" : seat.isAvailable ? "Chỗ còn trống" : "Chỗ đã bán"}
                              </div>
                              {/* Giá */}
                              {seat.isAvailable && (
                                <div className="absolute top-[60px] text-xs text-gray-700">
                                  {`${Math.round(seat.isAvailable ? 582 : 906)}K`}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                      {/* Lối đi */}
                      <div className="flex flex-col justify-center">
                        <div className="w-4 h-36 bg-gray-200 rounded"></div>
                      </div>
                      {/* Bên phải khoang (xếp theo cột) */}
                      <div className="flex flex-col gap-2">
                        {Array.from({ length: 3 }).map((_, tierIdx) => {
                          const seatIdx = compIdx * bedsPerCompartment + 3 + tierIdx;
                          const seat = seats[seatIdx];
                          if (!seat) return <div key={`empty-bed-right-${tierIdx}`} className="w-16 h-12" />;
                          const isSelected = selectedSeats.includes(seat.seatNumber);
                          return (
                            <div
                              key={seat.seatNumber}
                              className={`relative group w-16 h-12 flex flex-col items-center justify-center rounded cursor-pointer
                                ${isSelected ? "bg-blue-500 text-white border-blue-600" : seat.isAvailable ? "bg-green-500 text-white border-green-600 hover:bg-green-600" : "bg-gray-400 text-white border-gray-500 cursor-not-allowed"}`}
                              onClick={() => seat.isAvailable && handleSeatClick(seat.seatNumber)}
                            >
                              <span className="font-medium">{seat.seatNumber}</span>
                              <span>🛏️ T{seat.tier || tierIdx + 1}</span>
                              {/* Tooltip */}
                              <div
                                className={`absolute top-[-30px] text-xs text-white px-2 py-1 rounded hidden group-hover:block ${isSelected ? "bg-blue-600" : seat.isAvailable ? "bg-green-600" : "bg-gray-600"}`}
                              >
                                {isSelected ? "Chỗ đang chọn" : seat.isAvailable ? "Chỗ còn trống" : "Chỗ đã bán"}
                              </div>
                              {/* Giá */}
                              {seat.isAvailable && (
                                <div className="absolute top-[60px] text-xs text-gray-700">
                                  {`${Math.round(seat.isAvailable ? 582 : 906)}K`}
                                </div>
                              )}
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
      {/* Trạng thái ghế */}
      <div className="flex justify-between items-center mt-4">
        <div className="flex space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-500 border border-green-600"></div>
            <span>Chỗ trống</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gray-400 border border-gray-500"></div>
            <span>Chỗ đã bán</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-blue-500 border border-blue-600"></div>
            <span>Chỗ đang chọn</span>
          </div>
        </div>
        <div className="text-orange-500">
          Đã chọn: {selectedSeats.length}/{seats.filter((s) => s.isAvailable).length} chỗ
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <button className="bg-orange-500 text-white px-4 py-2 rounded-lg flex items-center">
          Tiếp tục chọn chuyến về
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SeatSelection;