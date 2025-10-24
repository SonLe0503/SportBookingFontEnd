import dayjs from "dayjs";
import { selectAccountList } from "../../../../store/accountSlide";
import { selectBookingDetail } from "../../../../store/bookingSlide";
import { Button, Modal } from "antd";
import { useSelector } from "react-redux";

interface ModalBookingInfoProps {
  modalInfo: boolean;
  setModalInfo: (value: boolean) => void;
}

const ModalBookingInfo = (props: ModalBookingInfoProps) => {
  const { modalInfo, setModalInfo } = props;
  const bookingDetail = useSelector(selectBookingDetail);
  const accounts = useSelector(selectAccountList);
  const handleCancel = () => {
    setModalInfo(false);
  }
  const customer = bookingDetail
    ? accounts.find((acc) => acc.userId === bookingDetail.userId)
    : null;
  return (
    <>
      <Modal
        open={modalInfo}
        onCancel={handleCancel}
        footer={null} // bỏ footer mặc định để custom nút
        centered
        width={500}
        className="rounded-2xl"
      >
       {!bookingDetail ? (
        <div className="text-center text-gray-500 py-8">Không có thông tin đặt sân</div>
      ) : (
        <div className="flex flex-col gap-6">
          {/* Tiêu đề */}
          <div className="text-center text-[22px] font-bold text-gray-800">
            Thông tin lịch đặt
          </div>

          {/* Khối thông tin */}
          <div className="bg-gray-50 rounded-xl p-4 shadow-inner">
            <div className="flex justify-between py-1">
              <span className="text-gray-600">Ngày đặt:</span>
              <span className="font-medium text-gray-800">
                {dayjs(bookingDetail.bookingDate).format("DD/MM/YYYY")}
              </span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-gray-600">Khung giờ:</span>
              <span className="font-medium text-gray-800">
                {bookingDetail.startTime} - {bookingDetail.endTime}
              </span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-gray-600">Tổng tiền:</span>
              <span className="font-medium text-blue-600">
                {bookingDetail.totalPrice.toLocaleString("vi-VN")} VND
              </span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-gray-600">Trạng thái:</span>
              <span className="font-medium text-gray-800 capitalize">
                {bookingDetail.status}
              </span>
            </div>
          </div>

          {/* Thông tin khách hàng */}
          <div className="space-y-3 bg-white border p-4 rounded-xl">
            <div className="text-lg font-semibold mb-2 text-gray-700">
              Thông tin khách hàng
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tên:</span>
              <span className="font-medium text-gray-800">
                {customer?.username || "Không rõ"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Email:</span>
              <span className="font-medium text-gray-800">
                {customer?.email || "-"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Số điện thoại:</span>
              <span className="font-medium text-gray-800">
                {customer?.phone || "-"}
              </span>
            </div>
          </div>

          {/* Nút hành động */}
          <div className="flex justify-end gap-3 mt-4">
            <Button type="primary" onClick={handleCancel}>
              Đóng
            </Button>
          </div>
        </div>
      )}
      </Modal>
    </>
  );
};
export default ModalBookingInfo;
