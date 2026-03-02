"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Shield, Crown, Star, Users, CheckCircle2 } from 'lucide-react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import Link from 'next/link';
import { useTheme } from '@/components/ThemeProvider';

export default function FreeTrialPage() {
    const { isDark } = useTheme();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [formData, setFormData] = useState({
        parentName: '',
        childName: '',
        age: '',
        phone: '',
        email: '',
        country: '',
        state: '',
        pastTraining: '',
        message: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleLevelSelect = (level) => {
        setFormData(prev => ({ ...prev, pastTraining: level }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitSuccess(true);
        }, 1500);
    };

    if (submitSuccess) {
        return (
            <div className={`min-h-[85vh] ${isDark ? 'bg-[#050A18]' : 'bg-[#FAFAFA]'}`}>
                <div className="flex items-center justify-center min-h-[80vh] px-4 pt-12">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={`max-w-md w-full p-10 rounded-3xl text-center shadow-2xl border ${isDark ? 'bg-[#111B3A] border-[#1E2D5A]' : 'bg-white border-slate-100'}`}
                    >
                        <div className="w-24 h-24 bg-[#FFB31A]/10 rounded-full flex items-center justify-center mx-auto mb-8 border-4 border-[#FFB31A]/20">
                            <CheckCircle2 className="w-12 h-12 text-[#FFB31A]" />
                        </div>
                        <h2 className={`text-3xl font-black italic uppercase tracking-tight mb-4 ${isDark ? 'text-white' : 'text-[#2B3AA0]'}`}>
                            TRIAL CONFIRMED!
                        </h2>
                        <p className={`text-base font-medium mb-10 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                            Thank you for taking the first step. Our academy coordinators will reach out shortly to align your free session.
                        </p>
                        <Link href="/" className="btn-gold px-8 py-4 w-full justify-center shadow-xl shadow-[#FFB31A]/20">
                            Return to Homepage
                        </Link>
                    </motion.div>
                </div>
            </div>
        );
    }

    return (
        <div className={`min-h-screen ${isDark ? 'bg-[#050A18]' : 'bg-[#F2F4F7]'}`}>

            {/* Main Layout containing Sidebar and Form */}
            <main className="container mx-auto px-4 sm:px-6 pt-24 pb-16 min-h-screen flex items-center">
                <div className="w-full max-w-7xl mx-auto mt-8 md:mt-12 xl:mt-16">

                    {/* Back to Home Button */}
                    <div className="mb-8">
                        <Link href="/" className={`inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest hover:text-[#FFB31A] transition-colors ${isDark ? 'text-slate-400' : 'text-[#2B3AA0]/60'}`}>
                            <ArrowLeft size={16} /> BACK TO ACADEMY
                        </Link>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8 xl:gap-12 w-full shadow-2xl rounded-3xl overflow-hidden relative border border-black/5 dark:border-white/5">

                        {/* ===================================== */}
                        {/* LEFT WING: TRUST SIGNALS & BRANDING     */}
                        {/* ===================================== */}
                        <div className="lg:w-5/12 aspect-square lg:aspect-auto bg-[#2B3AA0] text-white p-8 sm:p-12 xl:p-16 flex flex-col justify-between relative overflow-hidden">

                            {/* Decorative Background Image inside Left Wing */}
                            <div className="absolute inset-0 z-0">
                                <img src="/assets/home/Practice time.jpeg" alt="Academy Background" className="w-full h-full object-cover opacity-20 mix-blend-luminosity scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128] via-[#2B3AA0]/80 to-[#2B3AA0]/95"></div>
                            </div>

                            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="relative z-10">
                                <Crown className="w-12 h-12 text-[#FFB31A] mb-8" />
                                <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter leading-tight mb-6">
                                    START YOUR <br /><span className="text-[#FFB31A]">JOURNEY.</span>
                                </h2>
                                <p className="text-lg md:text-xl font-medium text-slate-300 mb-10 leading-relaxed opacity-90 max-w-sm">
                                    Join the elite league of chess thinkers. Experience our curriculum firsthand with a specialized 1-on-1 assessment trial.
                                </p>
                            </motion.div>

                            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="relative z-10 space-y-6">
                                {/* Feature 1 */}
                                <div className="flex gap-4 items-center">
                                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0 border border-white/5">
                                        <Users className="w-4 h-4 text-[#FFB31A]" />
                                    </div>
                                    <div>
                                        <div className="font-black tracking-widest text-[11px] uppercase">15,000+ Students</div>
                                        <div className="text-xs text-slate-400 mt-1">Globally mentored by masters.</div>
                                    </div>
                                </div>
                                {/* Feature 2 */}
                                <div className="flex gap-4 items-center">
                                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0 border border-white/5">
                                        <Shield className="w-4 h-4 text-[#FFB31A]" />
                                    </div>
                                    <div>
                                        <div className="font-black tracking-widest text-[11px] uppercase">Scientific Curriculum</div>
                                        <div className="text-xs text-slate-400 mt-1">Structured modules from basics to pro.</div>
                                    </div>
                                </div>

                                {/* 5 Star Reviews */}
                                <div className="pt-8 mt-8 border-t border-white/10">
                                    <div className="flex gap-1 mb-2">
                                        {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-[#FFB31A] text-[#FFB31A]" />)}
                                    </div>
                                    <div className="font-medium italic text-slate-300 text-sm">
                                        &quot;Founders have the ideal mindset to nurture and develop emerging talent. Highly recommended!&quot;
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* ===================================== */}
                        {/* RIGHT WING: THE FORM                  */}
                        {/* ===================================== */}
                        <div className={`lg:w-7/12 p-8 sm:p-12 xl:p-16 flex flex-col justify-center ${isDark ? 'bg-[#0A1128]' : 'bg-white'}`}>
                            <div className="max-w-2xl mx-auto w-full">
                                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>

                                    <h3 className={`text-2xl font-black uppercase tracking-tight mb-2 ${isDark ? 'text-white' : 'text-[#2B3AA0]'}`}>Book Your Free Trial</h3>
                                    <p className={`text-sm mb-10 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Please fill out the details below. All fields marked with * are mandatory.</p>

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        {/* Parent & Child Names */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className={`block text-[10px] font-black uppercase tracking-widest mb-2 ${isDark ? 'text-slate-400' : 'text-[#2B3AA0]/70'}`}>Parent Name *</label>
                                                <input required type="text" name="parentName" value={formData.parentName} onChange={handleInputChange} placeholder="E.g. Rajesh Kumar" className="w-full form-input" />
                                            </div>
                                            <div>
                                                <label className={`block text-[10px] font-black uppercase tracking-widest mb-2 ${isDark ? 'text-slate-400' : 'text-[#2B3AA0]/70'}`}>Child Name *</label>
                                                <input required type="text" name="childName" value={formData.childName} onChange={handleInputChange} placeholder="E.g. Aryan Kumar" className="w-full form-input" />
                                            </div>
                                        </div>

                                        {/* Contact Info */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className={`block text-[10px] font-black uppercase tracking-widest mb-2 ${isDark ? 'text-slate-400' : 'text-[#2B3AA0]/70'}`}>Email Address *</label>
                                                <input required type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="arya@example.com" className="w-full form-input" />
                                            </div>
                                            <div>
                                                <label className={`block text-[10px] font-black uppercase tracking-widest mb-2 ${isDark ? 'text-slate-400' : 'text-[#2B3AA0]/70'}`}>Phone Number *</label>
                                                <div className="phone-input-container">
                                                    <PhoneInput
                                                        country={'in'}
                                                        value={formData.phone}
                                                        onChange={(phone) => setFormData(prev => ({ ...prev, phone }))}
                                                        inputClass="w-full form-input pl-14"
                                                        buttonClass="bg-transparent border-0 px-2"
                                                        dropdownClass={isDark ? '!bg-[#111B3A] !text-white' : ''}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Geography Info */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className={`block text-[10px] font-black uppercase tracking-widest mb-2 ${isDark ? 'text-slate-400' : 'text-[#2B3AA0]/70'}`}>Country *</label>
                                                <input required type="text" name="country" value={formData.country} onChange={handleInputChange} placeholder="India" className="w-full form-input" />
                                            </div>
                                            <div>
                                                <label className={`block text-[10px] font-black uppercase tracking-widest mb-2 ${isDark ? 'text-slate-400' : 'text-[#2B3AA0]/70'}`}>State *</label>
                                                <input required type="text" name="state" value={formData.state} onChange={handleInputChange} placeholder="Delhi" className="w-full form-input" />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {/* Child Age */}
                                            <div>
                                                <label className={`block text-[10px] font-black uppercase tracking-widest mb-2 ${isDark ? 'text-slate-400' : 'text-[#2B3AA0]/70'}`}>Child's Age *</label>
                                                <input required type="number" name="age" value={formData.age} onChange={handleInputChange} placeholder="E.g. 8" className="w-full form-input" />
                                            </div>
                                        </div>

                                        {/* Past Training Choice */}
                                        <div className="py-2 justify-self-stretch w-full">
                                            <label className={`block text-[10px] font-black uppercase tracking-widest mb-4 ${isDark ? 'text-slate-400' : 'text-[#2B3AA0]/70'}`}>Have you taken formal chess training in the past? *</label>
                                            <div className="flex gap-4">
                                                <button type="button" onClick={() => handleLevelSelect('Yes')} className={`flex-1 py-4 px-6 rounded-xl border-2 transition-all font-black text-xs uppercase tracking-widest ${formData.pastTraining === 'Yes' ? 'border-[#FFB31A] bg-[#FFB31A]/10 text-[#FFB31A]' : isDark ? 'border-[#1E2D5A] text-slate-400 hover:border-white/20' : 'border-slate-200 text-slate-500 hover:border-slate-300'}`}>
                                                    Yes
                                                </button>
                                                <button type="button" onClick={() => handleLevelSelect('No')} className={`flex-1 py-4 px-6 rounded-xl border-2 transition-all font-black text-xs uppercase tracking-widest ${formData.pastTraining === 'No' ? 'border-[#FFB31A] bg-[#FFB31A]/10 text-[#FFB31A]' : isDark ? 'border-[#1E2D5A] text-slate-400 hover:border-white/20' : 'border-slate-200 text-slate-500 hover:border-slate-300'}`}>
                                                    No
                                                </button>
                                            </div>
                                        </div>

                                        {/* Optional Message */}
                                        <div className="pt-2">
                                            <label className={`block text-[10px] font-black uppercase tracking-widest mb-2 ${isDark ? 'text-slate-400' : 'text-[#2B3AA0]/70'}`}>Additional Message (Optional)</label>
                                            <textarea name="message" value={formData.message} onChange={handleInputChange} rows={3} placeholder="Any specific goals or preferences..." className="w-full form-input resize-none py-4"></textarea>
                                        </div>

                                        {/* Checkbox */}
                                        <div className="flex items-start gap-3 pt-2">
                                            <input type="checkbox" required className="mt-1" id="terms" />
                                            <label htmlFor="terms" className={`text-[11px] leading-tight font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                                                I agree to receive communications regarding my trial class via email and WhatsApp.
                                            </label>
                                        </div>

                                        {/* Submit Button */}
                                        <div className="pt-6">
                                            <button type="submit" disabled={isSubmitting || !formData.pastTraining} className={`w-full group h-16 rounded-2xl flex justify-center items-center gap-4 text-xs font-black uppercase tracking-[0.2em] transition-all relative overflow-hidden shadow-2xl ${(isSubmitting || !formData.pastTraining) ? 'bg-slate-300 text-slate-500 cursor-not-allowed' : 'bg-[#FFB31A] text-[#2B3AA0] hover:-translate-y-1'}`}>
                                                <div className="absolute inset-0 bg-white transition-transform duration-500 ease-in-out translate-y-[100%] group-hover:translate-y-0 z-0"></div>
                                                <span className="relative z-10">{isSubmitting ? 'PROCESSING...' : 'CONFIRM TRIAL BOOKING'}</span>
                                                {!isSubmitting && <ArrowRight className="w-5 h-5 relative z-10 transition-transform group-hover:translate-x-2" />}
                                            </button>
                                        </div>

                                    </form>
                                </motion.div>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
}
