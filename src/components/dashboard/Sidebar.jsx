import { useEffect, useState } from "react";
import { db, auth } from "../../firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import {
  User,
  Info,
  Briefcase,
  Code,
  FileText,
  MessageSquare,
  LogOut,
  Home,
  LayoutDashboard,
} from "lucide-react";

export default function Sidebar({
  activeTab,
  setActiveTab,
  handleLogout,
  navigate,
}) {
  const [unreadCount, setUnreadCount] = useState(0);

  // ১. রিয়েল-টাইম আনরিড মেসেজ চেক করা (নোটিফিকেশন ব্যাজের জন্য)
  useEffect(() => {
    const q = query(collection(db, "messages"), where("isRead", "==", false));

    // onSnapshot ব্যবহার করায় ডাটাবেসে মেসেজ আসার সাথে সাথে সংখ্যা আপডেট হবে
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setUnreadCount(snapshot.size);
    });

    return () => unsubscribe();
  }, []);

  // মেনু আইটেমগুলোর লিস্ট
  const menuItems = [
    { id: "general", label: "General", icon: <User size={20} /> },
    { id: "about", label: "About Me", icon: <Info size={20} /> },
    { id: "projects", label: "Projects", icon: <Briefcase size={20} /> },
    { id: "skills", label: "Skills", icon: <Code size={20} /> },
    { id: "blogs", label: "Blogs", icon: <FileText size={20} /> },
    { id: "inquiries", label: "Inquiries", icon: <MessageSquare size={20} /> },
  ];

  return (
    <aside className="w-64 bg-[#1E293B] border-r border-slate-700 flex flex-col fixed h-full z-50 shadow-2xl">
      {/* লোগো অংশ */}
      <div className="p-8 flex items-center gap-3 border-b border-slate-700 bg-[#1e293b]">
        <div className="bg-cyan-400 p-2 rounded-lg">
          <LayoutDashboard size={20} className="text-[#0F172A]" />
        </div>
        <span className="text-xl font-black text-white tracking-tighter uppercase italic">
          Admin<span className="text-cyan-400">.</span>
        </span>
      </div>

      {/* নেভিগেশন লিঙ্কসমূহ */}
      <nav className="flex-grow p-4 space-y-2 mt-4 overflow-y-auto custom-scrollbar">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`relative w-full flex items-center gap-4 p-4 rounded-xl font-bold transition-all duration-300 group ${
              activeTab === item.id
                ? "bg-cyan-400 text-[#0F172A] shadow-[0_0_20px_rgba(34,211,238,0.2)]"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            {item.icon}
            <span className="text-sm tracking-wide">{item.label}</span>

            {/* ইনকোয়ারি ট্যাবে নোটিফিকেশন ব্যাজ দেখানো */}
            {item.id === "inquiries" && unreadCount > 0 && (
              <span className="absolute right-4 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full animate-bounce shadow-lg border-2 border-[#1E293B]">
                {unreadCount}
              </span>
            )}
          </button>
        ))}

        {/* সাইট ভিজিট করার বাটন */}
        <div className="pt-4 mt-6 border-t border-slate-700">
          <button
            onClick={() => navigate("/")}
            className="w-full flex items-center gap-3 p-3 rounded-xl text-slate-500 hover:text-cyan-400 transition-all font-mono text-[10px] uppercase tracking-[3px]"
          >
            <Home size={16} /> View Website
          </button>
        </div>
      </nav>

      {/* লগআউট বাটন (একদম নিচে ফিক্সড) */}
      <div className="p-4 border-t border-slate-700 bg-[#1E293B]">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-3 p-4 bg-red-600/10 text-red-500 font-black rounded-xl hover:bg-red-600 hover:text-white transition-all duration-300 uppercase text-xs tracking-widest border border-red-500/20"
        >
          <LogOut size={18} /> Logout Now
        </button>
      </div>
    </aside>
  );
}
