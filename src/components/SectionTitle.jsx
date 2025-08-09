const SectionTitle = ({ title, subtitle }) => {
  return (
    <div className="text-center mb-10">
      <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
      {subtitle && <p className="mt-2 text-base-content/70">{subtitle}</p>}
    </div>
  );
};
export default SectionTitle;
