import ModalViewField from "../../../../components/modal/Admin/ModalViewField";
import ModalEditField from "../../../../components/modal/Admin/ModalEditField";
import Condition from "./Condition";
import { Button } from "antd";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../../../store";
import { useSelector } from "react-redux";
import {
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

  const handleView = (fieldId: number) => {
    dispatch(actionGetDetailField(fieldId));
    setIsOpenModalViewField(true);
  };

  const handleEdit = (fieldId: number) => {
    dispatch(actionGetDetailField(fieldId));
    setIsOpenModalEdit(true);
  };

  useEffect(() => {
    dispatch(actionGetFields());
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
              {/* <div className="w-full p-2 flex justify-center text-[14px] text-gray-700">
                Trạng thái
              </div> */}
              <div className="w-full p-2 flex justify-center text-[14px] text-gray-700">
                Hành động
              </div>
            </div>

            {filteredData.map((field) => (
              <div key={field.fieldId} className="flex items-center">
                <div
                  className="w-full p-2 flex truncate text-[14px] text-gray-700
             cursor-pointer 
             relative group"
                  title={field.fieldName}
                >
                  {field.fieldName}
                </div>
                <div
                  className="w-full p-2 flex truncate text-[14px] text-gray-700
             cursor-pointer 
             relative group"
                  title={field.location}
                >
                  {field.location}
                </div>
                <div className="w-full p-2 flex text-[14px] text-gray-700 justify-center">
                  {field.price.toLocaleString("vi-VN")}
                </div>
                {/* <div className="w-full p-2 flex justify-center">
                  {user.status === "Active" ? (
                    <Tag color="blue">Active</Tag>
                  ) : user.status === "Blocked" ? (
                    <Tag color="error">Blocked</Tag>
                  ) : (
                    <Tag color="orange">Pending</Tag>
                  )}
                </div> */}
                <div className="w-full p-2 flex gap-2">
                  {/* {user.status === "Pending" ? ( */}
                  <>
                    {/* <Button color="green" variant="solid" onClick={() => {}}>
                        Accept
                      </Button> */}
                    <Button
                      color="blue"
                      variant="outlined"
                      onClick={() => handleView(field.fieldId)}
                    >
                      View
                    </Button>
                  </>
                  {/* // ) : ( */}
                  <>
                    <Button
                      color="orange"
                      variant="outlined"
                      onClick={() => handleEdit(field.fieldId)}
                    >
                      Chỉnh sửa
                    </Button>
                    {/* {field. === "Active" ? ( */}
                    <Button color="danger" variant="solid" onClick={() => {}}>
                      Block
                    </Button>
                    {/* ) : ( */}
                    {/* <Button
                          color="blue"
                          variant="outlined"
                          onClick={() => {}}
                        >
                          Unblock
                        </Button>
                      )} */}
                  </>
                  {/* )} */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
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
