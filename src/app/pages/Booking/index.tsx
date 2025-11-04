import { Tag } from "antd";
import Footer from "./Footer";
import { useEffect, useMemo, useState } from "react";
import ModalBooking from "../../components/modal/ModalBooking";
import { useAppDispatch } from "../../../store";
import {
  actionGetBookings,
  selectBookingList,
} from "../../../store/bookingSlide";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  actionGetDetailField,
  selectSelectedField,
} from "../../../store/fieldSlide";
import { hours } from "../../../constants/app";

type Status = "empty" | "booked" | "locked" | "event";

const statusColors: Record<Status, string> = {
  empty: "bg-white",
  booked: "bg-red-400",
  locked: "bg-yellow-400",
  event: "bg-purple-400",
};

const Booking = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const bookingList = useSelector(selectBookingList);
  const fieldDetail = useSelector(selectSelectedField);

  // Validate fieldId
  const fieldId = Number(id);
  if (isNaN(fieldId)) {
    return <div className="text-center p-4">Không tìm thấy sân</div>;
  }

  const pricePerSlot = (fieldDetail?.price || 0) / 2;

  const [selected, setSelected] = useState<{ court: string; hour: string }[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Ngày hiện tại
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().slice(0, 10);
  });

  // Cập nhật ngày tự động
  useEffect(() => {
    const interval = setInterval(() => {
      const today = new Date().toISOString().slice(0, 10);
      if (today !== selectedDate) setSelectedDate(today);
    }, 60 * 1000);
    return () => clearInterval(interval);
  }, [selectedDate]);

  // Load booking và thông tin sân
  useEffect(() => {
    dispatch(actionGetBookings());
    dispatch(actionGetDetailField(fieldId));
  }, [dispatch, fieldId]);

  // Số lượng sân động
  const courts = useMemo(() => {
    if (!fieldDetail) return [];
    const count = Number(fieldDetail.courtDetails);
    if (isNaN(count) || count <= 0) return [];
    return Array.from({ length: count }, (_, i) => String.fromCharCode(65 + i));
  }, [fieldDetail]);

  // Lọc booking theo sân + ngày
  const fieldBookings = useMemo(() => {
    return bookingList.filter(
      (b) => b.fieldId === fieldId && b.bookingDate === selectedDate
    );
  }, [bookingList, fieldId, selectedDate]);

  // Chuyển booking sang dạng bảng
  const bookingData: Record<string, Record<string, Status>> = useMemo(() => {
    const data: Record<string, Record<string, Status>> = {};
    courts.forEach((court) => (data[court] = {}));

    fieldBookings.forEach((b) => {
      const court = courts[0]; // TODO: sửa khi API có courtName
      const startHour = b.startTime.slice(0, 5);
      const endHour = b.endTime.slice(0, 5);
      const startIndex = hours.indexOf(startHour);
      const endIndex = hours.indexOf(endHour);
      if (startIndex !== -1 && endIndex !== -1) {
        for (let i = startIndex; i < endIndex; i++) {
          data[court][hours[i]] = "booked";
        }
      }
    });

    return data;
  }, [fieldBookings, courts]);

  // Chọn/ bỏ chọn ô
  const handleSelected = (court: string, hour: string, status: Status) => {
    if (status !== "empty") return;
    const exists = selected.some((s) => s.court === court && s.hour === hour);
    if (exists) {
      setSelected((prev) =>
        prev.filter((s) => !(s.court === court && s.hour === hour))
      );
    } else {
      setSelected((prev) => [...prev, { court, hour }]);
    }
  };

  const isSelected = (court: string, hour: string) =>
    selected.some((s) => s.court === court && s.hour === hour);

  const totalPrice = selected.length * pricePerSlot;
  const totalHour = selected.length / 2;

  return (
    <>
      <div className="w-full flex flex-col min-h-full justify-between">
        <div className="m-2 rounded-[15px] flex bg-[#FFFFFF] shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
          <div className="w-full">
            <div className="flex justify-center items-center">
              <div className="font-bold text-[25px]">Đặt lịch ngày trực quan</div>
            </div>

            {/* Chọn ngày */}
            <div className="flex justify-center mt-4">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="border p-1 rounded"
              />
            </div>

            <div className="mt-4 flex gap-4 p-2">
              <Tag color="default">Trống</Tag>
              <Tag color="error">Đã đặt</Tag>
              <Tag color="warning">Khoá</Tag>
              <Tag color="purple">Sự kiện</Tag>
              <a href="#">Xem sân & bảng giá</a>
            </div>

            <div className="overflow-x-auto mt-4 p-2">
              <table className="border-collapse">
                <thead>
                  <tr>
                    <th className="w-12 border border-gray-300 bg-gray-100"></th>
                    {hours.map((h) => (
                      <th
                        key={h}
                        className="border border-gray-300 text-xs px-2 py-1 text-gray-600 text-center whitespace-nowrap"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {courts.map((c) => (
                    <tr key={c}>
                      <td className="border border-gray-300 text-center font-semibold bg-green-50">
                        {c}
                      </td>
                      {hours.map((h) => {
                        const status: Status = bookingData[c]?.[h] || "empty";
                        const selectedClass = isSelected(c, h) ? "!bg-blue-500" : "";
                        return (
                          <td
                            key={h}
                            onClick={() => handleSelected(c, h, status)}
                            className={`border border-gray-300 h-8 min-w-[48px] cursor-pointer ${statusColors[status]} ${selectedClass}`}
                          ></td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-center bottom-2">
              <div className="text-red-500">
                Lưu ý: Nếu bạn cần đặt lịch cố định vui lòng liên hệ: 0374.857.068
              </div>
            </div>
          </div>
        </div>

        {selected.length > 0 && (
          <Footer
            totalPrice={totalPrice}
            totalHour={totalHour}
            setIsModalOpen={setIsModalOpen}
          />
        )}
      </div>

      <ModalBooking
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        totalHour={totalHour}
        totalPrice={totalPrice}
        selected={selected}
        fieldId={fieldId}
      />
    </>
  );
};

export default Booking;