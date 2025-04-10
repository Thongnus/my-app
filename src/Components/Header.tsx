import { useState } from "react";
import { Link } from "react-router-dom"; // Thêm Link từ react-router-dom
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

export default function Header() {
  const [language, setLanguage] = useState("Tiếng Việt");
  const [currency, setCurrency] = useState("VND");

  return (
    <div className="bg-white border-b shadow-sm">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
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

        <div className="flex items-center space-x-4">
          <a
            href="#"
            className="hidden md:inline-block text-sm hover:underline"
            data-toggle="modal"
            data-target="#eaybook-app-qrcode"
          >
            <img src="/images/easybook-app-v4.svg" className="h-6" alt="App Icon" />
          </a>

          <Menu as="div" className="relative inline-block text-left">
            <Menu.Button className="inline-flex justify-center items-center gap-1 text-sm font-medium text-gray-700">
              {"Đăng nhập"} <ChevronDownIcon className="w-4 h-4" />
            </Menu.Button>
            <Transition
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/login"
                        className={`${active ? "bg-gray-100" : ""} block px-4 py-2 text-sm text-gray-700`}
                      >
                        Đăng Nhập
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/signup"
                        className={`${active ? "bg-gray-100" : ""} block px-4 py-2 text-sm text-gray-700`}
                      >
                        Đăng Ký
                      </Link>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>

          <Link to="/recentsearch" className="text-sm hover:underline">
            Tìm kiếm gần đây
          </Link>

          <Menu as="div" className="relative inline-block text-left">
            <Menu.Button className="inline-flex justify-center items-center gap-1 text-sm font-medium text-gray-700">
              <img
                src="https://easycdn.blob.core.windows.net/images/flags/flag_vn.jpg"
                alt="VN Flag"
                className="h-4"
              />
              <ChevronDownIcon className="w-4 h-4" />
            </Menu.Button>
            <Transition
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/en-sg"
                        className={`${active ? "bg-gray-100" : ""} block px-4 py-2 text-sm text-gray-700`}
                      >
                        Singapore
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/vi-vn"
                        className={`${active ? "bg-gray-100" : ""} block px-4 py-2 text-sm text-gray-700`}
                      >
                        Việt Nam
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/th-th"
                        className={`${active ? "bg-gray-100" : ""} block px-4 py-2 text-sm text-gray-700`}
                      >
                        Thái Lan
                      </Link>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>

          <Menu as="div" className="relative inline-block text-left">
            <Menu.Button className="inline-flex justify-center items-center gap-1 text-sm font-medium text-gray-700">
              {currency} <ChevronDownIcon className="w-4 h-4" />
            </Menu.Button>
            <Transition
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => setCurrency("USD")}
                        className={`${active ? "bg-gray-100" : ""} block px-4 py-2 text-sm text-gray-700 w-full text-left`}
                      >
                        USD - Đô la Mỹ
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => setCurrency("VND")}
                        className={`${active ? "bg-gray-100" : ""} block px-4 py-2 text-sm text-gray-700 w-full text-left`}
                      >
                        VND - Đồng Việt Nam
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>

          <Menu as="div" className="relative inline-block text-left">
            <Menu.Button className="inline-flex justify-center items-center gap-1 text-sm font-medium text-gray-700">
              {language} <ChevronDownIcon className="w-4 h-4" />
            </Menu.Button>
            <Transition
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => setLanguage("Tiếng Việt")}
                        className={`${active ? "bg-gray-100" : ""} block px-4 py-2 text-sm text-gray-700 w-full text-left`}
                      >
                        Tiếng Việt
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => setLanguage("English")}
                        className={`${active ? "bg-gray-100" : ""} block px-4 py-2 text-sm text-gray-700 w-full text-left`}
                      >
                        English
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>

          <Link to="/contact" className="text-sm hover:underline">
            Liên Hệ
          </Link>
        </div>
      </div>
    </div>
  );
}