/* eslint-disable @typescript-eslint/no-explicit-any */
import { actionCreateField } from "../../../../store/fieldSlide";
import { useAppDispatch } from "../../../../store";
import { selectInfoLogin } from "../../../../store/authSlide";
import { Button, Form, Input, message, Modal, Upload } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import { UploadOutlined } from "@ant-design/icons";

interface ModalRegisterFieldProps {
  openRegisterField: boolean;
  setOpenRegisterField: (value: boolean) => void;
}
const ModalRegisterField = (props: ModalRegisterFieldProps) => {
  const { openRegisterField, setOpenRegisterField } = props;
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const [fileList, setFileList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const infoLogin = useSelector(selectInfoLogin);
  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (!infoLogin?.userId) {
        message.error("Không xác định được người sở hữu sân");
        return;
      }

      setLoading(true);

      // chuẩn bị dữ liệu
      const data = {
        fieldName: values.name,
        location: values.address,
        price: values.fixed || values.notfixed || 0,
        description: `${values.type || ""} | ${values.day || ""} | ${values.time || ""}`,
        ownerId: infoLogin.userId,
        imageFile: fileList[0]?.originFileObj || null,
      };

      // gọi Redux action
      const res = await dispatch(actionCreateField(data)).unwrap();
      message.success("Đăng ký sân thành công!");
      console.log("Tạo sân thành công:", res);

      form.resetFields();
      setFileList([]);
      setOpenRegisterField(false);
    } catch (err) {
      console.error("Lỗi tạo sân:", err);
      message.error("Đăng ký sân thất bại. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };
  const handleCancel = () => {
    form.resetFields();
    setFileList([]);
    setOpenRegisterField(false);
  }

  const uploadProps = {
    beforeUpload: () => false, // ngăn upload tự động
    onChange: (info: any) => setFileList(info.fileList),
    fileList,
  };

  return (
    <>
     <Modal
      open={openRegisterField}
      onCancel={handleCancel}
      footer={null}
      centered
      width={520}
      className="rounded-2xl"
    >
      <div className="flex flex-col gap-6">
        {/* Tiêu đề */}
        <div className="text-center text-[22px] font-bold text-gray-800">
          Đăng ký sân mới
        </div>

        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Tên sân" rules={[{ required: true, message: "Vui lòng nhập tên sân" }]}>
            <Input placeholder="Nhập tên sân" />
          </Form.Item>

          <Form.Item name="type" label="Loại sân">
            <Input placeholder="VD: Bóng đá, Cầu lông..." />
          </Form.Item>

          <Form.Item name="address" label="Địa chỉ" rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}>
            <Input placeholder="Nhập địa chỉ sân" />
          </Form.Item>

          <Form.Item name="fixed" label="Giá cố định">
            <Input placeholder="VD: 80,000 VND" />
          </Form.Item>

          <Form.Item name="notfixed" label="Giá không cố định">
            <Input placeholder="VD: 90,000 VND" />
          </Form.Item>

          <Form.Item name="time" label="Thời gian mở cửa">
            <Input placeholder="VD: 06:00 - 22:00" />
          </Form.Item>

          <Form.Item name="day" label="Ngày hoạt động">
            <Input placeholder="VD: T2 - CN" />
          </Form.Item>

          <Form.Item name="link" label="Link tham khảo">
            <Input placeholder="Dán link Google Maps hoặc Website" />
          </Form.Item>

          <Form.Item name="image" label="Ảnh đại diện">
            <Upload {...uploadProps} maxCount={1} listType="picture">
              <Button icon={<UploadOutlined />}>Chọn ảnh từ máy</Button>
            </Upload>
          </Form.Item>
        </Form>

        {/* Nút hành động */}
        <div className="flex justify-end gap-3">
          <Button onClick={handleCancel}>Hủy</Button>
          <Button type="primary" loading={loading} onClick={handleOk}>
            Xác nhận
          </Button>
        </div>
      </div>
    </Modal>
    </>
  )
}
export default ModalRegisterField;