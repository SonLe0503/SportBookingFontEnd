/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Avatar, Button, Input, InputNumber, Modal, Select } from "antd";
import type { IField } from "../../../../store/fieldSlide";

// export interface IField {
//   fieldId: number;
//   fieldName: string;
//   location: string;
//   price: number;
//   description: string;
//   image: string;
//   ownerId: number;
//   type?: string | null;
//   openTime?: string | null;
//   closeTime?: string | null;
//   openDays?: string | null;
//   isFixedPrice?: boolean | null;
//   link?: string | null;
// }

interface ModalEditFieldProps {
  isOpenModalEdit: boolean;
  setIsOpenModalEdit: (value: boolean) => (void);
  data: IField | null;
}

const ModalEditField = (props: ModalEditFieldProps) => {
  const {isOpenModalEdit, setIsOpenModalEdit, data} = props;
  const [formData, setFormData] = useState<IField | null>(data);
  const handleCancel = () => {
    setIsOpenModalEdit(false);
  }
  const handleChange = (field: keyof IField, value: any) => {
    if (!formData) return;
    setFormData((prev) => prev ? ({...prev, [field]: value} as IField) : prev)
  }
  return (
    <>
    <Modal
      open={isOpenModalEdit}
      onCancel={handleCancel}
      footer={null}
      centered
      width={500}
      className="rounded-2xl"
    >
      <div className="flex flex-col gap-6">
        {/* Tiêu đề */}
        <div className="text-center text-[24px] font-bold text-gray-800">
          Chỉnh sửa sân
        </div>

        {/* Hình ảnh sân */}
        <div className="flex justify-center">
          <Avatar
            size={80}
            shape="square"
            src={formData?.image || "https://via.placeholder.com/100x80"}
          />
        </div>

        {/* Form chỉnh sửa */}
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
              parser={(value) => Number((value || "").replace(/\$\s?|(,*)/g, ""))}
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
                { value: "5-a-side", label: "5-a-side" },
                { value: "7-a-side", label: "7-a-side" },
              ]}
            />
          </div>
        </div>

        {/* Nút hành động */}
        <div className="flex justify-end gap-3">
          <Button onClick={handleCancel}>Hủy</Button>
          <Button type="primary">
            Lưu
          </Button>
        </div>
      </div>
    </Modal>
    </>
  )
}
export default ModalEditField;