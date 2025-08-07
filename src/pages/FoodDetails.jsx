import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../contexts/AuthContext/AuthProvider";
import Swal from "sweetalert2";

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
      user_email: user.email,
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

  if (!food) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto my-8 p-6 bg-base-100 shadow rounded">
      <img
        src={food.food_image}
        alt={food.food_name}
        className="w-full h-64 object-cover rounded mb-4"
      />
      <h2 className="text-2xl font-bold mb-2">{food.food_name}</h2>
      <p><strong>Quantity:</strong> {food.food_quantity}</p>
      <p><strong>Pickup Location:</strong> {food.pickup_location}</p>
      <p><strong>Expires At:</strong> {new Date(food.expired_at).toLocaleString()}</p>
      <p><strong>Donor:</strong> {food.donor_name} ({food.donor_email})</p>
      <p><strong>Notes:</strong> {food.notes}</p>

      <button onClick={() => setShowModal(true)} className="btn btn-primary mt-4">
        Request Food
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded w-full max-w-md shadow-xl overflow-y-auto max-h-[90vh]">
            <h3 className="text-lg font-bold mb-4">Request Food</h3>

            <div className="space-y-2 text-sm">
              <p><strong>Food Name:</strong> {food.food_name}</p>
              <p><strong>Food Image:</strong> <img src={food.food_image} alt="" className="h-24 rounded" /></p>
              <p><strong>Food ID:</strong> {id}</p>
              <p><strong>Donator Email:</strong> {food.donor_email}</p>
              <p><strong>Donator Name:</strong> {food.donor_name}</p>
              <p><strong>User Email:</strong> {user?.email}</p>
              <p><strong>Request Date:</strong> {new Date().toLocaleString()}</p>
              <p><strong>Pickup Location:</strong> {food.pickup_location}</p>
              <p><strong>Expire Date:</strong> {new Date(food.expired_at).toLocaleString()}</p>
            </div>

            <textarea
              className="textarea textarea-bordered w-full mt-4"
              placeholder="Additional Notes..."
              rows="3"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />

            <div className="flex justify-end gap-2 mt-4">
              <button className="btn btn-sm" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-sm btn-primary" onClick={handleRequest}>Confirm Request</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodDetails;
