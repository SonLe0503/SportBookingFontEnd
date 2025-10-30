/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { actionRegister } from "../../../store/authSlide";
import { useAppDispatch } from "../../../store";
import { Button, Form, Input, message, Select, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { EUserRole } from "../../../interface/app";
import { useState } from "react";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false); // ✅ Thêm state loading

  const handleSubmit = async (values: any) => {
    setLoading(true); // ✅ Bật loading khi bắt đầu
    try {
      const payload = {
        username: values.username,
        password: values.password,
        email: values.email,
        phone: values.phone,
        role: values.role,
      };

      const res: any = await dispatch(actionRegister(payload));

      if (res.meta.requestStatus === "fulfilled") {
        message.success("Đăng ký thành công! Hãy đăng nhập để tiếp tục.");
        navigate("/login");
      } else {
        message.error("Đăng ký thất bại. Vui lòng thử lại!");
      }
    } catch (error) {
      message.error("Đã xảy ra lỗi khi đăng ký!");
    } finally {
      setLoading(false); // ✅ Tắt loading khi hoàn tất
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="w-[600px] bg-[#FFFFFF] shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-[15px] p-8 flex flex-col gap-6">
          <h2 className="text-4xl text-center text-blue-600 drop-shadow-md tracking-wide uppercase">
            Đăng ký tài khoản
          </h2>

          {/* ✅ Hiệu ứng loading trong khi đăng ký */}
          <Spin spinning={loading} tip="Đang xử lý...">
            <Form
              layout="vertical"
              className="flex flex-col gap-4"
              onFinish={handleSubmit}
              initialValues={{ role: EUserRole.USER }}
            >
              <Form.Item
                label="Tên đăng nhập"
                name="username"
                rules={[
                  { required: true, message: "Vui lòng nhập tên đăng nhập!" },
                ]}
              >
                <Input size="large" className="rounded-[10px]" />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Vui lòng nhập email!" },
                  { type: "email", message: "Email không hợp lệ!" },
                ]}
              >
                <Input size="large" className="rounded-lg" />
              </Form.Item>

              <Form.Item
                label="Mật khẩu"
                name="password"
                rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
              >
                <Input.Password size="large" className="rounded-[10px]" />
              </Form.Item>

              <Form.Item
                label="Xác nhận mật khẩu"
                name="confirmPassword"
                dependencies={["password"]}
                rules={[
                  { required: true, message: "Vui lòng nhập lại mật khẩu!" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Mật khẩu nhập lại không khớp!")
                      );
                    },
                  }),
                ]}
              >
                <Input.Password size="large" className="rounded-[10px]" />
              </Form.Item>

              <Form.Item
                label="Số điện thoại"
                name="phone"
                rules={[
                  { required: true, message: "Vui lòng nhập số điện thoại!" },
                  {
                    pattern: /^[0-9]{9,11}$/,
                    message: "Số điện thoại phải có 9–11 chữ số!",
                  },
                ]}
              >
                <Input size="large" className="rounded-[10px]" />
              </Form.Item>

              <Form.Item
                name="role"
                label="Vai trò"
                rules={[{ required: true, message: "Chọn vai trò" }]}
              >
                <Select placeholder="Chọn vai trò">
                  <Select.Option value={EUserRole.FACILITY_OWNER}>
                    Chủ cơ sở
                  </Select.Option>
                  <Select.Option value={EUserRole.USER}>
                    Người chơi
                  </Select.Option>
                </Select>
              </Form.Item>

              <Button
                type="primary"
                size="large"
                htmlType="submit"
                className="w-full rounded-[10px] font-semibold"
                loading={loading} // ✅ loading trực tiếp trên nút
              >
                Đăng ký
              </Button>
            </Form>
          </Spin>

          <div className="text-sm text-center text-gray-500 flex justify-center">
            Đã có tài khoản?{" "}
            <div
              className="text-green-600 hover:underline cursor-pointer ml-1"
              onClick={() => navigate("/login")}
            >
              Đăng nhập
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
