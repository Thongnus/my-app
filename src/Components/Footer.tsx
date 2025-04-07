const Footer = () => {
  const footerLinks = [
    {
      title: "Về EasyBook",
      links: ["Giới thiệu", "Tuyển dụng", "Điều khoản", "Chính sách bảo mật"]
    },
    {
      title: "Hỗ trợ",
      links: ["Trung tâm trợ giúp", "Liên hệ", "Hướng dẫn đặt vé", "Câu hỏi thường gặp"]
    },
    {
      title: "Đối tác",
      links: ["Nhà xe", "Đại lý", "Hợp tác với chúng tôi"]
    },
    {
      title: "Tải ứng dụng",
      links: ["App Store", "Google Play"]
    }
  ];

  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {footerLinks.map((section, index) => (
            <div key={index}>
              <h3 className="text-lg font-bold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href="#" className="text-gray-300 hover:text-white">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} EasyBook Vietnam. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;