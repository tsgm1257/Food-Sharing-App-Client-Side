import SectionTitle from "../../components/SectionTitle";
import {
  FiUpload, // Share
  FiSearch, // Browse
  FiSend, // Request
  FiMapPin, // Pickup
} from "react-icons/fi";

const steps = [
  {
    title: "Share",
    icon: FiUpload,
    desc: "Post surplus food with clear details and a friendly note.",
    points: [
      "Use a clean, well-lit photo",
      "Set a reasonable pickup window",
      "Mention allergens if any",
    ],
  },
  {
    title: "Browse",
    icon: FiSearch,
    desc: "Find what you need near you with filters and search.",
    points: [
      "Sort by quantity or date",
      "Check pickup location distance",
      "Read notes for special instructions",
    ],
  },
  {
    title: "Request",
    icon: FiSend,
    desc: "Send a polite request and confirm pickup time.",
    points: [
      "Be specific and respectful",
      "Only request what you can pickup",
      "Cancel early if plans change",
    ],
  },
  {
    title: "Pickup",
    icon: FiMapPin,
    desc: "Arrive on time and follow the donor’s instructions.",
    points: [
      "Bring a clean container if needed",
      "Confirm completion in the app",
      "Say thanks—it matters!",
    ],
  },
];

const HowItWorks = () => (
  <section className="section-y">
    <div className="container-app">
      <SectionTitle
        title="How It Works"
        subtitle="Simple, safe, and respectful for everyone"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map(({ title, icon: Icon, desc, points }) => (
          <div key={title} className="card-uniform p-6 text-center">
            <div className="mx-auto mb-3 flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
              <Icon size={22} aria-hidden="true" />
            </div>
            <h3 className="font-semibold">{title}</h3>
            <p className="text-sm text-base-content/70 mt-2">{desc}</p>
            <ul className="mt-3 text-left text-sm space-y-1 list-disc pl-5 marker:text-primary/70">
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

export default HowItWorks;
