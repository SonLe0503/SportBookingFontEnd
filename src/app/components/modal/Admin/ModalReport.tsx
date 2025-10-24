import { Button, Input, Modal } from "antd";
import { useState } from "react";

interface ModalReportProps {
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
}
const ModalReport = (props: ModalReportProps) => {
  const { openModal, setOpenModal } = props;
  const [report, setReport] = useState("");
  const handleCancel = () => {
    setOpenModal(false);
    setReport("");
  };
  return (
    <>
      <Modal
        open={openModal}
        onCancel={handleCancel}
        footer={null}
        centered
        width={500}
        className="rounded-2xl"
      >
        <div className="flex flex-col gap-6">
        {/* Tiêu đề */}
        <div className="text-center text-[20px] font-bold text-gray-800">
          Phản hồi khách hàng
        </div>

        {/* Ô nhập feedback */}
        <Input.TextArea
          rows={5}
          value={report}
          onChange={(e) => setReport(e.target.value)}
          placeholder="Nhập phản hồi của bạn..."
          className="rounded-lg"
        />

        {/* Nút hành động */}
        <div className="flex justify-end gap-3">
          <Button onClick={handleCancel}>Hủy</Button>
          <Button type="primary">
            Gửi phản hồi
          </Button>
        </div>
        </div>
      </Modal>
    </>
  );
};
export default ModalReport;
