import categories from "../data/categories";
import { useCategory } from "../context/CategoryContext";

const CategoryBar = () => {
  const { selectedCategory, setSelectedCategory } = useCategory();

  return (
    <div className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center gap-6 py-4 overflow-x-auto scrollbar-hide">

          {/* ALL CATEGORY */}
          <div
            onClick={() => setSelectedCategory("All")}
            className={`flex flex-col items-center min-w-[90px] cursor-pointer transition ${
              selectedCategory === "All"
                ? "text-blue-600"
                : "text-gray-700"
            }`}
          >
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-100 mb-1">
              <span className="font-semibold">All</span>
            </div>
            <span className="text-sm font-medium">All</span>
          </div>

          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => setSelectedCategory(category.name)}
              className={`flex flex-col items-center min-w-[90px] cursor-pointer transition ${
                selectedCategory === category.name
                  ? "text-blue-600"
                  : "text-gray-700"
              }`}
            >
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-100 mb-1">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-10 h-10 object-contain hover:scale-110 transition"
                />
              </div>
              <span className="text-sm font-medium">
                {category.name}
              </span>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default CategoryBar;
