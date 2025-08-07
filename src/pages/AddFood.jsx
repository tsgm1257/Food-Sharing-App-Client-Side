import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext/AuthProvider";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";

const AddFood = () => {
  const { user } = useContext(AuthContext);

  const mutation = useMutation({
    mutationFn: async (food) => {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/foods`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
        body: JSON.stringify(food),
      });
      return res.json();
    },
    onSuccess: (data) => {
      if (data.insertedId) {
        Swal.fire("Success", "Food added successfully!", "success");
        document.getElementById("addFoodForm").reset();
      } else {
        Swal.fire("Error", "Failed to add food", "error");
      }
    },
    onError: () => {
      Swal.fire("Error", "Server error", "error");
    },
  });

  const handleAddFood = (e) => {
    e.preventDefault();
    const form = e.target;

    const food = {
      food_name: form.food_name.value,
      food_image: form.food_image.value,
      food_quantity: `${form.quantity_number.value} ${form.quantity_unit.value}`,
      quantity_value: Number(form.quantity_number.value),
      pickup_location: form.pickup_location.value,
      expired_at: form.expired_at.value,
      notes: form.notes.value,
      donor_name: user.displayName,
      donor_email: user.email,
      donor_image: user.photoURL,
      status: "Available",
    };

    mutation.mutate(food);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 my-8 bg-base-100 shadow rounded">
      <h2 className="text-2xl font-bold mb-6 text-center">Add Food</h2>
      <form
        id="addFoodForm"
        onSubmit={handleAddFood}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* Food Name */}
        <fieldset className="md:col-span-2">
          <legend className="text-sm font-medium mb-1">Food Name</legend>
          <input
            name="food_name"
            type="text"
            className="input input-bordered w-full"
            required
          />
        </fieldset>

        {/* Food Image */}
        <fieldset className="md:col-span-2">
          <legend className="text-sm font-medium mb-1">Food Image URL</legend>
          <input
            name="food_image"
            type="text"
            className="input input-bordered w-full"
            required
          />
        </fieldset>

        {/* Quantity */}
        <fieldset className="md:col-span-2">
          <legend className="text-sm font-medium mb-1">
            Quantity (e.g., 5 kg)
          </legend>
          <div className="grid grid-cols-2 gap-2">
            <input
              name="quantity_number"
              type="number"
              placeholder="Number"
              className="input input-bordered"
              min="1"
              required
            />
            <input
              name="quantity_unit"
              type="text"
              placeholder="Unit (kg, packs, etc.)"
              className="input input-bordered"
              required
            />
          </div>
        </fieldset>

        {/* Pickup Location */}
        <fieldset className="md:col-span-2">
          <legend className="text-sm font-medium mb-1">Pickup Location</legend>
          <input
            name="pickup_location"
            type="text"
            className="input input-bordered w-full"
            required
          />
        </fieldset>

        {/* Expiration Date */}
        <fieldset className="md:col-span-2">
          <legend className="text-sm font-medium mb-1">
            Expire Date & Time
          </legend>
          <input
            name="expired_at"
            type="datetime-local"
            className="input input-bordered w-full"
            required
          />
        </fieldset>

        {/* Additional Notes */}
        <fieldset className="md:col-span-2">
          <legend className="text-sm font-medium mb-1">Additional Notes</legend>
          <textarea
            name="notes"
            className="textarea textarea-bordered w-full"
            rows="3"
          ></textarea>
        </fieldset>

        {/* Donor Info (non-editable) */}
        <fieldset className="md:col-span-2">
          <legend className="text-sm font-medium mb-1">Donor Info</legend>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <input
              type="text"
              value={user?.displayName || ""}
              disabled
              className="input input-bordered w-full"
            />
            <input
              type="email"
              value={user?.email || ""}
              disabled
              className="input input-bordered w-full"
            />
            <input
              type="text"
              value={user?.photoURL || ""}
              disabled
              className="input input-bordered w-full"
            />
          </div>
        </fieldset>

        {/* Submit */}
        <button
          className="btn btn-primary md:col-span-2"
          disabled={mutation.isLoading}
        >
          {mutation.isLoading ? "Adding..." : "Add Food"}
        </button>
      </form>
    </div>
  );
};

export default AddFood;
