import { Input } from "antd";

interface ConditionProps {
  searchName: string;
  setSearchName: (value: string) => void;
  searchEmail: string;
  setSearchEmail: (value: string) => void;
  // searchStatus: string;
  // setSearchStatus: (value: string) => void;
}
const Condition = (props: ConditionProps) => {
  const {searchName, searchEmail, setSearchEmail, setSearchName} = props

  // const handleChange = (e: string) => {
  //   setSearchStatus(e);
  // }
  return (
    <>
      <div className="flex m-2 gap-2">
        <Input
          placeholder="Tìm theo tên"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className="w-full"
        />
        <Input
          type="text"
          placeholder="Tìm theo email"
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
          className="w-full"
        />
        {/* <Select
          className="w-full"
          defaultValue="Tất cả trạng thái"
          value={searchStatus}
          onChange={handleChange}
          options={[
            { value: "", label: "Tất cả trạng thái" },
            { value: "Active", label: "Active" },
            { value: "Blocked", label: "Blocked" },
          ]}
        /> */}
      </div>
    </>
  );
};
export default Condition;
