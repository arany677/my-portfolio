import { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import {
  FileDown,
  Loader2,
  Eye,
  GraduationCap,
  Briefcase,
  Award,
} from "lucide-react";

export default function Resume() {
  const [resumeLink, setResumeLink] = useState("");
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchResumeData = async () => {
      try {
        const snap = await getDoc(doc(db, "portfolio", "content"));
        if (snap.exists()) {
          setResumeLink(snap.data().resumeLink);
          setProfile(snap.data());
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchResumeData();
  }, []);

  if (loading)
    return (
      <div className="h-screen bg-[#0F172A] flex flex-col items-center justify-center text-cyan-400 font-mono">
        <Loader2 className="animate-spin mb-4" size={40} />
        <p className="animate-pulse text-sm">LOADING PROFESSIONAL CV...</p>
      </div>
    );

  // ১. সরাসরি ওপেন করার লিঙ্ক (No download force)
  const viewLink = resumeLink
    ? resumeLink.replace("/upload/", "/upload/fl_attachment:false/")
    : "#";

  // ২. ডাউনলোড করার লিঙ্ক (Cloudinary force download flag)
  const downloadLink = resumeLink
    ? resumeLink.replace("/upload/", "/upload/fl_attachment/")
    : "#";

  // ৩. প্রিভিউ ইমেজ লিঙ্ক
  const previewImageUrl = resumeLink
    ? resumeLink
        .replace(".pdf", ".jpg")
        .replace("/upload/", "/upload/w_1000,q_auto,f_auto,pg_1/")
    : "";

  return (
    <div className="pt-28 pb-20 px-4 md:px-6 max-w-6xl mx-auto min-h-screen text-white">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-4xl md:text-7xl font-black italic tracking-tighter uppercase leading-none">
            My <span className="text-cyan-400">Resume.</span>
          </h1>
          <p className="text-slate-500 font-mono text-[10px] mt-4 tracking-[0.4em] uppercase">
            Professional Profile Preview
          </p>
        </motion.div>

        {resumeLink && (
          <div className="flex gap-4 w-full md:w-auto">
            {/* ডাউনলোড বাটন - সরাসরি <a> ট্যাগ ব্যবহার করা হয়েছে */}
            <a
              href={downloadLink}
              download="Arany_Hasan_Resume.pdf"
              className="flex-grow md:flex-none flex items-center justify-center gap-4 bg-cyan-400 text-[#0F172A] px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all hover:scale-105 active:scale-95"
            >
              Download PDF <FileDown size={22} />
            </a>
          </div>
        )}
      </div>

      <div className="grid lg:grid-cols-12 gap-12 items-start">
        {/* Left Side: Visual Preview (Click to Open) */}
        <div className="lg:col-span-7 group relative">
          <a
            href={viewLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#1E293B] shadow-2xl transition-all hover:border-cyan-400/40">
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center z-10 backdrop-blur-[4px]">
                <div className="bg-white text-primary p-4 rounded-full mb-4 shadow-2xl">
                  <Eye size={32} />
                </div>
                <span className="text-white font-black uppercase tracking-[3px] text-xs text-center px-4">
                  Click to View in New Tab
                </span>
              </div>

              <img
                src={previewImageUrl}
                alt="Resume Preview"
                className="w-full h-auto min-h-[500px] object-top transition-transform duration-700 group-hover:scale-105"
                onError={(e) =>
                  (e.target.src =
                    "https://via.placeholder.com/800x1200?text=Resume+Link+Ready")
                }
              />
            </div>
          </a>
          <p className="mt-6 text-center text-slate-500 font-mono text-[10px] uppercase tracking-widest">
            * Click the document above to open in full screen
          </p>
        </div>

        {/* Right Side: Design (অবিকল আগের মতো রাখা হয়েছে) */}
        <div className="lg:col-span-5 space-y-12">
          <section className="space-y-8">
            <div className="flex items-center gap-3 border-b border-white/5 pb-4">
              <GraduationCap className="text-cyan-400" size={24} />
              <h2 className="text-xl font-bold uppercase tracking-widest text-white">
                Education
              </h2>
            </div>
            <div className="border-l-2 border-slate-800 ml-3 space-y-8">
              <TimelineItem
                year="2022 - Present"
                title="B.Sc. in CSE"
                sub={profile?.university || "University Name"}
              />
              <TimelineItem
                year="2019 - 2021"
                title="Higher Secondary"
                sub={profile?.college || "College Name"}
              />
            </div>
          </section>

          <section className="space-y-8">
            <div className="flex items-center gap-3 border-b border-white/5 pb-4">
              <Briefcase className="text-cyan-400" size={24} />
              <h2 className="text-xl font-bold uppercase tracking-widest text-white">
                Experience
              </h2>
            </div>
            <div className="border-l-2 border-slate-800 ml-3 space-y-8">
              <TimelineItem
                year="2023 - Active"
                title="Frontend Developer"
                sub="Freelance & Projects"
              />
              <TimelineItem
                year="2022 - 2023"
                title="Learning Journey"
                sub="Intensive Self-Study"
              />
            </div>
          </section>

          <div className="bg-cyan-400/5 p-8 rounded-3xl border border-cyan-400/20 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <Award className="text-cyan-400" />
              <h3 className="font-bold text-white uppercase tracking-widest text-sm">
                Top Skills
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {["React.js", "JavaScript", "Firebase", "Tailwind", "Git"].map(
                (skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-[#0F172A] text-cyan-400 text-[10px] font-bold rounded-lg border border-cyan-400/10 uppercase tracking-widest leading-none"
                  >
                    {skill}
                  </span>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TimelineItem({ year, title, sub }) {
  return (
    <div className="relative pl-8">
      <div className="absolute w-3 h-3 bg-cyan-400 rounded-full -left-[7px] top-1.5 border-2 border-[#0F172A]"></div>
      <p className="text-cyan-400 font-mono text-[10px] mb-1">{year}</p>
      <h4 className="text-white font-bold uppercase tracking-tight text-md leading-none mb-2">
        {title}
      </h4>
      <p className="text-slate-400 text-sm">{sub}</p>
    </div>
  );
}
