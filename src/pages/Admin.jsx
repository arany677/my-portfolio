import { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  doc,
  getDoc,
  updateDoc,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";

export default function Admin() {
  const [profile, setProfile] = useState({ name: "", title: "", about: "" });
  const [newProject, setNewProject] = useState({
    title: "",
    desc: "",
    tech: "",
  });
  const [status, setStatus] = useState("");

  // ১. প্রোফাইল ডাটা নিয়ে আসা
  useEffect(() => {
    const fetchProfile = async () => {
      const docRef = doc(db, "portfolio", "content");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) setProfile(docSnap.data());
    };
    fetchProfile();
  }, []);

  // ২. প্রোফাইল আপডেট করা
  const updateProfile = async (e) => {
    e.preventDefault();
    setStatus("Updating Profile...");
    const docRef = doc(db, "portfolio", "content");
    await updateDoc(docRef, profile);
    setStatus("Profile Updated!");
  };

  // ৩. নতুন প্রজেক্ট অ্যাড করা
  const addProject = async (e) => {
    e.preventDefault();
    setStatus("Adding Project...");
    const techArray = newProject.tech.split(",").map((item) => item.trim()); // comma separated tech to array
    await addDoc(collection(db, "projects"), {
      ...newProject,
      tech: techArray,
      createdAt: new Date(),
    });
    setNewProject({ title: "", desc: "", tech: "" });
    setStatus("Project Added Successfully!");
  };

  return (
    <div className="pt-24 pb-12 px-6 max-w-4xl mx-auto text-slate-300">
      <h1 className="text-3xl font-bold text-secondary mb-10">
        Admin Dashboard
      </h1>

      <div className="grid md:grid-cols-2 gap-10">
        {/* প্রোফাইল আপডেট ফর্ম */}
        <form
          onSubmit={updateProfile}
          className="bg-[#112240] p-6 rounded-lg shadow-xl"
        >
          <h2 className="text-xl font-bold mb-4 text-white">
            Edit Profile Info
          </h2>
          <div className="flex flex-col gap-4">
            <input
              className="bg-[#0a192f] p-3 rounded border border-slate-700"
              placeholder="Name"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            />
            <input
              className="bg-[#0a192f] p-3 rounded border border-slate-700"
              placeholder="Title"
              value={profile.title}
              onChange={(e) =>
                setProfile({ ...profile, title: e.target.value })
              }
            />
            <textarea
              className="bg-[#0a192f] p-3 rounded border border-slate-700 h-32"
              placeholder="About"
              value={profile.about}
              onChange={(e) =>
                setProfile({ ...profile, about: e.target.value })
              }
            />
            <button className="bg-secondary text-primary font-bold py-2 rounded">
              Update Profile
            </button>
          </div>
        </form>

        {/* নতুন প্রজেক্ট অ্যাড ফর্ম */}
        <form
          onSubmit={addProject}
          className="bg-[#112240] p-6 rounded-lg shadow-xl"
        >
          <h2 className="text-xl font-bold mb-4 text-white">Add New Project</h2>
          <div className="flex flex-col gap-4">
            <input
              className="bg-[#0a192f] p-3 rounded border border-slate-700"
              placeholder="Project Title"
              value={newProject.title}
              onChange={(e) =>
                setNewProject({ ...newProject, title: e.target.value })
              }
              required
            />
            <textarea
              className="bg-[#0a192f] p-3 rounded border border-slate-700 h-24"
              placeholder="Description"
              value={newProject.desc}
              onChange={(e) =>
                setNewProject({ ...newProject, desc: e.target.value })
              }
              required
            />
            <input
              className="bg-[#0a192f] p-3 rounded border border-slate-700"
              placeholder="Tech (e.g. React, Tailwind, Firebase)"
              value={newProject.tech}
              onChange={(e) =>
                setNewProject({ ...newProject, tech: e.target.value })
              }
              required
            />
            <button className="bg-secondary text-primary font-bold py-2 rounded">
              Add Project
            </button>
          </div>
        </form>
      </div>

      {status && (
        <p className="mt-6 text-center text-secondary font-mono">{status}</p>
      )}
    </div>
  );
}
