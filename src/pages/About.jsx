import { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import { GraduationCap, MapPin, BookOpen } from "lucide-react";

export default function About() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getDoc(doc(db, "portfolio", "content")).then((snap) => {
      if (snap.exists()) setData(snap.data());
    });
  }, []);

  if (!data)
    return (
      <div className="h-screen bg-[#0F172A] flex items-center justify-center text-cyan-400 font-mono">
        Loading Profile...
      </div>
    );

  return (
    <div className="pt-32 pb-20 px-6 max-w-6xl mx-auto min-h-screen text-white">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-5xl font-black mb-16"
      >
        About <span className="text-cyan-400">Me.</span>
      </motion.h1>

      <div className="grid md:grid-cols-12 gap-12 items-start">
        {/* Left Side: Photo & Address */}
        <div className="md:col-span-5 space-y-8">
          <div className="relative group">
            <div className="absolute -inset-2 bg-cyan-400/20 rounded-2xl blur"></div>
            <img
              src={data.photoURL || "https://via.placeholder.com/400"}
              alt="Profile"
              className="relative w-full aspect-square object-cover rounded-2xl border-2 border-slate-700 bg-slate-800"
            />
          </div>

          <div className="bg-[#1E293B] p-8 rounded-2xl border border-white/5 space-y-6">
            <div className="flex items-center gap-4">
              <MapPin className="text-cyan-400" />
              <div>
                <p className="text-xs text-slate-500 uppercase font-black tracking-widest">
                  Current Address
                </p>
                <p className="text-white font-bold">
                  {data.address || "Dhaka, Bangladesh"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Bio & Education */}
        <div className="md:col-span-7 space-y-10">
          <div>
            <h2 className="text-2xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
              <BookOpen size={24} /> My Journey
            </h2>
            <div className="text-lg leading-relaxed text-slate-300 space-y-6">
              {data.about
                ? data.about.split("\n").map((p, i) => <p key={i}>{p}</p>)
                : "Loading biography..."}
            </div>
          </div>

          {/* Education List */}
          <div className="space-y-4 pt-6 border-t border-slate-800">
            <h3 className="text-xl font-bold text-white">
              Education Background
            </h3>
            <ul className="space-y-4">
              <EduItem type="University" name={data.university} />
              <EduItem type="College" name={data.college} />
              <EduItem type="School" name={data.school} />
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function EduItem({ type, name }) {
  return (
    <li className="flex justify-between items-center p-5 bg-white/5 rounded-xl border border-white/5">
      <span className="text-cyan-400 font-mono text-xs uppercase font-black">
        {type}
      </span>
      <span className="text-slate-100 font-bold">
        {name || "Update in Admin"}
      </span>
    </li>
  );
}
