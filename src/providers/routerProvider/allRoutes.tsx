import { NotFound } from "@/components/Common/Notfound/NotFound";
import { CustomerDashboard } from "@/Pages/[customer]/customerDashboard/customerDashboard";
import { CustomerReports } from "@/Pages/[customer]/customerReports/customerReports";
import { ShopCreateOrder } from "@/Pages/[shop]/shopCreateOrder/shopCreateOrder";
import { ShopCustomers } from "@/Pages/[shop]/shopCustomers/shopCustomers";
import { ShopDashboard } from "@/Pages/[shop]/shopDashboard/shopDashboard";
import { ShopReports } from "@/Pages/[shop]/shopReport/shopReport";
import Home from "@/Pages/home/home";
import { LoginPage } from "@/Pages/login/login";
import { Register } from "@/Pages/regester/register";
import useAuthStore from "@/store/authStore";
import { Navigate, RouteObject } from "react-router-dom";

const PrivateRoute = ({ element }: { element: JSX.Element }) => {
  const { isAuth } = useAuthStore();
  if (!isAuth) {
    return isAuth ? element : <Navigate to="/login" replace />;
  }
};

export const allRoutes: Array<RouteObject> = [
  { path: "/", element: <Home /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <Register /> },
  
  { path: "*", element: <NotFound /> },

  // Customer //
  {
    path: "/customer/dashboard",
    element: <PrivateRoute element={<CustomerDashboard />} />,
  },
  {
    path: "/customer/reports",
    element: <PrivateRoute element={<CustomerReports />} />,
  },

  // SHOP //
  {
    path: "/shop/dashboard",
    element: <PrivateRoute element={<ShopDashboard />} />,
  },
  {
    path: "/shop/create-order",
    element: <PrivateRoute element={<ShopCreateOrder />} />,
  },
  {
    path: "/shop/reports",
    element: <PrivateRoute element={<ShopReports />} />,
  },
  {
    path: "/shop/customers",
    element: <PrivateRoute element={<ShopCustomers />} />,
  },
];
