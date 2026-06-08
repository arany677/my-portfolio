import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, where, limit } from "firebase/firestore";
import Hero from "../components/Hero";
import { Link } from "react-router-dom";
import { FaArrowRight, FaFolder } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Home() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    const fetchFeatured = async () => {
      // শুধু 'isFeatured == true' প্রজেক্টগুলো আনবে, সর্বোচ্চ ৩টি
      const q = query(
        collection(db, "projects"),
        where("isFeatured", "==", true),
        limit(3),
      );
      const snap = await getDocs(q);
      setFeatured(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };
    fetchFeatured();
  }, []);

  return (
    <div className="bg-[#0F172A] min-h-screen">
      <Hero />
      <section className="bg-[#111d35] py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-cyan-400 font-mono text-sm mb-2 uppercase tracking-widest">
                Selected Works
              </h2>
              <h3 className="text-3xl md:text-5xl font-black text-white italic uppercase tracking-tighter">
                Featured Projects
              </h3>
            </div>
            <Link
              to="/projects"
              className="hidden md:flex items-center gap-2 text-cyan-400 font-bold hover:gap-4 transition-all"
            >
              View All <FaArrowRight />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featured.map((p) => (
              <motion.div
                key={p.id}
                whileHover={{ y: -10 }}
                className="bg-[#0F172A] p-8 rounded-[2rem] border border-white/5 flex flex-col justify-between"
              >
                <div>
                  <FaFolder className="text-cyan-400 text-3xl mb-6" />
                  <h4 className="text-xl font-bold text-white mb-3">
                    {p.title}
                  </h4>
                  <p className="text-slate-400 text-sm line-clamp-3 mb-6 italic">
                    "{p.desc}"
                  </p>
                </div>
                <Link
                  to={`/project/${p.id}`}
                  className="text-xs font-black uppercase text-cyan-400 tracking-[2px] flex items-center gap-2 hover:text-white transition-all"
                >
                  See Details <FaArrowRight size={10} />
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 md:hidden">
            <Link
              to="/projects"
              className="flex justify-center items-center gap-2 bg-cyan-400 text-primary py-4 rounded-xl font-black"
            >
              SEE ALL PROJECTS <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
