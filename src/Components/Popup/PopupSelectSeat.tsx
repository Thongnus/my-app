// HeaderSelection.tsx
import React, { useState, useEffect } from 'react';
import { SeatType } from './HeaderSeat';
import HeaderSelectionPopup from './HeaderSeat';
import SeatSelection, { Seat } from './SeatSelection';

const HeaderSelection: React.FC = () => {
  const seatTypes: SeatType[] = [
    { coach: 'Toa 1', type: 'Ngồi mềm điều hòa', availability: 11, price: '586K - 606K' },
    { coach: 'Toa 3', type: 'Giường nằm khoang 6 điều hòa', availability: 3, price: '800K - 1021K' },
    { coach: 'Toa 4', type: 'Giường nằm khoang 6 điều hòa', availability: 6, price: '800K - 1021K' },
    { coach: 'Toa 4', type: 'Giường nằm khoang 6 điều hòa', availability: 6, price: '800K - 1021K' },
    { coach: 'Toa 4', type: 'Giường nằm khoang 6 điều hòa', availability: 6, price: '800K - 1021K' },
    { coach: 'Toa 4', type: 'Giường nằm khoang 6 điều hòa', availability: 6, price: '800K - 1021K' },
    { coach: 'Toa 4', type: 'Giường nằm khoang 6 điều hòa', availability: 6, price: '800K - 1021K' },
    { coach: 'Toa 4', type: 'Giường nằm khoang 6 điều hòa', availability: 6, price: '800K - 1021K' },
    { coach: 'Toa 4', type: 'Giường nằm khoang 6 điều hòa', availability: 6, price: '800K - 1021K' },
  
  ];

  // Dữ liệu ghế giả lập cho từng toa
  const seatData: { [key: string]: Seat[] } = {
    'Toa 1': Array.from({ length: 62 }, (_, index) => ({
      seatNumber: `${index + 1}`,
      isAvailable: Math.random() > 0.3, // Ngẫu nhiên trạng thái ghế
      type: 'Ngồi mềm',
    })),
    'Toa 3': Array.from({ length: 62 }, (_, index) => ({
      seatNumber: `G${index + 1}`,
      isAvailable: Math.random() > 0.3,
      type: 'Giường nằm',
    })),
    'Toa 4': Array.from({ length: 62 }, (_, index) => ({
      seatNumber: `G${index + 1}`,
      isAvailable: Math.random() > 0.3,
      type: 'Giường nằm',
    })),
  };

  // Trạng thái để theo dõi toa được chọn, mặc định là "Toa 1"
  const [selectedCoach, setSelectedCoach] = useState<string | null>('Toa 1');

  // Hàm xử lý khi nhấn vào toa
  const handleCoachClick = (coach: string) => {
    setSelectedCoach(coach);
  };

  // Hàm xử lý khi nhấn vào ghế
  const handleSeatClick = (seatNumber: string) => {
    console.log(`Đã chọn ghế: ${seatNumber} trong ${selectedCoach}`);
    // Thêm logic chọn ghế ở đây
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Popup Container */}
      <div className="bg-white shadow-lg rounded-lg">
        {/* HeaderSelectionPopup */}
        <HeaderSelectionPopup
          departure="Ga Hà Nội"
          arrival="Ga Đà Nẵng"
          date="16/04/2025"
          trainName="Tàu Tốc Hành SE7"
          seatTypes={seatTypes}
          onCoachClick={handleCoachClick}
        />

        {/* SeatSelection (Chỉ hiển thị khi có toa được chọn) */}
        {selectedCoach && seatData[selectedCoach] && (
          <SeatSelection
            coach={selectedCoach}
            seats={seatData[selectedCoach]}
            onSeatClick={handleSeatClick}
          />
        )}
      </div>
    </div>
  );
};

export default HeaderSelection;