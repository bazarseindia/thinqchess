"use client";
import React, { useState, useEffect, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import {
    Search, Download, Eye, Loader2, ChevronLeft, ChevronRight,
    ArrowLeft, X, User, MapPin, CreditCard, Calendar
} from "lucide-react";

export default function TournamentRegistrationsPage() {
    const { id } = useParams();
    const router = useRouter();
    const [entries, setEntries] = useState([]);
    const [tournament, setTournament] = useState(null);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedEntry, setSelectedEntry] = useState(null);
    const perPage = 15;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [tRes, eRes] = await Promise.all([
                    fetch("/api/admin/tournaments"),
                    fetch(`/api/admin/tournaments/${id}/registrations`),
                ]);
                const tData = await tRes.json();
                const eData = await eRes.json();
                if (tData.success) {
                    const t = tData.tournaments.find(t => t.id === id);
                    setTournament(t);
                }
                if (eData.success) setEntries(eData.entries || []);
            } catch (err) { console.error(err); }
            finally { setLoading(false); }
        };
        fetchData();
    }, [id]);

    const handleDelete = async (entryId) => {
        if (!confirm("Are you sure you want to delete this registration?")) return;
        try {
            const res = await fetch(`/api/admin/tournaments/${id}/registrations?entry_id=${entryId}`, { method: 'DELETE' });
            if (res.ok) {
                setEntries(prev => prev.filter(e => e.id !== entryId));
            } else {
                alert("Failed to delete registration");
            }
        } catch (err) {
            console.error(err);
            alert("Error deleting registration");
        }
    };

    const filtered = useMemo(() => {
        const term = search.toLowerCase();
        return entries.filter(e =>
            !term ||
            e.playerFirstName?.toLowerCase().includes(term) ||
            e.playerLastName?.toLowerCase().includes(term) ||
            e.email?.toLowerCase().includes(term) ||
            e.phone?.includes(term)
        );
    }, [entries, search]);

    const totalPages = Math.ceil(filtered.length / perPage);
    const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

    const exportCSV = () => {
        const headers = ["Name", "Email", "Phone", "Category", "Amount", "Payment Status", "FIDE ID", "KSCA ID", "City", "Date"];
        const rows = filtered.map(e => [
            `${e.playerFirstName} ${e.playerLastName}`, e.email, e.phone || "",
            e.categoryName, e.amountPaid || 0, e.paymentStatus,
            e.fideId || "", e.kscaId || "", e.city || "",
            new Date(e.createdAt).toLocaleDateString('en-IN'),
        ]);
        const csv = [headers.join(","), ...rows.map(r => r.map(v => `"${v || ''}"`).join(","))].join("\n");
        const blob = new Blob([csv], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a"); a.href = url; a.download = `tournament_entries_${id}.csv`; a.click();
    };

    if (loading) return <div className="flex items-center justify-center py-32"><Loader2 size={40} className="animate-spin text-[#2B3AA0]" /></div>;

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <button onClick={() => router.push("/admin/tournaments")} className="flex items-center gap-2 text-gray-600 dark:text-white/40 hover:text-white text-sm mb-2 transition-colors">
                        <ArrowLeft size={16} /> Back to Tournaments
                    </button>
                    <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">{tournament?.name || "Tournament"}</h1>
                    <p className="text-gray-600 dark:text-white/40 text-sm mt-1">{entries.length} registrations</p>
                </div>
                <button onClick={exportCSV} className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500/20 border border-emerald-500/30 rounded-xl text-emerald-400 text-sm font-bold hover:bg-emerald-500/30 transition-all">
                    <Download size={16} /> Export CSV
                </button>
            </div>

            <div className="relative">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-white/20" />
                <input value={search} onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }} placeholder="Search by name, email, or phone..." className="w-full h-12 pl-12 pr-4 bg-white dark:bg-[#0F1629] border border-gray-200 dark:border-white/5 rounded-xl text-gray-900 dark:text-white text-sm placeholder:text-white/20 outline-none focus:border-[#2B3AA0]/50" />
            </div>

            <div className="bg-white dark:bg-[#0F1629] border border-gray-200 dark:border-white/5 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-200 dark:border-white/5">
                                <th className="text-left px-5 py-4 text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-white/30">#</th>
                                <th className="text-left px-5 py-4 text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-white/30">Player</th>
                                <th className="text-left px-5 py-4 text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-white/30">Category</th>
                                <th className="text-left px-5 py-4 text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-white/30">Amount</th>
                                <th className="text-left px-5 py-4 text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-white/30">Status</th>
                                <th className="text-left px-5 py-4 text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-white/30">Date</th>
                                <th className="text-center px-5 py-4 text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-white/30">View</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginated.map((e, idx) => (
                                <tr key={e.id} className="border-b border-gray-200 dark:border-white/5 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
                                    <td className="px-5 py-4 text-gray-500 dark:text-white/30 text-xs font-mono">{(currentPage - 1) * perPage + idx + 1}</td>
                                    <td className="px-5 py-4">
                                        <div className="text-gray-900 dark:text-white font-bold">{e.playerFirstName} {e.playerLastName}</div>
                                        <div className="text-gray-500 dark:text-white/30 text-xs">{e.email}</div>
                                    </td>
                                    <td className="px-5 py-4 text-gray-700 dark:text-white/60 text-xs">{e.categoryName}</td>
                                    <td className="px-5 py-4 text-gray-900 dark:text-white font-bold">₹{e.amountPaid || 0}</td>
                                    <td className="px-5 py-4">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${e.paymentStatus === 'completed' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
                                            {e.paymentStatus}
                                        </span>
                                    </td>
                                    <td className="px-5 py-4 text-gray-600 dark:text-white/40 text-xs">{new Date(e.createdAt).toLocaleDateString('en-IN')}</td>
                                    <td className="px-5 py-4 text-center">
                                        <div className="flex gap-2 justify-center">
                                            <button onClick={() => setSelectedEntry(e)} className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-white/5 hover:bg-[#2B3AA0]/20 hover:text-[#2B3AA0] flex items-center justify-center text-gray-500 dark:text-white/30 transition-all">
                                                <Eye size={16} />
                                            </button>
                                            <button onClick={() => handleDelete(e.id)} className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-white/5 hover:bg-rose-500/20 hover:text-rose-500 flex items-center justify-center text-gray-500 dark:text-white/30 transition-all">
                                                <X size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {paginated.length === 0 && <tr><td colSpan={7} className="text-center py-12 text-gray-400 dark:text-white/20 text-sm">No entries found</td></tr>}
                        </tbody>
                    </table>
                </div>
                {totalPages > 1 && (
                    <div className="flex items-center justify-between px-5 py-4 border-t border-gray-200 dark:border-white/5">
                        <p className="text-gray-500 dark:text-white/30 text-xs">Page {currentPage} of {totalPages}</p>
                        <div className="flex gap-2">
                            <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-600 dark:text-white/40 disabled:opacity-20"><ChevronLeft size={16} /></button>
                            <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)} className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-600 dark:text-white/40 disabled:opacity-20"><ChevronRight size={16} /></button>
                        </div>
                    </div>
                )}
            </div>

            {/* Detail Drawer */}
            {selectedEntry && (
                <div className="relative mt-6">
                    <div className="hidden" onClick={() => setSelectedEntry(null)} />
                    <div className="relative w-full max-w-lg h-full bg-white dark:bg-[#0F1629] border-l border-gray-200 dark:border-white/5 overflow-y-auto shadow-sm">
                        <div className="sticky top-0 z-10 bg-gray-50 dark:bg-[#0B1120] p-6 border-b border-gray-200 dark:border-white/5 flex items-center justify-between">
                            <h3 className="text-gray-900 dark:text-white font-bold text-lg">Entry Details</h3>
                            <button onClick={() => setSelectedEntry(null)} className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 flex items-center justify-center text-gray-600 dark:text-white/40"><X size={18} /></button>
                        </div>
                        <div className="p-6 space-y-4">
                            <DSection title="Player" icon={<User size={14} className="text-[#2B3AA0]" />}>
                                <DRow label="Name" value={`${selectedEntry.playerFirstName} ${selectedEntry.playerMiddleName || ''} ${selectedEntry.playerLastName}`} />
                                <DRow label="Email" value={selectedEntry.email} />
                                <DRow label="Phone" value={selectedEntry.phone} />
                                <DRow label="DOB" value={selectedEntry.dob} />
                                <DRow label="Gender" value={selectedEntry.gender} />
                                <DRow label="FIDE ID" value={selectedEntry.fideId} />
                                <DRow label="KSCA ID" value={selectedEntry.kscaId} />
                            </DSection>
                            <DSection title="Location" icon={<MapPin size={14} className="text-emerald-400" />}>
                                <DRow label="Country" value={selectedEntry.country} />
                                <DRow label="State" value={selectedEntry.state} />
                                <DRow label="City" value={selectedEntry.city} />
                                <DRow label="Address" value={selectedEntry.address} />
                            </DSection>
                            <DSection title="Payment" icon={<CreditCard size={14} className="text-amber-400" />}>
                                <DRow label="Category" value={selectedEntry.categoryName} />
                                <DRow label="Amount" value={`₹${selectedEntry.amountPaid || 0}`} />
                                <DRow label="Discount" value={selectedEntry.discountCode ? `${selectedEntry.discountCode} (-₹${selectedEntry.discountAmount || 0})` : '—'} />
                                <DRow label="Payment ID" value={selectedEntry.paymentId} />
                                <DRow label="Status" value={selectedEntry.paymentStatus} />
                            </DSection>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

const DSection = ({ title, icon, children }) => (
    <div className="bg-gray-100 dark:bg-white/5 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-3 text-xs font-black uppercase tracking-widest text-gray-600 dark:text-white/40">{icon} {title}</div>
        <div className="space-y-2">{children}</div>
    </div>
);

const DRow = ({ label, value }) => (
    <div className="flex justify-between items-center">
        <span className="text-gray-500 dark:text-white/30 text-xs">{label}</span>
        <span className="text-gray-900 dark:text-white text-sm font-medium truncate max-w-[220px]">{value || '—'}</span>
    </div>
);
