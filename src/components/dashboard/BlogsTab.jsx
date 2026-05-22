import { useState } from "react";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";

export default function BlogsTab({ fetchAllData }) {
  const [blog, setBlog] = useState({ title: "", content: "" });

  const handlePublish = async () => {
    if (!blog.title || !blog.content) return;
    await addDoc(collection(db, "blogs"), {
      ...blog,
      date: new Date().toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
    });
    setBlog({ title: "", content: "" });
    alert("📝 Blog Published!");
  };

  return (
    <div className="max-w-4xl space-y-10 animate-in fade-in">
      <h2 className="text-4xl font-black">Write a Journal</h2>
      <div className="bg-[#1E293B] p-8 rounded-3xl border border-slate-700 space-y-6 shadow-xl">
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-black uppercase text-cyan-400 tracking-widest">
            Article Title
          </label>
          <input
            className="bg-[#0F172A] border border-slate-700 p-4 rounded-xl text-white outline-none focus:border-cyan-400"
            value={blog.title}
            onChange={(e) => setBlog({ ...blog, title: e.target.value })}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-black uppercase text-cyan-400 tracking-widest">
            Content
          </label>
          <textarea
            className="w-full bg-[#0F172A] border border-slate-700 p-6 rounded-2xl text-white outline-none focus:border-cyan-400 h-96 leading-relaxed"
            value={blog.content}
            onChange={(e) => setBlog({ ...blog, content: e.target.value })}
            placeholder="What's on your mind today?"
          />
        </div>
        <button
          onClick={handlePublish}
          className="bg-cyan-400 text-[#0F172A] font-black py-4 px-12 rounded-xl uppercase tracking-widest"
        >
          Publish Article
        </button>
      </div>
    </div>
  );
}
