import SectionTitle from "../../components/SectionTitle";
import {
  FiShield,
  FiThermometer,
  FiClock,
  FiAlertTriangle,
} from "react-icons/fi";

const tips = [
  {
    title: "Clean & Safe Handling",
    icon: FiShield,
    desc:
      "Wash hands and utensils. Use clean containers and label them clearly.",
    bullets: [
      "Use separate containers for hot & cold foods",
      "Label with date and key ingredients",
      "Avoid cross-contamination (veg/meat)",
    ],
  },
  {
    title: "Time & Temperature",
    icon: FiThermometer,
    desc:
      "Keep hot foods hot and cold foods cold to slow bacterial growth.",
    bullets: [
      "Refrigerate within 2 hours of cooking",
      "Keep below 40°F / 4°C or above 140°F / 60°C",
      "Reheat leftovers to a rolling boil or 165°F / 74°C",
    ],
  },
  {
    title: "Pickup Windows",
    icon: FiClock,
    desc:
      "Shorter pickup windows keep food fresher and safer for everyone.",
    bullets: [
      "Offer realistic, short pickup times",
      "Use insulated bags/ice packs if needed",
      "Discard if left out too long",
    ],
  },
  {
    title: "Allergens & Notes",
    icon: FiAlertTriangle,
    desc:
      "Be transparent about ingredients so requesters can stay safe.",
    bullets: [
      "Disclose nuts, dairy, gluten, eggs, shellfish",
      "List spice level & common additives",
      "Mention if previously frozen",
    ],
  },
];

const SafetyTips = () => (
  <section className="section-y">
    <div className="container-app">
      <SectionTitle
        title="Safety & Hygiene Tips"
        subtitle="Simple guidelines to keep sharing safe and respectful"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {tips.map(({ title, icon: Icon, desc, bullets }) => (
          <div key={title} className="card-uniform p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                <Icon size={20} aria-hidden="true" />
              </div>
              <h3 className="font-semibold">{title}</h3>
            </div>
            <p className="text-sm text-base-content/70">{desc}</p>
            <ul className="mt-3 text-sm space-y-1 list-disc pl-5 marker:text-primary/70">
              {bullets.map((b, i) => (
                <li key={i} className="leading-relaxed">{b}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default SafetyTips;
