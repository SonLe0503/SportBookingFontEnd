import { Avatar, Modal } from "antd";
import type { IField } from "../../../../store/fieldSlide";

interface ModalViewFieldProps {
  isOpenModalViewField: boolean;
  setIsOpenModalViewField: (value: boolean) => void;
  data?: IField | null;
}

const ModalViewField = ({ isOpenModalViewField, setIsOpenModalViewField, data }: ModalViewFieldProps) => {

  return (
    <>
    <Modal
      open={isOpenModalViewField}
      onCancel={() => setIsOpenModalViewField(false)}
      footer={null}
      centered
      width={600}
      className="rounded-2xl"
    >
      <div className="flex flex-col gap-6">
        {/* Tiêu đề */}
        <div className="text-center text-[24px] font-bold text-gray-800">
          Thông tin sân
        </div>

        {/* Avatar + tên sân */}
        <div className="flex items-center gap-4">
          <Avatar src={data?.image} size={64} />
          <div>
            <div className="text-lg font-semibold">{data?.fieldName}</div>
            <div className="text-sm text-gray-500">{data?.type}</div>
          </div>
        </div>

        {/* Chi tiết */}
        <div className="space-y-2 text-sm text-gray-700">
          <p><strong>Địa chỉ:</strong> {data?.location}</p>
          {/* <p><strong>SĐT:</strong> {data?.}</p> */}
          <p><strong>Thời gian mở cửa:</strong> {data?.openTime}</p>
          <p><strong>Ngày hoạt động:</strong> {data?.openDays}</p>
          {/* <p><strong>Khung giờ:</strong> {data?.openTime}</p> */}
          <p><strong>Giá cố định:</strong> {data?.price}</p>
          {/* <p><strong>Giá không cố định:</strong> {data.notfixed}</p> */}
          {data?.link && (
            <p>
              <strong>Link:</strong>{" "}
              <a href={data.link} target="_blank" rel="noreferrer" className="text-blue-500 underline">
                {data.link}
              </a>
            </p>
          )}
        </div>

        {/* Ảnh carousel nếu có */}
        {/* {data?.images && data.images.length > 0 && (
          <Carousel autoplay>
            {data.images.map((img: string, idx: number) => (
              <div key={idx}>
                <img
                  src={img}
                  alt={`img-${idx}`}
                  className="w-full h-64 object-cover rounded-xl"
                />
              </div>
            ))}
          </Carousel>
        )} */}
      </div>
    </Modal>
    </>
  )
}
export default ModalViewField;