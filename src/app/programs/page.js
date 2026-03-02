"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, BookOpen, Trophy, Users, Monitor, Target, Crown, CheckCircle2, X } from 'lucide-react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useTheme } from '@/components/ThemeProvider';
import { useSiteData } from '@/components/SiteDataContext';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import Link from 'next/link';



export default function ProgramsPage() {
    const { isDark } = useTheme();
    const { media } = useSiteData();

    const programs = [
        {
            id: "foundation",
            title: "Foundation",
            subtitle: "Initiating the Journey",
            image: "/assets/home/Course completion photo 1.jpeg",
            points: [
                "Detailed study materials",
                "Regular Assignments",
                "Bi-weekly online tournaments",
                "Regular PTMs",
                "Written and practical exam for final evaluation"
            ],
            outcome: "Students develop a strong understanding of basic chess rules, piece movement, simple tactics, and sportsmanship. They gain confidence to play complete games independently and participate in beginner-level tournaments.",
            accent: "#FFB31A"
        },
        {
            id: "intermediate",
            title: "Intermediate",
            subtitle: "Mastering Fundamentals",
            image: "/assets/home/Internal Tournament.jpeg",
            points: [
                "Detailed study materials",
                "Regular Assignments",
                "Bi-weekly online tournaments",
                "Regular PTMs",
                "Written and practical exam for final evaluation"
            ],
            outcome: "Students strengthen tactical awareness, learn core opening principles and basic endgames, and improve calculation skills. They become consistent tournament players with better decision-making and game analysis ability and become ready to play local, state and national tournaments.",
            accent: "#4F46E5"
        },
        {
            id: "advanced",
            title: "Advanced",
            subtitle: "Strategic Excellence",
            image: "/assets/home/Monthly Award.jpeg",
            points: [
                "Detailed study materials",
                "Regular Assignments",
                "Bi-weekly online tournaments",
                "Regular PTMs",
                "Written and practical exam for final evaluation"
            ],
            outcome: "Students master complex tactics, positional understanding, structured openings, and advanced endgames. They learn to analyze their own games deeply and compete effectively in rated tournaments.",
            accent: "#EF4444"
        },
        {
            id: "professional",
            title: "Professional",
            subtitle: "Elite Preparation",
            image: "/assets/home/Course completion photo 3.jpeg",
            points: [
                "Detailed study materials",
                "Regular Assignments",
                "Bi-weekly online tournaments",
                "Regular PTMs",
                "Written and practical exam for final evaluation"
            ],
            outcome: "Students prepare for high-performance and professional play with deep opening preparation, strategic planning, psychological readiness, and advanced analysis. They are equipped to compete at national and international levels with long-term chess development goals.",
            accent: "#10B981"
        }
    ];

    return (
        <div className={`min-h-screen ${isDark ? 'bg-[#050A18]' : 'bg-[#FAFAFA]'}`}>
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img loading="lazy" src={media.img_programs_bg || "/assets/home/Practice time.jpeg"} alt="Chess Journey" className="w-full h-full object-cover opacity-20" />
                    <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-b from-[#050A18]/90 via-[#050A18]/60 to-[#050A18]' : 'bg-gradient-to-b from-white/90 via-white/80 to-[#FAFAFA]'}`}></div>
                </div>

                <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-block px-4 py-1.5 rounded-full border border-[#FFB31A]/30 bg-[#FFB31A]/10 text-[#FFB31A] text-[10px] font-black uppercase tracking-[0.3em] mb-6">
                        Structured Curriculum
                    </motion.div>
                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className={`text-5xl md:text-7xl lg:text-8xl font-black uppercase italic tracking-tighter leading-none mb-6 ${isDark ? 'text-white' : 'text-[#2B3AA0]'}`}>
                        COURSE <br /> <span className="text-[#FFB31A]">DETAILS.</span>
                    </motion.h1>
                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className={`text-lg md:text-xl font-medium max-w-2xl mx-auto ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        From learning how the pieces move to competing at the grandmaster level, our progressive curriculum is built for absolute mastery.
                    </motion.p>
                </div>
            </section>

            {/* The 4 Programs */}
            <section className="py-12 md:py-24">
                <div className="container mx-auto px-6 space-y-32">
                    {programs.map((program, index) => (
                        <div key={program.id} id={program.id} className={`flex flex-col lg:flex-row gap-12 lg:gap-20 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>

                            {/* Image Side */}
                            <motion.div initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.7 }} className="w-full lg:w-1/2">
                                <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl group border border-white/5">
                                    <img loading="lazy" src={program.image} alt={program.title} className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80"></div>
                                    <div className="absolute bottom-6 left-6 right-6">
                                        <div className="flex items-center gap-3">
                                            <div className="text-[12px] font-black uppercase tracking-[0.3em] text-[#FFB31A]">LEVEL 0{index + 1}</div>
                                            <div className="flex-1 h-[1px] bg-white/20"></div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Content Side */}
                            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.5, delay: 0.2 }} className="w-full lg:w-1/2 overflow-hidden">

                                <div className="inline-block px-3 py-1 rounded-md bg-[#FFB31A]/10 text-[#FFB31A] text-[9px] font-black uppercase tracking-widest mb-4">
                                    {program.subtitle}
                                </div>
                                <h2 className={`text-4xl md:text-5xl lg:text-6xl font-black uppercase italic tracking-tighter mb-8 ${isDark ? 'text-white' : 'text-[#2B3AA0]'}`}>
                                    {program.title}
                                </h2>

                                {/* Features List */}
                                <ul className="space-y-4 mb-10">
                                    {program.points.map((point, i) => (
                                        <li key={i} className="flex items-start gap-4">
                                            <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center shrink-0 mt-0.5 border border-slate-200 dark:border-white/10">
                                                <Target size={12} className="text-[#FFB31A]" />
                                            </div>
                                            <span className={`text-base font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{point}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* Outcome Box */}
                                <div className={`p-6 sm:p-8 rounded-2xl mb-10 border relative overflow-hidden ${isDark ? 'bg-white/5 border-white/10' : 'bg-[#2B3AA0]/5 border-[#2B3AA0]/10'}`}>
                                    <div className="absolute top-0 left-0 w-1 h-full bg-[#FFB31A]"></div>
                                    <h4 className={`text-[10px] font-black uppercase tracking-[0.2em] mb-3 ${isDark ? 'text-white' : 'text-[#2B3AA0]'}`}>The Outcome</h4>
                                    <p className={`text-sm md:text-base leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                                        {program.outcome}
                                    </p>
                                </div>

                                <Link href="/free-trial" className="group relative inline-flex items-center gap-4 bg-[#FFB31A] text-[#2B3AA0] px-8 py-4 text-[11px] font-black uppercase tracking-[0.2em] rounded-xl hover:bg-[#2B3AA0] hover:text-white transition-all duration-500 overflow-hidden shadow-[0_15px_30px_rgba(255,179,26,0.3)] hover:shadow-[0_20px_40px_rgba(43,58,160,0.3)]">
                                    <span className="relative z-10">Book a Free Demo</span>
                                    <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                                </Link>

                            </motion.div>
                        </div>
                    ))}
                </div>
            </section>

            <Footer />
        </div>
    );
}
