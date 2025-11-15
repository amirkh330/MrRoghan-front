import { NotFound } from "@/components/Common/Notfound/NotFound";
import { LoginPage } from "@/Pages/login/login";
import useAuthStore from "@/store/authStore";
import { Navigate, RouteObject } from "react-router-dom";

const PrivateRoute = ({
  element,
  isHost = false,
}: {
  element: JSX.Element;
  isHost?: boolean;
}) => {
  const { isAuth } = useAuthStore();
  if (!isAuth) {
    return isAuth ? element : <Navigate to="/login" replace />;
  }
};

export const allRoutes: Array<RouteObject> = [
  { path: "/login", element: <LoginPage /> },
  { path: "*", element: <NotFound /> },
  // { path: "/panel/sign-in", element: <PrivateRoute element={<PanelSignIn />} isHost />},
];
