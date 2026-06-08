import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
// Lucide এর বদলে React Icons ব্যবহার করছি (Error free)
import {
  FaGithub,
  FaExternalLinkAlt,
  FaArrowRight,
  FaFolder,
} from "react-icons/fa";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const q = query(
          collection(db, "projects"),
          orderBy("createdAt", "desc"),
        );
        const snap = await getDocs(q);
        setProjects(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <section id="projects" className="w-full bg-[#111d35] py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-black text-white mb-16 flex items-center gap-4">
          <span className="text-cyan-400 font-mono text-xl">03.</span> Projects
          <div className="h-[1px] bg-slate-800 flex-grow max-w-xs hidden md:block"></div>
        </h2>

        {loading ? (
          <p className="text-cyan-400 animate-pulse font-mono">
            Loading projects...
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((p) => (
              <motion.div
                key={p.id}
                whileHover={{ y: -10 }}
                className="bg-[#0F172A] p-8 rounded-3xl border border-white/5 flex flex-col h-full hover:border-cyan-400/30 transition-all group shadow-xl"
              >
                <div className="flex justify-between items-start mb-8">
                  <FaFolder className="text-cyan-400 text-4xl" />
                  <div className="flex gap-4 text-slate-500">
                    {p.githubLink && (
                      <a
                        href={p.githubLink}
                        target="_blank"
                        className="hover:text-cyan-400 transition"
                      >
                        <FaGithub size={20} />
                      </a>
                    )}
                    {p.liveLink && (
                      <a
                        href={p.liveLink}
                        target="_blank"
                        className="hover:text-cyan-400 transition"
                      >
                        <FaExternalLinkAlt size={18} />
                      </a>
                    )}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition">
                  {p.title}
                </h3>

                {/* ৩ লাইনে সীমাবদ্ধ ডেসক্রিপশন */}
                <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3">
                  {p.desc}
                </p>

                <div className="flex gap-2 flex-wrap mb-8">
                  {p.tech?.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-bold text-cyan-400 bg-cyan-400/5 px-2 py-1 rounded"
                    >
                      #{t}
                    </span>
                  ))}
                </div>

                {/* বিস্তারিত পেজে যাওয়ার বাটন */}
                <Link
                  to={`/project/${p.id}`}
                  className="mt-auto flex items-center gap-2 text-white font-black text-[10px] uppercase tracking-widest hover:text-cyan-400 transition-all"
                >
                  See Project Details <FaArrowRight size={12} />
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
