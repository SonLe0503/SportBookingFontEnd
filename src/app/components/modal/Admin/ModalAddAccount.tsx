import { actionCreateAccount } from "../../../../store/accountSlide";
import { useAppDispatch } from "../../../../store";
import { Button, Form, Input, message, Modal, Select } from "antd";
import { useState } from "react";
import { EUserRole } from "@/interface/app";

interface ModalAddAccountProps {
  modalAddOpen: boolean;
  setModalAddOpen: (value: boolean) => void;
}
const ModalAddAccount = (props: ModalAddAccountProps) => {
  const { modalAddOpen, setModalAddOpen } = props;
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      const payload = {
        username: values.username,
        password: values.password,
        email: values.email,
        phone: values.phone,
        role: values.role,
      };

      await dispatch(actionCreateAccount(payload)).unwrap();

      message.success("Tạo tài khoản thành công!");
      form.resetFields();
      setModalAddOpen(false);
    } catch (err) {
      console.error(err);
      message.error("Không thể tạo tài khoản. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setModalAddOpen(false);
  };
  return (
    <>
      <Modal
        open={modalAddOpen}
        onCancel={handleCancel}
        footer={null}
        centered
        width={480}
        className="rounded-xl"
      >
        <div className="text-center text-lg font-semibold mb-4">
          Thêm tài khoản mới
        </div>
        <Form layout="vertical" form={form}>
          <Form.Item
            name="username"
            label="Tên đăng nhập"
            rules={[{ required: true, message: "Vui lòng nhập tên đăng nhập" }]}
          >
            <Input placeholder="Nhập tên đăng nhập" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Mật khẩu"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
          >
            <Input.Password placeholder="Nhập mật khẩu" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Vui lòng nhập email" },
              { type: "email", message: "Email không hợp lệ" },
            ]}
          >
            <Input placeholder="Nhập email" />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Số điện thoại"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại" },
              {
                pattern: /^[0-9]{9,11}$/,
                message: "Số điện thoại không hợp lệ",
              },
            ]}
          >
            <Input placeholder="Nhập số điện thoại" />
          </Form.Item>

          <Form.Item
            name="role"
            label="Vai trò"
            rules={[{ required: true, message: "Vui lòng chọn vai trò" }]}
          >
            <Select
              placeholder="Chọn vai trò"
              options={[
                { label: "Người dùng", value: EUserRole.USER },
                { label: "Chủ sân", value: EUserRole.FACILITY_OWNER },
                { label: "Quản trị viên", value: EUserRole.ADMIN },
              ]}
            />
          </Form.Item>

          <div className="flex justify-end gap-3 mt-4">
            <Button onClick={handleCancel}>Hủy</Button>
            <Button type="primary" loading={loading} onClick={handleOk}>
              Thêm mới
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
};
export default ModalAddAccount;
