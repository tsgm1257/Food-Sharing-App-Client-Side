import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext/AuthProvider";
import Swal from "sweetalert2";
import { Link } from "react-router";
import Loader from "../components/Loader";
import SectionTitle from "../components/SectionTitle";

const ManageMyFoods = () => {
  const { user } = useContext(AuthContext);
  const [myFoods, setMyFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const FALLBACK = "https://i.ibb.co/VY1M4Z9g/no-image.png";

  const fetchMyFoods = async () => {
    try {
      setLoading(true);
      setErr("");
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/foods?email=${user.email}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        }
      );
      const data = await res.json();
      setMyFoods(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
      setErr("Failed to load your foods.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) fetchMyFoods();
  }, [user]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This food will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${import.meta.env.VITE_API_BASE_URL}/foods/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "Your food has been deleted.", "success");
              fetchMyFoods();
            }
          })
          .catch(() => {
            Swal.fire("Error", "Delete failed.", "error");
          });
      }
    });
  };

  if (loading) return <Loader variant="spinner" srLabel="Loading your foods" />;
  if (err) return <div className="text-center text-error">{err}</div>;

  return (
    <section className="section-y">
      <div className="container-app">
        <SectionTitle
          title="Manage My Foods"
          subtitle="Update or remove your shared items"
        />
        <div className="overflow-x-auto">
          <table className="table w-full align-middle">
            <thead>
              <tr>
                <th>Image</th>
                <th>Food Name</th>
                <th>Quantity</th>
                <th>Pickup Location</th>
                <th>Expire</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {myFoods.map((food) => (
                <tr key={food._id}>
                  <td>
                    <img
                      src={food.food_image || FALLBACK}
                      onError={(e) => {
                        if (e.currentTarget.src !== FALLBACK)
                          e.currentTarget.src = FALLBACK;
                      }}
                      alt={food.food_name}
                      className="w-16 h-16 rounded object-cover"
                      loading="lazy"
                    />
                  </td>
                  <td>{food.food_name}</td>
                  <td>{food.food_quantity}</td>
                  <td>{food.pickup_location}</td>
                  <td>{new Date(food.expired_at).toLocaleString()}</td>
                  <td>{food.status}</td>
                  <td className="td-middle">
                    <div className="inline-flex items-center gap-2">
                      <Link
                        to={`/update-food/${food._id}`}
                        className="btn btn-sm btn-outline"
                      >
                        Update
                      </Link>
                      <button
                        onClick={() => handleDelete(food._id)}
                        className="btn btn-sm btn-outline border-error text-error"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ManageMyFoods;
