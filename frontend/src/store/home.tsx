import { create } from "zustand";
import axiosInstance from "../utils/axios";
import { BlogData, HomeBlog } from "../interfaces/BlogInterfaces";

interface BlogStore {
  blogs: HomeBlog[];
  blog: BlogData | null;
  getHomeBlogsLoader: boolean;
  getBlogs: () => void;
  getBlogData: (_id: string | null) => void;
  clearStateBlogData: () => void;
  viewBlog: (_id: string) => void;
}

const useHomeBlogStore = create<BlogStore>((set) => ({
  blogs: [],
  blog: null,
  getHomeBlogsLoader: false,
  getBlogs: async () => {
    try {
      set({ getHomeBlogsLoader: true });
      const response = await axiosInstance.get("/v2/blog/blog");
      set({ blogs: response.data.blogs });
      set({ getHomeBlogsLoader: false });
    } catch (error) {
      set({ getHomeBlogsLoader: false });
      console.error("Error fetching blogs:", error);
      set({ blogs: [] });
    }
  },
  getBlogData: async (id) => {
    try {
      const response = await axiosInstance.get(`/v2/blog/blog/${id}`);
      set({ blog: response.data.blogData });
    } catch (error) {
      return null;
    }
  },
  viewBlog: async (id) => {
    try {
      const formData = {
        blogId: id,
      };
      await axiosInstance.post(`/v2/blog/view-blog`, formData);
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  clearStateBlogData: () => set({ blog: null }),
}));

export default useHomeBlogStore;
