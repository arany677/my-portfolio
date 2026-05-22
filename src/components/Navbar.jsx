import { Link, useLocation } from "react-router-dom";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Navbar() {
  const [user] = useAuthState(auth);
  const location = useLocation();

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#0F172A]/80 backdrop-blur-lg border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-white font-bold text-xl tracking-tight">
          ARANY<span className="text-accent">.</span>dev
        </Link>

        <div className="hidden md:flex gap-8 items-center text-sm font-bold">
          <Link to="/" className="hover:text-accent text-white">
            Home
          </Link>
          <Link to="/about" className="hover:text-accent text-white">
            About
          </Link>
          <Link to="/projects" className="hover:text-accent text-white">
            Projects
          </Link>
          <Link to="/skills" className="hover:text-accent text-white">
            Skills
          </Link>
          <Link to="/blog" className="hover:text-accent text-white">
            Blog
          </Link>
          <Link to="/contact" className="hover:text-accent text-white">
            Contact
          </Link>

          {/* যদি এডমিন লগইন থাকে তবেই ড্যাশবোর্ড বাটন দেখাবে */}
          {user && (
            <Link
              to="/dashboard"
              className="bg-accent/10 text-accent px-4 py-2 rounded-lg border border-accent/20"
            >
              Dashboard
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
