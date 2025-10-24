
import type { IField } from "../../../store/fieldSlide";
import { Table } from "antd";

const columns = [
  {
    title: "Tên sân",
    dataIndex: "fieldName",
    key: "fieldName",
  },
  {
    title: "Địa điểm",
    dataIndex: "location",
    key: "location",
  },
  {
    title: "Giá (VNĐ)",
    dataIndex: "price",
    key: "price",
    render: (price: number) => price?.toLocaleString("vi-VN"),
  },
  {
    title: "Loại sân",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "Giờ mở cửa",
    dataIndex: "openTime",
    key: "openTime",
  },
  {
    title: "Giờ đóng cửa",
    dataIndex: "closeTime",
    key: "closeTime",
  },
  {
    title: "Ngày mở cửa",
    dataIndex: "openDays",
    key: "openDays",
  },
  {
    title: "Giá cố định?",
    dataIndex: "isFixedPrice",
    key: "isFixedPrice",
    render: (value: boolean | null) => (value ? "Có" : "Không"),
  },
];

interface ServiceProps {
  place: IField[];
}

const Service = (props: ServiceProps) => {
  const { place } = props;
  return (  
    <>
      <div className="w-full ">
        <Table
          dataSource={place?.map((item) => ({ ...item, key: item.fieldId }))}
          columns={columns}
          pagination={false}
        />
      </div>
    </>
  );
};
export default Service;
