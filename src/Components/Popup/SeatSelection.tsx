import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Định nghĩa kiểu dữ liệu cho một ghế
export interface Seat {
  seatNumber: string; // Số ghế, ví dụ: "1", "2" (cho ghế ngồi) hoặc "G1", "G2" (cho giường nằm)
  isAvailable: boolean; // Trạng thái ghế: true (còn trống), false (đã bán)
  type: string; // Loại ghế, ví dụ: "Ngồi mềm" hoặc "Giường nằm"
  tier?: number; // Tầng (dành cho giường nằm), ví dụ: 1, 2, 3 (tầng 1, tầng 2, tầng 3)
  compartment?: number; // Khoang (dành cho giường nằm), ví dụ: 1, 2,... (khoang 1, khoang 2,...)
}

// Định nghĩa kiểu dữ liệu cho các props của component SeatSelection
export interface SeatSelectionProps {
  coach: string; // Tên toa, ví dụ: "Toa 1"
  seats: Seat[]; // Danh sách các ghế trong toa
  onSeatClick?: (seatNumber: string) => void; // Hàm callback khi người dùng click vào một ghế, truyền số ghế (ví dụ: "1")
  totalAvailableSeats?: number; // Tổng số ghế còn trống trong toa, ví dụ: 11
  onContinue?: () => void; // Hàm callback khi người dùng nhấn nút "Tiếp tục chọn chuyến về" (dành cho chuyến khứ hồi)
  onBook?: (selectedSeats: string[]) => void; // Hàm callback khi người dùng nhấn nút "Đặt vé", truyền danh sách ghế đã chọn
  departure?: string; // Điểm khởi hành, ví dụ: "Ga Hà Nội" (dùng để log thông tin đặt vé)
  arrival?: string; // Điểm đến, ví dụ: "Ga Đà Nẵng" (dùng để log thông tin đặt vé)
  date?: string; // Ngày đi, ví dụ: "10/04/2025" (dùng để log thông tin đặt vé)
  trainName?: string; // Tên tàu, ví dụ: "SE19: VIP 2X" (dùng để log thông tin đặt vé)
  tripDirection?: 'outbound' | 'return';
}

const SeatSelection: React.FC<SeatSelectionProps> = ({
  coach, // Tên toa
  seats, // Danh sách ghế trong toa
  onSeatClick, // Hàm xử lý khi click vào ghế
  totalAvailableSeats = 0, // Tổng số ghế còn trống
  onContinue, // Hàm xử lý khi nhấn "Tiếp tục chọn chuyến về"
  onBook, // Hàm xử lý khi nhấn "Đặt vé"
  departure, // Điểm khởi hành
  arrival, // Điểm đến
  date, // Ngày đi
  trainName, // Tên tàu
  tripDirection
}) => {
  // Quản lý danh sách ghế đã chọn (state)
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]); // Ví dụ: ["1", "2"] nếu người dùng chọn ghế 1 và 2
  const navigate = useNavigate(); // Khởi tạo useNavigate để chuyển hướng
  // Lấy query parameter từ URL để kiểm tra xem có phải chuyến khứ hồi không
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const roundTrip = queryParams.get("roundTrip") === "true"; // true nếu là chuyến khứ hồi, false nếu là một chiều

  // Hàm xử lý khi người dùng click vào một ghế
  const handleSeatClick = (seatNumber: string) => {
    if (selectedSeats.includes(seatNumber)) {
      // Nếu ghế đã được chọn, bỏ chọn ghế đó
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
    } else {
      // Nếu ghế chưa được chọn, thêm ghế vào danh sách đã chọn
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
    onSeatClick?.(seatNumber); // Gọi hàm callback nếu có
  };

  // Hàm xử lý khi người dùng nhấn nút "Tiếp tục chọn chuyến về" hoặc "Đặt vé"
  const handleButtonClick = () => {
    if (roundTrip && tripDirection === "outbound") {
      // Nếu là chuyến khứ hồi và đang chọn chuyến đi, gọi onContinue để chọn chuyến về
      onContinue?.();
    } else {
      // Nếu là chuyến một chiều hoặc đang chọn chuyến về, xử lý đặt vé
      if (selectedSeats.length === 0) {
        alert("Vui lòng chọn ít nhất một ghế trước khi đặt vé!");
        return;
      }

      // Log thông tin đặt vé
      console.log("Thông tin đặt vé:", {
        departure,
        arrival,
        date,
        trainName,
        coach,
        selectedSeats,
      });

      // Gọi onBook để xử lý logic đặt vé (nếu có)
      onBook?.(selectedSeats);

      // Chuyển hướng đến trang thanh toán, truyền thông tin đặt vé qua state
      navigate("/payment", {
        state: {
          departure,
          arrival,
          date,
          trainName,
          coach,
          selectedSeats,
          tripDirection,
        },
      });
    }
  };
  // Xác định loại toa: toa ghế ngồi (Toa 1, Toa 2) hay toa giường nằm (Toa 3 trở lên)
  const coachNumber = parseInt(coach.replace("Toa ", "")); // Ví dụ: "Toa 1" -> 1
  const isSeatCoach = coachNumber <= 2; // true nếu là toa ghế ngồi (Toa 1, Toa 2)
  const isBedCoach = coachNumber >= 3; // true nếu là toa giường nằm (Toa 3 trở lên)

  // Cấu trúc hiển thị ghế ngồi: 4 hàng, mỗi hàng 16 ghế (8 ghế mỗi bên lối đi)
  const seatRows = 4; // 4 hàng ghế ngồi
  const seatsPerSide = 8; // 8 ghế mỗi bên lối đi (4 hàng x 16 ghế = 64 ghế)
  const seatCols = seatsPerSide * 2; // Tổng số cột: 16 ghế (8 trái + 8 phải)

  // Cấu trúc hiển thị giường nằm: 6 giường mỗi khoang
  const bedsPerCompartment = 6; // 6 giường mỗi khoang (3 giường mỗi bên lối đi)
  const compartments = isBedCoach ? Math.ceil(seats.length / bedsPerCompartment) : 1; // Tổng số khoang, ví dụ: 64 ghế / 6 = 11 khoang

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
          {roundTrip && tripDirection === "outbound" ? "Tiếp tục chọn chuyến về" : "Đặt vé"}
          {roundTrip && tripDirection === "outbound" ? (
            <svg className="w-4 h-4 sm:w-3 sm:h-3 ml-2 sm:ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          ) : (
            <svg className="w-4 h-4 sm:w-3 sm:h-3 ml-2 sm:ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default SeatSelection;