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

// Components
import Sidebar from "../components/dashboard/Sidebar";
import GeneralTab from "../components/dashboard/GeneralTab";
import ProjectsTab from "../components/dashboard/ProjectsTab";
import SkillsTab from "../components/dashboard/SkillsTab";
import BlogsTab from "../components/dashboard/BlogsTab";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("general");
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
  });
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    const profSnap = await getDoc(doc(db, "portfolio", "content"));
    if (profSnap.exists()) setProfile(profSnap.data());

    const projSnap = await getDocs(collection(db, "projects"));
    setProjects(projSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));

    const skillSnap = await getDocs(collection(db, "skills"));
    setSkills(skillSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };

  const handleUpdate = async (updatedData) => {
    await updateDoc(doc(db, "portfolio", "content"), updatedData);
    setProfile(updatedData);
    alert("✅ Portfolio Updated Successfully!");
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const cloudName = "dshvhd37f"; // Replace this
    const uploadPreset = "aranyhasan"; // Replace this
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
      setProfile({ ...profile, photoURL: data.secure_url });
      alert("✅ Photo Uploaded! Save to confirm.");
    } catch (err) {
      alert("❌ Upload Failed");
    } finally {
      setUploading(false);
    }
  };

  const handleLogout = async () => {
    if (window.confirm("Logout now?")) {
      await signOut(auth);
      navigate("/");
    }
  };

  return (
    <div className="flex min-h-screen bg-[#0F172A] text-white">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        handleLogout={handleLogout}
        navigate={navigate}
      />

      <main className="ml-64 flex-grow p-12 overflow-y-auto h-screen scroll-smooth">
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
      </main>
    </div>
  );
}
