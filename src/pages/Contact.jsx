import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import emailjs from "@emailjs/browser"; 

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("");

 const handleSubmit = async (e) => {
   e.preventDefault();
   setStatus("Sending...");

   try {
     // ১. ফায়ারবেসে মেসেজ সেভ করা (isRead: false সহ)
     await addDoc(collection(db, "messages"), {
       ...formData,
       isRead: false, // নতুন মেসেজ আনরিড থাকবে
       createdAt: serverTimestamp(),
     });

     // ২. আপনাকে ইমেইল নোটিফিকেশন পাঠানো (EmailJS)
     emailjs.send(
       "service_9wln0ip",
       "template_bntltxa",
       formData,
       "GphiZE58HWGSfflgZ",
     );

     setFormData({ name: "", email: "", subject: "", message: "" });
     setStatus("✅ Message sent! I will get back to you soon.");
   } catch (error) {
     setStatus("❌ Error sending message.");
   }
 };

  return (
    <div className="pt-32 pb-20 px-6 max-w-6xl mx-auto min-h-screen text-white">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-5xl font-black mb-16 italic"
      >
        Get In <span className="text-cyan-400">Touch.</span>
      </motion.h1>

      <div className="grid md:grid-cols-2 gap-16">
        {/* Contact Info */}
        <div className="space-y-10">
          <p className="text-slate-400 text-lg leading-relaxed">
            I’m always open to discussing new projects, creative ideas or
            opportunities to be part of your visions.
          </p>

          <div className="space-y-6">
            <ContactInfo
              icon={<Mail className="text-cyan-400" />}
              label="Email Me"
              text="arany@example.com"
            />
            <ContactInfo
              icon={<Phone className="text-cyan-400" />}
              label="Call Me"
              text="+88017XXXXXXXX"
            />
            <ContactInfo
              icon={<MapPin className="text-cyan-400" />}
              label="Location"
              text="Dhaka, Bangladesh"
            />
          </div>
        </div>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-[#1E293B] p-8 rounded-3xl border border-white/5 shadow-2xl space-y-5"
        >
          <div className="grid md:grid-cols-2 gap-5">
            <input
              className="bg-[#0F172A] border border-slate-700 p-4 rounded-xl text-white outline-none focus:border-cyan-400 w-full"
              placeholder="Name"
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <input
              className="bg-[#0F172A] border border-slate-700 p-4 rounded-xl text-white outline-none focus:border-cyan-400 w-full"
              placeholder="Email"
              type="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <input
            className="bg-[#0F172A] border border-slate-700 p-4 rounded-xl text-white outline-none focus:border-cyan-400 w-full"
            placeholder="Subject"
            type="text"
            required
            value={formData.subject}
            onChange={(e) =>
              setFormData({ ...formData, subject: e.target.value })
            }
          />
          <textarea
            className="bg-[#0F172A] border border-slate-700 p-4 rounded-xl text-white outline-none focus:border-cyan-400 w-full h-40"
            placeholder="Your Message"
            required
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
          />

          <button className="w-full bg-cyan-400 text-[#0F172A] font-black py-4 rounded-xl flex items-center justify-center gap-3 uppercase tracking-widest hover:opacity-90">
            Send Message <Send size={18} />
          </button>
          {status && (
            <p className="text-center font-mono text-sm text-cyan-400">
              {status}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

function ContactInfo({ icon, label, text }) {
  return (
    <div className="flex items-center gap-5">
      <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
        {icon}
      </div>
      <div>
        <p className="text-xs font-black uppercase text-slate-500 tracking-widest">
          {label}
        </p>
        <p className="text-white font-bold">{text}</p>
      </div>
    </div>
  );
}
