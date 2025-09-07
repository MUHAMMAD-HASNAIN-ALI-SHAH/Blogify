import { useNavigate } from "react-router-dom";

export const VerticalBlogCard = ({
  blog,
}: {
  blog: {
    _id?: string | null;
    title: string;
    description: string;
    image: string;
    category: string;
    views: number;
  };
}) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/blog/${blog._id}`)}
      key={blog._id}
      className="card bg-base-100 w-full border border-base-200 rounded-2xl shadow-lg hover:shadow-2xl indicator cursor-pointer"
    >
      <span className="indicator-item badge badge-secondary">
        {blog.views ? blog.views : 0} view(s)
      </span>
      <figure className="h-[180px]">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-full rounded-t-xl md:object-cover"
        />
      </figure>

      <div className="card-body p-4">
        <h2 className="card-title text-lg font-semibold">
          {blog.title.length > 25
            ? blog.title.substring(0, 25) + "..."
            : blog.title}
        </h2>

        <h5>👁️{blog.views}</h5>

        <p className="text-gray-600 text-sm">
          {blog.description.length > 100
            ? `${blog.description.substring(0, 100)}...`
            : blog.description}
        </p>
      </div>
    </div>
  );
};

export const HorizontalBlogCard = ({
  blog,
}: {
  blog: {
    _id?: string | null;
    title: string;
    description: string;
    image: string;
    category: string;
    views: number;
  };
}) => {
  const navigate = useNavigate();
  return (
    <div
      key={blog._id}
      onClick={() => navigate(`/blog/${blog._id}`)}
      className="flex flex-col sm:flex-row bg-white shadow-md rounded-md overflow-hidden hover:shadow-2xl cursor-pointer transition"
    >
      {/* Image */}
      <img
        src={blog.image}
        alt={blog.title}
        className="w-full sm:w-56 h-28 object-cover rounded-md"
      />

      {/* Content */}
      <div className="p-4 flex flex-col justify-center">
        <h3 className="text-lg font-semibold">
          {blog.title.length > 100
            ? blog.title.substring(0, 100) + "..."
            : blog.title}
        </h3>
        <h5>Views: {blog.views}👁️</h5>
        <p className="text-sm text-gray-600 mb-3">
          {blog.description.length > 120
            ? blog.description.substring(0, 120) + "..."
            : blog.description}
        </p>
      </div>
    </div>
  );
};
