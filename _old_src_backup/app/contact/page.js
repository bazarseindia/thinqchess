"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, ArrowRight, Instagram, Facebook, Linkedin, Youtube, Send, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useTheme } from '@/components/ThemeProvider';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

export default function ContactPage() {
    const { isDark } = useTheme();

    const [formState, setFormState] = useState({
        parentName: '',
        childName: '',
        age: '',
        phone: '',
        email: '',
        state: '',
        country: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleInput = (e) => setFormState(p => ({ ...p, [e.target.name]: e.target.value }));
    const handlePhone = (val) => setFormState(p => ({ ...p, phone: val }));

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitStatus('success');
            setTimeout(() => setSubmitStatus(null), 5000);
            setFormState({ parentName: '', childName: '', age: '', phone: '', email: '', state: '', country: '' });
        }, 1500);
    };

    const InputField = ({ label, name, type = "text", placeholder, colSpan = 1 }) => (
        <div className={`relative group ${colSpan === 2 ? 'md:col-span-2' : ''}`}>
            {type === 'select' ? (
                <select
                    required name={name} onChange={handleInput} value={formState[name]}
                    className={`peer w-full h-16 pt-4 px-6 rounded-2xl text-sm font-bold border-2 transition-all duration-300 outline-none appearance-none ${isDark ? 'bg-white/5 border-white/10 text-white focus:bg-white/10 focus:border-[#FFB31A]' : 'bg-slate-50 border-slate-200 text-[#2B3AA0] focus:bg-white focus:border-[#FFB31A]'}`}
                >
                    <option value="" disabled className={isDark ? "bg-[#0A1128] text-slate-400" : "bg-white text-slate-500"}></option>
                    <option value="India" className={isDark ? "bg-[#0A1128]" : "bg-white"}>India</option>
                    <option value="United States" className={isDark ? "bg-[#0A1128]" : "bg-white"}>United States</option>
                    <option value="United Kingdom" className={isDark ? "bg-[#0A1128]" : "bg-white"}>United Kingdom</option>
                    <option value="Canada" className={isDark ? "bg-[#0A1128]" : "bg-white"}>Canada</option>
                    <option value="Australia" className={isDark ? "bg-[#0A1128]" : "bg-white"}>Australia</option>
                    <option value="Singapore" className={isDark ? "bg-[#0A1128]" : "bg-white"}>Singapore</option>
                    <option value="UAE" className={isDark ? "bg-[#0A1128]" : "bg-white"}>UAE</option>
                    <option value="Other" className={isDark ? "bg-[#0A1128]" : "bg-white"}>Other</option>
                </select>
            ) : (
                <input
                    required type={type} name={name} onChange={handleInput} value={formState[name]} placeholder=" "
                    className={`peer w-full h-16 pt-4 px-6 rounded-2xl text-sm font-bold border-2 transition-all duration-300 outline-none ${isDark ? 'bg-white/5 border-white/10 text-white focus:bg-white/10 focus:border-[#FFB31A]' : 'bg-slate-50 border-slate-200 text-[#2B3AA0] focus:bg-white focus:border-[#FFB31A]'}`}
                />
            )}
            <label className={`absolute left-6 top-5 text-[10px] font-black uppercase tracking-widest transition-all duration-300 pointer-events-none peer-focus:-translate-y-3 peer-focus:text-[8px] peer-[&:not(:placeholder-shown)]:-translate-y-3 peer-[&:not(:placeholder-shown)]:text-[8px] ${formState[name] ? '-translate-y-3 text-[8px]' : ''} ${isDark ? 'text-slate-400 peer-focus:text-[#FFB31A]' : 'text-slate-500 peer-focus:text-[#2B3AA0]'}`}>
                {label} *
            </label>
            {type === 'select' && (
                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1.5L6 6.5L11 1.5" stroke={isDark ? '#94A3B8' : '#64748B'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            )}
        </div>
    );

    return (
        <div className={`min-h-[80vh] ${isDark ? 'bg-[#050A18] text-white' : 'bg-[#F2F4F7] text-[#2B3AA0]'}`}>

            {/* HEADER SECTION */}
            <section className={`relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden ${isDark ? 'bg-[#0A1128]' : 'bg-[#2B3AA0]'} rounded-b-[3rem] md:rounded-b-[5rem]`}>
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
                </div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFB31A]/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"></div>

                <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-black uppercase tracking-[0.3em] text-[#FFB31A] mb-6">
                        <Sparkles size={14} className="fill-[#FFB31A]" />
                        Support & Guidance
                    </motion.div>
                    <motion.h1 initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.1 }} className="text-5xl md:text-7xl lg:text-8xl font-black uppercase italic tracking-tighter text-white drop-shadow-2xl">
                        GET IN TOUCH.
                    </motion.h1>
                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }} className="mt-8 text-lg text-white/80 max-w-2xl mx-auto font-medium">
                        Whether you're looking to enroll, schedule a trial, or just say hello—we're here and ready to elevate your game.
                    </motion.p>
                </div>
            </section>


            <main className="container mx-auto px-4 sm:px-6 -mt-10 md:-mt-16 relative z-20 pb-20">

                {/* TOP CONTACT CARDS GRID */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {/* Call Us */}
                    <a href="tel:+917975820187" className={`group rounded-[2rem] p-8 md:p-10 border transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl flex flex-col items-center text-center ${isDark ? 'bg-[#111B3A] border-[#1A264A] hover:border-[#FFB31A]/30 hover:shadow-[#FFB31A]/5' : 'bg-white border-slate-200 hover:border-[#FFB31A]/50 hover:shadow-[#2B3AA0]/10'}`}>
                        <div className="w-16 h-16 rounded-2xl bg-[#FFB31A] text-[#2B3AA0] flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                            <Phone size={28} />
                        </div>
                        <h3 className={`text-xl font-black uppercase tracking-widest mb-2 ${isDark ? 'text-white' : 'text-[#2B3AA0]'}`}>Call Us</h3>
                        <p className={`text-sm font-medium mb-4 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Mon-Sat, 9am to 6pm IST</p>
                        <span className="text-xl md:text-2xl font-black tracking-tight text-[#FFB31A]">+91 7975820187</span>
                    </a>

                    {/* Email Us */}
                    <a href="mailto:admin@thinqchess.com" className={`group rounded-[2rem] p-8 md:p-10 border transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl flex flex-col items-center text-center ${isDark ? 'bg-[#111B3A] border-[#1A264A] hover:border-[#FFB31A]/30 hover:shadow-[#FFB31A]/5' : 'bg-white border-slate-200 hover:border-[#FFB31A]/50 hover:shadow-[#2B3AA0]/10'}`}>
                        <div className="w-16 h-16 rounded-2xl bg-[#FFB31A] text-[#2B3AA0] flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                            <Mail size={28} />
                        </div>
                        <h3 className={`text-xl font-black uppercase tracking-widest mb-2 ${isDark ? 'text-white' : 'text-[#2B3AA0]'}`}>Email Us</h3>
                        <p className={`text-sm font-medium mb-4 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>We aim to reply within 24 hours</p>
                        <span className="text-xl md:text-2xl font-black tracking-tight text-[#FFB31A]">admin@thinqchess.com</span>
                    </a>

                    {/* Social Connect */}
                    <div className={`rounded-[2rem] p-8 md:p-10 border flex flex-col items-center justify-center text-center ${isDark ? 'bg-[#111B3A] border-[#1A264A]' : 'bg-white border-slate-200'}`}>
                        <h3 className={`text-xl font-black uppercase tracking-widest mb-2 ${isDark ? 'text-white' : 'text-[#2B3AA0]'}`}>Connect via Social</h3>
                        <p className={`text-sm font-medium mb-8 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Stay up to date with our latest news</p>
                        <div className="flex gap-4">
                            {[
                                { Icon: Instagram, href: "#" },
                                { Icon: Facebook, href: "#" },
                                { Icon: Linkedin, href: "#" },
                                { Icon: Youtube, href: "#" }
                            ].map(({ Icon, href }, i) => (
                                <a key={i} href={href} className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${isDark ? 'bg-white/5 text-white hover:bg-[#FFB31A] hover:text-[#2B3AA0]' : 'bg-slate-100 text-[#2B3AA0] hover:bg-[#FFB31A] hover:text-white'} hover:scale-110 hover:-translate-y-1`}>
                                    <Icon size={24} />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* BOTTOM SECTION: BENTO GRID OF MAPS + FORM */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-stretch">

                    {/* Left: The Maps (Offline Hubs) */}
                    <div className="lg:col-span-7 flex flex-col gap-6">
                        <div className="flex items-center gap-4 mb-2 ml-2">
                            <div className="w-10 h-10 rounded-xl bg-[#2B3AA0] text-white flex items-center justify-center shadow-lg"><MapPin size={20} /></div>
                            <h2 className={`text-3xl font-black italic uppercase tracking-tighter ${isDark ? 'text-white' : 'text-[#2B3AA0]'}`}>
                                OUR OFFLINE HUBS
                            </h2>
                        </div>

                        {/* Map Card 1 - JP Nagar */}
                        <div className={`flex-1 rounded-[2.5rem] border overflow-hidden flex flex-col shadow-xl transition-all hover:border-[#FFB31A]/50 hover:shadow-[0_20px_40px_rgba(255,179,26,0.15)] group ${isDark ? 'bg-[#111B3A] border-[#1A264A]' : 'bg-white border-slate-200'}`}>
                            {/* Card Header Info */}
                            <div className="p-8 pb-6 flex items-start justify-between gap-6 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#2B3AA0]/5 rounded-bl-full pointer-events-none transition-transform duration-700 group-hover:scale-150 group-hover:bg-[#FFB31A]/10"></div>
                                <div>
                                    <h3 className={`text-2xl font-black uppercase tracking-tight mb-2 ${isDark ? 'text-white' : 'text-[#2B3AA0]'}`}>JP Nagar 8th Phase</h3>
                                    <p className={`text-sm font-medium leading-relaxed max-w-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                                        JP Nagar 8th Phase, Bangalore, Karnataka
                                    </p>
                                </div>
                                <a href="https://www.google.com/maps/place/ThinQ+Chess+-+JP+Nagar+8th+Phase" target="_blank" rel="noopener noreferrer" className={`shrink-0 w-12 h-12 rounded-full flex items-center justify-center border transition-all ${isDark ? 'bg-white/5 border-white/10 text-[#FFB31A] hover:bg-white/10' : 'bg-slate-50 border-slate-200 text-[#2B3AA0] hover:bg-slate-100'}`}>
                                    <ArrowRight size={20} className="-rotate-45" />
                                </a>
                            </div>
                            {/* Map Iframe */}
                            <div className="h-64 w-full p-2 pt-0 relative z-10">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.5736485786764!2d77.57714357358713!3d12.870578117083454!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae6bfb70c1f8fb%3A0x930e1b9af0b9debd!2sThinQ%20Chess%20-%20JP%20Nagar%208th%20Phase!5e0!3m2!1sen!2sin!4v1734567890123!5m2!1sen!2sin"
                                    className={`w-full h-full rounded-[2rem] border-2 transition-colors ${isDark ? 'border-transparent group-hover:border-[#FFB31A]/30' : 'border-transparent group-hover:border-[#2B3AA0]/20'}`}
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    title="ThinQ Chess - JP Nagar"
                                ></iframe>
                            </div>
                        </div>

                        {/* Map Card 2 - Akshayanagar */}
                        <div className={`flex-1 rounded-[2.5rem] border overflow-hidden flex flex-col shadow-xl transition-all hover:border-[#FFB31A]/50 hover:shadow-[0_20px_40px_rgba(255,179,26,0.15)] group ${isDark ? 'bg-[#111B3A] border-[#1A264A]' : 'bg-white border-slate-200'}`}>
                            {/* Card Header Info */}
                            <div className="p-8 pb-6 flex items-start justify-between gap-6 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFB31A]/5 rounded-bl-full pointer-events-none transition-transform duration-700 group-hover:scale-150 group-hover:bg-[#FFB31A]/15"></div>
                                <div>
                                    <h3 className={`text-2xl font-black uppercase tracking-tight mb-2 ${isDark ? 'text-white' : 'text-[#2B3AA0]'}`}>Akshayanagar</h3>
                                    <p className={`text-sm font-medium leading-relaxed max-w-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                                        3rd Floor, Karthikeya Complex, Mahaveer Road, Akshayanagar Gardens, West, Bengaluru 560068
                                    </p>
                                </div>
                                <a href="https://www.google.com/maps/place/ThinQ+Chess+-+Akshayanagar" target="_blank" rel="noopener noreferrer" className={`shrink-0 w-12 h-12 rounded-full flex items-center justify-center border transition-all ${isDark ? 'bg-white/5 border-white/10 text-[#FFB31A] hover:bg-white/10' : 'bg-slate-50 border-slate-200 text-[#2B3AA0] hover:bg-slate-100'}`}>
                                    <ArrowRight size={20} className="-rotate-45" />
                                </a>
                            </div>
                            {/* Map Iframe */}
                            <div className="h-64 w-full p-2 pt-0 relative z-10">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.0736!2d77.6108847!3d12.8750299!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x466bc668dec53c91%3A0x9d04e17d485fbb41!2sThinQ%20Chess%20-%20Akshayanagar!5e0!3m2!1sen!2sin!4v1734567890124!5m2!1sen!2sin"
                                    className={`w-full h-full rounded-[2rem] border-2 transition-colors ${isDark ? 'border-transparent group-hover:border-[#FFB31A]/30' : 'border-transparent group-hover:border-[#2B3AA0]/20'}`}
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    title="ThinQ Chess - Akshayanagar"
                                ></iframe>
                            </div>
                        </div>
                    </div>


                    {/* Right: The Inquiry Form */}
                    <div className="lg:col-span-5 flex h-full">
                        <div className={`w-full rounded-[2.5rem] p-8 md:p-10 lg:p-12 shadow-[0_40px_100px_rgba(43,58,160,0.15)] flex flex-col justify-between border ${isDark ? 'bg-gradient-to-b from-[#1E2D5A] to-[#0A1128] border-[#FFB31A]/20' : 'bg-white border-white'}`}>
                            <div className="mb-10">
                                <h2 className={`text-4xl md:text-5xl font-black italic uppercase tracking-tighter mb-4 ${isDark ? 'text-white' : 'text-[#2B3AA0]'}`}>
                                    Send us a <br /> Message
                                </h2>
                                <p className={`text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>
                                    Fill out the form below. Our support team will respond as quickly as possible.
                                </p>
                            </div>

                            {submitStatus === 'success' ? (
                                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex-1 flex flex-col items-center justify-center text-center py-20">
                                    <div className="w-24 h-24 rounded-full bg-emerald-500/10 flex items-center justify-center mb-6">
                                        <Sparkles size={40} className="text-emerald-500 fill-emerald-500" />
                                    </div>
                                    <h3 className={`text-3xl font-black uppercase tracking-tight mb-2 ${isDark ? 'text-white' : 'text-[#2B3AA0]'}`}>Message Sent!</h3>
                                    <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                                        Thank you for reaching out. We will get back to you shortly.
                                    </p>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6 flex-1 flex flex-col justify-between">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <InputField label="Parent's Name" name="parentName" />
                                        <InputField label="Child's Name" name="childName" />

                                        <div className="space-y-2 relative group md:col-span-1">
                                            <PhoneInput
                                                country={'in'} value={formState.phone} onChange={handlePhone}
                                                containerClass="!bg-transparent"
                                                inputClass={`peer !w-full !h-16 !pt-4 !rounded-2xl !border-2 !pl-16 !text-sm !font-bold transition-all duration-300 outline-none ${isDark ? '!bg-white/5 !border-white/10 !text-white focus:!bg-white/10 focus:!border-[#FFB31A]' : '!bg-slate-50 !border-slate-200 !text-[#2B3AA0] focus:!bg-white focus:!border-[#FFB31A]'}`}
                                                buttonClass={`!bg-transparent !border-none !rounded-l-2xl !pl-2 ${isDark ? '[&_.selected-flag:hover]:!bg-white/5' : '[&_.selected-flag:hover]:!bg-black/5'}`}
                                            />
                                            <label className={`absolute left-16 top-2 text-[8px] font-black uppercase tracking-widest transition-all duration-300 pointer-events-none z-10 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Phone Number *</label>
                                        </div>

                                        <InputField label="Email Address" name="email" type="email" />
                                        <InputField label="Child's Age" name="age" type="number" />
                                        <InputField label="State" name="state" />
                                        <InputField label="Country" name="country" type="select" colSpan={2} />
                                    </div>

                                    <div className="pt-6 mt-auto">
                                        <button type="submit" disabled={isSubmitting} className="w-full h-16 rounded-2xl bg-[#FFB31A] text-[#2B3AA0] font-black uppercase tracking-[0.2em] text-[11px] sm:text-xs transition-all flex justify-center items-center gap-3 overflow-hidden group relative shadow-2xl hover:shadow-[0_20px_40px_rgba(255,179,26,0.3)] disabled:opacity-70 disabled:cursor-not-allowed">
                                            <div className="absolute inset-0 bg-white translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-in-out"></div>
                                            <span className="relative z-10 group-hover:text-[#2B3AA0]">{isSubmitting ? 'Sending Request...' : 'Send Message'}</span>
                                            {!isSubmitting && <Send size={16} className="relative z-10 transition-transform group-hover:translate-x-1" />}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>

                </div>
            </main>

        </div>
    );
}
