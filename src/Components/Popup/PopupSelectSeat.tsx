import React, { useState } from "react";
import HeaderSelectionPopup, { SeatType } from "./HeaderSeat";
import SeatSelection, { Seat } from "./SeatSelection";

// Hàm tạo dữ liệu ghế cho một toa
const generateSeatData = (coach: string, type: string, availability: number): Seat[] => {
  const totalSeats = 64; // Tổng số ghế trong một toa: 64 ghế
  const availableSeats = Math.min(availability, totalSeats); // Số ghế còn trống, không vượt quá tổng số ghế
  const seats: Seat[] = []; // Danh sách ghế sẽ được tạo
  const isSeatCoach = coach.includes("Toa 1") || coach.includes("Toa 2"); // Xác định toa ghế ngồi (Toa 1, Toa 2)

  // Tạo 64 ghế cho toa
  for (let i = 1; i <= totalSeats; i++) {
    seats.push({
      seatNumber: isSeatCoach ? `${i}` : `G${i}`, // Số ghế: "1", "2",... (ghế ngồi) hoặc "G1", "G2",... (giường nằm)
      isAvailable: i <= availableSeats, // Ghế còn trống nếu i <= số ghế còn trống
      type: isSeatCoach ? "Ngồi mềm" : "Giường nằm", // Loại ghế: "Ngồi mềm" hoặc "Giường nằm"
      tier: isSeatCoach ? undefined : (i % 3 === 0 ? 3 : i % 3), // Tầng (cho giường nằm): 1, 2, 3
      compartment: isSeatCoach ? undefined : Math.ceil(i / 6), // Khoang (cho giường nằm): 1, 2,... (64 ghế / 6 = 11 khoang)
    });
  }

  return seats;
};

// Định nghĩa kiểu dữ liệu cho các props của component HeaderSelection
interface HeaderSelectionProps {
  departure: string; // Điểm khởi hành, ví dụ: "Ga Hà Nội"
  arrival: string; // Điểm đến, ví dụ: "Ga Đà Nẵng"
  date: string; // Ngày đi, ví dụ: "10/04/2025"
  trainName: string; // Tên tàu, ví dụ: "SE19: VIP 2X"
  seatTypes: SeatType[]; // Danh sách các toa
  onCoachClick: (coach: string) => void; // Hàm callback khi người dùng chọn toa
  onClose?: () => void; // Hàm callback khi người dùng đóng popup
  onContinue?: () => void; // Hàm callback khi người dùng nhấn "Tiếp tục chọn chuyến về"
}

const HeaderSelection: React.FC<HeaderSelectionProps> = ({
  departure, // Điểm khởi hành
  arrival, // Điểm đến
  date, // Ngày đi
  trainName, // Tên tàu
  seatTypes, // Danh sách toa
  onCoachClick, // Hàm xử lý khi chọn toa
  onClose, // Hàm xử lý khi đóng popup
  onContinue, // Hàm xử lý khi nhấn "Tiếp tục chọn chuyến về"
}) => {
  // Tạo dữ liệu ghế cho từng toa
  const seatData: { [key: string]: Seat[] } = {}; // Object lưu dữ liệu ghế, key là tên toa (ví dụ: "Toa 1"), value là danh sách ghế
  seatTypes.forEach((seatType) => {
    seatData[seatType.coach] = generateSeatData(seatType.coach, seatType.type, seatType.availability);
  });

  // Quản lý toa đang được chọn (state)
  const [selectedCoach, setSelectedCoach] = useState<string | null>("Toa 1"); // Mặc định chọn "Toa 1"

  // Hàm xử lý khi người dùng chọn toa
  const handleCoachClick = (coach: string) => {
    setSelectedCoach(coach); // Cập nhật toa đang chọn
    onCoachClick(coach); // Gọi hàm callback từ props
  };

  // Hàm xử lý khi người dùng click vào ghế (tạm thời chỉ log ra console)
  const handleSeatClick = (seatNumber: string) => {
    console.log(`Đã chọn ghế: ${seatNumber} trong ${selectedCoach}`); // Ví dụ: "Đã chọn ghế: 1 trong Toa 1"
  };

  // Hàm xử lý khi nhấn "Đặt vé"
  const handleBook = (selectedSeats: string[]) => {
    console.log("Xử lý đặt vé từ HeaderSelection:", {
      departure, // Ví dụ: "Ga Hà Nội"
      arrival, // Ví dụ: "Ga Đà Nẵng"
      date, // Ví dụ: "10/04/2025"
      trainName, // Ví dụ: "SE19: VIP 2X"
      coach: selectedCoach, // Ví dụ: "Toa 1"
      selectedSeats, // Ví dụ: ["1", "2"]
    });
  };

  // Lấy số ghế còn trống của toa đang chọn
  const currentAvailability = seatTypes.find((st) => st.coach === selectedCoach)?.availability || 0;

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-2">
      <div className="bg-white shadow-lg rounded-lg relative">
        {/* Nút đóng popup */}
        <div className="absolute top-4 right-4">
          <img
            src="https://res.ivivu.com/train/images/icon/ic_close.svg"
            alt="close"
            className="w-6 h-6 object-contain cursor-pointer"
            onClick={onClose} // Gọi hàm onClose khi click
          />
        </div>
        {/* Phần header: Hiển thị thông tin chuyến tàu và danh sách toa */}
        <HeaderSelectionPopup
          departure={departure}
          arrival={arrival}
          date={date}
          trainName={trainName}
          seatTypes={seatTypes}
          onCoachClick={handleCoachClick}
        />
        {/* Phần chọn ghế: Hiển thị danh sách ghế trong toa đã chọn */}
        {selectedCoach && seatData[selectedCoach] && (
          <SeatSelection
            coach={selectedCoach} // Toa đang chọn
            seats={seatData[selectedCoach]} // Danh sách ghế trong toa
            onSeatClick={handleSeatClick} // Hàm xử lý khi click ghế
            totalAvailableSeats={currentAvailability} // Số ghế còn trống
            onBook={handleBook} // Hàm xử lý khi nhấn "Đặt vé"
            onContinue={onContinue} // Hàm xử lý khi nhấn "Tiếp tục chọn chuyến về"
            departure={departure}
            arrival={arrival}
            date={date}
            trainName={trainName}
          />
        )}
      </div>
    </div>
  );
};

export default HeaderSelection;