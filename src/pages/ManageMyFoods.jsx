import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext/AuthProvider";
import Swal from "sweetalert2";
import { Link } from "react-router";

const ManageMyFoods = () => {
  const { user } = useContext(AuthContext);
  const [myFoods, setMyFoods] = useState([]);

  const fetchMyFoods = () => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/foods?email=${user.email}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setMyFoods(data))
      .catch((err) => console.error(err));
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
          });
      }
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Manage My Foods</h2>
      {myFoods.length === 0 ? (
        <p className="text-center text-gray-500">No foods added yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
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
                      src={food.food_image}
                      alt={food.food_name}
                      className="w-16 h-16 rounded object-cover"
                    />
                  </td>
                  <td>{food.food_name}</td>
                  <td>{food.food_quantity}</td>
                  <td>{food.pickup_location}</td>
                  <td>{new Date(food.expired_at).toLocaleString()}</td>
                  <td>{food.status}</td>
                  <td className="flex gap-2">
                    <Link
                      to={`/update-food/${food._id}`}
                      className="btn btn-sm btn-info"
                    >
                      Update
                    </Link>
                    <button
                      onClick={() => handleDelete(food._id)}
                      className="btn btn-sm btn-error"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageMyFoods;
