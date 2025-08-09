// src/pages/AvailableFoods.jsx
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import FoodCard from "../components/FoodCard";
import SectionTitle from "../components/SectionTitle";

const qtyNum = (v) => {
  if (typeof v === "number") return v;
  const m = String(v ?? "")
    .trim()
    .match(/^[-+]?\d*\.?\d+/);
  return m ? parseFloat(m[0]) : 0;
};

const fetchFoods = async ({ base, search, sort }) => {
  const params = new URLSearchParams();
  params.set("status", "Available");
  if (search) params.set("search", search);
  // We’ll sort client-side by quantity_value to stick to the assignment example, but
  // you CAN use backend sort with sortBy=quantity&sort=asc|desc if you want.
  const res = await fetch(`${base}/foods?${params.toString()}`);
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  const data = await res.json();

  const sorted = Array.isArray(data)
    ? [...data].sort((a, b) => {
        const A = qtyNum(a?.quantity_value ?? a?.food_quantity);
        const B = qtyNum(b?.quantity_value ?? b?.food_quantity);
        return sort === "asc" ? A - B : B - A;
      })
    : [];

  return sorted;
};

const AvailableFoods = () => {
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); // "asc" | "desc"

  // debounce search
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(searchInput.trim()), 400);
    return () => clearTimeout(t);
  }, [searchInput]);

  const base = import.meta.env.VITE_API_BASE_URL;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["foods", { debouncedSearch, sortOrder }],
    queryFn: () =>
      fetchFoods({ base, search: debouncedSearch, sort: sortOrder }),
    enabled: Boolean(base),
    staleTime: 60_000,
  });

  const foods = data ?? [];

  const emptyState = useMemo(
    () =>
      !isLoading &&
      !isError &&
      foods.length === 0 &&
      (debouncedSearch
        ? "No foods match your search."
        : "No foods available right now."),
    [isLoading, isError, foods.length, debouncedSearch]
  );

  return (
    <section className="section-y">
      <div className="container-app">
        <SectionTitle
          title="All Available Foods"
          subtitle="Browse and request what you need"
        />

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between mb-6">
          <input
            type="text"
            placeholder="Search by name (e.g., rice, curry)"
            className="input input-bordered w-full md:max-w-md"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />

          <div className="flex items-center gap-2">
            <label className="text-sm text-base-content/70">
              Sort by quantity:
            </label>
            <select
              className="select select-bordered"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="asc">Low → High</option>
              <option value="desc">High → Low</option>
            </select>
          </div>
        </div>

        {/* Loader */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="card-uniform p-4 animate-pulse">
                <div className="w-full aspect-[4/3] bg-base-200 rounded mb-3"></div>
                <div className="h-4 bg-base-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-base-200 rounded w-1/2 mb-1"></div>
                <div className="h-3 bg-base-200 rounded w-2/3 mb-3"></div>
                <div className="h-8 bg-base-200 rounded w-24 ml-auto"></div>
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {isError && (
          <div className="text-center text-error">
            {(error && error.message) || "Failed to load foods."}
          </div>
        )}

        {/* Cards */}
        {!isLoading && !isError && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {foods.map((f) => (
                <FoodCard key={f._id || f.id} food={f} />
              ))}
            </div>

            {emptyState && (
              <div className="text-center text-base-content/70 mt-6">
                {emptyState}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default AvailableFoods;
