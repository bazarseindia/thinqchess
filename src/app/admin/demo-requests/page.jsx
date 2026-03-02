"use client";
import React, { useState, useEffect, useMemo } from "react";
import { Search, Download, Eye, Loader2, ChevronLeft, ChevronRight, X, Phone, Mail, User, Calendar } from "lucide-react";

export default function DemoRequestsPage() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [selected, setSelected] = useState(null);
    const perPage = 15;

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch("/api/demo-request");
                const data = await res.json();
                setRequests(Array.isArray(data) ? data : (data.requests || []));
            } catch (e) { console.error(e); }
            finally { setLoading(false); }
        })();
    }, []);

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this demo request?")) return;
        try {
            const res = await fetch(`/api/demo-request?id=${id}`, { method: 'DELETE' });
            if (res.ok) {
                setRequests(prev => prev.filter(r => r.id !== id));
            } else {
                alert("Failed to delete demo request");
            }
        } catch (e) {
            console.error(e);
            alert("Error deleting demo request");
        }
    };

    const filtered = useMemo(() => {
        const t = search.toLowerCase();
        return requests.filter(r => !t || r.name?.toLowerCase().includes(t) || r.email?.toLowerCase().includes(t) || r.phone?.includes(t));
    }, [requests, search]);

    const totalPages = Math.ceil(filtered.length / perPage);
    const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

    const exportCSV = () => {
        const csv = ["Name,Email,Phone,Message,Date", ...filtered.map(r => `"${r.name}","${r.email}","${r.phone || ''}","${r.message || ''}","${new Date(r.createdAt).toLocaleDateString('en-IN')}"`
        )].join("\n");
        const blob = new Blob([csv], { type: "text/csv" });
        const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = `demo_requests_${Date.now()}.csv`; a.click();
    };

    if (loading) return <div className="flex items-center justify-center py-32"><Loader2 size={40} className="animate-spin text-[#2B3AA0]" /></div>;

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Demo Requests</h1>
                    <p className="text-gray-600 dark:text-white/40 text-sm mt-1">{requests.length} total requests</p>
                </div>
                <button onClick={exportCSV} className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500/20 border border-emerald-500/30 rounded-xl text-emerald-400 text-sm font-bold hover:bg-emerald-500/30 transition-all"><Download size={16} /> Export CSV</button>
            </div>
            <div className="relative"><Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-white/20" /><input value={search} onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }} placeholder="Search..." className="w-full h-12 pl-12 pr-4 bg-white dark:bg-[#0F1629] border border-gray-200 dark:border-white/5 rounded-xl text-gray-900 dark:text-white text-sm placeholder:text-white/20 outline-none focus:border-[#2B3AA0]/50" /></div>
            <div className="bg-white dark:bg-[#0F1629] border border-gray-200 dark:border-white/5 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead><tr className="border-b border-gray-200 dark:border-white/5">
                            <th className="text-left px-5 py-4 text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-white/30">#</th>
                            <th className="text-left px-5 py-4 text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-white/30">Name</th>
                            <th className="text-left px-5 py-4 text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-white/30">Email</th>
                            <th className="text-left px-5 py-4 text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-white/30">Phone</th>
                            <th className="text-left px-5 py-4 text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-white/30">Date</th>
                            <th className="text-center px-5 py-4 text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-white/30">View</th>
                        </tr></thead>
                        <tbody>
                            {paginated.map((r, idx) => (
                                <tr key={r.id} className="border-b border-gray-200 dark:border-white/5 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
                                    <td className="px-5 py-4 text-gray-500 dark:text-white/30 text-xs font-mono">{(currentPage - 1) * perPage + idx + 1}</td>
                                    <td className="px-5 py-4 text-gray-900 dark:text-white font-bold">{r.name}</td>
                                    <td className="px-5 py-4 text-gray-700 dark:text-white/60 text-xs">{r.email}</td>
                                    <td className="px-5 py-4 text-gray-700 dark:text-white/50 text-xs">{r.phone || "—"}</td>
                                    <td className="px-5 py-4 text-center">
                                        <div className="flex gap-2 justify-center">
                                            <button onClick={() => setSelected(r)} className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-white/5 hover:bg-[#2B3AA0]/20 hover:text-[#2B3AA0] flex items-center justify-center text-gray-500 dark:text-white/30 transition-all">
                                                <Eye size={16} />
                                            </button>
                                            <button onClick={() => handleDelete(r.id)} className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-white/5 hover:bg-rose-500/20 hover:text-rose-500 flex items-center justify-center text-gray-500 dark:text-white/30 transition-all">
                                                <X size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {paginated.length === 0 && <tr><td colSpan={6} className="text-center py-12 text-gray-400 dark:text-white/20 text-sm">No demo requests</td></tr>}
                        </tbody>
                    </table>
                </div>
                {totalPages > 1 && <div className="flex items-center justify-between px-5 py-4 border-t border-gray-200 dark:border-white/5"><p className="text-gray-500 dark:text-white/30 text-xs">Page {currentPage} of {totalPages}</p><div className="flex gap-2"><button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-600 dark:text-white/40 disabled:opacity-20"><ChevronLeft size={16} /></button><button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)} className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-600 dark:text-white/40 disabled:opacity-20"><ChevronRight size={16} /></button></div></div>}
            </div>
            {selected && (
                <div className="relative mt-6"><div className="hidden" onClick={() => setSelected(null)} />
                    <div className="relative w-full max-w-md bg-white dark:bg-[#0F1629] border border-gray-200 dark:border-white/5 rounded-3xl p-8 shadow-sm">
                        <button onClick={() => setSelected(null)} className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 flex items-center justify-center text-gray-600 dark:text-white/40"><X size={18} /></button>
                        <h3 className="text-gray-900 dark:text-white font-bold text-xl mb-6">Demo Request Details</h3>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3"><User size={16} className="text-[#2B3AA0] shrink-0" /><div><div className="text-gray-500 dark:text-white/30 text-[10px] font-black uppercase tracking-widest">Name</div><div className="text-gray-900 dark:text-white font-bold">{selected.name}</div></div></div>
                            <div className="flex items-center gap-3"><Mail size={16} className="text-blue-400 shrink-0" /><div><div className="text-gray-500 dark:text-white/30 text-[10px] font-black uppercase tracking-widest">Email</div><div className="text-gray-900 dark:text-white font-medium">{selected.email}</div></div></div>
                            <div className="flex items-center gap-3"><Phone size={16} className="text-emerald-400 shrink-0" /><div><div className="text-gray-500 dark:text-white/30 text-[10px] font-black uppercase tracking-widest">Phone</div><div className="text-gray-900 dark:text-white font-medium">{selected.phone || "—"}</div></div></div>
                            {selected.message && <div><div className="text-gray-500 dark:text-white/30 text-[10px] font-black uppercase tracking-widest mb-1">Message</div><div className="text-gray-800 dark:text-white/70 text-sm bg-gray-100 dark:bg-white/5 rounded-xl p-4">{selected.message}</div></div>}
                            <div className="flex items-center gap-3"><Calendar size={16} className="text-violet-400 shrink-0" /><div><div className="text-gray-500 dark:text-white/30 text-[10px] font-black uppercase tracking-widest">Date</div><div className="text-gray-900 dark:text-white font-medium">{new Date(selected.createdAt).toLocaleString('en-IN')}</div></div></div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
