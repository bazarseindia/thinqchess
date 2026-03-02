"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Trophy, Sparkles, Target, Crown } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';

const CategoryButtons = () => {
    const { isDark } = useTheme();
    const categories = [
        {
            title: "Foundation",
            desc: "For absolute beginners initiating their journey into the world of 64 squares.",
            num: "01",
            icon: Sparkles,
            img: "/assets/home/Course completion photo 1.jpeg",
            href: "/registration"
        },
        {
            title: "Intermediate",
            desc: "Mastering the fundamental tactics and building a strong positional understanding.",
            num: "02",
            icon: Target,
            img: "/assets/home/Internal Tournament.jpeg",
            href: "/registration"
        },
        {
            title: "Advanced",
            desc: "Strategic excellence for competitive players aiming for precise calculation.",
            num: "03",
            icon: Trophy,
            img: "/assets/home/Academy photo.jpeg",
            imgClass: "object-top",
            href: "/registration"
        },
        {
            title: "Professional",
            desc: "Elite level preparation focused on opening novelties and complex endgames.",
            num: "04",
            icon: Crown,
            img: "/assets/home/Practice time.jpeg",
            href: "/registration"
        }
    ];

    return (
        <section className={`py-24 md:py-32 relative z-10 overflow-hidden ${isDark ? 'bg-[#050A18]' : 'bg-[#F2F4F7]'}`}>

            {/* The Winding Vector Path (Desktop Only) */}
            <div className="absolute top-[40%] left-0 w-full h-40 hidden lg:block -z-10 pointer-events-none opacity-30">
                <svg width="100%" height="100%" viewBox="0 0 1440 160" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <motion.path
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                        viewport={{ once: true, margin: "-100px" }}
                        d="M0,80 C300,-40 500,200 700,80 C900,-40 1100,200 1440,80"
                        stroke="url(#gradientPath)" strokeWidth="6" strokeDasharray="16 16"
                    />
                    <defs>
                        <linearGradient id="gradientPath" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#2B3AA0" />
                            <stop offset="50%" stopColor="#FFB31A" />
                            <stop offset="100%" stopColor="#2B3AA0" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-20 md:mb-32 max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block px-4 py-1.5 rounded-full border border-[#FFB31A]/30 bg-[#FFB31A]/10 text-[#FFB31A] text-[9px] font-black uppercase tracking-[0.3em] mb-6"
                    >
                        The Mastery Path
                    </motion.div>
                    <h2 className={`text-4xl md:text-5xl lg:text-7xl font-black italic uppercase tracking-tighter leading-none mb-6 ${isDark ? 'text-white' : 'text-[#2B3AA0]'}`}>
                        YOUR CHESS <br /><span className="text-[#FFB31A]">JOURNEY.</span>
                    </h2>
                    <p className={`text-base md:text-xl font-medium max-w-2xl mx-auto ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        Follow our structured timeline from initial curiosity to professional excellence. Every step is a milestone.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 relative">

                    {/* Vertical connecting line for mobile/tablet */}
                    <div className={`absolute left-[40px] md:left-1/2 md:-translate-x-1/2 top-10 bottom-10 w-[2px] lg:hidden ${isDark ? 'bg-white/10' : 'bg-[#2B3AA0]/10'}`}></div>

                    {categories.map((cat, i) => {
                        const Icon = cat.icon;
                        return (
                            <motion.div
                                key={cat.title}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.15, duration: 0.7, ease: [0.21, 1.11, 0.81, 0.99] }}
                                viewport={{ once: true, margin: "-50px" }}
                                className={`relative flex flex-row lg:flex-col gap-6 lg:gap-10 group ${i % 2 !== 0 ? 'lg:translate-y-24' : ''}`}
                            >
                                {/* The Journey Node Indicator */}
                                <div className="relative z-10 shrink-0 lg:mx-auto">
                                    <div className={`w-[80px] h-[80px] rounded-full flex flex-col items-center justify-center border-[6px] transition-all duration-500 shadow-[0_0_30px_rgba(43,58,160,0.2)] bg-white group-hover:scale-110 ${isDark ? 'border-[#0A1128] group-hover:border-[#FFB31A]' : 'border-[#F2F4F7] group-hover:border-[#FFB31A]'}`}>
                                        <div className="absolute inset-2 border border-dashed rounded-full animate-[spin_10s_linear_infinite] border-slate-300 dark:border-slate-700"></div>
                                        <span className={`text-2xl font-black italic tracking-tighter leading-none ${isDark ? 'text-[#0A1128]' : 'text-[#2B3AA0]'}`}>
                                            {cat.num}
                                        </span>
                                    </div>
                                    <div className="absolute top-0 right-0 w-8 h-8 rounded-full bg-[#FFB31A] text-[#2B3AA0] flex items-center justify-center shadow-lg -translate-y-2 translate-x-2 group-hover:rotate-12 transition-transform duration-300">
                                        <Icon size={14} />
                                    </div>
                                </div>

                                {/* The Interactive Card */}
                                <Link href={cat.href} className="flex-1 w-full relative">
                                    <div className={`p-1.5 rounded-[2.5rem] border shadow-2xl transition-all duration-500 overflow-hidden flex flex-col h-full bg-white group-hover:-translate-y-2 ${isDark ? 'border-[#111B3A] shadow-black/40' : 'border-slate-200 shadow-[#2B3AA0]/5 hover:border-[#FFB31A]/40'}`}>

                                        {/* Dynamic Image Header */}
                                        <div className="w-full h-48 sm:h-56 lg:h-48 rounded-[2rem] overflow-hidden relative">
                                            <img src={cat.img} className={`w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110 ${cat.imgClass || 'object-center'}`} alt={cat.title} />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                                            <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
                                                <h3 className="text-2xl sm:text-3xl font-black uppercase italic tracking-tighter text-white drop-shadow-lg">
                                                    {cat.title}
                                                </h3>
                                                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0 group-hover:bg-[#FFB31A] transition-colors duration-300">
                                                    <ArrowRight size={18} className="text-white group-hover:text-[#2B3AA0] group-hover:-rotate-45 transition-all duration-300" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Card Body */}
                                        <div className={`p-6 sm:p-8 flex-1 flex flex-col ${isDark ? 'bg-[#0A1128] rounded-[2rem] m-1' : 'bg-transparent'}`}>
                                            <p className={`text-sm sm:text-base font-medium leading-relaxed mb-6 flex-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                                                {cat.desc}
                                            </p>

                                            <div className="flex items-center gap-3">
                                                <div className="w-4 h-[2px] bg-[#FFB31A] group-hover:w-8 transition-all duration-500"></div>
                                                <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-[#2B3AA0] dark:text-white">
                                                    Begin Journey
                                                </span>
                                            </div>
                                        </div>

                                    </div>
                                </Link>

                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default CategoryButtons;
