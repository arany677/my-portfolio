import { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";

export default function Footer() {
  const [socials, setSocials] = useState({
    github: "",
    linkedin: "",
    facebook: "",
  });

  useEffect(() => {
    const fetchSocials = async () => {
      const snap = await getDoc(doc(db, "portfolio", "content"));
      if (snap.exists()) {
        const data = snap.data();
        setSocials({
          github: data.github || "",
          linkedin: data.linkedin || "",
          facebook: data.facebook || "",
        });
      }
    };
    fetchSocials();
  }, []);

  // লিঙ্ক সঠিক কি না চেক করার জন্য
  const formatUrl = (url) => {
    if (!url) return null;
    return url.startsWith("http") ? url : `https://${url}`;
  };

  return (
    <footer className="w-full py-12 border-t border-white/5 bg-[#0F172A] mt-20">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-8">
        {/* সোশ্যাল আইকনসমূহ */}
        <div className="flex gap-10">
          {socials.github && (
            <a
              href={formatUrl(socials.github)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-cyan-400 transition-all transform hover:scale-125 hover:-translate-y-1"
            >
              <FaGithub size={26} />
            </a>
          )}
          {socials.linkedin && (
            <a
              href={formatUrl(socials.linkedin)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-cyan-400 transition-all transform hover:scale-125 hover:-translate-y-1"
            >
              <FaLinkedin size={26} />
            </a>
          )}
          {socials.facebook && (
            <a
              href={formatUrl(socials.facebook)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-cyan-400 transition-all transform hover:scale-125 hover:-translate-y-1"
            >
              <FaFacebook size={26} />
            </a>
          )}
        </div>

        {/* নিচের কপিরাইট ও অ্যাডমিন লিঙ্ক */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4 text-slate-600 font-mono text-[10px] uppercase tracking-[3px]">
          <p>© 2024 Built by Arany Hasan</p>
          <Link
            to="/login"
            className="hover:text-cyan-400 transition-all opacity-30 hover:opacity-100"
          >
            Admin Login
          </Link>
        </div>
      </div>
    </footer>
  );
}
