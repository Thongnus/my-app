import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom'; // Dùng để quản lý query parameters trong URL
import { provinces } from '../Data.js/provinces'; // Danh sách các ga (provinces) với format { value: string, label: string }
import { BookingSearchProps, Station } from '../Entity/Entity';



const BookingSearch: React.FC<BookingSearchProps> = ({
  from, // Điểm đi từ props
  to, // Điểm đến từ props
  departureDate, // Ngày đi từ props
  returnDate, // Ngày về từ props
  roundTrip, // Có phải khứ hồi không
}) => {
  // Quản lý query parameters trong URL
  const [searchParams, setSearchParams] = useSearchParams(); // searchParams chứa các query parameters hiện tại, setSearchParams để cập nhật chúng

  // Quản lý loại chuyến: '1' (một chiều) hoặc '2' (khứ hồi)
  const [tripType, setTripType] = useState(roundTrip ? '2' : '1'); // Mặc định dựa trên prop roundTrip

  // Tìm thông tin ga từ danh sách provinces
  const fromStation = provinces.find((p) => p.value === from); // Tìm ga đi
  const toStation = provinces.find((p) => p.value === to); // Tìm ga đến
  const fromLabel = fromStation ? fromStation.label : ''; // Tên hiển thị của ga đi, ví dụ: "Hà Nội"
  const toLabel = toStation ? toStation.label : ''; // Tên hiển thị của ga đến, ví dụ: "Đà Nẵng"

  // Quản lý dữ liệu form
  const [formData, setFormData] = useState({
    departure: { value: from, label: fromLabel }, // Thông tin ga đi: { value: "hanoi", label: "Hà Nội" }
    destination: { value: to, label: toLabel }, // Thông tin ga đến: { value: "danang", label: "Đà Nẵng" }
    departureDate: departureDate.toISOString().split('T')[0], // Ngày đi: "2025-04-10"
    returnDate:
      roundTrip && returnDate && !isNaN(returnDate.getTime())
        ? returnDate.toISOString().split('T')[0] // Ngày về nếu có: "2025-04-20"
        : '', // Nếu không có thì để rỗng
  });

  // Quản lý gợi ý ga khi người dùng nhập
  const [departureSuggestions, setDepartureSuggestions] = useState<Station[]>([]); // Danh sách gợi ý ga đi
  const [destinationSuggestions, setDestinationSuggestions] = useState<Station[]>([]); // Danh sách gợi ý ga đến
  const [showDepartureSuggestions, setShowDepartureSuggestions] = useState(false); // Hiển thị gợi ý ga đi: true/false
  const [showDestinationSuggestions, setShowDestinationSuggestions] = useState(false); // Hiển thị gợi ý ga đến: true/false

  // Cập nhật formData khi props thay đổi (from, to, departureDate, returnDate, roundTrip)
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
    setTripType(roundTrip ? '2' : '1'); // Cập nhật loại chuyến
  }, [from, to, departureDate, returnDate, roundTrip]);

  // Xử lý khi người dùng nhập vào ô điểm đi hoặc điểm đến
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: 'departure' | 'destination' // Loại field: departure (điểm đi) hoặc destination (điểm đến)
  ) => {
    const { value } = e.target; // Giá trị nhập vào
    setFormData((prev) => ({
      ...prev,
      [field]: { ...prev[field], label: value, value: '' }, // Cập nhật label, reset value để yêu cầu chọn gợi ý
    }));

    const lowerCaseInput = value.toLowerCase(); // Chuyển thành chữ thường để tìm kiếm không phân biệt hoa thường
    if (field === 'departure') {
      // Lọc danh sách gợi ý ga đi
      const filtered = provinces.filter((p) =>
        p.label.toLowerCase().includes(lowerCaseInput)
      );
      setDepartureSuggestions(filtered);
      setShowDepartureSuggestions(value.length > 0 && filtered.length > 0); // Hiển thị gợi ý nếu có kết quả
    } else {
      // Lọc danh sách gợi ý ga đến, loại bỏ ga trùng với điểm đi
      const filtered = provinces.filter(
        (p) =>
          p.label.toLowerCase().includes(lowerCaseInput) &&
          p.label !== formData.departure.label
      );
      setDestinationSuggestions(filtered);
      setShowDestinationSuggestions(value.length > 0 && filtered.length > 0); // Hiển thị gợi ý nếu có kết quả
    }
  };

  // Xử lý khi người dùng chọn một gợi ý ga
  const handleSuggestionClick = (suggestion: Station, field: 'departure' | 'destination') => {
    setFormData((prev) => ({
      ...prev,
      [field]: { value: suggestion.value, label: suggestion.label }, // Cập nhật thông tin ga đã chọn
    }));
    if (field === 'departure') {
      setShowDepartureSuggestions(false); // Ẩn gợi ý ga đi
      // Cập nhật lại gợi ý ga đến, loại bỏ ga vừa chọn làm điểm đi
      const filtered = provinces.filter((p) => p.label !== suggestion.label);
      setDestinationSuggestions(
        filtered.filter((p) =>
          formData.destination.label.toLowerCase().includes(p.label.toLowerCase())
        )
      );
    } else {
      setShowDestinationSuggestions(false); // Ẩn gợi ý ga đến
    }
  };

  // Xử lý khi người dùng thay đổi ngày đi hoặc ngày về
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target; // name: "departureDate" hoặc "returnDate", value: giá trị ngày
    setFormData((prev) => ({
      ...prev,
      [name]: value, // Cập nhật ngày
    }));
  };

  // Kiểm tra dữ liệu form trước khi submit
  const validateForm = () => {
    const errors: { departure?: string; destination?: string } = {};
    const departureStation = provinces.find((p) => p.label === formData.departure.label);
    const destinationStation = provinces.find((p) => p.label === formData.destination.label);

    if (!formData.departure.label || !departureStation) {
      errors.departure = 'Điểm đi không hợp lệ'; // Báo lỗi nếu điểm đi không hợp lệ
    }
    if (!formData.destination.label || !destinationStation) {
      errors.destination = 'Điểm đến không hợp lệ'; // Báo lỗi nếu điểm đến không hợp lệ
    }
    if (departureStation && destinationStation && departureStation.value === destinationStation.value) {
      errors.destination = 'Điểm đến không được trùng với điểm đi'; // Báo lỗi nếu điểm đi và điểm đến trùng nhau
    }

    return errors;
  };

  // Xử lý khi người dùng nhấn nút "Tìm chuyến"
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault(); // Ngăn form submit mặc định
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      console.log('Lỗi:', errors); // Log lỗi nếu có
      return;
    }

    // Cập nhật query parameters trong URL
    const newParams = new URLSearchParams(searchParams);
    newParams.set('from', formData.departure.value);
    newParams.set('to', formData.destination.value);
    newParams.set('departureDate', formData.departureDate);
    newParams.set('returnDate', formData.returnDate || '');
    newParams.set('roundTrip', tripType === '2' ? 'true' : 'false');
    newParams.set('passengers', '1'); // Số hành khách cố định là 1 (có thể thêm input để người dùng nhập)
    setSearchParams(newParams); // Cập nhật URL

    console.log("Bạn vừa bấm tìm chuyến!", {
      ...formData,
      departureValue: formData.departure.value,
      destinationValue: formData.destination.value,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-xl rounded-2xl p-4 md:p-6 max-w-full mx-auto mt-6 space-y-4 transition-all duration-300"
    >
      <div className="flex flex-wrap items-end gap-4 justify-center">
        {/* Chọn loại chuyến: Một chiều hoặc Khứ hồi */}
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

        {/* Input điểm đi */}
        <div className="w-48 relative">
          <label className="block text-sm text-gray-600 font-semibold mb-1">Điểm đi</label>
          <div className="relative">
            <i className="fa fa-map-marker absolute top-3 left-3 text-gray-400" />
            <input
              type="text"
              name="departure"
              value={formData.departure.label}
              onChange={(e) => handleInputChange(e, 'departure')}
              onBlur={() => setShowDepartureSuggestions(false)} // Ẩn gợi ý khi mất focus
              placeholder="Nhập ga đi..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-300 focus:outline-none"
              autoComplete="off"
            />
            {/* Danh sách gợi ý ga đi */}
            {showDepartureSuggestions && (
              <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-xl mt-1 max-h-40 overflow-y-auto shadow-lg">
                {departureSuggestions.map((suggestion) => (
                  <li
                    key={suggestion.value}
                    className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                    onMouseDown={() => handleSuggestionClick(suggestion, 'departure')} // Dùng onMouseDown để tránh onBlur chạy trước
                  >
                    {suggestion.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Input điểm đến */}
        <div className="w-48 relative">
          <label className="block text-sm text-gray-600 font-semibold mb-1">Điểm đến</label>
          <div className="relative">
            <i className="fa fa-map-marker absolute top-3 left-3 text-gray-400" />
            <input
              type="text"
              name="destination"
              value={formData.destination.label}
              onChange={(e) => handleInputChange(e, 'destination')}
              onBlur={() => setShowDestinationSuggestions(false)}
              placeholder="Nhập ga đến..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-300 focus:outline-none"
              autoComplete="off"
            />
            {/* Danh sách gợi ý ga đến */}
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

        {/* Input ngày đi */}
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

        {/* Input ngày về (hiển thị nếu là khứ hồi) */}
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

        {/* Nút tìm kiếm */}
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