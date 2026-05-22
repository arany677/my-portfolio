import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { motion } from "framer-motion";

export default function Skills() {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchSkills = async () => {
      const snap = await getDocs(collection(db, "skills"));
      setSkills(snap.docs.map((doc) => doc.data().name));
    };
    fetchSkills();
  }, []);

  return (
    <div className="pt-32 px-6 max-w-6xl mx-auto min-h-screen bg-dev-bg">
      <h1 className="text-4xl font-bold text-white mb-4">Technical Skills</h1>
      <p className="text-accent font-mono mb-12">
        / The technologies I work with
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {skills.map((skill, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05, borderColor: "#22D3EE" }}
            className="p-8 bg-dev-card border border-white/10 rounded-xl text-center shadow-lg transition-all"
          >
            {/* এখানে text-white এবং font-bold যোগ করা হয়েছে */}
            <p className="text-white font-bold text-lg tracking-wide uppercase">
              {skill}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
