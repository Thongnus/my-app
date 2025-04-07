import React, { useState } from 'react';


const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="header">
            <div className="header-container">
                {/* Left section */}
                <div className="header-left">
                    <div className="logo">
                        <a href="/" className="flex items-center">
                            <img src="/logo.png" alt="EasyBook Logo" className="h-8 w-auto"/>
                        </a>
                    </div>
                </div>

                {/* Center section */}
                <nav className={`header-nav ${isMenuOpen ? 'active' : ''}`}>
                    <ul>
                        <li><a href="/">Vé máy bay</a></li>
                        <li><a href="/hotels">Khách sạn</a></li>
                        <li><a href="/combo">Combo</a></li>
                        <li><a href="/tours">Tours</a></li>
                        <li><a href="/activities">Hoạt động</a></li>
                    </ul>
                </nav>

                {/* Right section */}
                <div className="header-right">
                    <div className="user-actions">
                        <button className="language-btn">VN</button>
                        <button className="currency-btn">VND</button>
                        <button className="login-btn">Đăng nhập</button>
                    </div>
                </div>

                {/* Mobile menu button */}
                <button 
                    className="mobile-menu-btn"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </header>
    );
};

export default Header;