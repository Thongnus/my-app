import React, { useState } from 'react';
import  { SeatType } from './HeaderSeat';
import HeaderSelectionPopup from './HeaderSeat';
import SeatSelection, { Seat } from './SeatSelection';

const HeaderSelection: React.FC = () => {
  const seatTypes: SeatType[] = [
    { coach: 'Toa 1', type: 'Ngồi mềm điều hòa', availability: 11, price: '333K' },
    { coach: 'Toa 2', type: 'Ngồi mềm điều hòa', availability: 14, price: '333K' },
    { coach: 'Toa 4', type: 'Giường nằm khoang 4 điều hòa (VIP)', availability: 3, price: '572K - 664K' },
    { coach: 'Toa 5', type: 'Giường nằm khoang 4 điều hòa (VIP)', availability: 12, price: '572K - 664K' },
    { coach: 'Toa 6', type: 'Giường nằm khoang 4 điều hòa (VIP)', availability: 13, price: '572K - 664K' },
    { coach: 'Toa 7', type: 'Giường nằm khoang 4 điều hòa (VIP)', availability: 10, price: '572K - 664K' },
    { coach: 'Toa 8', type: 'Giường nằm khoang 4 điều hòa (VIP)', availability: 6, price: '572K - 664K' },
    { coach: 'Toa 9', type: 'Giường nằm khoang 4 điều hòa (VIP)', availability: 13, price: '572K - 664K' },
    { coach: 'Toa 11', type: 'Nằm mềm điều hòa (VIP)', availability: 12, price: '572K - 1266K' },
  ];

 // Dữ liệu ghế giả lập cho từng toa
 const seatData: { [key: string]: Seat[] } = {
  'Toa 1': [
    { seatNumber: 'A1', isAvailable: true, type: 'Ngồi mềm' },
    { seatNumber: 'A2', isAvailable: false, type: 'Ngồi mềm' },
    { seatNumber: 'B1', isAvailable: true, type: 'Ngồi mềm' },
    { seatNumber: 'B2', isAvailable: true, type: 'Ngồi mềm' },
  ],
  'Toa 2': [
    { seatNumber: 'A1', isAvailable: true, type: 'Ngồi mềm' },
    { seatNumber: 'A2', isAvailable: true, type: 'Ngồi mềm' },
    { seatNumber: 'B1', isAvailable: false, type: 'Ngồi mềm' },
    { seatNumber: 'B2', isAvailable: true, type: 'Ngồi mềm' },
  ],
  'Toa 4': [
    { seatNumber: 'G1', isAvailable: true, type: 'Giường nằm' },
    { seatNumber: 'G2', isAvailable: false, type: 'Giường nằm' },
    { seatNumber: 'G3', isAvailable: true, type: 'Giường nằm' },
    { seatNumber: 'G4', isAvailable: true, type: 'Giường nằm' },
  ],
  'Toa 5': [
    { seatNumber: 'G1', isAvailable: true, type: 'Giường nằm' },
    { seatNumber: 'G2', isAvailable: true, type: 'Giường nằm' },
    { seatNumber: 'G3', isAvailable: false, type: 'Giường nằm' },
    { seatNumber: 'G4', isAvailable: true, type: 'Giường nằm' },
  ],
}; 
// Trạng thái để theo dõi toa được chọn
const [selectedCoach, setSelectedCoach] = useState<string | null>(null);
  const handleCoachClick = (coach: string) => {
    console.log(`Clicked on ${coach}`); // Replace with your event logic
  };
// Hàm xử lý khi nhấn vào ghế
const handleSeatClick = (seatNumber: string) => {
  console.log(`Đã chọn ghế: ${seatNumber} trong ${selectedCoach}`);
  // Thêm logic chọn ghế ở đây
};
  return (
    <>
  
    <HeaderSelectionPopup
      departure="Ga Sài Gòn"
      arrival="Ga Nha Trang"
      date="15/04/2025"
      trainName="Tàu chất lượng cao SE22"
      seatTypes={seatTypes}
      onCoachClick={handleCoachClick}
    />
    {selectedCoach && seatData[selectedCoach] && (
        <SeatSelection
          coach={selectedCoach}
          seats={seatData[selectedCoach]}
          onSeatClick={handleSeatClick}
        />
      )}

      </>
  );
};

export default HeaderSelection;