import {
  User,
  Info,
  Briefcase,
  Code,
  FileText,
  LogOut,
  Home,
} from "lucide-react";

export default function Sidebar({
  activeTab,
  setActiveTab,
  handleLogout,
  navigate,
}) {
  const menuItems = [
    { id: "general", label: "General", icon: <User size={18} /> },
    { id: "about", label: "About Me", icon: <Info size={18} /> },
    { id: "projects", label: "Projects", icon: <Briefcase size={18} /> },
    { id: "skills", label: "Skills", icon: <Code size={18} /> },
    { id: "blogs", label: "Blogs", icon: <FileText size={18} /> },
  ];

  return (
    <aside className="w-64 bg-[#1E293B] border-r border-slate-700 flex flex-col fixed h-full z-50 shadow-2xl">
      <div className="p-8 text-2xl font-black text-cyan-400 italic border-b border-slate-700 uppercase tracking-tighter">
        Admin.
      </div>
      <nav className="flex-grow p-4 space-y-2 mt-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-4 p-4 rounded-xl font-bold transition-all ${activeTab === item.id ? "bg-cyan-400 text-[#0F172A]" : "text-slate-400 hover:text-white hover:bg-slate-800"}`}
          >
            {item.icon} {item.label}
          </button>
        ))}
        <button
          onClick={() => navigate("/")}
          className="w-full flex items-center gap-3 p-3 rounded-xl text-slate-500 hover:text-white mt-6 border-t border-slate-700 pt-6 font-mono text-xs uppercase tracking-widest"
        >
          <Home size={16} /> View Site
        </button>
      </nav>
      <div className="p-4 border-t border-slate-700">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-3 p-4 bg-red-600/10 text-red-500 font-black rounded-xl hover:bg-red-600 hover:text-white transition-all uppercase text-xs"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>
    </aside>
  );
}
