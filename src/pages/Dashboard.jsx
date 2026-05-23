import { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import {
  doc,
  getDoc,
  updateDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react"; // ইম্পোর্ট নিশ্চিত করুন

// Components
import Sidebar from "../components/dashboard/Sidebar";
import GeneralTab from "../components/dashboard/GeneralTab";
import ProjectsTab from "../components/dashboard/ProjectsTab";
import SkillsTab from "../components/dashboard/SkillsTab";
import BlogsTab from "../components/dashboard/BlogsTab";
import MessagesTab from "../components/dashboard/MessagesTab";
import ResumeTab from "../components/dashboard/ResumeTab";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("general");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [profile, setProfile] = useState({
    name: "",
    title: "",
    about: "",
    heroSubtitle: "",
    photoURL: "",
    school: "",
    college: "",
    university: "",
    address: "",
    github: "",
    linkedin: "",
    facebook: "",
    resumeLink: "",
  });

  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const fetchAllData = async () => {
    try {
      const profSnap = await getDoc(doc(db, "portfolio", "content"));
      if (profSnap.exists())
        setProfile((prev) => ({ ...prev, ...profSnap.data() }));

      const projSnap = await getDocs(collection(db, "projects"));
      setProjects(projSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));

      const skillSnap = await getDocs(collection(db, "skills"));
      setSkills(skillSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const handleUpdate = async (data) => {
    try {
      await updateDoc(doc(db, "portfolio", "content"), data);
      setProfile(data);
      alert("✅ Updated Successfully!");
      fetchAllData();
    } catch (err) {
      alert("❌ Update Failed!");
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
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
      setProfile((prev) => ({ ...prev, photoURL: data.secure_url }));
      alert("✅ Photo Ready! Click Save to confirm.");
    } catch (err) {
      alert("❌ Upload Failed");
    } finally {
      setUploading(false);
    }
  };

  const handleLogout = async () => {
    if (window.confirm("Logout?")) {
      await signOut(auth);
      navigate("/");
    }
  };

  return (
    <div className="flex min-h-screen bg-[#0F172A] text-white overflow-hidden relative">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setIsSidebarOpen(false);
        }}
        handleLogout={handleLogout}
        navigate={navigate}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />
      <main
        className={`flex-grow md:ml-64 transition-all duration-300 h-screen overflow-y-auto ${isSidebarOpen ? "blur-md md:blur-none" : ""}`}
      >
        <div className="md:hidden flex items-center justify-between p-4 bg-[#1E293B] border-b border-white/5 sticky top-0 z-50">
          <span className="text-cyan-400 font-black italic tracking-tighter uppercase">
            Admin.
          </span>
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 text-cyan-400 bg-cyan-400/10 rounded-lg"
          >
            <Menu size={24} />
          </button>
        </div>

        <div className="p-6 md:p-12 max-w-5xl mx-auto">
          {activeTab === "general" && (
            <GeneralTab
              profile={profile}
              setProfile={setProfile}
              handleUpdate={handleUpdate}
            />
          )}
          {activeTab === "about" && (
            <GeneralTab
              profile={profile}
              setProfile={setProfile}
              handleUpdate={handleUpdate}
              handleImageUpload={handleImageUpload}
              uploading={uploading}
              isAboutPage={true}
            />
          )}
          {activeTab === "projects" && (
            <ProjectsTab projects={projects} fetchAllData={fetchAllData} />
          )}
          {activeTab === "skills" && (
            <SkillsTab skills={skills} fetchAllData={fetchAllData} />
          )}
          {activeTab === "blogs" && <BlogsTab fetchAllData={fetchAllData} />}
          {activeTab === "inquiries" && <MessagesTab />}
          {activeTab === "resume" && (
            <ResumeTab profile={profile} fetchAllData={fetchAllData} />
          )}
        </div>
      </main>
    </div>
  );
}
