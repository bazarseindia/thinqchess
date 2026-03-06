"use client";
import React from 'react';
import Link from 'next/link';
import { Instagram, Facebook, Linkedin, Youtube, ArrowRight, Mail, Phone, MapPin, Star } from 'lucide-react';
import { useSiteData } from '@/components/SiteDataContext';

const Footer = () => {
    const { content } = useSiteData();
    const footerContent = content?.footer_content ? JSON.parse(content.footer_content) : {
        description: "Bangalore's premier chess academy dedicated to shaping young minds through strategic thinking and competitive excellence.",
        copy: "2026 Thinq Chess. All rights reserved. Division of Blitznexgen Private Ltd.",
        phone: "+91 7975820187",
        email: "info@thinqchess.com",
        address: "Thinq Chess, JP Nagar, Bangalore, India"
    };

    return (
        <footer className="bg-[#2B3AA0] text-white">
            {/* Main Footer Content */}
            <div className="container mx-auto px-4 sm:px-6 pt-16 md:pt-20 pb-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 md:gap-12 mb-12 border-b border-white/10 pb-12">

                    {/* Brand Column */}
                    <div className="lg:col-span-4">
                        <Link href="/" className="inline-flex items-center gap-3 mb-6 group">
                            <div className="bg-white p-2.5 rounded-lg shadow-lg group-hover:shadow-xl transition-shadow">
                                <img loading="lazy" src="/logo.png" alt="ThinQ Chess" className="h-10 w-auto" />
                            </div>
                        </Link>
                        <p className="text-slate-200 text-[15px] italic leading-relaxed max-w-xs mb-6 font-medium">
                            {footerContent.description}
                        </p>
                        <Link href="/registration" className="btn-gold px-8 py-3 text-[12px] font-black inline-block rounded-md mb-6 hover:bg-white hover:text-[#2B3AA0] transition-all">
                            ENROL NOW
                        </Link>
                        <div className="flex gap-4">
                            {[
                                { Icon: Instagram, href: "https://instagram.com/thinqchess", label: "Follow us on Instagram" },
                                { Icon: Facebook, href: "https://facebook.com/thinqchess", label: "Follow us on Facebook" },
                                { Icon: Linkedin, href: "https://linkedin.com/company/thinqchess", label: "Follow us on LinkedIn" },
                                { Icon: Youtube, href: "https://youtube.com/@thinqchess", label: "Subscribe on YouTube" }
                            ].map(({ Icon, href, label }, i) => (
                                <Link key={i} title={label} href={href} target="_blank" className="w-10 h-10 border border-white/20 rounded-lg flex items-center justify-center hover:bg-[#FFB31A] hover:text-[#2B3AA0] hover:border-[#FFB31A] transition-all text-white hover:scale-110">
                                    <Icon size={18} />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Links Grid */}
                    <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
                        <div>
                            <h3 className="text-[#FFB31A] text-[12px] font-black uppercase tracking-[0.3em] mb-5 font-bold">Offerings</h3>
                            <ul className="space-y-3 text-[13px] font-bold uppercase tracking-wider text-slate-100">
                                <li><Link href="/services" className="hover:text-[#FFB31A] transition-colors flex items-center gap-2">Courses <ArrowRight size={12} /></Link></li>
                                <li><Link href="/tournaments" className="hover:text-[#FFB31A] transition-colors flex items-center gap-2">Event Calendar <ArrowRight size={12} /></Link></li>
                                <li><Link href="/train-the-trainer" className="hover:text-[#FFB31A] transition-colors flex items-center gap-2">Train The Trainer <ArrowRight size={12} /></Link></li>
                                <li><Link href="/about" className="hover:text-[#FFB31A] transition-colors flex items-center gap-2">Our Story <ArrowRight size={12} /></Link></li>
                                <li><Link href="/blog" className="hover:text-[#FFB31A] transition-colors flex items-center gap-2">Blogs <ArrowRight size={12} /></Link></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-[#FFB31A] text-[12px] font-black uppercase tracking-[0.3em] mb-5 font-bold">Support</h3>
                            <ul className="space-y-3 text-[13px] font-bold uppercase tracking-wider text-slate-100">
                                <li><Link href="/contact" className="hover:text-[#FFB31A] transition-colors">Contact Us</Link></li>
                                <li><Link href="/faqs" className="hover:text-[#FFB31A] transition-colors">FAQ</Link></li>
                                <li><Link href="/privacy-policy" className="hover:text-[#FFB31A] transition-colors">Privacy Policy</Link></li>
                                <li><Link href="/terms-of-service" className="hover:text-[#FFB31A] transition-colors">Terms of Service</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-[#FFB31A] text-[12px] font-black uppercase tracking-[0.3em] mb-5 font-bold">Follow Us</h3>
                            <ul className="space-y-4 text-[15px] text-slate-100">
                                <li className="flex gap-3 items-start">
                                    <MapPin size={18} className="text-[#FFB31A] shrink-0 mt-0.5" />
                                    <span>{footerContent.address}</span>
                                </li>
                                <li className="flex gap-3 items-center">
                                    <Mail size={18} className="text-[#FFB31A] shrink-0" />
                                    <span>{footerContent.email}</span>
                                </li>
                                <li className="flex gap-3 items-center">
                                    <Phone size={18} className="text-[#FFB31A] shrink-0" />
                                    <span className="font-black text-white text-xl tracking-tight">{footerContent.phone}</span>
                                </li>
                            </ul>

                            {/* Google Rating Badge */}
                            <div className="mt-6 bg-white/10 rounded-lg p-3 px-4 inline-flex items-center gap-3">
                                <div className="text-xl font-black text-white">5.0</div>
                                <div>
                                    <div className="flex gap-0.5">
                                        {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-[#FFB31A] text-[#FFB31A]" />)}
                                    </div>
                                    <div className="text-[10px] font-bold text-slate-300 uppercase tracking-wider mt-0.5">Google Rating</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-bold text-slate-300 uppercase tracking-[0.2em]">
                    <p>&copy; {footerContent.copy}</p>
                    <div className="flex gap-6">
                        <Link href="/contact" className="hover:text-[#FFB31A] transition-colors">BENGALURU</Link>
                        <Link href="/services" className="hover:text-[#FFB31A] transition-colors">ONLINE</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
