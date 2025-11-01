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

const courts: string[] = ["A", "B", "C", "D", "E", "F"];
const Booking = () => {
  const { id } = useParams();
  const [selected, setSelected] = useState<{ court: string; hour: string }[]>(
    []
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const bookingList = useSelector(selectBookingList);
  const fieldDetail = useSelector(selectSelectedField);
  const pricePerSlot = (fieldDetail?.price || 0) / 2;
  useEffect(() => {
    dispatch(actionGetBookings());
    if (id) {
      dispatch(actionGetDetailField(Number(id)));
    }
  }, [dispatch, id]);

  // 🧮 Lọc các booking theo fieldId (sân hiện tại)
  const fieldBookings = useMemo(() => {
    if (!id) return [];
    return bookingList.filter((b) => b.fieldId === Number(id));
  }, [bookingList, id]);

//   const courts = useMemo(() => {
//   const count = Number(fieldDetail?.courtDetails || 0); // ví dụ: "6" -> 6
//   if (isNaN(count) || count <= 0) return [];
//   return Array.from({ length: count }, (_, i) => `Sân ${i + 1}`);
// }, [fieldDetail]);

  // 🧩 Chuyển dữ liệu booking thành dạng dễ vẽ bảng
  const bookingData: Record<string, Record<string, Status>> = useMemo(() => {
    const data: Record<string, Record<string, Status>> = {};
    courts.forEach((court) => (data[court] = {}));

    fieldBookings.forEach((b) => {
      const court = b.status === "locked" ? "A" : "B";
      // 🟡 TODO: Nếu API có courtName hoặc subField -> thay thế logic tạm này
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
  }, [fieldBookings]);

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
        <div className="m-2 rounded-[15px] flex bg-[#FFFFFF ] shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
          <div className="w-full">
            <div className="flex justify-center items-center">
              <div className="font-bold text-[25px]">
                Đặt lịch ngày trực quan
              </div>
            </div>
            <div className="mt-10 flex gap-4 p-2">
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
            <div className="flex justify-center bottom-2 ">
              <div className="text-red-500">
                Lưu ý: Nếu bạn cần đặt lịch cố định vui lòng liên hệ:
                0374.857.068 để được hỗ trợ
              </div>
            </div>
          </div>
        </div>
        {selected.length > 0 ? (
          <Footer
            totalPrice={totalPrice}
            totalHour={totalHour}
            setIsModalOpen={setIsModalOpen}
          />
        ) : (
          ""
        )}
      </div>
      <ModalBooking
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        totalHour={totalHour}
        totalPrice={totalPrice}
        selected={selected}
        fieldId={Number(id)}
      />
    </>
  );
};
export default Booking;
