import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        // 'blogs' কালেকশন থেকে লেটেস্ট ব্লগগুলো আগে আনার জন্য কুয়েরি
        const q = query(collection(db, "blogs"), orderBy("date", "desc"));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="pt-32 pb-20 min-h-screen bg-[#0F172A] px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center md:text-left"
        >
          <h1 className="text-5xl font-black text-white mb-4 italic tracking-tighter">
            My <span className="text-cyan-400">Journal.</span>
          </h1>
          <p className="text-slate-400 font-mono">
            / Thoughts, tutorials and my coding journey
          </p>
        </motion.div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-cyan-400 font-mono">Loading articles...</p>
          </div>
        ) : (
          <div className="grid gap-8">
            {blogs.length > 0 ? (
              blogs.map((blog, index) => (
                <motion.article
                  key={blog.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group bg-[#1E293B] p-8 rounded-3xl border border-white/5 hover:border-cyan-400/30 transition-all shadow-xl"
                >
                  <div className="flex items-center gap-3 text-cyan-400 font-mono text-xs mb-4 uppercase tracking-widest">
                    <Calendar size={14} />
                    <span>{blog.date}</span>
                  </div>

                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-cyan-400 transition">
                    {blog.title}
                  </h2>

                  <p className="text-slate-400 text-lg leading-relaxed mb-6 line-clamp-3">
                    {blog.content}
                  </p>

                  <button className="flex items-center gap-2 text-cyan-400 font-bold hover:gap-4 transition-all">
                    Read More <ArrowRight size={18} />
                  </button>
                </motion.article>
              ))
            ) : (
              <div className="text-center py-20 bg-[#1E293B] rounded-3xl border border-dashed border-slate-700">
                <p className="text-slate-500 font-mono italic">
                  No blog posts found. Add some from Dashboard!
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
