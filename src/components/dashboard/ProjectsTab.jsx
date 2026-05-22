import { useState } from "react";
import { db } from "../../firebase";
import { collection, addDoc, deleteDoc, doc } from "firebase/firestore";
// Lucide থেকে Github সরিয়ে শুধু Plus এবং Trash2 রাখুন
import { Trash2, Plus } from "lucide-react";
// Github এবং অন্যান্য সোশ্যাল আইকনের জন্য React Icons ব্যবহার করুন
import { FaGithub, FaExternalLinkAlt, FaFolderOpen } from "react-icons/fa";

export default function ProjectsTab({ projects, fetchAllData }) {
  const [form, setForm] = useState({
    title: "",
    desc: "",
    tech: "",
    liveLink: "",
    githubLink: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const techArray = form.tech.split(",").map((t) => t.trim());
    await addDoc(collection(db, "projects"), {
      ...form,
      tech: techArray,
      createdAt: new Date(),
    });
    setForm({ title: "", desc: "", tech: "", liveLink: "", githubLink: "" });
    fetchAllData();
    alert("🚀 Project Added Successfully!");
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this project?")) {
      await deleteDoc(doc(db, "projects", id));
      fetchAllData();
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in pb-20">
      <h2 className="text-4xl font-black text-white uppercase tracking-tighter">
        Project Manager
      </h2>

      {/* Form Section */}
      <form
        onSubmit={handleSubmit}
        className="grid md:grid-cols-2 gap-6 bg-[#1E293B] p-8 rounded-3xl border border-white/5 shadow-2xl"
      >
        <div className="md:col-span-2">
          <Input
            label="Project Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </div>
        <div className="md:col-span-2">
          <label className="text-[10px] font-black uppercase text-cyan-400 tracking-widest ml-1">
            Description
          </label>
          <textarea
            className="w-full bg-[#0F172A] border border-slate-700 p-4 rounded-xl text-white outline-none mt-2 focus:border-cyan-400 h-32 transition-all"
            value={form.desc}
            onChange={(e) => setForm({ ...form, desc: e.target.value })}
            required
          />
        </div>
        <Input
          label="Tech Stack (comma separated)"
          value={form.tech}
          onChange={(e) => setForm({ ...form, tech: e.target.value })}
        />
        <Input
          label="GitHub Repo Link"
          value={form.githubLink}
          onChange={(e) => setForm({ ...form, githubLink: e.target.value })}
        />
        <div className="md:col-span-2">
          <Input
            label="Live Demo URL"
            value={form.liveLink}
            onChange={(e) => setForm({ ...form, liveLink: e.target.value })}
          />
        </div>
        <button className="md:col-span-2 bg-cyan-400 text-[#0F172A] font-black py-4 rounded-2xl hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all flex items-center justify-center gap-3 uppercase tracking-widest">
          <Plus size={20} /> Add New Project
        </button>
      </form>

      {/* List Section */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p) => (
          <div
            key={p.id}
            className="bg-[#1E293B] p-6 rounded-2xl border border-white/5 flex flex-col justify-between group hover:border-cyan-400/30 transition-all"
          >
            <div className="flex justify-between items-start mb-4">
              <FaFolderOpen className="text-cyan-400 text-3xl" />
              <div className="flex gap-3">
                {p.githubLink && (
                  <FaGithub className="text-slate-500" size={18} />
                )}
                <button
                  onClick={() => handleDelete(p.id)}
                  className="text-red-500 hover:bg-red-500/10 p-2 rounded-lg transition-all"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-white text-lg mb-2">{p.title}</h4>
              <div className="flex gap-2 flex-wrap">
                {p.tech?.map((t) => (
                  <span
                    key={t}
                    className="text-[9px] font-bold text-cyan-400 bg-cyan-400/10 px-2 py-1 rounded uppercase"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Reusable Input Component
function Input({ label, value, onChange }) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-[10px] font-black uppercase text-cyan-400 tracking-widest ml-1">
        {label}
      </label>
      <input
        className="bg-[#0F172A] border border-slate-700 p-4 rounded-xl text-white outline-none focus:border-cyan-400 font-medium transition-all"
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
}
