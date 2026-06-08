import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom"; // useNavigate যোগ করা হয়েছে
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { FaGithub, FaGlobe, FaChevronLeft, FaCode } from "react-icons/fa";
import { motion } from "framer-motion";

export default function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate(); // নেভিগেশন কন্ট্রোল করার জন্য
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      const snap = await getDoc(doc(db, "projects", id));
      if (snap.exists()) setProject(snap.data());
      setLoading(false);
    };
    fetchProject();
  }, [id]);

  if (loading)
    return (
      <div className="h-screen bg-[#0F172A] flex items-center justify-center text-cyan-400 font-mono">
        Loading details...
      </div>
    );
  if (!project)
    return (
      <div className="h-screen bg-[#0F172A] flex items-center justify-center text-white text-center">
        Project not found!
        <br />
        <Link to="/" className="text-cyan-400 mt-4 block underline">
          Back to home
        </Link>
      </div>
    );

  return (
    <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto min-h-screen text-white">
      {/* --- স্মার্ট ব্যাক বাটন --- */}
      <button
        onClick={() => navigate(-1)} // এটি আপনাকে একদম আগের পেজে ফিরিয়ে নিয়ে যাবে
        className="flex items-center gap-2 text-slate-500 hover:text-cyan-400 transition-all mb-12 uppercase text-[10px] font-black tracking-widest outline-none"
      >
        <FaChevronLeft size={14} /> Go Back
      </button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl md:text-7xl font-black text-white mb-6 leading-none">
          {project.title}
          <span className="text-cyan-400">.</span>
        </h1>

        <div className="flex flex-wrap gap-2 mb-10">
          {project.tech?.map((t) => (
            <span
              key={t}
              className="px-4 py-1.5 bg-cyan-400/10 text-cyan-400 rounded-lg text-[11px] font-bold border border-cyan-400/20 uppercase tracking-widest"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="bg-[#1E293B] p-8 md:p-12 rounded-[2.5rem] border border-white/5 shadow-2xl mb-12">
          <h3 className="text-cyan-400 font-mono text-xs mb-6 uppercase tracking-[5px] font-black italic">
            Project Summary
          </h3>
          <p className="text-slate-200 text-lg leading-relaxed whitespace-pre-wrap">
            {project.desc}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-3 bg-cyan-400 text-[#0F172A] font-black py-5 rounded-2xl hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all uppercase text-xs tracking-widest"
            >
              <FaGlobe size={18} /> Launch Live Demo
            </a>
          )}
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-3 bg-white/5 border border-white/10 text-white font-black py-5 rounded-2xl hover:bg-white/10 transition-all uppercase text-xs tracking-widest"
            >
              <FaCode size={18} /> View Source Code
            </a>
          )}
        </div>
      </motion.div>
    </div>
  );
}
