import { useEffect } from "react";
import useHomeBlogStore from "../../store/home";
import { HorizontalBlogCard, VerticalBlogCard } from "./BlogCard";
import CategoryBlogs from "./CategoryBlogs";

const PopularBlogs = () => {
  const { blogs } = useHomeBlogStore();
  const popularBlogs = blogs.sort((a, b) => b.views - a.views).slice(0, 3);
  return (
    <div className="mt-10">
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Popular Blogs</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {popularBlogs.map((blog) => (
          <VerticalBlogCard blog={blog} key={blog._id} />
        ))}
      </div>
    </div>
  );
};

const RecentsBlogs = () => {
  const { blogs } = useHomeBlogStore();
  const recentsBlogs = blogs
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )
    .slice(0, 3);
  return (
    <div className="max-w-6xl mx-auto py-8 mt-10">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Latest Posts</h3>

      <div className="flex flex-col gap-6">
        {recentsBlogs &&
          recentsBlogs.map((blog) => (
            <div key={blog._id} className="">
              <HorizontalBlogCard blog={blog} />
            </div>
          ))}
      </div>
    </div>
  );
};

const HomeBlogs = () => {
  const { blogs, getBlogs, getHomeBlogsLoader } = useHomeBlogStore();

  useEffect(() => {
    if (blogs.length === 0) {
      getBlogs();
    }
  }, [getBlogs]);

  return (
    <div className="p-6">
      {getHomeBlogsLoader && (
        <div className="flex justify-center items-center h-32">
          <div className="flex justify-center items-center h-96">
            <span className="loading loading-ball loading-xl bg-blue-700"></span>
            <span className="loading loading-ball loading-xl bg-blue-700"></span>
            <span className="loading loading-ball loading-xl bg-blue-700"></span>
          </div>
        </div>
      )}
      {blogs.length > 0 && !getHomeBlogsLoader && (
        <>
          <PopularBlogs />
          <RecentsBlogs />
          <CategoryBlogs />
        </>
      )}

      {blogs.length === 0 && !getHomeBlogsLoader && (
        <p className="text-gray-500 w-full text-center">No blogs available.</p>
      )}
    </div>
  );
};

export default HomeBlogs;
