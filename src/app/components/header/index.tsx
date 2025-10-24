import {
  logout,
  selectInfoLogin,
  selectIsLogin,
} from "../../../store/authSlide";
import { useAppDispatch } from "../../../store";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Drawer, message } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";

const Header = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const infoLogin = useSelector(selectInfoLogin);
  const isLogin = useSelector(selectIsLogin);

  const showDrawer = () => setOpen(true);
  const onClose = () => setOpen(false);

  const handleLogout = () => {
    dispatch(logout());
    message.success("Đăng xuất thành công!");
    onClose();
  };

  return (
    <>
      {/* 🔹 Header */}
      <div className="z-10 fixed flex items-center w-full h-[85px] justify-between pt-[10px] pb-[10px] px-[10px] bg-white shadow-md">
        {/* Avatar mở Drawer */}
        <div
          className="w-[55px] h-[55px] rounded-full bg-white shadow-md overflow-hidden cursor-pointer flex items-center justify-center"
          onClick={showDrawer}
        >
          <Avatar
            src="https://images.pexels.com/photos/29665443/pexels-photo-29665443.jpeg"
            size={45}
            icon={<UserOutlined />}
          />
        </div>

        {/* Logo hoặc icon bên phải */}
        <div className="flex items-center justify-center">
          <div className="w-[42px] h-[42px] bg-gray-200 rounded-full"></div>
        </div>
      </div>

      {/* 🔹 Drawer hiển thị thông tin người dùng */}
      <Drawer
        onClose={onClose}
        open={open}
        closable={false}
        title={
          <div className="text-center font-semibold text-lg">
            Thông tin tài khoản
          </div>
        }
      >
        {isLogin ? (
          <div className="flex flex-col items-center gap-4 mt-2">
            <Avatar
              size={100}
              src="https://images.pexels.com/photos/29665443/pexels-photo-29665443.jpeg"
              icon={<UserOutlined />}
            />
            <div className="flex flex-col items-center text-center">
              <div className="font-semibold text-lg text-gray-800">
                {infoLogin.email.split("@")[0]}
              </div>
              <div className="text-gray-500 text-sm">{infoLogin.email}</div>
              <div className="text-gray-600 text-sm mt-1">
                Vai trò: <span className="font-medium">{infoLogin.role}</span>
              </div>
            </div>

            <Button
              danger
              type="primary"
              icon={<LogoutOutlined />}
              onClick={handleLogout}
              className="mt-3 w-[150px]"
            >
              Đăng xuất
            </Button>
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-10">
            Bạn chưa đăng nhập.
          </div>
        )}
      </Drawer>
    </>
  );
};
export default Header;
