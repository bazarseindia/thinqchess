"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/components/ThemeProvider';
import { Sparkles } from 'lucide-react';

export default function PrivacyPolicyPage() {
    const { isDark } = useTheme();

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
                        Legal Policy
                    </motion.div>
                    <motion.h1 initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.1 }} className="text-4xl md:text-6xl lg:text-7xl font-black uppercase italic tracking-tighter text-white drop-shadow-2xl">
                        PRIVACY POLICY.
                    </motion.h1>
                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }} className="mt-8 text-lg text-white/80 max-w-2xl mx-auto font-medium">
                        Last updated: Feb 2025
                    </motion.p>
                </div>
            </section>

            {/* CONTENT SECTION */}
            <main className="container mx-auto px-4 sm:px-6 -mt-10 md:-mt-16 relative z-20 pb-20 max-w-4xl">
                <div className={`rounded-[2.5rem] p-8 md:p-12 lg:p-16 shadow-[0_40px_100px_rgba(43,58,160,0.1)] border ${isDark ? 'bg-[#111B3A] border-[#1A264A]' : 'bg-white border-slate-200'}`}>

                    <div className={`prose max-w-none ${isDark ? 'prose-invert prose-p:text-slate-300 prose-headings:text-white prose-a:text-[#FFB31A]' : 'prose-p:text-slate-600 prose-headings:text-[#2B3AA0] prose-a:text-[#2B3AA0]'}`}>

                        <p className="lead font-bold text-lg mb-8">
                            Privacy Policy for BlitzNexGen Private Limited
                        </p>

                        <p>
                            The web application, thinqchess.com (“Application“) is owned and operated by BlitzNexGen Private Limited (“Company”), a private limited company incorporated under the laws of India and having its registered office at Begur Koppa Road, Bangalore - 560068, India.
                        </p>

                        <p>
                            At ThinQ Chess, accessible from https://thinqchess.com/, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by ThinQ Chess and how we use it.
                        </p>

                        <p>
                            If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.
                        </p>

                        <p>
                            This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in thinqchess.com. This policy is not applicable to any information collected offline or via channels other than this website.
                        </p>

                        <h3 className="text-2xl font-black uppercase tracking-tight mt-10 mb-4">Consent</h3>
                        <p>
                            By using our website, you hereby consent to our Privacy Policy and agree to its terms.
                        </p>

                        <h3 className="text-2xl font-black uppercase tracking-tight mt-10 mb-4">Information We Collect</h3>
                        <p>
                            The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.
                        </p>
                        <p>
                            If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.
                        </p>
                        <p>
                            When you register for an Account, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number.
                        </p>

                        <h3 className="text-2xl font-black uppercase tracking-tight mt-10 mb-4">How We Use Your Information</h3>
                        <ul className="list-disc pl-6 space-y-2 mb-6">
                            <li>Provide, operate, and maintain our website</li>
                            <li>Improve, personalize, and expand our website</li>
                            <li>Understand and analyze how you use our website</li>
                            <li>Develop new products, services, features, and functionality</li>
                            <li>Communicate with you for customer service, updates, and marketing</li>
                            <li>Send you emails</li>
                            <li>Find and prevent fraud</li>
                        </ul>

                        <h3 className="text-2xl font-black uppercase tracking-tight mt-10 mb-4">Log Files</h3>
                        <p>
                            thinqchess.com follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include IP addresses, browser type, ISP, date/time stamp, referring/exit pages, and number of clicks. These are not linked to personally identifiable info. It is used to analyze trends and administer the site.
                        </p>

                        <h3 className="text-2xl font-black uppercase tracking-tight mt-10 mb-4">Google DoubleClick DART Cookie</h3>
                        <p>
                            Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to www.website.com and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL – https://policies.google.com/technologies/ads.
                        </p>

                        <h3 className="text-2xl font-black uppercase tracking-tight mt-10 mb-4">Advertising Partners Privacy Policies</h3>
                        <p>
                            You may consult this list to find the Privacy Policy for each of the advertising partners of thinqchess.com.
                        </p>
                        <p>
                            Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on thinqchess.com, which are sent directly to users' browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.
                        </p>
                        <p>
                            Note that thinqchess.com has no access to or control over these cookies that are used by third-party advertisers.
                        </p>

                        <h3 className="text-2xl font-black uppercase tracking-tight mt-10 mb-4">Third-Party Privacy Policies</h3>
                        <p>
                            thinqchess.com's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.
                        </p>
                        <p>
                            You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers' respective websites.
                        </p>

                        <h3 className="text-2xl font-black uppercase tracking-tight mt-10 mb-4">CCPA Privacy Rights (Do Not Sell My Personal Information)</h3>
                        <p>Under the CCPA, among other rights, California consumers have the right to:</p>
                        <ul className="list-disc pl-6 space-y-2 mb-6">
                            <li>Request that a business that collects a consumer's personal data disclose the categories and specific pieces of personal data that a business has collected about consumers.</li>
                            <li>Request that a business delete any personal data about the consumer that a business has collected.</li>
                            <li>Request that a business that sells a consumer's personal data, not sell the consumer's personal data.</li>
                        </ul>
                        <p>If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.</p>

                        <h3 className="text-2xl font-black uppercase tracking-tight mt-10 mb-4">GDPR Data Protection Rights</h3>
                        <p>We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:</p>
                        <ul className="list-disc pl-6 space-y-2 mb-6">
                            <li><strong>The right to access</strong> – You have the right to request copies of your personal data. We may charge you a small fee for this service.</li>
                            <li><strong>The right to rectification</strong> – You have the right to request that we correct any information you believe is inaccurate. You also have the right to request that we complete the information you believe is incomplete.</li>
                            <li><strong>The right to erase</strong> – You have the right to request that we erase your personal data, under certain conditions.</li>
                            <li><strong>The right to restrict processing</strong> – You have the right to request that we restrict the processing of your personal data, under certain conditions.</li>
                            <li><strong>The right to object to processing</strong> – You have the right to object to our processing of your personal data, under certain conditions.</li>
                            <li><strong>The right to data portability</strong> – You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.</li>
                        </ul>
                        <p>If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.</p>

                        <h3 className="text-2xl font-black uppercase tracking-tight mt-10 mb-4">Children's Information</h3>
                        <p>
                            Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.
                        </p>
                        <p>
                            thinqchess.com does not knowingly collect any Personal Identifiable Information from children under the age of 18. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.
                        </p>

                        <h3 className="text-2xl font-black uppercase tracking-tight mt-10 mb-4">Governing Law and Jurisdiction</h3>
                        <p>
                            The terms and conditions of this Policy shall be governed by Indian Law and the courts in Bangalore shall only have exclusive jurisdiction to resolve any disputes.
                        </p>

                    </div>
                </div>
            </main>
        </div>
    );
}
