/**
 * Chuyển đổi giá từ string hoặc number sang number
 * @param price Giá có thể là string hoặc number
 * @returns number
 */
export const parsePrice = (price: string | number): number => {
  if (typeof price === 'string') {
    // Loại bỏ dấu phẩy và chuyển đổi sang số
    return Number(price.replace(/,/g, ''));
  }
  // Nếu đã là số, trả về luôn
  return price;
};

/**
 * Format số thành chuỗi có dấu phẩy ngăn cách
 * @param price Số cần format
 * @returns string đã được format
 */
export const formatPrice = (price: number): string => {
  return price.toLocaleString('en-US');
}; 