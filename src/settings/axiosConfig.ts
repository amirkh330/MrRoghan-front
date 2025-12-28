import useAuthStore from "@/store/authStore";
import { BaseURL } from "@/utils/common";
import { useToast } from "@chakra-ui/react";
import axios, { AxiosError, AxiosInstance } from "axios";

let axiosInstance: AxiosInstance | null = null;

export const useApiService = () => {
  const toast = useToast();
  const { accessToken: token } = useAuthStore();

  if (!axiosInstance) {
    axiosInstance = axios.create({
      baseURL: BaseURL,
      timeout: 15000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Request Interceptor
    axiosInstance.interceptors.request.use(
      (config) => {
        // const token = localStorage.getItem("access_token");
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
      },
      (error) => {
        toast({
          title: "خطا در ارسال درخواست",
          description: "مشکلی در ارسال درخواست شما رخ داد.",
          variant: "destructive",
        });
        return Promise.reject(error);
      }
    );

    // Response Interceptor
    axiosInstance.interceptors.response.use(
      (response) => response,
      (error: AxiosError<any>) => {
        const status = error.response?.status;

        switch (status) {
          case 400:
            toast({
              title: "درخواست نامعتبر",
              description: error.response?.data?.message || "خطای 400",
              status: "error",
              position: "top",
            });
            break;

          case 401:
            toast({
              title: "نیاز به ورود",
              description: "دوباره وارد حساب کاربری شوید.",
              status: "error",
              position: "top",
            });
            // ممکنه بخوای کاربر رو لوگ‌اوت کنی
            localStorage.removeItem("access_token");
            break;

          case 403:
            toast({
              title: "عدم دسترسی",
              description: "شما اجازه انجام این عملیات را ندارید.",
              status: "error",
              position: "top",
            });
            break;

          case 500:
            toast({
              title: "خطای سرور",
              description: "در سرور مشکلی رخ داده است.",
              status: "error",
              position: "top",
            });
            break;

          default:
            toast({
              title: "خطا",
              description:
                error.response?.data?.message || "مشکل ناشناخته‌ای رخ داد.",
              status: "error",
              position: "top",
            });
        }

        return Promise.reject(error);
      }
    );
  }

  return axiosInstance;
};



// 
// import useAuthStore from "@/store/authStore/useAuthStore";
// import axios, { type AxiosInstance } from "axios";
// import memoize from "memoizee";
// import BASE_URL from "./settings";
// import { ROUTE_CONSTANTS } from "@/constant/AppRoutes";

// export const fetchApi: AxiosInstance = axios.create({
//   baseURL: `${BASE_URL}`,
//   headers: {
//     Accept: "application/json",
//     "Content-Type": "application/json",
//   },
// });

// // memoized to prevent race conditions
// const handleRefreshToken = memoize(
//   async function refreshTokenFn() {
//     const refreshToken = useAuthStore.getState().refreshToken;

//     try {
//       await axios
//         .post(
//           "/panel/user/auth/refresh/",
//           { refresh: refreshToken },
//           {
//             baseURL: `${BASE_URL}`,
//             headers: {
//               Accept: "application/json",
//               "Content-Type": "application/json",
//             },
//           },
//         )
//         .then((res) => {
//           useAuthStore.setState({ accessToken: res.data.response.access });
//           useAuthStore.setState({ refreshToken: res.data.response.refresh });
//         });
//     } catch (error) {
//       useAuthStore.setState({ accessToken: "" });
//       useAuthStore.setState({ refreshToken: "" });
//       // window.location.href = RoutesName.HOME;
//       window.location.href = ROUTE_CONSTANTS.ROOT.ABSOLUTE;

//       return Promise.reject(error);
//     }
//   },
//   { promise: true, maxAge: 5000 },
// );

// fetchApi.interceptors.request.use(
//   (config) => {
//     const accessToken = useAuthStore.getState().accessToken;
//     const refreshToken = useAuthStore.getState().refreshToken;

//     const tokensData = { accessToken, refreshToken };

//     if (tokensData.accessToken) {
//       config.headers["Authorization"] = `Bearer ${tokensData.accessToken}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   },
// );

// fetchApi.interceptors.response.use(
//   (response) => {
//     return Promise.resolve(response.data);
//   },
//   async (error) => {
//     const originalRequest = error.config;

//     if (
//       error.response.status === 401 &&
//       !originalRequest._retry &&
//       error.request.responseURL.search("auth/login/") === -1
//     ) {
//       originalRequest._retry = true;

//       try {
//         await handleRefreshToken();
//         return fetchApi(originalRequest);
//       } catch (refreshError) {
//         return Promise.reject(refreshError);
//       }
//     }

//     if (error.response.data) {
//       return Promise.reject(error.response.data);
//     }

//     return Promise.reject(error);
//   },
// );
