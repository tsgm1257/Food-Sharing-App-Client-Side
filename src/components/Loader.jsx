import React from "react";

const Loader = ({
  variant = "spinner",
  layout = "cards",
  count = 6,
  className = "",
  srLabel = "Loading content",
}) => {
  if (variant === "spinner") {
    return (
      <div
        className={`flex items-center justify-center py-16 ${className}`}
        role="status"
        aria-live="polite"
        aria-busy="true"
        aria-label={srLabel}
      >
        <span className="loading loading-spinner loading-lg" />
        <span className="sr-only">{srLabel}</span>
      </div>
    );
  }

  // Skeletons
  if (layout === "lines") {
    return (
      <div className={`w-full space-y-3 py-6 ${className}`} aria-hidden>
        {[...Array(count)].map((_, i) => (
          <div key={i} className="skeleton h-4 w-full" />
        ))}
      </div>
    );
  }

  // layout === "cards"
  return (
    <div
      className={`grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${className}`}
      aria-hidden
    >
      {[...Array(count)].map((_, i) => (
        <div key={i} className="card card-compact card-bordered card-uniform">
          <div className="w-full">
            <div className="skeleton h-40 w-full rounded-t-2xl" />
          </div>
          <div className="card-body">
            <div className="skeleton h-4 w-2/3" />
            <div className="space-y-2">
              <div className="skeleton h-3 w-full" />
              <div className="skeleton h-3 w-5/6" />
            </div>
            <div className="mt-4">
              <div className="skeleton h-10 w-full rounded-xl" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Loader;
