"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    BookOpen,
    Users,
    Layout,
    Target,
    TrendingUp,
    CheckCircle2,
    ChevronRight,
    ArrowRight,
    Award,
    Star,
    ShieldCheck,
    Briefcase,
    Globe,
    ClipboardCheck,
    User,
    Mail,
    Phone,
    MapPin,
    Trophy,
    Calendar,
    FileText,
    UploadCloud,
    Zap,
    GraduationCap,
    HeartHandshake
} from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import Link from 'next/link';

const TrainTheTrainer = () => {
    const { isDark } = useTheme();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        mobile: '',
        location: '',
        fideId: '',
        rating: '',
        experienceYears: '',
        tournamentHistory: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const benefits = [
        {
            icon: <GraduationCap className="w-6 h-6" />,
            title: "Advanced Pedagogy",
            desc: "Master the psychology of teaching children and structure lessons that keep them engaged and learning."
        },
        {
            icon: <Users className="w-6 h-6" />,
            title: "Executive Mentorship",
            desc: "Collaborate directly with our senior grandmaster-level trainers through weekly synchronization sessions."
        },
        {
            icon: <ClipboardCheck className="w-6 h-6" />,
            title: "System Architecture",
            desc: "Learn to manage 100+ students batches with our proprietary academy management frameworks."
        },
        {
            icon: <Target className="w-6 h-6" />,
            title: "Practical Internships",
            desc: "Apply your training in live global classrooms under the observation of veteran educators."
        },
        {
            icon: <TrendingUp className="w-6 h-6" />,
            title: "Elite Growth Path",
            desc: "Fast-track your career from a trainee to a Senior Head Trainer or even an Academy Partner."
        },
        {
            icon: <Award className="w-6 h-6" />,
            title: "Global Certification",
            desc: "Earn the ThinQ Chess Certified Trainer credential, recognized across our international network."
        }
    ];

    const eligibility = [
        "Passionate chess players (1200+ Elo preferred)",
        "Tournament players looking for a stable career",
        "Individuals with strong English communication skills"
    ];

    return (
        <div className={`min-h-screen pt-20 ${isDark ? 'bg-[#0A1128] text-white' : 'bg-white text-[#2B3AA0]'}`}>
            {/* HERO SECTION */}
            <section className="relative py-24 lg:py-40 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/images/contact-bg.jpg"
                        alt="Background"
                        className="w-full h-full object-cover opacity-20 scale-110"
                    />
                    <div className={`absolute inset-0 pb-20 bg-gradient-to-b ${isDark ? 'from-[#0A1128]/80 via-[#0A1128]/60 to-[#0A1128]' : 'from-white/80 via-white/60 to-white'}`}></div>
                </div>

                <div className="container mx-auto px-4 sm:px-6 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="max-w-2xl">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-[#FFB31A]/30 bg-[#FFB31A]/10 text-[#FFB31A] text-[10px] font-black uppercase tracking-[0.3em] mb-12 shadow-[0_0_30px_rgba(255,179,26,0.1)]"
                            >
                                <Star className="w-3 h-3 fill-current" /> Career Excellence
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-5xl sm:text-7xl lg:text-[100px] font-black italic tracking-tighter leading-[0.85] mb-10 text-shadow-xl"
                            >
                                FROM PLAYER <br /> TO <span className="text-[#FFB31A]">MENTOR.</span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className={`text-xl md:text-2xl font-medium mb-12 leading-relaxed opacity-90 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}
                            >
                                Join the elite 5% of chess trainers. Our **Train The Trainer** program is more than a course—it&apos;s a career transformation.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="flex flex-wrap gap-6"
                            >
                                <Link href="#apply" className="bg-[#FFB31A] text-[#2B3AA0] px-14 py-6 rounded-xl font-black uppercase tracking-widest text-sm hover:bg-white transition-all transform hover:scale-105 shadow-[0_20px_60px_rgba(255,179,26,0.2)]">
                                    APPLY FOR TRAINING
                                </Link>
                                <div className="flex items-center gap-4 bg-white/5 backdrop-blur-md border border-white/10 p-2 rounded-2xl">
                                    <div className="w-14 h-14 rounded-xl overflow-hidden shadow-xl border-2 border-[#FFB31A]">
                                        <img src="/images/Chiranth-cropped.jpeg" alt="Head Trainer" className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-black uppercase tracking-widest text-[#FFB31A]">Mentorship By</div>
                                        <div className="text-xs font-black uppercase tracking-tight">Lead Trainers</div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Visual Right Side */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            className="relative group hidden lg:block"
                        >
                            <div className="relative rounded-[2rem] overflow-hidden border-8 border-white/5 shadow-3xl bg-[#0A1128]">
                                <img src="/images/home-banner-two.jpg" alt="Mentoring" className="w-full grayscale-[30%] group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#2B3AA0]/60 to-transparent"></div>
                                <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end">
                                    <div>
                                        <div className="text-[#FFB31A] text-4xl font-black italic tracking-tighter uppercase leading-none mb-1">Impact.</div>
                                        <div className="text-white text-sm font-bold uppercase tracking-widest opacity-80">15K+ Students Reached</div>
                                    </div>
                                    <div className="w-12 h-12 rounded-full border-2 border-[#FFB31A] flex items-center justify-center">
                                        <div className="w-2 h-2 bg-[#FFB31A] rounded-full animate-ping"></div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-[#FFB31A]/10 rounded-full blur-[128px] pointer-events-none"></div>
                <div className="absolute top-1/2 right-0 -translate-y-1/2 w-64 h-64 bg-[#2B3AA0]/20 rounded-full blur-[96px] pointer-events-none"></div>
            </section>

            {/* CORE VALUE SECTION */}
            <section className={`py-24 md:py-40 relative isolate overflow-hidden ${isDark ? 'bg-white/5' : 'bg-slate-50'}`}>
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="text-[#FFB31A] font-black uppercase tracking-[0.4em] text-[10px] mb-8">Program Vision</div>
                            <h2 className="text-4xl md:text-6xl font-black italic tracking-tight mb-8 uppercase leading-tight">Modern Methods. <br /> Classic <span className="text-[#FFB31A]">Values.</span></h2>
                            <p className={`text-xl leading-relaxed font-medium mb-12 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                                We don&apos;t just teach chess; we teach how to raise the next generation of strategic thinkers. Our program bridges the gap between being a strong player and becoming an impactful educator.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {[
                                    { icon: <ShieldCheck className="w-5 h-5 text-[#FFB31A]" />, title: "Classroom Handling", text: "Master the art of engaging children." },
                                    { icon: <Globe className="w-5 h-5 text-[#FFB31A]" />, title: "Teaching Frameworks", text: "Global standards of pedagogy." }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-4">
                                        <div className={`shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${isDark ? 'bg-white/5' : 'bg-[#2B3AA0]/5'}`}>
                                            {item.icon}
                                        </div>
                                        <div>
                                            <h4 className="font-black text-xs uppercase tracking-wider mb-1">{item.title}</h4>
                                            <p className={`text-[11px] leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{item.text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="rounded-3xl overflow-hidden border-8 border-white/5 shadow-4xl relative group">
                                <img src="/images/indian-img-four.jpg" alt="Academy Training" className="w-full grayscale-[20%] hover:grayscale-0 transition-all duration-700" />
                                <div className="absolute inset-0 bg-[#2B3AA0]/20 mix-blend-multiply"></div>
                            </div>
                            <div className="absolute -bottom-8 -right-8 bg-[#FFB31A] p-10 max-w-xs rounded-2xl shadow-3xl text-[#2B3AA0]">
                                <div className="text-[10px] font-black uppercase tracking-widest border-b border-[#2B3AA0]/10 pb-4 mb-4">The Impact</div>
                                <p className="text-base font-black italic leading-tight uppercase leading-relaxed font-bold italic">"Shortlisted candidates get to work within an ecosystem of 15,000+ young thinkers."</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* WHAT YOU WILL GAIN - GRID */}
            <section className="py-24 md:py-40">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="text-center max-w-3xl mx-auto mb-20 md:mb-32">
                        <div className="text-[#FFB31A] font-black uppercase tracking-[0.4em] text-[10px] mb-8">Benefits & Outcomes</div>
                        <h2 className="text-4xl md:text-6xl font-black italic tracking-tight uppercase leading-tight">What You Will <br /> <span className="text-[#FFB31A]">Achieve.</span></h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {benefits.map((benefit, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className={`p-10 rounded-2xl border transition-all duration-500 hover:-translate-y-2 group ${isDark ? 'bg-white/5 border-white/5 hover:border-[#FFB31A]/30' : 'bg-slate-50 border-slate-100 hover:border-[#FFB31A]/30'}`}
                            >
                                <div className="w-14 h-14 rounded-xl bg-[#FFB31A] text-[#2B3AA0] flex items-center justify-center mb-10 group-hover:scale-110 transition-transform shadow-lg shadow-[#FFB31A]/10">
                                    {benefit.icon}
                                </div>
                                <h3 className="text-xl font-black uppercase tracking-tight mb-4 group-hover:text-[#FFB31A] transition-colors">{benefit.title}</h3>
                                <p className={`text-base leading-relaxed font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{benefit.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ACADEMY EXPOSURE - DESIGN FIX FOR VISIBILITY */}
            <section className="py-32 md:py-52 bg-[#2B3AA0] text-white overflow-hidden relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent opacity-50"></div>
                <div className="container mx-auto px-4 sm:px-6 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-20">
                        <div className="lg:w-1/2">
                            <div className="text-[#FFB31A] font-black uppercase tracking-[0.5em] text-[11px] mb-8">Academy Exposure</div>
                            <h2 className="text-5xl sm:text-7xl lg:text-[100px] font-black italic tracking-tighter uppercase mb-20 leading-[0.85] text-white">
                                TEACH.<br />
                                GROW.<br />
                                <span className="text-[#FFB31A]">CONQUER.</span>
                            </h2>
                            <div className="space-y-10">
                                {eligibility.map((text, i) => (
                                    <div key={i} className="flex items-center gap-6 group">
                                        <div className="w-12 h-12 rounded-full border-2 border-[#FFB31A] flex items-center justify-center group-hover:bg-[#FFB31A] transition-all">
                                            <CheckCircle2 className="w-5 h-5 text-[#FFB31A] group-hover:text-[#2B3AA0]" />
                                        </div>
                                        <div className="text-2xl font-black italic tracking-tight uppercase leading-none group-hover:text-[#FFB31A] transition-colors">{text}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="lg:w-1/2 relative">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="relative z-10 rounded-[3rem] overflow-hidden border-[12px] border-white/10 shadow-5xl group"
                            >
                                <img src="/assets/home/Academy photo.jpeg" alt="Academy Vibe" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                                <div className="absolute bottom-10 left-10 p-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl max-w-xs">
                                    <div className="flex items-center gap-2 mb-4">
                                        <Users className="text-[#FFB31A] w-5 h-5" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-white">Direct Mentorship</span>
                                    </div>
                                    <p className="text-sm font-bold text-white italic leading-relaxed">
                                        Get trained in real academy ecosystems with actual students and live game sessions.
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* REGISTRATION FORM */}
            <section id="apply" className="py-24 md:py-48 relative overflow-hidden">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className={`max-w-[1400px] mx-auto rounded-[3rem] overflow-hidden border shadow-4xl flex flex-col lg:grid lg:grid-cols-12 ${isDark ? 'bg-[#0F224A] border-white/5' : 'bg-slate-50 border-slate-200'}`}>
                        {/* Info Side */}
                        <div className="lg:col-span-5 p-12 lg:p-24 bg-[#0A1128] text-white flex flex-col items-start relative justify-between overflow-hidden min-h-[600px]">
                            <div className="absolute right-0 bottom-0 opacity-[0.05] pointer-events-none scale-150 transform rotate-12">
                                <Trophy className="w-[500px] h-[500px]" />
                            </div>

                            <div className="relative z-10">
                                <h2 className="text-5xl font-black italic tracking-tighter uppercase leading-[0.85] mb-12">
                                    THE <br /><span className="text-[#FFB31A]">ADMISSIONS</span> <br />GATEWAY.
                                </h2>
                                <p className="text-lg font-medium opacity-60 mb-16 leading-relaxed max-w-sm italic">
                                    &quot;We are looking for hunger, strategic depth, and a relentless desire to mentor.&quot;
                                </p>

                                <div className="space-y-12">
                                    <div className="flex gap-6 items-start group">
                                        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:border-[#FFB31A] group-hover:bg-[#FFB31A]/10 transition-all">
                                            <Trophy size={20} className="text-[#FFB31A]" />
                                        </div>
                                        <div>
                                            <div className="text-[10px] font-black uppercase tracking-widest text-[#FFB31A] mb-1">Pre-Requisite</div>
                                            <div className="text-sm font-bold text-white uppercase tracking-tight">Open for Players & Aspiring Tutors</div>
                                        </div>
                                    </div>
                                    <div className="flex gap-6 items-start group">
                                        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:border-[#FFB31A] group-hover:bg-[#FFB31A]/10 transition-all">
                                            <ClipboardCheck size={20} className="text-[#FFB31A]" />
                                        </div>
                                        <div>
                                            <div className="text-[10px] font-black uppercase tracking-widest text-[#FFB31A] mb-1">Response Time</div>
                                            <div className="text-sm font-bold text-white uppercase tracking-tight">Review within 48 Business Hours</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="relative z-10 pt-16 mt-auto">
                                <div className="flex items-center gap-4">
                                    <Phone className="w-4 h-4 text-[#FFB31A]" />
                                    <div className="text-sm font-black uppercase tracking-[0.2em]">+91 7975820187</div>
                                </div>
                            </div>
                        </div>

                        {/* Form Side */}
                        <div className="lg:col-span-7 p-12 lg:p-24 relative">
                            <form className="space-y-12 max-w-3xl mx-auto">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
                                    <InputField label="Full Name" name="fullName" placeholder="Magnus Carlsen" icon={<User size={18} />} isDark={isDark} />
                                    <InputField label="Email Address" type="email" name="email" placeholder="magnus@worldchess.com" icon={<Mail size={18} />} isDark={isDark} />
                                    <InputField label="Mobile Number" name="mobile" placeholder="+91 0000 0000 00" icon={<Phone size={18} />} isDark={isDark} />
                                    <InputField label="City / Country" name="location" placeholder="Bangalore, India" icon={<MapPin size={18} />} isDark={isDark} />
                                    <InputField label="Peak Rating" name="rating" placeholder="e.g. 2100" icon={<Trophy size={18} />} isDark={isDark} />
                                    <InputField label="Experience" name="experienceYears" placeholder="e.g. 3 Years" icon={<Calendar size={18} />} isDark={isDark} />
                                </div>

                                <div className="space-y-3">
                                    <label className={`text-[10px] font-black uppercase tracking-[0.3em] font-sans ${isDark ? 'text-slate-400' : 'text-[#2B3AA0]'}`}>Tournament Achievements</label>
                                    <div className="relative group">
                                        <div className={`absolute top-5 left-5 transition-colors ${isDark ? 'group-focus-within:text-[#FFB31A] text-slate-500' : 'text-slate-400 group-focus-within:text-[#FFB31A]'}`}><FileText size={20} /></div>
                                        <textarea
                                            rows="4"
                                            placeholder="Briefly describe your strongest tournament performances..."
                                            className={`w-full pl-16 pr-8 py-5 rounded-[1.5rem] text-base font-bold border transition-all resize-none ${isDark ? 'bg-[#0A1128] border-white/5 text-white focus:border-[#FFB31A]/50' : 'bg-white border-slate-200 text-[#2B3AA0] focus:border-[#FFB31A] shadow-inner'}`}
                                        ></textarea>
                                    </div>
                                </div>

                                <div className="pt-8 md:col-span-2 pt-6">
                                    <div className={`p-10 rounded-3xl border-2 border-dashed flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-[#FFB31A] transition-all ${isDark ? 'bg-black/20 border-white/10' : 'bg-slate-50 border-slate-200'}`}>
                                        <UploadCloud className="w-10 h-10 text-[#FFB31A]" />
                                        <div className="text-center">
                                            <div className={`text-xs font-black uppercase tracking-tight ${isDark ? 'text-white' : 'text-[#2B3AA0]'}`}>Upload Resume / Chess Profile</div>
                                            <div className="text-[10px] text-slate-500 mt-1 uppercase">Max 5MB (PDF Recommended)</div>
                                        </div>
                                    </div>
                                </div>

                                <button type="submit" className="w-full bg-[#FFB31A] text-[#2B3AA0] py-8 rounded-[1.5rem] font-black uppercase tracking-[0.3em] text-lg hover:shadow-[0_20px_80px_rgba(255,179,26,0.3)] transition-all flex items-center justify-center gap-6 group shadow-2xl">
                                    SUBMIT APPLICATION <ArrowRight className="group-hover:translate-x-3 transition-transform" />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

const InputField = ({ label, type = "text", placeholder, icon, isDark }) => (
    <div className="space-y-4">
        <label className={`text-[10px] font-black uppercase tracking-[0.3em] font-sans ${isDark ? 'text-slate-400' : 'text-[#2B3AA0]'}`}>{label}</label>
        <div className="relative group">
            <div className={`absolute top-1/2 -translate-y-1/2 left-5 transition-colors ${isDark ? 'group-focus-within:text-[#FFB31A] text-slate-500' : 'text-slate-400 group-focus-within:text-[#FFB31A]'}`}>
                {icon}
            </div>
            <input
                type={type}
                placeholder={placeholder}
                className={`w-full pl-14 pr-8 py-5 rounded-2xl text-base font-bold border transition-all ${isDark ? 'bg-[#0A1128] border-white/5 text-white focus:border-[#FFB31A]/50 focus:bg-black/20' : 'bg-white border-slate-200 text-[#2B3AA0] focus:border-[#FFB31A] shadow-inner'}`}
            />
        </div>
    </div>
);

export default TrainTheTrainer;
