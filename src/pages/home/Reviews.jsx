// src/pages/home/Reviews.jsx
import SectionTitle from "../../components/SectionTitle";
import { FiStar } from "react-icons/fi";

const reviews = [
  {
    name: "Aisha",
    rating: 5,
    text: "I never let food go to waste now. Donors are kind and pickups are easy.",
  },
  {
    name: "Rahim",
    rating: 4,
    text: "Great for students—fresh meals during finals week were a lifesaver!",
  },
  {
    name: "Sara",
    rating: 5,
    text: "As a donor, I love seeing food go to good use. The app keeps it simple.",
  },
  {
    name: "Omar",
    rating: 5,
    text: "Clear pickup details and polite requests. Feels like a real community.",
  },
  {
    name: "Nadia",
    rating: 5,
    text: "Sharing leftover iftar trays has never been easier. Barakah all around.",
  },
  {
    name: "Yusuf",
    rating: 4,
    text: "The request flow is smooth. I appreciate the respectful messaging.",
  },
];

const Stars = ({ count }) => (
  <div
    className="flex justify-center gap-1"
    aria-label={`${count} out of 5 stars`}
  >
    {Array.from({ length: 5 }).map((_, i) => (
      <FiStar
        key={i}
        size={16}
        className={i < (count ?? 0) ? "text-primary" : "text-base-content/30"}
        aria-hidden="true"
      />
    ))}
  </div>
);

const Reviews = () => (
  <section className="section-y">
    <div className="container-app">
      <SectionTitle
        title="Community Reviews"
        subtitle="What neighbors are saying about FoodShare"
      />

      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((r, i) => (
          <div
            key={i}
            className="card-uniform p-6 text-center hover:shadow-md transition-shadow"
          >
            <Stars count={r.rating} />
            <p className="text-sm text-base-content/80 leading-relaxed mt-3">
              “{r.text}”
            </p>
            <div className="mt-4 font-semibold">{r.name}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Reviews;
