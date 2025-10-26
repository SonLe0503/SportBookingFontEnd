/* eslint-disable @typescript-eslint/no-unused-vars */
import { useAppDispatch } from "../../../store";
import { actionCreateFeedback } from "../../../store/feedbackSlide";
import { message, Modal, Rate, Input, Form } from "antd";
import { useState } from "react";

interface ModalFeedbackProps {
  open: boolean;
  onClose: () => void;
  fieldId: number | null;
  userId: number;
}

const ModalFeedback = ({
  open,
  onClose,
  fieldId,
  userId,
}: ModalFeedbackProps) => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      await dispatch(
        actionCreateFeedback({
          userId,
          fieldId,
          rating: values.rating,
          comment: values.comment,
        })
      ).unwrap();

      message.success("Đánh giá thành công!");
      onClose();
      form.resetFields();
    } catch (err) {
      message.error("Không thể gửi đánh giá. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Đánh giá sân"
      open={open}
      onCancel={onClose}
      onOk={handleSubmit}
      confirmLoading={loading}
      okText="Gửi đánh giá"
      cancelText="Huỷ"
    >
      <Form layout="vertical" form={form}>
        <Form.Item
          label="Chất lượng sân"
          name="rating"
          rules={[{ required: true, message: "Vui lòng chọn số sao!" }]}
        >
          <Rate />
        </Form.Item>

        <Form.Item
          label="Nhận xét"
          name="comment"
          rules={[{ required: true, message: "Vui lòng nhập nhận xét!" }]}
        >
          <Input.TextArea
            rows={4}
            placeholder="Sân có thoải mái không, giá cả thế nào..."
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalFeedback;
