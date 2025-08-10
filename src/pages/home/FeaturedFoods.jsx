import { useEffect, useState } from "react";
import SectionTitle from "../../components/SectionTitle";
import FoodCard from "../../components/FoodCard";
import Loader from "../../components/Loader";

const qtyNum = (v) => {
  if (typeof v === "number") return v;
  const m = String(v ?? "")
    .trim()
    .match(/^[-+]?\d*\.?\d+/);
  return m ? parseFloat(m[0]) : 0;
};

const FeaturedFoods = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    let active = true;

    (async () => {
      try {
        setLoading(true);
        setErr("");

        const base = import.meta.env.VITE_API_BASE_URL;
        if (!base) throw new Error("VITE_API_BASE_URL is missing.");

        const res = await fetch(`${base}/foods?status=Available`);
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);

        const data = await res.json();

        const sorted = Array.isArray(data)
          ? [...data].sort(
              (a, b) =>
                qtyNum(b?.quantity_value ?? b?.food_quantity) -
                qtyNum(a?.quantity_value ?? a?.food_quantity)
            )
          : [];

        if (active) setFoods(sorted.slice(0, 8));
      } catch (e) {
        console.error(e);
        if (active) setErr(e.message || "Failed to load featured foods.");
      } finally {
        if (active) setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="section-y">
      <div className="container-app">
        <SectionTitle
          title="Featured Foods"
          subtitle="Top-quantity shares available right now"
        />

        {loading && <Loader variant="skeleton" layout="cards" count={8} />}

        {!loading && err && <div className="text-center text-error">{err}</div>}

        {!loading && !err && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {foods.map((f) => (
                <FoodCard key={f._id || f.id} food={f} />
              ))}
            </div>
            {foods.length === 0 && (
              <div className="text-center text-base-content/70 mt-6">
                No featured foods found.
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default FeaturedFoods;
