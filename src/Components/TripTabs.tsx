import React, { useState } from 'react';

const TripTabs = ({
  from = 'Hà Nội, Việt Nam',
  to = 'Lào Cai, Việt Nam',
  returnFrom = 'Lào Cai, Việt Nam',
  returnTo = 'Hà Nội, Việt Nam',
  departDate = '08 April 2025, Tue',
  returnDate = '09 April 2025, Wed',
  departCompany = 'Đường sắt Việt Nam',
  departTime = '08:00 AM',
  returnCompany = 'Đường sắt Việt Nam',
  returnTime = '20:00 PM'
}) => {
  const [activeTab, setActiveTab] = useState('depart');

  return (
    <div  className="w-[76%]  mx-auto px-4 py-6">
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
            <button className="px-2"><i className="fa fa-angle-left" /></button>
            <span>{departDate}</span>
            <button className="px-2"><i className="fa fa-angle-right" /></button>
          </div>
          <div className="text-sm mt-2">
            <span>{departCompany}</span> <span>{departTime}</span>
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
            <button className="px-2"><i className="fa fa-angle-left" /></button>
            <span>{returnDate}</span>
            <button className="px-2"><i className="fa fa-angle-right" /></button>
          </div>
          <div className="text-sm mt-2">
            <span>{returnCompany}</span> <span>{returnTime}</span>
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
