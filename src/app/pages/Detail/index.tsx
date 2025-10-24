/* eslint-disable react-hooks/rules-of-hooks */
import Information from "./Information";
import FeedBack from "./FeedBack";
import Image from "./Image";
import Service from "./Service";
import {
  ClockCircleOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  StarFilled,
} from "@ant-design/icons";
import { Avatar, Badge, Button, Spin, Tabs, Tag } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import URL from "../../../constants/url";
import { useSelector } from "react-redux";
import { actionGetFields, selectFields } from "../../../store/fieldSlide";
import {
  actionGetFeedbacks,
  selectFeedbacks,
} from "../../../store/feedbackSlide";
import {
  actionGetAccounts,
  selectAccountList,
} from "../../../store/accountSlide";
import { useEffect, useMemo } from "react";
import { useAppDispatch } from "../../../store";
import { actionGetImageFields } from "../../../store/imageFieldSlice";

const Detail = () => {
  const { id } = useParams(); // Lấy fieldId từ URL
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const fields = useSelector(selectFields);
  const feedbacks = useSelector(selectFeedbacks);
  const accounts = useSelector(selectAccountList);

  const field = useMemo(
    () => fields.find((f) => f.fieldId === Number(id)),
    [fields, id]
  );

  // Tính rating trung bình
  const rating = useMemo(() => {
    const related = feedbacks.filter((fb) => fb.fieldId === Number(id));
    if (related.length === 0) return 0;
    const total = related.reduce((sum, fb) => sum + fb.rating, 0);
    return (total / related.length).toFixed(1);
  }, [feedbacks, id]);

  // Lấy thông tin chủ sân
  const owner = useMemo(() => {
    return accounts.find((a) => a.userId === field?.ownerId);
  }, [accounts, field]);

  if (!field) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin tip="Đang tải chi tiết sân..." size="large" />
      </div>
    );
  }
  const items = [
    {
      key: "info",
      label: "Thông tin",
      children: <Information place={field} />,
    },
    {
      key: "service",
      label: "Dịch vụ",
      children: <Service place={[field]} />,
    },
    {
      key: "images",
      label: "Hình ảnh",
      children: <Image place={field} />,
    },
    {
      key: "review",
      label: "Đánh giá",
      children: <FeedBack place={field!} />,
    },
  ];

  useEffect(() => {
    dispatch(actionGetFields());
    dispatch(actionGetFeedbacks());
    dispatch(actionGetAccounts());
    dispatch(actionGetImageFields());
  }, [dispatch]);
  return (
    <>
      <div className="flex flex-col w-full h-full items-center">
        <div className="h-[450px] flex flex-col w-[80%] mx-2 my-2 rounded-[15px] bg-[#FFFFFF] shadow-[0_3px_10px_rgb(0,0,0,0.2)] px-2 py-2 gap-2">
          <div className="relative h-[65%] w-full rounded-[10px]">
            <img
              src={field?.image}
              alt=""
              className="w-full h-full rounded-[10px]"
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <Badge
                count={
                  <span className="flex items-center gap-1 text-black bg-white rounded px-2 py-1 shadow">
                    <StarFilled className="!text-yellow-500" /> {rating}
                    <span>
                      {" "}
                      (
                      {
                        feedbacks.filter((f) => f.fieldId === field?.fieldId)
                          .length
                      }{" "}
                      đánh giá){" "}
                    </span>
                  </span>
                }
              />
            </div>
            <div className="absolute top-2 right-2 flex items-center gap-2">
              <Tag color="gold">{field?.type}</Tag>
              <div className="w-7 h-7 rounded-full bg-gray-400"></div>
            </div>
          </div>
          <div className="flex justify-between items-start">
            <div className="flex gap-3">
              <Avatar
                size={60}
                src={"https://cdn-icons-png.flaticon.com/512/1077/1077012.png"}
              />
              <div className="text-sm flex items-center">
                <div className="mb-1 text-[20px] font-bold">
                  {field?.fieldName}
                </div>
              </div>
            </div>
            <Button type="primary" ghost onClick={() => navigate(URL.Booking)}>
              Đặt lịch
            </Button>
          </div>
          <div>
            <div className="flex gap-2">
              <EnvironmentOutlined />
              <span> Địa chỉ: </span>
              <span>{field?.location}</span>
            </div>
            <div className="flex gap-2">
              <PhoneOutlined />
              <span>Điện thoại:</span>
              <span>{owner?.phone}</span>
            </div>
            <div className="flex gap-2">
              <ClockCircleOutlined />
              <span> Giờ: </span>
              <span>
                {field?.openTime || "?"} - {field?.closeTime || "?"}
              </span>
            </div>
          </div>
        </div>
        <div className="w-[80%]">
          <Tabs defaultActiveKey="info" tabBarGutter={32} items={items} />
        </div>
      </div>
    </>
  );
};
export default Detail;
