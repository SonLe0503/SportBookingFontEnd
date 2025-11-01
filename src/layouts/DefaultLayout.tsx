import Footer from "../app/components/footer";
import Header from "../app/components/header";
import Sidebar from "../app/components/sidebar";
import type { JSX } from "react";

interface DefaultLayoutProps {
  children: JSX.Element;
}

const DefaultLayout = (props: DefaultLayoutProps) => {
  const { children } = props;
  return (
    <div className="flex flex-col h-screen animated-bg">
      <Header />
      <div className="flex mt-[85px] flex-1 overflow-auto">
        <Sidebar />
        <div className="flex-1 overflow-auto ml-[76px] p-6">{children}</div>
      </div>
      <Footer/>
    </div>

  );
};
export default DefaultLayout;
