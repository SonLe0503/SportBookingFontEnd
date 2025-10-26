/* eslint-disable @typescript-eslint/no-unused-vars */
import { actionGetFeedbacks, selectFeedbacks, type IFeedback } from "../../../../store/feedbackSlide";
import { useAppDispatch, useAppSelector } from "../../../../store";
import ModalReport from "../../../components/modal/Admin/ModalReport";
import { Button, message, Spin } from "antd";
import { useEffect, useState } from "react";

const ReportAdmin = () => {
  const dispatch = useAppDispatch();
  const feedbacks = useAppSelector(selectFeedbacks);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState<IFeedback | null>(null);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        setLoading(true);
        await dispatch(actionGetFeedbacks()).unwrap();
      } catch (err) {
        message.error("Không thể tải danh sách phản hồi!");
      } finally {
        setLoading(false);
      }
    };
    fetchFeedbacks();
  }, [dispatch]);

  return (
    <>
      <div className="w-full h-auto flex flex-col">
        <div className="m-2 rounded-[15px] flex flex-col bg-[#FFFFFF] shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
          <div className="flex bg-gray-100 rounded-t-[15px]">
            <div className="flex w-[15%] p-2 justify-center text-[14px] text-gray-700">
              Người dùng
            </div>
            <div className="flex w-[15%] p-2 justify-center text-[14px] text-gray-700">
              ID sân
            </div>
            <div className="w-[10%] p-2 flex justify-center text-[14px] text-gray-700">
              Đánh giá
            </div>
            <div className="w-[40%] p-2 flex justify-center text-[14px] text-gray-700">
              Bình luận
            </div>
            <div className="w-[20%] p-2 flex justify-center text-[14px] text-gray-700">
              Hành động
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-10">
              <Spin />
            </div>
          ) : feedbacks && feedbacks.length > 0 ? (
            feedbacks.map((fb) => (
              <div
                key={fb.feedbackId}
                className="flex items-center w-full border-t border-gray-100 hover:bg-gray-50 transition"
              >
                <div
                  className="w-[15%] p-2 flex text-[14px] text-gray-700 truncate justify-center"
                  title={String(fb.userId)}
                >
                  {fb.userId}
                </div>
                <div
                  className="w-[15%] p-2 flex text-[14px] text-gray-700 truncate justify-center"
                  title={String(fb.fieldId)}
                >
                  {fb.fieldId}
                </div>
                <div className="w-[10%] p-2 flex justify-center text-[14px] text-yellow-500 font-semibold">
                  {fb.rating} ⭐
                </div>
                <div
                  className="w-[40%] p-2 flex text-[14px] text-gray-700 truncate"
                  title={fb.comment}
                >
                  {fb.comment}
                </div>
                <div className="w-[20%] p-2 flex justify-center">
                  <Button
                    type="default"
                    onClick={() => {
                      setSelectedFeedback(fb);
                      setOpenModal(true);
                    }}
                    className="border-yellow-500 text-yellow-600 hover:bg-yellow-50"
                  >
                    Phản hồi
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-5 text-center text-gray-500">
              Không có phản hồi nào.
            </div>
          )}
        </div>
      </div>

      <ModalReport openModal={openModal} setOpenModal={setOpenModal} feedback={selectedFeedback}/>
    </>
  );
};
export default ReportAdmin;
