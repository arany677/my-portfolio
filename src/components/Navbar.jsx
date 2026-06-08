import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user] = useAuthState(auth);
  const location = useLocation();

  const links = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Projects", path: "/projects" },
    { name: "Skills", path: "/skills" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="fixed top-0 w-full z-[999] bg-[#0F172A] border-b border-white/5 h-20 flex items-center shadow-2xl">
      <div className="max-w-7xl mx-auto px-6 w-full flex justify-between items-center">
        <Link to="/" className="text-white font-black text-xl tracking-tighter">
          ARANY<span className="text-cyan-400">.</span>dev
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center text-[11px] font-bold uppercase tracking-widest">
          {links.map((l) => (
            <Link
              key={l.path}
              to={l.path}
              className={`${location.pathname === l.path ? "text-cyan-400" : "text-slate-400"} hover:text-cyan-400 transition`}
            >
              {l.name}
            </Link>
          ))}
          <Link
            to="/resume"
            className="ml-2 px-4 py-2 border border-cyan-400 text-cyan-400 rounded-lg hover:bg-cyan-400 hover:text-primary transition-all"
          >
            Resume
          </Link>
          {user && (
            <Link
              to="/dashboard"
              className="bg-cyan-400 text-[#0F172A] px-4 py-2 rounded-lg"
            >
              Dashboard
            </Link>
          )}
        </div>

        <button
          className="md:hidden text-cyan-400"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#1E293B] p-8 flex flex-col gap-6 absolute top-20 left-0 w-full shadow-2xl animate-in slide-in-from-top-5">
          {links.map((l) => (
            <Link
              key={l.path}
              to={l.path}
              onClick={() => setIsOpen(false)}
              className="text-xl font-bold text-white border-b border-white/5 pb-2 uppercase tracking-tighter"
            >
              {l.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
