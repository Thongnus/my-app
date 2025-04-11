import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

// Component cho dropdown ngôn ngữ
const LanguageDropdown = () => {
  const [language, setLanguage] = useState("Tiếng Việt");
  
  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton className="inline-flex justify-center items-center gap-1 text-sm font-medium text-gray-700">
        {language} <ChevronDownIcon className="w-4 h-4" />
      </MenuButton>
      <Transition
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <MenuItem>
              {({ active }) => (
                <button
                  onClick={() => setLanguage("Tiếng Việt")}
                  className={`${active ? "bg-gray-100" : ""} block px-4 py-2 text-sm text-gray-700 w-full text-left`}
                >
                  Tiếng Việt
                </button>
              )}
            </MenuItem>
            <MenuItem>
              {({ active }) => (
                <button
                  onClick={() => setLanguage("English")}
                  className={`${active ? "bg-gray-100" : ""} block px-4 py-2 text-sm text-gray-700 w-full text-left`}
                >
                  English
                </button>
              )}
            </MenuItem>
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
};

// Component cho dropdown tiền tệ
const CurrencyDropdown = () => {
  const [currency, setCurrency] = useState("VND");
  
  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton className="inline-flex justify-center items-center gap-1 text-sm font-medium text-gray-700">
        {currency} <ChevronDownIcon className="w-4 h-4" />
      </MenuButton>
      <Transition
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <MenuItem>
              {({ active }) => (
                <button
                  onClick={() => setCurrency("USD")}
                  className={`${active ? "bg-gray-100" : ""} block px-4 py-2 text-sm text-gray-700 w-full text-left`}
                >
                  USD - Đô la Mỹ
                </button>
              )}
            </MenuItem>
            <MenuItem>
              {({ active }) => (
                <button
                  onClick={() => setCurrency("VND")}
                  className={`${active ? "bg-gray-100" : ""} block px-4 py-2 text-sm text-gray-700 w-full text-left`}
                >
                  VND - Đồng Việt Nam
                </button>
              )}
            </MenuItem>
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
};

// Component cho dropdown quốc gia
const CountryDropdown = () => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton className="inline-flex justify-center items-center gap-1 text-sm font-medium text-gray-700">
        <img
          src="https://easycdn.blob.core.windows.net/images/flags/flag_vn.jpg"
          alt="VN Flag"
          className="h-4"
        />
        <ChevronDownIcon className="w-4 h-4" />
      </MenuButton>
      <Transition
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <MenuItem>
              {({ active }) => (
                <Link
                  to="/en-sg"
                  className={`${active ? "bg-gray-100" : ""} block px-4 py-2 text-sm`}
                >
                  Singapore
                </Link>
              )}
            </MenuItem>
            <MenuItem>
              {({ active }) => (
                <Link
                  to="/vi-vn"
                  className={`${active ? "bg-gray-100" : ""} block px-4 py-2 text-sm`}
                >
                  Việt Nam
                </Link>
              )}
            </MenuItem>
            <MenuItem>
              {({ active }) => (
                <Link
                  to="/th-th"
                  className={`${active ? "bg-gray-100" : ""} block px-4 py-2 text-sm`}
                >
                  Thái Lan
                </Link>
              )}
            </MenuItem>
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
};

// Component cho dropdown tài khoản
const AccountDropdown = () => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton className="inline-flex justify-center items-center gap-1 text-sm font-medium text-gray-700">
        {"Đăng nhập"} <ChevronDownIcon className="w-4 h-4" />
      </MenuButton>
      <Transition
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <MenuItem>
              {({ active }) => (
                <Link
                  to="/login"
                  className={`${active ? "bg-gray-100" : ""} block px-4 py-2 text-sm text-gray-700`}
                >
                  Đăng Nhập
                </Link>
              )}
            </MenuItem>
            <MenuItem>
              {({ active }) => (
                <Link
                  to="/signup"
                  className={`${active ? "bg-gray-100" : ""} block px-4 py-2 text-sm text-gray-700`}
                >
                  Đăng Ký
                </Link>
              )}
            </MenuItem>
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
};

export default function Header() {
  return (
    <div className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        {/* Logo section */}
        <div className="flex items-center space-x-4">
          <Link to="/">
            <img
              src="https://easycdn.blob.core.windows.net/images/easybook-logo-v3.png"
              alt="Easybook Logo"
              className="h-8"
            />
          </Link>
          <Link to="/">
            <img
              src="/images/sonphat/Sonphat-logo-full.png"
              alt="Sonphat Logo"
              className="hidden sm:block h-8"
            />
            <img
              src="/images/sonphat/Sonphat-logo.png"
              alt="Sonphat Logo"
              className="block sm:hidden h-8"
            />
          </Link>
        </div>

        {/* Navigation section */}
        <div className="flex items-center space-x-4">
          {/* App QR Code - hidden on mobile */}
          <Link
            to="#"
            className="hidden md:inline-block text-sm hover:underline"
            data-toggle="modal"
            data-target="#eaybook-app-qrcode"
          >
            <img src="/images/easybook-app-v4.svg" className="h-6" alt="App Icon" />
          </Link>

          <AccountDropdown />

          <Link to="/vi-vn/recentsearch" className="text-sm hover:underline hidden sm:inline-block">
            Tìm kiếm gần đây
          </Link>

          <CountryDropdown />
          <CurrencyDropdown />
          <LanguageDropdown />

          <Link to="/vi-vn/contact" className="text-sm hover:underline hidden md:inline-block">
            Liên Hệ
          </Link>
        </div>
      </div>
    </div>
  );
}