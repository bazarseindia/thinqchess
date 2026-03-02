"use client";
import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import {
    LayoutDashboard, Trophy, ClipboardList, MessageSquare, Phone, GraduationCap,
    Tag, FileText, Image, Settings, Users, Bell, LogOut, Menu, X, ChevronRight,
    Megaphone, FileEdit, Shield, Sun, Moon
} from "lucide-react";

const navSections = [
    {
        title: "Overview",
        items: [
            { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
        ]
    },
    {
        title: "Form Data",
        items: [
            { href: "/admin/registrations", label: "Registrations", icon: ClipboardList },
            { href: "/admin/tournaments", label: "Tournaments", icon: Trophy },
            { href: "/admin/demo-requests", label: "Demo Requests", icon: Phone },
            { href: "/admin/contact-messages", label: "Contact Messages", icon: MessageSquare },
            { href: "/admin/train-your-trainer", label: "Train Your Trainer", icon: GraduationCap },
        ]
    },
    {
        title: "Content",
        items: [
            { href: "/admin/blogs", label: "Blogs", icon: FileText },
            { href: "/admin/gallery", label: "Gallery", icon: Image },
            { href: "/admin/pages", label: "Pages Editor", icon: FileEdit },
            { href: "/admin/site-images", label: "Site Images", icon: Image },
            { href: "/admin/top-bar", label: "Announcements", icon: Megaphone },
        ]
    },
    {
        title: "System",
        items: [
            { href: "/admin/discount-codes", label: "Discount Codes", icon: Tag },
            { href: "/admin/users", label: "Users", icon: Users },
            { href: "/admin/settings", label: "Settings", icon: Settings },
        ]
    }
];

export default function AdminLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [adminDark, setAdminDark] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);
    const [showNotifs, setShowNotifs] = useState(false);
    const [notifs, setNotifs] = useState([]);
    const router = useRouter();
    const pathname = usePathname();
    const { data: session, status } = useSession();

    // Admin theme
    useEffect(() => {
        const saved = localStorage.getItem("thinqchess-admin-theme");
        if (saved === "dark") setAdminDark(true);
    }, []);

    const toggleAdminTheme = () => {
        setAdminDark(prev => {
            const next = !prev;
            localStorage.setItem("thinqchess-admin-theme", next ? "dark" : "light");
            return next;
        });
    };

    // Notifications
    useEffect(() => {
        if (status !== "authenticated") return;
        const fetchNotifs = async () => {
            try {
                const r = await fetch("/api/admin/notifications");
                const d = await r.json();
                if (d.success) { setUnreadCount(d.unreadCount || 0); setNotifs(d.notifications?.slice(0, 10) || []); }
            } catch (e) { }
        };
        fetchNotifs();
        const interval = setInterval(fetchNotifs, 30000);
        return () => clearInterval(interval);
    }, [status]);

    const markAllRead = async () => {
        await fetch("/api/admin/notifications", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ markAllRead: true }) });
        setUnreadCount(0);
        setNotifs(n => n.map(i => ({ ...i, isRead: true })));
    };

    if (pathname === "/admin/login") return children;

    if (status === "loading") {
        return (
            <div className={`min-h-screen ${adminDark ? 'bg-[#0B1120]' : 'bg-gray-50'} flex items-center justify-center`}>
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-[#2B3AA0] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className={`${adminDark ? 'text-white/50' : 'text-gray-500'} text-sm font-medium`}>Loading admin panel...</p>
                </div>
            </div>
        );
    }

    if (status === "unauthenticated") { router.push("/admin/login"); return null; }

    const handleNavigate = (href) => { setSidebarOpen(false); router.push(href); };

    // Theme-aware classes
    const bg = adminDark ? 'bg-[#0B1120]' : 'bg-gray-50';
    const sidebarBg = adminDark ? 'bg-[#0F1629] border-white/5' : 'bg-white border-gray-200';
    const headerBg = adminDark ? 'bg-[#0F1629] border-white/5' : 'bg-white border-gray-200 shadow-sm';
    const textPrimary = adminDark ? 'text-white' : 'text-gray-900';
    const textSecondary = adminDark ? 'text-white/50' : 'text-gray-500';
    const textMuted = adminDark ? 'text-white/30' : 'text-gray-400';
    const textTitle = adminDark ? 'text-white/20' : 'text-gray-400';
    const hoverBg = adminDark ? 'hover:bg-white/5' : 'hover:bg-gray-100';
    const navActiveBg = 'bg-[#2B3AA0] text-white shadow-lg shadow-[#2B3AA0]/20';
    const navInactive = `${textSecondary} ${hoverBg} hover:text-[#2B3AA0]`;
    const cardBg = adminDark ? 'bg-white/5' : 'bg-gray-100';

    return (
        <div className={`${adminDark ? 'dark' : ''}`}>
            <div className={`min-h-screen ${bg} flex`}>
                {sidebarOpen && <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

                {/* Sidebar */}
                <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-72 ${sidebarBg} border-r flex flex-col transform transition-transform duration-300 lg:transform-none ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
                    <div className={`h-16 flex items-center justify-between px-6 border-b ${adminDark ? 'border-white/5' : 'border-gray-200'} shrink-0`}>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-[#2B3AA0] rounded-lg flex items-center justify-center"><Shield size={16} className="text-[#0B1120]" /></div>
                            <div><h1 className={`${textPrimary} font-black text-sm tracking-wide`}>ThinQ Admin</h1><p className={`text-[10px] ${textMuted} font-medium`}>Control Panel</p></div>
                        </div>
                        <button onClick={() => setSidebarOpen(false)} className={`lg:hidden ${textSecondary}`}><X size={20} /></button>
                    </div>

                    <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-6 custom-scrollbar">
                        {navSections.map(section => (
                            <div key={section.title}>
                                <div className={`px-3 mb-2 text-[10px] font-black uppercase tracking-[0.2em] ${textTitle}`}>{section.title}</div>
                                <div className="space-y-1">
                                    {section.items.map(item => {
                                        const Icon = item.icon;
                                        const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
                                        return (
                                            <button key={item.href} onClick={() => handleNavigate(item.href)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${isActive ? navActiveBg : navInactive}`}>
                                                <Icon size={18} className={isActive ? '' : 'group-hover:text-[#2B3AA0]'} />
                                                <span>{item.label}</span>
                                                {isActive && <ChevronRight size={14} className="ml-auto" />}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </nav>

                    <div className={`p-4 border-t ${adminDark ? 'border-white/5' : 'border-gray-200'} shrink-0`}>
                        <div className="flex items-center gap-3 px-2 mb-3">
                            <div className="w-9 h-9 bg-[#2B3AA0] rounded-full flex items-center justify-center text-white text-xs font-black">{session?.user?.name?.[0] || 'A'}</div>
                            <div className="flex-1 min-w-0">
                                <div className={`${textPrimary} text-sm font-bold truncate`}>{session?.user?.name || 'Admin'}</div>
                                <div className={`${textMuted} text-[11px] truncate`}>{session?.user?.email}</div>
                            </div>
                        </div>
                        <button onClick={() => signOut({ callbackUrl: '/admin/login' })} className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-rose-400 hover:bg-rose-500/10 transition-all"><LogOut size={16} /> Sign Out</button>
                    </div>
                </aside>

                {/* Main Content */}
                <div className="flex-1 flex flex-col min-w-0">
                    <header className={`h-16 ${headerBg} border-b flex items-center justify-between px-6 shrink-0 sticky top-0 z-30`}>
                        <div className="flex items-center gap-4">
                            <button onClick={() => setSidebarOpen(true)} className={`lg:hidden ${textSecondary} hover:${textPrimary}`}><Menu size={22} /></button>
                            <h2 className={`${textPrimary} font-bold text-lg capitalize`}>{pathname?.split('/').pop()?.replace(/-/g, ' ') || 'Dashboard'}</h2>
                        </div>
                        <div className="flex items-center gap-3">
                            {/* Theme Toggle */}
                            <button onClick={toggleAdminTheme} className={`w-10 h-10 rounded-xl ${cardBg} flex items-center justify-center ${textSecondary} hover:text-[#2B3AA0] transition-all`}>
                                {adminDark ? <Sun size={18} /> : <Moon size={18} />}
                            </button>
                            {/* Notifications */}
                            <div className="relative">
                                <button onClick={() => setShowNotifs(!showNotifs)} className={`relative w-10 h-10 rounded-xl ${cardBg} flex items-center justify-center ${textSecondary} hover:text-[#2B3AA0] transition-all`}>
                                    <Bell size={18} />
                                    {unreadCount > 0 && <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 rounded-full text-[9px] font-bold text-white flex items-center justify-center">{unreadCount > 9 ? '9+' : unreadCount}</span>}
                                </button>
                                {showNotifs && (
                                    <div className={`absolute right-0 top-12 w-80 ${adminDark ? 'bg-[#0F1629] border-white/10' : 'bg-white border-gray-200'} border rounded-2xl shadow-sm overflow-hidden z-50`}>
                                        <div className={`flex items-center justify-between p-4 border-b ${adminDark ? 'border-white/5' : 'border-gray-100'}`}>
                                            <span className={`${textPrimary} font-bold text-sm`}>Notifications</span>
                                            {unreadCount > 0 && <button onClick={markAllRead} className="text-[10px] font-bold text-[#2B3AA0]">Mark all read</button>}
                                        </div>
                                        <div className="max-h-64 overflow-y-auto">
                                            {notifs.length === 0 ? (
                                                <div className={`p-6 text-center ${textMuted} text-sm`}>No notifications</div>
                                            ) : notifs.map(n => (
                                                <div key={n.id} className={`p-3 border-b ${adminDark ? 'border-white/5' : 'border-gray-50'} ${!n.isRead ? (adminDark ? 'bg-white/5' : 'bg-blue-50') : ''}`}>
                                                    <div className={`${textPrimary} text-sm font-medium`}>{n.title}</div>
                                                    <div className={`${textMuted} text-xs mt-0.5`}>{n.message}</div>
                                                    <div className={`${textMuted} text-[10px] mt-1`}>{new Date(n.createdAt).toLocaleString('en-IN')}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </header>

                    <main className="flex-1 p-6 overflow-auto">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}
