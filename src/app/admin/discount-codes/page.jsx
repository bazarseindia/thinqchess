"use client";
import React, { useState, useEffect } from "react";
import {
    Tag, Plus, Edit, Trash2, Loader2, X, Save, ToggleLeft, ToggleRight,
    Calendar, Hash, Percent, DollarSign
} from "lucide-react";

export default function DiscountCodesPage() {
    const [codes, setCodes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [saving, setSaving] = useState(false);

    const defaultForm = { code: "", codeType: "percentage", discountPercentage: "", discountAmount: "", usageLimit: "100", expiryDate: "", isActive: true };
    const [form, setForm] = useState(defaultForm);

    useEffect(() => { fetchCodes(); }, []);

    const fetchCodes = async () => {
        try {
            const res = await fetch("/api/admin/discount-codes");
            const data = await res.json();
            if (data.success) setCodes(data.codes || []);
        } catch (e) { console.error(e); }
        finally { setLoading(false); }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const method = editingId ? "PUT" : "POST";
            const body = { ...form };
            if (editingId) body.id = editingId;
            const res = await fetch("/api/admin/discount-codes", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
            const data = await res.json();
            if (data.success) { fetchCodes(); setShowForm(false); setEditingId(null); setForm(defaultForm); }
        } catch (e) { console.error(e); }
        finally { setSaving(false); }
    };

    const handleDelete = async (id) => {
        if (!confirm("Delete this discount code?")) return;
        await fetch("/api/admin/discount-codes", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
        fetchCodes();
    };

    const handleEdit = (c) => {
        setForm({
            code: c.code, codeType: c.codeType, discountPercentage: c.discountPercentage || "",
            discountAmount: c.discountAmount || "", usageLimit: c.usageLimit || "100",
            expiryDate: c.expiryDate?.split("T")[0] || "", isActive: c.isActive,
        });
        setEditingId(c.id); setShowForm(true);
    };

    const toggleActive = async (c) => {
        await fetch("/api/admin/discount-codes", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: c.id, ...c, isActive: !c.isActive }) });
        fetchCodes();
    };

    if (loading) return <div className="flex items-center justify-center py-32"><Loader2 size={40} className="animate-spin text-[#2B3AA0]" /></div>;

    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div><h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Discount Codes</h1><p className="text-gray-600 dark:text-white/40 text-sm mt-1">{codes.length} codes</p></div>
                <button onClick={() => { setForm(defaultForm); setEditingId(null); setShowForm(true); }} className="flex items-center gap-2 px-5 py-2.5 bg-[#2B3AA0] text-white rounded-xl font-bold text-sm hover:bg-white transition-all shadow-lg shadow-[#2B3AA0]/20"><Plus size={18} /> Create Code</button>
            </div>

            <div className="space-y-3">
                {codes.map(c => (
                    <div key={c.id} className="bg-white dark:bg-[#0F1629] border border-gray-200 dark:border-white/5 rounded-2xl p-5 hover:border-white/10 transition-all">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex items-center gap-4 flex-1">
                                <div className="w-12 h-12 rounded-xl bg-[#2B3AA0]/10 flex items-center justify-center shrink-0"><Tag size={20} className="text-[#2B3AA0]" /></div>
                                <div className="min-w-0">
                                    <div className="text-gray-900 dark:text-white font-black text-lg tracking-wider font-mono">{c.code}</div>
                                    <div className="flex flex-wrap gap-3 mt-1 text-xs text-gray-600 dark:text-white/40">
                                        <span className="flex items-center gap-1">{c.codeType === 'percentage' ? <><Percent size={12} /> {c.discountPercentage}% off</> : <><DollarSign size={12} /> ₹{c.discountAmount} off</>}</span>
                                        <span className="flex items-center gap-1"><Hash size={12} /> {c.usedCount}/{c.usageLimit} used</span>
                                        {c.expiryDate && <span className="flex items-center gap-1"><Calendar size={12} /> Expires: {new Date(c.expiryDate).toLocaleDateString('en-IN')}</span>}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                                <button onClick={() => toggleActive(c)} className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase flex items-center gap-2 transition-all ${c.isActive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-white/30'}`}>
                                    {c.isActive ? <ToggleRight size={16} /> : <ToggleLeft size={16} />} {c.isActive ? "Active" : "Inactive"}
                                </button>
                                <button onClick={() => handleEdit(c)} className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-white/5 hover:bg-[#2B3AA0]/20 hover:text-[#2B3AA0] flex items-center justify-center text-gray-500 dark:text-white/30 transition-all"><Edit size={16} /></button>
                                <button onClick={() => handleDelete(c.id)} className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-white/5 hover:bg-rose-500/20 hover:text-rose-400 flex items-center justify-center text-gray-500 dark:text-white/30 transition-all"><Trash2 size={16} /></button>
                            </div>
                        </div>
                    </div>
                ))}
                {codes.length === 0 && <div className="text-center py-16 text-gray-400 dark:text-white/20 text-sm">No discount codes yet</div>}
            </div>

            {showForm && (
                <div className="relative mt-6"><div className="hidden" onClick={() => setShowForm(false)} />
                    <div className="relative w-full max-w-md bg-white dark:bg-[#0F1629] border border-gray-200 dark:border-white/5 rounded-3xl p-8 shadow-sm">
                        <button onClick={() => setShowForm(false)} className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 flex items-center justify-center text-gray-600 dark:text-white/40"><X size={18} /></button>
                        <h3 className="text-gray-900 dark:text-white font-bold text-xl mb-6">{editingId ? "Edit Code" : "Create Code"}</h3>
                        <div className="space-y-4">
                            <FInput label="Code *" value={form.code} onChange={v => setForm(f => ({ ...f, code: v.toUpperCase() }))} placeholder="CHESS2025" />
                            <div className="space-y-1.5">
                                <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 dark:text-white/25 px-1">Type</label>
                                <div className="flex gap-2">
                                    {["percentage", "flat"].map(t => (
                                        <button key={t} onClick={() => setForm(f => ({ ...f, codeType: t }))} className={`flex-1 h-12 rounded-xl border text-xs font-bold uppercase transition-all ${form.codeType === t ? 'bg-[#2B3AA0] text-white border-[#2B3AA0]' : 'bg-gray-100 dark:bg-white/5 border-gray-200 dark:border-white/5 text-gray-600 dark:text-white/40 hover:border-white/10'}`}>{t}</button>
                                    ))}
                                </div>
                            </div>
                            {form.codeType === "percentage" ? (
                                <FInput label="Discount %" type="number" value={form.discountPercentage} onChange={v => setForm(f => ({ ...f, discountPercentage: v }))} placeholder="10" />
                            ) : (
                                <FInput label="Discount Amount (₹)" type="number" value={form.discountAmount} onChange={v => setForm(f => ({ ...f, discountAmount: v }))} placeholder="500" />
                            )}
                            <FInput label="Usage Limit" type="number" value={form.usageLimit} onChange={v => setForm(f => ({ ...f, usageLimit: v }))} />
                            <FInput label="Expiry Date" type="date" value={form.expiryDate} onChange={v => setForm(f => ({ ...f, expiryDate: v }))} />
                        </div>
                        <div className="flex justify-end gap-3 mt-6">
                            <button onClick={() => setShowForm(false)} className="px-5 py-3 rounded-xl bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-white/50 font-bold text-sm">Cancel</button>
                            <button onClick={handleSave} disabled={saving} className="px-6 py-3 rounded-xl bg-[#2B3AA0] text-white font-bold text-sm disabled:opacity-50 flex items-center gap-2">{saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} {saving ? "Saving..." : "Save"}</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

const FInput = ({ label, value, onChange, type = "text", placeholder }) => (
    <div className="space-y-1.5"><label className="text-[9px] font-black uppercase tracking-widest text-gray-400 dark:text-white/25 px-1">{label}</label><input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className="w-full h-12 px-4 bg-gray-50 dark:bg-[#0B1120] border border-gray-200 dark:border-white/5 rounded-xl text-gray-900 dark:text-white text-sm outline-none focus:border-[#2B3AA0]/50" /></div>
);
