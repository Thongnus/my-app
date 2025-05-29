import axios from 'axios';
import { ApiResponse, SearchParams } from '../Entity/Entity';

class SearchService {
  private static baseUrl = process.env.REACT_APP_API_URL;

  public static async searchTrips(params: SearchParams): Promise<ApiResponse> {
    if (!this.baseUrl) {
      throw new Error('REACT_APP_API_URL không được định nghĩa trong .env');
    }

    try {
      const response = await axios.get(`${this.baseUrl}/api/trips/search`, {
        params: {
          departure: params.departure,
          destination: params.destination,
          departureDate: params.departureDate,
          passengers: params.passengers,
          ...(params.returnDate && { returnDate: params.returnDate })
        }
      });
        console.log('Dữ liệu tìm kiếm:', response.data);    
      return response.data;
    } catch (error: any) {
      console.error('Search API Error:', error);
      throw new Error(error.response?.data?.message || 'Không thể tải dữ liệu tìm kiếm');
    }
  }
}

export default SearchService;