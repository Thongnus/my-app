import React, { useState } from 'react';

// Định nghĩa kiểu dữ liệu cho một ghế
export interface Seat {
  seatNumber: string; // Ví dụ: "A1", "B2"
  isAvailable: boolean; // True nếu ghế còn trống, false nếu đã đặt
  type: string; // "Ghế ngồi" hoặc "Giường nằm"
  tier?: number; // Tầng của giường (1, 2, 3) - chỉ áp dụng cho giường nằm
  compartment?: number; // Khoang (1, 2, 3,...)
}

// Định nghĩa kiểu dữ liệu cho props của component
export interface SeatSelectionProps {
  coach: string; // Ví dụ: "Toa 1"
  seats: Seat[];
  onSeatClick?: (seatNumber: string) => void; // Callback khi người dùng nhấn vào ghế
}

const SeatSelection: React.FC<SeatSelectionProps> = ({
  coach,
  seats,
  onSeatClick,
}) => {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  // Hàm xử lý khi nhấn vào ghế
  const handleSeatClick = (seatNumber: string) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
    onSeatClick?.(seatNumber);
  };

  // Xác định loại toa
  const coachNumber = parseInt(coach.replace('Toa ', ''));
  const isSeatCoach = coachNumber <= 2; // Toa 1, 2 là ghế ngồi
  const isBedCoach = coachNumber >= 3; // Toa 3 trở đi là giường nằm

  // Cấu hình bố trí
  const seatsPerRowSide = 2; // 2 ghế/giường mỗi bên lối đi
  const rowsPerCompartment = isSeatCoach ? 4 : 1; // Ghế ngồi: 4 hàng/khoang; Giường nằm: 1 hàng/khoang (nhưng có 3 tầng)
  const tiersPerCompartment = isBedCoach ? 3 : 1; // Giường nằm: 3 tầng; Ghế ngồi: không có tầng
  const totalSeatsPerCompartment = seatsPerRowSide * 2 * rowsPerCompartment * tiersPerCompartment; // Số ghế/giường mỗi khoang
  const compartments = Math.ceil(seats.length / totalSeatsPerCompartment); // Số khoang

  return (
    <div className="bg-white p-4 rounded-lg">
      {/* Tiêu đề toa */}
      <h2 className="text-xl font-semibold mb-4">
        {coach} {isSeatCoach ? '💺 Ngồi mềm điều hòa' : isBedCoach ? '🛏️ Giường nằm khoang 6 điều hòa' : ''}
      </h2>

      {/* Lưới hiển thị ghế/giường với lối đi ở giữa */}
      <div className="flex justify-center">
        <div className="w-full max-w-2xl">
          {Array.from({ length: compartments }).map((_, compartmentIndex) => {
            const compartmentSeats = seats.slice(
              compartmentIndex * totalSeatsPerCompartment,
              (compartmentIndex + 1) * totalSeatsPerCompartment
            );

            return (
              <div key={`compartment-${compartmentIndex}`} className="mb-6">
                {/* Tiêu đề khoang (chỉ hiển thị cho giường nằm) */}
                {isBedCoach && (
                  <h3 className="text-lg font-medium mb-2">
                    Khoang {compartmentIndex + 1}
                  </h3>
                )}

                <div>
                  {Array.from({ length: rowsPerCompartment * tiersPerCompartment }).map((_, rowIndex) => (
                    <div
                      key={`row-${compartmentIndex}-${rowIndex}`}
                      className="grid gap-2 mb-2"
                      style={{ gridTemplateColumns: 'repeat(5, minmax(0, 1fr))' }}
                    >
                      {/* Bên trái lối đi */}
                      {Array.from({ length: seatsPerRowSide }).map((_, sideIndex) => {
                        const seatIndex =
                          rowIndex * seatsPerRowSide * 2 +
                          sideIndex +
                          compartmentIndex * totalSeatsPerCompartment;
                        const seat = seats[seatIndex];
                        if (!seat) return <div key={`empty-left-${sideIndex}`} className="h-12"></div>;

                        const isSelected = selectedSeats.includes(seat.seatNumber);
                        const icon = seat.type === 'Ghế ngồi' ? '💺' : `🛏️ T${seat.tier || 1}`;

                        return (
                          <div
                            key={`left-${seat.seatNumber}`}
                            className={`p-2 border rounded text-center cursor-pointer transition-colors flex flex-col items-center justify-center h-12 ${
                              isSelected
                                ? 'bg-blue-200 border-blue-400'
                                : seat.isAvailable
                                ? 'bg-white border-gray-300 hover:bg-gray-100'
                                : 'bg-gray-300 border-gray-400 cursor-not-allowed'
                            }`}
                            onClick={() =>
                              seat.isAvailable && handleSeatClick(seat.seatNumber)
                            }
                          >
                            <div className="font-medium">{seat.seatNumber}</div>
                            <div className="font-medium">{icon}</div>
                            <div className="text-sm text-gray-600">
                              {seat.isAvailable ? `${Math.round(seat.isAvailable ? 582 : 906)}K` : 'Đã đặt'}
                            </div>
                          </div>
                        );
                      })}

                      {/* Lối đi */}
                      <div className="bg-gray-100 h-12 flex items-center justify-center">
                        {isSeatCoach && rowIndex === 0 ? (
                          <span className="text-gray-500">BÀN</span>
                        ) : null}
                      </div>

                      {/* Bên phải lối đi */}
                      {Array.from({ length: seatsPerRowSide }).map((_, sideIndex) => {
                        const seatIndex =
                          rowIndex * seatsPerRowSide * 2 +
                          seatsPerRowSide +
                          sideIndex +
                          compartmentIndex * totalSeatsPerCompartment;
                        const seat = seats[seatIndex];
                        if (!seat) return <div key={`empty-right-${sideIndex}`} className="h-12"></div>;

                        const isSelected = selectedSeats.includes(seat.seatNumber);
                        const icon = seat.type === 'Ghế ngồi' ? '💺' : `🛏️ T${seat.tier || 1}`;

                        return (
                          <div
                            key={`right-${seat.seatNumber}`}
                            className={`p-2 border rounded text-center cursor-pointer transition-colors flex flex-col items-center justify-center h-12 ${
                              isSelected
                                ? 'bg-blue-200 border-blue-400'
                                : seat.isAvailable
                                ? 'bg-white border-gray-300 hover:bg-gray-100'
                                : 'bg-gray-300 border-gray-400 cursor-not-allowed'
                            }`}
                            onClick={() =>
                              seat.isAvailable && handleSeatClick(seat.seatNumber)
                            }
                          >
                            <div className="font-medium">{seat.seatNumber}</div>
                            <div className="font-medium">{icon}</div>
                            <div className="text-sm text-gray-600">
                              {seat.isAvailable ? `${Math.round(seat.isAvailable ? 582 : 906)}K` : 'Đã đặt'}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Trạng thái ghế */}
      <div className="flex justify-between items-center mt-4">
        <div className="flex space-x-4">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-white border border-gray-300 mr-2"></div>
            <span>Chỗ trống</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-gray-300 border border-gray-400 mr-2"></div>
            <span>Chỗ đã bán</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-blue-200 border border-blue-400 mr-2"></div>
            <span>Chỗ đang chọn</span>
          </div>
        </div>
        <div className="text-orange-500">
          Đã chọn: {selectedSeats.length}/{seats.filter((s) => s.isAvailable).length} chỗ
        </div>
      </div>

      {/* Nút "Tiếp tục chọn chuyến về" */}
      <div className="flex justify-end mt-4">
        <button className="bg-orange-500 text-white px-4 py-2 rounded-lg flex items-center">
          Tiếp tục chọn chuyến về
          <svg
            className="w-4 h-4 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SeatSelection;