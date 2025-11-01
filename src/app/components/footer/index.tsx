import { FacebookFilled, InstagramFilled } from "@ant-design/icons";
import logo from "../../../assets/image/sportspace_logo.jpeg";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-900 via-purple-800 to-indigo-900 animate-gradient-x text-gray-300 py-6 mt-auto shadow-lg border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">

        {/* Logo + mô tả */}
        <div className="flex items-center gap-3">
          {/* Khung ảnh sẵn */}
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md">
            <img
              src={logo} // 👉 Thay bằng đường dẫn logo của bạn
              alt="SportSpace Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">SportSpace</h2>
            <p className="text-sm text-gray-300">
              Kết nối, chơi và tận hưởng thể thao mọi lúc.
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex gap-6 text-sm">
          <a href="#" className="hover:text-white transition">Về chúng tôi</a>
          <a href="#" className="hover:text-white transition">Điều khoản</a>
          <a href="#" className="hover:text-white transition">Chính sách</a>
          <a href="#" className="hover:text-white transition">Liên hệ</a>
        </div>

        {/* Social Links */}
        <div className="flex gap-5 text-2xl">
          <a
            href="https://www.facebook.com/profile.php?id=61581499600672"
            target="_blank"
            className="text-gray-300 hover:text-blue-500 transition"
          >
            <FacebookFilled />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            className="text-gray-300 hover:text-pink-500 transition"
          >
            <InstagramFilled />
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} SportSpace. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
