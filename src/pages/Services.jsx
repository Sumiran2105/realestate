
export default function Services() {
  return (
    <div className="py-20 px-6 max-w-6xl mx-auto">
      <h2 className="text-4xl font-bold text-center">Our Services</h2>

      <div className="grid md:grid-cols-3 gap-8 mt-12">
        <ServiceCard title="Legal Verification" />
        <ServiceCard title="Price Intelligence" />
        <ServiceCard title="Escrow Protection" />
      </div>
    </div>
  );
}

function ServiceCard({ title }) {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 text-center">
      <h3 className="text-xl font-semibold">{title}</h3>
    </div>
  );
}