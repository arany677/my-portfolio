import { Typewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // Link ইম্পোর্ট করুন

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

        <div className="flex">
          {/* শুধু একটি বাটন এবং এটি Projects পেজে নিয়ে যাবে */}
          <Link
            to="/projects"
            className="px-10 py-4 bg-cyan-400 text-[#0F172A] font-black rounded-xl text-center hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all uppercase tracking-widest"
          >
            View My Projects
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
