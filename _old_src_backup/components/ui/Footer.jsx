"use client";
import React from 'react';
import Link from 'next/link';
import { Instagram, Facebook, Linkedin, Youtube, ArrowRight, Mail, Phone, MapPin, Star } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-[#0A1128] text-white">
            {/* Main Footer Content */}
            <div className="container mx-auto px-4 sm:px-6 pt-16 md:pt-20 pb-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 md:gap-12 mb-12 border-b border-white/5 pb-12">

                    {/* Brand Column */}
                    <div className="lg:col-span-4">
                        <Link href="/" className="inline-flex items-center gap-3 mb-6 group">
                            <div className="bg-white p-2.5 rounded-lg shadow-lg group-hover:shadow-xl transition-shadow">
                                <img src="/logo.png" alt="ThinQ Chess" className="h-9 w-auto" />
                            </div>
                        </Link>
                        <p className="text-slate-400 text-sm leading-relaxed max-w-xs mb-6">
                            Bangalore&apos;s premier chess academy dedicated to shaping young minds through strategic thinking and competitive excellence.
                        </p>
                        <Link href="/free-trial" className="btn-gold px-8 py-3 text-[10px] inline-block rounded-md mb-6">
                            BOOK A FREE TRIAL CLASS
                        </Link>
                        <div className="flex gap-3">
                            {[
                                { Icon: Instagram, href: "#" },
                                { Icon: Facebook, href: "#" },
                                { Icon: Linkedin, href: "#" },
                                { Icon: Youtube, href: "#" }
                            ].map(({ Icon, href }, i) => (
                                <Link key={i} href={href} className="w-9 h-9 border border-white/10 rounded-lg flex items-center justify-center hover:bg-[#FFB31A] hover:text-[#2B3AA0] hover:border-[#FFB31A] transition-all text-slate-400 hover:scale-110">
                                    <Icon size={16} />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Links Grid */}
                    <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
                        <div>
                            <h3 className="text-[#FFB31A] text-[10px] font-black uppercase tracking-[0.3em] mb-5">Academy</h3>
                            <ul className="space-y-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                <li><Link href="/about" className="hover:text-[#FFB31A] transition-colors flex items-center gap-2">Our Story <ArrowRight size={10} /></Link></li>
                                <li><Link href="/programs" className="hover:text-[#FFB31A] transition-colors flex items-center gap-2">Programs <ArrowRight size={10} /></Link></li>
                                <li><Link href="/tournaments" className="hover:text-[#FFB31A] transition-colors flex items-center gap-2">Events <ArrowRight size={10} /></Link></li>
                                <li><Link href="/blog" className="hover:text-[#FFB31A] transition-colors flex items-center gap-2">The Blog <ArrowRight size={10} /></Link></li>
                                <li><Link href="/train-the-trainer" className="hover:text-[#FFB31A] transition-colors flex items-center gap-2">Train The Trainer <ArrowRight size={10} /></Link></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-[#FFB31A] text-[10px] font-black uppercase tracking-[0.3em] mb-5">Support</h3>
                            <ul className="space-y-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                <li><Link href="/contact" className="hover:text-[#FFB31A] transition-colors">Contact Us</Link></li>
                                <li><Link href="/faqs" className="hover:text-[#FFB31A] transition-colors">FAQs</Link></li>
                                <li><Link href="/privacy-policy" className="hover:text-[#FFB31A] transition-colors">Privacy Policy</Link></li>
                                <li><Link href="/terms-of-service" className="hover:text-[#FFB31A] transition-colors">Terms of Service</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-[#FFB31A] text-[10px] font-black uppercase tracking-[0.3em] mb-5">Contact</h3>
                            <ul className="space-y-4 text-sm text-slate-400">
                                <li className="flex gap-3 items-start">
                                    <MapPin size={16} className="text-[#FFB31A] shrink-0 mt-0.5" />
                                    <span>Thinq Chess, JP Nagar -560068, India</span>
                                </li>
                                <li className="flex gap-3 items-center">
                                    <Mail size={16} className="text-[#FFB31A] shrink-0" />
                                    <span>info@thinqchess.com</span>
                                </li>
                                <li className="flex gap-3 items-center">
                                    <Phone size={16} className="text-[#FFB31A] shrink-0" />
                                    <span className="font-black text-white text-lg tracking-tight">+91 7975820187</span>
                                </li>
                            </ul>

                            {/* Google Rating Badge */}
                            <div className="mt-6 bg-white/5 rounded-lg p-3 px-4 inline-flex items-center gap-3">
                                <div className="text-xl font-black text-white">5.0</div>
                                <div>
                                    <div className="flex gap-0.5">
                                        {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-[#FFB31A] text-[#FFB31A]" />)}
                                    </div>
                                    <div className="text-[8px] font-bold text-slate-500 uppercase tracking-wider mt-0.5">Google Rating</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-bold text-slate-600 uppercase tracking-[0.3em]">
                    <p>&copy; 2025 THINQ CHESS INFRASTRUCTURE. ALL RIGHTS RESERVED.</p>
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
