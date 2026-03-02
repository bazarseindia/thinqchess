"use client";
import React, { useState, useEffect, useMemo } from "react";
import {
    Search, Filter, Download, Eye, Loader2, ChevronLeft, ChevronRight,
    Calendar, X, Printer, Mail, Phone, MapPin, User, ArrowLeft
} from "lucide-react";

export default function RegistrationsPage() {
    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [filterMode, setFilterMode] = useState("ALL");
    const [currentPage, setCurrentPage] = useState(1);
    const [view, setView] = useState("list"); // "list" | "detail"
    const [selectedReg, setSelectedReg] = useState(null);
    const perPage = 15;

    useEffect(() => { fetchRegistrations(); }, []);

    const fetchRegistrations = async () => {
        try {
            const res = await fetch("/api/course-registration");
            const data = await res.json();
            setRegistrations(Array.isArray(data) ? data : []);
        } catch (err) { console.error("Failed to fetch:", err); }
        finally { setLoading(false); }
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this registration?")) return;
        try {
            const res = await fetch(`/api/course-registration?id=${id}`, { method: 'DELETE' });
            if (res.ok) {
                setRegistrations(prev => prev.filter(r => r.id !== id));
            } else {
                alert("Failed to delete registration");
            }
        } catch (e) {
            console.error("Delete failed:", e);
            alert("Error deleting registration");
        }
    };

    const filtered = useMemo(() => {
        return registrations.filter(r => {
            const term = search.toLowerCase();
            const matchesSearch = !term ||
                r.studentFirstName?.toLowerCase().includes(term) ||
                r.studentLastName?.toLowerCase().includes(term) ||
                r.studentEmail?.toLowerCase().includes(term) ||
                r.studentPhone?.includes(term) ||
                r.fatherPhone?.includes(term) ||
                r.motherPhone?.includes(term) ||
                r.fatherFirstName?.toLowerCase().includes(term) ||
                r.motherFirstName?.toLowerCase().includes(term) ||
                r.city?.toLowerCase().includes(term) ||
                r.preferredCentre?.toLowerCase().includes(term);
            const matchesMode = filterMode === "ALL" || (r.mode?.toLowerCase() === filterMode.toLowerCase());
            return matchesSearch && matchesMode;
        });
    }, [registrations, search, filterMode]);

    const totalPages = Math.ceil(filtered.length / perPage);
    const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

    const exportCSV = () => {
        const headers = ["#", "Classes For", "Student Name", "DOB", "Gender", "Student Email", "Student Phone", "Father Name", "Father Email", "Father Phone", "Mother Name", "Mother Email", "Mother Phone", "Country", "State", "City", "Address", "Pincode", "Mode", "Coaching City", "Centre", "Heard From", "Referral Name", "Other Source", "Date"];
        const rows = filtered.map((r, i) => [
            i + 1,
            r.classesFor || "Child",
            `${r.studentFirstName} ${r.studentMiddleName || ''} ${r.studentLastName}`.trim(),
            r.dob, r.gender, r.studentEmail || "", r.studentPhone || "",
            `${r.fatherFirstName || ''} ${r.fatherMiddleName || ''} ${r.fatherLastName || ''}`.trim(),
            r.fatherEmail || "", r.fatherPhone || "",
            `${r.motherFirstName || ''} ${r.motherMiddleName || ''} ${r.motherLastName || ''}`.trim(),
            r.motherEmail || "", r.motherPhone || "",
            r.country || "", r.state || "", r.city || "",
            `${r.addressLine1 || ''} ${r.addressLine2 || ''}`.trim(),
            r.pincode || "", r.mode || "", r.coachingCity || "", r.preferredCentre || "",
            r.heardFrom || "", `${r.refFirstName || ''} ${r.refLastName || ''}`.trim(),
            r.otherSource || "",
            new Date(r.createdAt).toLocaleDateString('en-IN'),
        ]);
        const csv = [headers.join(","), ...rows.map(r => r.map(v => `"${(v || '').toString().replace(/"/g, '""')}"`).join(","))].join("\n");
        const blob = new Blob([csv], { type: "text/csv" });
        const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = `registrations_${Date.now()}.csv`; a.click();
    };

    if (loading) return <div className="flex items-center justify-center py-32"><Loader2 size={40} className="animate-spin text-[#2B3AA0]" /></div>;

    // ─── DETAIL VIEW ───
    if (view === "detail" && selectedReg) {
        return (
            <div className="space-y-6 max-w-4xl mx-auto">
                <div className="flex items-center gap-4">
                    <button onClick={() => { setView("list"); setSelectedReg(null); }}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-white/50 text-sm font-bold hover:bg-gray-200 dark:hover:bg-white/10 transition-all">
                        <ArrowLeft size={16} /> Back to List
                    </button>
                    <h1 className="text-2xl font-black text-gray-900 dark:text-white">Registration Details</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <DetailSection title="Student Info" icon={<User size={16} className="text-[#2B3AA0]" />}>
                        <DetailRow label="Classes For" value={selectedReg.classesFor || "Child"} />
                        <DetailRow label="First Name" value={selectedReg.studentFirstName} />
                        <DetailRow label="Middle Name" value={selectedReg.studentMiddleName} />
                        <DetailRow label="Last Name" value={selectedReg.studentLastName} />
                        <DetailRow label="Date of Birth" value={selectedReg.dob} />
                        <DetailRow label="Gender" value={selectedReg.gender} />
                        <DetailRow label="Email" value={selectedReg.studentEmail} />
                        <DetailRow label="Phone" value={selectedReg.studentPhone} />
                    </DetailSection>

                    <DetailSection title="Father Info" icon={<User size={16} className="text-blue-400" />}>
                        <DetailRow label="First Name" value={selectedReg.fatherFirstName} />
                        <DetailRow label="Middle Name" value={selectedReg.fatherMiddleName} />
                        <DetailRow label="Last Name" value={selectedReg.fatherLastName} />
                        <DetailRow label="Email" value={selectedReg.fatherEmail} />
                        <DetailRow label="Phone" value={selectedReg.fatherPhone} />
                    </DetailSection>

                    <DetailSection title="Mother Info" icon={<User size={16} className="text-pink-400" />}>
                        <DetailRow label="First Name" value={selectedReg.motherFirstName} />
                        <DetailRow label="Middle Name" value={selectedReg.motherMiddleName} />
                        <DetailRow label="Last Name" value={selectedReg.motherLastName} />
                        <DetailRow label="Email" value={selectedReg.motherEmail} />
                        <DetailRow label="Phone" value={selectedReg.motherPhone} />
                    </DetailSection>

                    <DetailSection title="Address" icon={<MapPin size={16} className="text-emerald-400" />}>
                        <DetailRow label="Country" value={selectedReg.country} />
                        <DetailRow label="State" value={selectedReg.state} />
                        <DetailRow label="City" value={selectedReg.city} />
                        <DetailRow label="Address Line 1" value={selectedReg.addressLine1} />
                        <DetailRow label="Address Line 2" value={selectedReg.addressLine2} />
                        <DetailRow label="Pincode" value={selectedReg.pincode} />
                    </DetailSection>

                    <DetailSection title="Coaching Preference" icon={<Calendar size={16} className="text-amber-400" />}>
                        <DetailRow label="Mode" value={selectedReg.mode} />
                        <DetailRow label="Coaching City" value={selectedReg.coachingCity} />
                        <DetailRow label="Preferred Centre" value={selectedReg.preferredCentre} />
                    </DetailSection>

                    <DetailSection title="Referral & Meta" icon={<Calendar size={16} className="text-violet-400" />}>
                        <DetailRow label="Heard From" value={selectedReg.heardFrom} />
                        <DetailRow label="Referral Name" value={`${selectedReg.refFirstName || ''} ${selectedReg.refLastName || ''}`.trim()} />
                        <DetailRow label="Other Source" value={selectedReg.otherSource} />
                        <DetailRow label="Registration ID" value={selectedReg.id} />
                        <DetailRow label="Registered On" value={new Date(selectedReg.createdAt).toLocaleString('en-IN')} />
                    </DetailSection>
                </div>
            </div>
        );
    }

    // ─── LIST VIEW ───
    return (
        <div className="space-y-6 max-w-full mx-auto relative relative">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Registrations</h1>
                    <p className="text-gray-500 dark:text-white/40 text-sm mt-1">{registrations.length} total registrations</p>
                </div>
                <button onClick={exportCSV} className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500/20 border border-emerald-500/30 rounded-xl text-emerald-400 text-sm font-bold hover:bg-emerald-500/30 transition-all">
                    <Download size={16} /> Export CSV
                </button>
            </div>

            {/* Search + Filter */}
            <div className="flex flex-col md:flex-row gap-3">
                <div className="relative flex-1">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-white/20" />
                    <input
                        value={search}
                        onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                        placeholder="Search by name, email, phone, city, centre..."
                        className="w-full h-12 pl-12 pr-4 bg-white dark:bg-[#0F1629] border border-gray-200 dark:border-white/5 rounded-xl text-gray-900 dark:text-white text-sm placeholder:text-gray-400 dark:placeholder:text-white/20 outline-none focus:border-[#2B3AA0]/50"
                    />
                </div>
                <div className="flex gap-2">
                    {["ALL", "Online", "Offline"].map(m => (
                        <button key={m} onClick={() => { setFilterMode(m); setCurrentPage(1); }}
                            className={`px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${filterMode === m ? 'bg-[#2B3AA0] text-white' : 'bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-white/40 hover:text-gray-700 dark:hover:text-white'}`}>
                            {m}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table */}
            <div className="bg-white dark:bg-[#0F1629] border border-gray-200 dark:border-white/5 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-200 dark:border-white/5">
                                <TH>#</TH>
                                <TH>For</TH>
                                <TH>Student Name</TH>
                                <TH>DOB</TH>
                                <TH>Gender</TH>
                                <TH>Student Phone</TH>
                                <TH>Father Name</TH>
                                <TH>Father Phone</TH>
                                <TH>Mother Phone</TH>
                                <TH>Mode</TH>
                                <TH>Centre</TH>
                                <TH>City</TH>
                                <TH>Heard From</TH>
                                <TH>Date</TH>
                                <TH center>View</TH>
                            </tr>
                        </thead>
                        <tbody>
                            {paginated.map((r, idx) => (
                                <tr key={r.id} className="border-b border-gray-200 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                    <TD muted>{(currentPage - 1) * perPage + idx + 1}</TD>
                                    <TD><span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${r.classesFor === 'Self' ? 'bg-violet-500/20 text-violet-400' : 'bg-blue-500/20 text-blue-400'}`}>{r.classesFor || 'Child'}</span></TD>
                                    <TD bold>{r.studentFirstName} {r.studentLastName}</TD>
                                    <TD>{r.dob || '—'}</TD>
                                    <TD>{r.gender || '—'}</TD>
                                    <TD>{r.studentPhone || r.fatherPhone || '—'}</TD>
                                    <TD>{r.fatherFirstName ? `${r.fatherFirstName} ${r.fatherLastName || ''}` : '—'}</TD>
                                    <TD>{r.fatherPhone || '—'}</TD>
                                    <TD>{r.motherPhone || '—'}</TD>
                                    <TD>
                                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${r.mode === 'Online' ? 'bg-blue-500/20 text-blue-400' : r.mode === 'Offline' ? 'bg-amber-500/20 text-amber-400' : 'bg-gray-100 dark:bg-white/5 text-gray-400 dark:text-white/30'}`}>
                                            {r.mode || '—'}
                                        </span>
                                    </TD>
                                    <TD>{r.preferredCentre || '—'}</TD>
                                    <TD>{r.city || r.coachingCity || '—'}</TD>
                                    <TD>{r.heardFrom || '—'}</TD>
                                    <TD>{new Date(r.createdAt).toLocaleDateString('en-IN')}</TD>
                                    <TD center>
                                        <div className="flex gap-2 justify-center">
                                            <button onClick={() => { setSelectedReg(r); setView("detail"); }} className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-white/5 hover:bg-[#2B3AA0]/20 hover:text-[#2B3AA0] flex items-center justify-center text-gray-400 dark:text-white/30 transition-all">
                                                <Eye size={14} />
                                            </button>
                                            <button onClick={() => handleDelete(r.id)} className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-white/5 hover:bg-rose-500/20 hover:text-rose-500 flex items-center justify-center text-gray-400 dark:text-white/30 transition-all">
                                                <X size={14} />
                                            </button>
                                        </div>
                                    </TD>
                                </tr>
                            ))}
                            {paginated.length === 0 && (
                                <tr><td colSpan={15} className="text-center py-12 text-gray-400 dark:text-white/20 text-sm">No registrations found</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-between px-5 py-4 border-t border-gray-200 dark:border-white/5">
                        <p className="text-gray-500 dark:text-white/30 text-xs">Page {currentPage} of {totalPages} ({filtered.length} results)</p>
                        <div className="flex gap-2">
                            <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-500 dark:text-white/40 hover:text-gray-700 dark:hover:text-white disabled:opacity-20">
                                <ChevronLeft size={16} />
                            </button>
                            <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)} className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-500 dark:text-white/40 hover:text-gray-700 dark:hover:text-white disabled:opacity-20">
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

// Helper components
const TH = ({ children, center }) => (
    <th className={`${center ? 'text-center' : 'text-left'} px-4 py-3 text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-white/30 whitespace-nowrap`}>{children}</th>
);

const TD = ({ children, bold, muted, center }) => (
    <td className={`px-4 py-3 whitespace-nowrap text-xs ${center ? 'text-center' : ''} ${bold ? 'text-gray-900 dark:text-white font-bold' : muted ? 'text-gray-400 dark:text-white/30 font-mono' : 'text-gray-600 dark:text-white/50'}`}>{children}</td>
);

const DetailSection = ({ title, icon, children }) => (
    <div className="bg-white dark:bg-[#0F1629] border border-gray-200 dark:border-white/5 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-4 text-xs font-black uppercase tracking-widest text-gray-500 dark:text-white/40">
            {icon} {title}
        </div>
        <div className="space-y-3">{children}</div>
    </div>
);

const DetailRow = ({ label, value }) => (
    <div className="flex justify-between items-center">
        <span className="text-gray-400 dark:text-white/30 text-xs font-medium">{label}</span>
        <span className="text-gray-900 dark:text-white text-sm font-medium truncate max-w-[250px]">{value || '—'}</span>
    </div>
);
