/* eslint-disable @typescript-eslint/no-explicit-any */
import { actionGetFields, selectFields } from "../../../../store/fieldSlide";
import {
  actionGetBookings,
  selectBookingList,
} from "../../../../store/bookingSlide";
import { Line, Pie } from "@ant-design/charts";
import {
  FallOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
  RiseOutlined,
  UserAddOutlined,
  UserDeleteOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  actionGetAccounts,
  selectAccountList,
} from "../../../../store/accountSlide";
import {
  actionGetPayments,
  selectPaymentList,
} from "../../../../store/paymentSlide";
import { useEffect } from "react";

const DashBoardAdmin = () => {
  const dispatch = useDispatch<any>();

  const bookings = useSelector(selectBookingList);
  const fields = useSelector(selectFields);
  const accounts = useSelector(selectAccountList);
  const payments = useSelector(selectPaymentList);

  // Tổng hợp dữ liệu
  const currentData = {
    income: payments.reduce((acc, p) => acc + p.amount, 0),
    profit: payments.reduce((acc, p) => acc + p.amount * 0.25, 0), // giả sử lợi nhuận = 25% tổng thanh toán
    totalField: fields.length,
    totalUser: accounts.length,
  };

  // Giả sử dữ liệu trước đó: bạn có thể fetch từ API nếu cần
  const prevData = {
    income: currentData.income * 0.8,
    profit: currentData.profit * 0.9,
    totalField: currentData.totalField - 2,
    totalUser: currentData.totalUser - 50,
  };

  // Biểu đồ Line: lượt đặt sân theo tháng
  const bookingByMonth: { month: string; value: number }[] = [];
  for (let i = 1; i <= 12; i++) {
    const count = bookings.filter(
      (b) => new Date(b.bookingDate).getMonth() + 1 === i
    ).length;
    bookingByMonth.push({ month: `${i}`, value: count });
  }

  const configLine = {
    data: bookingByMonth,
    xField: "month",
    yField: "value",
    point: { size: 4 },
    lineStyle: { lineWidth: 2 },
    tooltip: { marker: false },
  };

  // Biểu đồ Pie: tỷ lệ doanh thu theo loại sân
  const revenueByFieldType: { type: string; value: number }[] = [];
  fields.forEach((f) => {
    const revenue = bookings
      .filter((b) => b.fieldId === f.fieldId)
      .reduce((acc, b) => acc + b.totalPrice, 0);
    revenueByFieldType.push({ type: f.type || "Khác", value: revenue });
  });

  const configPie = {
    data: revenueByFieldType,
    angleField: "value",
    colorField: "type",
    innerRadius: 0.6,
    label: { type: "inner", content: "{value}", style: { fontWeight: "bold" } },
  };

  // Load dữ liệu khi component mount
  useEffect(() => {
    dispatch(actionGetBookings());
    dispatch(actionGetFields());
    dispatch(actionGetAccounts());
    dispatch(actionGetPayments());
  }, [dispatch]);
  return (
    <>
      <div className="flex w-full p-2 gap-4">
        <div className="flex flex-col gap-4 w-[49%]">
          <div className="bg-white shadow-md p-4 rounded-lg">
            <div className="flex flex-col gap-4 w-full">
              <div className="flex justify-between items-center">
                <div className="text-gray-700 flex items-center gap-2">
                  <span className="text-[20px]">Doanh thu:</span>
                  <span className="text-[25px] font-semibold text-green-600">
                    {currentData.income.toLocaleString("vi-VN")}
                  </span>
                  {currentData.income >= prevData.income ? (
                    <RiseOutlined className="!text-green-600" />
                  ) : (
                    <FallOutlined className="!text-red-600" />
                  )}
                </div>
                <div className="text-gray-800 flex items-center gap-2">
                  <span className="text-[15px]">Lợi nhuận</span>
                  <span className="text-[15px] text-blue-600 font-medium">
                    {currentData.profit.toLocaleString("vi-VN")} VND
                  </span>
                  {currentData.profit >= prevData.profit ? (
                    <RiseOutlined className="!text-green-600" />
                  ) : (
                    <FallOutlined className="!text-red-600" />
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 text-[20px] text-gray-700">
                <span>Tổng số sân:</span>
                <span className="font-semibold">{currentData.totalField}</span>
                {currentData.totalField >= prevData.totalField ? (
                  <PlusCircleOutlined className="!text-green-600" />
                ) : (
                  <MinusCircleOutlined className="!text-red-600" />
                )}
              </div>
              <div className="flex items-center gap-2 text-[20px] text-gray-700">
                <span>Tổng số người dùng:</span>
                <span className="font-semibold">{currentData.totalUser}</span>
                {currentData.totalUser >= prevData.totalUser ? (
                  <UserAddOutlined className="!text-green-600" />
                ) : (
                  <UserDeleteOutlined className="!text-red-600" />
                )}
              </div>
            </div>
          </div>

          <div className="bg-white shadow-md p-4 rounded-lg flex flex-col">
            <div className="text-center text-gray-700 mb-2">
              Tỷ lệ doanh thu theo loại sân
            </div>
            <Pie {...configPie} />
          </div>
        </div>

        <div className="flex flex-col gap-4 w-[49%]">
          <div className="bg-white shadow-md p-4 rounded-lg flex flex-col">
            <div className="text-center text-gray-700 mb-2">
              Thống kê lượt đặt sân hàng tháng
            </div>
            <Line {...configLine} />
          </div>
        </div>
      </div>
    </>
  );
};
export default DashBoardAdmin;
