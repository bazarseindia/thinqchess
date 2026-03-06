"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
    User,
    Users,
    MapPin,
    BookOpen,
    ShieldCheck,
    ArrowRight,
    ChevronRight,
    Globe,
    Phone,
    Mail,
    AlertCircle,
    CheckCircle2,
    Trophy,
    Home,
    GraduationCap,
    Star,
    Award,
    Clock,
    CheckCircle
} from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import { useSiteData } from '@/components/SiteDataContext';
import { Country, State, City } from 'country-state-city';
import Select from 'react-select';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const RegistrationPage = () => {
    const { isDark } = useTheme();
    const { media } = useSiteData();
    const [phase, setPhase] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    // --- FORM STATE (v1 Parity) ---
    const [classesFor, setClassesFor] = useState("Child");
    const [formData, setFormData] = useState({
        studentFirstName: "",
        studentMiddleName: "",
        studentLastName: "",
        age: "",
        gender: "",
        studentEmail: "",
        studentPhone: "",

        fatherFirstName: "",
        fatherMiddleName: "",
        fatherLastName: "",
        fatherEmail: "",
        fatherPhone: "",
        motherFirstName: "",
        motherMiddleName: "",
        motherLastName: "",
        motherEmail: "",
        motherPhone: "",

        country: "",
        countryCode: "",
        state: "",
        city: "",
        address_line1: "",
        address_line2: "",
        pincode: "",

        mode: "",
        coaching_city: "",
        preferredCentre: "",

        heardFrom: "",
        refFirstName: "",
        refLastName: "",
        otherSource: "",

        tc1: false,
        tc2: false
    });

    const [locationData, setLocationData] = useState({
        states: [],
        cities: []
    });

    // --- LOGIC: LOCATION SELECTORS ---
    useEffect(() => {
        if (formData.countryCode) {
            setLocationData(prev => ({
                ...prev,
                states: State.getStatesOfCountry(formData.countryCode).map(s => ({ value: s.isoCode, label: s.name })),
                cities: []
            }));
        }
    }, [formData.countryCode]);

    useEffect(() => {
        if (formData.countryCode && formData.state) {
            setLocationData(prev => ({
                ...prev,
                cities: City.getCitiesOfState(formData.countryCode, formData.state).map(c => ({ value: c.name, label: c.name }))
            }));
        }
    }, [formData.state, formData.countryCode]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSelectChange = (name, selectedOption) => {
        setFormData(prev => {
            const update = { ...prev, [name]: selectedOption ? selectedOption.value : "" };
            if (name === "countryCode") {
                update.country = selectedOption ? selectedOption.label : "";
                update.state = "";
                update.city = "";
            }
            if (name === "state") update.city = "";
            return update;
        });
    };

    // --- LOGIC: PHASE NAVIGATION ---
    const validatePhase = () => {
        setError("");
        if (phase === 1) {
            if (!formData.studentFirstName || !formData.studentLastName || !formData.age || !formData.gender) {
                setError("Please complete all required fields.");
                return false;
            }
            const age = parseInt(formData.age);
            if (age < 3) { setError("Student must be at least 3 years old."); return false; }
            if (classesFor === "Child" && age > 18) { setError("Age above 18 must select 'Adult' category."); return false; }
            if (classesFor !== "Child" && (!formData.studentEmail || !formData.studentPhone)) {
                setError("Email and Phone are mandatory for Adult / Sr. Citizen registrations.");
                return false;
            }
        }
        if (phase === 2 && classesFor === "Child") {
            const fatherComplete = formData.fatherFirstName && formData.fatherLastName && formData.fatherEmail && formData.fatherPhone;
            const motherComplete = formData.motherFirstName && formData.motherLastName && formData.motherEmail && formData.motherPhone;
            if (!fatherComplete && !motherComplete) {
                setError("Please provide details for at least one parent.");
                return false;
            }
        }
        if (phase === 3) {
            if (!formData.country || !formData.state || !formData.city || !formData.address_line1 || !formData.pincode) {
                setError("Full address is mandatory.");
                return false;
            }
            if (formData.country === "India" && !/^\d{6}$/.test(formData.pincode)) {
                setError("Indian pincode must be exactly 6 digits.");
                return false;
            }
        }
        if (phase === 4) {
            if (!formData.mode) { setError("Please select Online or Offline mode."); return false; }
            if (formData.mode === "Offline" && !formData.coaching_city) { setError("Please select a coaching city."); return false; }
            if (formData.mode === "Offline" && !formData.preferredCentre) { setError("Please select a centre."); return false; }
        }
        return true;
    };

    const nextStep = () => {
        if (!validatePhase()) return;
        if (phase === 1 && classesFor !== "Child") {
            setPhase(3);
        } else {
            setPhase(prev => prev + 1);
        }

        // Scroll to form top smoothly
        const formElement = document.getElementById('registration-form');
        if (formElement) formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const prevStep = () => {
        if (phase === 3 && classesFor !== "Child") {
            setPhase(1);
        } else {
            setPhase(prev => prev - 1);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.tc1 || !formData.tc2) {
            setError("You must accept all terms to proceed.");
            return;
        }
        setIsSubmitting(true);
        try {
            const response = await fetch('/api/course-registration', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    participant_first_name: formData.studentFirstName,
                    participant_last_name: formData.studentLastName,
                    email: formData.studentEmail || formData.fatherEmail || formData.motherEmail,
                    phone: formData.studentPhone || formData.fatherPhone || formData.motherPhone,
                    age: formData.age,
                    course_type: formData.mode,
                    gender: formData.gender,
                    father_name: `${formData.fatherFirstName} ${formData.fatherLastName}`,
                    mother_name: `${formData.motherFirstName} ${formData.motherLastName}`,
                    address: `${formData.address_line1}, ${formData.address_line2}`,
                    city: formData.city,
                    state: formData.state,
                    country: formData.country,
                    pincode: formData.pincode,
                    heard_from: formData.heardFrom,
                    coaching_city: formData.coaching_city || '',
                    preferred_centre: formData.preferredCentre || '',
                    referral_name: formData.heardFrom === 'Friends/Family' ? `${formData.refFirstName} ${formData.refLastName}` : '',
                    other_source: formData.heardFrom === 'Other' ? formData.otherSource : ''
                }),
            });

            if (response.ok) {
                // Google Sheets backup (fire and forget — V1 parity)
                try {
                    fetch('/api/submit', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            studentName: `${formData.studentFirstName} ${formData.studentLastName}`,
                            email: formData.studentEmail || formData.fatherEmail || formData.motherEmail,
                            phone: formData.studentPhone || formData.fatherPhone || formData.motherPhone,
                            mode: formData.mode,
                            city: formData.city,
                            country: formData.country,
                        }),
                    });
                } catch (sheetErr) { /* silent — backup only */ }
                setSuccess(true);
            } else {
                setError("Database submission failed. Please try again.");
            }
        } catch (err) {
            setError("System error. Please contact support.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const customSelectStyles = (isDark) => ({
        control: (base, state) => ({
            ...base,
            backgroundColor: isDark ? '#111B3A' : '#f8fafc',
            borderColor: state.isFocused ? '#FFB31A' : isDark ? '#1E2D5A' : '#e2e8f0',
            borderRadius: '1rem',
            padding: '0.4rem 0.6rem',
            color: isDark ? 'white' : '#2B3AA0',
            boxShadow: 'none',
            fontSize: '0.9rem',
            '&:hover': {
                borderColor: '#FFB31A'
            }
        }),
        menu: (base) => ({
            ...base,
            backgroundColor: isDark ? '#111B3A' : 'white',
            borderRadius: '1rem',
            zIndex: 50
        }),
        option: (base, state) => ({
            ...base,
            backgroundColor: state.isSelected ? '#FFB31A' : state.isFocused ? 'rgba(255, 179, 26, 0.1)' : 'transparent',
            color: state.isSelected ? '#2B3AA0' : isDark ? '#cbd5e1' : '#2B3AA0',
            cursor: 'pointer',
            fontSize: '0.85rem'
        }),
        singleValue: (base) => ({
            ...base,
            color: isDark ? 'white' : '#2B3AA0',
            fontWeight: '600'
        })
    });

    if (success) {
        return (
            <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-[#0A1128]' : 'bg-slate-50'}`}>
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className={`text-center p-16 max-w-2xl rounded-[3rem] border shadow-2xl ${isDark ? 'bg-[#111B3A] border-white/5' : 'bg-white border-slate-100'}`}>
                    <div className="w-24 h-24 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-10">
                        <CheckCircle2 className="text-emerald-500" size={48} />
                    </div>
                    <h1 className="text-4xl font-black italic uppercase tracking-tighter mb-6 text-[#FFB31A]">Enrollment Confirmed</h1>
                    <p className="text-lg font-medium opacity-70 mb-12">Welcome to the Academy. Your registration has been successfully processed. An academic counselor will contact you shortly to schedule your orientation.</p>
                    <Link href="/" className="px-12 py-5 bg-[#2B3AA0] text-white font-black uppercase tracking-widest rounded-2xl hover:bg-[#FFB31A] hover:text-[#2B3AA0] transition-all">
                        Back to Academy Home
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className={`min-h-screen ${isDark ? 'bg-[#0A1128] text-white' : 'bg-slate-50 text-[#2B3AA0]'} font-sans antialiased overflow-x-hidden transition-colors duration-500`}>

            {/* 1. PROFESSIONAL ACADEMIC HERO */}
            <section className="relative min-h-[50vh] flex items-center pt-32 pb-24 overflow-hidden border-b border-white/10">
                {/* Immersive Background */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={media.img_registration_bg || "/assets/home/Thinq Chess Tournament.jpeg"}
                        alt="Thinq Chess Academy Tournament"
                        className="w-full h-full object-cover opacity-50 grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128] via-[#0A1128]/60 to-transparent"></div>
                    <div className={`absolute inset-0 bg-gradient-to-r ${isDark ? 'from-[#0A1128]/80 to-transparent' : 'from-[#2B3AA0]/90 to-[#2B3AA0]/40'}`}></div>
                </div>

                <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFB31A]/20 text-[#FFB31A] font-black uppercase tracking-[0.3em] text-[10px] mb-8 border border-[#FFB31A]/30 backdrop-blur-md">
                        <Star className="fill-[#FFB31A]" size={12} /> Enrollment Gateway
                    </motion.div>
                    <motion.h1 initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-tight mb-6 text-white drop-shadow-2xl">
                        COMPLETE YOUR <span className="text-[#FFB31A]">ENROLLMENT</span>
                    </motion.h1>
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-lg md:text-xl font-medium text-white/80 mx-auto max-w-2xl drop-shadow-lg leading-relaxed">
                        Join 15,000+ promising players in Bangalore's most elite chess training program. Complete the secure intake form below to begin your mastery journey.
                    </motion.p>
                </div>
            </section>

            {/* 2. THE PATH TO MASTERY (VISUAL CONTENT) */}
            <section className="py-24 relative z-10">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
                        {[
                            { step: "01", title: "Personal Assessment", desc: "Our masters assess your current expertise level.", icon: GraduationCap },
                            { step: "02", title: "Tailored Curriculum", desc: "A personalized learning path is mapped for your goals.", icon: BookOpen },
                            { step: "03", title: "Grandmaster Track", desc: "Continuous mentorship from world-class trainers.", icon: Trophy }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2 }}
                                className={`p-10 rounded-[3rem] border ${isDark ? 'bg-white/5 border-white/5' : 'bg-white border-slate-100'} shadow-xl group hover:-translate-y-4 transition-all duration-500`}
                            >
                                <div className="w-16 h-16 rounded-2xl bg-[#FFB31A]/10 flex items-center justify-center text-[#FFB31A] mb-8 group-hover:bg-[#FFB31A] group-hover:text-white transition-colors">
                                    <item.icon size={28} />
                                </div>
                                <div className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#FFB31A] mb-3">Phase {item.step}</div>
                                <h3 className="text-2xl font-black uppercase italic tracking-tight mb-4">{item.title}</h3>
                                <p className="text-sm font-medium opacity-50 italic leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. MASTERCLASS REGISTRATION HUB (THE FORM) */}
            <section id="registration-form" className="py-24 md:py-40 border-t border-white/5 bg-transparent">
                <div className="container mx-auto px-6">
                    <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-20">

                        {/* Summary & Benefits Sidebar */}
                        <aside className="lg:w-1/3 space-y-12">
                            <div className="space-y-6">
                                <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase leading-none">THE <span className="text-[#FFB31A]">ADVANTAGE.</span></h2>
                                <p className="text-lg font-medium opacity-50 italic">Why the world's most promising players choose ThinQ Academy.</p>
                            </div>

                            <div className="space-y-8">
                                {[
                                    { title: "Structured Curriculum", desc: "FIDE-standard training modules." },
                                    { title: "Elite Mentorship", desc: "Learn from recognized Grandmasters." },
                                    { title: "Global Community", desc: "Join 15,000+ active chess players." },
                                    { title: "Career Guidance", desc: "Professional roadmap for competitive play." }
                                ].map((benefit, i) => (
                                    <div key={i} className="flex gap-6 items-start">
                                        <div className="shrink-0 w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                                            <CheckCircle size={16} />
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-black uppercase tracking-tight italic mb-1">{benefit.title}</h4>
                                            <p className="text-[13px] font-medium opacity-50 italic">{benefit.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className={`p-10 rounded-[2.5rem] border ${isDark ? 'bg-white/5 border-white/10' : 'bg-[#2B3AA0] text-white'} shadow-2xl`}>
                                <Phone className="text-[#FFB31A] mb-6" size={32} />
                                <h4 className="text-2xl font-black uppercase italic tracking-tight mb-4">Need Assistance?</h4>
                                <p className="text-sm font-medium opacity-70 mb-8 italic">Talk to an Academic Counselor if you need help selecting the right program.</p>
                                <a href="tel:+917975820187" className="text-2xl font-black text-[#FFB31A] block">+91 79758 20187</a>
                            </div>
                        </aside>

                        {/* HIGH-FIDELITY MULTI-STEP FORM */}
                        <div className="lg:w-2/3">
                            <div className={`rounded-[3.5rem] border shadow-[0_50px_100px_rgba(0,0,0,0.1)] overflow-hidden ${isDark ? 'bg-[#111B3A] border-white/5' : 'bg-white border-slate-100'}`}>

                                {/* Form Top Progress Indicator */}
                                <div className={`p-8 lg:p-12 border-b flex items-center justify-between ${isDark ? 'border-white/5' : 'border-slate-50'}`}>
                                    <div className="flex gap-4">
                                        {[1, 2, 3, 4, 5].filter(id => id !== 2 || classesFor === "Child").map((id, idx) => (
                                            <div key={id} className={`w-3 h-3 rounded-full transition-all duration-500 ${phase === id ? 'w-10 bg-[#FFB31A]' : phase > id ? 'bg-emerald-500' : 'bg-white/10'}`}></div>
                                        ))}
                                    </div>
                                    <div className="text-[11px] font-black uppercase tracking-widest opacity-40">
                                        Phase {phase} of 5
                                    </div>
                                </div>

                                <div className="p-10 lg:p-16">
                                    <form onSubmit={handleSubmit} className="space-y-12">
                                        <AnimatePresence mode="wait">

                                            {/* PHASE 1: STUDENT IDENTITY */}
                                            {phase === 1 && (
                                                <motion.div key="p1" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.02 }} className="space-y-10">
                                                    <div className="space-y-6">
                                                        <label className="text-[11px] font-black uppercase tracking-[0.4em] text-[#FFB31A]">Enrollment Category</label>
                                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                            {["Child", "Adult", "Sr Citizen"].map((val) => (
                                                                <button
                                                                    key={val}
                                                                    type="button"
                                                                    onClick={() => setClassesFor(val)}
                                                                    className={`px-8 py-5 rounded-[1.5rem] border transition-all font-black uppercase text-[10px] tracking-widest ${classesFor === val ? 'bg-[#2B3AA0] text-white border-[#2B3AA0] shadow-xl' : 'bg-transparent border-white/10 opacity-60 hover:opacity-100'}`}
                                                                >
                                                                    {val}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                        <FormInput label="Student First Name *" name="studentFirstName" value={formData.studentFirstName} onChange={handleInputChange} placeholder="Ex: Magnus" isDark={isDark} />
                                                        <FormInput label="Student Last Name *" name="studentLastName" value={formData.studentLastName} onChange={handleInputChange} placeholder="Ex: Carlsen" isDark={isDark} />
                                                        <FormInput label="Child's Age (in years) *" name="age" type="number" value={formData.age} onChange={handleInputChange} placeholder="Ex: 8" isDark={isDark} />

                                                        <div className="space-y-4">
                                                            <label className="text-[10px] font-black uppercase tracking-widest opacity-40 px-2">Gender *</label>
                                                            <div className="flex gap-4">
                                                                {["Male", "Female", "Other"].map(g => (
                                                                    <button
                                                                        key={g}
                                                                        type="button"
                                                                        onClick={() => setFormData(prev => ({ ...prev, gender: g }))}
                                                                        className={`flex-1 h-16 rounded-[1.5rem] border transition-all text-[11px] font-black uppercase ${formData.gender === g ? 'bg-[#2B3AA0] text-white border-[#2B3AA0]' : 'border-white/10'}`}
                                                                    >
                                                                        {g}
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        </div>

                                                        {classesFor !== "Child" && (
                                                            <>
                                                                <FormInput label="Email Address *" name="studentEmail" type="email" value={formData.studentEmail} onChange={handleInputChange} placeholder="magnus@academy.com" isDark={isDark} />
                                                                <div className="space-y-4">
                                                                    <label className="text-[10px] font-black uppercase tracking-widest opacity-40 px-2">Phone Number *</label>
                                                                    <PhoneInput
                                                                        country={'in'}
                                                                        value={formData.studentPhone}
                                                                        onChange={val => setFormData(prev => ({ ...prev, studentPhone: val }))}
                                                                        containerClass="!bg-transparent"
                                                                        inputClass={`!w-full !h-16 !rounded-[1.5rem] !border-white/10 !pl-16 !font-bold ${isDark ? '!bg-[#0A1128] !text-white' : '!bg-slate-50 !text-[#2B3AA0]'}`}
                                                                        buttonClass="!bg-transparent !border-white/10 !rounded-l-[1.5rem]"
                                                                    />
                                                                </div>
                                                            </>
                                                        )}
                                                    </div>
                                                </motion.div>
                                            )}

                                            {/* PHASE 2: GUARDIANS */}
                                            {phase === 2 && classesFor === "Child" && (
                                                <motion.div key="p2" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.02 }} className="space-y-12">
                                                    <div className="space-y-10">
                                                        <h3 className="text-2xl font-black italic uppercase tracking-tighter text-[#FFB31A]">Father's Details</h3>
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                            <FormInput label="First Name *" name="fatherFirstName" value={formData.fatherFirstName} onChange={handleInputChange} isDark={isDark} />
                                                            <FormInput label="Last Name *" name="fatherLastName" value={formData.fatherLastName} onChange={handleInputChange} isDark={isDark} />
                                                            <FormInput label="Email *" name="fatherEmail" type="email" value={formData.fatherEmail} onChange={handleInputChange} isDark={isDark} />
                                                            <div className="space-y-4">
                                                                <label className="text-[10px] font-black uppercase tracking-widest opacity-40 px-2">Phone *</label>
                                                                <PhoneInput country={'in'} value={formData.fatherPhone} onChange={val => setFormData(prev => ({ ...prev, fatherPhone: val }))} />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="space-y-10 border-t border-white/5 pt-12">
                                                        <h3 className="text-2xl font-black italic uppercase tracking-tighter text-[#FFB31A]">Mother's Details</h3>
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                            <FormInput label="First Name" name="motherFirstName" value={formData.motherFirstName} onChange={handleInputChange} isDark={isDark} />
                                                            <FormInput label="Last Name" name="motherLastName" value={formData.motherLastName} onChange={handleInputChange} isDark={isDark} />
                                                            <FormInput label="Email" name="motherEmail" type="email" value={formData.motherEmail} onChange={handleInputChange} isDark={isDark} />
                                                            <div className="space-y-4">
                                                                <label className="text-[10px] font-black uppercase tracking-widest opacity-40 px-2">Phone</label>
                                                                <PhoneInput country={'in'} value={formData.motherPhone} onChange={val => setFormData(prev => ({ ...prev, motherPhone: val }))} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}

                                            {/* PHASE 3: LOCATION */}
                                            {phase === 3 && (
                                                <motion.div key="p3" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.02 }} className="space-y-10">
                                                    <h3 className="text-2xl font-black italic uppercase tracking-tighter text-[#FFB31A]">Communication Address</h3>

                                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                        <div className="space-y-4">
                                                            <label className="text-[10px] font-black uppercase tracking-widest opacity-40 px-2">Country *</label>
                                                            <Select
                                                                options={Country.getAllCountries().map(c => ({ value: c.isoCode, label: c.name }))}
                                                                onChange={(opt) => handleSelectChange('countryCode', opt)}
                                                                styles={customSelectStyles(isDark)}
                                                                placeholder="Select Country"
                                                            />
                                                        </div>
                                                        <div className="space-y-4">
                                                            <label className="text-[10px] font-black uppercase tracking-widest opacity-40 px-2">State *</label>
                                                            <Select
                                                                options={locationData.states}
                                                                onChange={(opt) => handleSelectChange('state', opt)}
                                                                styles={customSelectStyles(isDark)}
                                                                isDisabled={!formData.countryCode}
                                                                placeholder="Select State"
                                                            />
                                                        </div>
                                                        <div className="space-y-4">
                                                            <label className="text-[10px] font-black uppercase tracking-widest opacity-40 px-2">City *</label>
                                                            <Select
                                                                options={locationData.cities}
                                                                onChange={(opt) => handleSelectChange('city', opt)}
                                                                styles={customSelectStyles(isDark)}
                                                                isDisabled={!formData.state}
                                                                placeholder="Select City"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                        <div className="md:col-span-2">
                                                            <FormInput label="Mailing Address Line 1 *" name="address_line1" value={formData.address_line1} onChange={handleInputChange} placeholder="House No, Street, Building" isDark={isDark} />
                                                        </div>
                                                        <FormInput label="Address Line 2" name="address_line2" value={formData.address_line2} onChange={handleInputChange} placeholder="Landmark / Locality" isDark={isDark} />
                                                        <FormInput label="Pincode / Postal Code *" name="pincode" value={formData.pincode} onChange={handleInputChange} placeholder="Zip Code" isDark={isDark} />
                                                    </div>
                                                </motion.div>
                                            )}

                                            {/* PHASE 4: COACHING MODE */}
                                            {phase === 4 && (
                                                <motion.div key="p4" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.02 }} className="space-y-12">
                                                    <h3 className="text-2xl font-black italic uppercase tracking-tighter text-[#FFB31A]">Coaching Logistics</h3>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                        {[
                                                            { id: "Online", label: "Online Coaching", icon: Globe, desc: "Interactive digital classroom experience." },
                                                            { id: "Offline", label: "Offline Coaching", icon: Home, desc: "In-person training at our Bangalore centres." }
                                                        ].map((m) => (
                                                            <div
                                                                key={m.id}
                                                                onClick={() => setFormData(prev => ({ ...prev, mode: m.id }))}
                                                                className={`p-10 rounded-[2.5rem] border transition-all cursor-pointer ${formData.mode === m.id ? 'bg-[#FFB31A]/10 border-[#FFB31A]' : 'bg-transparent border-white/10 opacity-60'}`}
                                                            >
                                                                <m.icon className={`mb-6 ${formData.mode === m.id ? 'text-[#FFB31A]' : 'opacity-40'}`} size={32} />
                                                                <h4 className="text-xl font-black uppercase italic mb-2">{m.label}</h4>
                                                                <p className="text-xs font-medium opacity-50 italic">{m.desc}</p>
                                                            </div>
                                                        ))}
                                                    </div>

                                                    {formData.mode === "Offline" && (
                                                        <div className="space-y-10 pt-6">
                                                            {/* Step 1: Select Coaching City */}
                                                            <div className="space-y-6">
                                                                <label className="text-[11px] font-black uppercase tracking-[0.4em] text-[#FFB31A]">Select Coaching City *</label>
                                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                                    {["Bangalore"].map(city => (
                                                                        <button
                                                                            key={city}
                                                                            type="button"
                                                                            onClick={() => setFormData(prev => ({ ...prev, coaching_city: city, preferredCentre: '' }))}
                                                                            className={`p-10 rounded-[2.5rem] border transition-all font-black uppercase text-[11px] tracking-widest ${formData.coaching_city === city ? 'bg-[#FFB31A] text-[#2B3AA0] border-[#FFB31A]' : 'border-white/10 opacity-60'}`}
                                                                        >
                                                                            {city}
                                                                        </button>
                                                                    ))}
                                                                </div>
                                                            </div>

                                                            {/* Step 2: Select Centre based on City */}
                                                            {formData.coaching_city && (
                                                                <div className="space-y-6">
                                                                    <label className="text-[11px] font-black uppercase tracking-[0.4em] text-[#FFB31A]">Select Preferred Centre *</label>
                                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                                        {({
                                                                            "Bangalore": ["JP Nagar, 8th Phase", "Akshayanagar"]
                                                                        }[formData.coaching_city] || []).map(centre => (
                                                                            <button
                                                                                key={centre}
                                                                                type="button"
                                                                                onClick={() => setFormData(prev => ({ ...prev, preferredCentre: centre }))}
                                                                                className={`p-10 rounded-[2.5rem] border transition-all font-black uppercase text-[11px] tracking-widest ${formData.preferredCentre === centre ? 'bg-[#2B3AA0] text-white border-[#2B3AA0]' : 'border-white/10 opacity-60'}`}
                                                                            >
                                                                                {centre}
                                                                            </button>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                </motion.div>
                                            )}

                                            {/* PHASE 5: FINALIZE */}
                                            {phase === 5 && (
                                                <motion.div key="p5" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.02 }} className="space-y-12">
                                                    <h3 className="text-2xl font-black italic uppercase tracking-tighter text-[#FFB31A]">Final Declaration</h3>

                                                    <div className="space-y-10">
                                                        <div className="space-y-6">
                                                            <label className="text-[11px] font-black uppercase tracking-[0.3em] opacity-40 px-2">How did you hear about ThinQ Academy? *</label>
                                                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                                                                {["Friends/Family", "Social Media", "Advertisement", "Google", "Other"].map(source => (
                                                                    <button
                                                                        key={source}
                                                                        type="button"
                                                                        onClick={() => setFormData(prev => ({ ...prev, heardFrom: source }))}
                                                                        className={`h-16 rounded-[1.2rem] border transition-all text-[10px] font-black uppercase ${formData.heardFrom === source ? 'bg-[#FFB31A] text-[#2B3AA0] border-[#FFB31A]' : 'border-white/10 opacity-60'}`}
                                                                    >
                                                                        {source}
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        </div>

                                                        {formData.heardFrom === "Friends/Family" && (
                                                            <div className="grid grid-cols-2 gap-8 pt-4">
                                                                <FormInput label="Referrer First Name" name="refFirstName" value={formData.refFirstName} onChange={handleInputChange} isDark={isDark} />
                                                                <FormInput label="Referrer Last Name" name="refLastName" value={formData.refLastName} onChange={handleInputChange} isDark={isDark} />
                                                            </div>
                                                        )}

                                                        {formData.heardFrom === "Other" && (
                                                            <div className="pt-4">
                                                                <FormInput label="Please specify *" name="otherSource" value={formData.otherSource} onChange={handleInputChange} placeholder="How did you find us?" isDark={isDark} />
                                                            </div>
                                                        )}

                                                        <div className="pt-10 space-y-8">
                                                            <label className="flex items-start gap-4 group cursor-pointer">
                                                                <input type="checkbox" name="tc1" checked={formData.tc1} onChange={handleInputChange} className="hidden" />
                                                                <div className={`mt-1 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${formData.tc1 ? 'bg-[#FFB31A] border-[#FFB31A]' : 'border-white/10 group-hover:border-[#FFB31A]'}`}>
                                                                    {formData.tc1 && <div className="w-2 h-4 border-r-2 border-b-2 border-[#2B3AA0] rotate-45 mb-1" />}
                                                                </div>
                                                                <span className="text-sm font-medium italic opacity-60 group-hover:opacity-100 transition-opacity">I agree to follow the Academy's code of conduct and training protocols. <Link href="/privacy-policy" className="text-[#FFB31A] underline">Privacy Policy</Link> applies.</span>
                                                            </label>

                                                            <label className="flex items-start gap-4 group cursor-pointer">
                                                                <input type="checkbox" name="tc2" checked={formData.tc2} onChange={handleInputChange} className="hidden" />
                                                                <div className={`mt-1 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${formData.tc2 ? 'bg-[#FFB31A] border-[#FFB31A]' : 'border-white/10 group-hover:border-[#FFB31A]'}`}>
                                                                    {formData.tc2 && <div className="w-2 h-4 border-r-2 border-b-2 border-[#2B3AA0] rotate-45 mb-1" />}
                                                                </div>
                                                                <span className="text-sm font-medium italic opacity-60 group-hover:opacity-100 transition-opacity">I certify that all information provided is accurate for official records.</span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}

                                        </AnimatePresence>

                                        {/* Error Alert */}
                                        {error && (
                                            <div className="p-6 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs font-black uppercase tracking-widest flex items-center gap-4">
                                                <AlertCircle size={18} /> {error}
                                            </div>
                                        )}

                                        {/* Navigation Toolbar */}
                                        <div className="pt-12 border-t border-white/5 flex items-center justify-between">
                                            <button
                                                type="button"
                                                onClick={prevStep}
                                                className={`text-[12px] font-black uppercase tracking-[0.4em] flex items-center gap-4 transition-all ${phase === 1 ? 'opacity-0 pointer-events-none' : 'hover:text-[#FFB31A]'}`}
                                            >
                                                Back
                                            </button>

                                            {phase < 5 ? (
                                                <button
                                                    type="button"
                                                    onClick={nextStep}
                                                    className="px-14 py-6 bg-[#2B3AA0] text-white rounded-[1.5rem] font-black uppercase tracking-[0.3em] text-[11px] hover:bg-[#FFB31A] hover:text-[#2B3AA0] transition-all shadow-xl flex items-center gap-4"
                                                >
                                                    Continue Enrollment <ChevronRight size={18} />
                                                </button>
                                            ) : (
                                                <button
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    className={`px-16 py-8 rounded-[1.5rem] font-black uppercase tracking-[0.3em] text-[11px] transition-all flex items-center gap-4 shadow-2xl ${isSubmitting ? 'bg-white/10 text-white/10' : 'bg-[#FFB31A] text-[#2B3AA0] hover:bg-white'}`}
                                                >
                                                    {isSubmitting ? 'SUBMITTING...' : 'SUBMIT REGISTRATION'} <ArrowRight size={18} />
                                                </button>
                                            )}
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. FINAL ACADEMIC CTA */}
            <section className="py-24 md:py-40 bg-[#2B3AA0] relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent opacity-20"></div>
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <Award className="text-[#FFB31A] mx-auto mb-10" size={60} />
                    <h2 className="text-4xl md:text-7xl font-black text-white italic tracking-tighter uppercase leading-[0.85] mb-12">
                        YOUR JOURNEY TO <br /> <span className="text-[#FFB31A]">MASTERY STARTS HERE.</span>
                    </h2>
                    <p className="text-xl font-medium text-white/70 mb-16 max-w-2xl mx-auto italic">Join 15,000+ thinkers who have redefined their strategic potential.</p>
                </div>
            </section>
        </div>
    );
};

// --- HELPER COMPONENTS ---
const FormInput = ({ label, placeholder, type = "text", name, value, onChange, isDark }) => (
    <div className="space-y-4">
        <label className="text-[10px] font-black uppercase tracking-widest opacity-40 px-2">{label}</label>
        <input
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`w-full h-16 px-8 py-5 rounded-[1.2rem] text-sm font-bold border transition-all duration-500 outline-none ${isDark ? 'bg-[#0A1128] border-white/5 text-white focus:border-[#FFB31A]/40' : 'bg-slate-100 border-slate-200 text-[#2B3AA0] focus:border-[#FFB31A]'}`}
        />
    </div>
);

export default RegistrationPage;
