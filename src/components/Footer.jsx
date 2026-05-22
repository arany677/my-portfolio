import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="w-full py-10 border-t border-slate-800 bg-[#0a192f] mt-20">
      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center">
        {/* সোশ্যাল লিঙ্কসমূহ */}
        <div className="flex gap-6 mb-6">
          <a
            href="#"
            className="text-slate-400 hover:text-secondary transition text-sm font-mono"
          >
            GitHub
          </a>
          <a
            href="#"
            className="text-slate-400 hover:text-secondary transition text-sm font-mono"
          >
            LinkedIn
          </a>
          <a
            href="#"
            className="text-slate-400 hover:text-secondary transition text-sm font-mono"
          >
            Facebook
          </a>
        </div>

        {/* কপিরাইট এবং অ্যাডমিন লিঙ্ক */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center text-slate-500 text-[10px] font-mono tracking-widest uppercase">
          <p>© 2024 Built by Arany Hasan</p>

          {/* এই সেই প্রফেশনাল অ্যাডমিন বাটন */}
          <Link
            to="/login"
            className="mt-4 md:mt-0 hover:text-secondary transition-all opacity-30 hover:opacity-100"
          >
            Admin Login
          </Link>
        </div>
      </div>
    </footer>
  );
}
