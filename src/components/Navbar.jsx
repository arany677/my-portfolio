import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X, FileText } from "lucide-react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user] = useAuthState(auth);
  const location = useLocation();

  // মেনু ওপেন থাকলে স্ক্রল বন্ধ রাখা
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
  }, [isOpen]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Projects", path: "/projects" },
    { name: "Skills", path: "/skills" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="fixed top-0 w-full z-[1000] bg-transparent h-20 flex items-center">
      <div className="max-w-7xl mx-auto px-6 w-full flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          onClick={() => setIsOpen(false)}
          className="text-white font-black text-xl tracking-tighter z-[1100]"
        >
          ARANY<span className="text-cyan-400">.</span>dev
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-[11px] font-bold uppercase tracking-[2px] transition-all hover:text-cyan-400 ${
                location.pathname === link.path
                  ? "text-cyan-400"
                  : "text-slate-400"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/resume"
            className="ml-2 px-4 py-2 border border-cyan-400/30 text-cyan-400 text-[10px] font-bold rounded-lg hover:bg-cyan-400/10 transition-all uppercase tracking-widest"
          >
            Resume
          </Link>
        </div>

        {/* Mobile Toggle Button */}
        <button
          className="md:hidden text-cyan-400 z-[1100] p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* --- Mobile Sidebar Overlay --- */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop (স্বচ্ছ কালো ব্যাকগ্রাউন্ড) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[1001] md:hidden"
            />

            {/* স্লাইড মেনু: এটি এখন স্বচ্ছ (Transparent) এবং ব্লার (Glass effect) */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-[250px] bg-[#0F172A]/40 backdrop-blur-xl z-[1002] shadow-2xl flex flex-col p-8 pt-28 border-l border-white/10 md:hidden"
            >
              <div className="flex flex-col gap-5">
                <p className="text-[10px] font-black text-cyan-400/50 uppercase tracking-[4px] mb-2">
                  Menu
                </p>

                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`text-sm font-bold uppercase tracking-widest transition-all ${
                      location.pathname === link.path
                        ? "text-cyan-400"
                        : "text-slate-200"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}

                <Link
                  to="/resume"
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-bold uppercase tracking-widest text-cyan-400 flex items-center gap-2 border-t border-white/5 pt-5 mt-2"
                >
                  <FileText size={16} /> Resume
                </Link>

                {user && (
                  <Link
                    to="/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="mt-4 bg-cyan-400/10 text-cyan-400 border border-cyan-400/30 px-5 py-2 rounded-xl font-bold text-center uppercase text-[10px]"
                  >
                    Dashboard
                  </Link>
                )}
              </div>

              <div className="mt-auto text-slate-500 font-mono text-[9px] uppercase tracking-widest text-center opacity-40">
                © 2024 ARANY HASAN
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
