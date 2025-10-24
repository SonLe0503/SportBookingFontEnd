
import { Button } from "antd";

interface FooterProps {
  totalHour: number;
  totalPrice: number;
  setIsModalOpen: (value: boolean) => (void)
}

const Footer = (props: FooterProps) => {
  const { totalHour, totalPrice, setIsModalOpen } = props;
  const showModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="m-2 rounded-[15px] flex bg-[#FFFFFF ] shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
        <div className="w-full p-2">
          <div className="flex justify-between">
            <div className="font-semibold text-[18px]">
              Tổng giờ: <span className="text-blue-600">{totalHour}</span>
              Giờ
            </div>
            <div className="font-semibold text-[18px]">
              Tổng tiền:{" "}
              <span className="text-blue-600">
                {totalPrice.toLocaleString("vi-VN")}{" "}
              </span>
              VND
            </div>
          </div>
          <div className="flex justify-end">
            <Button color="green" variant="solid" className="w-full" onClick={showModal}>
              Tiếp theo
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Footer;
