import useAuthStore from "@/store/authStore";
import axios, { AxiosInstance } from "axios";

export const CallApi: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  // withCredentials: true,
});
CallApi.interceptors.request.use(
  (config) => {
    const accessToken = useAuthStore.getState().access;
    if (accessToken) {
      config.headers.Authorization = `JWT ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const CallApiHost: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_PANEL_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const PostApi: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  withCredentials: true,
});
// CallApi.interceptors.request.use((config) => {
//   config.headers["Cookie"] =
//     "x-a=CfDJ8Panj9jrdUBNm4AVmhLEI7efenlrE46X8h7VmX7mifQQKp6__v8YAj2bKuZZg7nRua3eUJCBYjtOxVperF1fG-4E4-cgdUDNeX7mkrSAySbwVxwHv2Xq8k4Jh5jpoZGsgKNolV1jd7axUCdBkmwQT3XpcTIShSGvZZQz_hpAG_j3RJc9uETO0EJy7fb37Dus6o-uGaZe-ErmX7gRlHC0B-gJl0LkFokRJ4EX-WTwB072rSMHaH5kZKnm_ENmftVKxiDbZ_QQmJ84rtdz3wGbOylSr1u-X58PVRL-oO4OLw9pYy9FFqgIB4-fXhic8fwWQhE0key1OdlMRjnfOPmKI8G3XFNDUDgCo6PRiMQe7zSlrz-w9GeVLXbFmh5GRQqMZEKYGcsk6gaMWxjHkBshATIQZRbMVC7qi54xWlgXZf5KB60zninl2lfiEl4sB0ffBD9DWunq21j5-o1ufZnrJ2emR_WWVn3_xJqZkkv2IIl0YHbsyEPfjgFB7CcWkTEJyuBCp1horFqK59DFdp_WvGMdYKzlgOfA5oEwvcapJvFo";
//   config.headers["Amir"] =
//     "x-a=CfDJ8Panj9jrdUBNm4AVmhLEI7efenlrE46X8h7VmX7mifQQKp6__v8YAj2bKuZZg7nRua3eUJCBYjtOxVperF1fG-4E4-cgdUDNeX7mkrSAySbwVxwHv2Xq8k4Jh5jpoZGsgKNolV1jd7axUCdBkmwQT3XpcTIShSGvZZQz_hpAG_j3RJc9uETO0EJy7fb37Dus6o-uGaZe-ErmX7gRlHC0B-gJl0LkFokRJ4EX-WTwB072rSMHaH5kZKnm_ENmftVKxiDbZ_QQmJ84rtdz3wGbOylSr1u-X58PVRL-oO4OLw9pYy9FFqgIB4-fXhic8fwWQhE0key1OdlMRjnfOPmKI8G3XFNDUDgCo6PRiMQe7zSlrz-w9GeVLXbFmh5GRQqMZEKYGcsk6gaMWxjHkBshATIQZRbMVC7qi54xWlgXZf5KB60zninl2lfiEl4sB0ffBD9DWunq21j5-o1ufZnrJ2emR_WWVn3_xJqZkkv2IIl0YHbsyEPfjgFB7CcWkTEJyuBCp1horFqK59DFdp_WvGMdYKzlgOfA5oEwvcapJvFo";
//   return config;
// });

// memoized to prevent race conditions
// const handleRefreshToken = memoize(
//   async function refreshTokenFn() {
//     const refreshToken = useAuthStore.getState().refreshToken;

//     try {
//       await axios
//         .post(
//           "auth/refresh/",
//           { refresh: refreshToken },
//           {
//             baseURL: `${BASE_URL}`,
//             headers: {
//               Accept: "application/json",
//               "Content-Type": "application/json",
//             },
//           }
//         )
//         .then((res) => {
//           useAuthStore.setState({ accessToken: res.data.response.access });
//           useAuthStore.setState({ refreshToken: res.data.response.refresh });
//         });
//     } catch (error) {
//       useAuthStore.setState({ accessToken: "" });
//       useAuthStore.setState({ refreshToken: "" });
//       window.location.href = RoutesName.LOGIN;
//       return Promise.reject(error);
//     }
//   },
//   { promise: true, maxAge: 5000 }
// );

// fetchApi.interceptors.request.use(
//   (config) => {
//     const accessToken = useAuthStore.getState().accessToken;
//     const refreshToken = useAuthStore.getState().refreshToken;

//     const tokensData = { accessToken, refreshToken };

//     if (tokensData.accessToken) {
//       config.headers["Authorization"] = `JWT ${tokensData.accessToken}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
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
//     return Promise.reject(error);
//   }
// );
