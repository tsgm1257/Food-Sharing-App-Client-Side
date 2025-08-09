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
    desc: "Neighbors regularly posting available food.",
    points: ["Consistent monthly contributors", "New donors joining weekly"],
  },
  {
    k: "Requests Fulfilled",
    end: 1930,
    suffix: "+",
    icon: FiCheckCircle,
    desc: "Successful handoffs coordinated through FoodShare.",
    points: ["On-time pickups confirmed", "Cancellations kept minimal"],
  },
  {
    k: "Communities",
    end: 40,
    suffix: "+",
    icon: FiMapPin,
    desc: "Cities and neighborhoods participating so far.",
    points: ["Local groups organizing drives", "Expanding with partnerships"],
  },
];

const Highlights = () => (
  <section className="section-y">
    <div className="container-app">
      <SectionTitle
        title="Impact at a Glance"
        subtitle="Real results from people helping people"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map(({ k, end, suffix, icon: Icon, desc, points }) => (
          <div key={k} className="card-uniform p-6 text-center">
            <div className="mx-auto mb-3 flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
              <Icon size={22} aria-hidden="true" />
            </div>

            <div className="text-2xl font-extrabold">
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
