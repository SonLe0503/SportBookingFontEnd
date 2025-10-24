import { Line, Pie } from "@ant-design/charts";
import {
  FallOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
  RiseOutlined,
  UserAddOutlined,
  UserDeleteOutlined,
} from "@ant-design/icons";

const currentData = {
  income: 2000000000,
  profit: 530000000,
  totalField: 20,
  totalUser: 2341,
};

const prevData = {
  income: 5000000000,
  profit: 450000000,
  totalField: 18,
  totalUser: 2000,
};

const dataLine = [
  { month: "1", value: 500 },
  { month: "2", value: 600 },
  { month: "3", value: 700 },
  { month: "4", value: 800 },
  { month: "5", value: 900 },
  { month: "6", value: 1000 },
  { month: "7", value: 1150 },
  { month: "8", value: 1200 },
  { month: "9", value: 1222 },
  { month: "10", value: 1400 },
  { month: "11", value: 1500 },
  { month: "12", value: 1600 },
];

const DashBoard = () => {
  const config1 = {
    data: dataLine,
    xField: "month",
    yField: "value",
    point: {
      shapeField: "square",
      sizeField: 4,
    },
    interaction: {
      tooltip: {
        marker: false,
      },
    },
    style: {
      lineWidth: 2,
    },
  };
  const config2 = {
    data: [
      { type: "5*", value: 10 },
      { type: "4*", value: 5 },
      { type: "4.5*", value: 1 },
    ],
    angleField: "value",
    colorField: "type",
    innerRadius: 0.6,
    label: {
      text: "value",
      style: {
        fontWeight: "bold",
      },
    },
    legend: {
      color: {
        title: false,
        position: "right",
        rowPadding: 5,
      },
    },
    annotations: [
      {
        type: "text",
        style: {
          x: "50%",
          y: "50%",
          textAlign: "center",
          fontSize: 40,
          fontStyle: "bold",
        },
      },
    ],
  };
  return (
    <>
      <div className="flex w-full p-2 gap-4">
        <div className="flex flex-col gap-4 w-[49%]">
          <div className="bg-[#FFFFFF] shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-2 rounded-[15px]">
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
                <span>Tổng số lượt đặt sân:</span>
                <span className="font-semibold">{currentData.totalUser}</span>
                {currentData.totalUser >= prevData.totalUser ? (
                  <UserAddOutlined className="!text-green-600" />
                ) : (
                  <UserDeleteOutlined className="!text-red-600" />
                )}
              </div>
            </div>
          </div>
          <div className="bg-[#FFFFFF] shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-2 rounded-[15px] flex-col flex">
            <div className="text-center text-gray-700">
              Tỷ lệ hài lòng khách hàng
              <Pie {...config2}/>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 w-[49%]">
          <div className="bg-[#FFFFFF] shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-2 rounded-[15px] flex flex-col">
            <div className="text-center text-gray-700">
              Doanh thu hàng tháng
            </div>
            <Line {...config1} />
          </div>
        </div>
      </div>
    </>
  );
};
export default DashBoard;
