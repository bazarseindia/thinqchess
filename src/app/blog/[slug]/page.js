"use client";
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useTheme } from '@/components/ThemeProvider';
import { blogsData } from '@/data/blogs';
import {
    ArrowLeft,
    Clock,
    Share2,
    Facebook,
    Twitter,
    Linkedin,
    Trophy,
    Loader2,
} from 'lucide-react';

const BlogDetailPage = () => {
    const { slug } = useParams();
    const { isDark } = useTheme();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                // Try fetching from DB first
                const r = await fetch('/api/public/blogs');
                const d = await r.json();
                if (d.success && d.posts?.length > 0) {
                    const found = d.posts.find(p => p.slug === slug);
                    if (found) {
                        setBlog({
                            id: found.id,
                            slug: found.slug,
                            title: found.title,
                            excerpt: found.excerpt || found.content?.substring(0, 150) || '',
                            date: new Date(found.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' }),
                            readTime: `${Math.ceil((found.content?.length || 500) / 1000)} min read`,
                            category: found.category || 'General',
                            image: found.featuredImage || '/assets/home/Internal Tournament.jpeg',
                            content: typeof found.content === 'string'
                                ? [{ type: 'paragraph', text: found.content }]
                                : (Array.isArray(found.content) ? found.content : [{ type: 'paragraph', text: String(found.content || '') }]),
                        });
                        setLoading(false);
                        return;
                    }
                }
            } catch (e) { }
            // Fallback to local data
            const localBlog = blogsData.find(b => b.slug === slug);
            setBlog(localBlog || null);
            setLoading(false);
        })();
    }, [slug]);

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    if (loading) {
        return (
            <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-[#0A1128] text-white' : 'bg-[#FAFAFA] text-[#2B3AA0]'}`}>
                <Loader2 size={40} className="animate-spin text-[#FFB31A]" />
            </div>
        );
    }

    if (!blog) {
        return (
            <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-[#0A1128] text-white' : 'bg-[#FAFAFA] text-[#2B3AA0]'}`}>
                <div className="text-center">
                    <h1 className="text-4xl font-black mb-6">Article Not Found</h1>
                    <Link href="/blog" className="text-[#FFB31A] font-bold uppercase tracking-widest hover:underline">Return to Blog</Link>
                </div>
            </div>
        );
    }

    return (
        <div className={`min-h-screen ${isDark ? 'bg-[#0A1128] text-white' : 'bg-[#FAFAFA] text-[#2B3AA0]'} font-sans antialiased overflow-x-hidden transition-colors duration-500`}>

            {/* SCROLL PROGRESS INDICATOR */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1.5 bg-[#FFB31A] z-[1100] origin-left shadow-sm"
                style={{ scaleX }}
            />

            {/* EDITORIAL HERO SECTION (Clean, content-first) */}
            <section className="pt-32 pb-12 relative">
                <div className="container mx-auto px-6 max-w-4xl">

                    <Link href="/blog" className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-10 transition-colors hover:text-[#FFB31A] ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                        <ArrowLeft size={16} /> Back to Articles
                    </Link>

                    <div className="flex flex-wrap items-center gap-4 mb-6">
                        <span className="px-3 py-1 rounded-full border border-[#FFB31A]/30 bg-[#FFB31A]/10 text-[#FFB31A] text-[10px] font-black uppercase tracking-widest">
                            {blog.category}
                        </span>
                        <div className={`flex items-center gap-4 text-xs font-bold uppercase tracking-widest ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>
                            <span>{blog.date}</span>
                            <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-white/20"></span>
                            <span className="flex items-center gap-1.5"><Clock size={12} /> {blog.readTime}</span>
                        </div>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] mb-8 lg:mb-12">
                        {blog.title}
                    </h1>

                    {/* Author & Share Bar (Top) */}
                    <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-6 py-6 border-y ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full border border-slate-200 dark:border-white/10 overflow-hidden bg-white p-2 shrink-0 shadow-sm">
                                <Image src="/logo.png" alt="ThinQ" fill className="object-contain" />
                            </div>
                            <div>
                                <h3 className={`font-bold text-sm ${isDark ? 'text-white' : 'text-[#2B3AA0]'}`}>ThinQ Editorial Board</h3>
                                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Chess Strategists & Educators</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <span className={`text-xs font-bold uppercase tracking-widest mr-2 ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>Share:</span>
                            <button className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all hover:-translate-y-1 ${isDark ? 'border-white/10 hover:bg-white/10 hover:text-[#FFB31A]' : 'border-slate-200 hover:bg-slate-100 hover:text-[#FFB31A]'}`}><Facebook size={16} /></button>
                            <button className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all hover:-translate-y-1 ${isDark ? 'border-white/10 hover:bg-white/10 hover:text-[#FFB31A]' : 'border-slate-200 hover:bg-slate-100 hover:text-[#FFB31A]'}`}><Twitter size={16} /></button>
                            <button className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all hover:-translate-y-1 ${isDark ? 'border-white/10 hover:bg-white/10 hover:text-[#FFB31A]' : 'border-slate-200 hover:bg-slate-100 hover:text-[#FFB31A]'}`}><Linkedin size={16} /></button>
                            <button className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all hover:-translate-y-1 ${isDark ? 'border-white/10 hover:bg-white/10 hover:text-[#FFB31A]' : 'border-slate-200 hover:bg-slate-100 hover:text-[#FFB31A]'}`}><Share2 size={16} /></button>
                        </div>
                    </div>
                </div>
            </section>

            {/* FEATURED IMAGE */}
            <section className="px-6 mb-16">
                <div className="container mx-auto max-w-5xl rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden bg-slate-100 relative shadow-md aspect-[16/9]">
                    <Image
                        src={blog.image}
                        alt={blog.title}
                        fill
                        priority
                        className="object-cover"
                    />
                </div>
            </section>

            {/* THE CONTENT BODY (Highly Legible) */}
            <section className="pb-24">
                <div className="container mx-auto px-6 max-w-3xl">
                    <div className="prose prose-lg md:prose-xl max-w-none text-left leading-relaxed">
                        <div className="space-y-10">
                            {blog.content.map((block, i) => {
                                if (block.type === 'paragraph') {
                                    return (
                                        <p
                                            key={i}
                                            className={`text-lg md:text-xl font-medium tracking-normal leading-[1.7] ${isDark ? 'text-[#D1D5DB]' : 'text-slate-700'}`}
                                        >
                                            {block.text}
                                        </p>
                                    );
                                }
                                if (block.type === 'heading') {
                                    return (
                                        <h2
                                            key={i}
                                            className={`text-3xl md:text-4xl font-black uppercase tracking-tight leading-tight mt-16 mb-8 ${isDark ? 'text-white' : 'text-[#2B3AA0]'}`}
                                        >
                                            {block.text}
                                        </h2>
                                    );
                                }
                                if (block.type === 'subheading') {
                                    return (
                                        <h3
                                            key={i}
                                            className={`text-2xl font-bold uppercase tracking-tight mt-10 mb-6 flex items-center gap-3 ${isDark ? 'text-[#FFB31A]' : 'text-[#FFB31A]'}`}
                                        >
                                            <div className="w-1.5 h-6 bg-[#FFB31A]"></div>
                                            {block.text}
                                        </h3>
                                    );
                                }
                                if (block.type === 'list') {
                                    return (
                                        <ul key={i} className="space-y-4 my-8 pl-6">
                                            {block.items.map((item, j) => (
                                                <li key={j} className="flex gap-4 items-start">
                                                    <Trophy size={20} className="shrink-0 text-[#FFB31A] mt-1" />
                                                    <span className={`text-lg md:text-xl font-medium leading-[1.7] ${isDark ? 'text-[#D1D5DB]' : 'text-slate-700'}`}>
                                                        {item}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    );
                                }
                                return null;
                            })}
                        </div>
                    </div>

                    {/* BOTTOM CTA: Join Academy */}
                    <div className="mt-24">
                        <div className={`p-10 md:p-14 text-center rounded-3xl border ${isDark ? 'bg-gradient-to-b from-[#111B3A] to-[#0A1128] border-white/10' : 'bg-gradient-to-b from-white to-slate-50 border-slate-200'} shadow-sm`}>
                            <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-4">Start Your Journey</h3>
                            <p className={`text-base md:text-lg max-w-lg mx-auto mb-8 font-medium ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
                                Enhance your cognitive skills and become a master strategist with ThinQ Chess Academy.
                            </p>
                            <Link href="/registration" className="inline-flex items-center gap-4 bg-[#FFB31A] text-[#2B3AA0] px-10 py-4 text-sm font-black uppercase tracking-widest rounded-full hover:bg-[#E5A017] transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1">
                                Enroll Now
                            </Link>
                        </div>
                    </div>

                </div>
            </section>

        </div>
    );
};

export default BlogDetailPage;
