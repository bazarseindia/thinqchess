"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Star, Crown, ArrowRight, Quote } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';

export default function TestimonialsPage() {
    const { isDark } = useTheme();

    const testimonials = [
        {
            quote: "ThinQ Chess, Akshayanagar, Bangalore branch is located at a prime location with all the right amenities and facilities available for the kids. Teachers, coordinators and the complete management team are very focused and supportive to help the kids address their issues and keep the motivation high. Positive learning environment.",
            author: "Swarup Ranjan Sahoo",
            subtitle: "Father of Shreyanshi",
            rating: 5
        },
        {
            quote: "Really I felt very happy about my son focus towards the game and the trainer is so passionate to bring my kid practicing, and remember. We felt every grandmaster started right where it starts from here.",
            author: "Lakshmi",
            subtitle: "Mother of Ritvik",
            rating: 5
        },
        {
            quote: "Founders have the ideal mindset to nurture and develop emerging talent. My son's journey so far has been steady with lots of chess related learnings, more importantly he is emotionally learning how to cope with wins and losses.",
            author: "Manoj",
            subtitle: "Father of Kavish",
            rating: 5
        },
        {
            quote: "Open to feedback and very interactive team. Love the mix of theory and practical classes. My son looks up to his trainers for feedback and guidance. Organize tournaments for students to experience real world scenarios.",
            author: "Manoj",
            subtitle: "Continued Testimony",
            rating: 5
        },
        {
            quote: "The structured curriculum and regular Parent-Teacher Meetings make it easy for us to track our child's progress. The trainers are genuinely invested in each student's growth.",
            author: "Priya Sharma",
            subtitle: "Mother of Arjun",
            rating: 5
        },
        {
            quote: "My daughter has grown tremendously since joining ThinQ Chess. Not just in chess skills, but in confidence and decision-making. The academy environment is truly nurturing.",
            author: "Rajesh Kumar",
            subtitle: "Father of Ananya",
            rating: 5
        },
    ];

    return (
        <main className={`min-h-screen ${isDark ? 'bg-[#0A1128]' : 'bg-white'}`}>

            {/* Hero */}
            <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-center justify-center overflow-hidden bg-[#2B3AA0]">
                <div className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                ></div>
                <div className="relative z-10 text-center px-4 sm:px-6">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                        <div className="inline-flex items-center gap-3 text-[#FFB31A] font-black uppercase tracking-[0.3em] text-[9px] sm:text-[10px] mb-8 px-6 py-2 border-l-4 border-[#FFB31A] bg-white/5">
                            <Star className="w-3 h-3 fill-[#FFB31A]" />
                            Parent Stories
                        </div>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="text-4xl sm:text-5xl md:text-7xl font-black text-white leading-[0.9] tracking-tight mb-8"
                    >
                        VOICES OF <br />
                        <span className="text-[#FFB31A]">TRUST.</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="text-base sm:text-lg md:text-xl text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed"
                    >
                        Hear from the parents whose children are growing with ThinQ Chess every day.
                    </motion.p>
                </div>
                <div className={`absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t ${isDark ? 'from-[#0A1128]' : 'from-white'} to-transparent`}></div>
            </section>

            {/* Testimonials Grid */}
            <section className={`py-16 md:py-24 lg:py-32 ${isDark ? 'bg-[#0A1128]' : 'bg-white'}`}>
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
                        {testimonials.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className={`p-8 lg:p-10 shadow-lg rounded-xl border hover:shadow-xl transition-all duration-500 hover:-translate-y-1 relative ${isDark ? 'bg-[#111B3A] border-[#1E2D5A]' : 'bg-slate-50 border-slate-100'}`}
                            >
                                {/* Stars */}
                                <div className="flex gap-1 mb-6">
                                    {[...Array(item.rating)].map((_, j) => (
                                        <Star key={j} className="w-4 h-4 fill-[#FFB31A] text-[#FFB31A]" />
                                    ))}
                                </div>
                                {/* Quote mark */}
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

            {/* CTA */}
            <section className="py-20 md:py-32 bg-[#2B3AA0] text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent opacity-20"></div>
                <div className="container mx-auto px-4 sm:px-6 relative z-10">
                    <Crown className="w-16 h-16 text-[#FFB31A] mx-auto mb-10 opacity-80" />
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-white mb-8 tracking-tight leading-tight italic uppercase">
                        JOIN THE <br /> <span className="text-[#FFB31A]">FAMILY</span>
                    </h2>
                    <p className="text-xl md:text-2xl text-slate-300 font-medium mb-16 max-w-2xl mx-auto opacity-90">
                        Give your child the gift of strategic thinking.
                    </p>
                    <Link href="/free-trial" className="btn-gold px-16 py-6 text-sm font-black tracking-widest shadow-[0px_30px_80px_rgba(255,179,26,0.3)] transform hover:scale-105 transition-all duration-500 rounded-lg inline-block">
                        BOOK A FREE TRIAL CLASS
                    </Link>
                </div>
            </section>
        </main>
    );
}
