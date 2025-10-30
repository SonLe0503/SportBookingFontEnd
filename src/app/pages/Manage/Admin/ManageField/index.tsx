/* eslint-disable @typescript-eslint/no-unused-vars */
import ModalViewField from "../../../../components/modal/Admin/ModalViewField";
import ModalEditField from "../../../../components/modal/Admin/ModalEditField";
import Condition from "./Condition";
import { Button, message, Spin } from "antd";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../../../store";
import { useSelector } from "react-redux";
import {
  actionDeleteField,
  actionGetDetailField,
  actionGetFields,
  selectFields,
  selectSelectedField,
} from "../../../../../store/fieldSlide";

const ManageField = () => {
  const dispatch = useAppDispatch();
  const fields = useSelector(selectFields);
  const selectedField = useSelector(selectSelectedField);

  const [searchName, setSearchName] = useState("");
  const [searchAddress, setSearchAddress] = useState("");
  const [searchStatus, setSearchStatus] = useState("");
  const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);
  const [isOpenModalViewField, setIsOpenModalViewField] = useState(false);

  const [loading, setLoading] = useState(false); // ✅ loading khi tải danh sách
  const [loadingDetail, setLoadingDetail] = useState(false); // ✅ loading khi xem hoặc sửa

  const filteredData = fields.filter(
    (field) =>
      field.fieldName
        .toLowerCase()
        .replace(/\s+/g, "")
        .includes(searchName.toLowerCase().replace(/\s+/g, "")) &&
      field.location
        .toLowerCase()
        .replace(/\s+/g, "")
        .includes(searchAddress.toLowerCase().replace(/\s+/g, ""))
  );

  const handleView = async (fieldId: number) => {
    setLoadingDetail(true);
    try {
      await dispatch(actionGetDetailField(fieldId));
      setIsOpenModalViewField(true);
    } finally {
      setLoadingDetail(false);
    }
  };

  const handleEdit = async (fieldId: number) => {
    setLoadingDetail(true);
    try {
      await dispatch(actionGetDetailField(fieldId));
      setIsOpenModalEdit(true);
    } finally {
      setLoadingDetail(false);
    }
  };

  const handleDelete = async (fieldId: number) => {
    const isConfirmed = window.confirm(
      "Bạn có chắc muốn xóa tài khoản này không?"
    );
    if (!isConfirmed) return;

    setLoadingDetail(true);
    try {
      await dispatch(actionDeleteField(fieldId)).unwrap();
      message.success("Đã block (xóa) sân thành công!");
    } catch (error) {
      message.error("Không thể block (xóa) sân, vui lòng thử lại!");
    } finally {
      setLoadingDetail(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await dispatch(actionGetFields());
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [dispatch]);

  return (
    <>
      <div className="h-auto flex flex-col">
        <Condition
          searchName={searchName}
          searchAddress={searchAddress}
          searchStatus={searchStatus}
          setSearchName={setSearchName}
          setSearchAddress={setSearchAddress}
          setSearchStatus={setSearchStatus}
        />

        {/* ✅ Hiển thị spinner khi đang tải dữ liệu */}

        <div className="m-2 rounded-[15px] flex bg-[#FFFFFF] shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
          <div className="rounded-t-[15px] w-full">
            <div className="flex bg-gray-100 rounded-t-[15px]">
              <div className="flex w-full p-2 justify-center text-[14px] text-gray-700">
                Tên sân{" "}
              </div>
              <div className="w-full p-2 flex justify-center text-[14px] text-gray-700">
                Địa chỉ
              </div>
              <div className="w-full p-2 flex justify-center text-[14px] text-gray-700">
                Giá thuê (VND/giờ)
              </div>
              <div className="w-full p-2 flex justify-center text-[14px] text-gray-700">
                Hành động
              </div>
            </div>

            <Spin spinning={loading || loadingDetail}>
              {filteredData.map((field) => (
                <div key={field.fieldId} className="flex items-center">
                  <div
                    className="w-full p-2 flex truncate text-[14px] text-gray-700 cursor-pointer relative group"
                    title={field.fieldName}
                  >
                    {field.fieldName}
                  </div>
                  <div
                    className="w-full p-2 flex truncate text-[14px] text-gray-700 cursor-pointer relative group"
                    title={field.location}
                  >
                    {field.location}
                  </div>
                  <div className="w-full p-2 flex text-[14px] text-gray-700 justify-center">
                    {field.price.toLocaleString("vi-VN")}
                  </div>

                  <div className="w-full p-2 flex gap-2 justify-center">
                    <Button
                      color="blue"
                      variant="outlined"
                      onClick={() => handleView(field.fieldId)}
                      loading={loadingDetail}
                    >
                      Xem
                    </Button>
                    <Button
                      color="orange"
                      variant="outlined"
                      onClick={() => handleEdit(field.fieldId)}
                      loading={loadingDetail}
                    >
                      Chỉnh sửa
                    </Button>
                    <Button
                      color="danger"
                      variant="solid"
                      onClick={() => handleDelete(field.fieldId)}
                    >
                      Block
                    </Button>
                  </div>
                </div>
              ))}
            </Spin>
          </div>
        </div>
      </div>

      {/* Modal xem & sửa sân */}
      <ModalEditField
        isOpenModalEdit={isOpenModalEdit}
        setIsOpenModalEdit={setIsOpenModalEdit}
        data={selectedField}
      />
      <ModalViewField
        isOpenModalViewField={isOpenModalViewField}
        setIsOpenModalViewField={setIsOpenModalViewField}
        data={selectedField}
      />
    </>
  );
};

export default ManageField;
