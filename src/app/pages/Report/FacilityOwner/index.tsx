import ModalReport from "../../../components/modal/Admin/ModalReport";
import { Button } from "antd";
import { useState } from "react";

const Report = () => {
  const [opneModal, setOpenModal] = useState(false);
  const data = [
    {
      id: 1,
      name: "Nguyễn Văn A",
      nameField: "Sân cầu lông 365",
      description:
        "Sân đẹp so với giá thành, mặt sân thảm bằng phẳng không có tình trạng như 1 số sân khác mình từng chơi ",
    },
    {
      id: 2,
      name: "Trần Thị B",
      nameField: "Sân pickleball Thái Anh",
      description:
        "Sân khá là ổn áp, lúc mình đi giờ cao điểm không có sân nào trống ",
    },
    {
      id: 2,
      name: "Trần Thị C",
      nameField: "Sân bóng đá Thái Hoà",
      description:
        "Chất lượng dịch vụ không được ok lắm, được cái chât lượng mặt sân khá là ok ",
    },
  ];
  return (
    <>
      <div className="w-full h-auto flex flex-col">
        <div className="m-2 rounded-[15px] flex bg-[#FFFFFF] shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
          <div className="rounded-t-[15px] w-full">
            <div className="flex bg-gray-100 rounded-t-[15px]">
              <div className="flex w-[20%] p-2 justify-center text-[14px] text-gray-700">
                Khách hàng
              </div>
              <div className="w-[20%] p-2 flex justify-center text-[14px] text-gray-700">
                Tên sân
              </div>
              <div className="w-[40%] p-2 flex justify-center text-[14px] text-gray-700">
                Nội dung
              </div>
              <div className="w-[20%] p-2 flex justify-center text-[14px] text-gray-700">
                Hành động
              </div>
            </div>

            {data.map((user) => (
              <div key={user.id} className="flex items-center w-full">
                <div
                  className="w-[20%] p-2 flex text-[14px] text-gray-700 truncate relative cursor-pointer group justify-center"
                  title={user.name}
                >
                  {user.name}
                </div>
                <div
                  className="w-[20%] p-2 flex truncate relative text-[14px] text-gray-700 cursor-pointer group justify-center"
                  title={user.nameField}
                >
                  {user.nameField}
                </div>
                <div
                  className="w-[40%]  p-2 flex text-[14px] text-gray-700 cursor-pointer group truncate relative"
                  title={user.description}
                >
                  {user.description}
                </div>
                <div className="w-[20%] p-2 flex justify-center">
                  <Button color="gold" variant="outlined" onClick={() => setOpenModal(true)}>
                    Phản hồi{" "}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ModalReport openModal={opneModal} setOpenModal={setOpenModal}/>
    </>
  );
};
export default Report;
