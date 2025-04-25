import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom'; // Dùng để quản lý query parameters trong URL
import { provinces } from '../Data.js/provinces'; // Danh sách các ga (provinces) với format { value: string, label: string }
import { BookingSearchProps, Station } from '../Entity/Entity';
import DatePicker from    'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';

const BookingSearch: React.FC<BookingSearchProps> = ({
  from, // Điểm đi từ props
  to, // Điểm đến từ props
  departureDate, // Ngày đi từ props
  returnDate, // Ngày về từ props
  roundTrip, // Có phải khứ hồi không
}) => {
  // Quản lý query parameters trong URL
  const [searchParams, setSearchParams] = useSearchParams(); // searchParams chứa các query parameters hiện tại, setSearchParams để cập nhật chúng
  const navigate = useNavigate();

  // Quản lý loại chuyến: '1' (một chiều) hoặc '2' (khứ hồi)
  const [tripType, setTripType] = useState(roundTrip ? '2' : '1'); // Mặc định dựa trên prop roundTrip

  // Tìm thông tin ga từ danh sách provinces
  const fromStation = provinces.find((p) => p.value === from); // Tìm ga đi
  const toStation = provinces.find((p) => p.value === to); // Tìm ga đến
  const fromLabel = fromStation ? fromStation.label : ''; // Tên hiển thị của ga đi, ví dụ: "Hà Nội"
  const toLabel = toStation ? toStation.label : ''; // Tên hiển thị của ga đến, ví dụ: "Đà Nẵng"

  // Quản lý dữ liệu form
  const [formData, setFormData] = useState({
    departure: { value: from, label: fromLabel },
    destination: { value: to, label: toLabel },
    departureDate: departureDate && !isNaN(departureDate.getTime()) 
      ? departureDate.toISOString().split('T')[0] 
      : new Date().toISOString().split('T')[0],
    returnDate: roundTrip && returnDate && !isNaN(returnDate.getTime())
      ? returnDate.toISOString().split('T')[0]
      : '',
  });

  // Quản lý gợi ý ga khi người dùng nhập
  const [departureSuggestions, setDepartureSuggestions] = useState<Station[]>([]); // Danh sách gợi ý ga đi
  const [destinationSuggestions, setDestinationSuggestions] = useState<Station[]>([]); // Danh sách gợi ý ga đến
  const [showDepartureSuggestions, setShowDepartureSuggestions] = useState(false); // Hiển thị gợi ý ga đi: true/false
  const [showDestinationSuggestions, setShowDestinationSuggestions] = useState(false); // Hiển thị gợi ý ga đến: true/false

  // Cập nhật formData khi props thay đổi
  useEffect(() => {
    const updatedFromStation = provinces.find((p) => p.value === from);
    const updatedToStation = provinces.find((p) => p.value === to);
    
    // Kiểm tra tính hợp lệ của ngày
    const isValidDepartureDate = departureDate && !isNaN(departureDate.getTime());
    const isValidReturnDate = returnDate && !isNaN(returnDate.getTime());
    
    setFormData({
      departure: {
        value: from,
        label: updatedFromStation ? updatedFromStation.label : '',
      },
      destination: {
        value: to,
        label: updatedToStation ? updatedToStation.label : '',
      },
      departureDate: isValidDepartureDate 
        ? departureDate.toISOString().split('T')[0]
        : new Date().toISOString().split('T')[0],
      returnDate: roundTrip && isValidReturnDate
        ? returnDate.toISOString().split('T')[0]
        : '',
    });
    setTripType(roundTrip ? '2' : '1');
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
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      console.log('Lỗi:', errors);
      return;
    }

    // Kiểm tra và xử lý ngày hợp lệ
    const departureDate = new Date(formData.departureDate);
    const returnDate = roundTrip ? new Date(formData.returnDate) : null;

    // Kiểm tra ngày đi phải hợp lệ
    if (isNaN(departureDate.getTime())) {
      console.log('Lỗi:', { departureDate: 'Ngày đi không hợp lệ' });
      return;
    }

    // Kiểm tra ngày về nếu có
    if (returnDate && isNaN(returnDate.getTime())) {
      console.log('Lỗi:', { returnDate: 'Ngày về không hợp lệ' });
      return;
    }

    // Kiểm tra ngày về phải sau ngày đi
    if (returnDate && returnDate < departureDate) {
      console.log('Lỗi:', { returnDate: 'Ngày về phải sau ngày đi' });
      return;
    }

    // Tạo query parameters
    const queryParams = new URLSearchParams({
      from: formData.departure.value,
      to: formData.destination.value,
      departureDate: departureDate.toISOString().split('T')[0],
      roundTrip: tripType === '2' ? 'true' : 'false',
      passengers: '1',
    });

    // Thêm ngày về nếu là chuyến khứ hồi và ngày về hợp lệ
    if (returnDate && !isNaN(returnDate.getTime())) {
      queryParams.append('returnDate', returnDate.toISOString().split('T')[0]);
    }

    // Cập nhật query parameters trong URL
    const newParams = new URLSearchParams(searchParams);
    newParams.set('from', formData.departure.value);
    newParams.set('to', formData.destination.value);
    newParams.set('departureDate', formData.departureDate);
    if (formData.returnDate) {
      newParams.set('returnDate', formData.returnDate);
    }
    newParams.set('roundTrip', tripType === '2' ? 'true' : 'false');
    newParams.set('passengers', '1');
    setSearchParams(newParams);

    // Điều hướng đến trang kết quả tìm kiếm
    navigate(`/train-search-results?${queryParams.toString()}`);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <form onSubmit={handleSubmit}>
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
    </div>
  );
};

export default BookingSearch;