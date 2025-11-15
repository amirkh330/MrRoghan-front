import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  access: string;
  refresh: string;
  isAuth: boolean;
  loginUser: ({access, refresh}:{access: string, refresh: string}) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuth: false,
      access: "",
      refresh: "",
      loginUser: ({access, refresh}) => {
        set({
          isAuth: true,
          access,
          refresh,
        });
      },

      logout: () => {
        set({
          isAuth: false,
          access: "",
          refresh: "",
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
