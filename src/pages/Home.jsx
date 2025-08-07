import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../contexts/AuthContext/AuthProvider";
import { motion } from "motion/react";

const Home = () => {
  const { user } = useContext(AuthContext);
  const [featuredFoods, setFeaturedFoods] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/foods?status=Available`)
      .then((res) => res.json())
      .then((data) => {
        const sorted = data
          .filter((item) => typeof item.quantity_value === "number")
          .sort((a, b) => b.quantity_value - a.quantity_value)
          .slice(0, 6);
        setFeaturedFoods(sorted);
      });
  }, []);

  const handleViewDetails = (id) => {
    if (!user) {
      navigate("/login");
    } else {
      navigate(`/food/${id}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Hero Section */}
      <div className="hero min-h-[70vh] bg-base-100 mb-16">
        <div className="hero-content flex-col lg:flex-row-reverse gap-10">
          <motion.img
            whileHover={{ scale: 1.2, rotate: 8 }}
            transition={{ duration: 0.4 }}
            src="https://i.ibb.co/mVGBvbpd/food.png"
            className="max-w-sm rounded-lg shadow-lg"
            alt="Sharing Food"
          />
          <motion.div
            animate={{ color: ["#10b981", "#3b82f6", "#f43f5e", "#10b981"] }}
            transition={{ duration: 6, repeat: Infinity }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Share. Give. Help.
            </h1>
            <p className="py-4 text-lg text-gray-600 max-w-md">
              Join the mission to reduce food waste and feed the community.
              Share your excess food and bring hope to someone’s table.
            </p>
            <Link to="/available-foods" className="btn btn-primary mt-2">
              View Available Foods
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Featured Foods */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-6">Featured Foods</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredFoods.map((food) => (
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
                  <button
                    onClick={() => handleViewDetails(food._id)}
                    className="btn btn-sm btn-primary"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-6">
          <Link to="/available-foods" className="btn btn-outline btn-accent">
            Show All Foods
          </Link>
        </div>
      </div>

      {/* How It Works */}
      <div className="my-16">
        <h2 className="text-3xl font-bold text-center mb-10">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-base-200 rounded shadow">
            <h3 className="text-xl font-semibold mb-2">1. Add Food</h3>
            <p>Donors add extra food with pickup details and expiry time.</p>
          </div>
          <div className="p-6 bg-base-200 rounded shadow">
            <h3 className="text-xl font-semibold mb-2">2. Request</h3>
            <p>People in need browse available food and request it securely.</p>
          </div>
          <div className="p-6 bg-base-200 rounded shadow">
            <h3 className="text-xl font-semibold mb-2">3. Pickup</h3>
            <p>Pickup is arranged at the provided location before expiry.</p>
          </div>
        </div>
      </div>

      {/* Why Share Food */}
      <div className="my-16">
        <h2 className="text-3xl font-bold text-center mb-10">
          Why Share Food?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 border rounded shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2 text-green-600">
              🌍 Reduce Waste
            </h3>
            <p>1/3 of food is wasted globally. You can help change that.</p>
          </div>
          <div className="p-6 border rounded shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2 text-blue-600">
              🤝 Build Community
            </h3>
            <p>
              Connect with people around you in need of support and kindness.
            </p>
          </div>
          <div className="p-6 border rounded shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2 text-rose-600">
              ❤️ Make a Difference
            </h3>
            <p>Your shared food might save someone from sleeping hungry.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
