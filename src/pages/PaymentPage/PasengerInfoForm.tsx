import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { UserIcon, InformationCircleIcon, ClipboardDocumentCheckIcon } from '@heroicons/react/24/outline';
import { PassengerInfoFormProps } from '../../Entity/Entity';
 // Import interface từ entity.ts

/**
 * Component PassengerInfoForm để nhập thông tin người đặt vé và hành khách.
 * Hỗ trợ validation theo thời gian thực khi click và nhập dữ liệu.
 * Có nút sao chép thông tin từ "Thông tin trên vé" sang "Thông tin hành khách".
 */
const PassengerInfoForm: React.FC<PassengerInfoFormProps> = ({ formData, handleInputChange, errors }) => {
  // State để quản lý lỗi validation nội bộ
  const [localErrors, setLocalErrors] = useState<{ [key: string]: string }>({});

  // Hàm validate một trường cụ thể trong form
  const validateField = useCallback((name: string, value: string) => {
    const newErrors: { [key: string]: string } = { ...localErrors };

    // Validate trường Tên (bắt buộc) của ticketCollector
    if (name === 'ticketCollector.name') {
      if (!value.trim()) {
        newErrors[name] = 'Vui lòng nhập tên';
      } else {
        delete newErrors[name];
      }
    }

    // Validate trường Email (bắt buộc) của ticketCollector
    if (name === 'ticketCollector.email') {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!value) {
        newErrors[name] = 'Vui lòng nhập email';
      } else if (!emailRegex.test(value)) {
        newErrors[name] = 'Email không hợp lệ (VD: example@domain.com)';
      } else {
        delete newErrors[name];
      }
    }

    // Validate trường Nhập lại Email (bắt buộc) của ticketCollector
    if (name === 'ticketCollector.repeatedEmail') {
      if (!value) {
        newErrors[name] = 'Vui lòng nhập lại email';
      } else if (value !== formData.ticketCollector.email) {
        newErrors[name] = 'Email không khớp';
      } else {
        delete newErrors[name];
      }
    }

    // Validate trường Điện thoại liên hệ (bắt buộc) của ticketCollector
    if (name === 'ticketCollector.contact') {
      const phoneRegex = /^(0|\+84)\d{9}$/;
      if (!value) {
        newErrors[name] = 'Vui lòng nhập số liên hệ';
      } else if (!phoneRegex.test(value)) {
        newErrors[name] = 'Số điện thoại phải bắt đầu bằng 0 hoặc +84 và có 10 chữ số (VD: 0901234567)';
      } else {
        delete newErrors[name];
      }
    }

    // Validate trường Quốc tịch (bắt buộc) của ticketCollector
    if (name === 'ticketCollector.nationality') {
      if (!value) {
        newErrors[name] = 'Vui lòng chọn quốc tịch';
      } else {
        delete newErrors[name];
      }
    }

    // Validate trường Quốc tịch (bắt buộc) của passenger
    if (name === 'passenger.nationality') {
      if (!value) {
        newErrors[name] = 'Vui lòng chọn quốc tịch';
      } else {
        delete newErrors[name];
      }
    }

    setLocalErrors(newErrors);
  }, [formData.ticketCollector.email, localErrors]);

  // Hàm xử lý khi người dùng click vào input/select (onFocus) để validate ngay
  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  // Hàm xử lý khi người dùng thay đổi giá trị input/select (onChange)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    handleInputChange(e); // Gọi hàm từ parent để cập nhật formData
    const { name, value } = e.target;
    validateField(name, value);
  };

  // Hàm xử lý khi nhấn nút "Giống với thông tin vé" để sao chép thông tin
  const handleCopyInfo = () => {
    // Sao chép các giá trị từ ticketCollector sang passenger
    handleInputChange({
      target: { name: 'passenger.name', value: formData.ticketCollector.name },
    } as React.ChangeEvent<HTMLInputElement>);
    handleInputChange({
      target: { name: 'passenger.contact', value: formData.ticketCollector.contact },
    } as React.ChangeEvent<HTMLInputElement>);
    handleInputChange({
      target: { name: 'passenger.nationality', value: formData.ticketCollector.nationality },
    } as React.ChangeEvent<HTMLSelectElement>);

    // Validate lại các trường vừa sao chép
    validateField('passenger.name', formData.ticketCollector.name);
    validateField('passenger.contact', formData.ticketCollector.contact);
    validateField('passenger.nationality', formData.ticketCollector.nationality);
  };

  // Kết hợp lỗi từ props và lỗi nội bộ để hiển thị
  const combinedErrors = { ...localErrors, ...errors };

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Phần thông tin trên vé (Ticket Collector) */}
      <h2 className="text-xl font-semibold text-gray-700 dark:text-white mb-6 flex items-center">
        <UserIcon className="h-6 w-6 mr-2 text-blue-500 dark:text-blue-400" />
        Thông tin trên vé
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Trường Quý danh (không bắt buộc) */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-300">Quý danh</label>
          <select
            name="ticketCollector.salutation"
            value={formData.ticketCollector.salutation}
            onChange={handleChange}
            onFocus={handleFocus}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="">Chọn quý danh</option>
            <option value="Ông">Ông</option>
            <option value="Bà">Bà</option>
          </select>
        </div>

        {/* Trường Tên (bắt buộc) */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-300 flex items-center">
            Tên*
            <InformationCircleIcon
              className="h-4 w-4 ml-1 text-gray-400 dark:text-gray-500 cursor-pointer"
              data-tooltip-id="tooltip"
              data-tooltip-content="Tên đầy đủ của người đặt vé"
            />
          </label>
          <input
            type="text"
            name="ticketCollector.name"
            value={formData.ticketCollector.name}
            onChange={handleChange}
            onFocus={handleFocus}
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${combinedErrors['ticketCollector.name'] ? 'border-red-500' : ''}`}
            placeholder="Nhập tên đầy đủ"
          />
          {combinedErrors['ticketCollector.name'] && <p className="text-red-500 text-xs mt-1">{combinedErrors['ticketCollector.name']}</p>}
        </div>

        {/* Trường Email (bắt buộc) */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-300">Địa chỉ Email*</label>
          <input
            type="email"
            name="ticketCollector.email"
            value={formData.ticketCollector.email}
            onChange={handleChange}
            onFocus={handleFocus}
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${combinedErrors['ticketCollector.email'] ? 'border-red-500' : ''}`}
            placeholder="VD: example@domain.com"
          />
          {combinedErrors['ticketCollector.email'] && <p className="text-red-500 text-xs mt-1">{combinedErrors['ticketCollector.email']}</p>}
        </div>

        {/* Trường Nhập lại Email (bắt buộc) */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-300">Nhập lại Email*</label>
          <input
            type="email"
            name="ticketCollector.repeatedEmail"
            value={formData.ticketCollector.repeatedEmail}
            onChange={handleChange}
            onFocus={handleFocus}
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${combinedErrors['ticketCollector.repeatedEmail'] ? 'border-red-500' : ''}`}
            placeholder="Nhập lại email"
          />
          {combinedErrors['ticketCollector.repeatedEmail'] && <p className="text-red-500 text-xs mt-1">{combinedErrors['ticketCollector.repeatedEmail']}</p>}
        </div>

        {/* Trường Điện thoại liên hệ (bắt buộc) */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-300">Điện thoại liên hệ*</label>
          <input
            type="tel"
            name="ticketCollector.contact"
            value={formData.ticketCollector.contact}
            onChange={handleChange}
            onFocus={handleFocus}
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${combinedErrors['ticketCollector.contact'] ? 'border-red-500' : ''}`}
            placeholder="VD: 0901234567 hoặc +84901234567"
          />
          {combinedErrors['ticketCollector.contact'] && <p className="text-red-500 text-xs mt-1">{combinedErrors['ticketCollector.contact']}</p>}
        </div>

        {/* Trường Quốc tịch (bắt buộc) */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-300">Quốc tịch*</label>
          <select
            name="ticketCollector.nationality"
            value={formData.ticketCollector.nationality}
            onChange={handleChange}
            onFocus={handleFocus}
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${combinedErrors['ticketCollector.nationality'] ? 'border-red-500' : ''}`}
          >
            <option value="">Chọn quốc tịch</option>
            <option value="VN">Vietnam</option>
          </select>
          {combinedErrors['ticketCollector.nationality'] && <p className="text-red-500 text-xs mt-1">{combinedErrors['ticketCollector.nationality']}</p>}
        </div>
      </div>

      {/* Phần thông tin hành khách (Passenger) */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-700 dark:text-white flex items-center">
          <UserIcon className="h-6 w-6 mr-2 text-blue-500 dark:text-blue-400" />
          Thông tin hành khách
        </h2>
        {/* Button để sao chép thông tin từ Ticket Collector sang Passenger */}
        <motion.button
          onClick={handleCopyInfo}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ClipboardDocumentCheckIcon className="h-5 w-5 mr-2" />
          Giống với thông tin vé
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Trường Tên (không bắt buộc) */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-300">Tên</label>
          <input
            type="text"
            name="passenger.name"
            value={formData.passenger.name}
            onChange={handleChange}
            onFocus={handleFocus}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Nhập tên đầy đủ"
          />
        </div>

        {/* Trường Giới tính (không bắt buộc) */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-300">Giới tính</label>
          <select
            name="passenger.gender"
            value={formData.passenger.gender}
            onChange={handleChange}
            onFocus={handleFocus}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="">Chọn giới tính</option>
            <option value="M">Nam</option>
            <option value="F">Nữ</option>
          </select>
        </div>

        {/* Trường Quốc tịch (bắt buộc) */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-300">Quốc tịch*</label>
          <select
            name="passenger.nationality"
            value={formData.passenger.nationality}
            onChange={handleChange}
            onFocus={handleFocus}
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${combinedErrors['passenger.nationality'] ? 'border-red-500' : ''}`}
          >
            <option value="">Chọn quốc tịch</option>
            <option value="VN">Vietnam</option>
          </select>
          {combinedErrors['passenger.nationality'] && <p className="text-red-500 text-xs mt-1">{combinedErrors['passenger.nationality']}</p>}
        </div>

        {/* Trường Loại vé (không bắt buộc, có giá trị mặc định) */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-300">Loại vé</label>
          <select
            name="passenger.passengerType"
            value={formData.passenger.passengerType}
            onChange={handleChange}
            onFocus={handleFocus}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="ADULT">Người lớn</option>
            <option value="CHILD">Trẻ em</option>
          </select>
        </div>

        {/* Trường Số liên hệ (không bắt buộc) */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-300">Số liên hệ</label>
          <input
            type="text"
            name="passenger.contact"
            value={formData.passenger.contact}
            onChange={handleChange}
            onFocus={handleFocus}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Số liên hệ"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default PassengerInfoForm;