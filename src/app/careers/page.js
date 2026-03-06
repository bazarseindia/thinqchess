"use client";
import React from 'react';
import { motion } from 'framer-motion';
import {
    Briefcase,
    Star,
    ChevronRight,
    ArrowRight,
    Users,
    Target,
    TrendingUp,
    Award,
    Clock,
    MapPin,
    Zap,
    GraduationCap
} from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import { useSiteData } from '@/components/SiteDataContext';
import Link from 'next/link';

const CareersPage = () => {
    const { isDark } = useTheme();
    const { media } = useSiteData();

    const openPositions = [
        {
            title: "Senior Chess Coach",
            type: "Full-Time / Part-Time",
            location: "Bangalore / Online",
            desc: "Join our elite panel of trainers. Looking for rated players (1500+ FIDE) with a passion for pedagogy.",
            skills: ["Advanced Tactics", "Child Psychology", "Opening Preparation"]
        },
        {
            title: "Performance Analyst",
            type: "Full-Time",
            location: "Bangalore",
            desc: "Expert in game analysis and tournament preparation. Help our advanced students reach the next level.",
            skills: ["Engine Analysis", "Strategy Workshops", "Performance Mapping"]
        },
        {
            title: "Academic Coordinator",
            type: "Full-Time",
            location: "Bangalore",
            desc: "Manage classroom schedules, student progress tracking, and parent communications.",
            skills: ["Operations", "Stakeholder Management", "Educational Planning"]
        }
    ];

    const values = [
        { icon: <Target className="w-6 h-6" />, title: "Excellence", desc: "We strive for grandmaster-level precision in everything we do." },
        { icon: <Users className="w-6 h-6" />, title: "Community", desc: "A supportive ecosystem of 15,000+ young thinkers and experts." },
        { icon: <Zap className="w-6 h-6" />, title: "Innovation", desc: "Using modern pedagogy and tech to redefine chess education." }
    ];

    return (
        <div className={`min-h-screen pt-20 ${isDark ? 'bg-[#0A1128] text-white' : 'bg-white text-[#2B3AA0]'}`}>
            {/* HERO SECTION */}
            <section className="relative py-24 lg:py-40 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img loading="lazy" src={media.img_careers_bg || "/assets/home/Academy photo.jpeg"}
                        alt="Background"
                        className="w-full h-full object-cover opacity-10 scale-110 grayscale"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-b ${isDark ? 'from-[#0A1128]/80 via-[#0A1128]/60 to-[#0A1128]' : 'from-white/80 via-white/60 to-white'}`}></div>
                </div>

                <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-[#FFB31A]/30 bg-[#FFB31A]/10 text-[#FFB31A] text-[10px] font-black uppercase tracking-[0.3em] mb-12"
                    >
                        <Briefcase className="w-3 h-3" /> Join Our Team
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl sm:text-7xl lg:text-9xl font-black italic tracking-tighter leading-none mb-10"
                    >
                        SHAPE THE <br /> <span className="text-[#FFB31A]">FUTURE</span> OF CHESS.
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className={`text-xl md:text-2xl font-medium max-w-3xl mx-auto mb-12 leading-relaxed opacity-90 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}
                    >
                        We are building an ecosystem where talent meets pedagogy. If you are passionate about chess and education, you belong at ThinQ.
                    </motion.p>
                </div>
            </section>

            {/* GROW WITH US - TRAIN THE TRAINER HIGHLIGHT */}
            <section className={`py-12 ${isDark ? 'bg-white/5' : 'bg-slate-50'}`}>
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="max-w-6xl mx-auto bg-[#2B3AA0] rounded-[2.5rem] p-8 md:p-12 lg:p-16 flex flex-col lg:flex-row items-center gap-12 text-white shadow-2xl relative overflow-hidden group">
                        <div className="absolute right-0 top-0 w-64 h-64 bg-[#FFB31A]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform"></div>

                        <div className="lg:w-2/3 relative z-10">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-white/10 rounded-xl">
                                    <GraduationCap className="text-[#FFB31A] w-6 h-6" />
                                </div>
                                <span className="text-[11px] font-black uppercase tracking-widest text-[#FFB31A]">Special Program</span>
                            </div>
                            <h2 className="text-3xl md:text-5xl font-black italic tracking-tight uppercase mb-6 leading-tight">
                                NO TEACHING EXPERIENCE? <br /> JOIN OUR <span className="text-[#FFB31A]">TRAIN THE TRAINER.</span>
                            </h2>
                            <p className="text-slate-300 text-lg font-medium leading-relaxed mb-8 max-w-xl">
                                Turn your love for the game into a professional teaching career. Master pedagogy, class management, and advanced analysis.
                            </p>
                            <Link href="/train-the-trainer" className="inline-flex items-center gap-3 bg-[#FFB31A] text-[#2B3AA0] px-8 py-4 rounded-xl font-black uppercase tracking-widest text-sm hover:bg-white transition-all transform hover:-translate-y-1">
                                EXPLORE TRAINING <ArrowRight size={16} />
                            </Link>
                        </div>
                        <div className="lg:w-1/3 relative z-10">
                            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-inner">
                                <div className="text-4xl font-black text-[#FFB31A] mb-2 tracking-tighter italic leading-none">95%</div>
                                <div className="text-xs font-bold uppercase tracking-widest text-slate-300 mb-6 border-b border-white/10 pb-4">Placement Success</div>
                                <div className="space-y-4">
                                    {["Certified Mentorship", "Global Presence", "Stable Growth"].map(item => (
                                        <div key={item} className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest">
                                            <div className="w-1.5 h-1.5 rounded-full bg-[#FFB31A]"></div> {item}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* VALUES SECTION */}
            <section className="py-24 md:py-40">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {values.map((v, i) => (
                            <div key={i} className="text-center group">
                                <div className={`w-20 h-20 rounded-2xl mx-auto mb-8 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 ${isDark ? 'bg-white/5' : 'bg-[#2B3AA0]/5'}`}>
                                    <div className="text-[#FFB31A]">{v.icon}</div>
                                </div>
                                <h3 className="text-xl font-black uppercase tracking-tight mb-4">{v.title}</h3>
                                <p className={`text-sm leading-relaxed font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* OPEN POSITIONS */}
            <section className="py-24 md:py-40 bg-white/5 border-y border-white/5">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-20">
                            <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase mb-4">Current <span className="text-[#FFB31A]">Openings</span></h2>
                            <p className={`text-sm font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>We're always looking for strategic minds to join our mission.</p>
                        </div>

                        <div className="space-y-6">
                            {openPositions.map((job, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className={`p-8 md:p-10 rounded-3xl border transition-all duration-500 group relative overflow-hidden ${isDark ? 'bg-[#0F1A3A]/50 border-white/5 hover:border-[#FFB31A]/30' : 'bg-white border-slate-100 hover:border-[#FFB31A]/30 shadow-lg shadow-slate-200/50'}`}
                                >
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
                                        <div className="max-w-xl">
                                            <div className="flex flex-wrap gap-3 mb-4">
                                                <span className="px-3 py-1 bg-[#FFB31A]/10 text-[#FFB31A] text-[9px] font-black uppercase tracking-widest rounded-full">{job.type}</span>
                                                <span className="px-3 py-1 bg-white/5 text-slate-400 text-[9px] font-black uppercase tracking-widest rounded-full flex items-center gap-1.5 border border-white/5">
                                                    <MapPin size={10} /> {job.location}
                                                </span>
                                            </div>
                                            <h3 className="text-2xl font-black uppercase tracking-tight mb-4 group-hover:text-[#FFB31A] transition-colors">{job.title}</h3>
                                            <p className={`text-sm leading-relaxed font-medium mb-6 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{job.desc}</p>
                                            <div className="flex flex-wrap gap-2">
                                                {job.skills.map(s => (
                                                    <span key={s} className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter px-2 py-0.5 border border-slate-500/20 rounded-md">{s}</span>
                                                ))}
                                            </div>
                                        </div>
                                        <Link href="/contact" className="inline-flex items-center gap-3 bg-[#FFB31A] text-[#2B3AA0] px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#2B3AA0] hover:text-white transition-all shadow-xl shadow-[#FFB31A]/10">
                                            APPLY NOW <ChevronRight size={16} />
                                        </Link>
                                    </div>
                                    <div className="absolute right-0 bottom-0 opacity-[0.03] text-8xl font-black rotate-12 pointer-events-none group-hover:scale-125 transition-transform">
                                        THINQ
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-20 text-center p-12 rounded-[2rem] border border-dashed border-[#FFB31A]/30">
                            <h3 className="text-lg font-black uppercase tracking-tight mb-4">DON&apos;T SEE THE RIGHT FIT?</h3>
                            <p className={`text-sm font-medium mb-8 max-w-sm mx-auto ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>We still want to hear from you. Send your resume to our talent pool.</p>
                            <Link href="mailto:info@thinqchess.com" className="text-[#FFB31A] font-black uppercase tracking-widest text-[11px] hover:underline flex items-center justify-center gap-2">
                                info@thinqchess.com <ArrowRight size={14} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* CALL TO ACTION */}
            <section className="py-24 md:py-40 relative z-10">
                <div className="container mx-auto px-4 sm:px-6 text-center">
                    <h2 className="text-4xl md:text-6xl lg:text-8xl font-black italic tracking-tighter uppercase mb-12 leading-[0.85]">
                        DREAM. <br /> PLAY. <span className="text-[#FFB31A]">HIRE.</span>
                    </h2>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-block"
                    >
                        <Link href="/contact" className="bg-[#2B3AA0] text-white px-20 py-8 rounded-[2rem] font-black uppercase tracking-[0.3em] text-sm hover:bg-[#FFB31A] hover:text-[#2B3AA0] transition-all shadow-3xl">
                            TALK TO US
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default CareersPage;
