// SeatSelection.tsx
import React from 'react';

// Định nghĩa kiểu dữ liệu cho một ghế
export interface Seat {
  seatNumber: string; // Ví dụ: "A1", "B2"
  isAvailable: boolean; // True nếu ghế còn trống, false nếu đã đặt
  type?: string; // Tùy chọn: Ví dụ "Ngồi mềm" hoặc "Giường nằm"
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
  return (
    <div className="bg-white shadow-md p-4 mt-4 rounded-lg">
      {/* Tiêu đề toa */}
      <h2 className="text-xl font-semibold mb-4">{coach}</h2>

      {/* Lưới hiển thị ghế */}
      <div className="grid grid-cols-4 gap-4">
        {seats.map((seat) => (
          <div
            key={seat.seatNumber}
            className={`p-4 border rounded-lg text-center cursor-pointer transition-colors ${
              seat.isAvailable
                ? 'bg-green-100 border-green-300 hover:bg-green-200'
                : 'bg-gray-300 border-gray-400 cursor-not-allowed'
            }`}
            onClick={() =>
              seat.isAvailable && onSeatClick?.(seat.seatNumber)
            }
          >
            <div className="font-medium">{seat.seatNumber}</div>
            {seat.type && <div className="text-sm text-gray-600">{seat.type}</div>}
            <div className="text-sm">
              {seat.isAvailable ? 'Còn trống' : 'Đã đặt'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeatSelection;