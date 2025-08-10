import { Link } from "react-router";

const FoodCard = ({ food }) => {
  const {
    _id,
    id,
    food_name,
    food_image,
    food_quantity,
    pickup_location,
    expired_at,
  } = food || {};

  const cardId = _id ?? id;
  const detailsHref = cardId ? `/food/${cardId}` : null;
  const FALLBACK = "https://i.ibb.co/VY1M4Z9g/no-image.png";

  return (
    <div className="card card-compact card-bordered card-uniform">
      <figure className="bg-base-200">
        <img
          src={food_image || FALLBACK}
          onError={(e) => {
            if (e.currentTarget.src !== FALLBACK)
              e.currentTarget.src = FALLBACK;
          }}
          alt={food_name || "Food"}
          className="h-48 w-full object-cover"
          loading="lazy"
        />
      </figure>

      <div className="card-body">
        <h3 className="card-title text-lg line-clamp-1">
          {food_name || "Untitled"}
        </h3>

        <div className="text-sm space-y-1 text-base-content/70">
          <p>
            <span className="font-medium">Quantity:</span>{" "}
            {food_quantity || "—"}
          </p>
          <p>
            <span className="font-medium">Pickup:</span>{" "}
            {pickup_location || "—"}
          </p>
          <p>
            <span className="font-medium">Expires:</span>{" "}
            {expired_at ? new Date(expired_at).toLocaleString() : "—"}
          </p>
        </div>

        <div className="mt-3">
          {detailsHref ? (
            <Link to={detailsHref} className="btn btn-outline w-full">
              See details
            </Link>
          ) : (
            <button className="btn btn-outline w-full" disabled>
              Details unavailable
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
