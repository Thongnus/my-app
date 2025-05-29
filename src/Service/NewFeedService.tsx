import axios from 'axios';
import { NewfeedDto } from '../Entity/Entity';

const fetchPromotions = async (): Promise<NewfeedDto[]> => {
  const token = localStorage.getItem('token'); // Lấy JWT từ localStorage
  if (!process.env.REACT_APP_API_URL) {
    throw new Error('REACT_APP_API_URL không được định nghĩa trong .env');
  }
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/new-feeds`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : '', // Thêm header Authorization
      },
    });
    console.log('Dữ liệu khuyến mãi:', response.data);
    return (response.data.data || []) as NewfeedDto[];
  } catch (error) {
    console.error('Lỗi khi fetch dữ liệu khuyến mãi:', error);
    throw new Error('Không thể tải dữ liệu khuyến mãi');
  }
};
export default fetchPromotions;