"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/components/ThemeProvider';
import { Sparkles, ChevronDown, Loader2 } from 'lucide-react';

const fallbackFaqs = [
    {
        question: "What is the minimum age for chess classes at Thinq Chess?",
        answer: "Children can start chess classes from the age of 5 years. Our programs are designed to help young children understand the chessboard, piece movement, and basic strategy in a fun and structured way. However, for online classes, minimum age requirement is 7 years."
    },
    {
        question: "How do you assess a child's chess level?",
        answer: "Beginners are placed in the Foundation Level based on age. Children with prior chess experience are evaluated by our expert coaches to ensure the right batch placement."
    },
    {
        question: "What is the admission process for chess classes?",
        answer: "After level assessment, we offer a demo class. Once the child is comfortable, parents can complete registration with support from our admissions team."
    },
    {
        question: "What is the fee structure for chess classes in Bangalore and online?",
        answer: "Fees vary based on online or offline chess classes, student level, and group or one-to-one training. Full fee details are shared before registration so that you can make an informed decision."
    },
    {
        question: "How long does it take to complete the chess learning program?",
        answer: "Completing Foundation, Intermediate 1, and Intermediate 2 levels typically takes 1.5 to 2 years. By Intermediate 2, students are ready for competitive tournament chess."
    },
    {
        question: "Do students receive certificates after each level?",
        answer: "Yes. Certificates are awarded after successful completion of each level at Thinq Chess."
    }
];

export default function FAQsPage() {
    const { isDark } = useTheme();
    const [openIndex, setOpenIndex] = useState(0);
    const [faqData, setFaqData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch('/api/public/site-content?key=faq');
                const data = await res.json();
                if (data.success && data.item) {
                    setFaqData(JSON.parse(data.item.value));
                } else {
                    setFaqData(fallbackFaqs);
                }
            } catch (e) {
                setFaqData(fallbackFaqs);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    return (
        <div className={`min-h-[80vh] ${isDark ? 'bg-[#050A18] text-white' : 'bg-[#F2F4F7] text-[#2B3AA0]'}`}>
            {/* HEADER SECTION */}
            <section className={`relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden ${isDark ? 'bg-[#0A1128]' : 'bg-[#2B3AA0]'} rounded-b-[3rem] md:rounded-b-[5rem]`}>
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
                </div>

                <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-black uppercase tracking-[0.3em] text-[#FFB31A] mb-6">
                        <Sparkles size={14} className="fill-[#FFB31A]" />
                        Get Answers
                    </motion.div>
                    <motion.h1 initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.1 }} className="text-4xl md:text-6xl lg:text-7xl font-black uppercase italic tracking-tighter text-white drop-shadow-2xl">
                        FREQUENTLY ASKED QUESTIONS.
                    </motion.h1>
                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }} className="mt-8 text-lg text-white/80 max-w-2xl mx-auto font-medium">
                        Everything you need to know about the academy, admissions, and your child's chess journey.
                    </motion.p>
                </div>
            </section>

            {/* CONTENT SECTION (ACCORDION) */}
            <main className="container mx-auto px-4 sm:px-6 -mt-10 md:-mt-16 relative z-20 pb-20 max-w-4xl">
                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <Loader2 className="animate-spin text-[#FFB31A] w-12 h-12" />
                    </div>
                ) : (
                    <div className="space-y-4">
                        {faqData.map((faq, index) => {
                            const isOpen = openIndex === index;
                            return (
                                <div
                                    key={index}
                                    className={`rounded-3xl border overflow-hidden transition-all duration-300 ${isDark ? 'bg-[#111B3A] border-[#1A264A] hover:border-[#FFB31A]/30' : 'bg-white border-slate-200 hover:border-[#2B3AA0]/20 hover:shadow-lg'}`}
                                >
                                    <button
                                        onClick={() => setOpenIndex(isOpen ? -1 : index)}
                                        className="w-full px-6 md:px-10 py-6 md:py-8 flex items-center justify-between gap-6 text-left"
                                    >
                                        <h3 className={`text-xl md:text-2xl font-black uppercase tracking-tight ${isDark ? 'text-white' : 'text-[#2B3AA0]'}`}>
                                            {faq.question}
                                        </h3>
                                        <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-300 ${isOpen ? 'rotate-180 bg-[#FFB31A] text-[#2B3AA0]' : (isDark ? 'bg-white/5 text-slate-400' : 'bg-slate-50 text-slate-400')}`}>
                                            <ChevronDown size={20} className={isOpen ? 'text-[#2B3AA0]' : ''} />
                                        </div>
                                    </button>

                                    <AnimatePresence>
                                        {isOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                            >
                                                <div className="px-6 md:px-10 pb-6 md:pb-8 pt-0">
                                                    <div className={`w-full h-px bg-gradient-to-r from-transparent via-[#FFB31A]/50 to-transparent mb-6 opacity-30`}></div>
                                                    <p className={`text-base md:text-lg leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                                                        {faq.answer}
                                                    </p>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </div>
                )}
            </main>
        </div>
    );
}
