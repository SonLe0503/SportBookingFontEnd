import { Button } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../../../store";
import {
  actionGetFields,
  selectFields,
  selectSelectedField,
  actionGetDetailField,
} from "../../../../../store/fieldSlide";
import { selectInfoLogin } from "../../../../../store/authSlide";

import ModalViewField from "../../../../components/modal/Admin/ModalViewField";
import ModalEditField from "../../../../components/modal/Admin/ModalEditField";
import Condition from "./Conditiion";
import ModalRegisterField from "../../../../components/modal/FacilityOwner/ModalRegisterField";

const ManageFieldOwner = () => {
  const dispatch = useAppDispatch();
  const fields = useSelector(selectFields);
  const selectedField = useSelector(selectSelectedField);
  const { userId } = useSelector(selectInfoLogin);

  const [searchName, setSearchName] = useState("");
  const [searchAddress, setSearchAddress] = useState("");
  const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);
  const [isOpenModalViewField, setIsOpenModalViewField] = useState(false);

  const [openRegisterField, setOpenRegisterField] = useState(false);

  useEffect(() => {
    dispatch(actionGetFields());
  }, [dispatch]);

  // 👉 Lọc các sân theo ownerId
  const ownerFields = fields.filter((f) => f.ownerId === Number(userId));

  // 👉 Áp dụng thêm bộ lọc tìm kiếm
  const filteredData = ownerFields.filter(
    (field) =>
      field.fieldName.toLowerCase().includes(searchName.toLowerCase()) &&
      field.location.toLowerCase().includes(searchAddress.toLowerCase())
  );

  const handleView = (id: number) => {
    dispatch(actionGetDetailField(id));
    setIsOpenModalViewField(true);
  };

  const handleEdit = (id: number) => {
    dispatch(actionGetDetailField(id));
    setIsOpenModalEdit(true);
  };

  return (
    <div className="h-auto flex flex-col">
      <Condition
        searchName={searchName}
        setSearchName={setSearchName}
        searchAddress={searchAddress}
        setSearchAddress={setSearchAddress}
      />
      <div className="flex  justify-end">
        <Button
          color="blue"
          variant="outlined"
          className="!rounded-[15px] mx-2"
          onClick={() => setOpenRegisterField(true)}
        >
          + Thêm sân mới
        </Button>
      </div>
      <div className="m-2 rounded-[15px] flex bg-[#FFFFFF] shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
        <div className="rounded-t-[15px] w-full">
          <div className="flex bg-gray-100 rounded-t-[15px]">
            <div className="flex w-full p-2 justify-center text-[14px] text-gray-700">
              Tên sân
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

          {filteredData.map((field) => (
            <div key={field.fieldId} className="flex items-center">
              <div className="w-full p-2 text-[14px] text-gray-700 text-center truncate">
                {field.fieldName}
              </div>
              <div className="w-full p-2 text-[14px] text-gray-700 truncate">
                {field.location}
              </div>
              <div className="w-full p-2 text-[14px] text-gray-700 text-center">
                {field.price.toLocaleString("vi-VN")}
              </div>
              <div className="w-full p-2 flex justify-center gap-2">
                <Button
                  type="default"
                  onClick={() => handleView(field.fieldId)}
                >
                  Xem
                </Button>
                <Button
                  type="primary"
                  onClick={() => handleEdit(field.fieldId)}
                >
                  Sửa
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ModalRegisterField
        openRegisterField={openRegisterField}
        setOpenRegisterField={setOpenRegisterField}
      />
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
    </div>
  );
};

export default ManageFieldOwner;
