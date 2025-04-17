import React, { useState, useEffect } from 'react';
import { provinces } from '../Data.js/provinces'; // Import provinces

interface BookingSearchProps {
  from: string; // Chuỗi (value)
  to: string;   // Chuỗi (value)
  departureDate: Date;
  returnDate: Date;
  passengers: string;
  roundTrip: boolean;
}

interface Station {
  value: string;
  label: string;
}

const BookingSearch: React.FC<BookingSearchProps> = ({
  from,
  to,
  departureDate,
  returnDate,
  roundTrip,
}) => {
  // Khởi tạo tripType dựa trên roundTrip
  const [tripType, setTripType] = useState(roundTrip ? '2' : '1');

  // Ánh xạ value thành label từ provinces
  const fromStation = provinces.find((p) => p.value === from);
  const toStation = provinces.find((p) => p.value === to);
  const fromLabel = fromStation ? fromStation.label : '';
  const toLabel = toStation ? toStation.label : '';

  // Quản lý state cho các trường input
  const [formData, setFormData] = useState({
    departure: { value: from, label: fromLabel }, // Lưu cả value và label
    destination: { value: to, label: toLabel },   // Lưu cả value và label
    departureDate: departureDate.toISOString().split('T')[0], // Format YYYY-MM-DD
    returnDate:
      roundTrip && returnDate && !isNaN(returnDate.getTime())
        ? returnDate.toISOString().split('T')[0]
        : '',
  });

  // State cho gợi ý
  const [departureSuggestions, setDepartureSuggestions] = useState<Station[]>([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState<Station[]>([]);
  const [showDepartureSuggestions, setShowDepartureSuggestions] = useState(false);
  const [showDestinationSuggestions, setShowDestinationSuggestions] = useState(false);

  // Đồng bộ formData khi props thay đổi
  useEffect(() => {
    const updatedFromStation = provinces.find((p) => p.value === from);
    const updatedToStation = provinces.find((p) => p.value === to);
    setFormData({
      departure: {
        value: from,
        label: updatedFromStation ? updatedFromStation.label : '',
      },
      destination: {
        value: to,
        label: updatedToStation ? updatedToStation.label : '',
      },
      departureDate: departureDate.toISOString().split('T')[0],
      returnDate:
        roundTrip && returnDate && !isNaN(returnDate.getTime())
          ? returnDate.toISOString().split('T')[0]
          : '',
    });
  }, [from, to, departureDate, returnDate, roundTrip]);

  // Xử lý thay đổi input và hiển thị gợi ý
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: 'departure' | 'destination'
  ) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [field]: { ...prev[field], label: value, value: '' }, // Reset value khi người dùng nhập
    }));

    // Lọc gợi ý dựa trên giá trị nhập
    const lowerCaseInput = value.toLowerCase();
    if (field === 'departure') {
      const filtered = provinces.filter((p) =>
        p.label.toLowerCase().includes(lowerCaseInput)
      );
      setDepartureSuggestions(filtered);
      setShowDepartureSuggestions(value.length > 0 && filtered.length > 0);
    } else {
      // Loại bỏ giá trị của departure khỏi gợi ý destination
      const filtered = provinces.filter(
        (p) =>
          p.label.toLowerCase().includes(lowerCaseInput) &&
          p.label !== formData.departure.label
      );
      setDestinationSuggestions(filtered);
      setShowDestinationSuggestions(value.length > 0 && filtered.length > 0);
    }
  };

  // Xử lý khi người dùng chọn gợi ý
  const handleSuggestionClick = (suggestion: Station, field: 'departure' | 'destination') => {
    setFormData((prev) => ({
      ...prev,
      [field]: { value: suggestion.value, label: suggestion.label },
    }));
    if (field === 'departure') {
      setShowDepartureSuggestions(false);
      // Cập nhật lại gợi ý cho destination để loại bỏ giá trị vừa chọn
      const filtered = provinces.filter((p) => p.label !== suggestion.label);
      setDestinationSuggestions(
        filtered.filter((p) =>
          formData.destination.label.toLowerCase().includes(p.label.toLowerCase())
        )
      );
    } else {
      setShowDestinationSuggestions(false);
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Kiểm tra dữ liệu trước khi submit
  const validateForm = () => {
    const errors: { departure?: string; destination?: string } = {};
    const departureStation = provinces.find((p) => p.label === formData.departure.label);
    const destinationStation = provinces.find((p) => p.label === formData.destination.label);

    if (!formData.departure.label || !departureStation) {
      errors.departure = 'Điểm đi không hợp lệ';
    }
    if (!formData.destination.label || !destinationStation) {
      errors.destination = 'Điểm đến không hợp lệ';
    }
    if (departureStation && destinationStation && departureStation.value === destinationStation.value) {
      errors.destination = 'Điểm đến không được trùng với điểm đi';
    }

    return errors;
  };

  // Xử lý submit form
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      console.log('Lỗi:', errors);
      return;
    }
    console.log("Bạn vừa bấm tìm chuyến!", {
      ...formData,
      departureValue: formData.departure.value, // Giá trị không dấu để truy vấn DB
      destinationValue: formData.destination.value, // Giá trị không dấu để truy vấn DB
    });
    // Thêm logic xử lý tìm chuyến ở đây
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-xl rounded-2xl p-4 md:p-6 max-w-full mx-auto mt-6 space-y-4 transition-all duration-300"
    >
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
        <div className="w-48 relative">
          <label className="block text-sm text-gray-600 font-semibold mb-1">Điểm đi</label>
          <div className="relative">
            <i className="fa fa-map-marker absolute top-3 left-3 text-gray-400" />
            <input
              type="text"
              name="departure"
              value={formData.departure.label} // Hiển thị label
              onChange={(e) => handleInputChange(e, 'departure')}
              onBlur={() => setShowDepartureSuggestions(false)} // Ẩn gợi ý khi mất focus
              placeholder="Nhập ga đi..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-300 focus:outline-none"
              autoComplete="off"
            />
            {showDepartureSuggestions && (
              <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-xl mt-1 max-h-40 overflow-y-auto shadow-lg">
                {departureSuggestions.map((suggestion) => (
                  <li
                    key={suggestion.value}
                    className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                    onMouseDown={() => handleSuggestionClick(suggestion, 'departure')}
                  >
                    {suggestion.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Destination */}
        <div className="w-48 relative">
          <label className="block text-sm text-gray-600 font-semibold mb-1">Điểm đến</label>
          <div className="relative">
            <i className="fa fa-map-marker absolute top-3 left-3 text-gray-400" />
            <input
              type="text"
              name="destination"
              value={formData.destination.label} // Hiển thị label
              onChange={(e) => handleInputChange(e, 'destination')}
              onBlur={() => setShowDestinationSuggestions(false)} // Ẩn gợi ý khi mất focus
              placeholder="Nhập ga đến..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-300 focus:outline-none"
              autoComplete="off"
            />
            {showDestinationSuggestions && (
              <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-xl mt-1 max-h-40 overflow-y-auto shadow-lg">
                {destinationSuggestions.map((suggestion) => (
                  <li
                    key={suggestion.value}
                    className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                    onMouseDown={() => handleSuggestionClick(suggestion, 'destination')}
                  >
                    {suggestion.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Departure date */}
        <div className="w-40">
          <label className="block text-sm text-gray-600 font-semibold mb-1">Ngày đi</label>
          <div className="relative">
            <i className="fa fa-calendar absolute top-3 left-3 text-gray-400" />
            <input
              type="date"
              name="departureDate"
              value={formData.departureDate}
              onChange={handleDateChange}
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
                name="returnDate"
                value={formData.returnDate}
                onChange={handleDateChange}
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
};

export default BookingSearch;