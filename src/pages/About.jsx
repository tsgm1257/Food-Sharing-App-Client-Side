import {
  FiUsers,
  FiShield,
  FiHelpCircle,
  FiAlertTriangle,
} from "react-icons/fi";
import { FaRecycle } from "react-icons/fa";

function HowCard(props) {
  const Icon = props.icon;
  const { title, children } = props;

  return (
    <div className="card-uniform p-6 text-center">
      <div className="flex justify-center">
        <div className="p-3 rounded-full bg-primary/10 text-primary">
          <Icon className="text-3xl" />
        </div>
      </div>
      <h3 className="text-xl font-semibold mt-4">{title}</h3>
      <p className="text-base-content/70 mt-2">{children}</p>
    </div>
  );
}

const QA = ({ q, a }) => (
  <details className="card-uniform p-5">
    <summary className="font-medium cursor-pointer flex items-center gap-2">
      <FiHelpCircle aria-hidden /> {q}
    </summary>
    <p className="mt-2 opacity-80">{a}</p>
  </details>
);

const About = () => {
  return (
    <main className="bg-base-100 text-base-content">
      {/* About FoodShare */}
      <section className="container-app section-y">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold">About FoodShare</h1>
            <p className="mt-4 max-w-3xl">
              FoodShare is a community platform that turns surplus food into
              shared meals. We help neighbors connect so good food is
              enjoyed—not wasted. Donors post clear, detailed listings;
              recipients request what they need with dignity and ease.
            </p>
            <p className="mt-3 max-w-3xl">
              Whether you’re clearing pantry space or looking for support this
              week, FoodShare makes it straightforward to give or
              receive—locally, quickly, and for free.
            </p>
          </div>

          <div className="order-first lg:order-none">
            <div className="rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092"
                alt="Neighbors sharing surplus food"
                className="w-full h-full object-cover aspect-[16/10]"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="container-app section-y">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div className="rounded-2xl overflow-hidden shadow border border-base-200 bg-base-100 group">
            <img
              src="https://tse2.mm.bing.net/th/id/OIP.H7jaI0N-5yJRF2ajuSj9rQHaF7?pid=Api"
              alt="Community gathering around food"
              className="w-full h-full object-cover aspect-[16/10] transition-transform duration-300 ease-out group-hover:scale-105"
              loading="lazy"
            />
          </div>

          {/* Text second */}
          <div>
            <h2 className="text-2xl font-semibold">Our Mission</h2>
            <p className="mt-3 max-w-3xl">
              Reduce food waste and strengthen community ties by making sharing
              effortless. We focus on transparency (clear item details),
              safety-minded guidance (practical pickups and labeling), and
              dignity for both donors and recipients. Every post is a chance to
              save a meal, support a neighbor, and protect the environment.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="container-app section-y">
        <h2 className="text-2xl font-semibold">What we value</h2>
        <div className="mt-4 grid gap-6 sm:grid-cols-3">
          <HowCard icon={FaRecycle} title="Waste Less">
            Keep edible food out of landfills. Share extras so resources go
            further and communities thrive.
          </HowCard>
          <HowCard icon={FiUsers} title="Neighbors First">
            Be kind, responsive, and clear. We designed the flow to respect
            everyone’s time and needs.
          </HowCard>
          <HowCard icon={FiShield} title="Safety & Clarity">
            Use clear photos, best-by info, and pickup notes so everyone knows
            what to expect.
          </HowCard>
        </div>
      </section>

      {/* FAQs */}
      <section className="container-app section-y">
        <h2 className="text-2xl font-semibold">FAQs</h2>
        <div className="mt-4 grid gap-4">
          <QA
            q="Is FoodShare free?"
            a="Yes. Posting and requesting are completely free."
          />
          <QA
            q="Which foods can I share?"
            a="Non-expired, safe-to-share items. Add clear photos, note allergens, and include best-by dates."
          />
          <QA
            q="Can I request multiple items?"
            a="Yes, but be considerate—only request what you can pick up and use promptly."
          />
          <QA
            q="How do pickups work?"
            a="Coordinate in messages, choose a suitable location, and arrive on time."
          />
          <QA
            q="What about cooked food?"
            a="If sharing cooked food, ensure it was prepared and stored safely, and label ingredients/allergens."
          />
          <QA
            q="What if a post seems off?"
            a="Use your judgment. You can skip the request, report issues, and prioritize sealed/labeled items."
          />
          <QA
            q="Do you support dark mode?"
            a="Yes. The design adapts to your system theme for comfortable reading in any lighting."
          />
          <QA
            q="How do I get started?"
            a="Create a free account, browse available foods, or post what you’d like to share."
          />
        </div>

        <div className="mt-6 flex items-center gap-2 text-sm opacity-80">
          <FiAlertTriangle aria-hidden />
          <span>
            FoodShare helps connect people; users are responsible for safe
            handling and consumption of shared food.
          </span>
        </div>
      </section>

      {/* CTA */}
      <section className="container-app section-y">
        <div className="card-uniform p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold flex items-center gap-2">
              Join the movement
            </h3>
            <p className="opacity-80">
              Create an account to donate or request food today.
            </p>
          </div>
          <div className="flex gap-3">
            <a href="/register" className="btn-filled">
              Get Started
            </a>
            <a href="/available-foods" className="btn-outline-uni">
              Browse Foods
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
