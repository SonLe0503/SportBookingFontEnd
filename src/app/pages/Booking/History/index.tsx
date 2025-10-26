import ModalFeedback from "../../../components/modal/ModalFeedback";
import { useAppDispatch } from "../../../../store";
import {
  actionGetBookings,
  selectBookingList,
} from "../../../../store/bookingSlide";
import { Button } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectInfoLogin } from "../../../../store/authSlide";
import ModalInvoice from "../../../components/modal/ModalInvoice";

const History = () => {
  const dispatch = useAppDispatch();
  const bookings = useSelector(selectBookingList);
  const userInfo = useSelector(selectInfoLogin); // lấy userId
  const [openModal, setOpenModal] = useState(false);
  const [openInvoice, setOpenInvoice] = useState(false);
  const [selectedFieldId, setSelectedFieldId] = useState<number | null>(null);
  const [selectedBookingId, setSelectedBookingId] = useState<number | null>(
    null
  );

  useEffect(() => {
    dispatch(actionGetBookings());
  }, [dispatch]);
  return (
    <>
      <div className="w-full flex flex-col">
        <div className="m-2 rounded-[15px] flex bg-[#FFFFFF] shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
          <div className="rounded-t-[15px] w-full">
            <div className="flex bg-gray-100 rounded-t-[15px]">
              <div className="flex w-full p-2 justify-center text-[14px] text-gray-700">
                Mã đặt sân
              </div>
              <div className="w-full p-2 flex justify-center text-[14px] text-gray-700">
                Mã sân
              </div>
              <div className="w-full p-2 flex justify-center text-[14px] text-gray-700">
                Ngày đặt
              </div>
              <div className="w-full p-2 flex justify-center text-[14px] text-gray-700">
                Giờ bắt đầu
              </div>
              <div className="w-full p-2 flex justify-center text-[14px] text-gray-700">
                Giờ kết thúc
              </div>
              <div className="w-full p-2"></div>
              <div className="w-full p-2"></div>
            </div>

            {bookings?.map((b) => (
              <div key={b.bookingId} className="flex items-center">
                <div className="w-full p-2 flex text-[14px] text-gray-700 justify-center">
                  {b.bookingId}
                </div>
                <div className="w-full p-2 flex text-[14px] text-gray-700 justify-center">
                  {b.fieldId}
                </div>
                <div className="w-full p-2 flex text-[14px] text-gray-700 justify-center">
                  {dayjs(b.bookingDate).format("DD/MM/YYYY")}
                </div>
                <div className="w-full p-2 flex text-[14px] text-gray-700 justify-center">
                  {b.startTime}
                </div>
                <div className="w-full p-2 flex text-[14px] text-gray-700 justify-center">
                  {b.endTime}
                </div>

                <div className="w-full p-2 flex gap-2 justify-center">
                  {dayjs() < dayjs(`${b.bookingDate} ${b.startTime}`) ? (
                    <Button color="danger" variant="solid" className="hidden">
                      Huỷ sân
                    </Button>
                  ) : (
                    <Button
                      color="yellow"
                      variant="solid"
                      onClick={() => {
                        setSelectedFieldId(b.fieldId);
                        setOpenModal(true);
                      }}
                    >
                      Đánh giá
                    </Button>
                  )}
                </div>

                <div className="w-full p-2 flex justify-center">
                  <Button
                    color="blue"
                    variant="solid"
                    onClick={() => {
                      setSelectedBookingId(b.bookingId);
                      setOpenInvoice(true);
                    }}
                  >
                    Hoá đơn
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ModalFeedback
        open={openModal}
        onClose={() => setOpenModal(false)}
        fieldId={selectedFieldId}
        userId={Number(userInfo.userId)}
      />
      <ModalInvoice
        open={openInvoice}
        onClose={() => setOpenInvoice(false)}
        bookingId={selectedBookingId}
      />
    </>
  );
};

export default History;
