import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export default function OCRSection() {
  return (
    <section className="py-12 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* HEADER */}
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-semibold text-blue-900">
            Document OCR & AI Verification
          </h2>
          <p className="mt-6 text-lg text-slate-600 leading-relaxed">
            Our AI powered OCR engine extracts structured data,
            validates it against authoritative records,
            and detects fraud using multi layered intelligence models.
          </p>
        </div>
        {/* CARDS WITH STAGGER */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 grid md:grid-cols-2 gap-6"
        >
          {[
            {
              no: "01",
              title: "Sale Deed Processing",
              desc: "Extract seller, buyer, survey number and validate registration format.",
              color: "text-blue-600",
              accent: "from-blue-500 to-blue-400"
            },
            {
              no: "02",
              title: "Encumbrance Certificate",
              desc: "Identify transaction period, mortgages and financial encumbrances.",
              color: "text-purple-600",
              accent: "from-purple-500 to-purple-400"
            },
            {
              no: "03",
              title: "Pattadar Passbook",
              desc: "Extract ownership and cross match with Bhu Bharati API.",
              color: "text-emerald-600",
              accent: "from-emerald-500 to-emerald-400"
            },
            {
              no: "04",
              title: "Aadhaar Verification",
              desc: "Validate identity data and perform UIDAI compliant checks.",
              color: "text-amber-600",
              accent: "from-amber-500 to-amber-400"
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="group relative bg-white rounded-xl p-6 border border-slate-200 hover:-translate-y-2 hover:shadow-lg transition-all duration-500"
            >
              {/* Animated Accent Line */}
              <div
                className={`absolute top-0 left-0 h-1 w-full bg-gradient-to-r ${item.accent} scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500`}
              />
              {/* NUMBER + TITLE SAME LINE */}
              <div className="flex items-center gap-4">
                <span className={`text-sm font-semibold ${item.color}`}>{item.no}</span>
                <h3 className={`text-lg font-semibold ${item.color}`}>{item.title}</h3>
              </div>
              {/* DESCRIPTION */}
              <p className="mt-4 text-sm text-slate-600 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
        {/* FOOT TEXT */}
        <div className="mt-16 max-w-4xl mx-auto text-center">
          <p className="text-slate-600 leading-relaxed text-sm">
            The AI fraud detection engine analyzes metadata,
            detects tampering, and validates chronological consistency
            significantly reducing documentation risk.
          </p>
        </div>
      </div>
    </section>
  );
}
