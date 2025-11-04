import Footer from "../../../Booking/Footer";
import ModalBookingInfo from "../../../../components/modal/FacilityOwner/ModalBookingInfo";
import { Tag, Select } from "antd";
import { useEffect, useState, useMemo } from "react";
import ModalBooking from "../../../../components/modal/ModalBooking";
import { hours } from "../../../../../constants/app";
import { useAppDispatch } from "../../../../../store";
import { useSelector } from "react-redux";
import { selectInfoLogin } from "../../../../../store/authSlide";
import { actionGetFields, selectFields } from "../../../../../store/fieldSlide";
import { actionGetBooking, actionGetBookings, selectBookingList } from "../../../../../store/bookingSlide";

type Status = "empty" | "booked" | "locked" | "event";

const statusColors: Record<Status, string> = {
  empty: "bg-white",
  booked: "bg-red-400",
  locked: "bg-yellow-400",
  event: "bg-purple-400",
};

// 🔹 Fix cứng courts giống Booking.tsx
const courts: string[] = ["A", "B", "C", "D", "E", "F"];

const ManageBooking = () => {
  const dispatch = useAppDispatch();
  const { userId } = useSelector(selectInfoLogin);
  const fields = useSelector(selectFields);
  const bookings = useSelector(selectBookingList);

  const [selected, setSelected] = useState<{ court: string; hour: string }[]>([]);
  const [selectedFieldId, setSelectedFieldId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState(false);

  // Ngày hiện tại hoặc chọn
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().slice(0, 10); // 'YYYY-MM-DD'
  });

  // Tự động cập nhật ngày mới
  useEffect(() => {
    const interval = setInterval(() => {
      const today = new Date().toISOString().slice(0, 10);
      if (today !== selectedDate) setSelectedDate(today);
    }, 60 * 1000);
    return () => clearInterval(interval);
  }, [selectedDate]);

  // Lấy dữ liệu sân và booking
  useEffect(() => {
    dispatch(actionGetFields());
    dispatch(actionGetBookings());
  }, [dispatch]);

  // Lọc danh sách sân thuộc về chủ sân
  const ownerFields = useMemo(
    () => fields.filter((f) => f.ownerId === Number(userId)),
    [fields, userId]
  );

  // Lọc booking theo sân + ngày
  const fieldBookings = useMemo(() => {
    if (!selectedFieldId) return [];
    return bookings.filter(
      (b) => b.fieldId === selectedFieldId && b.bookingDate === selectedDate
    );
  }, [bookings, selectedFieldId, selectedDate]);

  // Giá mỗi slot
  const pricePerSlot = useMemo(() => {
    const selectedField = fields.find((f) => f.fieldId === selectedFieldId);
    return selectedField ? (selectedField.price || 0) / 2 : 0;
  }, [fields, selectedFieldId]);

  const handleSelectField = (fieldId: number) => {
    setSelectedFieldId(fieldId);
    setSelected([]); // reset chọn khung giờ
  };

  const handleSelected = (court: string, hour: string, status: Status) => {
    if (status === "empty") {
      const exists = selected.some((s) => s.court === court && s.hour === hour);
      if (exists) {
        setSelected((prev) =>
          prev.filter((s) => !(s.court === court && s.hour === hour))
        );
      } else {
        setSelected((prev) => [...prev, { court, hour }]);
      }
    } else if (status === "booked") {
      const booked = fieldBookings.find(
        (b) => b.startTime <= hour && b.endTime > hour
      );
      if (booked) {
        dispatch(actionGetBooking(booked.bookingId));
        setModalInfo(true);
      }
    }
  };

  const isSelected = (court: string, hour: string) =>
    selected.some((s) => s.court === court && s.hour === hour);

  const totalPrice = selected.length * pricePerSlot;
  const totalHour = selected.length / 2;

  return (
    <>
      <div className="w-full h-auto flex flex-col">
        <div className="flex justify-between items-center mx-2 my-2">
          <Select
            placeholder="Chọn sân của bạn"
            className="w-[300px]"
            value={selectedFieldId ?? undefined}
            onChange={handleSelectField}
            options={ownerFields.map((f) => ({
              label: f.fieldName,
              value: f.fieldId,
            }))}
          />
          {/* Chọn ngày */}
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border p-1 rounded"
          />
        </div>

        {!selectedFieldId ? (
          <div className="p-4 text-center text-gray-500">
            Vui lòng chọn sân để xem lịch đặt
          </div>
        ) : (
          <div className="m-2 rounded-[15px] flex bg-[#FFFFFF] shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
            <div className="w-full">
              <div className="flex gap-4 p-2">
                <Tag color="default">Trống</Tag>
                <Tag color="error">Đã đặt</Tag>
                <Tag color="warning">Khoá</Tag>
                <Tag color="purple">Sự kiện</Tag>
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
                          const isBooked = fieldBookings.some(
                            (b) => b.startTime <= h && b.endTime > h
                          );
                          const status: Status = isBooked ? "booked" : "empty";
                          const selectedClass = isSelected(c, h)
                            ? "!bg-blue-500"
                            : "";
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
            </div>
          </div>
        )}

        {selected.length > 0 && (
          <Footer
            totalPrice={totalPrice}
            totalHour={totalHour}
            setIsModalOpen={setIsModalOpen}
          />
        )}
      </div>

      <ModalBookingInfo modalInfo={modalInfo} setModalInfo={setModalInfo} />
      {selectedFieldId && (
        <ModalBooking
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          totalHour={totalHour}
          totalPrice={totalPrice}
          selected={selected}
          fieldId={selectedFieldId}
        />
      )}
    </>
  );
};

export default ManageBooking;
