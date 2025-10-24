import { selectInfoLogin } from "../../../store/authSlide";
import URL from "../../../constants/url";
import {
  HomeOutlined,
  EnvironmentOutlined,
  MessageOutlined,
  ScheduleOutlined,
  AppstoreOutlined,
  UserOutlined,
  BarsOutlined,
  FundViewOutlined,
  FileProtectOutlined,
} from "@ant-design/icons";
import { useState, type JSX } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";


const Sidebar = () => {
  const infoLogin = useSelector(selectInfoLogin);
  const navigate = useNavigate();
  const location = useLocation();
  const [isHovered, setIsHovered] = useState(false);
  const MENU_BY_ROLE: Record<
    string,
    { icon: JSX.Element; label: string; path: string }[]
  > = {
    ADMIN: [
      {icon: <AppstoreOutlined />, label: "Tổng quan", path: URL.DashBoardAdmin},
      {icon: <UserOutlined />, label: "Quản lý tài khoản", path: URL.ManageAccount},
      {icon: <BarsOutlined />, label: "Quản lý sân", path: URL.ManageField},
      {icon: <FundViewOutlined />, label: "Thống kê", path: URL.ReportAdmin}
    ],
    FACILITY_OWNER: [
      {icon: <AppstoreOutlined />, label: "Tổng quan", path: URL.DashBoard},
      {icon: <BarsOutlined />, label: "Quản lý sân", path: URL.ManageFieldOwner},
      {icon: <FileProtectOutlined />, label: "Quản lý đặt lich", path: URL.ManageBooking},
      {icon: <FundViewOutlined />, label: "Thống kê", path: URL.Report},
    ],
    USER: [
      { icon: <HomeOutlined />, label: "Trang chủ", path: URL.HOME },
      { icon: <EnvironmentOutlined />, label: "Bản đồ", path: "" },
      { icon: <MessageOutlined />, label: "Chat group", path: "" },
      {
        icon: <ScheduleOutlined />,
        label: "Đặt lịch",
        path: URL.BookingHistory,
      },
    ],
  };

  const role = infoLogin?.role;
  const menus = MENU_BY_ROLE[role] || [];
  return (
    <div
      className={`z-10 fixed flex flex-col mx-2 my-2 max-h-full rounded-[15px] bg-[#FFFFFF] shadow-[0_3px_10px_rgb(0,0,0,0.2)] pt-[15px] pb-[15px] transition-all items-center
    ${isHovered ? "w-[190px]" : "w-[60px]"}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`flex flex-col gap-[10px] transition-all  ${
          isHovered ? "w-[170px]" : "w-[40px]"
        }`}
      >
        {menus.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <div
              key={index}
              onClick={() => navigate(item.path)}
              className={`flex h-[40px] items-center rounded-[10px] cursor-pointer transition-all ${
                isHovered ? "pl-5" : "justify-center"
              } ${
                isActive
                  ? "bg-blue-100 text-blue-600"
                  : "bg-[#F2F2F7] text-gray-700"
              }`}
            >
              {item.icon}
              {isHovered && (
                <span className="text-[14px] pl-2 text-gray-700">
                  {item.label}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Sidebar;
