"use client";
import React, { useRef } from 'react';
import Hero from '@/components/ui/Hero';
import CategoryButtons from '@/components/ui/CategoryButtons';
import ScrollProgress from '@/components/ui/ScrollProgress';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import {
    BookOpen, Users2, BarChart3, Trophy, GraduationCap, Crown, Shield,
    ArrowRight, Star, Layers, Monitor, Clock, UserCheck,
    Target, Brain, Lightbulb, TrendingUp
} from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import { useSiteData } from '@/components/SiteDataContext';

// Animated Progress Bar Component
const SkillBar = ({ label, percentage, delay = 0 }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    return (
        <div ref={ref} className="space-y-2">
            <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-[#2B3AA0] dark:text-white uppercase tracking-wider">{label}</span>
                <span className="text-sm font-black text-[#FFB31A]">{percentage}%</span>
            </div>
            <div className="h-2 bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${percentage}%` } : { width: 0 }}
                    transition={{ duration: 1.5, delay: delay, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-[#2B3AA0] to-[#FFB31A] rounded-full"
                />
            </div>
        </div>
    );
};

export default function Home() {
    const { isDark } = useTheme();
    const { media } = useSiteData();
    const [galleryImages, setGalleryImages] = React.useState([
        "/assets/home/Internal Tournament.jpeg",
        "/assets/home/Course completion photo 1.jpeg",
        "/assets/home/Monthly Award.jpeg",
        "/assets/home/Academy photo.jpeg",
        "/assets/home/Thinq Chess Tournament.jpeg"
    ]);

    React.useEffect(() => {
        fetch('/api/public/gallery')
            .then(res => res.json())
            .then(data => {
                if (data.success && data.items?.length > 0) {
                    const urls = data.items.filter(item => item.url).map(item => item.url);
                    if (urls.length > 0) {
                        setGalleryImages([...urls, ...urls]); // Duplicate for infinite scroll
                    }
                }
            })
            .catch(console.error);
    }, []);

    return (
        <main className={`min-h-screen ${isDark ? 'bg-[#0A1128]' : 'bg-white'}`}>
            <ScrollProgress />
            <Hero />
            <CategoryButtons />

            {/* Why Choose ThinQ Chess */}
            <section className={`py-16 md:py-24 lg:py-32 relative overflow-hidden ${isDark ? 'bg-[#0D1630]' : 'bg-slate-50'}`}>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#2B3AA0]/5 to-transparent"></div>
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="mb-12 md:mb-20 text-center max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className={`inline-block px-6 py-2 border-l-4 border-[#2B3AA0] text-[10px] font-black uppercase tracking-[0.4em] mb-8 ${isDark ? 'bg-white/5 text-[#FFB31A]' : 'bg-[#2B3AA0]/5 text-[#2B3AA0]'}`}
                        >
                            The Academy Advantage
                        </motion.div>
                        <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-6 md:mb-8 italic leading-tight uppercase tracking-tight ${isDark ? 'text-white' : 'text-[#2B3AA0]'}`}>WHY <span className="text-[#FFB31A]">CHOOSE</span> <br className="hidden md:block" /> THINQ CHESS</h2>
                        <div className="w-16 h-1 bg-[#FFB31A] mx-auto mb-10"></div>
                        <p className={`text-base md:text-xl font-medium leading-relaxed max-w-2xl mx-auto ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                            Our academy approach ensures continuity, structured learning, and long-term support through a strong, system-driven training framework.
                        </p>
                    </div>

                    {/* 6 Cards Grid — 3 columns */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10 relative z-10">
                        {[
                            { title: "Structured Curriculum", desc: "Scientific modules with clear, measurable learning outcomes from foundation to pro levels.", icon: BookOpen },
                            { title: "Personalized Attention", desc: "Regular game analysis and feedback ensures every child's unique journey is guided.", icon: UserCheck },
                            { title: "Transparent Progress", desc: "Regular Parent-Teacher Meetings (PTMs) for clear, transparent updates on your child's growth.", icon: BarChart3 },
                            { title: "Confidence Building", desc: "Regular online and offline tournaments to build a healthy competitive mindset.", icon: Trophy },
                            { title: "Expert Instruction", desc: "Training guided by experienced and qualified child-friendly chess tutors.", icon: GraduationCap },
                            { title: "Elite Programs", desc: "Elite batch program for high-potential students focused on competitive professional growth.", icon: Crown }
                        ].map((item, i) => {
                            const Icon = item.icon;
                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.08, duration: 0.6 }}
                                    viewport={{ once: true }}
                                    className={`relative p-6 sm:p-8 lg:p-10 shadow-lg border hover:shadow-xl hover:border-[#FFB31A]/30 transition-all duration-500 group border-l-4 border-l-transparent hover:border-l-[#FFB31A] ${isDark ? 'bg-[#111B3A] border-[#1E2D5A]' : 'bg-white border-slate-100'}`}
                                >
                                    <div className="flex items-start gap-5">
                                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-[#FFB31A]/10 transition-colors duration-500 ${isDark ? 'bg-white/5' : 'bg-[#2B3AA0]/5'}`}>
                                            <Icon className={`w-6 h-6 group-hover:text-[#FFB31A] transition-colors duration-500 ${isDark ? 'text-[#FFB31A]' : 'text-[#2B3AA0]'}`} />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-3 mb-3">
                                                <span className={`text-xs font-black leading-none ${isDark ? 'text-white/10' : 'text-[#2B3AA0]/20'}`}>
                                                    {String(i + 1).padStart(2, '0')}
                                                </span>
                                                <h4 className={`text-lg font-black uppercase tracking-tight leading-snug ${isDark ? 'text-white' : 'text-[#2B3AA0]'}`}>{item.title}</h4>
                                            </div>
                                            <p className={`text-sm font-medium leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{item.desc}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>



                    {/* Quick Highlights Dashboard */}
                    <div className="mt-16 md:mt-24 lg:mt-32 bg-[#2B3AA0] p-8 sm:p-12 lg:p-24 relative overflow-hidden rounded-2xl shadow-[0_50px_100px_-20px_rgba(43,58,160,0.3)]">
                        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white opacity-[0.02] rounded-full -mr-64 -mt-64 blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#FFB31A] opacity-[0.05] rounded-full -ml-32 -mb-32 blur-3xl"></div>

                        <div className="text-center mb-16 relative z-10">
                            <div className="text-[#FFB31A] font-black uppercase tracking-[0.4em] text-[10px] mb-4">Quick Highlights</div>
                            <h3 className="text-3xl md:text-4xl font-black text-white italic uppercase tracking-tight">What Sets Us <span className="text-[#FFB31A]">Apart</span></h3>
                        </div>

                        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10 sm:gap-x-12 sm:gap-y-16">
                            {[
                                { text: "Programs from foundation to professional level", icon: Layers },
                                { text: "Regular online and offline tournaments", icon: Trophy },
                                { text: "Progress tracked and shared with parents", icon: BarChart3 },
                                { text: "Classes led by trained, child-friendly trainers", icon: UserCheck },
                                { text: "Flexible schedules", icon: Clock },
                                { text: "Online and Offline Training Available", icon: Monitor }
                            ].map((highlight, i) => {
                                const Icon = highlight.icon;
                                return (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        viewport={{ once: true }}
                                        className="flex gap-5 items-start group"
                                    >
                                        <div className="w-12 h-12 border-2 border-[#FFB31A]/40 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-[#FFB31A] group-hover:border-[#FFB31A] transition-all duration-500">
                                            <Icon className="w-5 h-5 text-[#FFB31A] group-hover:text-[#2B3AA0] transition-colors" />
                                        </div>
                                        <div>
                                            <div className="text-white text-base font-bold leading-snug mb-2 group-hover:text-[#FFB31A] transition-colors">
                                                {highlight.text}
                                            </div>
                                            <div className="w-8 h-0.5 bg-[#FFB31A]/20 group-hover:w-16 group-hover:bg-[#FFB31A]/50 transition-all duration-500"></div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>

                        <div className="mt-20 text-center relative z-10 pt-12 border-t border-white/10">
                            <Link href="/free-trial" className="btn-gold px-16 py-6 text-sm font-black tracking-[0.2em] transform hover:scale-105 transition-all inline-flex items-center group shadow-xl shadow-black/20 rounded-lg">
                                <span className="relative z-10">BOOK A FREE TRIAL CLASS</span>
                                <ArrowRight className="ml-6 w-5 h-5 group-hover:translate-x-3 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Philosophy Section with Skill Bars */}
            <section className={`py-16 md:py-24 lg:py-32 overflow-hidden ${isDark ? 'bg-[#0A1128]' : 'bg-white'}`}>
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="text-center max-w-4xl mx-auto mb-20">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className={`inline-block px-6 py-2 border-l-4 border-[#FFB31A] text-[10px] font-black uppercase tracking-[0.4em] mb-8 ${isDark ? 'bg-white/5 text-[#FFB31A]' : 'bg-[#2B3AA0]/5 text-[#2B3AA0]'}`}
                        >
                            Our Philosophy
                        </motion.div>
                        <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black leading-[0.9] tracking-tight mb-8 md:mb-10 relative z-10 ${isDark ? 'text-white' : 'text-[#2B3AA0]'}`}>
                            BEYOND THE <br />
                            <span className="text-[#FFB31A]">CHESSBOARD.</span>
                        </h2>
                        <p className={`text-base md:text-xl font-medium leading-relaxed italic max-w-3xl mx-auto ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                            &quot;Every class, every move, and every tournament is thoughtfully planned to sharpen thinking skills while keeping learning fun, engaging, and age-appropriate.&quot;
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h3 className={`text-2xl font-black mb-8 uppercase tracking-widest border-b-4 border-[#FFB31A] pb-4 inline-block ${isDark ? 'text-white' : 'text-[#2B3AA0]'}`}>The Holistic Approach</h3>
                            <div className="space-y-8">
                                <p className={`text-lg leading-relaxed font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                                    Our programs are designed for children aged 5 years and above, helping them develop focus, strategic thinking, and confidence that extends far beyond the chessboard.
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    {[
                                        "Parent-Teacher Meetings",
                                        "Online Tournaments",
                                        "Psychology Sessions",
                                        "Mentorship Programs"
                                    ].map((item, i) => (
                                        <div key={i} className={`flex items-center gap-3 text-sm font-bold px-4 py-3 rounded-lg ${isDark ? 'text-white bg-white/5' : 'text-[#2B3AA0] bg-slate-50'}`}>
                                            <div className="w-2 h-2 bg-[#FFB31A] rounded-full shrink-0"></div>
                                            {item}
                                        </div>
                                    ))}
                                </div>

                                {/* Animated Skill Bars */}
                                <div className={`p-8 rounded-xl space-y-5 mt-8 ${isDark ? 'bg-white/5' : 'bg-slate-50'}`}>
                                    <h4 className={`text-sm font-black uppercase tracking-widest mb-6 ${isDark ? 'text-white' : 'text-[#2B3AA0]'}`}>Skills We Develop</h4>
                                    <SkillBar label="Focus & Concentration" percentage={92} delay={0} />
                                    <SkillBar label="Strategic Thinking" percentage={88} delay={0.2} />
                                    <SkillBar label="Confidence" percentage={85} delay={0.4} />
                                    <SkillBar label="Decision Making" percentage={90} delay={0.6} />
                                </div>

                                <p className={`text-base leading-relaxed border-l-4 border-[#FFB31A]/20 pl-6 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                                    To support holistic development, we create a well-rounded environment for sustained growth, ensuring every child&apos;s unique journey is guided with care.
                                </p>
                            </div>
                        </motion.div>

                        {/* Philosophy Image */}
                        <div className="relative">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                            >
                                <div className="rounded-2xl shadow-2xl relative overflow-hidden group bg-white">
                                    <img loading="lazy" src={media.img_home_philosophy || "/assets/home/Practice time.jpeg"} className="w-full grayscale-[30%] group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100" alt="Mentorship" />
                                    <div className="absolute inset-0 bg-[#2B3AA0]/10 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                </div>
                            </motion.div>
                            <motion.div
                                initial={{ x: 20, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                className="absolute -bottom-8 -left-8 bg-[#FFB31A] text-[#2B3AA0] p-8 max-w-[280px] shadow-2xl rounded-xl z-20"
                            >
                                <div className="text-[10px] font-black uppercase tracking-[0.3em] mb-3 border-b border-[#2B3AA0]/20 pb-3">Our Commitment</div>
                                <p className="text-sm font-bold leading-relaxed">We celebrate every milestone—big or small—and stay deeply committed to guiding each child&apos;s unique journey.</p>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>


            {/* Gallery Section */}
            <section className={`py-16 md:py-24 lg:py-32 text-center overflow-hidden ${isDark ? 'bg-[#0A1128]' : 'bg-white'}`}>
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="mb-12 md:mb-20 max-w-3xl mx-auto">
                        <div className="text-[#FFB31A] font-black uppercase tracking-[0.4em] text-[10px] mb-6">Academy Excellence</div>
                        <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black italic uppercase tracking-tight mb-6 md:mb-8 ${isDark ? 'text-white' : 'text-[#2B3AA0]'}`}>THE <span className="text-[#FFB31A]">WALL</span> OF FAME</h2>
                        <div className="w-12 h-1 bg-[#FFB31A] mx-auto mb-6 md:mb-8"></div>
                        <p className={`text-base md:text-xl font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Celebrating our students&apos; strategic milestones and achievements across global tournaments.</p>
                    </div>

                    <div className="relative w-full overflow-hidden mb-12" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
                        <motion.div
                            className="flex gap-4 sm:gap-6 min-w-max"
                            animate={{ x: ["0%", "-50%"] }}
                            transition={{ ease: "linear", duration: 40, repeat: Infinity }}
                        >
                            {/* Duplicate array for seamless infinite scroll */}
                            {galleryImages.map((img, i) => (
                                <div key={i} className="relative w-[240px] h-[300px] sm:w-[280px] sm:h-[360px] md:w-[320px] md:h-[400px] shrink-0 rounded-2xl overflow-hidden shadow-xl border border-white/10 group cursor-pointer transition-transform hover:-translate-y-2">
                                    <img loading="lazy" src={img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={`Gallery item ${i}`} />
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    <div className="mt-8 md:mt-12 flex flex-col items-center">
                        <Link href="/gallery" className="btn-premium px-10 sm:px-16 py-5 sm:py-6 group rounded-lg inline-flex items-center gap-4">
                            <span className="relative z-10 font-black tracking-widest text-[11px] sm:text-xs uppercase">View More in Gallery</span>
                            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2 relative z-10" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Testimonials with Star Ratings */}
            <section className={`py-12 md:py-16 lg:py-20 overflow-hidden relative ${isDark ? 'bg-[#0D1630]' : 'bg-slate-50'}`}>
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="mb-12 md:mb-20 text-center">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="text-[#FFB31A] font-black uppercase tracking-[0.4em] text-[10px] mb-6"
                        >
                            Parent Stories
                        </motion.div>
                        <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black italic leading-tight tracking-tight uppercase ${isDark ? 'text-white' : 'text-[#2B3AA0]'}`}>THE <span className="text-[#FFB31A]">THINQ</span> IMPACT</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 relative z-10">
                        {[
                            {
                                quote: "Teachers, coordinators and the complete management team are very focused and supportive to help the kids address their issues and keep the motivation high. Their intra centre chess competitions are well organised and gives an edge to the kids to showcase their talent. Positive learning environment.",
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
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className={`p-6 sm:p-8 lg:p-10 shadow-lg rounded-xl border hover:shadow-xl transition-shadow relative ${isDark ? 'bg-[#111B3A] border-[#1E2D5A]' : 'bg-white border-slate-100'}`}
                            >
                                {/* Star Ratings */}
                                <div className="flex gap-1 mb-6">
                                    {[...Array(5)].map((_, j) => (
                                        <Star key={j} className="w-4 h-4 fill-[#FFB31A] text-[#FFB31A]" />
                                    ))}
                                </div>
                                <div className={`text-6xl absolute top-6 right-8 font-serif leading-none ${isDark ? 'text-white/5' : 'text-[#2B3AA0]/5'}`}>&ldquo;</div>
                                <p className={`text-base font-medium italic mb-8 leading-relaxed relative z-10 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                                    {item.quote}
                                </p>
                                <div className={`border-t pt-6 ${isDark ? 'border-white/10' : 'border-slate-100'}`}>
                                    <div className={`text-base font-black uppercase tracking-tight ${isDark ? 'text-white' : 'text-[#2B3AA0]'}`}>{item.author}</div>
                                    <div className="text-[#FFB31A] text-[10px] font-black uppercase tracking-widest mt-1">{item.subtitle}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA Section */}
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
                            JOIN THE <br /> <span className="text-[#FFB31A]">ELITE</span> LEAGUE
                        </motion.h2>
                        <p className="text-xl md:text-2xl text-slate-300 font-medium mb-16 max-w-2xl mx-auto opacity-90 leading-relaxed">
                            Ready to unlock the thinking potential within your child? Start with a free trial session today.
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
