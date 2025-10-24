import { useSelector } from "react-redux";
import type { EUserRole } from "../interface/app";
import type { JSX } from "react";
import { selectIsLogin } from "../store/authSlide";
import { Navigate } from "react-router-dom";
import URL from "../constants/url";

interface PrivateLayoutProps {
  children: JSX.Element;
  permission?: EUserRole
}

const PrivateLayout = (props: PrivateLayoutProps) => {
  const isLogin = useSelector(selectIsLogin);
  const { children } = props;

  if (!isLogin){
    return <Navigate to={URL.Login} replace/>
  }
  return <>{children}</>;
};
export default PrivateLayout;
