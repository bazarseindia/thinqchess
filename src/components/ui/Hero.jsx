"use client";
import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Trophy, Users, Star, Crown, Award } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import { useSiteData } from '@/components/SiteDataContext';

// Animated Counter Component
const AnimatedCounter = ({ target, suffix = '', duration = 2000 }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (!isInView) return;
        let start = 0;
        const end = target;
        const increment = end / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);
        return () => clearInterval(timer);
    }, [isInView, target, duration]);

    return (
        <span ref={ref}>
            {count.toLocaleString()}{suffix}
        </span>
    );
};

const Hero = () => {
    const { isDark } = useTheme();
    const { media } = useSiteData();

    // Determine the hero media
    const heroMediaUrl = media.vid_home_intro || "/assets/home/copy_9921C4CB-1E56-4593-8898-3B2A91782E5C.mov";
    const heroFallbackUrl = media.img_home_hero_bg || "/assets/home/Internal Tournament.jpeg";
    const isVideo = heroMediaUrl.match(/\.(mp4|webm|mov)$/i);

    return (
        <>
            <section className={`relative min-h-[85vh] md:min-h-[90vh] flex items-center pt-32 md:pt-36 pb-8 overflow-hidden ${isDark ? 'bg-[#0A1128]' : 'bg-white'}`}>
                {/* Subtle Chess Pattern Background */}
                <div className="absolute inset-0 opacity-[0.015] pointer-events-none"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232B3AA0' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                ></div>

                <div className="container mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

                    {/* Left: Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="lg:col-span-6 z-10"
                    >

                        <h1 className={`text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tight mb-8 md:mb-10 ${isDark ? 'text-white' : 'text-[#2B3AA0]'}`}>
                            SHAPE YOUNG <br />
                            <span className="text-[#FFB31A]">MINDS.</span> <br />
                            <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">THROUGH THE GAME.</span>
                        </h1>

                        <p className={`text-base sm:text-lg md:text-xl font-medium leading-relaxed max-w-lg mb-8 md:mb-12 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                            At ThinQ Chess, we believe chess is more than a game—it&apos;s a powerful way to shape young minds. Our programs are designed for children aged 5 years and above.
                        </p>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="flex flex-col sm:flex-row gap-4"
                        >
                            <Link href="/free-trial" className="btn-premium flex items-center justify-center group overflow-hidden text-center">
                                <span className="relative z-10">BOOK A FREE TRIAL CLASS</span>
                                <ArrowRight className="ml-3 w-4 h-4 relative z-10 transition-transform group-hover:translate-x-2" />
                                <div className="absolute inset-0 bg-[#FFB31A] translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                            </Link>
                            <button className={`px-8 py-4 border-2 font-bold uppercase tracking-widest text-[10px] transition-all ${isDark ? 'border-white/20 text-white hover:border-[#FFB31A] hover:bg-[#FFB31A] hover:text-[#2B3AA0]' : 'border-slate-200 text-[#2B3AA0] hover:border-[#2B3AA0] hover:bg-[#2B3AA0] hover:text-white'}`}>
                                VIEW OUR PROGRAMS
                            </button>
                        </motion.div>
                    </motion.div>

                    {/* Right: Video/Image Media */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
                        className="lg:col-span-6 relative mt-8 lg:mt-0"
                    >
                        <div className="relative z-10 w-full aspect-[16/11] sm:aspect-[4/5] lg:aspect-auto lg:h-[600px] rounded-2xl shadow-2xl overflow-hidden group">
                            {/* Video or Image based on DB config */}
                            {isVideo ? (
                                <video
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    poster={heroFallbackUrl}
                                    className="w-full h-full object-cover"
                                >
                                    <source src={heroMediaUrl} />
                                    <img loading="lazy" src={heroFallbackUrl} className="w-full h-full object-cover" alt="ThinQ Chess" />
                                </video>
                            ) : (
                                <img loading="lazy" src={heroMediaUrl} className="w-full h-full object-cover" alt="ThinQ Chess Hero" />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128]/70 via-transparent to-transparent opacity-60"></div>
                        </div>

                        <motion.div
                            initial={{ x: 50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 1, duration: 1 }}
                            className={`absolute bottom-8 sm:bottom-12 left-4 sm:left-8 z-20 backdrop-blur-sm p-4 sm:p-6 shadow-2xl border-l-4 border-[#FFB31A] max-w-[180px] sm:max-w-[200px] rounded-xl ${isDark ? 'bg-[#111B3A]/95' : 'bg-white/95'}`}
                        >
                            <Trophy className="w-8 h-8 text-[#FFB31A] mb-2" />
                            <div className={`font-black text-lg leading-none mb-1 ${isDark ? 'text-white' : 'text-[#2B3AA0]'}`}>#1 RANKED</div>
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed">
                                Premier Academy for Cognitive Excellence
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Full-Width Stats Trust Bar */}
            <section className="bg-[#2B3AA0] relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                ></div>
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/10">

                        {/* Google Rating */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0 }}
                            className="flex items-center justify-center gap-5 py-10 sm:py-12"
                        >
                            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                                <Star className="w-8 h-8 sm:w-10 sm:h-10 fill-[#FFB31A] text-[#FFB31A]" />
                            </div>
                            <div>
                                <div className="text-4xl sm:text-5xl font-black text-white leading-none tracking-tight">5.0</div>
                                <div className="flex gap-0.5 my-1.5">
                                    {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-[#FFB31A] text-[#FFB31A]" />)}
                                </div>
                                <div className="text-xs sm:text-sm font-bold text-white/60 uppercase tracking-wider">Google Rating</div>
                            </div>
                        </motion.div>

                        {/* Students Mentored */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.15 }}
                            className="flex items-center justify-center gap-5 py-10 sm:py-12"
                        >
                            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#FFB31A]/20 rounded-2xl flex items-center justify-center">
                                <Users className="w-8 h-8 sm:w-10 sm:h-10 text-[#FFB31A]" />
                            </div>
                            <div>
                                <div className="text-4xl sm:text-5xl font-black text-white leading-none tracking-tight">
                                    <AnimatedCounter target={15000} suffix="+" duration={2500} />
                                </div>
                                <div className="text-xs sm:text-sm font-bold text-white/60 uppercase tracking-wider mt-1">Students Mentored</div>
                            </div>
                        </motion.div>

                        {/* Tournaments Hosted */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="flex items-center justify-center gap-5 py-10 sm:py-12"
                        >
                            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/10 rounded-2xl flex items-center justify-center">
                                <Award className="w-8 h-8 sm:w-10 sm:h-10 text-[#FFB31A]" />
                            </div>
                            <div>
                                <div className="text-4xl sm:text-5xl font-black text-white leading-none tracking-tight">
                                    <AnimatedCounter target={100} suffix="+" duration={2000} />
                                </div>
                                <div className="text-xs sm:text-sm font-bold text-white/60 uppercase tracking-wider mt-1">Tournaments Hosted</div>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </section>
        </>
    );
};

export default Hero;
