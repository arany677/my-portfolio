import { useState } from "react";
import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";

import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // এই লাইনটি ব্রাউজার বন্ধ করলে অটো-লগআউট নিশ্চিত করবে
      await setPersistence(auth, browserSessionPersistence);

      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      alert("Invalid Credentials!");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-[#0F172A] px-6">
      <form
        onSubmit={handleLogin}
        className="bg-[#1E293B] p-10 rounded-3xl border border-white/5 shadow-2xl w-full max-w-md animate-in fade-in zoom-in duration-500"
      >
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-white tracking-tighter uppercase italic">
            Admin <span className="text-cyan-400">Login</span>
          </h2>
          <p className="text-slate-500 text-xs mt-2 font-mono uppercase tracking-widest">
            Authorized Access Only
          </p>
        </div>

        {error && (
          <p className="bg-red-500/10 text-red-500 text-xs p-3 rounded-lg mb-6 text-center font-bold border border-red-500/20">
            {error}
          </p>
        )}

        <div className="space-y-5">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black text-cyan-400 uppercase tracking-widest ml-1">
              Email Address
            </label>
            <input
              className="bg-[#0F172A] border border-slate-700 p-4 rounded-xl text-white outline-none focus:border-cyan-400 transition-all font-medium"
              type="email"
              placeholder="admin@example.com"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black text-cyan-400 uppercase tracking-widest ml-1">
              Secret Password
            </label>
            <input
              className="bg-[#0F172A] border border-slate-700 p-4 rounded-xl text-white outline-none focus:border-cyan-400 transition-all font-medium"
              type="password"
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className="w-full bg-cyan-400 text-[#0F172A] font-black py-4 rounded-xl hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:scale-[1.02] active:scale-95 transition-all mt-4 uppercase tracking-widest">
            Enter Dashboard
          </button>
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/"
            className="text-slate-500 text-[10px] uppercase font-bold hover:text-cyan-400 transition tracking-widest"
          >
            ← Back to Website
          </Link>
        </div>
      </form>
    </div>
  );
}
