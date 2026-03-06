"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Sun, Moon, ChevronDown, ArrowRight, CheckCircle, ExternalLink } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import { useSiteData } from '@/components/SiteDataContext';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeMegaMenu, setActiveMegaMenu] = useState(null);
    const [isMobileProgramsOpen, setIsMobileProgramsOpen] = useState(false);
    const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
    const [announcementIndex, setAnnouncementIndex] = useState(0);
    const [announcements, setAnnouncements] = useState([
        { text: "Upcoming: Bangalore State Open - March 2026", link: "/tournaments" },
        { text: "New Batch Starting - Book a Demo!", link: "/free-trial" },
        { text: "Train the Trainer Program - Applications Open", link: "/train-the-trainer" },
        { text: "15,000+ Young Thinkers & Counting!", link: "" }
    ]);
    const megaMenuTimer = useRef(null);
    const { isDark, toggleTheme } = useTheme();
    const { media } = useSiteData();

    useEffect(() => {
        // Fetch top bar announcements from DB
        (async () => {
            try {
                const r = await fetch('/api/public/site-content?key=top_bar_lines');
                const d = await r.json();
                if (d.success && d.item?.value) {
                    const parsed = JSON.parse(d.item.value);
                    if (parsed.visible !== false && parsed.lines?.length > 0) {
                        setAnnouncements(parsed.lines.map(l => {
                            if (typeof l === 'string') return { text: l, link: '' };
                            // If user clicks "New Batch", it should go to free trial as per feedback
                            if (l.text?.toLowerCase().includes('new batch')) return { ...l, link: '/free-trial' };
                            return l;
                        }));
                    }
                }
            } catch (e) { }
        })();
    }, []);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 40);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setAnnouncementIndex((prev) => (prev + 1) % announcements.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [announcements.length]);

    const handleMegaEnter = (menu) => {
        clearTimeout(megaMenuTimer.current);
        setActiveMegaMenu(menu);
    };

    const handleMegaLeave = () => {
        megaMenuTimer.current = setTimeout(() => setActiveMegaMenu(null), 150);
    };

    const curriculumCards = [
        { name: "Beginner", img: media.img_nav_foundation || "/assets/home/Course completion photo 1.jpeg", href: "/programs#foundation", desc: "Start your journey" },
        { name: "Intermediate", img: media.img_nav_intermediate || "/assets/home/Internal Tournament.jpeg", href: "/programs#intermediate", desc: "Mastering the basics" },
        { name: "Advanced", img: media.img_nav_advanced || "/assets/home/Monthly Award.jpeg", href: "/programs#advanced", desc: "Strategic excellence" },
        { name: "Professional", img: media.img_nav_professional || "/assets/home/Course completion photo 3.jpeg", href: "/programs#professional", desc: "Elite level prep" },
    ];

    const offeringCards = [
        { name: "Offline Programs", img: media.img_nav_offline || "/assets/home/Academy photo.jpeg", href: "/services#offline", desc: "Weekly Training", features: ["Game-oriented Learning", "In-person Feedback"] },
        { name: "Online Group", img: "/images/online-program.jpg", href: "/services#online-group", desc: "Focused group learning", features: ["Peer Motivation", "Regular Tournaments"] },
        { name: "1-on-1 Sessions", img: "/images/mentoring.png", href: "/services#one-on-one", desc: "Personalized attention", features: ["Flexi Scheduling", "Direct Trainer Support"] }
    ];

    const eventLinks = [
        { name: "Tournaments", href: "/tournaments" },
        { name: "Camps", href: "/events#camps" },
        { name: "Workshops", href: "/events#workshops" },
    ];

    const aboutLinks = [
        { name: "About Us", href: "/about" },
        { name: "Contact Us", href: "/contact" },
        { name: "Gallery", href: "/gallery" },
        { name: "Blogs", href: "/blog" },
    ];

    const careerLinks = [
        { name: "Train The Trainer", href: "/train-the-trainer" },
        { name: "Job Opportunities", href: "/careers" },
    ];

    const navLinkClass = (active = false) =>
        `px-1.5 2xl:px-2 py-4 text-[10px] 2xl:text-[12px] font-bold uppercase tracking-[0.05em] transition-all relative group flex items-center gap-1 whitespace-nowrap ${isDark ? 'text-slate-200 hover:text-[#FFB31A]' : 'text-[#2B3AA0] hover:text-[#FFB31A]'} ${active ? '!text-[#FFB31A]' : ''}`;

    return (
        <header className="fixed top-0 left-0 w-full z-[1000]">
            {/* Top Bar with glassmorphism */}
            <div className={`py-1.5 px-4 md:px-6 hidden md:block border-b transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-md' : 'bg-[#0A1128]'} border-white/5`}>
                <div className="container mx-auto flex justify-between items-center h-6">
                    <div className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-widest text-slate-400">
                        <Phone className="w-3.5 h-3.5 text-[#FFB31A]" /> +91 7975820187
                    </div>
                    <div className="flex-1 text-center overflow-hidden h-full relative">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={announcementIndex}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#FFB31A] absolute inset-0 flex items-center justify-center italic"
                            >
                                {(() => {
                                    const a = announcements[announcementIndex];
                                    const text = typeof a === 'string' ? a : a.text;
                                    const link = typeof a === 'string' ? '' : a.link;
                                    return link ? <Link href={link} className="hover:underline">{text}</Link> : text;
                                })()}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                    <button onClick={toggleTheme} className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 hover:bg-[#FFB31A]/20 transition-all border border-white/10 text-white">
                        {isDark ? <Sun className="w-3 h-3" /> : <Moon className="w-3 h-3" />}
                        <span className="text-[10px] font-bold tracking-wider">{isDark ? 'LIGHT' : 'DARK'}</span>
                    </button>
                </div>
            </div>

            {/* Main Nav - Refined Layout */}
            <nav className={`w-full transition-all duration-500 ${isDark ? 'bg-[#0F1A3A]/90' : 'bg-white/95'} backdrop-blur-xl border-b ${isScrolled ? 'shadow-2xl py-0' : 'py-1 md:py-0'} ${isDark ? 'border-white/5' : 'border-slate-100'}`}>
                <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between">

                    {/* Logo Area */}
                    <Link href="/" className="shrink-0 flex items-center py-2">
                        <div className={`transition-all duration-500 ${isDark ? 'bg-white p-1.5 rounded-lg shadow-md' : ''}`}>
                            <img loading="lazy" src="/logo.png" alt="ThinQ Chess" className={`transition-all duration-500 ${isScrolled ? 'h-10' : 'h-14'}`} />
                        </div>
                    </Link>

                    {/* Desktop Menu - Exactly Centered */}
                    <div className="hidden xl:flex items-center gap-0.5 2xl:gap-1 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-full">
                        {/* Offerings (formerly Programs) */}
                        <div className="h-full flex items-center relative group" onMouseEnter={() => handleMegaEnter('services')} onMouseLeave={handleMegaLeave}>
                            <button className={navLinkClass()}>
                                Offerings <ChevronDown size={12} />
                                <span className={`absolute bottom-0 left-1.5 right-1.5 h-[3px] bg-[#FFB31A] scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-t-full`}></span>
                            </button>
                        </div>

                        {/* Curriculum */}
                        <div className="h-full flex items-center relative group" onMouseEnter={() => handleMegaEnter('programs')} onMouseLeave={handleMegaLeave}>
                            <button className={navLinkClass()}>
                                Curriculum <ChevronDown size={12} />
                                <span className={`absolute bottom-0 left-1.5 right-1.5 h-[3px] bg-[#FFB31A] scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-t-full`}></span>
                            </button>
                        </div>

                        <Link href="/registration" className={navLinkClass()}>
                            Student Registration
                            <span className={`absolute bottom-0 left-1.5 right-1.5 h-[3px] bg-[#FFB31A] scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-t-full`}></span>
                        </Link>

                        {/* Event Calendar */}
                        <div className="h-full flex items-center relative group">
                            <button className={navLinkClass()}>
                                Event Calendar <ChevronDown size={12} />
                                <span className={`absolute bottom-0 left-1.5 right-1.5 h-[3px] bg-[#FFB31A] scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-t-full`}></span>
                            </button>
                            <div className={`absolute top-full left-0 min-w-[180px] pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300`}>
                                <div className={`rounded-xl border shadow-xl overflow-hidden ${isDark ? 'bg-[#111B3A] border-white/10' : 'bg-white border-slate-100'}`}>
                                    {eventLinks.map(l => (
                                        <Link key={l.name} href={l.href} className={`block px-5 py-3 text-[11px] font-bold uppercase tracking-wider ${isDark ? 'text-slate-300 hover:bg-white/5' : 'text-slate-600 hover:bg-slate-50'} hover:text-[#FFB31A] transition-colors`}>{l.name}</Link>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <Link href="/testimonials" className={navLinkClass()}>
                            Testimonials
                            <span className={`absolute bottom-0 left-1.5 right-1.5 h-[3px] bg-[#FFB31A] scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-t-full`}></span>
                        </Link>

                        {/* Career */}
                        <div className="h-full flex items-center relative group">
                            <button className={navLinkClass()}>
                                Career <ChevronDown size={12} />
                                <span className={`absolute bottom-0 left-1.5 right-1.5 h-[3px] bg-[#FFB31A] scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-t-full`}></span>
                            </button>
                            <div className={`absolute top-full left-0 min-w-[180px] pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300`}>
                                <div className={`rounded-xl border shadow-xl overflow-hidden ${isDark ? 'bg-[#111B3A] border-white/10' : 'bg-white border-slate-100'}`}>
                                    {careerLinks.map(l => (
                                        <Link key={l.name} href={l.href} className={`block px-5 py-3 text-[11px] font-bold uppercase tracking-wider ${isDark ? 'text-slate-300 hover:bg-white/5' : 'text-slate-600 hover:bg-slate-50'} hover:text-[#FFB31A] transition-colors`}>{l.name}</Link>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* About/General Dropdown */}
                        <div className="h-full flex items-center relative group">
                            <button className={navLinkClass()}>
                                About <ChevronDown size={12} />
                                <span className={`absolute bottom-0 left-1.5 right-1.5 h-[3px] bg-[#FFB31A] scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-t-full`}></span>
                            </button>
                            <div className={`absolute top-full left-0 min-w-[180px] pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300`}>
                                <div className={`rounded-xl border shadow-xl overflow-hidden ${isDark ? 'bg-[#111B3A] border-white/10' : 'bg-white border-slate-100'}`}>
                                    {aboutLinks.map(l => (
                                        <Link key={l.name} href={l.href} className={`block px-5 py-3 text-[11px] font-bold uppercase tracking-wider ${isDark ? 'text-slate-300 hover:bg-white/5' : 'text-slate-600 hover:bg-slate-50'} hover:text-[#FFB31A] transition-colors`}>{l.name}</Link>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <a href="https://lms.thinqchess.com" target="_blank" rel="noopener noreferrer" className={navLinkClass()}>
                            Login <ExternalLink size={12} />
                            <span className={`absolute bottom-0 left-1.5 right-1.5 h-[3px] bg-[#FFB31A] scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-t-full`}></span>
                        </a>
                    </div>

                    {/* Right Side: CTA */}
                    <Link href="/registration" className={`hidden xl:flex items-center gap-2 bg-[#FFB31A] text-[#2B3AA0] px-5 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-[#2B3AA0] hover:text-white transition-all duration-300 shadow-[0_10px_30px_rgba(255,179,26,0.2)] hover:shadow-lg hover:-translate-y-0.5 whitespace-nowrap`}>
                        ENROL NOW
                    </Link>

                    {/* Mobile Button */}
                    <div className="xl:hidden flex items-center gap-4">
                        <button onClick={toggleTheme} className={`p-2 rounded-xl transition-all ${isDark ? 'bg-white/5 text-[#FFB31A]' : 'bg-slate-50 text-[#2B3AA0]'}`}>
                            {isDark ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                        <button className={`p-2 -mr-2 rounded-xl transition-all ${isDark ? 'text-white hover:bg-white/5' : 'text-[#2B3AA0] hover:bg-slate-50'}`} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                            <Menu size={32} />
                        </button>
                    </div>
                </div>

                {/* ===== MEGA MENUS - REFINED DESIGN ===== */}
                <AnimatePresence>
                    {activeMegaMenu && (
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className={`absolute left-0 right-0 top-full pt-1 overflow-hidden pointer-events-none`}
                        >
                            <div className={`pointer-events-auto mx-auto max-w-[1400px] mt-2 rounded-2xl shadow-[0_40px_100px_rgba(0,0,0,0.3)] border overflow-hidden ${isDark ? 'bg-[#111B3A]/95 border-white/10 backdrop-blur-2xl' : 'bg-white/95 border-slate-200 backdrop-blur-2xl'}`}
                                onMouseEnter={() => setActiveMegaMenu(activeMegaMenu)}
                                onMouseLeave={handleMegaLeave}
                            >
                                <div className="p-8">
                                    <div className="grid grid-cols-12 gap-8">
                                        {/* Featured Left Side */}
                                        <div className="col-span-3 border-r border-white/5 pr-8 hidden md:block">
                                            <div className="space-y-6">
                                                <div>
                                                    <h3 className={`text-3xl font-black uppercase tracking-tighter leading-none ${isDark ? 'text-white' : 'text-[#2B3AA0]'}`}>
                                                        {activeMegaMenu === 'programs' ? 'LEARNING' : 'LEARNING'} <br />
                                                        <span className="text-[#FFB31A]">{activeMegaMenu === 'programs' ? 'LEVELS.' : 'LEVELS.'}</span>
                                                    </h3>
                                                    <p className={`text-xs mt-4 leading-relaxed font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                                                        Structured curriculum designed for children from foundation to master levels.
                                                    </p>
                                                </div>
                                                <Link href="/programs" className="group inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-[#FFB31A] hover:translate-x-2 transition-transform">
                                                    EXPLORE ALL <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                                </Link>
                                            </div>
                                        </div>

                                        {/* Cards Grid Side */}
                                        <div className="col-span-12 md:col-span-9">
                                            <div className="grid gap-5 grid-cols-4">
                                                {(activeMegaMenu === 'programs' ? curriculumCards : offeringCards).map((card, i) => (
                                                    <Link key={i} href={card.href} className="group relative block rounded-xl overflow-hidden shadow-lg h-full border border-transparent hover:border-[#FFB31A]/30 transition-all duration-300">
                                                        <div className={`aspect-[10/11] relative overflow-hidden`}>
                                                            <img loading="lazy" src={card.img} alt={card.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                                            <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128] via-[#0A1128]/20 to-transparent opacity-90"></div>
                                                            <div className="absolute inset-x-0 bottom-0 p-5 flex flex-col items-start">
                                                                <h4 className="text-white text-lg font-black uppercase tracking-tight mb-1 group-hover:text-[#FFB31A] transition-colors">{card.name}</h4>
                                                                <p className="text-slate-300 text-[9px] font-bold uppercase tracking-widest relative">
                                                                    {card.desc}
                                                                    <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#FFB31A] transition-all duration-300 group-hover:w-full"></span>
                                                                </p>
                                                                {card.features && (
                                                                    <div className="mt-4 space-y-1.5 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 delay-100">
                                                                        {card.features.map((f, j) => (
                                                                            <div key={j} className="flex items-center gap-1.5 text-[8px] text-white/70 font-bold uppercase tracking-tighter">
                                                                                <div className="w-1 h-1 bg-[#FFB31A] rounded-full"></div> {f}
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                )}
                                                                <div className="mt-5 flex items-center gap-2 text-[8px] font-black uppercase tracking-widest bg-[#FFB31A] text-[#2B3AA0] px-4 py-2 rounded shadow-lg group-hover:bg-white transition-colors">
                                                                    ENROLL NOW <ArrowRight size={10} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            {/* Mobile Menu - Premium Side Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[1001] bg-black/60 backdrop-blur-sm xl:hidden">
                        <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className={`absolute right-0 top-0 bottom-0 w-[85%] max-w-sm ${isDark ? 'bg-[#0A1128]' : 'bg-white'} shadow-2xl flex flex-col`}>

                            {/* Mobile Header */}
                            <div className="flex items-center justify-between px-6 py-6 border-b border-white/5">
                                <img loading="lazy" src="/logo.png" alt="ThinQ Chess" className="h-8" />
                                <button onClick={() => setIsMobileMenuOpen(false)} className={`p-2 rounded-full ${isDark ? 'bg-white/5 text-white' : 'bg-slate-100 text-[#2B3AA0]'}`}>
                                    <X size={24} />
                                </button>
                            </div>

                            {/* Mobile Links */}
                            <div className="flex-1 overflow-y-auto px-6 py-8">
                                <div className="space-y-1">
                                    <Link href="/" onClick={() => setIsMobileMenuOpen(false)}
                                        className={`block py-3.5 text-xl font-black uppercase tracking-tighter ${isDark ? 'text-white border-b border-white/5' : 'text-[#2B3AA0] border-b border-slate-100'} hover:text-[#FFB31A] transition-colors`}>
                                        Home
                                    </Link>

                                    {/* Programs Mobile */}
                                    <div className={`border-b ${isDark ? 'border-white/5' : 'border-slate-100'}`}>
                                        <button onClick={() => setIsMobileProgramsOpen(!isMobileProgramsOpen)} className={`flex items-center justify-between w-full py-3.5 text-xl font-black uppercase tracking-tighter ${isDark ? 'text-white' : 'text-[#2B3AA0]'} hover:text-[#FFB31A] transition-colors`}>
                                            Offerings <ChevronDown size={20} className={`transition-transform ${isMobileProgramsOpen ? 'rotate-180' : ''}`} />
                                        </button>
                                        <AnimatePresence>
                                            {isMobileProgramsOpen && (
                                                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden pl-4 pb-4 space-y-3">
                                                    {offeringCards.map(c => (
                                                        <Link key={c.name} href={c.href} onClick={() => setIsMobileMenuOpen(false)} className="block text-sm font-bold text-slate-400 hover:text-[#FFB31A]">{c.name}</Link>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    {/* Curriculum Mobile */}
                                    <div className={`border-b ${isDark ? 'border-white/5' : 'border-slate-100'}`}>
                                        <button onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)} className={`flex items-center justify-between w-full py-3.5 text-xl font-black uppercase tracking-tighter ${isDark ? 'text-white' : 'text-[#2B3AA0]'} hover:text-[#FFB31A] transition-colors`}>
                                            Curriculum <ChevronDown size={20} className={`transition-transform ${isMobileServicesOpen ? 'rotate-180' : ''}`} />
                                        </button>
                                        <AnimatePresence>
                                            {isMobileServicesOpen && (
                                                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden pl-4 pb-4 space-y-3">
                                                    {curriculumCards.map(c => (
                                                        <Link key={c.name} href={c.href} onClick={() => setIsMobileMenuOpen(false)} className="block text-sm font-bold text-slate-400 hover:text-[#FFB31A]">{c.name}</Link>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    <Link href="/registration" onClick={() => setIsMobileMenuOpen(false)}
                                        className={`block py-3.5 text-xl font-black uppercase tracking-tighter ${isDark ? 'text-white border-b border-white/5' : 'text-[#2B3AA0] border-b border-slate-100'} hover:text-[#FFB31A] transition-colors`}>
                                        Registration
                                    </Link>

                                    {/* Event Calendar Mobile */}
                                    <div className={`border-b ${isDark ? 'border-white/5' : 'border-slate-100'}`}>
                                        <Link href="/tournaments" onClick={() => setIsMobileMenuOpen(false)} className={`block py-3.5 text-xl font-black uppercase tracking-tighter ${isDark ? 'text-white' : 'text-[#2B3AA0]'} hover:text-[#FFB31A] transition-colors`}>
                                            Event Calendar
                                        </Link>
                                    </div>

                                    <Link href="/testimonials" onClick={() => setIsMobileMenuOpen(false)}
                                        className={`block py-3.5 text-xl font-black uppercase tracking-tighter ${isDark ? 'text-white border-b border-white/5' : 'text-[#2B3AA0] border-b border-slate-100'} hover:text-[#FFB31A] transition-colors`}>
                                        Testimonials
                                    </Link>

                                    {/* About Dropdown Mobile */}
                                    <div className={`border-b ${isDark ? 'border-white/5' : 'border-slate-100'}`}>
                                        <div className="py-3.5 text-xl font-black uppercase tracking-tighter text-slate-500">About</div>
                                        <div className="pl-4 pb-4 space-y-3">
                                            {aboutLinks.map(l => (
                                                <Link key={l.name} href={l.href} onClick={() => setIsMobileMenuOpen(false)} className="block text-sm font-bold text-slate-400 hover:text-[#FFB31A]">{l.name}</Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Mobile Footer */}
                            <div className={`p-8 border-t border-white/5 ${isDark ? 'bg-black/20' : 'bg-slate-50'}`}>
                                <Link href="/free-trial" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-between w-full bg-[#FFB31A] text-[#2B3AA0] p-5 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl shadow-[#FFB31A]/20">
                                    <span>FREE TRIAL CLASS</span>
                                    <ArrowRight size={20} />
                                </Link>
                                <div className="mt-6 flex flex-col items-center gap-4">
                                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Raising Young Thinkers</p>
                                    <div className="flex gap-4">
                                        <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center"><Phone size={14} className="text-[#FFB31A]" /></div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Navbar;
