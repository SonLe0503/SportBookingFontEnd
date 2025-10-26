import { actionCreateBooking, actionGetBookings } from "../../../store/bookingSlide";
import { useAppDispatch } from "../../../store";
import { Button, Input, message, Modal } from "antd";
import { useState } from "react";
import { hours } from "../../../constants/app";
import ModalPayment from "./ModalPayment";
import { useSelector } from "react-redux";
import { selectInfoLogin } from "../../../store/authSlide";
import ReactGA from "react-ga4";

interface ModalBookingProps {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  totalHour: number;
  totalPrice: number;
  selected: { court: string; hour: string }[];
  fieldId: number;
}
const ModalBooking = (props: ModalBookingProps,) => {
  const { isModalOpen, setIsModalOpen, totalHour, totalPrice, selected, fieldId } = props;
  const dispatch = useAppDispatch();
  const user = useSelector(selectInfoLogin)

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [createdBookingId, setCreatedBookingId] = useState<number | null>(null);

   const handleOk = async () => {
    if (!name || !phone) {
      message.error("Vui lòng nhập tên và số điện thoại");
      return;
    }
    if (selected.length === 0) {
      message.error("Vui lòng chọn ít nhất 1 khung giờ");
      return;
    }

    setLoading(true);
    try {
      let lastBookingId = 0;
      // Dispatch actionCreateBooking cho từng ô đã chọn
      for (const slot of selected) {
        const startTime = slot.hour;
        const endIndex = hours.indexOf(slot.hour) + 1;
        const endTime = endIndex < hours.length ? hours[endIndex] : slot.hour;

        const res = await dispatch(
          actionCreateBooking({
            userId: Number(user.userId), // bạn cần lấy userId hiện tại từ state hoặc context
            fieldId: fieldId,
            bookingDate: new Date().toISOString().slice(0, 10),
            startTime,
            endTime,
            totalPrice: totalPrice / selected.length, // chia đều theo ô
            status: "PENDING",
          })
        ).unwrap();
        lastBookingId = res.bookingId || 0;
      }

      message.success("Đặt lịch thành công!");
      setCreatedBookingId(lastBookingId);
      setIsModalOpen(false);
      dispatch(actionGetBookings()); // reload dữ liệu bảng
      ReactGA.event({
      category: "Booking",
      action: "Book Field",
      label: `Field ID: ${fieldId}`,
      value: totalPrice,
      nonInteraction: false,
    });
    } catch (error) {
      console.error(error);
      message.error("Đặt lịch thất bại, thử lại sau");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Modal
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
      centered
      width={500}
      className="rounded-2xl"
    >
      <div className="flex flex-col gap-6">
        <div className="text-center text-[24px] font-bold text-gray-800">
          Đặt lịch trực quan
        </div>

        <div className="bg-gray-50 rounded-xl p-4 shadow-inner">
          <div className="text-lg font-semibold mb-2">Thông tin lịch đặt</div>
          <div className="flex justify-between py-1">
            <span className="text-gray-600">Ngày:</span>
            <span className="font-medium text-gray-800">
              {new Date().toLocaleDateString("vi-VN")}
            </span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-gray-600">Tổng Giờ:</span>
            <span className="font-medium text-gray-800">{totalHour}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-gray-600">Tổng tiền:</span>
            <span className="font-medium text-blue-600">
              {totalPrice.toLocaleString("vi-VN")} VND
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Tên của bạn
            </label>
            <Input
              placeholder="Nhập tên của bạn"
              className="rounded-lg"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Số điện thoại
            </label>
            <Input
              placeholder="Nhập số điện thoại"
              className="rounded-lg"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button onClick={handleCancel}>Hủy</Button>
          <Button type="primary" onClick={handleOk} loading={loading}>
            Xác nhận
          </Button>
        </div>
      </div>
    </Modal>
    {createdBookingId && (
        <ModalPayment
          isOpen={isPaymentOpen}
          onClose={() => setIsPaymentOpen(false)}
          bookingId={createdBookingId}
          totalPrice={totalPrice}
        />
      )}
    </>
  );
};
export default ModalBooking;
