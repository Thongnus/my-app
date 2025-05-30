import React from 'react';

// Định nghĩa kiểu dữ liệu cho thông tin toa (coach) của tàu
export interface SeatType {
  coach: string; // Tên toa, ví dụ: "Toa 1", "Toa 2",...
  type: string; // Loại toa, ví dụ: "Ngồi mềm điều hòa" hoặc "Giường nằm khoang 6 điều hòa"
  availability: number; // Số ghế còn trống trong toa, ví dụ: 11 ghế
  price: string; // Giá vé, ví dụ: "333K" hoặc "572K - 664K" (khoảng giá nếu có nhiều loại ghế trong toa)
}

// Định nghĩa kiểu dữ liệu cho các props của component HeaderSelectionPopup
export interface HeaderProps {
  departure: string; // Điểm khởi hành, ví dụ: "Ga Hà Nội"
  arrival: string; // Điểm đến, ví dụ: "Ga Đà Nẵng"
  date: string; // Ngày đi, ví dụ: "10/04/2025"
  trainName: string; // Tên tàu hoặc mã tàu, ví dụ: "SE19: VIP 2X - Private Twin-bed Cabin"
  seatTypes: SeatType[]; // Danh sách các toa của tàu, mỗi toa có thông tin như trên
  onCoachClick?: (coach: string) => void; // Hàm callback khi người dùng click vào một toa, truyền tên toa (ví dụ: "Toa 1")
}

const HeaderSelectionPopup: React.FC<HeaderProps> = ({
  departure, // Điểm khởi hành
  arrival, // Điểm đến
  date, // Ngày đi
  trainName, // Tên tàu
  seatTypes, // Danh sách các toa
  onCoachClick, // Hàm xử lý khi người dùng chọn toa
}) => {
  return (
    <div className="bg-white shadow-md">
      {/* Phần trên: Hiển thị thông tin lộ trình và tên tàu */}
      <div className="grid grid-cols-12 p-4 items-center">
        {/* Cột 1: Hiển thị lộ trình (điểm đi → điểm đến) và ngày đi */}
        <div className="col-span-4 flex items-center">
          <div className="text-lg font-medium">
            <span>{departure}</span> {/* Ví dụ: "Ga Hà Nội" */}
            <span className="mx-2">→</span> {/* Mũi tên phân cách */}
            <span>{arrival} | {date}</span> {/* Ví dụ: "Ga Đà Nẵng | 10/04/2025" */}
          </div>
        </div>
        {/* Cột 2: Hiển thị tên tàu (ở giữa) */}
        <div className="col-span-4 text-center text-xl font-semibold">
          {trainName} {/* Ví dụ: "SE19: VIP 2X - Private Twin-bed Cabin" */}
        </div>
        {/* Cột 3: Để trống (có thể dùng sau này để thêm nút hoặc thông tin khác) */}
      </div>

      {/* Phần dưới: Hiển thị danh sách các toa của tàu */}
      <div className="p-4">
        <div className="flex items-flex items-center justify-end p-4">
          {/* Container chứa danh sách toa, có thể cuộn ngang nếu nhiều toa */}
          <div className="flex overflow-x-auto overflow-y-hidden scrollbar-hide">
            {/* Hiển thị danh sách toa theo thứ tự ngược (từ Toa 9 đến Toa 1) */}
            {seatTypes.slice().reverse().map((seat, index) => (
              <div
                key={index} // Key để React nhận diện từng phần tử trong danh sách
                className="flex-shrink-0 w-48 h-24 bg-gray-100 border border-gray-300 rounded-l-lg flex items-center justify-between px-3 mr-1 last:mr-0 relative cursor-pointer hover:bg-gray-200"
                onClick={() => onCoachClick?.(seat.coach)} // Khi click vào toa, gọi hàm onCoachClick và truyền tên toa (ví dụ: "Toa 1")
              >
                {/* Thông tin toa */}
                <div className="overflow-hidden">
                  {/* Tên toa và loại toa */}
                  <div className="text-base font-medium whitespace-nowrap">
                    {seat.coach}: {seat.type} {/* Ví dụ: "Toa 1: Ngồi mềm điều hòa" */}
                  </div>
                  {/* Số chỗ còn trống và giá vé */}
                  <div className="text-sm text-gray-500 whitespace-nowrap">
                    <span>Còn {seat.availability} chỗ | </span> {/* Ví dụ: "Còn 11 chỗ" */}
                    <span>
                      Giá {seat.price.includes('-') ? 'từ' : 'chỉ'} {seat.price} {/* Ví dụ: "Giá chỉ 333K" hoặc "Giá từ 572K - 664K" */}
                    </span>
                  </div>
                </div>
                {/* Thanh nối giữa các toa (trừ toa cuối cùng) */}
                {index !== seatTypes.length - 1 && (
                  <div className="absolute right-0 h-12 w-1 bg-gray-300"></div>
                )}
              </div>
            ))}
          </div>

          {/* Hình ảnh đầu tàu (biểu tượng tàu hỏa) */}
          <div className="flex-shrink-0">
            <img
              src="https://res.ivivu.com/train/images/trainlist/head-train-desktop.svg"
              alt="train-head"
              className="w-12 h-[100%] object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderSelectionPopup;