import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { motion } from "framer-motion";
// Lucide এর বদলে React Icons ব্যবহার করছি
import { FaGithub, FaExternalLinkAlt, FaFolder } from "react-icons/fa";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const q = query(collection(db, "projects"), orderBy("title", "asc"));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProjects(data);
      } catch (error) {
        console.error("Error: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="pt-32 pb-20 min-h-screen bg-dev-bg px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-white mb-2">My Projects</h2>
        <p className="text-accent font-mono mb-12">
          / Things I've built with code
        </p>

        {loading ? (
          <div className="text-accent animate-pulse font-mono">
            Fetching data...
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((p) => (
              <motion.div
                key={p.id}
                whileHover={{ y: -10 }}
                className="bg-dev-card p-8 rounded-xl border border-white/5 hover:border-accent/30 transition-all group"
              >
                <div className="flex justify-between items-center mb-6">
                  <FaFolder className="text-accent text-4xl" />
                  <div className="flex gap-4 text-slate-400">
                    {p.githubLink && (
                      <a
                        href={p.githubLink}
                        target="_blank"
                        className="hover:text-accent transition"
                      >
                        <FaGithub size={22} />
                      </a>
                    )}
                    {p.liveLink && (
                      <a
                        href={p.liveLink}
                        target="_blank"
                        className="hover:text-accent transition"
                      >
                        <FaExternalLinkAlt size={18} />
                      </a>
                    )}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-100 mb-3 group-hover:text-accent transition">
                  {p.title}
                </h3>
                <p className="text-slate-400 text-sm mb-6 leading-relaxed line-clamp-3">
                  {p.desc}
                </p>
                <div className="flex gap-3 flex-wrap font-mono text-[10px] text-accent/80 uppercase">
                  {p.tech?.map((t) => (
                    <span key={t} className="bg-accent/5 px-2 py-1 rounded">
                      #{t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
