import { useSelector } from "react-redux";
import { Avatar, Card, Empty, Rate } from "antd";
import { selectFeedbacks } from "../../../store/feedbackSlide";
import { selectAccountList } from "../../../store/accountSlide";
import type { IField } from "../../../store/fieldSlide";

interface FeedBackProps {
  place: IField;
}
const FeedBack = (props: FeedBackProps) => {
  const { place } = props;
  const feedbacks = useSelector(selectFeedbacks);
  const accounts = useSelector(selectAccountList);

  // 🔍 Lọc feedbacks thuộc sân hiện tại
  const placeFeedbacks = feedbacks.filter((fb) => fb.fieldId === place.fieldId);

  // 🧩 Kết hợp thông tin user với feedback
  const feedbackWithUser = placeFeedbacks.map((fb) => {
    const user = accounts.find((u) => u.userId === fb.userId);
    return {
      ...fb,
      userName: user?.username || "Người dùng ẩn danh",
      userAvatar: "https://cdn-icons-png.flaticon.com/512/1077/1077012.png",
    };
  });
  return (
    <>
      <div className="w-full flex flex-col gap-3 mt-4">
        {feedbackWithUser.length === 0 ? (
          <Empty description="Chưa có đánh giá nào cho sân này" />
        ) : (
          feedbackWithUser.map((fb) => (
            <Card
              key={fb.feedbackId}
              className="shadow-sm rounded-lg w-[80%] mx-auto hover:shadow-md transition-all"
            >
              <div className="flex gap-3 items-start">
                <Avatar src={fb.userAvatar} size={40} />
                <div className="flex-1">
                  <div className="font-semibold text-gray-800 text-[14px]">
                    {fb.userName}
                  </div>
                  <Rate value={fb.rating} disabled className="text-sm" />
                  <div className="mt-1 text-gray-700 text-[14px]">
                    {fb.comment}
                  </div>
                  <div className="mt-3 flex items-center gap-2 border rounded-md p-2 bg-gray-50">
                    <Avatar
                      size={40}
                      src={place.image}
                      shape="square"
                      className="border"
                    />
                    <div className="flex flex-col text-[13px] text-gray-700">
                      <span className="font-medium">{place.fieldName}</span>
                      <span>{place.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </>
  );
};
export default FeedBack;
