import {
  logout,
  selectInfoLogin,
  selectIsLogin,
} from "../../../store/authSlide";
import { useAppDispatch } from "../../../store";
import {
  LoginOutlined,
  LogoutOutlined,
  UploadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Drawer, message } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import logo from "../../../assets/image/sportspace_logo.jpeg";
import projectIntroImg from "../../../assets/image/projectIntroImg.jpg";
import badmintonImg from "../../../assets/image/badmintonImg.png";
import footballImg from "../../../assets/image/footballImg.jpg";
import pickleballImg from "../../../assets/image/pickleballImg.jpg";
import { useNavigate } from "react-router-dom";
import URL from "../../../constants/url";
import { actionUploadAvatar } from "../../../store/accountSlide";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [openIntro, setOpenIntro] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const infoLogin = useSelector(selectInfoLogin);
  const isLogin = useSelector(selectIsLogin);

  const showDrawer = () => setOpen(true);
  const onClose = () => setOpen(false);

  const handleLogout = () => {
    dispatch(logout());
    message.success("Đăng xuất thành công!");
    onClose();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      dispatch(actionUploadAvatar(file));
    }
  };

  // 🔹 Khi click logo -> mở Drawer giới thiệu
  const handleOpenIntro = () => {
    setOpenIntro(true);
  };

  const handleCloseIntro = () => {
    setOpenIntro(false);
  };

  return (
    <>
      {/* 🔹 Header */}
      <div className="z-20 fixed flex items-center justify-between w-full h-[80px] px-6 backdrop-blur-md border-b border-gray-100">
        {/* Avatar mở Drawer */}
        <div
          className="w-[55px] h-[55px] rounded-full bg-gradient-to-tr from-[#00B14F] to-[#00E09E] p-[2px] cursor-pointer hover:scale-105 transition-transform"
          onClick={showDrawer}
        >
          <div className="w-full h-full bg-white rounded-full flex items-center justify-center overflow-hidden">
            <Avatar
              src={isLogin ? `https://sportspace.io.vn${infoLogin?.avatar}` : ""}
              icon={<UserOutlined />}
              size={45}
            />
          </div>
        </div>

        {/* Logo */}
        <div className="flex items-center justify-center">
          <div
            onClick={handleOpenIntro}
            className="w-[60px] h-[60px] rounded-full bg-white shadow-lg overflow-hidden flex items-center justify-center border-[3px] border-[#00B14F] hover:shadow-green-200 hover:scale-105 transition-all duration-300">
            <img
              src={logo}
              alt="SportSpace logo"
              className="w-full h-full object-cover transition-transform duration-300 hover:rotate-6"
            />
          </div>
        </div>
      </div>

      {/* 🔹 Drawer hiển thị thông tin người dùng */}
      <Drawer
        onClose={onClose}
        open={open}
        closable={false}
        title={
          <div className="text-center font-semibold text-[18px]">
            Thông tin tài khoản
          </div>
        }
      >
        {isLogin ? (
          <div className="flex flex-col items-center gap-4 mt-4">
            <Avatar
              size={100}
              src={`https://sportspace.io.vn${infoLogin?.avatar}`}
              icon={<UserOutlined />}
              className="shadow-lg border-[3px] border-[#00B14F]"
            />
            {!infoLogin?.avatar && (
              <div className="mt-2">
                <input
                  type="file"
                  id="avatarUpload"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
                <Button
                  icon={<UploadOutlined />}
                  onClick={() =>
                    document.getElementById("avatarUpload")?.click()
                  }
                  className="bg-[#00B14F] hover:bg-[#00E09E] text-white font-medium rounded-lg shadow-sm border-none"
                >
                  Cập nhật ảnh đại diện
                </Button>
              </div>
            )}

            <div className="flex flex-col items-center text-center">
              <div className="font-semibold text-lg text-gray-800">
                {infoLogin?.username?.split("@")[0]}
              </div>
              <div className="text-gray-500 text-sm">{infoLogin.username}</div>
              <div className="text-gray-600 text-sm mt-1">
                Vai trò:{" "}
                <span className="font-medium text-[#00B14F]">
                  {infoLogin.role}
                </span>
              </div>
            </div>

            <Button
              danger
              type="primary"
              icon={<LogoutOutlined />}
              onClick={handleLogout}
              className="mt-4 w-[150px] bg-[#00B14F] border-none hover:bg-[#00E09E] text-white font-medium rounded-xl shadow-md"
            >
              Đăng xuất
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center mt-10 space-y-4 px-4">
            <Avatar
              size={90}
              icon={<UserOutlined />}
              className="shadow-md border border-gray-200"
            />

            <div className="text-gray-700 font-medium text-base">
              Bạn chưa đăng nhập tài khoản!
            </div>
            <div className="text-gray-500 text-sm leading-relaxed">
              Hãy đăng nhập để trải nghiệm đầy đủ các tính năng như đặt sân,
              đánh giá, lưu sân yêu thích và nhiều hơn nữa.
            </div>

            <Button
              type="primary"
              icon={<LoginOutlined />}
              onClick={() => navigate(URL.Login)}
              className="mt-2 w-[180px] bg-[#00B14F] border-none hover:bg-[#00E09E] text-white font-medium rounded-xl shadow-md"
            >
              Đăng nhập ngay
            </Button>
          </div>
        )}
      </Drawer>
      {/* 🔹 Drawer giới thiệu dự án */}
      <Drawer
        placement="bottom" // 👉 đổi thành "top" nếu bạn muốn mở từ trên xuống
        height="85vh"
        onClose={handleCloseIntro}
        open={openIntro}
        closable={false}
      >
        <div className="px-6 py-4 text-center space-y-8">
          {/* 🟩 Nội dung 1: Giới thiệu dự án */}
          <div>
            <h2 className="text-2xl font-bold text-[#00B14F] mb-3">
              🌐 Giới thiệu dự án SportSpace
            </h2>
            <p className="text-gray-700 leading-relaxed text-base">
              Dự án web <span className="font-semibold">SportSpace</span> được phát triển nhằm mang đến
              một nền tảng đặt sân thể thao trực tuyến tiện lợi — nơi người dùng có thể
              dễ dàng tìm kiếm, đặt sân cầu lông, bóng đá, Pickleball và nhiều môn thể thao khác
              phù hợp với mọi lứa tuổi.
            </p>

            {/* 🖼️ Chỗ trống để bạn chèn ảnh minh họa dự án */}
            <div className="relative w-full h-[200px] bg-gray-100 mt-4 rounded-xl overflow-hidden shadow-sm hover:scale-[1.02] transition-transform duration-300">
              {projectIntroImg ? (
                <img
                  src={projectIntroImg}
                  alt="Giới thiệu dự án SportSpace"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400 italic">
                  (Ảnh giới thiệu dự án – thêm sau)
                </div>
              )}
            </div>
          </div>

          {/* 🟩 Nội dung 2: Giới thiệu các môn thể thao */}
          <div>
            <h2 className="text-2xl font-bold text-[#00B14F] mb-3">
              ⚽ Các môn thể thao nổi bật
            </h2>
            <p className="text-gray-700 leading-relaxed text-base mb-4">
              Tại SportSpace, người dùng có thể tham gia nhiều hoạt động thể thao hấp dẫn:
            </p>

            <ul className="space-y-3 text-gray-700">
              <li>
                🏸 <strong>Cầu lông</strong>: Môn thể thao nhẹ nhàng, rèn luyện phản xạ
                và phù hợp với mọi lứa tuổi.
              </li>
              <li>
                ⚽ <strong>Bóng đá</strong>: Gắn kết đồng đội, mang lại niềm vui và năng lượng cho mỗi trận đấu.
              </li>
              <li>
                🥒 <strong>Pickleball</strong>: Môn thể thao kết hợp giữa quần vợt và bóng bàn –
                đang trở thành xu hướng mới trên toàn cầu.
              </li>
            </ul>

            {/* 🖼️ Các khung trống cho ảnh từng môn */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              <div className="relative bg-gray-100 h-[120px] rounded-lg overflow-hidden shadow-sm hover:scale-105 transition-transform duration-300">
                {badmintonImg ? (
                  <img
                    src={badmintonImg}
                    alt="Cầu lông"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400 italic">
                    (Ảnh cầu lông)
                  </div>
                )}
              </div>
              <div className="relative bg-gray-100 h-[120px] rounded-lg overflow-hidden shadow-sm hover:scale-105 transition-transform duration-300">
                {footballImg ? (
                  <img
                    src={footballImg}
                    alt="Bóng đá"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400 italic">
                    (Ảnh bóng đá)
                  </div>
                )}
              </div>
              <div className="relative bg-gray-100 h-[120px] rounded-lg overflow-hidden shadow-sm hover:scale-105 transition-transform duration-300">
                {pickleballImg ? (
                  <img
                    src={pickleballImg}
                    alt="Pickleball"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400 italic">
                    (Ảnh Pickleball)
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
};
export default Header;
