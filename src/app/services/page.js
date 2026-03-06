"use client";

import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
    MapPin, Globe, Users, UserCheck, CheckCircle2, Crown, Sparkles, ArrowUpRight, X, ArrowRight
} from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import Link from 'next/link';
import { useSiteData } from '@/components/SiteDataContext';

export default function ServicesPage() {
    const { isDark } = useTheme();
    const { media } = useSiteData();
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });



    return (
        <main ref={containerRef} className={`relative block overflow-hidden ${isDark ? 'bg-[#050A18] text-white' : 'bg-[#F2F4F7] text-[#2B3AA0]'}`}>

            {/* 1. ULTRA-IMMERSIVE CINEMATIC HERO */}
            <section className="relative h-[90vh] md:h-screen w-full flex items-center justify-center overflow-hidden">
                {/* Parallax Background */}
                <motion.div
                    style={{ y: useTransform(scrollYProgress, [0, 1], ['0%', '50%']) }}
                    className="absolute inset-0 w-full h-[120%]"
                >
                    <img loading="lazy" src={media.img_services_bg || "/assets/home/Practice time.jpeg"} alt="ThinQ Elite" className="w-full h-full object-cover scale-110" />
                </motion.div>

                {/* Advanced Gradient Overlays */}
                <div className="absolute inset-0 bg-black/40"></div>
                <div className={`absolute inset-0 bg-gradient-to-t ${isDark ? 'from-[#050A18] via-[#050A18]/60' : 'from-[#2B3AA0] via-[#2B3AA0]/60'} to-transparent`}></div>
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.8)_0%,transparent_50%,rgba(0,0,0,0.8)_100%)] opacity-80"></div>

                <div className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center mt-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }}
                        className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-xl mb-12 shadow-[0_0_30px_rgba(255,179,26,0.15)]"
                    >
                        <Crown size={14} className="text-[#FFB31A] fill-[#FFB31A]" />
                        <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white">The Pinnacle of Chess Education</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="text-6xl sm:text-8xl md:text-[11vw] font-black italic uppercase tracking-tighter leading-[0.8] text-white drop-shadow-2xl mix-blend-overlay"
                    >
                        LEARNING
                    </motion.h1>
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="text-6xl sm:text-8xl md:text-[11vw] font-black italic uppercase tracking-tighter leading-[0.8] text-transparent bg-clip-text bg-gradient-to-b from-[#FFB31A] to-[#D58C00] drop-shadow-[0_20px_40px_rgba(255,179,26,0.3)] mt-2"
                    >
                        ECOSYSTEM.
                    </motion.h1>
                </div>
            </section>

            {/* 2. THE OFFLINE EXPERIENCE (Bento Grid Style) */}
            <section id="offline" className={`py-32 relative z-20 -mt-20 rounded-t-[4rem] md:rounded-t-[6rem] ${isDark ? 'bg-[#050A18]' : 'bg-[#FAFAFA]'}`}>
                <div className="container mx-auto px-6 max-w-7xl">

                    {/* Section Header */}
                    <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 mb-20">
                        <div>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-xl bg-[#2B3AA0] text-white flex items-center justify-center shadow-lg"><MapPin size={24} /></div>
                                <span className="text-[10px] font-black tracking-[0.4em] uppercase text-[#FFB31A]">Physical Hubs</span>
                            </div>
                            <h2 className={`text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none ${isDark ? 'text-white' : 'text-[#2B3AA0]'}`}>
                                OFFLINE <br /> ACADEMY.
                            </h2>
                        </div>
                        <div className={`max-w-md text-base md:text-lg font-medium italic ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                            Immersive, hands-on training at our specialized Bangalore centers. The definitive environment for serious growth.
                        </div>
                    </div>

                    {/* Offline Bento Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[600px]">

                        {/* Immersive Image Panel (Col spans 7) */}
                        <div className="md:col-span-7 relative rounded-[2.5rem] overflow-hidden group">
                            <img loading="lazy" src="/assets/home/Internal Tournament.jpeg" className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" alt="Offline Hub" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                            <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end">
                                <div>
                                    <h3 className="text-4xl lg:text-5xl font-black uppercase tracking-tight text-white mb-4">Bangalore</h3>
                                    <div className="flex flex-wrap items-center gap-2 mb-4">
                                        {['Foundation', 'Intermediate', 'Advanced', 'Professional'].map(level => (
                                            <span key={level} className="px-3 py-1 rounded-md bg-white/10 backdrop-blur-md border border-white/20 text-[9px] font-black text-white uppercase tracking-[0.2em]">
                                                {level}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="hidden md:flex items-center gap-3">
                                        <span className="px-4 py-1.5 rounded-full bg-[#FFB31A] text-[#2B3AA0] text-[10px] font-bold uppercase tracking-wider">Face to Face</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Interactive Data Panel (Col spans 5) */}
                        <div className={`md:col-span-5 rounded-[2.5rem] p-10 flex flex-col justify-between border ${isDark ? 'bg-[#0A1128] border-white/5 shadow-[inset_0_0_80px_rgba(43,58,160,0.1)]' : 'bg-white border-slate-200 shadow-xl'}`}>
                            <div>
                                <div className="w-16 h-16 rounded-2xl bg-[#FFB31A]/10 flex items-center justify-center text-[#FFB31A] border border-[#FFB31A]/20 mb-8">
                                    <Users size={32} />
                                </div>
                                <h4 className={`text-3xl font-black uppercase italic tracking-tight mb-4 ${isDark ? 'text-white' : 'text-[#2B3AA0]'}`}>Group Sessions</h4>
                                <div className="text-[12px] font-bold uppercase tracking-widest text-[#FFB31A] mb-8">16 Students Maximum</div>

                                <div className="space-y-5">
                                    {[
                                        "Weekly Face-to-Face Training",
                                        "Game-oriented Learning with direct Feedback",
                                        "Interactive Board Evaluations",
                                        "Completion Certificate for Every Level"
                                    ].map((feat, i) => (
                                        <div key={i} className="flex items-start gap-4">
                                            <div className="mt-0.5 w-6 h-6 rounded-full bg-[#2B3AA0]/10 flex items-center justify-center shrink-0">
                                                <CheckCircle2 size={12} className="text-[#2B3AA0]" />
                                            </div>
                                            <span className={`text-[15px] font-semibold leading-snug ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{feat}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <Link href="/free-trial" className="mt-12 w-full group relative flex items-center justify-center gap-4 h-16 rounded-2xl bg-[#FFB31A] text-[#2B3AA0] overflow-hidden transition-all hover:scale-[1.02] shadow-[0_20px_40px_rgba(255,179,26,0.3)]">
                                <div className="absolute inset-0 bg-white translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-in-out"></div>
                                <span className="relative z-10 text-[11px] font-black uppercase tracking-[0.3em]">Book a Free Demo</span>
                                <ArrowUpRight size={18} className="relative z-10 transition-transform group-hover:rotate-45" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. THE ONLINE PLATFORM (Split Dark/Premium Presentation) */}
            <section className={`py-32 relative ${isDark ? 'bg-[#030611]' : 'bg-[#EAEFF5]'}`}>
                {/* Decorative Background blur */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[1000px] max-h-[1000px] bg-[#2B3AA0]/5 rounded-full blur-[120px] pointer-events-none"></div>

                <div className="container mx-auto px-6 max-w-7xl relative z-10">

                    {/* Section Header */}
                    <div className="text-center mb-24 flex flex-col items-center">
                        <div className="w-16 h-16 rounded-[1.2rem] bg-white shadow-xl flex items-center justify-center mb-8 border border-slate-100">
                            <Globe size={32} className="text-[#2B3AA0]" />
                        </div>
                        <div className="text-[10px] font-black tracking-[0.4em] uppercase text-[#FFB31A] mb-4">Digital Global Access</div>
                        <h2 className={`text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none ${isDark ? 'text-white' : 'text-[#2B3AA0]'}`}>
                            ONLINE PLATFORM.
                        </h2>
                    </div>

                    {/* The Two Online Modes */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

                        {/* ONLINE GROUP CARD */}
                        <motion.div
                            id="online-group"
                            initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }}
                            className={`rounded-[3rem] p-10 md:p-14 border shadow-2xl flex flex-col relative overflow-hidden group hover:-translate-y-2 transition-all duration-500 ${isDark ? 'bg-[#0A1128] border-[#111B3A]' : 'bg-white border-white'}`}
                        >
                            <div className="absolute top-0 right-0 w-48 h-48 bg-[#2B3AA0]/5 rounded-bl-full pointer-events-none transition-transform duration-700 group-hover:scale-150 group-hover:bg-[#2B3AA0]/10"></div>

                            <h3 className={`text-4xl md:text-5xl font-black italic uppercase tracking-tighter mb-4 ${isDark ? 'text-white' : 'text-[#2B3AA0]'}`}>Group <br /> Sessions</h3>
                            <div className="inline-block self-start px-4 py-1.5 rounded-lg bg-slate-100 dark:bg-white/5 text-[9px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-6 border border-slate-200 dark:border-white/10">
                                Interactive Cohorts
                            </div>

                            <div className="flex flex-wrap items-center gap-2 mb-10">
                                {['Foundation', 'Intermediate', 'Advanced', 'Professional'].map(level => (
                                    <span key={level} className={`px-2.5 py-1 rounded text-[8px] font-black uppercase tracking-[0.2em] ${isDark ? 'bg-[#2B3AA0]/20 text-[#FFB31A] border-[#2B3AA0]/30' : 'bg-[#2B3AA0]/5 text-[#2B3AA0] border-[#2B3AA0]/10'} border`}>
                                        {level}
                                    </span>
                                ))}
                            </div>

                            <div className="space-y-5 flex-1 relative z-10 mb-16">
                                {[
                                    "Small group sizes for focused learning",
                                    "Community learning environment & Peer motivation",
                                    "Active Group & Position Discussions",
                                    "Regular scheduled online tournaments",
                                    "Regular assignments & homework",
                                    "Comprehensive Online Evaluations",
                                    "Completion Certificate for Every Level"
                                ].map((feat, i) => (
                                    <div key={i} className="flex items-start gap-4">
                                        <div className="mt-1 w-2 h-2 rounded-full bg-[#FFB31A] shrink-0"></div>
                                        <span className={`text-[15px] font-medium leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{feat}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-4 relative z-10 mt-auto">
                                <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#FFB31A]/30 to-transparent"></div>
                                <Link href="/free-trial" className={`w-full py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] transition-all flex justify-center items-center gap-3 border ${isDark ? 'bg-transparent text-white border-white/20 hover:bg-white hover:text-[#0A1128]' : 'bg-[#FAFAFA] text-[#2B3AA0] border-slate-200 hover:bg-[#2B3AA0] hover:text-white'}`}>
                                    Book a Free Demo <ArrowRight size={14} />
                                </Link>
                            </div>
                        </motion.div>

                        {/* ONLINE 1-v-1 CARD (ULTRA PREMIUM) */}
                        <motion.div
                            id="one-on-one"
                            initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ delay: 0.2 }}
                            className={`rounded-[3rem] p-10 md:p-14 shadow-[0_40px_100px_rgba(43,58,160,0.25)] flex flex-col relative overflow-hidden group hover:-translate-y-2 transition-all duration-500 scale-[1.02] border ${isDark ? 'bg-gradient-to-b from-[#1E2D5A] to-[#0A1128] border-[#FFB31A]/20' : 'bg-[#2B3AA0] border-[#2B3AA0]'}`}
                        >
                            {/* Glassmorphism internal flair */}
                            <div className="absolute top-0 right-0 p-8">
                                <UserCheck size={80} className="text-white opacity-5 mix-blend-overlay -rotate-12" />
                            </div>

                            <h3 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter mb-4 text-white">1-On-1 <br /> Sessions</h3>
                            <div className="inline-block self-start px-4 py-1.5 rounded-lg bg-[#FFB31A] text-[9px] font-black uppercase tracking-widest text-[#2B3AA0] mb-6 shadow-[0_0_20px_rgba(255,179,26,0.3)]">
                                Elite Specialized Focus
                            </div>

                            <div className="flex flex-wrap items-center gap-2 mb-10">
                                {['Foundation', 'Intermediate', 'Advanced', 'Professional'].map(level => (
                                    <span key={level} className="px-2.5 py-1 rounded text-[8px] font-black uppercase tracking-[0.2em] bg-white/10 text-white border border-white/20">
                                        {level}
                                    </span>
                                ))}
                            </div>

                            <div className="space-y-5 flex-1 relative z-10 mb-16">
                                {[
                                    "Dedicated specialized Trainer attention",
                                    "Customized and flexible scheduling",
                                    "Teaching pace tailored to the Child's capability",
                                    "Access to regular online tournaments",
                                    "Personalized assignments & deep analysis",
                                    "1-on-1 Online Evaluations",
                                    "Completion Certificate for Every Level"
                                ].map((feat, i) => (
                                    <div key={i} className="flex items-start gap-4">
                                        <div className="mt-1 w-5 h-5 rounded-full bg-white/10 flex items-center justify-center shrink-0 border border-white/20">
                                            <Sparkles size={10} className="text-[#FFB31A] fill-[#FFB31A]" />
                                        </div>
                                        <span className={`text-[15px] font-medium leading-relaxed text-slate-100`}>{feat}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="relative z-10 mt-auto">
                                <Link href="/free-trial" className="w-full h-16 rounded-2xl bg-[#FFB31A] text-[#2B3AA0] font-black uppercase tracking-[0.2em] text-[11px] transition-all flex justify-center items-center gap-3 overflow-hidden group/btn relative shadow-2xl">
                                    <div className="absolute inset-0 w-0 bg-white transition-all duration-[400ms] ease-out group-hover/btn:w-full"></div>
                                    <span className="relative z-10 group-hover/btn:text-[#2B3AA0]">Book a Free Demo</span>
                                    <ArrowUpRight size={16} className="relative z-10 transition-transform group-hover/btn:rotate-45" />
                                </Link>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </section>

        </main>
    );
}
