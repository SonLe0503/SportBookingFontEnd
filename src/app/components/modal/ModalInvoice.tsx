import { Modal, Descriptions, Spin, Tag } from "antd";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../store";
import {
  actionGetBooking,
  selectBookingDetail,
} from "../../../store/bookingSlide";
import {
  actionGetPayment,
  selectPaymentDetail,
} from "../../../store/paymentSlide";
import dayjs from "dayjs";

interface ModalInvoiceProps {
  open: boolean;
  onClose: () => void;
  bookingId: number | null;
  paymentId?: number;
}

const ModalInvoice = ({ open, onClose, bookingId, paymentId }: ModalInvoiceProps) => {
  const dispatch = useAppDispatch();
  const booking = useSelector(selectBookingDetail);
  const payment = useSelector(selectPaymentDetail);
  const loading = !booking || !payment;

  useEffect(() => {
    if (open && bookingId) {
      dispatch(actionGetBooking(bookingId));
      if (paymentId) dispatch(actionGetPayment(paymentId));
    }
  }, [open, bookingId, paymentId, dispatch]);

  return (
    <Modal
      title="Chi tiết hóa đơn"
      open={open}
      onCancel={onClose}
      footer={null}
      width={600}
    >
      {loading ? (
        <div className="flex justify-center items-center py-10">
          <Spin size="large" />
        </div>
      ) : (
        <>
          <Descriptions
            title="Thông tin đặt sân"
            bordered
            column={1}
            size="middle"
            className="mb-4"
          >
            <Descriptions.Item label="Mã đặt sân">
              {booking?.bookingId}
            </Descriptions.Item>
            <Descriptions.Item label="Mã sân">
              {booking?.fieldId}
            </Descriptions.Item>
            <Descriptions.Item label="Ngày đặt">
              {dayjs(booking?.bookingDate).format("DD/MM/YYYY")}
            </Descriptions.Item>
            <Descriptions.Item label="Giờ bắt đầu">
              {booking?.startTime}
            </Descriptions.Item>
            <Descriptions.Item label="Giờ kết thúc">
              {booking?.endTime}
            </Descriptions.Item>
            <Descriptions.Item label="Tổng tiền">
              {booking?.totalPrice?.toLocaleString("vi-VN")} ₫
            </Descriptions.Item>
            <Descriptions.Item label="Trạng thái">
              <Tag color={booking?.status === "Completed" ? "green" : "orange"}>
                {booking?.status}
              </Tag>
            </Descriptions.Item>
          </Descriptions>

          <Descriptions title="Thông tin thanh toán" bordered column={1} size="middle">
            <Descriptions.Item label="Mã thanh toán">
              {payment?.paymentId || "—"}
            </Descriptions.Item>
            <Descriptions.Item label="Ngày thanh toán">
              {payment?.paymentDate
                ? dayjs(payment.paymentDate).format("DD/MM/YYYY HH:mm")
                : "—"}
            </Descriptions.Item>
            <Descriptions.Item label="Phương thức">
              {payment?.paymentMethod || "—"}
            </Descriptions.Item>
            <Descriptions.Item label="Số tiền">
              {payment?.amount
                ? `${payment.amount.toLocaleString("vi-VN")} ₫`
                : "—"}
            </Descriptions.Item>
            <Descriptions.Item label="Trạng thái">
              <Tag
                color={
                  payment?.status === "Success"
                    ? "green"
                    : payment?.status === "Pending"
                    ? "orange"
                    : "red"
                }
              >
                {payment?.status || "Chưa thanh toán"}
              </Tag>
            </Descriptions.Item>
          </Descriptions>
        </>
      )}
    </Modal>
  );
};

export default ModalInvoice;
