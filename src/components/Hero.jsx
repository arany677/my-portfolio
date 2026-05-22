import { Typewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";

export default function Hero({ data }) {
  return (
    <section className="min-h-screen flex flex-col justify-center px-6 pt-20 md:pt-0 max-w-6xl mx-auto overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-cyan-400 font-mono text-sm md:text-lg mb-4 tracking-[0.2em] uppercase">
          Hello, I am
        </p>

        {/* মোবাইলে text-4xl আর বড় স্ক্রিনে text-8xl */}
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-black text-white mb-4 leading-tight">
          {data?.name || "Arany Hasan"}
          <span className="text-cyan-400">.</span>
        </h1>

        <h2 className="text-xl sm:text-3xl md:text-6xl font-bold text-slate-500 mb-8 min-h-[40px]">
          <Typewriter
            words={["Frontend Developer", "CSE Student", "UI Designer"]}
            loop={0}
            cursor
            cursorStyle="_"
            typeSpeed={70}
          />
        </h2>

        <p className="max-w-xl text-slate-400 text-sm sm:text-base md:text-xl leading-relaxed mb-10">
          {data?.heroSubtitle ||
            "Building high-quality web applications with passion and precision."}
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="#projects"
            className="px-8 py-4 bg-cyan-400 text-[#0F172A] font-black rounded-xl text-center hover:scale-105 transition-all"
          >
            VIEW PROJECTS
          </a>
          <a
            href="#contact"
            className="px-8 py-4 border border-white/10 text-white font-black rounded-xl text-center hover:bg-white/5 transition-all"
          >
            CONTACT ME
          </a>
        </div>
      </motion.div>
    </section>
  );
}
