import Header from "../app/components/header";
import Sidebar from "../app/components/sidebar";
import type { JSX } from "react";

interface DefaultLayoutProps {
  children: JSX.Element;
}

const DefaultLayout = (props: DefaultLayoutProps) => {
  const { children } = props;
  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100">
      <Header />
      <div className="flex mt-[85px] flex-1">
        <Sidebar />
        <div className="flex-1 overflow-auto ml-[76px] bg-gray-800/60 backdrop-blur-sm rounded-tl-3xl shadow-inner p-6">
          {children}
        </div>
      </div>
    </div>

  );
};
export default DefaultLayout;
