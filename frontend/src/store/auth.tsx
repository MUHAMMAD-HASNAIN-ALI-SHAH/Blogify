import { create } from "zustand";
import axiosInstance from "../utils/axios";
import toast from "react-hot-toast";
import useBlogStore from "./blog";
import { profile } from "console";

interface User {
  _id?: string;
  username: string;
  email: string;
}

interface profile {
  _id: string;
  name: string;
  bio: string;
  image: string;
  userId: string;
}

interface AuthState {
  user: User | null;
  profile: profile | null;
  isAuthenticated: boolean;
  isAuthenticatedLoading: boolean;
  authLoader: boolean;
  signin: (formData: { email: string; password: string }) => Promise<number>;
  register: (formData: {
    username: String;
    email: string;
    password: string;
  }) => Promise<number>;
  updateProfile: (formData: { name: string; bio: string }) => Promise<number>;
  updateImage: (formData: { image: string }) => Promise<number>;
  verify: () => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  profile: null,
  isAuthenticated: false,
  isAuthenticatedLoading: false,
  authLoader: false,

  register: async (formData) => {
    try {
      useBlogStore.getState().clearState();
      set({ authLoader: true });
      const response = await axiosInstance.post("/v1/auth/register", formData);
      toast.success(response.data.msg, { duration: 3000 });
      set({
        user: response.data.user,
        isAuthenticated: true,
      });
      set({ authLoader: false });
      return 1;
    } catch (error: any) {
      toast.error(error?.response?.data?.msg || "Signup failed", {
        duration: 3000,
      });
      set({ authLoader: false });
      console.log(error);
      return 0;
    }
  },

  signin: async (formData) => {
    try {
      useBlogStore.getState().clearState();
      set({ authLoader: true });
      const response = await axiosInstance.post("/v1/auth/login", formData);
      set({
        user: response.data.user,
        profile: response.data.profile,
        isAuthenticated: true,
      });
      toast.success(response.data.msg, { duration: 3000 });
      set({ authLoader: false });
      return 1;
    } catch (error: any) {
      toast.error(error?.response?.data?.msg || "Login failed", {
        duration: 3000,
      });
      set({ authLoader: false });
      return 0;
    }
  },

  updateProfile: async (formData) => {
    try {
      set({ authLoader: true });
      const response = await axiosInstance.put("/v1/auth/profile", formData);
      set({
        profile: response.data.profile,
      });
      toast.success("Profile updated successfully", { duration: 3000 });
      set({ authLoader: false });
      return 1;
    } catch (error: any) {
      toast.error(error?.response?.data?.msg || "Profile update failed", {
        duration: 3000,
      });
      set({ authLoader: false });
      return 0;
    }
  },
  updateImage: async (formdata) => {
    try {
      set({ authLoader: true });

      const res = await axiosInstance.put("/v1/auth/image", formdata);

      set((state) => {
        if (!state.profile) return { authLoader: false }; // guard clause

        return {
          profile: {
            ...state.profile,
            image: res.data.image,
          },
          authLoader: false,
        };
      });

      toast.success("Image updated successfully", { duration: 3000 });
      return 1;
    } catch (err) {
      toast.error("Image update failed");
      console.error(err);
      set({ authLoader: false });
      return 0;
    }
  },

  verify: async () => {
    try {
      useBlogStore.getState().clearState();
      set({ isAuthenticatedLoading: true });
      const response = await axiosInstance.get("/v1/auth/verify");
      set({
        user: response.data.user,
        profile: response.data.profile,
        isAuthenticated: true,
      });
      set({ isAuthenticatedLoading: false });
    } catch (error: any) {
      set({ user: null, isAuthenticated: false });
      set({ isAuthenticatedLoading: false });
    }
  },

  logout: async () => {
    try {
      useBlogStore.getState().clearState();
      set({ user: null, profile: null, isAuthenticated: false });
      await axiosInstance.get("/v1/auth/logout");
      toast.success("Logged out successfully", { duration: 3000 });
    } catch (error: any) {
      toast.error(error?.response?.data?.msg || "Logout failed", {
        duration: 3000,
      });
    } finally {
      set({ user: null, isAuthenticated: false });
    }
  },
}));

export default useAuthStore;
