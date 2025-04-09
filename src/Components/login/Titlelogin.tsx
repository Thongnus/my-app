import React, { useState } from 'react';
import { FaFacebook, FaGoogle, FaMicrosoft, FaEye, FaEyeSlash, FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import Breadcrumb from '../BreadCrumb';


const CFaFacebook = FaFacebook as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
const CFaGoogle = FaGoogle as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
const CFaMicrosoft = FaMicrosoft as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
const CFaEye = FaEye as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
const CFaEyeSlash = FaEyeSlash as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
const CFaEnvelope = FaEnvelope as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
const CFaLock = FaLock as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
const CFaUser = FaUser as unknown as React.FC<React.SVGProps<SVGSVGElement>>;


interface FormErrors {
    email?: string;
    password?: string;
    name?: string;
    confirmPassword?: string;
}

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState<FormErrors>({});

    const validateForm = () => {
        const newErrors: FormErrors = {};
        if (!email) {
            newErrors.email = 'Email không được để trống';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email không hợp lệ';
        }
        if (!password) {
            newErrors.password = 'Mật khẩu không được để trống';
        } else if (password.length < 8) {
            newErrors.password = 'Mật khẩu phải có ít nhất 8 ký tự';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            console.log('Login:', { email, password });
        }
    };

    return (
        <section className="w-full md:w-1/2 p-6 border-r">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Người dùng đăng nhập</h2>
            <p className="text-blue-600 bg-blue-50 p-3 rounded mb-4 text-sm">
                Vui lòng nhập địa chỉ email của bạn (địa chỉ mà bạn đang dùng để đặt vé trên website) và mật khẩu vào ô bên dưới:
            </p>
            <p className="text-gray-600 mb-2">Dùng số di động?</p>
            <a href="#" className="text-purple-600 mb-4 inline-block hover:underline">Người dùng mới? Đăng ký đây</a>
            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label htmlFor="email" className="block text-gray-700 mb-1 font-medium">Email</label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                            <CFaEnvelope />
                        </span>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`w-full pl-10 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="Email của bạn"
                            required
                            aria-describedby={errors.email ? 'email-error' : undefined}
                        />
                    </div>
                    {errors.email && <p id="email-error" className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                <div>
                    <label htmlFor="password" className="block text-gray-700 mb-1 font-medium">Mật khẩu</label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                            <CFaLock />
                        </span>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`w-full pl-10 pr-10 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="Mật khẩu của bạn"
                            required
                            aria-describedby={errors.password ? 'password-error' : undefined}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                        >
                            {showPassword ? <CFaEyeSlash /> : <CFaEye />}
                        </button>
                    </div>
                    {errors.password && <p id="password-error" className="text-red-500 text-sm mt-1">{errors.password}</p>}
                </div>
                <div className="flex justify-between items-center">
                    <a href="#" className="text-purple-600 text-sm hover:underline">Mật khẩu đặt lại</a>
                </div>
                <button
                    type="submit"
                    className="w-full bg-purple-800 text-white py-3 rounded-lg hover:bg-purple-900 transition-all font-medium"
                >
                    Đăng nhập
                </button>
            </form>
            <div className="flex items-center my-6">
                <hr className="flex-grow border-gray-300" />
                <span className="mx-3 text-gray-500 text-sm">Hoặc</span>
                <hr className="flex-grow border-gray-300" />
            </div>
            <div className="space-y-3">
                <button className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all">
                    <CFaFacebook /> Đăng nhập với Facebook
                </button>
                <button className="w-full flex items-center justify-center gap-2 bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-all">
                    <CFaGoogle /> Đăng nhập với Google
                </button>
                <button className="w-full flex items-center justify-center gap-2 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-all">
                    <CFaMicrosoft /> Đăng nhập với Microsoft
                </button>
            </div>
        </section>
    );
};

const SignupForm: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState<FormErrors>({});

    const validateForm = () => {
        const newErrors: FormErrors = {};
        if (!name) newErrors.name = 'Họ và tên không được để trống';
        if (!email) {
            newErrors.email = 'Email không được để trống';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email không hợp lệ';
        }
        if (!password) {
            newErrors.password = 'Mật khẩu không được để trống';
        } else if (password.length < 8) {
            newErrors.password = 'Mật khẩu phải có ít nhất 8 ký tự';
        }
        if (!confirmPassword) {
            newErrors.confirmPassword = 'Xác nhận mật khẩu không được để trống';
        } else if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Mật khẩu không khớp';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            console.log('Signup:', { name, email, password });
        }
    };

    return (
        <section className="w-full md:w-1/2 p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Đăng ký tài khoản mới</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label htmlFor="name" className="block text-gray-700 mb-1 font-medium">Họ và tên</label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                            <CFaUser />
                        </span>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={`w-full pl-10 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="Họ và tên của bạn"
                            required
                            aria-describedby={errors.name ? 'name-error' : undefined}
                        />
                    </div>
                    {errors.name && <p id="name-error" className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>
                <div>
                    <label htmlFor="email" className="block text-gray-700 mb-1 font-medium">Email</label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                            <CFaEnvelope />
                        </span>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`w-full pl-10 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="Email của bạn"
                            required
                            aria-describedby={errors.email ? 'email-error' : undefined}
                        />
                    </div>
                    {errors.email && <p id="email-error" className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                <div>
                    <label htmlFor="password" className="block text-gray-700 mb-1 font-medium">Mật khẩu</label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                            <CFaLock />
                        </span>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`w-full pl-10 pr-10 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="Mật khẩu của bạn"
                            required
                            aria-describedby={errors.password ? 'password-error' : undefined}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                        >
                            {showPassword ? <CFaEyeSlash /> : <CFaEye />}
                        </button>
                    </div>
                    {errors.password && <p id="password-error" className="text-red-500 text-sm mt-1">{errors.password}</p>}
                </div>
                <div>
                    <label htmlFor="confirmPassword" className="block text-gray-700 mb-1 font-medium">Xác nhận mật khẩu</label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                            <CFaLock />
                        </span>
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className={`w-full pl-10 pr-10 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="Xác nhận mật khẩu"
                            required
                            aria-describedby={errors.confirmPassword ? 'confirmPassword-error' : undefined}
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            aria-label={showConfirmPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                        >
                            {showConfirmPassword ? <CFaEyeSlash /> : <CFaEye />}
                        </button>
                    </div>
                    {errors.confirmPassword && <p id="confirmPassword-error" className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                </div>
                <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-all font-medium"
                >
                    Đăng ký
                </button>
            </form>
            
        </section>
    );
};

const LoginSignup: React.FC = () => {
    return (
        <main className="container mx-auto p-6">
            <header className="bg-yellow-400 p-4 mb-6 rounded-lg">
                <h1 className="text-xl font-bold">Log in | Sign up to Member</h1>
                {/* <p className="text-sm">Trang Chủ / Đăng Nhập</p> */}
            </header>
            <Breadcrumb />
            <div className="flex flex-col md:flex-row border rounded-lg shadow-md bg-white">
                <LoginForm />
                <SignupForm />
            </div>
            <footer className="mt-6 p-4 bg-gray-100 rounded-lg">
                <h3 className="font-bold text-gray-800">Quan trọng:</h3>
                <p className="text-sm text-gray-600">
                    Bạn cần đọc các điều khoản và điều kiện của Easybook trước khi tiếp tục. Việc sử dụng ví Easybook phải tuân theo các điều khoản và điều kiện của ví được điều chỉnh bởi luật pháp SINGAPORE. Bằng cách sử dụng ví Easybook, bạn đồng ý với các điều khoản và điều kiện này.
                </p>
            </footer>
        </main>
    );
};

export default LoginSignup;