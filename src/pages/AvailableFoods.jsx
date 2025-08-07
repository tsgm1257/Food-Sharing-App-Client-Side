import { useState, useEffect } from "react";
import { Link } from "react-router"; // fixed import
import { useQuery } from "@tanstack/react-query";

const AvailableFoods = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [isThreeCol, setIsThreeCol] = useState(true);
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debounce search to reduce fetch calls
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const { data: foods = [], isLoading } = useQuery({
    queryKey: ["availableFoods", sortOrder, debouncedSearch],
    queryFn: async () => {
      const res = await fetch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/foods?status=Available&sort=${sortOrder}&search=${debouncedSearch}`
      );
      return res.json();
    },
  });

  return (
    <div className="max-w-6xl mx-auto px-4 my-8">
      <h2 className="text-3xl font-bold text-center mb-6">Available Foods</h2>

      {/* Filters */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-3">
        <input
          type="text"
          placeholder="Search by food name..."
          className="input input-bordered w-full md:w-80"
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="flex gap-2">
          <select
            className="select select-bordered"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">Expire Soon (↑)</option>
            <option value="desc">Expire Late (↓)</option>
          </select>

          <button
            className="btn btn-outline hidden md:inline-flex"
            onClick={() => setIsThreeCol(!isThreeCol)}
          >
            Change Layout
          </button>
        </div>
      </div>

      {/* Food Grid */}
      <div
        className={`grid grid-cols-1 ${
          isThreeCol ? "md:grid-cols-3" : "md:grid-cols-2"
        } gap-6`}
      >
        {isLoading ? (
          <p className="text-center col-span-full">Loading...</p>
        ) : foods.length > 0 ? (
          foods.map((food) => (
            <div key={food._id} className="card bg-base-100 shadow">
              <figure>
                <img
                  src={food.food_image}
                  alt={food.food_name}
                  className="h-48 w-full object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{food.food_name}</h2>
                <p>
                  <strong>Quantity:</strong> {food.food_quantity}
                </p>
                <p>
                  <strong>Pickup:</strong> {food.pickup_location}
                </p>
                <p>
                  <strong>Expire:</strong>{" "}
                  {new Date(food.expired_at).toLocaleString()}
                </p>
                <div className="card-actions justify-end">
                  <Link
                    to={`/food/${food._id}`}
                    className="btn btn-sm btn-primary"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No foods available.
          </p>
        )}
      </div>
    </div>
  );
};

export default AvailableFoods;
