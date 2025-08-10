import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../contexts/AuthContext/AuthProvider";
import Swal from "sweetalert2";
import Loader from "../components/Loader";
import SectionTitle from "../components/SectionTitle";

const FoodDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [food, setFood] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/foods/${id}`)
      .then((res) => res.json())
      .then((data) => setFood(data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleRequest = async () => {
    const requestData = {
      food_id: id,
      food_name: food.food_name,
      food_image: food.food_image,
      donor_name: food.donor_name,
      donor_email: food.donor_email,
      user_email: user?.email,
      request_date: new Date().toISOString(),
      pickup_location: food.pickup_location,
      expired_at: food.expired_at,
      notes,
    };

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/requests`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
        body: JSON.stringify(requestData),
      });

      const data = await res.json();

      if (data.success) {
        Swal.fire("Success", "Food requested!", "success");
        setShowModal(false);
      } else {
        Swal.fire("Error", "Request failed", "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Server error", "error");
    }
  };

  if (!food) {
    return (
      <section className="section-y">
        <div className="container-app">
          <Loader variant="skeleton" layout="lines" count={6} />
        </div>
      </section>
    );
  }

  return (
    <section className="section-y">
      <div className="container-app">
        <SectionTitle
          title="Food Details"
          subtitle="Review the information before requesting"
        />

        <div className="bg-base-100 shadow rounded p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <img
              src={food.food_image}
              alt={food.food_name}
              className="w-full h-72 object-cover rounded"
            />
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl font-bold">{food.food_name}</h2>
            <p>
              <span className="font-semibold">Quantity:</span>{" "}
              {food.food_quantity}
            </p>
            <p>
              <span className="font-semibold">Pickup Location:</span>{" "}
              {food.pickup_location}
            </p>
            <p>
              <span className="font-semibold">Expires At:</span>{" "}
              {new Date(food.expired_at).toLocaleString()}
            </p>
            <p>
              <span className="font-semibold">Donor:</span> {food.donor_name} (
              {food.donor_email})
            </p>
            {food.notes && (
              <p>
                <span className="font-semibold">Notes:</span> {food.notes}
              </p>
            )}

            <div className="pt-2">
              <button
                onClick={() => setShowModal(true)}
                className="btn btn-primary"
                disabled={!user}
                title={user ? "" : "Please login to request"}
              >
                Request Food
              </button>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-base-100 text-base-content p-6 rounded w-full max-w-md shadow-xl overflow-y-auto max-h-[90vh]">
            <h3 className="text-lg font-bold mb-4">Request Food</h3>

            <div className="space-y-2 text-sm">
              <p>
                <strong>Food Name:</strong> {food.food_name}
              </p>
              <p className="flex items-center gap-3">
                <strong>Food Image:</strong>
                <img src={food.food_image} alt="" className="h-16 rounded" />
              </p>
              <p>
                <strong>Food ID:</strong> {id}
              </p>
              <p>
                <strong>Donator Email:</strong> {food.donor_email}
              </p>
              <p>
                <strong>Donator Name:</strong> {food.donor_name}
              </p>
              <p>
                <strong>User Email:</strong> {user?.email || "—"}
              </p>
              <p>
                <strong>Request Date:</strong> {new Date().toLocaleString()}
              </p>
              <p>
                <strong>Pickup Location:</strong> {food.pickup_location}
              </p>
              <p>
                <strong>Expire Date:</strong>{" "}
                {new Date(food.expired_at).toLocaleString()}
              </p>
            </div>

            <textarea
              className="textarea textarea-bordered w-full mt-4"
              placeholder="Additional Notes..."
              rows="3"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />

            <div className="flex justify-end gap-2 mt-4">
              <button
                className="btn btn-sm btn-outline"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-sm btn-primary"
                onClick={handleRequest}
                disabled={!user}
                title={user ? "" : "Please login to request"}
              >
                Confirm Request
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default FoodDetails;
