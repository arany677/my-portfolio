import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  limit,
  query,
} from "firebase/firestore";
import Hero from "../components/Hero";
import ProjectsSection from "../components/Projects"; // নিশ্চিত করুন এটি সঠিক পাথ

export default function Home() {
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // প্রোফাইল আনা
      const profSnap = await getDoc(doc(db, "portfolio", "content"));
      if (profSnap.exists()) setProfile(profSnap.data());

      // লেটেস্ট ৩টি প্রোজেক্ট আনা
      const q = query(collection(db, "projects"), limit(3));
      const projSnap = await getDocs(q);
      setProjects(projSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };
    fetchData();
  }, []);

  return (
    <div className="bg-dev-bg">
      <Hero data={profile} />
      {/* প্রোজেক্ট ডাটা কম্পোনেন্টে পাস করা */}
      <ProjectsSection projects={projects} />
    </div>
  );
}
