import { StarFilled } from "@ant-design/icons";
import { Avatar, Badge, Button, Tag } from "antd";
import { useEffect, useState } from "react";
import Condition from "./Condition";
import { useNavigate } from "react-router-dom";
import URL from "../../../constants/url";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../store/index";
import { actionGetFields, selectFields } from "../../../store/fieldSlide";
import {
  actionGetFeedbacks,
  selectFeedbacks,
} from "../../../store/feedbackSlide";
import {
  actionGetAccounts,
  selectAccountList,
} from "../../../store/accountSlide";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const fields = useSelector(selectFields);
  console.log("🧩 fields trong Home:", fields);
  const feedbacks = useSelector(selectFeedbacks);
  const accounts = useSelector(selectAccountList);
  const [searchName, setSearchName] = useState("");
  const [searchType, setSearchType] = useState("All");

  const filteredData = fields.filter((item) => {
    const matchName = item.fieldName
      .toLowerCase()
      .replace(/\s+/g, "")
      .includes(searchName.toLowerCase().replace(/\s+/g, ""));
    const matchType =
      (searchType === "All" || item.type === searchType) &&
      item.fieldName.toLowerCase().includes(searchName.toLowerCase());
    return matchName && matchType;
  });
  const getAverageRating = (fieldId: number) => {
    const fieldFeedbacks = feedbacks.filter((f) => f.fieldId === fieldId);
    if (fieldFeedbacks.length === 0) return 0;
    const total = fieldFeedbacks.reduce((sum, f) => sum + f.rating, 0);
    return (total / fieldFeedbacks.length).toFixed(1);
  };

  const getOwnerPhone = (ownerId: number) => {
    const owner = accounts.find((a) => a.userId === ownerId);
    return owner ? owner.phone : "Không có";
  };

  useEffect(() => {
    dispatch(actionGetFields());
    dispatch(actionGetFeedbacks());
    dispatch(actionGetAccounts());
  }, [dispatch]);
  const handleClickDetail = (id: number) => {
    navigate(URL.Detail.replace(":id", id.toString()));
  };

  const handleClickBooking = (id: number) => {
    navigate(URL.Booking.replace(":id", id.toString()));
  };

  return (
    <>
      <div className="flex w-full h-full p-2 flex-col gap-2">
        <Condition
          searchName={searchName}
          setSearchName={setSearchName}
          searchType={searchType}
          setSearchType={setSearchType}
        />
        <div className="flex flex-wrap justify-between gap-2">
          {filteredData.map((index) => (
            <div
              key={index.fieldId}
              className="h-[250px] w-[49%] rounded-[15px] bg-[#FFFFFF] shadow-[0_3px_10px_rgb(0,0,0,0.2)] px-2 py-2 flex flex-col gap-2"
            >
              <div className="relative h-[60%] w-full rounded-[10px]">
                <img
                  src={`http://sportspace.somee.com${index.image}`}
                  alt={index.fieldName}
                  className="w-full h-full rounded-[10px]"
                  onClick={() => handleClickDetail(index.fieldId)}
                />
                <div className="absolute top-2 left-2">
                  <Badge
                    count={
                      <span className="flex items-center gap-1 text-black bg-white rounded px-2 py-1 shadow">
                        <StarFilled className="!text-yellow-500" />{" "}
                        {getAverageRating(index.fieldId)}
                      </span>
                    }
                  />
                </div>
                <div className="absolute top-2 right-2 flex items-center gap-2">
                  <Tag
                    color={
                      index.fieldName.includes("Cầu lông")
                        ? "blue"
                        : index.fieldName.includes("Bóng đá")
                        ? "green"
                        : index.fieldName.includes("Pickleball")
                        ? "volcano"
                        : "default"
                    }
                  >
                    {index.type}
                  </Tag>
                  <div className="w-7 h-7 rounded-full bg-gray-400"></div>
                </div>
              </div>
              <div className="flex justify-between items-start">
                <div className="flex gap-3">
                  <Avatar
                    size={60}
                    src={`http://sportspace.somee.com${index.avatar}`}
                  />
                  <div className="text-sm">
                    <div className="font-semibold">{index.fieldName}</div>
                    <div className="">
                      <strong>Địa chỉ: </strong>
                      {index.location}
                    </div>
                    <div className="">
                      <strong>Điện thoại: </strong>
                      {getOwnerPhone(index.ownerId)}
                    </div>
                    <div className="">
                      <strong>Giờ: </strong>
                      {index.openTime} - {index.closeTime}
                    </div>
                  </div>
                </div>
                <Button
                  type="primary"
                  ghost
                  onClick={() => handleClickBooking(index.fieldId)}
                >
                  Đặt lịch{" "}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default Home;
