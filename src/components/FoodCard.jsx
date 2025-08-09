import { Link } from "react-router";

const FALLBACK_IMG = "https://i.ibb.co/YpF2YtJ/avatar.png";

const fmtDate = (d) => {
  if (!d) return "—";
  const dt = new Date(d);
  return isNaN(dt) ? String(d) : dt.toLocaleDateString();
};

const FoodCard = ({ food }) => {
  const id = food?._id || food?.id;

  const name = food?.food_name || food?.name || "Untitled";
  const image = food?.food_image || food?.image || FALLBACK_IMG;
  const desc =
    food?.additional_notes || food?.notes || food?.shortDescription || "";

  const quantity = food?.quantity_value ?? food?.food_quantity ?? "";
  const pickup = food?.pickup_location || "";
  const expire = food?.expired_at || "";

  return (
    <div className="card-uniform overflow-hidden flex flex-col">
      <figure className="w-full">
        <img
          src={image}
          alt={name}
          className="w-full object-cover aspect-[4/3]"
          loading="lazy"
        />
      </figure>

      <div className="p-4 flex flex-col gap-3 flex-1">
        <h3 className="font-semibold line-clamp-1">{name}</h3>

        <div className="text-sm space-y-1">
          <div className="flex justify-between gap-3">
            <span className="text-base-content/60">Quantity</span>
            <span className="font-medium">
              {quantity !== "" ? quantity : "—"}
            </span>
          </div>
          <div className="flex justify-between gap-3">
            <span className="text-base-content/60">Pickup</span>
            <span className="font-medium line-clamp-1">{pickup || "—"}</span>
          </div>
          <div className="flex justify-between gap-3">
            <span className="text-base-content/60">Expire</span>
            <span className="font-medium">{fmtDate(expire)}</span>
          </div>
        </div>

        {desc && (
          <p className="text-sm text-base-content/70 line-clamp-2">{desc}</p>
        )}

        {/* Right-align the button */}
        <div className="mt-auto pt-1 flex justify-end">
          {id ? (
            <Link to={`/foods/${id}`} className="btn-filled btn-sm">
              See more
            </Link>
          ) : (
            <button className="btn-filled btn-sm" disabled>
              See more
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
