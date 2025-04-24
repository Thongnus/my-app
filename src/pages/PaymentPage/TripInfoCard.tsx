import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { TripInfoCardProps } from '../../Entity/Entity';

/**
 * Component TripInfoCard để hiển thị thông tin chuyến đi (khởi hành hoặc lượt về).
 * Hiển thị dưới dạng danh sách key-value với hiệu ứng hover.
 */
const TripInfoCard: React.FC<TripInfoCardProps> = ({ title, details }) => {
  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-300"
      whileHover={{ y: -5 }}
    >
      {/* Tiêu đề của card */}
      <h2 className="text-xl font-semibold text-gray-700 dark:text-white mb-4 flex items-center">
        <ArrowRightIcon className="h-6 w-6 mr-2 text-blue-500 dark:text-blue-400" />
        {title}
      </h2>
      {/* Danh sách thông tin chi tiết */}
      <ul className="text-gray-600 dark:text-gray-300 space-y-2">
        {Object.entries(details).map(([key, value]) => (
          <li key={key}>
            <span className="font-semibold">{key}:</span> {value}
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default TripInfoCard;