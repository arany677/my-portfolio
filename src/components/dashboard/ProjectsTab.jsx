import { useState } from "react";
import { db } from "../../firebase";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { Trash2, Plus, Star } from "lucide-react";

export default function ProjectsTab({ projects, fetchAllData }) {
  const [form, setForm] = useState({
    title: "",
    desc: "",
    tech: "",
    liveLink: "",
    githubLink: "",
  });

  const handleAdd = async (e) => {
    e.preventDefault();
    const techArray = form.tech.split(",").map((t) => t.trim());
    await addDoc(collection(db, "projects"), {
      ...form,
      tech: techArray,
      isFeatured: false,
      createdAt: new Date(),
    });
    setForm({ title: "", desc: "", tech: "", liveLink: "", githubLink: "" });
    fetchAllData();
  };

  const toggleFeature = async (id, currentStatus) => {
    await updateDoc(doc(db, "projects", id), { isFeatured: !currentStatus });
    fetchAllData();
  };

  return (
    <div className="space-y-10">
      <h2 className="text-3xl font-bold">Add Project</h2>
      <form
        onSubmit={handleAdd}
        className="grid md:grid-cols-2 gap-4 bg-[#1E293B] p-6 rounded-2xl border border-white/5"
      >
        <input
          className="bg-[#0F172A] p-3 rounded border border-slate-700 md:col-span-2"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <textarea
          className="bg-[#0F172A] p-3 rounded border border-slate-700 md:col-span-2 h-24"
          placeholder="Description"
          value={form.desc}
          onChange={(e) => setForm({ ...form, desc: e.target.value })}
          required
        />
        <input
          className="bg-[#0F172A] p-3 rounded border border-slate-700"
          placeholder="Tech (comma separated)"
          value={form.tech}
          onChange={(e) => setForm({ ...form, tech: e.target.value })}
        />
        <button className="bg-cyan-400 text-primary font-black py-3 rounded-xl md:col-span-2">
          ADD PROJECT
        </button>
      </form>

      <div className="grid gap-4">
        {projects.map((p) => (
          <div
            key={p.id}
            className="bg-[#1E293B] p-4 rounded-xl border border-white/5 flex justify-between items-center"
          >
            <div>
              <h4 className="font-bold text-white">{p.title}</h4>
              <p className="text-[10px] text-slate-500">
                {p.isFeatured ? "Show on Home Page" : "Not on Home Page"}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => toggleFeature(p.id, p.isFeatured)}
                className={`p-2 rounded-lg ${p.isFeatured ? "bg-cyan-400 text-primary" : "bg-slate-700 text-white"}`}
              >
                <Star size={18} fill={p.isFeatured ? "currentColor" : "none"} />
              </button>
              <button
                onClick={() =>
                  deleteDoc(doc(db, "projects", p.id)).then(fetchAllData)
                }
                className="p-2 bg-red-500/10 text-red-500 rounded-lg"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
