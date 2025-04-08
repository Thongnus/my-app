import { useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

export default function Header() {
  const [language, setLanguage] = useState("Tiếng Việt");
  const [currency, setCurrency] = useState("VND");

  return (
    <div className="bg-white border-b shadow-sm ">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <a href="/vi-vn">
            <img
              src="https://easycdn.blob.core.windows.net/images/easybook-logo-v3.png"
              alt="Easybook Logo"
              className="h-8"
            />
          </a>
          <a href="/vi-vn">
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
          </a>
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
                      <a
                        href="/vi-vn/account/login"
                        className={`$${active ? "bg-gray-100" : ""} block px-4 py-2 text-sm text-gray-700`}
                      >
                        Đăng Nhập
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="/vi-vn/account/register"
                        className={`$${active ? "bg-gray-100" : ""} block px-4 py-2 text-sm text-gray-700`}
                      >
                        Đăng Ký
                      </a>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>

          <a href="/vi-vn/recentsearch" className="text-sm hover:underline">
            Tìm kiếm gần đây
          </a>

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
                    <a href="/en-sg" className="block px-4 py-2 text-sm">
                      Singapore
                    </a>
                  </Menu.Item>
                  <Menu.Item>
                    <a href="/vi-vn" className="block px-4 py-2 text-sm">
                      Việt Nam
                    </a>
                  </Menu.Item>
                  <Menu.Item>
                    <a href="/th-th" className="block px-4 py-2 text-sm">
                      Thái Lan
                    </a>
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
                    <a href="#" onClick={() => setCurrency("USD")} className="block px-4 py-2 text-sm">
                      USD - Đô la Mỹ
                    </a>
                  </Menu.Item>
                  <Menu.Item>
                    <a href="#" onClick={() => setCurrency("VND")} className="block px-4 py-2 text-sm">
                      VND - Đồng Việt Nam
                    </a>
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
                    <a href="#" onClick={() => setLanguage("Tiếng Việt")} className="block px-4 py-2 text-sm">
                      Tiếng Việt
                    </a>
                  </Menu.Item>
                  <Menu.Item>
                    <a href="#" onClick={() => setLanguage("English")} className="block px-4 py-2 text-sm">
                      English
                    </a>
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>

          <a href="/vi-vn/contact" className="text-sm hover:underline">
            Liên Hệ
          </a>
        </div>
      </div>
    </div>
  );
}
