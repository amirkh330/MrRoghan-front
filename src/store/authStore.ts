import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  access: string;
  refresh: string;
  fullName: string;
  role: string;
  phoneNumber: string;
  shopName?: string;
  isAuth: boolean;
  loginUser: ({
    access,
    refresh,
    fullName,
    phoneNumber,
    role,
    shopName,
  }: {
    access: string;
    refresh: string;
    fullName: string;
    phoneNumber: string;
    role: string;
    shopName?: string;
  }) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuth: false,
      access: "",
      refresh: "",
      fullName: "",
      role: "",
      phoneNumber: "",
      loginUser: ({
        access,
        refresh,
        fullName,
        phoneNumber,
        role,
        shopName,
      }) => {
        set({
          isAuth: true,
          access,
          refresh,
          fullName,
          phoneNumber,
          role,
          shopName,
        });
      },

      logout: () => {
        set({
          isAuth: false,
          access: "",
          refresh: "",
          fullName: "",
          role: "",
          phoneNumber: "",
          shopName: "",
        });
        localStorage.clear();
      },
    }),
    {
      name: "auth-storage",
      // getStorage: () => localStorage,
    }
  )
);

export default useAuthStore;
