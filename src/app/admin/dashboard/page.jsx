"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
    LayoutDashboard, Users, Trophy, Phone, MessageSquare, GraduationCap,
    FileText, Image, TrendingUp, ArrowUpRight, ArrowDownRight, RefreshCw,
    Clock, ChevronRight, Loader2, AlertCircle, CheckCircle2, UserPlus,
    Calendar, Activity
} from "lucide-react";

export default function AdminDashboard() {
    const [stats, setStats] = useState(null);
    const [recentActivity, setRecentActivity] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const router = useRouter();

    const fetchStats = async (isRefresh = false) => {
        if (isRefresh) setRefreshing(true);
        try {
            const res = await fetch("/api/admin/dashboard-stats");
            const data = await res.json();
            if (data.success) {
                setStats(data.stats);
                setRecentActivity(data.recentActivity || []);
            }
        } catch (err) {
            console.error("Failed to fetch stats:", err);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchStats();
        const interval = setInterval(() => fetchStats(), 30000); // Refresh every 30s
        return () => clearInterval(interval);
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center py-32">
                <div className="text-center">
                    <Loader2 size={40} className="animate-spin text-[#2B3AA0] mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-white/40 text-sm">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    const statCards = [
        { label: "Total Registrations", value: stats?.totalRegistrations || 0, thisMonth: stats?.registrationsThisMonth || 0, icon: Users, color: "from-blue-500 to-indigo-600", href: "/admin/registrations" },
        { label: "Tournaments", value: stats?.totalTournaments || 0, thisMonth: stats?.tournamentEntries || 0, icon: Trophy, color: "from-amber-500 to-orange-600", href: "/admin/tournaments", subLabel: "entries" },
        { label: "Demo Requests", value: stats?.totalDemoRequests || 0, thisMonth: stats?.demoRequestsThisMonth || 0, icon: Phone, color: "from-emerald-500 to-teal-600", href: "/admin/demo-requests" },
        { label: "Contact Messages", value: stats?.totalContactMessages || 0, thisMonth: stats?.contactMessagesThisMonth || 0, icon: MessageSquare, color: "from-violet-500 to-purple-600", href: "/admin/contact-messages" },
        { label: "Blog Posts", value: stats?.totalBlogPosts || 0, thisMonth: stats?.publishedBlogs || 0, icon: FileText, color: "from-pink-500 to-rose-600", href: "/admin/blogs", subLabel: "published" },
        { label: "Gallery Items", value: stats?.totalGalleryItems || 0, thisMonth: 0, icon: Image, color: "from-cyan-500 to-sky-600", href: "/admin/gallery" },
    ];

    const getActivityIcon = (type) => {
        switch (type) {
            case 'registration': return <UserPlus size={16} className="text-blue-400" />;
            case 'tournament': return <Trophy size={16} className="text-amber-400" />;
            case 'demo': return <Phone size={16} className="text-emerald-400" />;
            case 'contact': return <MessageSquare size={16} className="text-violet-400" />;
            default: return <Activity size={16} className="text-gray-600 dark:text-white/40" />;
        }
    };

    return (
        <div className="space-y-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Dashboard</h1>
                    <p className="text-gray-600 dark:text-white/40 text-sm mt-1">Welcome back! Here&apos;s what&apos;s happening at ThinQ Chess.</p>
                </div>
                <button
                    onClick={() => fetchStats(true)}
                    disabled={refreshing}
                    className="flex items-center gap-2 px-5 py-2.5 bg-gray-100 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-xl text-gray-800 dark:text-white/70 text-sm font-medium hover:bg-gray-200 dark:hover:bg-white/10 transition-all disabled:opacity-50"
                >
                    <RefreshCw size={16} className={refreshing ? 'animate-spin' : ''} />
                    {refreshing ? 'Refreshing...' : 'Refresh'}
                </button>
            </div>

            {/* Stats Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {statCards.map((card, idx) => {
                    const Icon = card.icon;
                    return (
                        <button
                            key={idx}
                            onClick={() => router.push(card.href)}
                            className="group bg-white dark:bg-[#0F1629] border border-gray-200 dark:border-white/5 rounded-2xl p-6 text-left hover:border-white/10 transition-all duration-300 hover:shadow-lg"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center shadow-lg`}>
                                    <Icon size={22} className="text-gray-900 dark:text-white" />
                                </div>
                                <ChevronRight size={18} className="text-white/10 group-hover:text-white/30 transition-colors" />
                            </div>
                            <div className="text-3xl font-black text-gray-900 dark:text-white mb-1">{card.value}</div>
                            <div className="text-gray-600 dark:text-white/40 text-sm font-medium mb-3">{card.label}</div>
                            {(card.thisMonth > 0 || card.subLabel) && (
                                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                                    <ArrowUpRight size={14} />
                                    {card.thisMonth} {card.subLabel || 'this month'}
                                </div>
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Bottom Row: Recent Activity + Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Activity */}
                <div className="lg:col-span-2 bg-white dark:bg-[#0F1629] border border-gray-200 dark:border-white/5 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-gray-900 dark:text-white font-bold text-lg flex items-center gap-2">
                            <Clock size={18} className="text-[#2B3AA0]" /> Recent Activity
                        </h3>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-white/20">Last 10</span>
                    </div>

                    {recentActivity.length === 0 ? (
                        <div className="text-center py-12">
                            <Activity size={32} className="mx-auto mb-3 text-white/10" />
                            <p className="text-gray-500 dark:text-white/30 text-sm">No recent activity yet</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {recentActivity.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 transition-colors group">
                                    <div className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-white/5 flex items-center justify-center shrink-0">
                                        {getActivityIcon(item.type)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-gray-900 dark:text-white text-sm font-medium truncate">{item.title}</p>
                                        <p className="text-gray-500 dark:text-white/30 text-xs">{item.subtitle}</p>
                                    </div>
                                    <div className="text-gray-400 dark:text-white/20 text-xs font-medium shrink-0">{item.time}</div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Quick Actions */}
                <div className="bg-white dark:bg-[#0F1629] border border-gray-200 dark:border-white/5 rounded-2xl p-6">
                    <h3 className="text-gray-900 dark:text-white font-bold text-lg mb-6 flex items-center gap-2">
                        <TrendingUp size={18} className="text-[#2B3AA0]" /> Quick Actions
                    </h3>
                    <div className="space-y-3">
                        {[
                            { label: "Create Tournament", href: "/admin/tournaments", icon: Trophy, color: "text-amber-400" },
                            { label: "View Registrations", href: "/admin/registrations", icon: Users, color: "text-blue-400" },
                            { label: "Create Blog Post", href: "/admin/blogs", icon: FileText, color: "text-pink-400" },
                            { label: "Manage Gallery", href: "/admin/gallery", icon: Image, color: "text-cyan-400" },
                            { label: "Discount Codes", href: "/admin/discount-codes", icon: AlertCircle, color: "text-emerald-400" },
                            { label: "Settings", href: "/admin/settings", icon: RefreshCw, color: "text-violet-400" },
                        ].map((action, idx) => {
                            const Icon = action.icon;
                            return (
                                <button
                                    key={idx}
                                    onClick={() => router.push(action.href)}
                                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 transition-all group text-left"
                                >
                                    <Icon size={18} className={action.color} />
                                    <span className="text-gray-700 dark:text-white/60 text-sm font-medium group-hover:text-white transition-colors">{action.label}</span>
                                    <ChevronRight size={14} className="ml-auto text-white/10 group-hover:text-white/30" />
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
