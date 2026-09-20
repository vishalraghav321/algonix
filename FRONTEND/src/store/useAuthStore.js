import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import { getErrorMessage } from "../lib/getErrorMessage.js";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigninUp: false,
  isLoggingIn: false,
  isCheckingAuth: false,

  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const response = await axiosInstance.get("/auth/check");
      set({ authUser: response.data.Data });
    } catch (error) {
      console.error("Error checking auth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigninUp: true });
    try {
      const response = await axiosInstance.post("/auth/register", data);
      set({ authUser: null });
      toast.success(
        "Account created. Please check your email to verify your account.",
      );
      return response.data;
    } catch (error) {
      console.error("error while signing up: ", error);
      toast.error(getErrorMessage(error, "Error while signing up"));
      throw error;
    } finally {
      set({ isSigninUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const response = await axiosInstance.post("/auth/login", data);
      set({ authUser: response.data.Data });
      toast.success(response.data.message);
    } catch (error) {
      console.error("error while loginin user: ", error);
      toast.error(getErrorMessage(error, "Error while loginin user"));
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.get("/auth/logout");
      set({ authUser: null });

      toast.success("User Logout Successfully");
    } catch (error) {
      console.error("Error while loging out user: ", error);
      toast.error(getErrorMessage(error, "Error while loging out the user"));
    }
  },

  refreshToken: async () => {
    try {
      const response = await axiosInstance.get("/auth/refreshTokens", {
        withCredentials: true,
      });

      set({ authUser: response.data.Data });
    } catch (error) {
      console.error("Error refreshing tokens: ", error);
    }
  },
}));
