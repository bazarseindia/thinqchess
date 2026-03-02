"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Trophy,
    Calendar,
    MapPin,
    Users,
    ArrowRight,
    CheckCircle2,
    Star,
    Award,
    Phone,
    Mail,
    User,
    Globe,
    CreditCard,
    Ticket,
    Info,
    AlertCircle,
    Zap,
    ShieldCheck,
    ChevronRight,
    Search,
    Lock,
    QrCode,
    Activity
} from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';

// --- ULTIMATE ELITE MOCK DATA (Synced with v1 Structure) ---
const ELITE_TOURNAMENTS = [
    {
        id: "T1",
        name: "World Youth Masters: Bangalore Open",
        start_date: "2024-12-28",
        registration_start_date: "2024-11-15",
        registration_end_date: "2024-12-25",
        categories: [
            { id: "C1", name: "Under-7 Elite", fee: "1200", slots: 50, available: 5 },
            { id: "C2", name: "Under-13 Championship", fee: "1500", slots: 30, available: 2 },
            { id: "C3", name: "Masters Open", fee: "2500", slots: 100, available: 45 }
        ],
        flyer_image: "/images/home-banner-two.jpg",
        status: "ACTIVE",
        location: "Thinq Grand Arena, Karnataka",
        is_ksca: true,
        require_ksca_id: true,
        description: "A world-recognised standard tournament for rising stars."
    },
    {
        id: "T2",
        name: "Next Gen Blitz: Season 05",
        start_date: "2025-01-15",
        registration_start_date: "2024-12-01",
        registration_end_date: "2025-01-10",
        categories: [
            { id: "C4", name: "All-Age Blitz", fee: "600", slots: 80, available: 12 },
            { id: "C5", name: "U-15 Rapid", fee: "800", slots: 40, available: 0 }
        ],
        flyer_image: "/images/indian-img-four.jpg",
        status: "ACTIVE",
        location: "Virtual Elite Arena",
        is_ksca: false,
        require_ksca_id: false,
        description: "High-speed chess calculations in a professional digital workspace."
    }
];

const TournamentsPage = () => {
    const { isDark } = useTheme();
    const [activeFilter, setActiveFilter] = useState("ALL");
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedTournament, setSelectedTournament] = useState(null);

    const filtered = ELITE_TOURNAMENTS.filter(t => {
        if (activeFilter === "ALL") return true;
        return t.status === activeFilter;
    });

    return (
        <div className={`min-h-screen ${isDark ? 'bg-[#0A1128] text-white' : 'bg-white text-[#2B3AA0]'} font-sans antialiased overflow-x-hidden`}>

            {/* 1. CINEMATIC HERO: THE GLOBAL ARENA */}
            <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <motion.img
                        initial={{ scale: 1.2, opacity: 0 }}
                        animate={{ scale: 1, opacity: 0.15 }}
                        transition={{ duration: 2, ease: "easeOut" }}
                        src="/images/contact-bg.jpg"
                        alt="Arena"
                        className="w-full h-full object-cover grayscale"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-b ${isDark ? 'from-[#0A1128]/60 via-[#0A1128] to-[#0A1128]' : 'from-white/60 via-white to-white'}`}></div>
                </div>

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-4 px-8 py-3 rounded-full border border-[#FFB31A]/40 bg-[#FFB31A]/10 text-[#FFB31A] text-[11px] font-black uppercase tracking-[0.5em] mb-12 shadow-[0_0_50px_rgba(255,179,26,0.1)]"
                    >
                        <Trophy size={14} className="animate-pulse" /> The Global Chess Arena
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="text-[12vw] sm:text-[10vw] lg:text-[130px] font-black italic tracking-tighter uppercase leading-[0.75] mb-12 text-shadow-2xl"
                    >
                        THE FUTURE OF <br /> <span className="text-[#FFB31A]">COMPETITION.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-xl md:text-3xl font-medium max-w-4xl mx-auto italic opacity-85 leading-tight mb-20"
                    >
                        Say yes to professionally conducted chess tournaments designed to sharpen minds and foster greatness in every young player.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6 }}
                        className="flex justify-center"
                    >
                        <div className="flex gap-16">
                            <StatBox label="Active Arenas" value="12+" />
                            <StatBox label="Master Players" value="15k+" />
                            <StatBox label="Pro Events" value="500+" />
                        </div>
                    </motion.div>
                </div>

                {/* Aesthetic Floating Grid */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FFB31A]/20 to-transparent"></div>
            </section>

            {/* 2. THE ACCESS FEED: TICKET-STYLE CARDS */}
            <section className="py-32 md:py-60 relative">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-32">
                        <div className="max-w-2xl">
                            <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase leading-[0.8] mb-8">
                                SELECT YOUR <br /> <span className="text-[#FFB31A]">ENTRY.</span>
                            </h2>
                            <p className="text-[11px] font-black uppercase tracking-[0.3em] opacity-40">Choose a tournament and secure your digital clearance.</p>
                        </div>

                        <div className={`p-2.5 rounded-[2rem] border flex gap-3 ${isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'} backdrop-blur-3xl`}>
                            {["ALL", "ACTIVE", "UPCOMING"].map(f => (
                                <button
                                    key={f}
                                    onClick={() => setActiveFilter(f)}
                                    className={`px-10 py-5 rounded-[1.5rem] text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 ${activeFilter === f
                                        ? 'bg-[#FFB31A] text-[#2B3AA0] shadow-2xl transform scale-105'
                                        : 'opacity-40 hover:opacity-100'}`}
                                >
                                    {f}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                        <AnimatePresence mode="popLayout">
                            {filtered.map((t, idx) => (
                                <motion.div
                                    key={t.id}
                                    layout
                                    initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.8 }}
                                    className={`group relative rounded-[4rem] overflow-hidden border flex flex-col md:flex-row ${isDark ? 'bg-[#0F1A3A] border-white/5' : 'bg-white border-slate-100'} hover:border-[#FFB31A]/40 transition-all duration-700 hover:shadow-[0_80px_150px_rgba(0,0,0,0.15)]`}
                                >
                                    {/* Left: Image/Flyer Section */}
                                    <div className="md:w-2/5 relative h-[300px] md:h-auto overflow-hidden">
                                        <img
                                            src={t.flyer_image}
                                            alt={t.name}
                                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0F1A3A] md:block hidden"></div>
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0F1A3A] to-transparent md:hidden block"></div>

                                        <div className="absolute top-8 left-8">
                                            <div className="w-16 h-16 rounded-2xl bg-[#FFB31A] text-[#2B3AA0] flex items-center justify-center shadow-2xl rotate-12 group-hover:rotate-0 transition-transform duration-500">
                                                <QrCode size={32} />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right: Info Section */}
                                    <div className="md:w-3/5 p-12 lg:p-16 flex flex-col justify-between relative">
                                        <div className="absolute top-0 right-0 p-12">
                                            <div className="text-[9px] font-black uppercase tracking-[0.4em] opacity-30 text-right mb-1">Status</div>
                                            <div className="flex items-center gap-2 justify-end">
                                                <div className={`w-1.5 h-1.5 rounded-full ${t.status === 'ACTIVE' ? 'bg-emerald-500 animate-ping' : 'bg-slate-500'}`}></div>
                                                <div className="text-[10px] font-black uppercase tracking-widest">{t.status}</div>
                                            </div>
                                        </div>

                                        <div className="pt-8 md:pt-0">
                                            <h3 className="text-3xl font-black italic tracking-tighter uppercase leading-tight group-hover:text-[#FFB31A] transition-colors mb-6">
                                                {t.name}
                                            </h3>
                                            <p className="text-sm font-medium opacity-50 mb-10 italic leading-snug">{t.description}</p>

                                            <div className="grid grid-cols-2 gap-8 mb-12">
                                                <div className="space-y-1">
                                                    <div className="text-[9px] font-black uppercase tracking-widest opacity-30">Battle Date</div>
                                                    <div className="text-sm font-bold">{new Date(t.start_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long' })}</div>
                                                </div>
                                                <div className="space-y-1">
                                                    <div className="text-[9px] font-black uppercase tracking-widest opacity-30">Location</div>
                                                    <div className="text-sm font-bold truncate max-w-[150px]">{t.location}</div>
                                                </div>
                                                <div className="col-span-2">
                                                    <div className="text-[9px] font-black uppercase tracking-widest opacity-30 mb-2">Availability</div>
                                                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            whileInView={{ width: '85%' }}
                                                            className="h-full bg-gradient-to-r from-[#FFB31A] to-orange-500"
                                                        ></motion.div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => { setSelectedTournament(t); setIsFormOpen(true); }}
                                            className={`w-full py-6 rounded-3xl font-black uppercase tracking-[0.4em] text-[10px] transition-all duration-500 flex items-center justify-center gap-4 ${t.status === 'ACTIVE'
                                                ? 'bg-[#FFB31A] text-[#2B3AA0] hover:bg-white shadow-[0_20px_50px_rgba(255,179,26,0.2)]'
                                                : 'bg-white/5 text-white/20 border border-white/5 cursor-not-allowed'}`}
                                            disabled={t.status !== 'ACTIVE'}
                                        >
                                            REQUEST ACCESS <ArrowRight size={18} />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </section>

            {/* 3. THE ELITE VAULT DRAWER (FORM) */}
            <AnimatePresence>
                {isFormOpen && selectedTournament && (
                    <EliteRegistrationDrawer
                        tournament={selectedTournament}
                        isDark={isDark}
                        onClose={() => setIsFormOpen(false)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

// --- ELITE DRAWER COMPONENT ---
const EliteRegistrationDrawer = ({ tournament, isDark, onClose }) => {
    const [phase, setPhase] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [discountCode, setDiscountCode] = useState('');
    const [appliedDiscount, setAppliedDiscount] = useState(0);

    const categories = tournament.categories || [];
    const currentCategory = categories.find(c => c.id === selectedCategory);

    const nextPhase = () => setPhase(p => Math.min(p + 1, 4));
    const prevPhase = () => setPhase(p => Math.max(p - 1, 1));

    const calculateTotal = () => {
        if (!currentCategory) return 0;
        return Math.max(0, parseInt(currentCategory.fee) - appliedDiscount);
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[1000] flex items-center justify-end">
            <div className="absolute inset-0 bg-[#0A1128]/80 backdrop-blur-xl" onClick={onClose}></div>
            <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 30, stiffness: 200 }}
                className={`relative w-full max-w-2xl h-full shadow-[0_0_100px_rgba(0,0,0,0.5)] flex flex-col ${isDark ? 'bg-[#0F1A3A]' : 'bg-white'}`}
            >
                {/* Header Section */}
                <div className="p-10 lg:p-14 bg-[#0A1128] text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFB31A]/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-10">
                            <div>
                                <div className="text-[10px] font-black uppercase tracking-[0.5em] text-[#FFB31A] mb-3">Clearance Level: Elite</div>
                                <h2 className="text-4xl font-black italic tracking-tighter uppercase leading-[0.85]">{tournament.name.split(':')[0]} <br /> <span className="text-[#FFB31A]">{tournament.name.split(':')[1] || 'Registration'}</span></h2>
                            </div>
                            <button onClick={onClose} className="w-14 h-14 rounded-full bg-white/5 hover:bg-[#FFB31A] hover:text-[#2B3AA0] flex items-center justify-center transition-all duration-500">✕</button>
                        </div>

                        {/* Phase Indicator */}
                        <div className="flex gap-4">
                            {[1, 2, 3, 4].map(idx => (
                                <div key={idx} className="flex-1 space-y-2">
                                    <div className={`h-1 rounded-full transition-all duration-500 ${phase >= idx ? 'bg-[#FFB31A]' : 'bg-white/10'}`}></div>
                                    <div className={`text-[8px] font-black uppercase tracking-widest ${phase === idx ? 'text-[#FFB31A]' : 'opacity-20'}`}>Step {idx}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Form Content Phases */}
                <div className="flex-1 overflow-y-auto p-10 lg:p-14 custom-scrollbar">
                    <AnimatePresence mode="wait">
                        {phase === 1 && (
                            <motion.div key="p1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10">
                                <div className="flex items-center gap-4 mb-2"><Zap className="text-[#FFB31A]" size={18} /> <h4 className="text-[11px] font-black uppercase tracking-[0.2em]">Select Your Arena Rank</h4></div>
                                <div className="grid grid-cols-1 gap-6">
                                    {categories.map(cat => (
                                        <div
                                            key={cat.id}
                                            onClick={() => cat.available > 0 && setSelectedCategory(cat.id)}
                                            className={`group relative p-8 rounded-[2.5rem] border transition-all duration-500 cursor-pointer ${cat.available === 0 ? 'opacity-30 cursor-not-allowed grayscale' : 'hover:border-[#FFB31A]/50'} ${selectedCategory === cat.id ? 'bg-[#FFB31A]/10 border-[#FFB31A]' : 'bg-white/5 border-white/10'}`}
                                        >
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <div className="text-lg font-black uppercase tracking-tight mb-2 group-hover:text-[#FFB31A] transition-colors">{cat.name}</div>
                                                    <div className={`text-[10px] font-bold uppercase tracking-widest ${cat.available < 10 ? 'text-rose-500' : 'text-emerald-500'}`}>
                                                        {cat.available === 0 ? "⚠️ SEATS EXHAUSTED" : `${cat.available} / ${cat.slots} SLOTS SECURED`}
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-3xl font-black italic">₹{cat.fee}</div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {phase === 2 && (
                            <motion.div key="p2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10">
                                <div className="flex items-center gap-4 mb-2"><User className="text-[#FFB31A]" size={18} /> <h4 className="text-[11px] font-black uppercase tracking-[0.2em]">Participant Dossier</h4></div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <InputField label="Player First Name *" placeholder="Magnus" isDark={isDark} />
                                    <InputField label="Player Last Name *" placeholder="Carlsen" isDark={isDark} />
                                    <div className="md:col-span-2">
                                        <InputField label="Official Email Address *" type="email" placeholder="guardian@worldchess.com" isDark={isDark} />
                                    </div>
                                    <InputField label="Date of Birth *" type="date" isDark={isDark} />
                                    <div className="space-y-4">
                                        <label className="text-[9px] font-black uppercase tracking-widest opacity-40 px-1">Battle Class / Gender *</label>
                                        <div className="flex gap-3">
                                            {["Male", "Female", "Other"].map(g => (
                                                <button key={g} className="flex-1 h-16 rounded-2xl border border-white/5 bg-white/5 text-[10px] font-black uppercase hover:bg-[#FFB31A]/20 transition-all">{g}</button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {phase === 3 && (
                            <motion.div key="p3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10">
                                <div className="flex items-center gap-4 mb-2"><ShieldCheck className="text-[#FFB31A]" size={18} /> <h4 className="text-[11px] font-black uppercase tracking-[0.2em]">Credentials & Location</h4></div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <InputField label="FIDE ID (optional)" placeholder="Enter 7-digit ID" isDark={isDark} />
                                    <InputField label={`KSCA ID ${tournament.require_ksca_id ? '*' : '(optional)'}`} placeholder="Karnataka Registration" isDark={isDark} />
                                    <div className="md:col-span-2 grid grid-cols-3 gap-6">
                                        <InputField label="Country *" placeholder="India" isDark={isDark} />
                                        <InputField label="State *" placeholder="Karnataka" isDark={isDark} />
                                        <InputField label="City *" placeholder="Bangalore" isDark={isDark} />
                                    </div>
                                    <div className="md:col-span-2">
                                        <InputField label="Detailed Master Address *" placeholder="Door No, Landmark, Sector" isDark={isDark} />
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {phase === 4 && (
                            <motion.div key="p4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10">
                                <div className="flex items-center gap-4 mb-2"><CreditCard className="text-[#FFB31A]" size={18} /> <h4 className="text-[11px] font-black uppercase tracking-[0.2em]">Transaction Gateway</h4></div>

                                <div className={`p-10 rounded-[3rem] border border-white/10 flex flex-col items-center text-center ${isDark ? 'bg-white/5' : 'bg-slate-50'}`}>
                                    <div className="w-24 h-24 rounded-full bg-[#FFB31A]/20 flex items-center justify-center text-[#FFB31A] mb-8">
                                        <Ticket size={40} className="rotate-[-15deg]" />
                                    </div>
                                    <div className="text-[10px] font-black uppercase tracking-[0.4em] text-[#FFB31A] mb-2">Final Clearance Review</div>
                                    <h3 className="text-3xl font-black italic tracking-tighter uppercase mb-2">{currentCategory?.name || 'Category'}</h3>
                                    <div className="text-6xl font-black italic tracking-tighter text-[#FFB31A] mb-10">₹{calculateTotal()}</div>

                                    <div className="w-full flex gap-4 mb-8">
                                        <input
                                            value={discountCode}
                                            onChange={(e) => setDiscountCode(e.target.value)}
                                            placeholder="PROMO CODE"
                                            className="flex-1 h-14 bg-[#0A1128] border border-white/5 rounded-2xl px-6 text-xs font-black uppercase tracking-widest text-[#FFB31A] outline-none"
                                        />
                                        <button
                                            onClick={() => { if (discountCode === "THINQ10") setAppliedDiscount(500); }}
                                            className="px-10 h-14 bg-[#FFB31A] text-[#2B3AA0] rounded-2xl font-black text-[9px] uppercase tracking-[0.2em]"
                                        >Verify</button>
                                    </div>

                                    <div className="flex items-center gap-2 text-[9px] font-bold opacity-30 uppercase tracking-[0.2em]">
                                        <Lock size={12} /> Secure Razorpay Encryption Protocol Enabled
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Drawer Taskbar */}
                <div className="p-10 lg:p-14 bg-[#0A1128] border-t border-white/10 flex items-center justify-between">
                    <button
                        onClick={prevPhase}
                        className={`text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-3 transition-all ${phase === 1 ? 'opacity-0 pointer-events-none' : 'hover:text-[#FFB31A]'}`}
                    >
                        Back
                    </button>

                    {phase < 4 ? (
                        <button
                            onClick={nextPhase}
                            disabled={phase === 1 && !selectedCategory}
                            className={`px-12 py-7 rounded-3xl font-black uppercase tracking-[0.3em] text-[10px] transition-all duration-500 flex items-center gap-4 ${phase === 1 && !selectedCategory ? 'bg-white/5 text-white/10' : 'bg-[#FFB31A] text-[#2B3AA0] hover:bg-white shadow-2xl'}`}
                        >
                            Next Step <ChevronRight size={18} />
                        </button>
                    ) : (
                        <button className="px-16 py-7 rounded-3xl bg-[#FFB31A] text-[#2B3AA0] font-black uppercase tracking-[0.3em] text-[10px] hover:bg-white shadow-[0_20px_80px_rgba(255,179,26,0.3)] transition-all flex items-center gap-4">
                            FINALIZE PAY & REGISTER <ArrowRight size={18} />
                        </button>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
};

// --- HELPER COMPONENTS ---
const StatBox = ({ label, value }) => (
    <div className="text-center group">
        <div className="text-5xl md:text-7xl font-black italic tracking-tight text-[#FFB31A] mb-2 group-hover:scale-110 transition-transform">{value}</div>
        <div className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">{label}</div>
    </div>
);

const InputField = ({ label, placeholder, type = "text", isDark }) => (
    <div className="space-y-4">
        <label className="text-[9px] font-black uppercase tracking-widest opacity-40 px-1">{label}</label>
        <input
            type={type}
            placeholder={placeholder}
            className={`w-full h-18 px-8 py-6 rounded-[1.5rem] text-sm font-bold border transition-all duration-500 outline-none ${isDark ? 'bg-[#0A1128] border-white/5 text-white focus:border-[#FFB31A]/50' : 'bg-slate-50 border-slate-200 text-[#2B3AA0] focus:border-[#FFB31A]'}`}
        />
    </div>
);

export default TournamentsPage;
