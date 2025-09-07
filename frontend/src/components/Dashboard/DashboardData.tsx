import useBlogStore from "../../store/blog";

const DashboardData = () => {

  const { blogs } = useBlogStore();

  const { likes, comments, views } = useBlogStore();

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Blogs */}
        <div className=" p-6 rounded-xl shadow-2xl text-center">
          <h2 className="text-xl font-semibold">Total Blogs</h2>
          <p className="text-2xl font-bold mt-2">{blogs.length}</p>
        </div>

        {/* Total Likes */}
        <div className=" p-6 rounded-xl shadow-2xl text-center">
          <h2 className="text-xl font-semibold">Total Likes</h2>
          <p className="text-2xl font-bold mt-2">{likes}</p>
        </div>

        <div className="  p-6 rounded-xl shadow-2xl text-center">
          <h2 className="text-lg font-semibold">Total Comments</h2>
          <p className="text-2xl font-bold mt-2">{comments}</p>
        </div>

        <div className="  p-6 rounded-xl shadow-2xl text-center">
          <h2 className="text-lg font-semibold">Total Views</h2>
          <p className="text-2xl font-bold mt-2">{views}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardData;
