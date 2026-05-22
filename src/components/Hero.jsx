import { Typewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";

export default function Hero({ data }) {
  return (
    <section className="min-h-screen flex flex-col justify-center max-w-6xl mx-auto px-6">
      <motion.p
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        className="text-accent font-mono text-lg mb-4"
      >
        Hello, I'm
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-5xl md:text-8xl font-black text-white mb-4"
      >
        {data?.name || "Arany Hasan"}
        <span className="text-accent">.</span>
      </motion.h1>

      <h2 className="text-3xl md:text-5xl font-bold text-slate-500 mb-8 h-12">
        <Typewriter
          words={[
            "Frontend Developer",
            "React Enthusiast",
            "CSE Student",
            "Creative Coder",
          ]}
          loop={0}
          cursor
          cursorStyle="_"
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={1500}
        />
      </h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="max-w-2xl text-slate-400 text-xl mb-12"
      >
        {data?.heroSubtitle ||
          "Building high-quality websites with modern tech stacks."}
      </motion.p>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
      >
        <a
          href="#projects"
          className="px-10 py-4 bg-accent text-primary font-bold rounded hover:shadow-[0_0_20px_rgba(34,211,238,0.5)] transition-all"
        >
          Check My Work
        </a>
      </motion.div>
    </section>
  );
}
