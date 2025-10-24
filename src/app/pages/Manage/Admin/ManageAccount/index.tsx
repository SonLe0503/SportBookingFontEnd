/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Spin } from "antd";
import Condition from "./Condition";
import { useEffect, useMemo, useState } from "react";
import ModalEditAccount from "../../../../components/modal/Admin/ModalEditAccount";
import ModalAddAccount from "../../../../components/modal/Admin/ModalAddAccount";
import { useAppDispatch } from "../../../../../store";
import { useSelector } from "react-redux";
import {
  actionGetAccounts,
  selectAccountList,
} from "../../../../../store/accountSlide";

const ManageAccount = () => {
  const dispatch = useAppDispatch();
  const accountList = useSelector(selectAccountList);
  const [searchName, setSearchName] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  // const [searchStatus, setSearchStatus] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAddOpen, setModalAddOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(actionGetAccounts());
      setLoading(false);
    };
    fetchData();
  }, [dispatch]);

  const filteredData = useMemo(() => {
    return accountList.filter(
      (user) =>
        user.username
          .toLowerCase()
          .replace(/\s+/g, "")
          .includes(searchName.toLowerCase().replace(/\s+/g, "")) &&
        user.email
          .toLowerCase()
          .replace(/\s+/g, "")
          .includes(searchEmail.toLowerCase().replace(/\s+/g, ""))
      // (searchStatus === "" ||
      //   user.status?.toLowerCase().includes(searchStatus.toLowerCase()))
    );
  }, [accountList, searchName, searchEmail]);

  return (
    <>
      <div className="w-full h-auto flex flex-col">
        <Condition
          searchName={searchName}
          searchEmail={searchEmail}
          setSearchName={setSearchName}
          setSearchEmail={setSearchEmail}
          // searchStatus= {searchStatus}
          // setSearchStatus= {setSearchStatus}
        />
        <div className="flex mx-2 justify-end">
          <Button
            type="primary"
            className="!rounded-[15px]"
            onClick={() => setModalAddOpen(true)}
          >
            + Thêm mới
          </Button>
        </div>

        {/* --- Bảng dữ liệu --- */}
        <div className="m-2 rounded-[15px] bg-[#FFFFFF] shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
          <div className="rounded-t-[15px] w-full">
            <div className="flex bg-gray-100 rounded-t-[15px]">
              <div className="w-full p-2 text-center text-[14px] text-gray-700">
                Tên
              </div>
              <div className="w-full p-2 text-center text-[14px] text-gray-700">
                Email
              </div>
              <div className="w-full p-2 text-center text-[14px] text-gray-700">
                Role
              </div>
              <div className="w-full p-2 text-center text-[14px] text-gray-700">
                Trạng thái
              </div>
              <div className="w-full p-2 text-center text-[14px] text-gray-700">
                Hành động
              </div>
            </div>

            {/* --- Hiển thị loading hoặc dữ liệu --- */}
            {loading ? (
              <div className="flex justify-center py-4">
                <Spin />
              </div>
            ) : filteredData.length === 0 ? (
              <div className="text-center text-gray-500 py-4">
                Không có tài khoản nào
              </div>
            ) : (
              filteredData.map((user) => (
                <div
                  key={user.userId}
                  className="flex items-center border-t hover:bg-gray-50 transition"
                >
                  <div
                    className="w-full p-2 text-[14px] text-gray-700 truncate"
                    title={user.username}
                  >
                    {user.username}
                  </div>
                  <div
                    className="w-full p-2 text-[14px] text-gray-700 truncate"
                    title={user.email}
                  >
                    {user.email}
                  </div>
                  <div className="w-full p-2 text-center text-[14px] text-gray-700">
                    {user.role}
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

                  {/* --- Hành động --- */}
                  {user.role === "pending" ? (
                    <div className="w-full p-2 flex justify-center gap-2">
                      <Button type="primary">Accept</Button>
                      <Button danger ghost>
                        Reject
                      </Button>
                    </div>
                  ) : (
                    <div className="w-full p-2 flex justify-center gap-2">
                      <Button
                        onClick={() => {
                          setSelectedAccount(user);
                          setIsModalOpen(true);
                        }}
                      >
                        Chỉnh sửa
                      </Button>
                      {/* {user.status === "Active" ? ( */}
                      <Button danger>Block</Button>
                      {/* // ) : (
                      //   <Button type="primary" ghost>
                      //     Unblock
                      //   </Button>
                      // )} */}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <ModalEditAccount
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        data={selectedAccount}
      />
      <ModalAddAccount
        modalAddOpen={modalAddOpen}
        setModalAddOpen={setModalAddOpen}
      />
    </>
  );
};
export default ManageAccount;
