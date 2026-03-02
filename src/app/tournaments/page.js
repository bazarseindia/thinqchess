"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Trophy, Calendar, MapPin, Users, ArrowRight, Star, Award, Phone, Mail, User,
    Globe, CreditCard, Ticket, AlertCircle, Zap, ShieldCheck, ChevronRight, Lock,
    QrCode, Clock, Loader2, CheckCircle2, XCircle, Tag, ArrowLeft
} from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import Select from 'react-select';
import { Country, State, City } from 'country-state-city';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

// ─────────────────────────────────────────────────────────
//  HELPER: STATUS BADGE LOGIC (v1 parity)
// ─────────────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────
//  DEMO DATA (for visual testing — replaced by API later)
// ─────────────────────────────────────────────────────────
const DEMO_TOURNAMENTS = [
    {
        id: 1, name: "ThinQ Grand Prix: Bangalore Open 2025",
        description: "An AICF-rated rapid chess championship for all age groups. Compete against top-rated players from across Karnataka.",
        start_date: "2025-03-15", end_date: "2025-03-16",
        registration_start_date: "2025-02-01", registration_end_date: "2025-03-12",
        flyer_image: "/assets/home/Thinq Chess Tournament.jpeg",
        is_active: true, require_ksca_id: true, location: "JP Nagar, Bangalore",
        categories: [
            { id: "u8", name: "Under-8 Rapid", fee: 500, slots: 50 },
            { id: "u12", name: "Under-12 Championship", fee: 600, slots: 60 },
            { id: "u16", name: "Under-16 Elite", fee: 800, slots: 40 },
            { id: "open", name: "Open Category", fee: 1200, slots: 100 },
        ],
    },
    {
        id: 2, name: "NextGen Blitz Series: Season 05",
        description: "High-speed rapid fire blitz tournament. 5+3 time control with 7 rounds of Swiss system pairing.",
        start_date: "2025-04-05", end_date: "2025-04-05",
        registration_start_date: "2025-03-01", registration_end_date: "2025-04-02",
        flyer_image: "/assets/home/Practice time.jpeg",
        is_active: true, require_ksca_id: false, location: "Virtual Arena (Online)",
        categories: [
            { id: "blitz_all", name: "All-Age Blitz", fee: 400, slots: 200 },
            { id: "blitz_u15", name: "Under-15 Blitz", fee: 300, slots: 80 },
        ],
    },
    {
        id: 3, name: "Karnataka State Junior Championship",
        description: "Official KSCA-sanctioned junior championship. FIDE-rated classical format with 9 rounds.",
        start_date: "2025-05-10", end_date: "2025-05-12",
        registration_start_date: "2025-04-15", registration_end_date: "2025-05-07",
        flyer_image: "/assets/home/Internal Tournament.jpeg",
        is_active: true, require_ksca_id: true, location: "Akshayanagar, Bangalore",
        categories: [
            { id: "junior_u10", name: "Under-10", fee: 700, slots: 30 },
            { id: "junior_u14", name: "Under-14", fee: 800, slots: 40 },
            { id: "junior_u18", name: "Under-18", fee: 900, slots: 40 },
        ],
    },
    {
        id: 4, name: "ThinQ Academy Inter-School League",
        description: "Annual inter-school team chess league. Schools compete in a round-robin format.",
        start_date: "2025-01-20", end_date: "2025-01-21",
        registration_start_date: "2024-12-15", registration_end_date: "2025-01-15",
        flyer_image: "/assets/For website/Academy photo.jpeg",
        is_active: false, require_ksca_id: false, location: "JP Nagar, Bangalore",
        categories: [
            { id: "school_primary", name: "Primary (Gr 1-5)", fee: 300, slots: 100 },
            { id: "school_middle", name: "Middle (Gr 6-8)", fee: 400, slots: 80 },
        ],
    },
];

const getStatusInfo = (tournament) => {
    const now = new Date();
    const regStart = new Date(tournament.registration_start_date + 'T00:00:00+05:30');
    const regEnd = new Date(tournament.registration_end_date + 'T23:59:59+05:30');
    const endDate = new Date((tournament.end_date || tournament.start_date) + 'T23:59:59+05:30');

    if (tournament.is_active && now >= regStart && now <= regEnd) {
        return { text: "LIVE", color: "bg-emerald-500", textColor: "text-emerald-500", pulse: true, canRegister: true };
    } else if (now < regStart && tournament.is_active) {
        return { text: "UPCOMING", color: "bg-sky-500", textColor: "text-sky-500", pulse: false, canRegister: false };
    } else if (now > endDate) {
        return { text: "COMPLETED", color: "bg-slate-500", textColor: "text-slate-500", pulse: false, canRegister: false };
    } else {
        return { text: "REG CLOSED", color: "bg-amber-500", textColor: "text-amber-500", pulse: false, canRegister: false };
    }
};

// ─────────────────────────────────────────────────────────
//  MAIN PAGE COMPONENT
// ─────────────────────────────────────────────────────────
const TournamentsPage = () => {
    const { isDark } = useTheme();
    const [tournaments, setTournaments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState("ALL");
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedTournament, setSelectedTournament] = useState(null);

    // Fetch tournaments from backend, fallback to demo data
    useEffect(() => {
        const fetchTournaments = async () => {
            try {
                const res = await fetch('/api/public/tournaments');
                const data = await res.json();
                if (data.success && data.tournaments && data.tournaments.length > 0) {
                    const parsed = data.tournaments.map(t => {
                        // Normalize DB camelCase to snake_case used by frontend
                        const startDate = t.startDate || t.start_date || '';
                        const endDate = t.endDate || t.end_date || '';
                        const regStart = t.registrationStartDate || t.registration_start_date || '';
                        const regEnd = t.registrationEndDate || t.registration_end_date || '';
                        return {
                            ...t,
                            start_date: typeof startDate === 'string' ? startDate : new Date(startDate).toISOString().split('T')[0],
                            end_date: typeof endDate === 'string' ? endDate : new Date(endDate).toISOString().split('T')[0],
                            registration_start_date: typeof regStart === 'string' ? regStart : new Date(regStart).toISOString().split('T')[0],
                            registration_end_date: typeof regEnd === 'string' ? regEnd : new Date(regEnd).toISOString().split('T')[0],
                            flyer_image: t.flyerImage || t.flyer_image || null,
                            is_active: t.isActive === true || t.is_active === true,
                            require_ksca_id: t.requireKscaId === true || t.require_ksca_id === true,
                            categories: typeof t.categories === 'string' ? JSON.parse(t.categories) : (t.categories || []),
                        };
                    });
                    setTournaments(parsed);
                } else {
                    setTournaments(DEMO_TOURNAMENTS);
                }
            } catch (err) {
                console.error('API not available, using demo data');
                setTournaments(DEMO_TOURNAMENTS);
            } finally {
                setLoading(false);
            }
        };
        fetchTournaments();
    }, []);

    const filtered = tournaments.filter(t => {
        const status = getStatusInfo(t);
        if (activeFilter === "ALL") return true;
        if (activeFilter === "LIVE") return status.text === "LIVE";
        if (activeFilter === "UPCOMING") return status.text === "UPCOMING";
        return true;
    });

    const totalSlots = tournaments.reduce((sum, t) => {
        const cats = Array.isArray(t.categories) ? t.categories : [];
        return sum + cats.reduce((s, c) => s + (parseInt(c.slots) || 0), 0);
    }, 0);

    return (
        <div className={`min-h-screen ${isDark ? 'bg-[#0A1128] text-white' : 'bg-white text-[#2B3AA0]'} font-sans antialiased overflow-x-hidden`}>
            <Navbar />

            {/* ═══════════════════════════════════════════
                1. CINEMATIC HERO (Registration Page Style)
            ═══════════════════════════════════════════ */}
            <section className="relative min-h-[60vh] flex items-center pt-32 pb-24 overflow-hidden border-b border-white/10">
                {/* Immersive Background */}
                <div className="absolute inset-0 z-0 bg-[#050A18]">
                    <img
                        src="/assets/home/Thinq Chess Tournament.jpeg"
                        alt="Thinq Chess Tournaments"
                        className="w-full h-full object-cover opacity-40 mix-blend-luminosity"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${isDark ? 'from-[#0A1128] via-[#0A1128]/80' : 'from-white via-[#2B3AA0]/80'} to-transparent`}></div>
                    <div className={`absolute inset-0 bg-gradient-to-r ${isDark ? 'from-[#0A1128] via-[#0A1128]/60 to-transparent' : 'from-[#2B3AA0] via-[#2B3AA0]/60 to-transparent'}`}></div>

                    {/* Glowing Orbs */}
                    <motion.div animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.2, 1] }} transition={{ duration: 8, repeat: Infinity }} className="absolute -top-40 -left-40 w-96 h-96 bg-[#FFB31A]/20 rounded-full blur-[100px] pointer-events-none"></motion.div>
                    <motion.div animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.5, 1] }} transition={{ duration: 10, repeat: Infinity, delay: 2 }} className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></motion.div>
                </div>

                <div className="container mx-auto px-6 relative z-10 max-w-5xl">
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFB31A]/20 text-[#FFB31A] font-black uppercase tracking-[0.3em] text-[10px] mb-8 border border-[#FFB31A]/30 backdrop-blur-md">
                        <Trophy size={12} className="animate-pulse" /> The Arena Awaits
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-6xl md:text-8xl lg:text-9xl font-black italic tracking-tighter uppercase leading-[0.8] text-white mb-6 drop-shadow-2xl"
                    >
                        CHESS <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFB31A] to-amber-300 filter drop-shadow-[0_0_20px_rgba(255,179,26,0.5)]">TOURNAMENTS</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className={`text-lg md:text-xl font-medium max-w-2xl ${isDark ? 'text-white/70' : 'text-white/90'} italic leading-snug mb-12`}
                    >
                        Professionally-conducted chess tournaments designed to sharpen minds and foster greatness in every player. Step into the arena.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 }}
                        className="flex gap-10 md:gap-16 border-l-4 border-[#FFB31A] pl-8"
                    >
                        <div>
                            <div className="text-4xl md:text-6xl font-black italic text-white drop-shadow-lg">{tournaments.length || '—'}</div>
                            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-[#FFB31A] mt-2">Active Events</div>
                        </div>
                        <div>
                            <div className="text-4xl md:text-6xl font-black italic text-white drop-shadow-lg">{totalSlots > 0 ? `${totalSlots}+` : '—'}</div>
                            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-[#FFB31A] mt-2">Total Slots</div>
                        </div>
                        <div>
                            <div className="text-4xl md:text-6xl font-black italic text-white drop-shadow-lg">{tournaments.reduce((s, t) => s + (Array.isArray(t.categories) ? t.categories.length : 0), 0) || '—'}</div>
                            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-[#FFB31A] mt-2">Categories</div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════
                2. TOURNAMENT CARDS FEED
            ═══════════════════════════════════════════ */}
            <section className="py-24 md:py-40 relative">
                <div className="container mx-auto px-6">
                    {/* Header + Filter */}
                    <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-20">
                        <div className="max-w-2xl">
                            <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase leading-[0.85] mb-6">
                                SELECT YOUR <br /> <span className="text-[#FFB31A]">ENTRY.</span>
                            </h2>
                            <p className="text-[11px] font-black uppercase tracking-[0.3em] opacity-40">Choose a tournament and register in minutes.</p>
                        </div>

                        <div className={`p-2 rounded-[2rem] border flex gap-2 ${isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'} backdrop-blur-xl`}>
                            {["ALL", "LIVE", "UPCOMING"].map(f => (
                                <button
                                    key={f}
                                    onClick={() => setActiveFilter(f)}
                                    className={`px-8 py-4 rounded-[1.5rem] text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 ${activeFilter === f
                                        ? 'bg-[#FFB31A] text-[#2B3AA0] shadow-xl'
                                        : 'opacity-40 hover:opacity-100'}`}
                                >
                                    {f}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Loading State */}
                    {loading && (
                        <div className="flex items-center justify-center py-32">
                            <Loader2 size={40} className="animate-spin text-[#FFB31A]" />
                        </div>
                    )}

                    {/* Empty State */}
                    {!loading && filtered.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-32"
                        >
                            <Trophy size={48} className="mx-auto mb-6 opacity-20" />
                            <h3 className="text-2xl font-black italic uppercase opacity-30 mb-2">No Tournaments Found</h3>
                            <p className="text-sm opacity-30">Check back soon for upcoming events.</p>
                        </motion.div>
                    )}

                    {/* Tournament Grid */}
                    <div className="grid grid-cols-1 gap-10 max-w-5xl mx-auto">
                        <AnimatePresence mode="popLayout">
                            {filtered.map((t, idx) => {
                                const status = getStatusInfo(t);
                                const cats = Array.isArray(t.categories) ? t.categories : [];
                                const totalCatSlots = cats.reduce((sum, c) => sum + (parseInt(c.slots) || 0), 0);

                                return (
                                    <motion.div
                                        key={t.id}
                                        layout
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.6, delay: idx * 0.1 }}
                                        className={`group relative rounded-[2rem] overflow-hidden border flex flex-col lg:flex-row ${isDark ? 'bg-[#0A1128] border-white/10' : 'bg-white border-slate-200 shadow-xl'} hover:border-[#FFB31A]/50 transition-all duration-700 hover:shadow-[0_40px_100px_rgba(255,179,26,0.1)]`}
                                    >
                                        {/* Image / Flyer */}
                                        <div className="relative h-[250px] lg:h-auto lg:w-[40%] overflow-hidden shrink-0">
                                            <img
                                                src={t.flyer_image || "/assets/home/Thinq Chess Tournament.jpeg"}
                                                alt={t.name}
                                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                            />
                                            <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-t from-[#0A1128] lg:bg-gradient-to-r lg:from-transparent lg:to-[#0A1128] via-[#0A1128]/40' : 'bg-gradient-to-t from-white lg:bg-gradient-to-r lg:from-transparent lg:to-white via-white/40'} to-transparent`}></div>

                                            {/* Status Badge */}
                                            <div className="absolute top-6 left-6 lg:right-auto">
                                                <div className={`${status.color} text-white px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-xl backdrop-blur-md border border-white/20`}>
                                                    {status.pulse && <span className="w-2 h-2 bg-white rounded-full animate-ping"></span>}
                                                    {status.text}
                                                </div>
                                            </div>

                                            {/* QR Icon */}
                                            <div className="absolute bottom-6 left-6 lg:bottom-auto lg:top-6 lg:right-6">
                                                <div className="w-12 h-12 rounded-2xl bg-[#FFB31A] text-[#2B3AA0] flex items-center justify-center shadow-xl rotate-6 group-hover:rotate-0 transition-transform">
                                                    <QrCode size={24} />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Info */}
                                        <div className="p-8 lg:p-10 flex flex-col flex-1 justify-between relative z-10">
                                            <div>
                                                <h3 className="text-3xl lg:text-4xl font-black italic tracking-tight uppercase leading-none group-hover:text-[#FFB31A] transition-colors mb-4">
                                                    {t.name}
                                                </h3>
                                                {t.description && (
                                                    <p className="text-sm lg:text-base font-medium opacity-60 mb-8 italic line-clamp-2 max-w-xl">{t.description}</p>
                                                )}

                                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                                                    <div className="space-y-1">
                                                        <div className="text-[10px] font-black uppercase tracking-widest opacity-40 text-[#FFB31A]"><Calendar size={12} className="inline mr-1 pb-0.5" />Starts</div>
                                                        <div className="text-sm font-bold">{new Date(t.start_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                                                    </div>
                                                    {t.location && (
                                                        <div className="space-y-1">
                                                            <div className="text-[10px] font-black uppercase tracking-widest opacity-40 text-[#FFB31A]"><MapPin size={12} className="inline mr-1 pb-0.5" />Venue</div>
                                                            <div className="text-sm font-bold truncate pr-4" title={t.location}>{t.location}</div>
                                                        </div>
                                                    )}
                                                    <div className="space-y-1">
                                                        <div className="text-[10px] font-black uppercase tracking-widest opacity-40 text-[#FFB31A]"><Users size={12} className="inline mr-1 pb-0.5" />Divisions</div>
                                                        <div className="text-sm font-bold">{cats.length} groups</div>
                                                    </div>
                                                    <div className="space-y-1">
                                                        <div className="text-[10px] font-black uppercase tracking-widest opacity-40 text-[#FFB31A]"><Clock size={12} className="inline mr-1 pb-0.5" />Reg Ends</div>
                                                        <div className="text-sm font-bold">{new Date(t.registration_end_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</div>
                                                    </div>
                                                </div>

                                                {/* Category Chips */}
                                                <div className="flex flex-wrap gap-2 mb-8">
                                                    {cats.slice(0, 5).map(cat => (
                                                        <span key={cat.id} className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider ${isDark ? 'bg-white/5 border border-white/10 text-white/80' : 'bg-slate-50 border border-slate-200 text-slate-600'} hover:border-[#FFB31A] transition-colors cursor-default`}>
                                                            {cat.name} — ₹{cat.fee}
                                                        </span>
                                                    ))}
                                                    {cats.length > 5 && <span className="px-3 py-2 text-[10px] font-bold opacity-40">+{cats.length - 5} more</span>}
                                                </div>
                                            </div>

                                            <div className="pt-4 border-t border-white/5 lg:mt-auto">
                                                <button
                                                    onClick={() => { setSelectedTournament(t); setIsFormOpen(true); }}
                                                    disabled={!status.canRegister}
                                                    className={`w-full lg:w-auto px-10 py-4 rounded-2xl font-black uppercase tracking-[0.3em] text-[11px] transition-all duration-500 flex items-center justify-center gap-3 ${status.canRegister
                                                        ? 'bg-[#FFB31A] text-[#2B3AA0] hover:bg-white shadow-[0_15px_40px_rgba(255,179,26,0.3)] hover:-translate-y-1'
                                                        : `${isDark ? 'bg-white/5 text-white/20 border border-white/5' : 'bg-slate-100 text-slate-400 border border-slate-200'} cursor-not-allowed`}`}
                                                >
                                                    {status.canRegister ? (<>ENTER TOURNAMENT <ArrowRight size={16} /></>) : status.text}
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════
                3. REGISTRATION DRAWER (FULL V1 LOGIC)
            ═══════════════════════════════════════════ */}
            <AnimatePresence>
                {isFormOpen && selectedTournament && (
                    <RegistrationDrawer
                        tournament={selectedTournament}
                        isDark={isDark}
                        onClose={() => setIsFormOpen(false)}
                    />
                )}
            </AnimatePresence>

            <Footer />
        </div>
    );
};

// ─────────────────────────────────────────────────────────
//  REGISTRATION DRAWER — FULL V1 LOGIC PARITY
// ─────────────────────────────────────────────────────────
const RegistrationDrawer = ({ tournament, isDark, onClose }) => {
    const [phase, setPhase] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [slotsStatus, setSlotsStatus] = useState({});
    const [discountInfo, setDiscountInfo] = useState(null);
    const [validatingDiscount, setValidatingDiscount] = useState(false);

    // Form state (v1 parity)
    const [formData, setFormData] = useState({
        participantFirstName: '', participantMiddleName: '', participantLastName: '',
        email: '', phone: '', dob: '', gender: '',
        fideId: '', ksca_id: '', tournament_type: '',
        country: '', country_code: '', state: '', city: '', location: '',
        discount_code: '',
    });

    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);

    const categories = Array.isArray(tournament.categories) ? tournament.categories : [];
    const selectedCategory = categories.find(c => String(c.id) === String(formData.tournament_type));

    // ── Real-time slot polling (every 5s, v1 parity) ──
    const fetchSlotsStatus = useCallback(async () => {
        try {
            const res = await fetch(`/api/tournament/slots-status?tournament_id=${tournament.id}`);
            const data = await res.json();
            if (data.success) {
                const map = {};
                data.categories.forEach(cat => { map[cat.id] = cat; });
                setSlotsStatus(map);
            }
        } catch (err) { /* silent */ }
    }, [tournament.id]);

    useEffect(() => {
        fetchSlotsStatus();
        const interval = setInterval(fetchSlotsStatus, 5000);
        return () => clearInterval(interval);
    }, [fetchSlotsStatus]);

    // ── getBaseAmount ──
    const getBaseAmount = () => selectedCategory ? parseFloat(selectedCategory.fee) : 0;

    // ── Discount Code Validation (v1 parity) ──
    const validateDiscountCode = async () => {
        if (!formData.discount_code?.trim()) { setDiscountInfo(null); return; }
        if (!formData.tournament_type) { setDiscountInfo({ valid: false, message: 'Select a category first' }); return; }
        setValidatingDiscount(true);
        try {
            const res = await fetch('/api/tournament/validate-discount', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ discount_code: formData.discount_code }),
            });
            const data = await res.json();
            if (data.success) {
                const base = getBaseAmount();
                let discountAmt = data.discount_code.code_type === 'percentage'
                    ? (base * data.discount_code.discount_percentage) / 100
                    : (data.discount_code.discount_amount || 0);
                const finalAmt = Math.max(0, base - discountAmt);
                setDiscountInfo({
                    valid: true, code: data.discount_code.code,
                    discountAmount: Math.round(discountAmt * 100) / 100,
                    finalAmount: Math.round(finalAmt * 100) / 100,
                    isFree: finalAmt === 0,
                    message: finalAmt === 0 ? 'Free Registration!' : `Save ₹${Math.round(discountAmt)}`
                });
            } else {
                setDiscountInfo({ valid: false, message: data.error || 'Invalid code' });
            }
        } catch (_) { setDiscountInfo({ valid: false, message: 'Validation error' }); }
        finally { setValidatingDiscount(false); }
    };

    // ── Handle form changes (v1 parity) ──
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (name === 'discount_code') setDiscountInfo(null);
    };

    const handleSelectChange = (name, opt) => {
        if (name === 'country') {
            const code = opt?.value || '';
            setFormData(prev => ({ ...prev, country: opt?.label || '', country_code: code, state: '', city: '' }));
            if (code) setStates(State.getStatesOfCountry(code));
            setCities([]);
        } else if (name === 'state') {
            const code = opt?.value || '';
            setFormData(prev => ({ ...prev, state: code, city: '' }));
            if (formData.country_code && code) setCities(City.getCitiesOfState(formData.country_code, code));
        } else if (name === 'city') {
            setFormData(prev => ({ ...prev, city: opt?.value || '' }));
        }
    };

    // ── Phase validation ──
    const validatePhase = () => {
        setMessage(''); setMessageType('');
        if (phase === 1) {
            if (!formData.tournament_type) { setMessage('Please select a category.'); setMessageType('error'); return false; }
            const slotInfo = slotsStatus[formData.tournament_type];
            if (slotInfo?.isFull) { setMessage('This category is full.'); setMessageType('error'); return false; }
        }
        if (phase === 2) {
            if (!formData.participantFirstName || !formData.participantLastName || !formData.email || !formData.phone || !formData.dob || !formData.gender) {
                setMessage('Please fill all required fields.'); setMessageType('error'); return false;
            }
            const dobDate = new Date(formData.dob);
            if (isNaN(dobDate.getTime())) { setMessage('Invalid date of birth.'); setMessageType('error'); return false; }
        }
        if (phase === 3) {
            if (!formData.country || !formData.state || !formData.city) {
                setMessage('Please select country, state, and city.'); setMessageType('error'); return false;
            }
            if (tournament.require_ksca_id && !formData.ksca_id) {
                setMessage('KSCA ID is required for this tournament.'); setMessageType('error'); return false;
            }
        }
        return true;
    };

    const nextPhase = () => { if (validatePhase()) setPhase(p => Math.min(p + 1, 4)); };
    const prevPhase = () => { setPhase(p => Math.max(p - 1, 1)); setMessage(''); };

    // ── handleSubmit — Full Razorpay flow (v1 parity) ──
    const handleSubmit = async () => {
        setIsSubmitting(true);
        setMessage('');
        try {
            const normalizedDob = new Date(formData.dob).toISOString().split('T')[0];
            const baseAmount = getBaseAmount() || 500;
            const finalAmount = discountInfo?.valid ? discountInfo.finalAmount : baseAmount;

            // ── FREE REGISTRATION FLOW ──
            if (finalAmount === 0) {
                setMessage('Processing free registration...'); setMessageType('success');
                const res = await fetch('/api/tournament/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        ...formData, dob: normalizedDob, tournament_id: tournament.id,
                        amount_paid: 0, discount_amount: discountInfo.discountAmount,
                        payment_id: `free_${Date.now()}`, payment_status: 'completed',
                    }),
                });
                const data = await res.json();
                if (data.success) {
                    setMessage('✅ Registration successful!'); setMessageType('success');
                    setTimeout(() => window.location.reload(), 2500);
                } else {
                    setMessage(data.error || 'Registration failed.'); setMessageType('error');
                }
                setIsSubmitting(false);
                return;
            }

            // ── PAID REGISTRATION — RAZORPAY ──
            const scriptLoaded = await loadRazorpayScript();
            if (!scriptLoaded) { setMessage('Payment gateway failed to load.'); setMessageType('error'); setIsSubmitting(false); return; }

            const orderRes = await fetch('/api/razorpay', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    amount: finalAmount, currency: 'INR', receipt: `tournament_${Date.now()}`,
                    notes: { tournament_id: tournament.id, participant_name: `${formData.participantFirstName} ${formData.participantLastName}`, email: formData.email }
                }),
            });
            const orderData = await orderRes.json();
            if (!orderData.success) { setMessage('Failed to create payment order.'); setMessageType('error'); setIsSubmitting(false); return; }

            const options = {
                key: orderData.key,
                amount: orderData.order.amount,
                currency: 'INR',
                name: 'ThinQ Chess Academy',
                description: `${tournament.name} Registration`,
                order_id: orderData.order.id,
                handler: async function (response) {
                    setMessage('Payment successful! Processing registration...'); setMessageType('success');
                    try {
                        const regRes = await fetch('/api/tournament/register', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                ...formData, dob: normalizedDob, tournament_id: tournament.id,
                                amount_paid: finalAmount, discount_amount: discountInfo?.discountAmount || 0,
                                payment_id: response.razorpay_payment_id,
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_signature: response.razorpay_signature,
                                payment_status: 'completed',
                            }),
                        });
                        const regData = await regRes.json();
                        if (regData.success) {
                            setMessage('✅ Registration completed successfully!'); setMessageType('success');
                            setTimeout(() => window.location.reload(), 2500);
                        } else {
                            setMessage('Processing... Please wait.'); setMessageType('warning');
                        }
                    } catch (_) {
                        setMessage('Processing... Please wait.'); setMessageType('warning');
                    }
                },
                prefill: { name: `${formData.participantFirstName} ${formData.participantLastName}`, email: formData.email, contact: formData.phone },
                theme: { color: '#2B3AA0' },
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();
        } catch (err) {
            setMessage('Payment failed. Please try again.'); setMessageType('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Custom select styles for dark mode
    const selectStyles = {
        control: (base, state) => ({
            ...base,
            backgroundColor: isDark ? '#0A1128' : '#f8fafc',
            borderColor: state.isFocused ? '#FFB31A' : (isDark ? 'rgba(255,255,255,0.05)' : '#e2e8f0'),
            borderRadius: '1.5rem', padding: '0.5rem 0.75rem', minHeight: '56px',
            boxShadow: 'none', color: isDark ? '#fff' : '#2B3AA0',
            '&:hover': { borderColor: 'rgba(255,179,26,0.5)' },
        }),
        menu: (base) => ({ ...base, backgroundColor: isDark ? '#0F1A3A' : '#fff', borderRadius: '1rem', overflow: 'hidden', zIndex: 50 }),
        option: (base, state) => ({ ...base, backgroundColor: state.isFocused ? 'rgba(255,179,26,0.15)' : 'transparent', color: isDark ? '#fff' : '#2B3AA0', fontSize: '0.875rem' }),
        singleValue: (base) => ({ ...base, color: isDark ? '#fff' : '#2B3AA0', fontWeight: 700, fontSize: '0.875rem' }),
        placeholder: (base) => ({ ...base, color: isDark ? 'rgba(255,255,255,0.3)' : '#94a3b8', fontSize: '0.875rem' }),
        input: (base) => ({ ...base, color: isDark ? '#fff' : '#2B3AA0' }),
    };

    const finalTotal = discountInfo?.valid ? discountInfo.finalAmount : getBaseAmount();

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
                {/* ── Drawer Header ── */}
                <div className="p-8 lg:p-10 bg-[#0A1128] text-white relative overflow-hidden shrink-0">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-[#FFB31A]/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-8">
                            <div>
                                <div className="text-[10px] font-black uppercase tracking-[0.5em] text-[#FFB31A] mb-2">Tournament Registration</div>
                                <h2 className="text-2xl font-black italic tracking-tighter uppercase leading-tight">{tournament.name}</h2>
                            </div>
                            <button onClick={onClose} className="w-12 h-12 rounded-full bg-white/5 hover:bg-[#FFB31A] hover:text-[#2B3AA0] flex items-center justify-center transition-all">✕</button>
                        </div>
                        {/* Phase Indicator */}
                        <div className="flex gap-3">
                            {[{ n: 1, l: 'Category' }, { n: 2, l: 'Player' }, { n: 3, l: 'Location' }, { n: 4, l: 'Payment' }].map(s => (
                                <div key={s.n} className="flex-1 space-y-1.5">
                                    <div className={`h-1 rounded-full transition-all duration-500 ${phase >= s.n ? 'bg-[#FFB31A]' : 'bg-white/10'}`}></div>
                                    <div className={`text-[8px] font-black uppercase tracking-widest ${phase === s.n ? 'text-[#FFB31A]' : 'opacity-20'}`}>{s.l}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── Form Content ── */}
                <div className="flex-1 overflow-y-auto p-8 lg:p-10">
                    <AnimatePresence mode="wait">

                        {/* ── PHASE 1: CATEGORY SELECTION ── */}
                        {phase === 1 && (
                            <motion.div key="p1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                                <div className="flex items-center gap-3 mb-4"><Zap className="text-[#FFB31A]" size={18} /> <h4 className="text-[11px] font-black uppercase tracking-[0.2em]">Select Your Category</h4></div>
                                {categories.map(cat => {
                                    const slotInfo = slotsStatus[cat.id];
                                    const isFull = slotInfo?.isFull;
                                    const available = slotInfo?.available ?? cat.slots;
                                    const total = slotInfo?.total ?? cat.slots;
                                    return (
                                        <div
                                            key={cat.id}
                                            onClick={() => !isFull && setFormData(prev => ({ ...prev, tournament_type: String(cat.id) }))}
                                            className={`group relative p-6 rounded-[2rem] border transition-all duration-500 cursor-pointer ${isFull ? 'opacity-30 cursor-not-allowed grayscale' : 'hover:border-[#FFB31A]/50'} ${String(formData.tournament_type) === String(cat.id) ? 'bg-[#FFB31A]/10 border-[#FFB31A] ring-2 ring-[#FFB31A]/30' : `${isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'}`}`}
                                        >
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <div className="text-lg font-black uppercase tracking-tight mb-1 group-hover:text-[#FFB31A] transition-colors">{cat.name}</div>
                                                    <div className={`text-[10px] font-bold uppercase tracking-widest ${isFull ? 'text-rose-500' : (available < 10 ? 'text-amber-500' : 'text-emerald-500')}`}>
                                                        {isFull ? '⚠️ SEATS FULL' : `✓ ${available} / ${total} slots available`}
                                                    </div>
                                                </div>
                                                <div className="text-3xl font-black italic">₹{cat.fee}</div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </motion.div>
                        )}

                        {/* ── PHASE 2: PLAYER DETAILS ── */}
                        {phase === 2 && (
                            <motion.div key="p2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                                <div className="flex items-center gap-3 mb-4"><User className="text-[#FFB31A]" size={18} /> <h4 className="text-[11px] font-black uppercase tracking-[0.2em]">Player Information</h4></div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <DrawerInput label="First Name *" name="participantFirstName" value={formData.participantFirstName} onChange={handleChange} isDark={isDark} />
                                    <DrawerInput label="Middle Name" name="participantMiddleName" value={formData.participantMiddleName} onChange={handleChange} isDark={isDark} />
                                    <DrawerInput label="Last Name *" name="participantLastName" value={formData.participantLastName} onChange={handleChange} isDark={isDark} />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <DrawerInput label="Email *" type="email" name="email" value={formData.email} onChange={handleChange} isDark={isDark} />
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-black uppercase tracking-widest opacity-40 px-1">Phone *</label>
                                        <PhoneInput
                                            country={'in'}
                                            value={formData.phone}
                                            onChange={(value) => setFormData(prev => ({ ...prev, phone: value }))}
                                            inputStyle={{
                                                width: '100%', height: '56px', borderRadius: '1.5rem',
                                                backgroundColor: isDark ? '#0A1128' : '#f8fafc',
                                                borderColor: isDark ? 'rgba(255,255,255,0.05)' : '#e2e8f0',
                                                color: isDark ? '#fff' : '#2B3AA0',
                                                fontWeight: 700, fontSize: '0.875rem', paddingLeft: '58px',
                                            }}
                                            buttonStyle={{
                                                borderRadius: '1.5rem 0 0 1.5rem',
                                                backgroundColor: isDark ? '#0A1128' : '#f8fafc',
                                                borderColor: isDark ? 'rgba(255,255,255,0.05)' : '#e2e8f0',
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <DrawerInput label="Date of Birth *" type="date" name="dob" value={formData.dob} onChange={handleChange} isDark={isDark} />
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-black uppercase tracking-widest opacity-40 px-1">Gender *</label>
                                        <div className="flex gap-2">
                                            {["Male", "Female", "Other"].map(g => (
                                                <button
                                                    key={g}
                                                    type="button"
                                                    onClick={() => setFormData(prev => ({ ...prev, gender: g }))}
                                                    className={`flex-1 h-14 rounded-2xl border text-[10px] font-black uppercase transition-all ${formData.gender === g
                                                        ? 'bg-[#FFB31A] text-[#2B3AA0] border-[#FFB31A]'
                                                        : `${isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'} hover:border-[#FFB31A]/50`}`}
                                                >
                                                    {g}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* ── PHASE 3: CREDENTIALS & LOCATION ── */}
                        {phase === 3 && (
                            <motion.div key="p3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                                <div className="flex items-center gap-3 mb-4"><ShieldCheck className="text-[#FFB31A]" size={18} /> <h4 className="text-[11px] font-black uppercase tracking-[0.2em]">Credentials & Location</h4></div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <DrawerInput label="FIDE ID (optional)" name="fideId" value={formData.fideId} onChange={handleChange} isDark={isDark} placeholder="7-digit ID" />
                                    <DrawerInput label={`KSCA ID ${tournament.require_ksca_id ? '*' : '(optional)'}`} name="ksca_id" value={formData.ksca_id} onChange={handleChange} isDark={isDark} />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-black uppercase tracking-widest opacity-40 px-1">Country *</label>
                                        <Select
                                            options={Country.getAllCountries().map(c => ({ label: c.name, value: c.isoCode }))}
                                            placeholder="Select Country"
                                            onChange={(opt) => handleSelectChange('country', opt)}
                                            styles={selectStyles}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-black uppercase tracking-widest opacity-40 px-1">State *</label>
                                        <Select
                                            options={states.map(s => ({ label: s.name, value: s.isoCode }))}
                                            placeholder="Select State"
                                            onChange={(opt) => handleSelectChange('state', opt)}
                                            isDisabled={!formData.country_code}
                                            styles={selectStyles}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-black uppercase tracking-widest opacity-40 px-1">City *</label>
                                        <Select
                                            options={cities.map(c => ({ label: c.name, value: c.name }))}
                                            placeholder="Select City"
                                            onChange={(opt) => handleSelectChange('city', opt)}
                                            isDisabled={!formData.state}
                                            styles={selectStyles}
                                        />
                                    </div>
                                </div>
                                <DrawerInput label="Address (optional)" name="location" value={formData.location} onChange={handleChange} isDark={isDark} placeholder="Door No, Landmark, Sector" />
                            </motion.div>
                        )}

                        {/* ── PHASE 4: PAYMENT ── */}
                        {phase === 4 && (
                            <motion.div key="p4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                                <div className="flex items-center gap-3 mb-4"><CreditCard className="text-[#FFB31A]" size={18} /> <h4 className="text-[11px] font-black uppercase tracking-[0.2em]">Payment Summary</h4></div>

                                <div className={`p-8 rounded-[2.5rem] border text-center ${isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'}`}>
                                    <div className="w-20 h-20 rounded-full bg-[#FFB31A]/20 flex items-center justify-center text-[#FFB31A] mx-auto mb-6">
                                        <Ticket size={36} className="rotate-[-15deg]" />
                                    </div>
                                    <div className="text-[10px] font-black uppercase tracking-[0.4em] text-[#FFB31A] mb-1">Final Clearance</div>
                                    <h3 className="text-xl font-black italic uppercase mb-1">{selectedCategory?.name || 'Category'}</h3>
                                    <div className="text-sm opacity-40 mb-6 italic">{tournament.name}</div>

                                    {/* Price */}
                                    <div className="text-5xl font-black italic tracking-tighter text-[#FFB31A] mb-2">
                                        {finalTotal === 0 ? 'FREE' : `₹${finalTotal}`}
                                    </div>
                                    {discountInfo?.valid && (
                                        <div className="text-sm text-emerald-500 font-bold mb-2">
                                            <CheckCircle2 size={14} className="inline mr-1" />
                                            {discountInfo.message} (was ₹{getBaseAmount()})
                                        </div>
                                    )}

                                    {/* Discount Code Input */}
                                    <div className="flex gap-3 mt-8 max-w-sm mx-auto">
                                        <input
                                            name="discount_code"
                                            value={formData.discount_code}
                                            onChange={handleChange}
                                            placeholder="PROMO CODE"
                                            className={`flex-1 h-12 rounded-2xl px-5 text-xs font-black uppercase tracking-widest outline-none border ${isDark ? 'bg-[#0A1128] border-white/5 text-[#FFB31A]' : 'bg-white border-slate-200 text-[#2B3AA0]'}`}
                                        />
                                        <button
                                            type="button"
                                            onClick={validateDiscountCode}
                                            disabled={validatingDiscount || !formData.discount_code}
                                            className="px-6 h-12 bg-[#FFB31A] text-[#2B3AA0] rounded-2xl font-black text-[9px] uppercase tracking-[0.2em] disabled:opacity-40"
                                        >
                                            {validatingDiscount ? <Loader2 size={14} className="animate-spin" /> : 'Apply'}
                                        </button>
                                    </div>
                                    {discountInfo && !discountInfo.valid && (
                                        <div className="text-xs text-rose-500 font-bold mt-3"><XCircle size={12} className="inline mr-1" />{discountInfo.message}</div>
                                    )}

                                    <div className="flex items-center gap-2 justify-center text-[9px] font-bold opacity-30 uppercase tracking-[0.2em] mt-8">
                                        <Lock size={12} /> Secured by Razorpay
                                    </div>
                                </div>

                                {/* Player Summary */}
                                <div className={`p-6 rounded-2xl ${isDark ? 'bg-white/5' : 'bg-slate-50'} space-y-2`}>
                                    <div className="text-[9px] font-black uppercase tracking-widest opacity-40 mb-3">Registration Summary</div>
                                    <SummaryRow label="Player" value={`${formData.participantFirstName} ${formData.participantLastName}`} />
                                    <SummaryRow label="Email" value={formData.email} />
                                    <SummaryRow label="Category" value={selectedCategory?.name || '—'} />
                                    <SummaryRow label="Location" value={`${formData.city}, ${formData.country}`} />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Message */}
                    {message && (
                        <div className={`mt-6 p-4 rounded-2xl text-xs font-bold flex items-center gap-3 ${messageType === 'success' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : messageType === 'error' ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20' : 'bg-amber-500/10 text-amber-500 border border-amber-500/20'}`}>
                            {messageType === 'success' ? <CheckCircle2 size={16} /> : messageType === 'error' ? <XCircle size={16} /> : <AlertCircle size={16} />}
                            {message}
                        </div>
                    )}
                </div>

                {/* ── Drawer Footer ── */}
                <div className="p-8 lg:p-10 bg-[#0A1128] border-t border-white/10 flex items-center justify-between shrink-0">
                    <button
                        onClick={prevPhase}
                        className={`text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-2 text-white hover:text-[#FFB31A] transition-all ${phase === 1 ? 'opacity-0 pointer-events-none' : ''}`}
                    >
                        <ArrowLeft size={14} /> Back
                    </button>

                    {phase < 4 ? (
                        <button
                            onClick={nextPhase}
                            className="px-10 py-5 rounded-2xl bg-[#FFB31A] text-[#2B3AA0] font-black uppercase tracking-[0.3em] text-[10px] hover:bg-white shadow-xl transition-all flex items-center gap-3"
                        >
                            Next Step <ChevronRight size={16} />
                        </button>
                    ) : (
                        <button
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className="px-10 py-5 rounded-2xl bg-[#FFB31A] text-[#2B3AA0] font-black uppercase tracking-[0.3em] text-[10px] hover:bg-white shadow-[0_15px_50px_rgba(255,179,26,0.3)] transition-all flex items-center gap-3 disabled:opacity-40"
                        >
                            {isSubmitting ? <><Loader2 size={16} className="animate-spin" /> Processing...</> : <>{finalTotal === 0 ? 'REGISTER FREE' : 'PAY & REGISTER'} <ArrowRight size={16} /></>}
                        </button>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
};

// ─────────────────────────────────────────────────────────
//  HELPER COMPONENTS
// ─────────────────────────────────────────────────────────
const StatBox = ({ label, value }) => (
    <div className="text-center group">
        <div className="text-4xl md:text-6xl font-black italic tracking-tight text-[#FFB31A] mb-1 group-hover:scale-110 transition-transform">{value}</div>
        <div className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">{label}</div>
    </div>
);

const DrawerInput = ({ label, placeholder, type = "text", name, value, onChange, isDark }) => (
    <div className="space-y-2">
        <label className="text-[9px] font-black uppercase tracking-widest opacity-40 px-1">{label}</label>
        <input
            type={type} name={name} value={value} onChange={onChange} placeholder={placeholder}
            className={`w-full h-14 px-6 rounded-[1.5rem] text-sm font-bold border transition-all outline-none ${isDark ? 'bg-[#0A1128] border-white/5 text-white focus:border-[#FFB31A]/50' : 'bg-slate-50 border-slate-200 text-[#2B3AA0] focus:border-[#FFB31A]'}`}
        />
    </div>
);

const SummaryRow = ({ label, value }) => (
    <div className="flex justify-between items-center">
        <span className="text-[10px] font-black uppercase tracking-widest opacity-40">{label}</span>
        <span className="text-sm font-bold truncate max-w-[200px]">{value}</span>
    </div>
);

// Razorpay script loader
const loadRazorpayScript = () => {
    return new Promise((resolve) => {
        if (window.Razorpay) { resolve(true); return; }
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
};

export default TournamentsPage;
