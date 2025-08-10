import { Link } from "react-router";

const Hero = () => {
  return (
    <section className="section-y">
      <div className="container-app">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="order-1 md:order-2 rounded-2xl overflow-hidden shadow border border-base-200 bg-base-100 group">
            <img
              className="w-full object-cover aspect-[16/9] transition-transform duration-300 ease-out will-change-transform group-hover:scale-105"
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1600&auto=format&fit=crop"
              alt="Fresh meals shared with the community"
            />
          </div>

          <div className="order-2 md:order-1">
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
              Share surplus food.{" "}
              <span className="text-primary">Reduce waste.</span> Help
              neighbors.
            </h1>
            <p className="mt-4 text-base-content/70">
              Post extra meals or request what you need. Every plate makes a
              difference.
            </p>
            <div className="mt-6 flex gap-3">
              <Link to="/available-foods" className="btn-filled">
                Browse Foods
              </Link>
              <Link to="/add-food" className="btn-outline-uni">
                Share Food
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
