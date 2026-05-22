import { useState } from "react";
import { db } from "../../firebase";
import { collection, addDoc, deleteDoc, doc } from "firebase/firestore";
import { Trash2, Plus } from "lucide-react";

export default function SkillsTab({ skills, fetchAllData }) {
  const [name, setName] = useState("");

  const handleAdd = async () => {
    if (!name) return;
    await addDoc(collection(db, "skills"), { name });
    setName("");
    fetchAllData();
  };

  return (
    <div className="max-w-2xl space-y-10 animate-in fade-in">
      <h2 className="text-4xl font-black">Skills & Tech Stack</h2>

      <div className="flex gap-4 bg-[#1E293B] p-6 rounded-3xl border border-slate-700 shadow-xl">
        <input
          className="flex-grow bg-[#0F172A] border border-slate-700 p-4 rounded-xl text-white outline-none focus:border-cyan-400"
          placeholder="e.g. JavaScript"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          onClick={handleAdd}
          className="bg-cyan-400 text-[#0F172A] font-black px-10 rounded-xl hover:opacity-90"
        >
          ADD
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {skills.map((s) => (
          <div
            key={s.id}
            className="bg-[#1E293B] p-4 rounded-xl border border-slate-700 flex justify-between items-center group hover:border-cyan-400/50 transition-all"
          >
            <span className="font-bold text-white uppercase tracking-widest text-xs">
              {s.name}
            </span>
            <button
              onClick={async () => {
                await deleteDoc(doc(db, "skills", s.id));
                fetchAllData();
              }}
              className="text-red-500 opacity-0 group-hover:opacity-100 transition-all"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
