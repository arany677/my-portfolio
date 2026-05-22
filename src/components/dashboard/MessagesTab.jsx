import { useEffect, useState } from "react";
import { db } from "../../firebase";
import {
  collection,
  getDocs,
  query,
  orderBy,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import {
  Trash2,
  Clock,
  User,
  MailOpen,
  Send,
  CheckCheck,
  X,
  RefreshCcw,
} from "lucide-react";
import emailjs from "@emailjs/browser";
import { motion, AnimatePresence } from "framer-motion";

export default function MessagesTab() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [isSending, setIsSending] = useState(false);

  // ১. ডাটা লোড করা
  const fetchMessages = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
      const snap = await getDocs(q);
      const data = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMessages(data);
    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // ২. রিপ্লাই পাঠানো
 const sendReply = async (m) => {
   const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
   const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
   const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

   const templateParams = {
     to_name: m.name,
     to_email: m.email,
     reply_message: replyText,
     original_subject: m.subject,
   };

   try {
     await emailjs.send(serviceID, templateID, templateParams, publicKey);

     // রিপ্লাই পাঠানোর পর মেসেজটিকে 'Read' হিসেবে আপডেট করা
     await updateDoc(doc(db, "messages", m.id), { isRead: true });

     alert("✅ Reply sent to " + m.email);
     setReplyingTo(null);
     setReplyText("");
     fetchMessages();
   } catch (err) {
     console.error("EmailJS Error:", err);
     alert("❌ Sending Failed: " + (err.text || "Check console for details"));
   } finally {
     setIsSending(false);
   }
 };

  // ৩. ডিলিট করা
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      await deleteDoc(doc(db, "messages", id));
      fetchMessages();
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in pb-20">
      <div className="flex justify-between items-center">
        <h2 className="text-4xl font-black uppercase text-white tracking-tighter italic">
          Visitor <span className="text-cyan-400">Inquiries</span>
        </h2>
        <button
          onClick={fetchMessages}
          className="p-2 text-cyan-400 hover:bg-cyan-400/10 rounded-full transition-all"
          title="Refresh List"
        >
          <RefreshCcw size={20} className={loading ? "animate-spin" : ""} />
        </button>
      </div>

      <div className="grid gap-6">
        <AnimatePresence>
          {messages.length > 0 ? (
            messages.map((m) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                key={m.id}
                className={`bg-[#1E293B] p-6 rounded-3xl border transition-all duration-500 ${
                  m.isRead
                    ? "border-white/5 opacity-60"
                    : "border-cyan-400/30 shadow-[0_0_30px_rgba(34,211,238,0.05)]"
                }`}
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="flex gap-4 items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${m.isRead ? "bg-slate-800 text-slate-500" : "bg-cyan-400/10 text-cyan-400"}`}
                    >
                      <User size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-lg">{m.name}</h4>
                      <p className="text-slate-400 text-xs font-mono">
                        {m.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-500 font-mono italic">
                      {m.createdAt?.toDate().toLocaleDateString()}
                    </span>
                    <button
                      onClick={() => handleDelete(m.id)}
                      className="text-red-500/50 hover:text-red-500 p-2 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  <p className="text-cyan-400 font-black text-[10px] uppercase tracking-[2px] flex items-center gap-2">
                    <MailOpen size={12} /> {m.subject}
                  </p>
                  <div className="bg-[#0F172A] p-5 rounded-2xl border border-white/5">
                    <p className="text-slate-300 leading-relaxed italic">
                      "{m.message}"
                    </p>
                  </div>
                </div>

                {/* Reply Form */}
                {replyingTo === m.id ? (
                  <div className="mt-4 space-y-4 animate-in slide-in-from-top-2 duration-300">
                    <textarea
                      className="w-full bg-[#0F172A] border border-cyan-400/30 p-5 rounded-2xl text-white outline-none focus:border-cyan-400 h-40 transition-all text-sm leading-relaxed"
                      placeholder="Type your professional reply..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                    />
                    <div className="flex gap-3">
                      <button
                        disabled={isSending}
                        onClick={() => sendReply(m)}
                        className="flex items-center gap-2 bg-cyan-400 text-[#0F172A] px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:shadow-[0_0_15px_rgba(34,211,238,0.4)] disabled:opacity-50 transition-all"
                      >
                        {isSending ? (
                          "Sending..."
                        ) : (
                          <>
                            <Send size={14} /> Send Email
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => {
                          setReplyingTo(null);
                          setReplyText("");
                        }}
                        className="text-slate-500 hover:text-white px-4 py-3 text-xs font-bold uppercase transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setReplyingTo(m.id)}
                      className="bg-cyan-400/10 text-cyan-400 border border-cyan-400/20 px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-cyan-400 hover:text-[#0F172A] transition-all"
                    >
                      Reply Now
                    </button>
                    {m.isRead && (
                      <span className="text-[10px] text-slate-600 font-bold uppercase tracking-widest flex items-center gap-1">
                        <CheckCheck size={12} /> Replied
                      </span>
                    )}
                  </div>
                )}
              </motion.div>
            ))
          ) : (
            <div className="text-center py-20 bg-[#1E293B] rounded-3xl border border-dashed border-slate-700">
              <p className="text-slate-500 font-mono italic">
                No messages found in your inbox.
              </p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
