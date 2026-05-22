import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // মেনু খুললে পেজ স্ক্রল বন্ধ হবে
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
    <nav className="fixed top-0 w-full z-[999] bg-[#0F172A] border-b border-white/5 h-20 flex items-center">
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
        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-xs font-bold uppercase tracking-widest transition-all hover:text-cyan-400 ${location.pathname === link.path ? "text-cyan-400" : "text-slate-400"}`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Toggle Button */}
        <button
          className="md:hidden text-cyan-400 z-[1001] p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Mobile Sidebar (Solid & Clean) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-y-0 right-0 w-[280px] bg-[#1E293B] z-[1000] shadow-2xl flex flex-col p-10 pt-24 border-l border-white/10 md:hidden"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-xl font-bold uppercase tracking-tight ${location.pathname === link.path ? "text-cyan-400" : "text-white"}`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="mt-auto border-t border-white/5 pt-6 text-slate-500 font-mono text-[10px] uppercase tracking-widest text-center">
              © 2024 ARANY DEV
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
