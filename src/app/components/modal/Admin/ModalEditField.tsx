/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Input,
  InputNumber,
  Modal,
  Select,
  Upload,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useAppDispatch } from "../../../../store";
import { actionUpdateField } from "../../../../store/fieldSlide";
import type { IField } from "../../../../store/fieldSlide";

interface ModalEditFieldProps {
  isOpenModalEdit: boolean;
  setIsOpenModalEdit: (value: boolean) => void;
  data: IField | null;
}

const ModalEditField = (props: ModalEditFieldProps) => {
  const { isOpenModalEdit, setIsOpenModalEdit, data } = props;
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState<IField | null>(data);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  // Khi dữ liệu thay đổi (khi mở modal mới)
  useEffect(() => {
    setFormData(data);
    setImageFile(null);
  }, [data]);

  const handleCancel = () => {
    setIsOpenModalEdit(false);
  };

  const handleChange = (field: keyof IField, value: any) => {
    if (!formData) return;
    setFormData((prev) =>
      prev ? ({ ...prev, [field]: value } as IField) : prev
    );
  };

  const handleUploadChange = (info: any) => {
    const file = info.file.originFileObj;
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        if (formData)
          setFormData({ ...formData, image: e.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!formData) return;
    setLoading(true);

    try {
      const updateData = {
        ...formData,
        imageFile: imageFile || undefined,
      };
      await dispatch(actionUpdateField(updateData)).unwrap();
      message.success("Cập nhật sân thành công!");
      setIsOpenModalEdit(false);
    } catch (error) {
      console.error(error);
      message.error("Cập nhật sân thất bại. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={isOpenModalEdit}
      onCancel={handleCancel}
      footer={null}
      centered
      width={520}
      destroyOnClose
      className="rounded-2xl"
    >
      <div className="flex flex-col gap-6">
        {/* Tiêu đề */}
        <div className="text-center text-[22px] font-bold text-gray-800">
          Chỉnh sửa sân
        </div>

        {/* Ảnh sân */}
        <div className="flex justify-center flex-col items-center gap-3">
          <Avatar
            size={100}
            shape="square"
            src={formData?.image || ""}
            icon={!formData?.image ? <UploadOutlined /> : undefined}
          />
          <Upload
            beforeUpload={() => false}
            onChange={handleUploadChange}
            maxCount={1}
            showUploadList={false}
          >
            <Button icon={<UploadOutlined />}>Tải ảnh mới</Button>
          </Upload>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Tên sân
            </label>
            <Input
              value={formData?.fieldName}
              onChange={(e) => handleChange("fieldName", e.target.value)}
              className="rounded-lg"
              placeholder="Nhập tên sân"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Địa chỉ
            </label>
            <Input
              value={formData?.location}
              onChange={(e) => handleChange("location", e.target.value)}
              className="rounded-lg"
              placeholder="Nhập địa chỉ"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Giá thuê (VNĐ/giờ)
            </label>
            <InputNumber
              value={formData?.price}
              onChange={(val) => handleChange("price", val)}
              className="w-full rounded-lg"
              min={0}
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) =>
                Number((value || "").replace(/\$\s?|(,*)/g, ""))
              }
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Loại sân
            </label>
            <Select
              value={formData?.type || undefined}
              onChange={(val) => handleChange("type", val)}
              className="w-full"
              options={[
                { value: "badminton", label: "Sân cầu lông" },
                { value: "football", label: "Sân bóng đá" },
                { value: "pickleball", label: "Sân Pickleball" },
              ]}
              placeholder="Chọn loại sân"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Mô tả
            </label>
            <Input.TextArea
              value={formData?.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="rounded-lg"
              rows={3}
              placeholder="Nhập mô tả về sân"
            />
          </div>
        </div>

        {/* Nút hành động */}
        <div className="flex justify-end gap-3 mt-2">
          <Button onClick={handleCancel}>Hủy</Button>
          <Button
            type="primary"
            loading={loading}
            onClick={handleSubmit}
            disabled={!formData?.fieldName || !formData?.location}
          >
            Lưu
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalEditField;
