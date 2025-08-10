import SectionTitle from "../../components/SectionTitle";
import { FiTrendingUp, FiUsers, FiCheckCircle, FiMapPin } from "react-icons/fi";
import CountUp from "react-countup";

const stats = [
  {
    k: "Meals Shared",
    end: 2480,
    suffix: "+",
    icon: FiTrendingUp,
    desc: "Home-cooked and surplus meals shared locally.",
    points: ["Portions recorded by donors", "Verified handoffs completed"],
  },
  {
    k: "Active Donors",
    end: 560,
    suffix: "+",
    icon: FiUsers,
    desc: "Neighbors regularly posting available foods.",
    points: ["Onboarded with email", "Recent monthly activity ≥ 1"],
  },
  {
    k: "Successful Requests",
    end: 1800,
    suffix: "+",
    icon: FiCheckCircle,
    desc: "Requests fulfilled through the platform.",
    points: ["Pickup confirmed", "No-show rate trending down"],
  },
  {
    k: "Pickup Points",
    end: 120,
    suffix: "+",
    icon: FiMapPin,
    desc: "Common meetup spots across neighborhoods.",
    points: ["Grocery parking lots", "Community centers & parks"],
  },
];

const Highlights = () => (
  <section className="section-y">
    <div className="container-app">
      <SectionTitle
        title="Community Highlights"
        subtitle="Real numbers from real neighbors"
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-6">
        {stats.map(({ k, end, suffix, icon: Icon, desc, points }, idx) => (
          <div key={idx} className="card-uniform p-5 text-center">
            {/* NEW: show the icon so it's actually used */}
            <div className="flex justify-center">
              <div className="p-2 rounded-full bg-primary/10 text-primary">
                <Icon className="text-xl" />
              </div>
            </div>

            <div className="text-3xl font-bold mt-2">
              <CountUp
                end={end}
                duration={1.5}
                suffix={suffix}
                separator=","
                enableScrollSpy
                scrollSpyDelay={150}
                scrollSpyOnce
              />
            </div>

            <div className="text-sm text-base-content/70 mt-1 font-medium">
              {k}
            </div>
            <p className="text-xs text-base-content/60 mt-2">{desc}</p>

            <ul className="mt-3 text-left text-xs space-y-1 list-disc pl-5 marker:text-primary/70">
              {points.map((p, i) => (
                <li key={i} className="leading-relaxed">
                  {p}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Highlights;
