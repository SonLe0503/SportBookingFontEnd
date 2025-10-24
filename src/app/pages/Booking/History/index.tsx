import { Button } from "antd";
import dayjs from "dayjs";

const History = () => {
  const data = [
    {
      id: 1,
      name: "Sân cầu lông 368",
      timeStart: "2025-09-15T07:00:00",
      timeEnd: "2025-09-15T09:00:00",
    },
    {
      id: 2,
      name: "Sân Pickleball he he",
      timeStart: "2025-09-16T11:00:00",
      timeEnd: "2025-09-16T07:00:00",
    },
  ];
  return (
    <>
      <div className="w-full flex flex-col">
        <div className="m-2 rounded-[15px] flex bg-[#FFFFFF] shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
          <div className="rounded-t-[15px] w-full">
            <div className="flex bg-gray-100 rounded-t-[15px]">
              <div className="flex w-full p-2 justify-center text-[14px] text-gray-700">
                Mã đặt sân{" "}
              </div>
              <div className="w-full p-2 flex justify-center text-[14px] text-gray-700">
                Sân
              </div>
              <div className="w-full p-2 flex justify-center text-[14px] text-gray-700">
                Thời gian bắt đầu
              </div>
              <div className="w-full p-2 flex justify-center text-[14px] text-gray-700">
                Thời gian kết thúc
              </div>
              {/* <div className="w-full p-2 flex justify-center text-[14px] text-gray-700">
                Trạng thái
              </div> */}
              <div className="w-full p-2"></div>
              <div className="w-full p-2"></div>
            </div>

            {data.map((user) => (
              <div key={user.id} className="flex items-center">
                <div className="w-full p-2 flex text-[14px] text-gray-700 justify-center">
                  {user.id}
                </div>
                <div
                  className="w-full p-2 flex text-[14px] text-gray-700 truncate relative cursor-pointer group"
                  title={user.name}
                >
                  {user.name}
                </div>
                <div
                  className="w-full p-2 flex truncate relative text-[14px] text-gray-700 cursor-pointer group"
                  title={user.timeStart}
                >
                  {dayjs(user.timeStart).format("DD/MM/YYYY HH:mm")}
                </div>
                <div
                  className="w-full p-2 flex truncate relative text-[14px] text-gray-700 cursor-pointer group"
                  title={user.timeEnd}
                >
                  {dayjs(user.timeEnd).format("DD/MM/YYYY HH:mm")}
                </div>
                <div className="w-full p-2 flex gap-2">
                  {dayjs() < dayjs(user.timeStart) ? (
                    <Button color="danger" variant="solid">
                      Huỷ sân
                    </Button>
                  ) : (
                    <Button color="yellow" variant="solid">
                      Đánh giá
                    </Button>
                  )}
                </div>
                <div className="w-full p-2 flex gap-2">
                  <Button color="blue" variant="solid">
                    Hoá đơn
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default History;
