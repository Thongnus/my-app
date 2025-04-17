import React, { useState } from 'react';
import { parse, format, addDays, subDays } from 'date-fns'; // Thêm date-fns để xử lý ngày tháng

const TripTabs = ({
  from = 'Hà Nội, Việt Nam',
  to = 'Lào Cai, Việt Nam',
  returnFrom = 'Lào Cai, Việt Nam',
  returnTo = 'Hà Nội, Việt Nam',
  departDate = '08 April 2025, Tue', // Giá trị mặc định
  returnDate = '09 April 2025, Wed', // Giá trị mặc định
}) => {
  const [activeTab, setActiveTab] = useState('depart');
  const [departDateState, setDepartDateState] = useState(departDate); // Quản lý trạng thái ngày đi
  const [returnDateState, setReturnDateState] = useState(returnDate); // Quản lý trạng thái ngày về

  // Hàm xử lý lùi ngày
  const handlePreviousDay = (dateString: string, setDate: React.Dispatch<React.SetStateAction<string>>) => {
    const date = parse(dateString, 'dd MMMM yyyy, EEE', new Date()); // Parse chuỗi ngày
    const newDate = subDays(date, 1); // Lùi 1 ngày
    const formattedDate = format(newDate, 'dd MMMM yyyy, EEE'); // Format lại
    setDate(formattedDate);
  };

  // Hàm xử lý tiến ngày
  const handleNextDay = (dateString: string, setDate: React.Dispatch<React.SetStateAction<string>>) => {
    const date = parse(dateString, 'dd MMMM yyyy, EEE', new Date()); // Parse chuỗi ngày
    const newDate = addDays(date, 1); // Tiến 1 ngày
    const formattedDate = format(newDate, 'dd MMMM yyyy, EEE'); // Format lại
    setDate(formattedDate);
  };

  return (
    <div className="container  mx-auto px-4 py-6">
      <div className="flex rounded-xl overflow-hidden shadow-md">
        {/* Tab: Chiều đi */}
        <div
          onClick={() => setActiveTab('depart')}
          className={`flex-1 px-4 py-4 cursor-pointer transition-all ${
            activeTab === 'depart' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-700'
          }`}
        >
          <div className="text-sm font-semibold mb-1">Điểm khởi hành</div>
          <div className="text-base font-bold flex items-center gap-2">
            <span className="truncate">{from}</span>
            <i className="fa fa-long-arrow-right" />
            <span className="truncate">{to}</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-sm">
            <button onClick={() => handlePreviousDay(departDateState, setDepartDateState)} className="px-2">
              <i className="fa fa-angle-left" />
            </button>
            <span>{departDateState}</span>
            <button onClick={() => handleNextDay(departDateState, setDepartDateState)} className="px-2">
              <i className="fa fa-angle-right" />
            </button>
          </div>
        </div>

        {/* Mũi tên chia */}
        <div className="w-0 h-0 border-t-[50px] border-t-transparent border-b-[50px] border-b-transparent border-l-[15px] border-l-white"></div>

        {/* Tab: Chiều về */}
        <div
          onClick={() => setActiveTab('return')}
          className={`flex-1 px-4 py-4 cursor-pointer transition-all ${
            activeTab === 'return' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-700'
          }`}
        >
          <div className="text-sm font-semibold mb-1">Điểm đến</div>
          <div className="text-base font-bold flex items-center gap-2">
            <span className="truncate">{returnFrom}</span>
            <i className="fa fa-long-arrow-right" />
            <span className="truncate">{returnTo}</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-sm">
            <button onClick={() => handlePreviousDay(returnDateState, setReturnDateState)} className="px-2">
              <i className="fa fa-angle-left" />
            </button>
            <span>{returnDateState}</span>
            <button onClick={() => handleNextDay(returnDateState, setReturnDateState)} className="px-2">
              <i className="fa fa-angle-right" />
            </button>
          </div>
          <div className="text-sm mt-2">
            <a
              href="#"
              className="block text-red-400 text-xs underline mt-1 hover:text-red-600"
            >
              Không đặt chuyến về
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripTabs;