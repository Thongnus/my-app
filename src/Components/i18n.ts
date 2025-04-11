// import i18n from 'i18next';
// import { initReactI18next } from 'react-i18next';
// import LanguageDetector from 'i18next-browser-languagedetector';

// // Định nghĩa các bản dịch
// const resources = {
//   'en-SG': {
//     translation: {
//       // Header
//       "Login": "Login",
//       "Register": "Register",
//       "Recent Searches": "Recent Searches",
//       "Singapore": "Singapore",
//       "Vietnam": "Vietnam",
//       "Thailand": "Thailand",
//       "Currency": "Currency",
//       "USD": "USD - US Dollar",
//       "VND": "VND - Vietnamese Dong",
//       "Language": "Language",
//       "English": "English",
//       "Vietnamese": "Vietnamese",
//       "Contact": "Contact",

//       // LoginForm
//       "User Login": "User Login",
//       "Please enter your email": "Please enter your email (the address you use to book tickets on the website) and password below:",
//       "Use mobile number": "Use mobile number?",
//       "New user": "New user? Register here",
//       "Email": "Email",
//       "Your email": "Your email",
//       "Email required": "Email is required",
//       "Invalid email": "Invalid email",
//       "Password": "Password",
//       "Your password": "Your password",
//       "Password required": "Password is required",
//       "Password length": "Password must be at least 8 characters",
//       "Reset password": "Reset password",
//       "Login button": "Login",
//       "Or": "Or",
//       "Login with Facebook": "Login with Facebook",
//       "Login with Google": "Login with Google",
//       "Login with Microsoft": "Login with Microsoft",

//       // SignupForm
//       "Register new account": "Register new account",
//       "Full name": "Full name",
//       "Your full name": "Your full name",
//       "Full name required": "Full name is required",
//       "Password confirm": "Confirm password",
//       "Confirm your password": "Confirm your password",
//       "Confirm password required": "Confirm password is required",
//       "Password mismatch": "Passwords do not match",
//       "Register button": "Register",
//       "Already have account": "Already have an account? Login here",

//       // AuthLayout
//       "Login or Signup": "Login | Sign up to Member",
//       "Important": "Important:",
//       "Terms": "You need to read Easybook's terms and conditions before proceeding. The use of the Easybook wallet is subject to the wallet's terms and conditions governed by SINGAPORE law. By using the Easybook wallet, you agree to these terms and conditions."
//     }
//   },
//   'vi-VN': {
//     translation: {
//       // Header
//       "Login": "Đăng nhập",
//       "Register": "Đăng Ký",
//       "Recent Searches": "Tìm kiếm gần đây",
//       "Singapore": "Singapore",
//       "Vietnam": "Việt Nam",
//       "Thailand": "Thái Lan",
//       "Currency": "Tiền tệ",
//       "USD": "USD - Đô la Mỹ",
//       "VND": "VND - Đồng Việt Nam",
//       "Language": "Ngôn ngữ",
//       "English": "English",
//       "Vietnamese": "Tiếng Việt",
//       "Contact": "Liên Hệ",

//       // LoginForm
//       "User Login": "Người dùng đăng nhập",
//       "Please enter your email": "Vui lòng nhập địa chỉ email của bạn (địa chỉ mà bạn đang dùng để đặt vé trên website) và mật khẩu vào ô bên dưới:",
//       "Use mobile number": "Dùng số di động?",
//       "New user": "Người dùng mới? Đăng ký đây",
//       "Email": "Email",
//       "Your email": "Email của bạn",
//       "Email required": "Email không được để trống",
//       "Invalid email": "Email không hợp lệ",
//       "Password": "Mật khẩu",
//       "Your password": "Mật khẩu của bạn",
//       "Password required": "Mật khẩu không được để trống",
//       "Password length": "Mật khẩu phải có ít nhất 8 ký tự",
//       "Reset password": "Mật khẩu đặt lại",
//       "Login button": "Đăng nhập",
//       "Or": "Hoặc",
//       "Login with Facebook": "Đăng nhập với Facebook",
//       "Login with Google": "Đăng nhập với Google",
//       "Login with Microsoft": "Đăng nhập với Microsoft",

//       // SignupForm
//       "Register new account": "Đăng ký tài khoản mới",
//       "Full name": "Họ và tên",
//       "Your full name": "Họ và tên của bạn",
//       "Full name required": "Họ và tên không được để trống",
//       "Password confirm": "Xác nhận mật khẩu",
//       "Confirm your password": "Xác nhận mật khẩu",
//       "Confirm password required": "Xác nhận mật khẩu không được để trống",
//       "Password mismatch": "Mật khẩu không khớp",
//       "Register button": "Đăng ký",
//       "Already have account": "Đã có tài khoản? Đăng nhập tại đây",

//       // AuthLayout
//       "Login or Signup": "Log in | Sign up to Member",
//       "Important": "Quan trọng:",
//       "Terms": "Bạn cần đọc các điều khoản và điều kiện của Easybook trước khi tiếp tục. Việc sử dụng ví Easybook phải tuân theo các điều khoản và điều kiện của ví được điều chỉnh bởi luật pháp SINGAPORE. Bằng cách sử dụng ví Easybook, bạn đồng ý với các điều khoản và điều kiện này."
//     }
//   },
//   'th-TH': {
//     translation: {
//       // Header
//       "Login": "เข้าสู่ระบบ",
//       "Register": "ลงทะเบียน",
//       "Recent Searches": "การค้นหาล่าสุด",
//       "Singapore": "สิงคโปร์",
//       "Vietnam": "เวียดนาม",
//       "Thailand": "ประเทศไทย",
//       "Currency": "สกุลเงิน",
//       "USD": "USD - ดอลลาร์สหรัฐ",
//       "VND": "VND - ดองเวียดนาม",
//       "Language": "ภาษา",
//       "English": "อังกฤษ",
//       "Vietnamese": "เวียดนาม",
//       "Contact": "ติดต่อ",

//       // LoginForm
//       "User Login": "เข้าสู่ระบบผู้ใช้",
//       "Please enter your email": "กรุณากรอกที่อยู่อีเมลของคุณ (ที่อยู่อีเมลที่คุณใช้ในการจองตั๋วบนเว็บไซต์) และรหัสผ่านด้านล่าง:",
//       "Use mobile number": "ใช้หมายเลขโทรศัพท์มือถือ?",
//       "New user": "ผู้ใช้ใหม่? ลงทะเบียนที่นี่",
//       "Email": "อีเมล",
//       "Your email": "อีเมลของคุณ",
//       "Email required": "ต้องระบุอีเมล",
//       "Invalid email": "อีเมลไม่ถูกต้อง",
//       "Password": "รหัสผ่าน",
//       "Your password": "รหัสผ่านของคุณ",
//       "Password required": "ต้องระบุรหัสผ่าน",
//       "Password length": "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร",
//       "Reset password": "รีเซ็ตรหัสผ่าน",
//       "Login button": "เข้าสู่ระบบ",
//       "Or": "หรือ",
//       "Login with Facebook": "เข้าสู่ระบบด้วย Facebook",
//       "Login with Google": "เข้าสู่ระบบด้วย Google",
//       "Login with Microsoft": "เข้าสู่ระบบด้วย Microsoft",

//       // SignupForm
//       "Register new account": "ลงทะเบียนบัญชีใหม่",
//       "Full name": "ชื่อเต็ม",
//       "Your full name": "ชื่อเต็มของคุณ",
//       "Full name required": "ต้องระบุชื่อเต็ม",
//       "Password confirm": "ยืนยันรหัสผ่าน",
//       "Confirm your password": "ยืนยันรหัสผ่าน",
//       "Confirm password required": "ต้องระบุการยืนยันรหัสผ่าน",
//       "Password mismatch": "รหัสผ่านไม่ตรงกัน",
//       "Register button": "ลงทะเบียน",
//       "Already have account": "มีบัญชีแล้ว? เข้าสู่ระบบที่นี่",

//       // AuthLayout
//       "Login or Signup": "เข้าสู่ระบบ | ลงทะเบียนเพื่อเป็นสมาชิก",
//       "Important": "สำคัญ:",
//       "Terms": "คุณต้องอ่านข้อกำหนดและเงื่อนไขของ Easybook ก่อนดำเนินการต่อ การใช้กระเป๋าเงิน Easybook ต้องเป็นไปตามข้อกำหนดและเงื่อนไขของกระเป๋าเงินที่อยู่ภายใต้กฎหมายของสิงคโปร์ โดยการใช้กระเป๋าเงิน Easybook คุณตกลงที่จะยอมรับข้อกำหนดและเงื่อนไขเหล่านี้"
//     }
//   }
// };

// i18n
//   .use(LanguageDetector) // Tự động phát hiện ngôn ngữ
//   .use(initReactI18next) // Kết nối i18next với React
//   .init({
//     resources,
//     fallbackLng: 'en-SG', // Ngôn ngữ mặc định nếu không phát hiện được
//     interpolation: {
//       escapeValue: false // React đã tự động thoát các giá trị
//     }
//   });

// export default i18n;