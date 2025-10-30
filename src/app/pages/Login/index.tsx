/* eslint-disable @typescript-eslint/no-explicit-any */
import { actionLogin } from "../../../store/authSlide";
import { useAppDispatch } from "../../../store";
import { Button, Form, Input, message, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import URL from "../../../constants/url";
import { EUserRole } from "../../../interface/app";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const handleLogin = async (values: any) => {
    setLoading(true);
    try {
      const res: any = await dispatch(actionLogin(values)).unwrap();
      const token = res?.data?.token;

      if (token) {
        message.success("Đăng nhập thành công");

        const decoded: any = jwtDecode(token);
        const role = decoded["role"];

        if (role === EUserRole.ADMIN) {
          navigate(URL.DashBoardAdmin);
        } else if (role === EUserRole.FACILITY_OWNER) {
          navigate(URL.DashBoard);
        } else {
          navigate(URL.HOME);
        }
      } else {
        message.error("Đăng nhập thất bại");
      }
    } catch (error: any) {
      message.error(error?.message || "Đăng nhập thất bại");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="w-[600px] bg-[#FFFFFF] shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-[15px] p-8 flex flex-col gap-6">
          <h2 className="text-4xl text-center text-blue-600 drop-shadow-md tracking-wide uppercase">
            Đăng nhập
          </h2>
          <Spin spinning={loading} tip="Đang đăng nhập...">
            <Form
              layout="vertical"
              className="flex flex-col gap-4"
              onFinish={handleLogin}
            >
              <Form.Item
                label="Tên đăng nhập"
                name="Username"
                rules={[
                  { required: true, message: "Vui lòng nhập tên đăng nhập!" },
                ]}
              >
                <Input size="large" className="rounded-[10px]" />
              </Form.Item>

              <Form.Item
                label="Mật khẩu"
                name="Password"
                rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
              >
                <Input.Password size="large" className="rounded-[10px]" />
              </Form.Item>
              <Button
                htmlType="submit"
                type="primary"
                size="large"
                className="w-full rounded-[10px] font-semibold"
              >
                Đăng nhập
              </Button>
            </Form>
          </Spin>
          <div className="text-[14px] text-center text-gray-500 flex justify-center">
            Chưa có tài khoản?{" "}
            <div
              className="text-blue-500 hover:underline cursor-pointer"
              onClick={() => navigate("/register")}
            >
              Đăng ký ngay
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
