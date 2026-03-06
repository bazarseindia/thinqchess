"use client";
import React from 'react';
import { motion } from 'framer-motion';
import {
    Calendar,
    Star,
    ChevronRight,
    ArrowRight,
    Users,
    MapPin,
    Zap,
    Award,
    Clock,
    Sparkles,
    Trophy
} from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import { useSiteData } from '@/components/SiteDataContext';
import Link from 'next/link';

const EventsPage = () => {
    const { isDark } = useTheme();
    const { media } = useSiteData();

    const camps = [
        {
            title: "Grandmaster Summer Camp",
            date: "May 2026",
            duration: "10 Days",
            location: "JP NagarHub",
            desc: "An intensive 10-day camp led by certified trainers. Includes tactical puzzles, opening theory, and daily tournaments.",
            features: ["Personalized Analysis", "Lunch & Snacks", "T-Shirt & Certificates"]
        },
        {
            title: "Young Thinkers Winter Camp",
            date: "December 2025",
            duration: "5 Days",
            location: "Online / Offline",
            desc: "Focus on the beauty of chess and character building. Perfect for beginners and intermediate players.",
            features: ["Fun Chess Games", "Theme Based Learning", "Peer Interaction"]
        }
    ];

    const workshops = [
        {
            title: "Endgame Mastery Workshop",
            date: "March 22, 2026",
            time: "10:00 AM - 4:00 PM",
            mentor: "Lead Masters",
            desc: "Deep dive into pawn endgames and fundamental technical wins. For players above 1200 rating.",
        },
        {
            title: "Opening Repertory Builder",
            date: "April 15, 2026",
            time: "11:00 AM - 2:00 PM",
            mentor: "Academy Seniors",
            desc: "Systematically build your opening repertoire with the latest engine-backed variations.",
        }
    ];

    return (
        <div className={`min-h-screen pt-20 ${isDark ? 'bg-[#0A1128] text-white' : 'bg-white text-[#2B3AA0]'}`}>
            {/* HERO SECTION */}
            <section className="relative py-24 lg:py-40 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img loading="lazy" src={media.img_events_bg || "/assets/home/Internal Tournament.jpeg"}
                        alt="Events Background"
                        className="w-full h-full object-cover opacity-20 scale-110 grayscale"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-b ${isDark ? 'from-[#0A1128]/80 via-[#0A1128]/60 to-[#0A1128]' : 'from-white/80 via-white/60 to-white'}`}></div>
                </div>

                <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-[#FFB31A]/30 bg-[#FFB31A]/10 text-[#FFB31A] text-[10px] font-black uppercase tracking-[0.3em] mb-12 shadow-[0_0_30px_rgba(255,179,26,0.1)]"
                    >
                        <Calendar className="w-3 h-3" /> Event Calendar
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-6xl sm:text-8xl lg:text-9xl font-black italic tracking-tighter leading-none mb-10"
                    >
                        THE ARENA <br /> OF <span className="text-[#FFB31A]">MASTERY.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className={`text-xl md:text-2xl font-medium max-w-3xl mx-auto mb-12 leading-relaxed opacity-90 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}
                    >
                        From high-intensity camps to niche workshops, discover events that elevate your game to the professional level.
                    </motion.p>
                </div>
            </section>

            {/* CAMPS SECTION */}
            <section id="camps" className={`py-24 md:py-40 relative overflow-hidden ${isDark ? 'bg-white/5' : 'bg-slate-50'}`}>
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-20">
                        <div>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-[#FFB31A] text-[#2B3AA0] rounded-xl shadow-lg">
                                    <Trophy size={20} />
                                </div>
                                <span className="text-[11px] font-black uppercase tracking-[0.4em] text-[#FFB31A]">Intensive Training</span>
                            </div>
                            <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase leading-[0.85]">
                                CHESS <br /> <span className="text-[#FFB31A]">CAMPS.</span>
                            </h2>
                        </div>
                        <p className={`max-w-md text-sm font-medium italic ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                            Short-term immersive residencies and online bootcamps designed for rapid Elo gains and strategic maturity.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                        {camps.map((camp, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className={`p-10 rounded-[3rem] border transition-all duration-500 group relative overflow-hidden ${isDark ? 'bg-[#0A1128] border-white/5 hover:border-[#FFB31A]/30' : 'bg-white border-slate-200 hover:border-[#FFB31A]/30 shadow-xl shadow-slate-200/50'}`}
                            >
                                <div className="flex flex-wrap gap-3 mb-8">
                                    <span className="px-4 py-1.5 bg-[#FFB31A]/10 text-[#FFB31A] text-[9px] font-black uppercase tracking-widest rounded-full border border-[#FFB31A]/20">{camp.date}</span>
                                    <span className="px-4 py-1.5 bg-white/5 text-slate-400 text-[9px] font-black uppercase tracking-widest rounded-full flex items-center gap-1.5 border border-white/5">
                                        <Clock size={10} /> {camp.duration}
                                    </span>
                                </div>
                                <h3 className="text-3xl md:text-4xl font-black italic tracking-tight uppercase mb-6 group-hover:text-[#FFB31A] transition-colors">{camp.title}</h3>
                                <p className={`text-base leading-relaxed font-medium mb-10 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{camp.desc}</p>

                                <div className="space-y-4 mb-12">
                                    {camp.features.map(f => (
                                        <div key={f} className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest">
                                            <div className="w-1.5 h-1.5 rounded-full bg-[#FFB31A]"></div> {f}
                                        </div>
                                    ))}
                                </div>

                                <div className="flex items-center justify-between pt-8 border-t border-white/5">
                                    <div className="flex items-center gap-3">
                                        <MapPin size={16} className="text-[#FFB31A]" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{camp.location}</span>
                                    </div>
                                    <Link href="/contact" className="inline-flex items-center gap-3 bg-[#FFB31A] text-[#2B3AA0] px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-[#2B3AA0] hover:text-white transition-all shadow-xl shadow-[#FFB31A]/10">
                                        BOOK SPOT <ChevronRight size={14} />
                                    </Link>
                                </div>
                                <div className="absolute right-0 bottom-0 opacity-[0.03] text-9xl font-black italic rotate-12 pointer-events-none group-hover:scale-125 transition-transform translate-x-1/4 translate-y-1/4 uppercase">
                                    CAMP
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* WORKSHOPS SECTION */}
            <section id="workshops" className="py-24 md:py-40 relative">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="text-center max-w-3xl mx-auto mb-20 md:mb-32">
                        <div className="text-[#FFB31A] font-black uppercase tracking-[0.5em] text-[11px] mb-8">Niche Skills</div>
                        <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase leading-tight mb-8">
                            CURATED <br /> <span className="text-[#FFB31A]">WORKSHOPS.</span>
                        </h2>
                        <p className={`text-lg font-medium italic ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                            Deep-dive sessions focusing on specific tournament techniques, from endgame theory to opening preparation.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {workshops.map((ws, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className={`p-10 rounded-[2.5rem] border transition-all duration-500 group flex flex-col items-start ${isDark ? 'bg-white/5 border-white/10 hover:border-[#FFB31A]/30' : 'bg-white border-slate-100 shadow-2xl shadow-slate-200/30'}`}
                            >
                                <div className="w-16 h-16 rounded-2xl bg-[#FFB31A]/10 border border-[#FFB31A]/20 flex items-center justify-center text-[#FFB31A] mb-8 group-hover:rotate-6 transition-transform">
                                    <Zap size={24} />
                                </div>
                                <div className="flex gap-4 mb-6">
                                    <span className="text-xs font-black uppercase tracking-widest opacity-40">{ws.date}</span>
                                    <span className="text-xs font-black uppercase tracking-widest text-[#FFB31A]">{ws.time}</span>
                                </div>
                                <h3 className="text-2xl md:text-3xl font-black italic uppercase tracking-tight mb-4 group-hover:text-[#FFB31A] transition-colors">{ws.title}</h3>
                                <p className={`text-sm font-medium leading-relaxed mb-10 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{ws.desc}</p>

                                <div className="mt-auto pt-8 border-t border-white/5 w-full flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Sparkles size={14} className="text-[#FFB31A]" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">By {ws.mentor}</span>
                                    </div>
                                    <Link href="/contact" className="inline-flex items-center gap-2 text-[#FFB31A] font-black uppercase tracking-widest text-[10px] hover:translate-x-3 transition-transform">
                                        REGISTER <ArrowRight size={14} />
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* ACADEMY INTERIOR VISUAL */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-32 rounded-[3.5rem] overflow-hidden relative group h-[400px] md:h-[600px] border-[12px] border-white/5 shadow-5xl"
                    >
                        <img loading="lazy" src="/assets/home/Academy photo.jpeg" alt="Academy Workshops" className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128] via-transparent to-transparent opacity-80"></div>
                        <div className="absolute bottom-12 left-12 right-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
                            <div className="max-w-xl">
                                <div className="text-[#FFB31A] text-4xl md:text-6xl font-black italic tracking-tighter uppercase mb-4">THE GLOBAL <br /> EXPERIENCE.</div>
                                <p className="text-white text-lg font-medium italic opacity-80">Join students from 10+ countries in our specialized high-performance workshops.</p>
                            </div>
                            <Link href="/contact" className="bg-white text-[#2B3AA0] px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#FFB31A] transition-all transform hover:-translate-y-2">
                                GET THE SCHEDULE
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* CALL TO ACTION */}
            <section className="py-24 md:py-40 relative z-10 text-center">
                <div className="container mx-auto px-4 sm:px-6">
                    <h2 className="text-4xl md:text-6xl lg:text-8xl font-black italic tracking-tighter uppercase mb-12 leading-[0.85]">
                        DREAM. <br /> PLAY. <span className="text-[#FFB31A]">CONQUER.</span>
                    </h2>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-block"
                    >
                        <Link href="/free-trial" className="bg-[#2B3AA0] text-white px-20 py-8 rounded-[2rem] font-black uppercase tracking-[0.3em] text-sm hover:bg-[#FFB31A] hover:text-[#2B3AA0] transition-all shadow-3xl">
                            START YOUR JOURNEY
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default EventsPage;
