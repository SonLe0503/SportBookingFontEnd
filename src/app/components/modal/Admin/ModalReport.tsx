/* eslint-disable @typescript-eslint/no-unused-vars */
import type { IFeedback } from "../../../../store/feedbackSlide";
import { Button, Input, message, Modal, Rate } from "antd";
import { useState } from "react";

interface ModalReportProps {
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
  feedback: IFeedback | null;
}
const ModalReport = (props: ModalReportProps) => {
  const { openModal, setOpenModal, feedback } = props;
  const [report, setReport] = useState("");
  const handleCancel = () => {
    setOpenModal(false);
    setReport("");
  };

  const handleSend = async () => {
    if (!report.trim()) {
      message.warning("Vui lòng nhập nội dung phản hồi!");
      return;
    }

    try {
      // 🟢 Sau này bạn có thể dispatch API ở đây, ví dụ:
      // await dispatch(actionReplyFeedback({ feedbackId: feedback?.feedbackId, content: report })).unwrap();
      message.success("Gửi phản hồi thành công!");
      handleCancel();
    } catch (err) {
      message.error("Gửi phản hồi thất bại!");
    }
  };

  return (
    <>
      <Modal
        open={openModal}
        onCancel={handleCancel}
        footer={null}
        centered
        width={600}
        className="rounded-2xl"
      >
        <div className="flex flex-col gap-5">
          {/* Tiêu đề */}
          <div className="text-center text-[20px] font-bold text-gray-800">
            Phản hồi khách hàng
          </div>

          {/* Thông tin feedback */}
          {feedback ? (
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 flex flex-col gap-2 text-[14px] text-gray-700">
              <div>
                <span className="font-semibold">Mã người dùng:</span>{" "}
                {feedback.userId}
              </div>
              <div>
                <span className="font-semibold">Mã sân:</span>{" "}
                {feedback.fieldId}
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">Đánh giá:</span>{" "}
                <Rate disabled defaultValue={feedback.rating} />
              </div>
              <div>
                <span className="font-semibold">Bình luận:</span>{" "}
                {feedback.comment}
              </div>
              <div className="text-gray-500 text-[12px] italic">
                Gửi lúc: {new Date(feedback.createdAt).toLocaleString("vi-VN")}
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 italic">
              Không có dữ liệu phản hồi.
            </div>
          )}

          {/* Ô nhập phản hồi admin */}
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
            <Button type="primary" onClick={handleSend} disabled={!feedback}>
              Gửi phản hồi
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default ModalReport;
