import { message, Modal, Radio, Typography, Image } from "antd";
import { useAppDispatch } from "../../../store";
import { useState } from "react";
import { actionCreatePayment } from "../../../store/paymentSlide";


interface ModalPaymentProps {
  isOpen: boolean;
  onClose: () => void;
  bookingId: number;
  totalPrice: number;
}

const ModalPayment = ({ isOpen, onClose, bookingId, totalPrice }: ModalPaymentProps) => {
  const [method, setMethod] = useState<"QR" | "COD" | "">("");
  const dispatch = useAppDispatch();

  const handlePayment = async () => {
    if (!method) {
      message.warning("Vui lòng chọn phương thức thanh toán");
      return;
    }

    try {
      await dispatch(
        actionCreatePayment({
          bookingId,
          paymentDate: new Date().toISOString(),
          amount: totalPrice,
          paymentMethod: method,
          status: method === "QR" ? "PAID" : "PENDING",
        })
      ).unwrap();

      message.success("Thanh toán thành công!");
      onClose();
    } catch (err) {
      console.error(err);
      message.error("Lỗi khi tạo thanh toán!");
    }
  };

  return (
    <Modal
      title="Phương thức thanh toán"
      open={isOpen}
      onCancel={onClose}
      onOk={handlePayment}
      okText="Xác nhận thanh toán"
      cancelText="Hủy"
    >
      <div className="flex flex-col gap-4">
        <Typography.Text strong>
          Tổng tiền:{" "}
          <span className="text-red-500">{totalPrice.toLocaleString()}đ</span>
        </Typography.Text>

        <Radio.Group
          onChange={(e) => setMethod(e.target.value)}
          value={method}
          className="flex flex-col gap-2"
        >
          <Radio value="QR">Thanh toán qua QR</Radio>
          <Radio value="COD">Thanh toán khi nhận sân (COD)</Radio>
        </Radio.Group>

        {method === "QR" && (
          <div className="flex flex-col items-center mt-4">
            <Typography.Text>Quét mã QR để thanh toán</Typography.Text>
            <Image
              src="/qr-demo.png" // 🧠 Đặt ảnh QR thật tại public/qr-demo.png
              alt="QR code"
              width={200}
              preview={false}
              className="border border-gray-300 rounded-md mt-2"
            />
            <Typography.Text type="secondary" className="mt-2 text-center">
              Quét mã bằng ứng dụng ngân hàng hoặc ví điện tử để thanh toán{" "}
              {totalPrice.toLocaleString()}đ.
            </Typography.Text>
          </div>
        )}

        {method === "COD" && (
          <div className="mt-4 bg-gray-50 p-3 rounded-md border">
            <Typography.Text>
              Bạn sẽ thanh toán trực tiếp khi đến sân.  
              Vui lòng đến đúng giờ để đảm bảo giữ sân.
            </Typography.Text>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ModalPayment;