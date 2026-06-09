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
    // h-20 এবং bg-[#0F172A] নিশ্চিত করবে যে এটি ডেস্কটপে সলিড থাকবে
    <nav className="fixed top-0 w-full z-[1000] bg-[#0F172A] border-b border-white/5 h-20 flex items-center">
      <div className="max-w-7xl mx-auto px-6 w-full flex justify-between items-center">
        <Link
          to="/"
          onClick={() => setIsOpen(false)}
          className="text-white font-black text-xl tracking-tighter"
        >
          ARANY<span className="text-cyan-400">.</span>dev
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-7 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-[11px] font-bold uppercase tracking-[2px] transition-all hover:text-cyan-400 ${location.pathname === link.path ? "text-cyan-400" : "text-slate-400"}`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/resume"
            className="ml-2 px-4 py-2 border border-cyan-400/30 text-cyan-400 text-[10px] font-bold rounded-lg hover:bg-cyan-400/10 transition-all uppercase"
          >
            Resume
          </Link>
          {user && (
            <Link
              to="/dashboard"
              className="bg-cyan-400 text-[#0F172A] px-4 py-2 rounded-lg font-black text-[10px] uppercase"
            >
              Dashboard
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-cyan-400 p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu (Glass Effect) */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[1001] md:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-[250px] bg-[#0F172A]/80 backdrop-blur-xl z-[1002] shadow-2xl flex flex-col p-8 pt-28 border-l border-white/5 md:hidden"
            >
              <div className="flex flex-col gap-5">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`text-sm font-bold uppercase tracking-widest transition-all ${location.pathname === link.path ? "text-cyan-400" : "text-slate-200"}`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
