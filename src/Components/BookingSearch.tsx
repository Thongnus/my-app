import React, { useState } from 'react';

export default function BookingSearch() {
  const [tripType, setTripType] = useState('2');
  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault(); // 👉 CHẶN việc reload trang
    console.log("Bạn vừa bấm tìm chuyến!");
    // Thêm logic xử lý tìm chuyến ở đây
  };

  return (
<form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-2xl p-4 md:p-6 max-w-full mx-auto mt-6 space-y-4 transition-all duration-300">
  {/* Form Row */}
  <div className="flex flex-wrap items-end gap-4 justify-center">

    {/* Trip type */}
    <div className="flex flex-col items-start gap-2">
      <label className="flex items-center space-x-2 text-gray-700 font-medium">
        <input
          type="radio"
          name="TripType"
          value="1"
          checked={tripType === '1'}
          onChange={(e) => setTripType(e.target.value)}
          className="accent-blue-600"
        />
        <span>Một chiều</span>
      </label>
      <label className="flex items-center space-x-2 text-gray-700 font-medium">
        <input
          type="radio"
          name="TripType"
          value="2"
          checked={tripType === '2'}
          onChange={(e) => setTripType(e.target.value)}
          className="accent-blue-600"
        />
        <span>Khứ hồi</span>
      </label>
    </div>

    {/* Origin */}
    <div className="w-48">
      <label className="block text-sm text-gray-600 font-semibold mb-1">Điểm đi</label>
      <div className="relative">
        <i className="fa fa-map-marker absolute top-3 left-3 text-gray-400" />
        <input
          type="text"
          defaultValue="Hà Nội"
          placeholder="Nhập ga đi..."
          className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-300 focus:outline-none"
        />
      </div>
    </div>

    {/* Destination */}
    <div className="w-48">
      <label className="block text-sm text-gray-600 font-semibold mb-1">Điểm đến</label>
      <div className="relative">
        <i className="fa fa-map-marker absolute top-3 left-3 text-gray-400" />
        <input
          type="text"
          defaultValue="Đà Nẵng"
          placeholder="Nhập ga đến..."
          className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-300 focus:outline-none"
        />
      </div>
    </div>

    {/* Departure date */}
    <div className="w-40">
      <label className="block text-sm text-gray-600 font-semibold mb-1">Ngày đi</label>
      <div className="relative">
        <i className="fa fa-calendar absolute top-3 left-3 text-gray-400" />
        <input
          type="date"
          defaultValue="2025-04-08"
          className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-300 focus:outline-none"
        />
      </div>
    </div>

    {/* Return date */}
    {tripType === '2' && (
      <div className="w-40">
        <label className="block text-sm text-gray-600 font-semibold mb-1">Ngày về</label>
        <div className="relative">
          <i className="fa fa-calendar absolute top-3 left-3 text-gray-400" />
          <input
            type="date"
            defaultValue="2025-04-09"
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-300 focus:outline-none"
          />
        </div>
      </div>
    )}

    {/* Submit */}
    <div>
      <button
        type="submit"
        className="px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition duration-200 shadow-md mt-6"
      >
        🚆 Tìm chuyến
      </button>
    </div>
  </div>
</form>

  );
}
