import { useSelector } from "react-redux";
import { EUserRole } from "../interface/app";
import type { JSX } from "react";
import { selectIsLogin } from "../store/authSlide";
import { Navigate } from "react-router-dom";
import URL from "../constants/url";

interface PrivateLayoutProps {
  children: JSX.Element;
  permission?: EUserRole;
}

const PrivateLayout = (props: PrivateLayoutProps) => {
  const isLogin = useSelector(selectIsLogin);
  // const infoLogin = useSelector(selectInfoLogin);
  const { children } = props;

  if (!isLogin) {
    return <Navigate to={URL.Login} replace />;
  }
  // if (infoLogin?.role === EUserRole.ADMIN) {
  //   return <Navigate to={URL.DashBoardAdmin} replace />;
  // }

  // if (infoLogin?.role === EUserRole.FACILITY_OWNER) {
  //   return <Navigate to={URL.DashBoard} replace />;
  // }

  // if (infoLogin?.role === EUserRole.USER) {
  //   return <Navigate to={URL.HOME} replace />;
  // }

  return <>{children}</>;
};
export default PrivateLayout;
