const blogs = [
  {
    id: 1,
    title: "Choosing the Right Concrete Grade",
    date: "July 2026",
    description:
      "Selecting the correct concrete grade ensures structural strength, durability, and cost efficiency for different construction elements.",
  },
  {
    id: 2,
    title: "5 Ways to Reduce Construction Costs",
    date: "July 2026",
    description:
      "Accurate quantity estimation, proper planning, and minimizing material wastage can significantly reduce project costs.",
  },
  {
    id: 3,
    title: "Brick Quantity Estimation Guide",
    date: "July 2026",
    description:
      "Understand how wall dimensions, mortar thickness, and openings influence the total number of bricks required.",
  },
  {
    id: 4,
    title: "Steel Reinforcement Basics",
    date: "July 2026",
    description:
      "Learn the fundamentals of reinforcement estimation for slabs, beams, columns, and footings.",
  },
  {
    id: 5,
    title: "Importance of BOQ in Construction",
    date: "July 2026",
    description:
      "A Bill of Quantities (BOQ) provides a clear breakdown of materials and costs, helping improve project planning and budgeting.",
  },
];

const Blog = () => {
  return (
    <div className="p-6 space-y-8">
      {/* Heading */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold dark:text-white">
            Buildie Construction Blog
          </h1>

          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Engineering insights, estimation tips and construction knowledge.
          </p>
        </div>

        <span className="text-sm text-gray-500 dark:text-gray-400">
          {blogs.length} Articles
        </span>
      </div>

      {/* Blog Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="
              bg-white
              dark:bg-gray-800
              border
              border-gray-200
              dark:border-gray-700
              rounded-xl
              shadow
              p-6
              hover:shadow-xl
              transition
            "
          >
            <h2 className="text-2xl font-semibold dark:text-white mb-3">
              {blog.title}
            </h2>

            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Published • {blog.date}
            </p>

            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {blog.description}
            </p>

            <button
              className="
                mt-6
                bg-blue-600
                hover:bg-blue-700
                text-white
                px-5
                py-2
                rounded-lg
                transition
              "
            >
              Read More
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
