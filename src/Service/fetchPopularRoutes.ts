import axios from 'axios';
import { TrainRoute } from '../Entity/Entity';  // Fix the import path

const fetchPopularRoutes = async (): Promise<TrainRoute[]> => {
  const token = localStorage.getItem('token');

  if (!process.env.REACT_APP_API_URL) {
    throw new Error('REACT_APP_API_URL không được định nghĩa trong .env');
  }

  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/trips/popular`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    });

    // Ensure the response data matches the TrainRoute interface
    const routes = response.data?.map((route: any) => ({
      ...route

    })) || [];
    console.log('Dữ liệu tuyến phổ biến:', routes);
    return routes as TrainRoute[];
  } catch (error) {
    console.error('Lỗi khi fetch dữ liệu tuyến phổ biến:', error);
    throw new Error('Không thể tải dữ liệu tuyến phổ biến');
  }
};

export default fetchPopularRoutes;