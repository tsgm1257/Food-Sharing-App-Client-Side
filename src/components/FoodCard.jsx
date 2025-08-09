import { Link } from "react-router";

const FoodCard = ({ food }) => {
  const { _id, name, image, shortDescription } = food || {};
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
      <div className="p-4 flex flex-col gap-2 flex-1">
        <h3 className="font-semibold line-clamp-1">{name}</h3>
        <p className="text-sm text-base-content/70 line-clamp-2">
          {shortDescription}
        </p>
        <div className="mt-auto pt-2">
          <Link to={`/foods/${_id}`} className="btn-filled btn-sm">
            See more
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
