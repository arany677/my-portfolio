import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { Link } from "react-router-dom";
import { FaFolder, FaArrowRight } from "react-icons/fa";

export default function Projects() {
  const [allProjects, setAllProjects] = useState([]);

  useEffect(() => {
    const fetchAll = async () => {
      const q = query(collection(db, "projects"), orderBy("createdAt", "desc"));
      const snap = await getDocs(q);
      setAllProjects(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };
    fetchAll();
  }, []);

  return (
    <div className="pt-32 pb-20 px-6 bg-[#0F172A] min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-black text-white mb-4 uppercase italic tracking-tighter">
          My Archive<span className="text-cyan-400">.</span>
        </h1>
        <p className="text-slate-500 font-mono mb-16">
          / A complete list of things I've built
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allProjects.map((p) => (
            <div
              key={p.id}
              className="bg-[#1E293B] p-8 rounded-[2.5rem] border border-white/5 flex flex-col hover:border-cyan-400/30 transition-all group"
            >
              <FaFolder className="text-slate-600 group-hover:text-cyan-400 transition-colors text-4xl mb-6" />
              <h3 className="text-2xl font-bold text-white mb-3">{p.title}</h3>
              <p className="text-slate-400 text-sm mb-6 line-clamp-3">
                {p.desc}
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {p.tech?.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] font-bold text-cyan-400 bg-cyan-400/5 px-2 py-1 rounded"
                  >
                    #{t}
                  </span>
                ))}
              </div>
              <Link
                to={`/project/${p.id}`}
                className="mt-auto bg-[#0F172A] text-white py-4 rounded-2xl text-center font-black text-xs tracking-widest uppercase hover:bg-cyan-400 hover:text-primary transition-all"
              >
                See Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
