  import { Input, Select } from "antd";

  interface ConditrionProps {
    searchName: string;
    searchAddress: string;
    searchStatus: string;
    setSearchName: (value: string) => void; 
    setSearchAddress: (value: string) => void;
    setSearchStatus: (value: string) => void;
  }
  const Condition = (props: ConditrionProps) => {
    const {searchName, searchAddress, searchStatus, setSearchName, setSearchAddress, setSearchStatus} = props
    const handleChange = (e: string) => {
      setSearchStatus(e);
    }
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
            placeholder="Tìm theo địa chỉ sân"
            value={searchAddress}
            onChange={(e) => setSearchAddress(e.target.value)}
            className="w-full"
          />
          <Select
            className="w-full"
            defaultValue="Tất cả trạng thái"
            value={searchStatus}
            onChange={handleChange}
            options={[
              { value: "", label: "Tất cả trạng thái" },
              { value: "Active", label: "Active" },
              { value: "Blocked", label: "Blocked" },
            ]}
          />
        </div>
      </>
    )
  }
  export default Condition;