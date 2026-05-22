import { motion } from "framer-motion";

export default function Projects({ projects }) {
  return (
    <section
      id="work"
      className="w-full bg-[#111d35] py-24 transition-colors duration-500"
    >
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-white mb-12 flex items-center gap-4">
          <span className="text-accent font-mono text-xl">03.</span> Featured
          Projects
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-dev-bg p-8 rounded-xl border border-white/5 hover:border-accent/30 transition-all"
            >
              <h3 className="text-xl font-bold text-white mb-3">{p.title}</h3>
              <p className="text-slate-200 text-sm mb-6 leading-relaxed">
                {p.desc}
              </p>
              <div className="flex gap-2 flex-wrap font-mono text-[10px] text-accent">
                {p.tech?.map((t) => (
                  <span key={t}>#{t}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
