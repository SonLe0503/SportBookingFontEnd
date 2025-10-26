import Header from "../app/components/header";
import Sidebar from "../app/components/sidebar";
import type { JSX } from "react";

interface DefaultLayoutProps {
  children: JSX.Element;
}

const DefaultLayout = (props: DefaultLayoutProps) => {
  const { children } = props;
  return (
    <div className=" flex-col flex h-screen">
      <Header />
      <div className="flex mt-[85px] flex-1">
        <Sidebar />
        <div className="flex-1 overflow-auto ml-[76px]">{children}</div>
      </div>
    </div>
  );
};
export default DefaultLayout;
