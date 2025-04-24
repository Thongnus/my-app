module.exports = {
  darkMode: 'class', // Bật chế độ tối
  mode: 'jit', // Chế độ Just-In-Time
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
      "./public/index.html"
    ],
    theme: {
      extend: {
        fontFamily: {
          roboto: ['Roboto', 'sans-serif'], // Font chữ chính
        }
        ,
        colors: {
          primary: '#3b82f6', // Màu chủ đạo
          secondary: '#10b981', // Màu phụ
          danger: '#ef4444', // Màu cảnh báo
          rail: '#1e40af' // Màu đặc trưng cho tàu hỏa
        },
      },
    },
    plugins: [],
  }