"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
    ArrowRight, Star, Crown, Target, Brain, Heart,
    Users, Trophy, BookOpen, Shield, Lightbulb,
    GraduationCap, TrendingUp, Award, ChevronRight,
    Quote, Mail, Linkedin, Twitter, Facebook
} from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';

// Animated counter component
const AnimatedCounter = ({ value, suffix = "", label, icon: Icon }) => {
    const ref = React.useRef(null);
    const [count, setCount] = React.useState(0);
    const [isVisible, setIsVisible] = React.useState(false);

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isVisible) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.3 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [isVisible]);

    React.useEffect(() => {
        if (!isVisible) return;
        const duration = 2000;
        const steps = 60;
        const increment = value / steps;
        let current = 0;
        const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
                setCount(value);
                clearInterval(timer);
            } else {
                setCount(Math.floor(current));
            }
        }, duration / steps);
        return () => clearInterval(timer);
    }, [isVisible, value]);

    return (
        <div ref={ref} className="text-center group">
            <div className="flex justify-center mb-4">
                <div className="w-14 h-14 rounded-xl bg-[#FFB31A]/10 flex items-center justify-center group-hover:bg-[#FFB31A]/20 transition-colors duration-500">
                    <Icon className="w-6 h-6 text-[#FFB31A]" />
                </div>
            </div>
            <div className="text-4xl md:text-5xl lg:text-6xl font-black text-[#FFB31A] mb-2 tabular-nums">
                {count.toLocaleString()}{suffix}
            </div>
            <div className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">{label}</div>
        </div>
    );
};

export default function AboutPage() {
    const { isDark } = useTheme();

    const values = [
        {
            icon: Brain,
            title: "Think Beyond Moves",
            desc: "We train children to think critically, not just memorize openings. Every lesson builds deeper cognitive patterns."
        },
        {
            icon: Heart,
            title: "Nurture With Care",
            desc: "Every child's journey is unique. We celebrate small wins and guide through losses with empathy and patience."
        },
        {
            icon: Target,
            title: "Structured Growth",
            desc: "From Foundation to Professional — our curriculum ensures measurable, step-by-step progress for every student."
        },
        {
            icon: Shield,
            title: "Academy System",
            desc: "A strong, system-driven training framework ensures continuity, consistency, and long-term support."
        },
        {
            icon: Lightbulb,
            title: "Holistic Development",
            desc: "Regular PTMs, psychology sessions, and mentorship programs create a well-rounded environment for sustained growth."
        },
        {
            icon: TrendingUp,
            title: "Competitive Edge",
            desc: "Regular tournaments build confidence, resilience, and a championship mindset in every young player."
        }
    ];

    const milestones = [
        { year: "2020", event: "ThinQ Chess founded with a vision to raise thinkers, not just players" },
        { year: "2021", event: "Launched online chess programs reaching students across India" },
        { year: "2022", event: "Expanded to multiple centers across Bangalore with growing community" },
        { year: "2023", event: "Introduced Elite Batch program for high-potential competitive players" },
        { year: "2024", event: "Crossed 15,000+ young thinkers with national & international presence" },
        { year: "2025", event: "Pioneering Train the Trainer programs and advanced training systems" }
    ];

    const ourTeam = [
        {
            img: "/images/head-coach.jpeg",
            name: "Krishna Thapa",
            role: "Head Trainer & Founder",
            content: "I began playing chess at 8 and went on to win gold at the 2019 Asian Amateur Championship. With a peak FIDE rating of 2180, I’ve played legends like Harikrishna, Wei Yi, and Dubov. I’ve also scored wins against several Grandmasters and IMs. Since 2008, I’ve mentored players across Australia, Thailand, Nepal, and India.",
            isScrollable: false,
        },
        {
            img: "/images/Chiranth.jpg",
            name: "Chiranth M D",
            role: "Head Trainer & Co-Founder",
            content: "With 18 years in chess, I’ve won 100+ trophies and represented Karnataka at SGFI Nationals. I was Category C Champion at the 2025 Bengaluru International GM Tournament. As a trainer for 5 years, I’ve guided students to FIDE ratings and national titles.",
            isScrollable: false,
        },
        {
            img: "/images/third-trainer.png",
            name: "Adarsh Sanklecha",
            role: "Trainer",
            content: "I started playing chess at the age of eight and began competing professionally by the time I was thirteen. I secured 2nd place in the U-19 state-level tournaments and have participated in four national events. As the co-founder of Chess City Raipur, I’ve been working to make chess more accessible. For me, chess is more than a sport; it’s a way of life.",
            isScrollable: true,
        },
        {
            img: "/images/janhavi.jpeg",
            name: "Janhavi Soneji",
            role: "Trainer",
            content: "I’m Janhavi Soneji, a Chartered Accountant who turned a childhood love for chess into a meaningful journey. I started playing at seven and have earned multiple state and national accolades since. I’m a three-time DSO national champion, three-time state champion, and secured 5th place at the U-17 Nationals.",
            isScrollable: true,
        },
    ];

    return (
        <main className={`min-h-screen ${isDark ? 'bg-[#0A1128]' : 'bg-white'}`}>

            {/* ===== HERO BANNER ===== */}
            <section className="relative min-h-[80vh] md:min-h-[90vh] flex items-center justify-center overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <img
                        src="/assets/For website/Academy photo.jpeg"
                        alt="About ThinQ Chess"
                        className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0A1128]/70 via-[#2B3AA0]/50 to-[#0A1128]/85"></div>
                </div>

                {/* Subtle pattern */}
                <div className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                ></div>

                {/* Content */}
                <div className="relative z-10 text-center px-4 sm:px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <div className="inline-flex items-center gap-3 text-[#FFB31A] font-black uppercase tracking-[0.3em] text-[9px] sm:text-[10px] mb-8 px-6 py-2 border-l-4 border-[#FFB31A] bg-white/5">
                            <Star className="w-3 h-3 fill-[#FFB31A]" />
                            Est. 2020 • Bangalore, India
                        </div>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] tracking-tight mb-8"
                    >
                        A STORY THAT <br />
                        BEGINS <span className="text-[#FFB31A]">BEFORE</span> <br />
                        <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">THE FIRST MOVE.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="text-base sm:text-lg md:text-xl text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed mb-10"
                    >
                        Not just producing champions — raising thinkers who believe in themselves.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                    >
                        <Link href="/free-trial" className="btn-gold px-12 py-5 text-sm font-black tracking-[0.2em] rounded-lg inline-flex items-center group shadow-xl shadow-black/20">
                            <span className="relative z-10">BOOK A FREE TRIAL CLASS</span>
                            <ArrowRight className="ml-4 w-4 h-4 group-hover:translate-x-2 transition-transform" />
                        </Link>
                    </motion.div>
                </div>

                {/* Bottom gradient fade */}
                <div className={`absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t ${isDark ? 'from-[#0A1128]' : 'from-white'} to-transparent`}></div>
            </section>

            {/* ===== FOUNDERS' NOTE ===== */}
            <section className={`py-16 md:py-24 lg:py-32 overflow-hidden ${isDark ? 'bg-[#0A1128]' : 'bg-white'}`}>
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
                        {/* Content */}
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="lg:col-span-6"
                        >
                            <div className={`inline-flex items-center gap-3 text-[#FFB31A] font-black uppercase tracking-[0.3em] text-[9px] sm:text-[10px] mb-8 px-6 py-2 border-l-4 border-[#FFB31A] ${isDark ? 'bg-white/5' : 'bg-[#2B3AA0]/5'}`}>
                                Welcome To ThinQ Chess
                            </div>

                            <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[0.9] tracking-tight mb-8 md:mb-10 ${isDark ? 'text-white' : 'text-[#2B3AA0]'}`}>
                                FOUNDERS&apos; <br />
                                <span className="text-[#FFB31A]">NOTE.</span>
                            </h2>

                            <div className="space-y-6">
                                <p className={`text-base md:text-lg leading-relaxed font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                                    ThinQ Chess began with its founders, who saw more than black-and-white squares. They saw a way to help children build confidence, resilience, and the ability to think through every challenge, on the board and beyond.
                                </p>
                                <p className={`text-base md:text-lg leading-relaxed font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                                    The founders&apos; vision came from a deep need to do things differently—to create a space that wasn&apos;t just about producing champions but <span className="text-[#FFB31A] font-bold">raising thinkers</span>. Today, we proudly run a growing academy where children aren&apos;t just learning chess; they&apos;re learning how to believe in themselves.
                                </p>

                                <div className={`border-l-4 border-[#FFB31A] pl-6 py-2 ${isDark ? 'bg-white/5' : 'bg-slate-50'} rounded-r-lg`}>
                                    <p className={`text-base md:text-lg italic font-bold leading-relaxed ${isDark ? 'text-white' : 'text-[#2B3AA0]'}`}>
                                        &ldquo;Every batch, every parent-teacher call, every game day reminds us why we started.&rdquo;
                                    </p>
                                </div>
                            </div>

                            <div className="mt-10">
                                <Link href="/free-trial" className="group flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] text-[#FFB31A] hover:text-[#2B3AA0] dark:hover:text-white transition-colors">
                                    START YOUR CHILD&apos;S JOURNEY
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                                </Link>
                            </div>
                        </motion.div>

                        {/* Image */}
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="lg:col-span-6 relative"
                        >
                            <div className="relative">
                                <div className="rounded-2xl overflow-hidden shadow-2xl">
                                    <img
                                        src="/assets/For website/Chess Board vision.jpeg"
                                        alt="ThinQ Chess Founders"
                                        className="w-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-1000"
                                    />
                                </div>
                                {/* Decorative accent */}
                                <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-[#FFB31A]/20 rounded-2xl -z-10"></div>

                                {/* Floating badge */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.6 }}
                                    className={`absolute -bottom-6 -left-4 sm:-left-6 px-6 sm:px-8 py-4 sm:py-6 shadow-2xl font-black italic text-lg sm:text-xl tracking-tight rounded-xl ${isDark ? 'bg-[#111B3A] text-white border border-[#1E2D5A]' : 'bg-white text-[#2B3AA0]'}`}
                                >
                                    &ldquo;RAISING <span className="text-[#FFB31A]">THINKERS.</span>&rdquo;
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ===== STATS BAR ===== */}
            <section className="relative py-16 md:py-20 bg-[#2B3AA0] overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                ></div>
                <div className="container mx-auto px-4 sm:px-6 relative z-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                        <AnimatedCounter value={15000} suffix="+" label="Young Thinkers" icon={Users} />
                        <AnimatedCounter value={100} suffix="+" label="Tournaments" icon={Trophy} />
                        <AnimatedCounter value={50} suffix="+" label="Expert Trainers" icon={GraduationCap} />
                        <AnimatedCounter value={5} suffix=".0" label="Google Rating" icon={Star} />
                    </div>
                </div>
            </section>

            {/* ===== OUR VALUES ===== */}
            <section className={`py-16 md:py-24 lg:py-32 overflow-hidden ${isDark ? 'bg-[#0D1630]' : 'bg-slate-50'}`}>
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="text-center max-w-4xl mx-auto mb-16 md:mb-20">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className={`inline-block px-6 py-2 border-l-4 border-[#FFB31A] text-[10px] font-black uppercase tracking-[0.4em] mb-8 ${isDark ? 'bg-white/5 text-[#FFB31A]' : 'bg-[#2B3AA0]/5 text-[#2B3AA0]'}`}
                        >
                            What Drives Us
                        </motion.div>
                        <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black leading-[0.9] tracking-tight mb-8 ${isDark ? 'text-white' : 'text-[#2B3AA0]'}`}>
                            OUR CORE <br />
                            <span className="text-[#FFB31A]">VALUES.</span>
                        </h2>
                        <p className={`text-base md:text-xl font-medium leading-relaxed max-w-2xl mx-auto ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                            At ThinQ Chess, we believe chess is more than a game—it&apos;s a powerful way to shape young minds. These principles guide everything we do.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {values.map((item, i) => {
                            const Icon = item.icon;
                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.08, duration: 0.6 }}
                                    viewport={{ once: true }}
                                    className={`relative p-8 lg:p-10 shadow-lg border hover:shadow-xl hover:border-[#FFB31A]/30 transition-all duration-500 group rounded-xl ${isDark ? 'bg-[#111B3A] border-[#1E2D5A]' : 'bg-white border-slate-100'}`}
                                >
                                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#FFB31A]/10 transition-colors duration-500 ${isDark ? 'bg-white/5' : 'bg-[#2B3AA0]/5'}`}>
                                        <Icon className={`w-6 h-6 group-hover:text-[#FFB31A] transition-colors duration-500 ${isDark ? 'text-[#FFB31A]' : 'text-[#2B3AA0]'}`} />
                                    </div>
                                    <h4 className={`text-lg font-black uppercase tracking-tight mb-3 ${isDark ? 'text-white' : 'text-[#2B3AA0]'}`}>
                                        {item.title}
                                    </h4>
                                    <p className={`text-sm font-medium leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                                        {item.desc}
                                    </p>
                                    <div className="absolute bottom-0 left-0 w-0 h-1 bg-[#FFB31A] group-hover:w-full transition-all duration-700 rounded-b-xl"></div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ===== OUR JOURNEY TIMELINE ===== */}
            <section className={`py-16 md:py-24 lg:py-32 overflow-hidden ${isDark ? 'bg-[#0A1128]' : 'bg-white'}`}>
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="text-center max-w-4xl mx-auto mb-16 md:mb-20">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className={`inline-block px-6 py-2 border-l-4 border-[#FFB31A] text-[10px] font-black uppercase tracking-[0.4em] mb-8 ${isDark ? 'bg-white/5 text-[#FFB31A]' : 'bg-[#2B3AA0]/5 text-[#2B3AA0]'}`}
                        >
                            Our Story
                        </motion.div>
                        <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black leading-[0.9] tracking-tight mb-8 ${isDark ? 'text-white' : 'text-[#2B3AA0]'}`}>
                            OUR <br />
                            <span className="text-[#FFB31A]">JOURNEY.</span>
                        </h2>
                    </div>

                    <div className="relative max-w-4xl mx-auto">
                        {/* Center line */}
                        <div className={`absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 ${isDark ? 'bg-white/10' : 'bg-[#2B3AA0]/10'}`}></div>

                        {milestones.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className={`relative flex items-center mb-8 md:mb-12 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                            >
                                {/* Timeline dot */}
                                <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-[#FFB31A] rounded-full transform -translate-x-1/2 z-10 shadow-lg shadow-[#FFB31A]/30"></div>

                                {/* Content card */}
                                <div className={`ml-12 md:ml-0 md:w-[45%] ${i % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                                    <div className={`p-6 rounded-xl shadow-lg border ${isDark ? 'bg-[#111B3A] border-[#1E2D5A]' : 'bg-white border-slate-100'}`}>
                                        <div className="text-[#FFB31A] text-2xl font-black mb-2">{item.year}</div>
                                        <p className={`text-sm font-medium leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{item.event}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== OUR VISION ===== */}
            <section className="py-16 md:py-24 lg:py-32 bg-[#2B3AA0] relative overflow-hidden text-white">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                ></div>
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
                        <div className="lg:col-span-6 order-2 lg:order-1 relative">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="relative z-10"
                            >
                                <div className="rounded-2xl overflow-hidden border-4 border-white/10">
                                    <img src="/assets/For website/IMG_8974.JPG" className="w-full shadow-2xl" alt="Our Vision" />
                                </div>
                                <div className="absolute -bottom-4 sm:-bottom-6 -left-2 sm:-left-6 bg-white text-[#2B3AA0] p-4 sm:p-6 px-6 sm:px-8 shadow-2xl font-black italic text-base sm:text-xl tracking-tight rounded-xl">
                                    &quot;RAISING <span className="text-[#FFB31A]">THINKERS.</span>&quot;
                                </div>
                            </motion.div>
                        </div>

                        <div className="lg:col-span-6 order-1 lg:order-2">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <div className="text-[#FFB31A] text-[10px] font-black uppercase tracking-[0.4em] mb-8">The Core Mission</div>
                                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-8 md:mb-10 italic leading-tight">OUR <br /> <span className="text-[#FFB31A]">VISION.</span></h2>
                                <div className="space-y-8">
                                    <p className="text-base md:text-xl font-bold leading-relaxed text-slate-100">
                                        &quot;ThinQ Chess started with a simple belief—that every child possesses immense potential waiting to be unlocked.&quot;
                                    </p>
                                    <p className="text-base md:text-lg text-slate-300 leading-relaxed border-l-2 border-white/10 pl-6">
                                        Witnessing how chess helps children build focus, patience, and decision-making skills, our founders envisioned creating more than just a training center. They aimed to build an academy where logical reasoning and emotional intelligence go hand in hand.
                                    </p>
                                    <div className="pt-8">
                                        <Link href="/free-trial" className="group flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] hover:text-[#FFB31A] transition-colors">
                                            START YOUR CHILD&apos;S JOURNEY
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== PHILOSOPHY / WHAT WE BELIEVE ===== */}
            <section className={`py-16 md:py-24 lg:py-32 overflow-hidden ${isDark ? 'bg-[#0D1630]' : 'bg-slate-50'}`}>
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
                        {/* Image */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="lg:col-span-5"
                        >
                            <div className="relative">
                                <div className="rounded-2xl overflow-hidden shadow-2xl">
                                    <img
                                        src="/assets/For website/Thinq Chess Tournament.jpeg"
                                        alt="ThinQ Chess Academy"
                                        className="w-full object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-1000"
                                    />
                                </div>
                                <div className="absolute -bottom-4 -left-4 w-full h-full border-2 border-[#2B3AA0]/20 rounded-2xl -z-10"></div>
                            </div>
                        </motion.div>

                        {/* Content */}
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="lg:col-span-7"
                        >
                            <div className={`inline-flex items-center gap-3 text-[#FFB31A] font-black uppercase tracking-[0.3em] text-[9px] sm:text-[10px] mb-8 px-6 py-2 border-l-4 border-[#FFB31A] ${isDark ? 'bg-white/5' : 'bg-[#2B3AA0]/5'}`}>
                                Our Belief System
                            </div>

                            <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[0.9] tracking-tight mb-8 md:mb-10 ${isDark ? 'text-white' : 'text-[#2B3AA0]'}`}>
                                BEYOND THE <br />
                                <span className="text-[#FFB31A]">CHESSBOARD.</span>
                            </h2>

                            <div className="space-y-6">
                                <p className={`text-base md:text-lg leading-relaxed font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                                    Our programs are designed for children aged 5 years and above, helping them develop focus, strategic thinking, and confidence that extends far beyond the chessboard.
                                </p>
                                <p className={`text-base md:text-lg leading-relaxed font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                                    Every class, every move, and every tournament is thoughtfully planned to sharpen thinking skills while keeping learning fun, engaging, and age-appropriate.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                                {[
                                    "Parent-Teacher Meetings",
                                    "Online Tournaments",
                                    "Psychology Sessions",
                                    "Mentorship Programs",
                                    "Progress Tracking",
                                    "Elite Batch Program"
                                ].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        viewport={{ once: true }}
                                        className={`flex items-center gap-3 text-sm font-bold px-4 py-3 rounded-lg ${isDark ? 'text-white bg-white/5' : 'text-[#2B3AA0] bg-white'}`}
                                    >
                                        <div className="w-2 h-2 bg-[#FFB31A] rounded-full shrink-0"></div>
                                        {item}
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ===== WHAT PARENTS SAY ===== */}
            <section className={`py-16 md:py-24 lg:py-32 overflow-hidden ${isDark ? 'bg-[#0A1128]' : 'bg-white'}`}>
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="text-center mb-16 md:mb-20">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="text-[#FFB31A] font-black uppercase tracking-[0.4em] text-[10px] mb-6"
                        >
                            Parent Stories
                        </motion.div>
                        <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black italic leading-tight tracking-tight uppercase ${isDark ? 'text-white' : 'text-[#2B3AA0]'}`}>
                            VOICES OF <span className="text-[#FFB31A]">TRUST</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
                        {[
                            {
                                quote: "ThinQ Chess, Akshayanagar, Bangalore branch is located at a prime location with all the right amenities and facilities available for the kids. Teachers, coordinators and the complete management team are very focused and supportive to help the kids address their issues and keep the motivation high. Positive learning environment.",
                                author: "Swarup Ranjan Sahoo",
                                subtitle: "Father of Shreyanshi"
                            },
                            {
                                quote: "Really I felt very happy about my son focus towards the game and the trainer is so passionate to bring my kid practicing, and remember. We felt every grandmaster started right where it starts from here.",
                                author: "Lakshmi",
                                subtitle: "Mother of Ritvik"
                            },
                            {
                                quote: "Founders have the ideal mindset to nurture and develop emerging talent. My son's journey so far has been steady with lots of chess related learnings, more importantly he is emotionally learning how to cope with wins and losses.",
                                author: "Manoj",
                                subtitle: "Father of Kavish"
                            },
                            {
                                quote: "Open to feedback and very interactive team. Love the mix of theory and practical classes. My son looks up to his trainers for feedback and guidance. Organize tournaments for students to experience real world scenarios.",
                                author: "Manoj",
                                subtitle: "Continued Testimony"
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className={`p-8 lg:p-10 shadow-lg rounded-xl border hover:shadow-xl transition-shadow relative ${isDark ? 'bg-[#111B3A] border-[#1E2D5A]' : 'bg-slate-50 border-slate-100'}`}
                            >
                                <div className="flex gap-1 mb-6">
                                    {[...Array(5)].map((_, j) => (
                                        <Star key={j} className="w-4 h-4 fill-[#FFB31A] text-[#FFB31A]" />
                                    ))}
                                </div>
                                <div className={`text-6xl absolute top-6 right-8 font-serif leading-none ${isDark ? 'text-white/5' : 'text-[#2B3AA0]/5'}`}>&ldquo;</div>
                                <p className={`text-base font-medium italic mb-8 leading-relaxed relative z-10 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                                    {item.quote}
                                </p>
                                <div className={`border-t pt-6 ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
                                    <div className={`text-base font-black uppercase tracking-tight ${isDark ? 'text-white' : 'text-[#2B3AA0]'}`}>{item.author}</div>
                                    <div className="text-[#FFB31A] text-[10px] font-black uppercase tracking-widest mt-1">{item.subtitle}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== FINAL CTA ===== */}
            <section className="py-20 md:py-32 lg:py-40 bg-[#2B3AA0] text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent opacity-20"></div>
                <div className="container mx-auto px-4 sm:px-6 relative z-10">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <Crown className="w-16 h-16 text-[#FFB31A] mx-auto mb-10 opacity-80" />
                        </motion.div>
                        <motion.h2
                            initial={{ scale: 0.9, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-white mb-8 md:mb-10 tracking-tight leading-tight italic uppercase"
                        >
                            READY TO <br /> <span className="text-[#FFB31A]">BEGIN?</span>
                        </motion.h2>
                        <p className="text-xl md:text-2xl text-slate-300 font-medium mb-16 max-w-2xl mx-auto opacity-90 leading-relaxed">
                            Give your child the gift of strategic thinking. Start with a free trial session today.
                        </p>
                        <Link href="/free-trial" className="btn-gold px-10 sm:px-16 lg:px-20 py-5 sm:py-6 lg:py-7 text-sm sm:text-base font-black tracking-widest shadow-[0px_30px_80px_rgba(255,179,26,0.3)] transform hover:scale-105 transition-all duration-500 rounded-lg inline-block">
                            BOOK A FREE TRIAL CLASS
                        </Link>
                    </div>
                </div>
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white/5 rounded-full blur-[100px]"></div>
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#FFB31A]/10 rounded-full blur-[100px]"></div>
            </section>
        </main>
    );
}
