/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  actionGetFeedbacks,
  selectFeedbacks,
} from "../../../../store/feedbackSlide";
import {
  actionGetBookings,
  selectBookingList,
} from "../../../../store/bookingSlide";
import { actionGetFields, selectFields } from "../../../../store/fieldSlide";
import { Line, Pie } from "@ant-design/charts";
import { RiseOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectInfoLogin } from "../../../../store/authSlide";

const DashBoard = () => {
  const dispatch = useDispatch<any>();

  const fields = useSelector(selectFields);
  const bookings = useSelector(selectBookingList);
  const feedbacks = useSelector(selectFeedbacks);
  const owner = useSelector(selectInfoLogin);
  const ownerId = Number(owner.userId);

  // Filter data theo owner
  const ownerFields = fields.filter((f) => f.ownerId === ownerId);
  const ownerBookings = bookings.filter((b) =>
    ownerFields.some((f) => f.fieldId === b.fieldId)
  );
  const ownerFeedbacks = feedbacks.filter((f) =>
    ownerFields.some((fld) => fld.fieldId === f.fieldId)
  );

  // Tính toán doanh thu và số liệu
  const totalIncome = ownerBookings.reduce((acc, b) => acc + b.totalPrice, 0);
  const totalBooking = ownerBookings.length;
  const totalField = ownerFields.length;
  const avgRating = ownerFeedbacks.length
    ? (
        ownerFeedbacks.reduce((acc, f) => acc + f.rating, 0) /
        ownerFeedbacks.length
      ).toFixed(1)
    : 0;

  // Biểu đồ doanh thu theo tháng
  const dataLine = Array.from({ length: 12 }, (_, i) => {
    const month = i + 1;
    const value = ownerBookings
      .filter((b) => new Date(b.bookingDate).getMonth() + 1 === month)
      .reduce((acc, b) => acc + b.totalPrice, 0);
    return { month: month.toString(), value };
  });

  const configLine = {
    data: dataLine,
    xField: "month",
    yField: "value",
    point: { size: 4 },
    smooth: true,
    lineStyle: { lineWidth: 2 },
  };

  // Biểu đồ feedback
  const ratingData = [5, 4, 3, 2, 1].map((r) => ({
    type: `${r}*`,
    value: ownerFeedbacks.filter((f) => Math.round(f.rating) === r).length,
  }));

  const configPie = {
    data: ratingData,
    angleField: "value",
    colorField: "type",
    radius: 0.7,
    label: { type: "inner", content: "{value}" },
  };

  useEffect(() => {
    dispatch(actionGetFields());
    dispatch(actionGetBookings());
    dispatch(actionGetFeedbacks());
  }, [dispatch]);

  return (
    <>
      <div className="flex flex-col gap-4 p-4">
        <div className="flex gap-4">
          <div className="bg-white shadow p-4 rounded w-1/4 flex flex-col gap-2">
            <span className="text-gray-600">Tổng doanh thu</span>
            <span className="text-2xl font-bold text-green-600">
              {totalIncome.toLocaleString("vi-VN")} VND
            </span>
          </div>
          <div className="bg-white shadow p-4 rounded w-1/4 flex flex-col gap-2">
            <span className="text-gray-600">Tổng số sân</span>
            <span className="text-2xl font-bold">{totalField}</span>
          </div>
          <div className="bg-white shadow p-4 rounded w-1/4 flex flex-col gap-2">
            <span className="text-gray-600">Tổng lượt đặt</span>
            <span className="text-2xl font-bold">{totalBooking}</span>
          </div>
          <div className="bg-white shadow p-4 rounded w-1/4 flex flex-col gap-2">
            <span className="text-gray-600">Đánh giá trung bình</span>
            <span className="text-2xl font-bold">
              {avgRating} <RiseOutlined className="text-green-600" />
            </span>
          </div>
        </div>

        <div className="flex gap-4 mt-4">
          <div className="bg-white shadow p-4 rounded w-2/3">
            <h3 className="text-gray-700 mb-2">Doanh thu theo tháng</h3>
            <Line {...configLine} />
          </div>
          <div className="bg-white shadow p-4 rounded w-1/3">
            <h3 className="text-gray-700 mb-2">Tỷ lệ đánh giá</h3>
            <Pie {...configPie} />
          </div>
        </div>
      </div>
    </>
  );
};
export default DashBoard;
