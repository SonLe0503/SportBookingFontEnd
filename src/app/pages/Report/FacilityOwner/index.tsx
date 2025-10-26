import { actionGetFeedbacks, selectFeedbacks, type IFeedback } from "../../../../store/feedbackSlide";
import type { AppDispatch } from "../../../../store";
import ModalReport from "../../../components/modal/Admin/ModalReport";
import { Button, Spin } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Report = () => {
  const dispatch = useDispatch<AppDispatch>();
  const feedbacks = useSelector(selectFeedbacks);
  const [openModal, setOpenModal] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState<IFeedback | null>(null);

  useEffect(() => {
    dispatch(actionGetFeedbacks());
  }, [dispatch]);
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

            {!feedbacks?.length ? (
              <div className="flex justify-center items-center h-[200px]">
                <Spin tip="Đang tải dữ liệu..." />
              </div>
            ) : (
              feedbacks.map((feedback) => (
                <div key={feedback.feedbackId} className="flex items-center w-full border-t">
                  <div
                    className="w-[20%] p-2 flex text-[14px] text-gray-700 truncate justify-center"
                    title={`UserID: ${feedback.userId}`}
                  >
                    Người dùng #{feedback.userId}
                  </div>
                  <div
                    className="w-[20%] p-2 flex truncate text-[14px] text-gray-700 justify-center"
                    title={`FieldID: ${feedback.fieldId}`}
                  >
                    Sân #{feedback.fieldId}
                  </div>
                  <div
                    className="w-[40%] p-2 flex text-[14px] text-gray-700 truncate"
                    title={feedback.comment}
                  >
                    {feedback.comment}
                  </div>
                  <div className="w-[20%] p-2 flex justify-center">
                    <Button
                      color="gold"
                      variant="outlined"
                      onClick={() => {
                        setSelectedFeedback(feedback);
                        setOpenModal(true);
                      }}
                    >
                      Phản hồi
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <ModalReport
        openModal={openModal}
        setOpenModal={setOpenModal}
        feedback={selectedFeedback}
      />
    </>
  );
};
export default Report;
