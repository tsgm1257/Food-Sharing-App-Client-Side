import { Link } from "react-router";

const Hero = () => {
  return (
    <section className="section-y">
      <div className="container-app">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
              Share surplus food. <span className="text-primary">Reduce waste.</span> Help neighbors.
            </h1>
            <p className="mt-4 text-base-content/70">
              Post extra meals or request what you need. Every plate makes a difference.
            </p>
            <div className="mt-6 flex gap-3">
              <Link to="/available-foods" className="btn-filled">Browse Foods</Link>
              <Link to="/add-food" className="btn-outline-uni">Share Food</Link>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden shadow border border-base-200 bg-base-100">
            <img
              className="w-full object-cover aspect-[16/9]"
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1600&auto=format&fit=crop"
              alt="Fresh meals shared with the community"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
