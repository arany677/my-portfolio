import {
  User,
  Info,
  Briefcase,
  Code,
  FileText,
  MessageSquare,
  LogOut,
  Home,
  X,
} from "lucide-react";

export default function Sidebar({
  activeTab,
  setActiveTab,
  handleLogout,
  navigate,
  isOpen,
  setIsOpen,
}) {
  const menuItems = [
    { id: "general", label: "General", icon: <User size={18} /> },
    { id: "about", label: "About Me", icon: <Info size={18} /> },
    { id: "projects", label: "Projects", icon: <Briefcase size={18} /> },
    { id: "skills", label: "Skills", icon: <Code size={18} /> },
    { id: "blogs", label: "Blogs", icon: <FileText size={18} /> },
    { id: "inquiries", label: "Inquiries", icon: <MessageSquare size={18} /> },
    { id: "resume", label: "Resume", icon: <FileText size={20} /> },
  ];

  return (
    <>
      {/* মোবাইল ব্যাকড্রপ (মেনু খুললে পেছনের অংশ কালো হবে) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-[50] md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* সাইডবার বডি */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-[#1E293B] border-r border-white/5 z-[60] flex flex-col transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* হেডার */}
        <div className="p-6 border-b border-white/5 flex justify-between items-center">
          <span className="text-xl font-black text-cyan-400 italic">
            ADMIN.
          </span>
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden text-slate-400"
          >
            <X size={24} />
          </button>
        </div>

        {/* নেভিগেশন */}
        <nav className="flex-grow p-4 space-y-1 overflow-y-auto pt-6">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl font-bold transition-all ${activeTab === item.id ? "bg-cyan-400 text-[#0F172A]" : "text-slate-400 hover:text-white hover:bg-slate-800"}`}
            >
              {item.icon} <span className="text-sm">{item.label}</span>
            </button>
          ))}

          <button
            onClick={() => navigate("/")}
            className="w-full flex items-center gap-3 p-4 rounded-xl text-slate-500 hover:text-white mt-4 border-t border-white/5 pt-6 font-mono text-[10px] uppercase"
          >
            <Home size={16} /> View Website
          </button>
        </nav>

        {/* লগআউট */}
        <div className="p-4 border-t border-white/5">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-3 p-4 bg-red-600/10 text-red-500 font-bold rounded-2xl hover:bg-red-600 hover:text-white transition-all text-xs"
          >
            <LogOut size={18} /> LOGOUT NOW
          </button>
        </div>
      </aside>
    </>
  );
}
