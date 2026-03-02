"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTheme } from '@/components/ThemeProvider';
import { ArrowRight, Clock, ChevronRight } from 'lucide-react';
import { blogsData } from '@/data/blogs';

const BlogListPage = () => {
    const { isDark } = useTheme();
    const featuredBlog = blogsData[0];
    const otherBlogs = blogsData.slice(1);

    return (
        <div className={`min-h-screen pt-28 pb-20 ${isDark ? 'bg-[#0A1128] text-white' : 'bg-[#FAFAFA] text-[#2B3AA0]'} font-sans antialiased transition-colors duration-500`}>
            {/* CLEAN HEADER SECTION */}
            <div className="container mx-auto px-6 max-w-7xl mb-16">
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center text-center space-y-4"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#FFB31A]/30 bg-[#FFB31A]/10 text-[#FFB31A] text-xs font-bold uppercase tracking-[0.2em] shadow-sm">
                        Think Deeply
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-[#FFB31A] to-orange-500 leading-tight">
                        Insights & Strategies
                    </h1>
                    <p className={`text-sm md:text-base max-w-2xl font-medium mt-4 ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                        Expert analysis, academy news, and grandmaster-level theories curated by the ThinQ Editorial Board. Discover the moves that shape champions.
                    </p>
                </motion.div>
            </div>

            <div className="container mx-auto px-6 max-w-7xl">
                {/* FEATURED EDITORIAL ARTICLE */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-20"
                >
                    <Link href={`/blog/${featuredBlog.slug}`} className={`group flex flex-col lg:flex-row gap-8 lg:gap-12 rounded-[2rem] overflow-hidden border transition-all duration-300 shadow-sm hover:shadow-xl ${isDark ? 'bg-[#111B3A]/80 border-white/5 hover:border-white/10' : 'bg-white border-slate-200'}`}>
                        {/* Featured Image */}
                        <div className="w-full lg:w-3/5 h-[300px] sm:h-[400px] lg:h-auto relative overflow-hidden shrink-0 bg-slate-100">
                            <img
                                src={featuredBlog.image}
                                alt={featuredBlog.title}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                loading="eager"
                            />
                            {/* Inner gradient overlay for text readability on mobile if needed */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent lg:hidden"></div>
                            <div className="absolute top-6 left-6 lg:hidden">
                                <span className="px-4 py-1.5 rounded-full bg-white/90 text-[#2B3AA0] text-[10px] font-black uppercase tracking-widest shadow-md backdrop-blur-md">
                                    {featuredBlog.category}
                                </span>
                            </div>
                        </div>

                        {/* Featured Content Area */}
                        <div className="w-full lg:w-2/5 flex flex-col justify-center p-8 lg:p-12 lg:pl-0">
                            <span className="hidden lg:inline-block px-4 py-1.5 rounded-full bg-[#FFB31A]/10 text-[#FFB31A] border border-[#FFB31A]/20 text-[10px] font-black uppercase tracking-widest w-fit mb-6">
                                {featuredBlog.category}
                            </span>

                            <h2 className={`text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight leading-[1.1] mb-6 transition-colors group-hover:text-[#FFB31A] ${isDark ? 'text-white' : 'text-[#2B3AA0]'}`}>
                                {featuredBlog.title}
                            </h2>

                            <p className={`text-base font-medium leading-relaxed line-clamp-3 mb-8 ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                                {featuredBlog.excerpt}
                            </p>

                            <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-200 dark:border-white/10">
                                <div className={`flex items-center gap-4 text-xs font-bold uppercase tracking-widest ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>
                                    <span>{featuredBlog.date}</span>
                                    <span className="w-1 h-1 rounded-full bg-[#FFB31A]"></span>
                                    <span className="flex items-center gap-1.5"><Clock size={12} /> {featuredBlog.readTime}</span>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-[#FFB31A] transition-transform duration-300 group-hover:bg-[#FFB31A] group-hover:text-white group-hover:translate-x-1">
                                    <ArrowRight size={18} />
                                </div>
                            </div>
                        </div>
                    </Link>
                </motion.div>

                {/* THE BENTO/CARD GRID FOR RECENT ARTICLES */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {otherBlogs.map((blog, idx) => (
                        <motion.div
                            key={blog.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                        >
                            <Link href={`/blog/${blog.slug}`} className={`group flex flex-col h-full rounded-2xl overflow-hidden border transition-all duration-300 shadow-sm hover:shadow-lg ${isDark ? 'bg-[#111B3A]/60 border-white/5 hover:border-white/10' : 'bg-white border-slate-200'}`}>

                                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                                    <img
                                        src={blog.image}
                                        alt={blog.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        loading="lazy"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1 rounded-full bg-white/90 text-[#2B3AA0] text-[9px] font-black uppercase tracking-widest shadow-sm backdrop-blur-sm">
                                            {blog.category}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-6 flex flex-col flex-1">
                                    <h3 className={`text-2xl font-black uppercase tracking-tight leading-[1.1] mb-4 transition-colors group-hover:text-[#FFB31A] ${isDark ? 'text-white' : 'text-[#2B3AA0]'}`}>
                                        {blog.title}
                                    </h3>

                                    <p className={`text-sm font-medium leading-relaxed line-clamp-2 mb-6 ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                                        {blog.excerpt}
                                    </p>

                                    <div className={`mt-auto pt-4 border-t flex items-center justify-between text-[10px] font-bold uppercase tracking-widest ${isDark ? 'border-white/5 text-gray-500' : 'border-slate-100 text-slate-400'}`}>
                                        <div className="flex items-center gap-3">
                                            <span>{blog.date}</span>
                                            <span className="w-1 h-1 rounded-full bg-[#FFB31A]"></span>
                                            <span>{blog.readTime}</span>
                                        </div>
                                        <ChevronRight size={14} className="text-[#FFB31A] transition-transform duration-300 group-hover:translate-x-1" />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BlogListPage;
