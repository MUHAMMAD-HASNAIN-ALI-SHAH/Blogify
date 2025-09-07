import { useEffect, useState } from "react";
import useBlogStore from "../../store/blog";

const LikedBlogs = () => {
  const category = "liked";
  const { likedBlogs } = useBlogStore();
  const [blogs, setBlogs] = useState<
    {
      _id: string | null;
      title: string;
      description: string;
      category: string;
      views: number;
      image: string;
    }[]
  >([]);
  useEffect(() => {
    const fetchLikedBlogs = async () => {
      const fetchedBlogs = await likedBlogs();
      setBlogs(
        fetchedBlogs.map((blog: any) => ({
          ...blog.blogId,
        }))
      );
    };
    fetchLikedBlogs();
  }, []);
  return (
    <div className="p-6">
      {blogs && blogs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="card bg-base-100 w-full border border-base-200 rounded-2xl shadow-lg indicator"
            >
              <span className="indicator-item badge badge-secondary">
                {blog.views ? blog.views : 0} view(s)
              </span>
              {/* <BlogCard blog={blog} /> */}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 w-full text-center">
          No {category} blogs available.
        </p>
      )}
    </div>
  );
};

export default LikedBlogs;
