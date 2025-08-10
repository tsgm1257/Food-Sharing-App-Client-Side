import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import Swal from "sweetalert2";
import Loader from "../components/Loader";
import SectionTitle from "../components/SectionTitle";

const UpdateFood = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [food, setFood] = useState(null);
  const [quantityNumber, setQuantityNumber] = useState("");
  const [quantityUnit, setQuantityUnit] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");

  const FALLBACK = "https://i.ibb.co/VY1M4Z9/no-image.png";

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/foods/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setFood(data);
        const parts = String(data.food_quantity || "").split(" ");
        setQuantityNumber(parts[0] || "");
        setQuantityUnit(parts.slice(1).join(" ") || "");
        setPreviewUrl(data.food_image || "");
      })
      .catch((err) => console.error(err));
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedFood = {
      food_name: form.food_name.value,
      food_image: form.food_image.value,
      food_quantity:
        `${form.quantity_number.value} ${form.quantity_unit.value}`.trim(),
      quantity_value: Number(form.quantity_number.value),
      pickup_location: form.pickup_location.value,
      expired_at: form.expired_at.value,
      notes: form.notes.value,
    };

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/foods/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
          body: JSON.stringify(updatedFood),
        }
      );

      const data = await res.json();

      if (data.modifiedCount > 0) {
        Swal.fire("Updated!", "Your food has been updated.", "success");
        navigate("/manage-my-foods");
      } else {
        Swal.fire("No Change", "Nothing was updated.", "info");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Update failed.", "error");
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
        <SectionTitle title="Update Food" subtitle="Edit your shared item" />
        <div className="bg-base-100 shadow rounded p-6">
          <form
            onSubmit={handleUpdate}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {/* Live preview */}
            <fieldset className="md:col-span-2">
              <legend className="text-sm font-medium mb-2">
                Current Preview
              </legend>
              <div className="rounded-xl overflow-hidden border border-base-200 bg-base-200">
                <img
                  src={previewUrl || FALLBACK}
                  onError={(e) => {
                    if (e.currentTarget.src !== FALLBACK)
                      e.currentTarget.src = FALLBACK;
                  }}
                  alt={food.food_name}
                  className="w-full h-56 object-cover"
                  loading="lazy"
                />
              </div>
            </fieldset>

            <fieldset>
              <legend className="text-sm font-medium mb-1">Food Name</legend>
              <input
                name="food_name"
                defaultValue={food.food_name}
                type="text"
                className="input input-bordered w-full"
                required
              />
            </fieldset>

            <fieldset>
              <legend className="text-sm font-medium mb-1">
                Food Image URL
              </legend>
              <input
                name="food_image"
                defaultValue={food.food_image}
                type="text"
                className="input input-bordered w-full"
                onChange={(e) => setPreviewUrl(e.target.value)}
                required
              />
            </fieldset>

            <fieldset className="md:col-span-2">
              <legend className="text-sm font-medium mb-1">
                Quantity (Number & Unit)
              </legend>
              <div className="grid grid-cols-2 gap-2">
                <input
                  name="quantity_number"
                  type="number"
                  min="1"
                  className="input input-bordered"
                  defaultValue={quantityNumber}
                  required
                />
                <input
                  name="quantity_unit"
                  type="text"
                  className="input input-bordered"
                  defaultValue={quantityUnit}
                  required
                />
              </div>
            </fieldset>

            <fieldset className="md:col-span-2">
              <legend className="text-sm font-medium mb-1">
                Pickup Location
              </legend>
              <input
                name="pickup_location"
                defaultValue={food.pickup_location}
                type="text"
                className="input input-bordered w-full"
                required
              />
            </fieldset>

            <fieldset className="md:col-span-2">
              <legend className="text-sm font-medium mb-1">
                Expire Date & Time
              </legend>
              <input
                name="expired_at"
                defaultValue={food.expired_at?.slice(0, 16)}
                type="datetime-local"
                className="input input-bordered w-full"
                required
              />
            </fieldset>

            <fieldset className="md:col-span-2">
              <legend className="text-sm font-medium mb-1">
                Additional Notes
              </legend>
              <textarea
                name="notes"
                defaultValue={food.notes}
                className="textarea textarea-bordered w-full"
                rows="3"
              />
            </fieldset>

            <button className="btn btn-primary md:col-span-2">
              Update Food
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UpdateFood;
