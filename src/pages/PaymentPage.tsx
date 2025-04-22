import React from 'react';
import { useLocation } from 'react-router-dom';

const PaymentPage: React.FC = () => {
  const location = useLocation();
  const { departure, arrival, date, trainName, coach, selectedSeats, tripDirection } = location.state || {};

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Thanh Toán</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Thông Tin Đặt Vé</h2>
        <div className="space-y-4">
          <div>
            <span className="font-medium">Hành Trình: </span>
            {departure} → {arrival}
          </div>
          <div>
            <span className="font-medium">Ngày Đi: </span>
            {date}
          </div>
          <div>
            <span className="font-medium">Tàu: </span>
            {trainName}
          </div>
          <div>
            <span className="font-medium">Toa: </span>
            {coach}
          </div>
          <div>
            <span className="font-medium">Ghế Đã Chọn: </span>
            {selectedSeats?.join(', ') || 'Không có ghế nào được chọn'}
          </div>
          <div>
            <span className="font-medium">Hướng Chuyến: </span>
            {tripDirection === 'outbound' ? 'Chuyến Đi' : 'Chuyến Về'}
          </div>
        </div>
        <div className="mt-6">
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            onClick={() => alert('Thanh toán thành công!')}
          >
            Xác Nhận Thanh Toán
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;