"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check, Phone, X,
  ChevronDown, Mail, Mic2, Music, Link as LinkIcon
} from "lucide-react";

type Option = string;

type CustomSelectProps = {
  label: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

// Youtube Icon typed to prevent build errors
const YoutubeIcon = ({ size = 20, className = "" }: { size?: number; className?: string }) => (
  <svg
    width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round"
    strokeLinejoin="round" className={className}
  >
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 2-2 103.03 103.03 0 0 1 15 0 2 2 0 0 1 2 2 24.12 24.12 0 0 1 0 10 2 2 0 0 1-2 2 103.03 103.03 0 0 1-15 0 2 2 0 0 1-2-2Z" />
    <path d="m10 15 5-3-5-3v6Z" />
  </svg>
);

const FBIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
);

const IGIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
);

const CustomSelect = ({ label, options, value, onChange, placeholder }: CustomSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative">
      <label className="block font-mono text-[10px] tracking-[0.18em] text-white/40 uppercase mb-2 ml-1">{label}</label>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm text-white flex justify-between items-center cursor-pointer hover:bg-white/10 transition-all duration-300"
      >
        <span className={value ? "text-white" : "text-white/20"}>
          {value ? (options.find(opt => opt === value) + (label === "Анги" ? "-р анги" : " хүн")) : placeholder}
        </span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
          <ChevronDown size={18} className="text-[#e8ff47]" />
        </motion.div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
            className="absolute z-[70] w-full mt-2 bg-[#121212] border border-white/10 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-xl"
          >
            {options.map((opt) => (
              <div
                key={opt}
                onClick={() => { onChange(opt); setIsOpen(false); }}
                className="px-5 py-4 text-sm hover:bg-[#e8ff47] hover:text-black transition-colors cursor-pointer"
              >
                {opt} {label === "Анги" ? "-р анги" : "хүн"}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function OpenMicPage() {
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showRulesModal, setShowRulesModal] = useState(false);

  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "",
    grade: "", classNumber: "", studentCount: "1", phone: "",
    youtubeLink: ""
  });

  const update = (field: keyof typeof form) => (val: string) => setForm({ ...form, [field]: val });
  const isFormValid = form.firstName && form.lastName && form.email && form.grade && form.classNumber && form.phone && agreed;

  const [notification, setNotification] = useState<{
    show: boolean;
    type: "success" | "error";
    message: string;
  }>({
    show: false,
    type: "success",
    message: "",
  });

  const showNotification = (type: "success" | "error", message: string) => {
    setNotification({ show: true, type, message });
    setTimeout(() => {
      setNotification((prev) => ({ ...prev, show: false }));
    }, 3500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setLoading(true);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (result.success) {
        setShowModal(true);
        setForm({
          firstName: "",
          lastName: "",
          email: "",
          grade: "",
          classNumber: "",
          studentCount: "1",
          phone: "",
          youtubeLink: "",
        });
        setAgreed(false);
        showNotification("success", result.message || "Бүртгэл амжилттай хадгалагдлаа.");
      } else {
        showNotification("error", result.message || "Алдаа гарлаа.");
      }
    } catch (error) {
      console.error(error);
      showNotification("error", "Сервертэй холбогдож чадсангүй.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm text-white placeholder-white/20 focus:border-[#e8ff47]/50 focus:bg-white/10 outline-none transition-all duration-300";

  return (
    <main className="relative min-h-screen bg-[#080808] text-white selection:bg-[#e8ff47] selection:text-black overflow-x-hidden">
      {/* Background blobs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-[#e8ff47]/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-[#ff4d6d]/5 blur-[120px]" />
      </div>

      {/* Ticker */}
      <div className="fixed top-0 left-0 right-0 h-10 border-b border-white/5 bg-black/80 backdrop-blur-md flex items-center overflow-hidden z-[60]">
        <div className="flex whitespace-nowrap font-mono text-[10px] tracking-[0.2em] text-[#e8ff47]/80 animate-ticker">
          {[1, 2, 3, 4].map((i) => (
            <span key={i} className="px-8 uppercase font-bold text-[#e8ff47]">
              OPEN MIC NIGHT • 04.29 WEDNESDAY • Сургуулийн хөл бөмбөгийн талбайд • REGISTRATION OPEN •
            </span>
          ))}
        </div>
      </div>

      {/* Nav */}
      <nav className="relative w-[calc(100%-1.5rem)] max-w-7xl mx-auto mt-12 sm:mt-16 px-4 sm:px-8 py-3 sm:py-4 flex justify-between items-center z-50 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-2xl shadow-2xl">
        <div className="flex items-center gap-4 sm:gap-10">
          <div className="group flex items-center gap-2 sm:gap-3 cursor-pointer">
            <div className="w-9 h-9 sm:w-11 sm:h-11 bg-[#e8ff47] rounded-xl flex items-center justify-center -rotate-6 group-hover:rotate-0 transition-all duration-500 shadow-[0_0_20px_#e8ff4733]">
              <Mic2 className="text-black" size={18} />
            </div>
            <div className="font-black text-xl sm:text-2xl tracking-tighter italic leading-none text-white">
              OPEN<span className="text-[#e8ff47]">MIC</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6 pl-8 border-l border-white/15">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
                <img src="/Surguuli logo.png" className="w-full h-full object-contain p-1" alt="School" />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] text-white/40 font-bold uppercase tracking-widest leading-none mb-1">Сургууль</span>
                <span className="font-bold text-[12px] tracking-tight text-white/90">Монгол 3-р сургууль</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
                <img src="/club logo.png" className="w-full h-full object-contain p-1" alt="Club" />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] text-[#e8ff47]/60 font-bold uppercase tracking-widest leading-none mb-1">Клуб</span>
                <span className="font-bold text-[12px] tracking-tight text-white/90 uppercase">Өсвөрийн сурвалжлагч</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="#register"
            className="bg-[#e8ff47] text-black text-[10px] sm:text-[11px] font-black tracking-widest px-5 sm:px-8 py-3 sm:py-3.5 rounded-xl hover:shadow-[0_0_30px_#e8ff4744] transition-all hover:-translate-y-0.5 active:scale-95"
          >
            БҮРТГҮҮЛЭХ
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-[75vh] sm:min-h-[90svh] flex flex-col justify-center px-6 sm:px-[8vw] pt-4">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="z-10">
          <h1 className="font-black leading-[0.85] tracking-tighter mb-6 sm:mb-10 text-[22vw] sm:text-[16vw] md:text-[12vw] lg:text-[10rem] uppercase italic break-words">
            THE<br />
            <span className="text-[#e8ff47] drop-shadow-[0_0_40px_#e8ff4733]">STAGE</span><br />
            IS YOURS
          </h1>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 sm:gap-12 border-t border-white/10 pt-6 sm:pt-10">
            {[
              { val: "04.29", label: "Өдөр" },
              { val: "14:00", label: "Цаг" },
              { val: "Сургуулийн хөл бөмбөгийн талбайд", label: "Байршил" }
            ].map((item, idx) => (
              <div key={item.label} className={idx === 2 ? "col-span-2 md:col-span-1" : ""}>
                <p className="font-mono text-[10px] text-white/30 uppercase mb-1 tracking-[0.2em]">{item.label}</p>
                <p className="text-xl sm:text-3xl font-black italic">{item.val}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Register Section */}
      <section id="register" className="relative px-6 py-12 sm:py-32 md:px-[8vw]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-24 items-start text-left">
          <div className="space-y-8 sm:space-y-16">
            <div className="space-y-6">
              <h2 className="text-5xl sm:text-8xl font-black uppercase leading-none italic">
                Өөрийгөө<br /><span className="text-[#e8ff47]">нээ.</span>
              </h2>
              <p className="text-white/50 text-base sm:text-xl max-w-md leading-relaxed">
                Сургуулийнхаа хамгийн том чөлөөт тайзан дээр гарахад бэлэн үү? Хэний ч өмнө өөрийгөө илэрхийлэх боломж.
              </p>
            </div>

            <div className="pt-8 border-t border-white/5">
              <p className="text-[10px] font-mono text-white/20 uppercase tracking-widest mb-6">Organized by</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center shrink-0 overflow-hidden group-hover:border-[#e8ff47]/50 transition-all">
                    <img src="/Surguuli logo.png" className="w-full h-full object-contain p-1.5" alt="School" />
                  </div>
                  <span className="font-black text-sm sm:text-base uppercase tracking-tight">Монгол 3-р сургууль</span>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center shrink-0 overflow-hidden group-hover:border-[#e8ff47]/50 transition-all">
                    <img src="/club logo.png" className="w-full h-full object-contain p-1.5" alt="Club" />
                  </div>
                  <span className="font-black text-sm sm:text-base uppercase tracking-tight">Өсвөрийн сурвалжлагч клуб</span>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-6 sm:p-14 backdrop-blur-3xl"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[10px] text-white/40 uppercase mb-2 ml-1">Овог</label>
                  <input required className={inputClass} placeholder="..." value={form.lastName} onChange={(e) => update("lastName")(e.target.value)} />
                </div>
                <div>
                  <label className="block font-mono text-[10px] text-white/40 uppercase mb-2 ml-1">Нэр</label>
                  <input required className={inputClass} placeholder="..." value={form.firstName} onChange={(e) => update("firstName")(e.target.value)} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <CustomSelect label="Анги" options={["8", "9", "10", "11", "12"]} value={form.grade} onChange={update("grade")} placeholder="Сонгох" />
                <div>
                  <label className="block font-mono text-[10px] text-white/40 uppercase mb-2 ml-1">Бүлэг</label>
                  <input required className={inputClass} placeholder="А" value={form.classNumber} onChange={(e) => update("classNumber")(e.target.value)} />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[10px] text-white/40 uppercase mb-2 ml-1">Утас</label>
                  <input type="tel" required className={inputClass} placeholder="85953579" value={form.phone} onChange={(e) => update("phone")(e.target.value)} />
                </div>
                <div>
                  <label className="block font-mono text-[10px] text-white/40 uppercase mb-2 ml-1">Мэйл</label>
                  <input type="email" required className={inputClass} placeholder="мэйл хаяг" value={form.email} onChange={(e) => update("email")(e.target.value)} />
                </div>
              </div>

              <div className="group text-left">
                <label className="flex items-center gap-2 font-mono text-[10px] text-white/40 uppercase mb-2 ml-1 group-focus-within:text-[#e8ff47] transition-colors">
                  <LinkIcon size={12} /> Үзүүлбэрийн дууны линк (YouTube / Drive)
                </label>
                <div className="relative">
                  <input
                    type="url"
                    className={`${inputClass} border-dashed border-[#e8ff47]/20`}
                    placeholder="https://www.youtube.com/watch?v=..."
                    value={form.youtubeLink}
                    onChange={(e) => update("youtubeLink")(e.target.value)}
                  />
                  <Music size={16} className="absolute right-5 top-1/2 -translate-y-1/2 text-white/10 group-focus-within:text-[#e8ff47] transition-all" />
                </div>
              </div>

              <CustomSelect label="Хамт оролцох" options={["1", "2", "3", "4", "5+"]} value={form.studentCount} onChange={update("studentCount")} placeholder="Сонгох" />

              <div className="flex gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 cursor-pointer items-center group" onClick={() => setAgreed(!agreed)}>
                <div className={`w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 transition-all ${agreed ? "bg-[#e8ff47] border-[#e8ff47]" : "border-white/20"}`}>
                  {agreed && <Check size={14} className="text-black stroke-[4]" />}
                </div>
                <p className="text-[10px] text-white/40 uppercase tracking-widest leading-tight">
                  Би <span className="text-white underline font-bold" onClick={(e) => { e.stopPropagation(); setShowRulesModal(true); }}>дүрэм журам</span>-ыг зөвшөөрч байна.
                </p>
              </div>

              <button disabled={loading || !isFormValid} className="w-full bg-[#e8ff47] text-black font-black py-5 rounded-2xl text-[12px] uppercase tracking-widest hover:shadow-[0_0_40px_#e8ff4733] transition-all active:scale-[0.98]">
                {loading ? "Түр хүлээнэ үү..." : "БҮРТГЭЛ БАТАЛГААЖУУЛАХ"}
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-white/5 pt-20 pb-10 px-6 sm:px-[8vw] text-left">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-20">
            <div className="space-y-6">
              <div className="font-black text-3xl tracking-tighter italic text-white">
                OPEN<span className="text-[#e8ff47]">MIC</span>
              </div>
              <p className="text-white/30 text-sm leading-relaxed max-w-xs">
                Монгол 3-р сургуулийн залуусын чөлөөт тайз.
              </p>
            </div>

            <div className="space-y-6">
              <h4 className="font-black text-xs uppercase tracking-[0.2em] text-white/20">Холбоо барих</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 text-white/60">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 hover:text-[#e8ff47] transition-colors cursor-pointer">
                    <Phone size={14} /><span className="font-bold text-sm">85953579</span>
                  </div>
                  <div className="flex items-center gap-3 hover:text-[#e8ff47] transition-colors cursor-pointer">
                    <Phone size={14} /><span className="font-bold text-sm">88782206</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer">
                    <Mail size={14} /><span className="text-[13px]">bolorzoloko@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer">
                    <Mail size={14} /><span className="text-[13px]">eekly33@gmail.com</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6 lg:text-right">
              <h4 className="font-black text-xs uppercase tracking-[0.2em] text-white/20">Биднийг дагах</h4>
              <div className="flex gap-4 lg:justify-end">
                <a href="https://www.facebook.com/profile.php?id=100057246858647" target="_blank" rel="noopener noreferrer" className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#e8ff47] transition-all group">
                  <FBIcon />
                </a>
                <a href="https://www.instagram.com/usvuriinsurvaljlagcid_mgl3/" target="_blank" rel="noopener noreferrer" className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#e8ff47] transition-all group">
                  <IGIcon />
                </a>
              </div>
            </div>
          </div>

          <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col gap-1">
              <p className="text-[10px] font-mono text-white/10 uppercase tracking-[0.4em]">
                © 2026 OPEN MIC PROJECT • MON-3 SCHOOL
              </p>
            </div>
            <div className="group cursor-default">
              <p className="text-[10px] font-mono text-white/20 uppercase tracking-[0.4em]">
                MADE BY <span className="text-white/40 group-hover:text-[#e8ff47] transition-colors duration-500 italic font-bold">11D ZOLBAYAR</span>
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Rules Modal */}
      <AnimatePresence>
        {showRulesModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/95 backdrop-blur-xl" onClick={() => setShowRulesModal(false)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-[#0c0c0c] border border-white/10 rounded-[3rem] p-10 sm:p-16 w-full max-w-2xl text-left" onClick={e => e.stopPropagation()}>
              <h3 className="text-3xl sm:text-5xl font-black mb-10 text-[#e8ff47] uppercase italic">Дүрэм журам</h3>
              <div className="space-y-6 text-white/50 text-base sm:text-lg font-medium leading-relaxed">
                <p>01. Үзүүлбэрийн хугацаа 5-8 минутаас хэтрэхгүй байх.</p>
                <p>02. Бусдын эрх ашгийг хүндэтгэсэн, ёс зүйтэй агуулгатай байх.</p>
                <p>03. Хэрэгцээтэй фонограмм болон хөгжмөө урьдчилан бэлдэж ирэх.</p>
              </div>
              <button onClick={() => { setAgreed(true); setShowRulesModal(false); }} className="w-full mt-12 bg-white text-black py-5 rounded-2xl font-black text-xs uppercase tracking-widest">Би ойлголоо</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-[#080808] text-center">
            <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }}>
              <div className="w-24 h-24 bg-[#e8ff47] rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_80px_#e8ff4744]"><Check size={48} className="text-black stroke-[3]" /></div>
              <h3 className="text-5xl font-black mb-6 uppercase italic">Амжилттай!</h3>
              <button onClick={() => setShowModal(false)} className="px-16 py-5 bg-white/5 border border-white/10 rounded-full text-xs font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">Буцах</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {notification.show && (
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-[200]"
          >
            <div
              className={`px-6 py-4 rounded-2xl shadow-2xl border backdrop-blur-xl flex items-center gap-3 min-w-[320px]
        ${notification.type === "success"
                  ? "bg-[#e8ff47]/10 border-[#e8ff47]/30 text-[#e8ff47]"
                  : "bg-red-500/10 border-red-400/30 text-red-300"
                }`}
            >
              {notification.type === "success" ? <Check size={18} /> : <X size={18} />}
              <span className="text-sm font-semibold tracking-wide">{notification.message}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @keyframes ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-ticker { animation: ticker 30s linear infinite; }
        ::-webkit-scrollbar { width: 0px; }
        html { scroll-behavior: smooth; }
      `}</style>
    </main>
  );
}