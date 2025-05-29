import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Dùng để điều hướng sau khi submit form
import DatePicker from 'react-datepicker'; // Thư viện chọn ngày
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select'; // Thư viện dropdown với gợi ý
import { provinces } from '../Data.js/provinces'; // Danh sách các ga
import { ApiResponse, FormData } from '../Entity/Entity'; // Định nghĩa kiểu dữ liệu cho form
import {
  FaTrain,
  FaExchangeAlt,
  FaCalendarAlt,
  FaUser,
} from 'react-icons/fa';
import axios from 'axios';
import SearchService from '../Service/SearchTrip';
import { Console } from 'console';


// Ép kiểu các icon từ Fa* thành React component
const IconTrain = FaTrain as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
const IconSwap = FaExchangeAlt as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
const IconCalendar = FaCalendarAlt as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
const IconPassenger = FaUser as unknown as React.FC<React.SVGProps<SVGSVGElement>>;

// Định nghĩa kiểu dữ liệu cho form

// Định nghĩa kiểu dữ liệu cho lỗi của form
interface FormErrors {
  api?: string;  // api nên là optional và kiểu string
  departure?: string;
  destination?: string;
  passengers?: string;
}
const TrainBookingForm = () => {
  const navigate = useNavigate(); // Hook để điều hướng sau khi submit

  // Quản lý dữ liệu form
  const [formData, setFormData] = useState<FormData>({
    departure: null, // Điểm đi ban đầu là null
    destination: null, // Điểm đến ban đầu là null
    departureDate: new Date(), // Ngày đi mặc định là ngày hiện tại
    returnDate: null, // Ngày về mặc định là null
    passengers: '1', // Số hành khách mặc định là 1
    roundTrip: false, // Mặc định không phải chuyến khứ hồi

  });

  // Quản lý lỗi của form
  const [errors, setErrors] = useState<FormErrors>({});

  // Hàm đảo ngược điểm đi và điểm đến
  const swapStations = () => {
    setFormData(prev => ({
      ...prev,
      departure: prev.destination, // Điểm đi thành điểm đến
      destination: prev.departure, // Điểm đến thành điểm đi
    }));
  };

  // Kiểm tra dữ liệu form trước khi submit
  const validateForm = () => {
    const newErrors: FormErrors = { api: undefined };
    if (!formData.departure) {
      newErrors.departure = 'Vui lòng chọn điểm đi'; // Báo lỗi nếu chưa chọn điểm đi
    }
    if (!formData.destination) {
      newErrors.destination = 'Vui lòng chọn điểm đến'; // Báo lỗi nếu chưa chọn điểm đến
    }
    if (!formData.passengers || parseInt(formData.passengers) < 1) {
      newErrors.passengers = 'Số hành khách phải từ 1 đến 10'; // Báo lỗi nếu số hành khách không hợp lệ
    }
    if (parseInt(formData.passengers) > 10) {
      newErrors.passengers = 'Số hành khách tối đa là 10'; // Báo lỗi nếu số hành khách vượt quá 10
    }
    if (formData.departure?.value === formData.destination?.value) {
      newErrors.destination = 'Điểm đến không được trùng với điểm đi';
    }
    if (formData.roundTrip && formData.returnDate && formData.returnDate < formData.departureDate) {
      newErrors.api = 'Ngày về phải sau ngày đi';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 1 && !newErrors.api; // Trả về true nếu không có lỗi
  };

  // Xử lý khi người dùng thay đổi số hành khách
  const handlePassengerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Chỉ cho phép giá trị từ 1 đến 10
    if (value === '' || (parseInt(value) >= 1 && parseInt(value) <= 10)) {
      setFormData(prev => ({ ...prev, passengers: value }));
      setErrors(prev => ({ ...prev, passengers: undefined })); // Xóa lỗi nếu giá trị hợp lệ
    }
  };

  // Xử lý khi người dùng nhấn nút "Tìm kiếm"
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        console.log('Submitting form with data:', formData.departure, formData.destination, formData.departureDate, formData.returnDate, formData.passengers, formData.roundTrip);
        const searchParams = {
          departure: formData.departure?.id ?? 0,
          destination: formData.destination?.id ?? 0,
          departureDate: formData.departureDate.toISOString().split('T')[0],
          passengers: parseInt(formData.passengers),
          ...(formData.roundTrip && formData.returnDate && {
            returnDate: formData.returnDate.toISOString().split('T')[0]
          })
        };

        const response = await SearchService.searchTrips(searchParams);

        if (response.success) {
          navigate('/train-search-results', {
            state: {
              searchParams: {
                from: formData.departure?.id ,
                to: formData.destination?.id,
                departureDate: formData.departureDate,
                returnDate: formData.returnDate,
                passengers: formData.passengers,
                roundTrip: formData.roundTrip
              },
              searchResults: response.data
            }
          });
        } else {
          setErrors(prev => ({
            ...prev,
            api: response.message || 'Có lỗi xảy ra'
          }));
        }
      } catch (error) {
        console.error('Error fetching search results:', error);
        setErrors(prev => ({
          ...prev,
          api: error instanceof Error ? error.message : 'Có lỗi xảy ra khi tìm kiếm'
        }));
      }
    }
  };

  return (
    <div className="bg-[length:100%_auto] bg-no-repeat bg-[url(https://easycdn.blob.core.windows.net/images/hero-images/vn-05.jpg)] py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center text-white drop-shadow-lg">
          Đặt Vé Tàu Hỏa
        </h1>

        <div className="bg-black bg-opacity-80 rounded-xl shadow-2xl overflow-hidden border border-gray-700">
          {/* Header của form */}
          <div className="flex items-center px-6 py-4 border-b border-gray-600 text-yellow-400 font-semibold text-lg bg-black bg-opacity-50">
            <IconTrain className="mr-2" /> Tàu Hỏa
          </div>

          {/* Nội dung form */}
          <div className="p-6">
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              {/* Chọn điểm đi */}
              <div>
                <label className="block text-white mb-2 font-medium">Điểm Đi</label>
                <Select
                  options={provinces} // Danh sách ga từ provinces
                  value={formData.departure}
                  onChange={(newValue) =>
                    setFormData(prev => ({ ...prev, departure: newValue }))
                  }
                  placeholder="Chọn điểm đi"
                  className="react-select-container"
                  classNamePrefix="react-select"
                  styles={{
                    control: (base) => ({
                      ...base,
                      backgroundColor: '#ffffff',
                      borderColor: errors.departure ? '#ef4444' : '#e5e7eb', // Viền đỏ nếu có lỗi
                      borderRadius: '0.5rem',
                      padding: '0.25rem',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        borderColor: '#facc15',
                      },
                    }),
                    menu: (base) => ({
                      ...base,
                      backgroundColor: '#ffffff',
                      borderRadius: '0.5rem',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                      maxHeight: '200px',
                      overflowY: 'auto',
                    }),
                    option: (base, { isFocused }) => ({
                      ...base,
                      backgroundColor: isFocused ? '#facc15' : 'transparent',
                      color: isFocused ? '#ffffff' : '#374151',
                      '&:hover': {
                        backgroundColor: '#facc15',
                        color: '#ffffff',
                      },
                    }),
                  }}
                />
                {errors.departure && (
                  <p className="text-red-400 text-sm mt-1">{errors.departure}</p>
                )}
              </div>

              {/* Nút đảo chiều điểm đi và điểm đến */}
              <div className="flex items-center justify-center pt-6 md:pt-0">
                <button
                  title="Đổi chiều"
                  onClick={swapStations}
                  className="p-3 bg-yellow-500 rounded-full hover:bg-yellow-600 transition duration-300 transform hover:scale-110 hover:shadow-lg"
                >
                  <IconSwap className="text-white" />
                </button>
              </div>

              {/* Chọn điểm đến */}
              <div>
                <label className="block text-white mb-2 font-medium">Điểm Đến</label>
                <Select
                  options={provinces}
                  value={formData.destination}
                  onChange={(newValue) =>
                    setFormData(prev => ({ ...prev, destination: newValue }))
                  }
                  placeholder="Chọn điểm đến"
                  className="react-select-container"
                  classNamePrefix="react-select"
                  styles={{
                    control: (base) => ({
                      ...base,
                      backgroundColor: '#ffffff',
                      borderColor: errors.destination ? '#ef4444' : '#e5e7eb',
                      borderRadius: '0.5rem',
                      padding: '0.25rem',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        borderColor: '#facc15',
                      },
                    }),
                    menu: (base) => ({
                      ...base,
                      backgroundColor: '#ffffff',
                      borderRadius: '0.5rem',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                      maxHeight: '200px',
                      overflowY: 'auto',
                    }),
                    option: (base, { isFocused }) => ({
                      ...base,
                      backgroundColor: isFocused ? '#facc15' : 'transparent',
                      color: isFocused ? '#ffffff' : '#374151',
                      '&:hover': {
                        backgroundColor: '#facc15',
                        color: '#ffffff',
                      },
                    }),
                  }}
                />
                {errors.destination && (
                  <p className="text-red-400 text-sm mt-1">{errors.destination}</p>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-4 gap-6 mb-6">
              {/* Chọn ngày đi */}
              <div className="relative">
                <label className="block text-white mb-2 font-medium">Ngày Đi</label>
                <div className="relative">
                  <DatePicker
                    selected={formData.departureDate}
                    onChange={(date) =>
                      setFormData(prev => ({ ...prev, departureDate: date || new Date() }))
                    }
                    className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-300 bg-white hover:border-yellow-500"
                  />
                  <IconCalendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              {/* Chọn ngày về (hiển thị nếu là khứ hồi) */}
              {formData.roundTrip && (
                <div className="relative">
                  <label className="block text-white mb-2 font-medium">Ngày Về</label>
                  <div className="relative">
                    <DatePicker
                      selected={formData.returnDate}
                      onChange={(date) =>
                        setFormData(prev => ({ ...prev, returnDate: date || new Date() }))
                      }
                      className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-300 bg-white hover:border-yellow-500"
                    />
                    <IconCalendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
              )}

              {/* Nhập số hành khách */}
              <div className="relative">
                <label className="block text-white mb-2 font-medium">Hành Khách</label>
                <div className="relative">
                  <input
                    type="number"
                    value={formData.passengers}
                    onChange={handlePassengerChange}
                    min="1"
                    max="10"
                    className={`w-full p-3 pr-10 border rounded-lg focus:outline-none focus:ring-2 transition duration-300 bg-white hover:border-yellow-500 ${errors.passengers
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-yellow-500'
                      }`}
                  />
                  <IconPassenger className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                {errors.passengers && (
                  <p className="text-red-400 text-sm mt-1">{errors.passengers}</p>
                )}
              </div>

              {/* Nút tìm kiếm */}
              <div className="flex items-end">
                <button
                  onClick={handleSubmit}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-6 rounded-lg w-full flex items-center justify-center transition duration-300 transform hover:scale-105 hover:shadow-lg"
                >
                  <IconTrain className="mr-2" /> Tìm Kiếm
                </button>
              </div>
            </div>

            {/* Checkbox chọn chuyến khứ hồi */}
            <div className="flex items-center mt-4">
              <input
                type="checkbox"
                id="roundtrip"
                checked={formData.roundTrip}
                onChange={() =>
                  setFormData(prev => ({
                    ...prev,
                    roundTrip: !prev.roundTrip,
                    returnDate: !prev.roundTrip ? new Date() : null, // Nếu bật khứ hồi, mặc định ngày về là ngày hiện tại
                  }))
                }
                className="mr-2 h-5 w-5 text-yellow-500 focus:ring-yellow-500 border-gray-300 rounded"
              />
              <label htmlFor="roundtrip" className="text-white font-medium">Khứ Hồi</label>
            </div>

            {/* Hiển thị lỗi từ API (nếu có) */}
            {errors.api && (
              <div className="text-red-500 bg-red-100 p-3 rounded mt-4">
                {errors.api}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainBookingForm;