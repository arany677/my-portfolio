import { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { FileDown, GraduationCap, Briefcase } from "lucide-react";

export default function Resume() {
  const [resumeLink, setResumeLink] = useState("");

  useEffect(() => {
    getDoc(doc(db, "portfolio", "content")).then((snap) => {
      if (snap.exists()) setResumeLink(snap.data().resumeLink);
    });
  }, []);

  return (
    <div className="pt-32 pb-20 px-6 max-w-5xl mx-auto min-h-screen text-white">
      <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
        <h1 className="text-5xl font-black italic tracking-tighter">
          My <span className="text-cyan-400">Resume.</span>
        </h1>
        <a
          href={resumeLink}
          target="_blank"
          className="flex items-center gap-3 bg-cyan-400 text-[#0F172A] px-8 py-4 rounded-xl font-black uppercase tracking-widest hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all"
        >
          Download CV <FileDown size={20} />
        </a>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Education Timeline */}
        <div className="space-y-8">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <GraduationCap className="text-cyan-400" /> Education
          </h2>
          <div className="border-l-2 border-slate-800 ml-3 space-y-10">
            <TimelineItem
              year="2022 - Present"
              title="B.Sc. in Computer Science"
              sub="Ahsanullah University of Science and Technology"
            />
            <TimelineItem
              year="2019 - 2021"
              title="Higher Secondary School Certificate"
              sub="XYZ Government College"
            />
          </div>
        </div>

        {/* Experience Timeline */}
        <div className="space-y-8">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <Briefcase className="text-cyan-400" /> Experience
          </h2>
          <div className="border-l-2 border-slate-800 ml-3 space-y-10">
            <TimelineItem
              year="2023 - Present"
              title="Frontend Intern"
              sub="Software Agency Name"
            />
            <TimelineItem
              year="2022 - 2023"
              title="Freelance Developer"
              sub="Self Employed"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function TimelineItem({ year, title, sub }) {
  return (
    <div className="relative pl-8">
      <div className="absolute w-4 h-4 bg-cyan-400 rounded-full -left-[9px] top-1 border-4 border-[#0F172A]"></div>
      <p className="text-cyan-400 font-mono text-sm mb-1">{year}</p>
      <h3 className="text-xl font-bold text-white uppercase">{title}</h3>
      <p className="text-slate-400">{sub}</p>
    </div>
  );
}
