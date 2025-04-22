import React from 'react';
import { FaCheckCircle } from 'react-icons/fa'; // Icon dấu check để hiển thị khi chuyến đã được chọn
import { provinces } from '../Data.js/provinces'; // Danh sách ga (provinces), định dạng: { value: string, label: string }

// Ép kiểu icon FaCheckCircle thành React component để sử dụng trong JSX
const CFaCheckCircle = FaCheckCircle as unknown as React.FC<React.SVGProps<SVGSVGElement>>;

// Định nghĩa kiểu dữ liệu cho props của component TripTabs
interface TripTabsProps {
  from: string; // Điểm đi của chuyến đi (outbound), ví dụ: "hanoi"
  to: string; // Điểm đến của chuyến đi (outbound), ví dụ: "danang"
  returnFrom: string; // Điểm đi của chuyến về (return), ví dụ: "danang"
  returnTo: string; // Điểm đến của chuyến về (return), ví dụ: "hanoi"
  departDate: string; // Ngày khởi hành của chuyến đi, ví dụ: "2025-04-10"
  returnDate: string | null; // Ngày khởi hành của chuyến về, ví dụ: "2025-04-20" (null nếu không phải khứ hồi)
  roundTrip: boolean; // Có phải vé khứ hồi không
  selectedOutboundTrip?: { operator: string; departureTime: string } | null; // Chuyến đi đã chọn (nếu có)
  selectedReturnTrip?: { operator: string; departureTime: string } | null; // Chuyến về đã chọn (nếu có)
  setTripDirection: React.Dispatch<React.SetStateAction<'outbound' | 'return'>>; // Hàm cập nhật hướng chuyến (outbound/return)
  tripDirection: 'outbound' | 'return'; // Hướng chuyến hiện tại
}

// Component TripTabs: Hiển thị tab để chuyển đổi giữa "Chuyến đi" và "Chuyến về"
const TripTabs: React.FC<TripTabsProps> = ({
  from,
  to,
  returnFrom,
  returnTo,
  departDate,
  returnDate,
  roundTrip,
  selectedOutboundTrip,
  selectedReturnTrip,
  setTripDirection,
  tripDirection,
}) => {
  // Tìm thông tin ga từ danh sách provinces
  const fromStation = provinces.find((p) => p.value === from); // Tìm ga đi (outbound)
  const toStation = provinces.find((p) => p.value === to); // Tìm ga đến (outbound)
  const returnFromStation = provinces.find((p) => p.value === returnFrom); // Tìm ga đi (return)
  const returnToStation = provinces.find((p) => p.value === returnTo); // Tìm ga đến (return)

  // Xác định tên hiển thị của ga, nếu không tìm thấy thì dùng giá trị mặc định
  const fromLabel = fromStation ? fromStation.label : from || 'N/A';
  const toLabel = toStation ? toStation.label : to || 'N/A';
  const returnFromLabel = returnFromStation ? returnFromStation.label : returnFrom || 'N/A';
  const returnToLabel = returnToStation ? returnToStation.label : returnTo || 'N/A';

  // Kiểm tra xem có hiển thị tab "Chuyến về" không (chỉ hiển thị nếu là vé khứ hồi và có ngày về)
  const showReturnTab = roundTrip && returnDate;

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Container chính chứa các tab */}
      <div className="flex rounded-xl overflow-hidden shadow-md bg-[#303033] text-white">
        {/* Tab "Chuyến đi" */}
        <div
          className={`px-6 py-5 bg-[#303033] text-white font-bold cursor-pointer ${
            showReturnTab ? 'flex-1' : 'w-full' // Nếu có tab "Chuyến về", chia đều không gian
          } ${tripDirection === 'outbound' ? 'bg-gray-700' : ''}`} // Highlight tab đang active
          onClick={() => setTripDirection('outbound')} // Chuyển sang tab "Chuyến đi"
        >
          <div className="text-sm font-semibold mb-2 flex items-center gap-2">
            <span>Chuyến đi</span>
            {selectedOutboundTrip && <CFaCheckCircle className="text-green-400" />} {/* Icon check nếu đã chọn chuyến */}
          </div>
          <div className="text-lg flex items-center gap-3">
            <span className="truncate">{fromLabel}</span> {/* Điểm đi */}
            <i className="fa fa-long-arrow-right text-gray-300" /> {/* Mũi tên */}
            <span className="truncate">{toLabel}</span> {/* Điểm đến */}
          </div>
          <div className="mt-3 text-sm">
            <span>Ngày đi: {departDate}</span> {/* Ngày khởi hành */}
          </div>
          {/* Hiển thị thông tin chuyến đã chọn (nếu có) */}
          {selectedOutboundTrip && (
            <div className="mt-2 text-sm">
              <span>{selectedOutboundTrip.operator} • {selectedOutboundTrip.departureTime}</span>
            </div>
          )}
        </div>

        {/* Tab "Chuyến về" (chỉ hiển thị nếu là vé khứ hồi và có ngày về) */}
        {showReturnTab && (
          <>
            {/* Hình tam giác phân cách giữa hai tab */}
            <div className="w-0 h-0 border-t-[50px] border-t-transparent border-b-[50px] border-b-transparent border-l-[15px] border-l-gray-300 bg-[#303033]"></div>

            <div
              className={`flex-1 px-6 py-5 bg-[#303033] text-white font-bold cursor-pointer ${
                tripDirection === 'return' ? 'bg-gray-700' : '' // Highlight tab đang active
              }`}
              onClick={() => setTripDirection('return')} // Chuyển sang tab "Chuyến về"
            >
              <div className="text-sm font-semibold mb-2 flex items-center gap-2">
                <span>Chuyến về</span>
                {selectedReturnTrip && <CFaCheckCircle className="text-green-400" />} {/* Icon check nếu đã chọn chuyến */}
              </div>
              <div className="text-lg flex items-center gap-3">
                <span className="truncate">{returnFromLabel}</span> {/* Điểm đi */}
                <i className="fa fa-long-arrow-right text-gray-300" /> {/* Mũi tên */}
                <span className="truncate">{returnToLabel}</span> {/* Điểm đến */}
              </div>
              <div className="mt-3 text-sm">
                <span>Ngày về: {returnDate}</span> {/* Ngày khởi hành */}
              </div>
              {/* Hiển thị thông tin chuyến đã chọn (nếu có) */}
              {selectedReturnTrip && (
                <div className="mt-2 text-sm">
                  <span>{selectedReturnTrip.operator} • {selectedReturnTrip.departureTime}</span>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TripTabs;