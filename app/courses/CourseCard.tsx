import { FiArrowUpRight } from "react-icons/fi";

function CourseCard({ course }) {
  return (
    <div className="bg-white rounded-2xl p-4 border border-gray-200 
                    hover:shadow-lg transition-all duration-300 hover:-translate-y-1">

      {/* Image */}
      <div className="relative rounded-xl overflow-hidden mb-4">
        <img
          src={course.img}
          className="w-full h-40 object-cover"
        />

        {/* Badge */}
        <span className="absolute top-3 left-3 text-xs px-3 py-1 bg-white/90 rounded-md">
          {course.category}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-sm font-medium text-gray-800 mb-2 line-clamp-2">
        {course.title}
      </h3>

      {/* Rating */}
      <div className="flex items-center gap-1 mb-3">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className={i < course.rating ? "text-yellow-400" : "text-gray-300"}
          >
            ★
          </span>
        ))}

        <span className="text-xs text-gray-500 ml-2">
          ({course.reviews})
        </span>
      </div>

      {/* Bottom */}
      <div className="flex items-center justify-between">
        <span className="font-semibold text-gray-900">
          ${course.price}
        </span>

        <button className="w-9 h-9 flex items-center justify-center rounded-full 
                           bg-[#0f9b76]/10 text-[#0f9b76] 
                           hover:bg-[#0f9b76] hover:text-white transition">
          <FiArrowUpRight />
        </button>
      </div>
    </div>
  );
}

export default CourseCard;