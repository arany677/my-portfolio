import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { FileText, Upload, Trash2, Loader2 } from "lucide-react";

export default function ResumeTab({ profile, fetchAllData }) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || file.type !== "application/pdf")
      return alert("Upload a PDF file!");

    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    setUploading(true);
    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        { method: "POST", body: formData },
      );
      const data = await res.json();
      await updateDoc(doc(db, "portfolio", "content"), {
        resumeLink: data.secure_url,
      });
      alert("✅ Uploaded Successfully!");
      fetchAllData();
    } catch (err) {
      alert("❌ Upload Failed!");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async () => {
    if (confirm("Remove your current resume?")) {
      await updateDoc(doc(db, "portfolio", "content"), { resumeLink: "" });
      alert("🗑️ Removed!");
      fetchAllData();
    }
  };

  return (
    <div className="max-w-4xl space-y-10 animate-in fade-in pb-20">
      <h2 className="text-4xl font-black uppercase text-white italic tracking-tighter">
        Resume Manager
      </h2>
      <div className="bg-[#1E293B] p-8 md:p-12 rounded-3xl border border-white/5 shadow-2xl">
        {!profile.resumeLink ? (
          <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-700 bg-[#0F172A] p-16 rounded-3xl cursor-pointer hover:border-cyan-400 transition-all group">
            {uploading ? (
              <Loader2 className="animate-spin text-cyan-400" size={48} />
            ) : (
              <Upload
                className="text-slate-500 group-hover:text-cyan-400 transition-colors"
                size={48}
              />
            )}
            <span className="mt-6 text-slate-400 font-bold uppercase text-xs tracking-[4px]">
              Upload Professional CV
            </span>
            <input
              type="file"
              className="hidden"
              accept=".pdf"
              onChange={handleUpload}
            />
          </label>
        ) : (
          <div className="space-y-6">
            <div className="bg-[#0F172A] p-6 rounded-2xl border border-cyan-400/20 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-cyan-400/10 rounded-2xl flex items-center justify-center text-cyan-400 shadow-lg">
                  <FileText size={28} />
                </div>
                <div>
                  <p className="text-white font-black uppercase text-sm tracking-widest">
                    Resume is Live
                  </p>
                  <p className="text-slate-500 text-[10px] font-mono truncate max-w-[200px]">
                    {profile.resumeLink}
                  </p>
                </div>
              </div>
              <button
                onClick={handleDelete}
                className="w-full md:w-auto bg-red-500/10 text-red-500 px-8 py-4 rounded-xl hover:bg-red-500 hover:text-white transition-all font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2"
              >
                <Trash2 size={18} /> Delete File
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
