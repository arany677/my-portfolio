import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X, LayoutDashboard, FileText } from "lucide-react";
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
    <nav className="fixed top-0 w-full z-[100] bg-[#0F172A]/80 backdrop-blur-md border-b border-white/5 h-20 flex items-center">
      <div className="max-w-7xl mx-auto px-6 w-full flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          onClick={() => setIsOpen(false)}
          className="text-white font-black text-xl tracking-tighter z-[1001]"
        >
          ARANY<span className="text-cyan-400">.</span>dev
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-7 items-center">
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

          {/* Resume Link - আলাদা ভাবে হাইলাইট করা হয়েছে */}
          <Link
            to="/resume"
            className="ml-2 px-5 py-2 border border-cyan-400/30 text-cyan-400 text-[11px] font-bold rounded-lg hover:bg-cyan-400/10 transition-all uppercase tracking-widest flex items-center gap-2"
          >
            <FileText size={14} /> Resume
          </Link>

          {/* Dashboard বাটন (লগইন থাকলে দেখাবে) */}
          {user && (
            <Link
              to="/dashboard"
              className="bg-cyan-400 text-[#0F172A] px-5 py-2 rounded-lg font-black text-[11px] uppercase tracking-widest hover:bg-white transition-all ml-2"
            >
              Dashboard
            </Link>
          )}
        </div>

        {/* Mobile Toggle Button */}
        <button
          className="md:hidden text-cyan-400 z-[1001] p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999] md:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed inset-y-0 right-0 w-[280px] bg-[#1E293B] z-[1000] shadow-2xl flex flex-col p-10 pt-28 border-l border-white/10 md:hidden"
            >
              <div className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`text-xl font-black uppercase tracking-tighter transition-all ${
                      location.pathname === link.path
                        ? "text-cyan-400"
                        : "text-white"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}

                {/* Mobile Resume Link */}
                <Link
                  to="/resume"
                  onClick={() => setIsOpen(false)}
                  className="text-xl font-black uppercase tracking-tighter text-cyan-400 flex items-center gap-2 border-t border-white/5 pt-6"
                >
                  <FileText size={20} /> My Resume
                </Link>

                {user && (
                  <Link
                    to="/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="mt-4 bg-cyan-400 text-[#0F172A] px-6 py-3 rounded-xl font-black text-center uppercase tracking-widest text-sm"
                  >
                    Admin Dashboard
                  </Link>
                )}
              </div>

              <div className="mt-auto text-slate-500 font-mono text-[10px] uppercase tracking-widest text-center">
                © 2024 ARANY HASAN
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
