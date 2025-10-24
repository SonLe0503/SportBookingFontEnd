import { Routes } from "react-router-dom"
import { lazy, Suspense } from "react"
import { DEFAULT_LAYOUT, NONE_LAYOUT } from "../constants/layout"
import type { ItemRoute } from "../interface/layout"
import URL from "../constants/url"
import DefaultLayout from "./DefaultLayout"
import { Route } from "react-router-dom"
// import PrivateLayout from "./PrivateLayout"

const Home = lazy(() => import("../app/pages/Home"));
const Detail = lazy(() => import("../app/pages/Detail"));
const Booking = lazy(() => import("../app/pages/Booking"));
const ManageAccount = lazy(() => import("../app/pages/Manage/Admin/ManageAccount"));
const ManageFeild = lazy(() => import("../app/pages/Manage/Admin/ManageField"));
const ManageBooking = lazy(() => import("../app/pages/Manage/FacilityOwner/ManageBooking"));
const ManageField = lazy(() => import("../app/pages/Manage/FacilityOwner/ManageField"));
const BookingHistory = lazy(() => import("../app/pages/Booking/History"));
const DashBoardAdmin = lazy(() => import("../app/pages/Dashboard/Admin"));
const DashBoard = lazy(() => import("../app/pages/Dashboard/FacilityOwner"));
const ReportAdmin = lazy(() => import("../app/pages/Report/Admin"));
const Report = lazy(() => import("../app/pages/Report/FacilityOwner"));
const Login = lazy(() => import("../app/pages/Login"))
const Register = lazy(() => import("../app/pages/Register")); 


const shareResourceItem: ItemRoute [] = [
  {
    key: URL.Login,
    components: <Login/>,
    layout: NONE_LAYOUT,
    private: false,
  },
  {
    key: URL.Register,
    components: <Register/>,
    layout: NONE_LAYOUT,
    private: false,
  }
]

const sideBarRouter: ItemRoute [] = [
  {
    key: URL.HOME,
    components: <Home/>,
    layout: DEFAULT_LAYOUT,
    private: true,
  },
  {
    key: URL.Detail,
    components: <Detail/>,
    layout: DEFAULT_LAYOUT,
    private: true,
  },
  {
    key: URL.Booking,
    components: <Booking/>,
    layout: DEFAULT_LAYOUT,
    private:true,
  },
  {
    key: URL.ManageAccount,
    components: <ManageAccount/>,
    layout: DEFAULT_LAYOUT,
    private: true,
  },
  {
    key: URL.ManageField,
    components: <ManageFeild/>,
    layout: DEFAULT_LAYOUT,
    private: true,
  },
  {
    key: URL.ManageBooking,
    components: <ManageBooking/>,
    layout: DEFAULT_LAYOUT,
    private: true,
  },
  {
    key: URL.BookingHistory,
    components: <BookingHistory/>,
    layout: DEFAULT_LAYOUT,
    private: true,
  },
  {
    key: URL.DashBoardAdmin,
    components: <DashBoardAdmin/>,
    layout: DEFAULT_LAYOUT,
    private: true,
  },
  {
    key: URL.DashBoard,
    components: <DashBoard/>,
    layout: DEFAULT_LAYOUT,
    private: true,
  },
  {
    key: URL.ReportAdmin,
    components: <ReportAdmin/>,
    layout: DEFAULT_LAYOUT,
    private: true,
  },
  {
    key: URL.Report,
    components: <Report/>,
    layout: DEFAULT_LAYOUT,
    private: true,
  },
  {
    key: URL.ManageFieldOwner,
    components: <ManageField/>,
    layout: DEFAULT_LAYOUT,
    private: true,
  }
]

const menus = [...sideBarRouter, ...shareResourceItem];
const Routers = () => {
  return (
    <Routes>
      {menus.map((item) => {
      let element = item.components;
      element = (
        <Suspense fallback={<div className="min-h-screen"/>}>
          {element}
        </Suspense>
      );
      // if(item.private) {
      //   element = (
      //     <PrivateLayout permission={item.permission}>{element}</PrivateLayout>
      //   )
      // }
      if (item.layout === DEFAULT_LAYOUT){
        element = <DefaultLayout>{element}</DefaultLayout>
      }
      return <Route key={item.key} path={item.key} element={element}/>
    })}
    </Routes>
  )
}
export default Routers;