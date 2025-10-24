/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppDispatch } from "../../../../store";
import { actionGetAccounts, actionUpdateAccount, type Account } from "../../../../store/accountSlide";
import { Avatar, Button, Input, message, Modal, Select, Spin } from "antd";
import { useEffect, useState } from "react";

interface ModalBookingProps {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  data: Account | null;
}
const ModalEditAccount = (props: ModalBookingProps) => {
  const {isModalOpen, setIsModalOpen, data} = props;
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<Account | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data) setFormData(data);  
  }, [data]);


  const handleChange = (key: string, value: string) => {
    setFormData((prev) => {
      if (!prev) return null;
      return { ...prev, [key]: value };
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSave = async () => {
    if (!formData?.userId) {
      message.error("Không tìm thấy ID người dùng!");
      return;
    }

    setLoading(true);
    try {
      await dispatch(
        actionUpdateAccount({
          userId: formData.userId,
          username: formData.username,
          email: formData.email,
          phone: formData.phone,
          role: formData.role,
          createdAt: formData.createdAt,
        })
      ).unwrap();

      message.success("Cập nhật tài khoản thành công!");
      setIsModalOpen(false);
      dispatch(actionGetAccounts()); // reload lại danh sách
    } catch (error: any) {
      message.error("Cập nhật thất bại!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Modal
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
      centered
      width={500}
      className="rounded-2xl"
    >
      <div className="flex flex-col gap-6">
        {/* Tiêu đề */}
        <div className="text-center text-[24px] font-bold text-gray-800">
          Chỉnh sửa tài khoản
        </div>

        {loading ? (
          <div className="flex justify-center py-8">
            <Spin />
          </div>
        ) : (
          <>
            {/* Avatar */}
            <div className="flex justify-center">
              <Avatar
                size={80}
                src={ "https://via.placeholder.com/80"}
              />
            </div>

            {/* Thông tin chỉnh sửa */}
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Tên người dùng
                </label>
                <Input
                  value={formData?.username || ""}
                  onChange={(e) => handleChange("username", e.target.value)}
                  className="rounded-lg"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Email
                </label>
                <Input
                  value={formData?.email || ""}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="rounded-lg"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Số điện thoại
                </label>
                <Input
                  value={formData?.phone || ""}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className="rounded-lg"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Vai trò (Role)
                </label>
                <Select
                  value={formData?.role}
                  onChange={(val) => handleChange("role", val)}
                  className="w-full"
                  options={[
                    { value: "ADMIN", label: "Admin" },
                    { value: "FACILITY", label: "Facility" },
                    { value: "USER", label: "User" },
                  ]}
                />
              </div>
            </div>

            {/* Nút hành động */}
            <div className="flex justify-end gap-3 mt-6">
              <Button onClick={handleCancel}>Hủy</Button>
              <Button type="primary" onClick={handleSave}>
                Lưu thay đổi
              </Button>
            </div>
          </>
        )}
      </div>
    </Modal>
    </>
  );
};
export default ModalEditAccount;
