import {
  AppstoreOutlined,
  DribbbleOutlined,
  SmileOutlined,
  TabletOutlined,
} from "@ant-design/icons";
import { Input, Radio } from "antd";

interface ConditionProps {
  searchName: string;
  setSearchName: (value: string) => void;
  searchType: string;
  setSearchType: (value: string) => void;
}
const Condition = (props: ConditionProps) => {
  const { searchName, setSearchName, searchType, setSearchType } = props;
  return (
    <>
      <div className="flex gap-2 items-center w-full border border-gray-300 rounded-lg">
        <div className="flex-1">
          <Input
            placeholder="Tìm theo tên"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className="w-full !border-none focus:!shadow-none !bg-transparent"
          />
        </div>
        <Radio.Group
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          optionType="button"
          buttonStyle="solid"
          className="flex gap-2 justify-center"
        >
          <Radio.Button
          value="All"
          className="!border-none !shadow-none !bg-transparent hover:!bg-gray-100"
        >
          <AppstoreOutlined className="mr-1" />
          Tất cả
        </Radio.Button>
          <Radio.Button value="Pickleball" className="!border-none !shadow-none !bg-transparent hover:!bg-gray-100">
            <SmileOutlined className="mr-1" />
            Pickleball
          </Radio.Button>
          <Radio.Button value="Cầu lông" className="!border-none !shadow-none !bg-transparent hover:!bg-gray-100">
            <TabletOutlined className="mr-1" />
            Cầu lông
          </Radio.Button>
          <Radio.Button value="Bóng đá" className="!border-none !shadow-none !bg-transparent hover:!bg-gray-100">
            <DribbbleOutlined className="mr-1" />
            Bóng đá
          </Radio.Button>
        </Radio.Group>
      </div>
    </>
  );
};
export default Condition;
