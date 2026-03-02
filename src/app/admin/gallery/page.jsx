"use client";
import React, { useState, useEffect } from "react";
import { Image as ImgIcon, Plus, Trash2, Loader2, X, Save, Video, Edit, CheckSquare, Square } from "lucide-react";

export default function GalleryPage() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [saving, setSaving] = useState(false);
    const [selected, setSelected] = useState(new Set());
    const [form, setForm] = useState({ type: "image", url: "", caption: "", category: "" });
    const [editingCaption, setEditingCaption] = useState(null);
    const [captionValue, setCaptionValue] = useState("");

    useEffect(() => { fetchItems(); }, []);
    const fetchItems = async () => { try { const r = await fetch("/api/admin/gallery"); const d = await r.json(); if (d.success) setItems(d.items || []); } catch (e) { } finally { setLoading(false); } };

    const handleAdd = async () => {
        setSaving(true);
        try { const r = await fetch("/api/admin/gallery", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) }); const d = await r.json(); if (d.success) { fetchItems(); setShowForm(false); setForm({ type: "image", url: "", caption: "", category: "" }); } } catch (e) { } finally { setSaving(false); }
    };

    const handleDelete = async (id) => { if (!confirm("Delete this item?")) return; await fetch("/api/admin/gallery", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) }); fetchItems(); };
    const handleBulkDelete = async () => { if (!confirm(`Delete ${selected.size} items?`)) return; for (const id of selected) { await fetch("/api/admin/gallery", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) }); } setSelected(new Set()); fetchItems(); };

    const saveCaption = async (id) => {
        await fetch("/api/admin/gallery", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, caption: captionValue }) });
        setEditingCaption(null); fetchItems();
    };

    const toggleSelect = (id) => { const s = new Set(selected); s.has(id) ? s.delete(id) : s.add(id); setSelected(s); };
    const selectAll = () => { setSelected(selected.size === items.length ? new Set() : new Set(items.map(i => i.id))); };

    if (loading) return <div className="flex items-center justify-center py-32"><Loader2 size={40} className="animate-spin text-[#2B3AA0]" /></div>;

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div><h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Gallery</h1><p className="text-gray-600 dark:text-white/40 text-sm mt-1">{items.length} items</p></div>
                <div className="flex gap-3">
                    {selected.size > 0 && <button onClick={handleBulkDelete} className="flex items-center gap-2 px-4 py-2.5 bg-rose-500/20 border border-rose-500/30 rounded-xl text-rose-400 text-sm font-bold"><Trash2 size={16} /> Delete ({selected.size})</button>}
                    <button onClick={selectAll} className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-xl text-gray-700 dark:text-white/50 text-sm font-bold hover:bg-gray-200 dark:hover:bg-white/10">{selected.size === items.length ? <CheckSquare size={16} /> : <Square size={16} />} Select All</button>
                    <button onClick={() => setShowForm(true)} className="flex items-center gap-2 px-5 py-2.5 bg-[#2B3AA0] text-white rounded-xl font-bold text-sm hover:bg-white transition-all shadow-lg shadow-[#2B3AA0]/20"><Plus size={18} /> Add Item</button>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {items.map(item => (
                    <div key={item.id} className={`group relative bg-white dark:bg-[#0F1629] border rounded-2xl overflow-hidden transition-all ${selected.has(item.id) ? 'border-[#2B3AA0] ring-2 ring-[#2B3AA0]/20' : 'border-gray-200 dark:border-white/5 hover:border-white/10'}`}>
                        <div className="aspect-square relative cursor-pointer" onClick={() => toggleSelect(item.id)}>
                            {item.type === "video" ? (
                                <div className="w-full h-full flex items-center justify-center bg-gray-50 dark:bg-[#0B1120]"><Video size={40} className="text-gray-400 dark:text-white/20" /><span className="absolute bottom-2 left-2 text-[10px] bg-rose-500 text-gray-900 dark:text-white px-2 py-0.5 rounded-full font-bold">VIDEO</span></div>
                            ) : (
                                <img src={item.url} alt={item.caption || "Gallery"} className="w-full h-full object-cover" />
                            )}
                            <div className="absolute top-2 left-2"><div className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all ${selected.has(item.id) ? 'bg-[#2B3AA0] text-white' : 'bg-black/50 text-gray-500 dark:text-white/30'}`}>{selected.has(item.id) ? <CheckSquare size={14} /> : <Square size={14} />}</div></div>
                        </div>
                        <div className="p-3">
                            {editingCaption === item.id ? (
                                <div className="flex gap-2"><input value={captionValue} onChange={e => setCaptionValue(e.target.value)} className="flex-1 h-8 px-2 bg-gray-50 dark:bg-[#0B1120] border border-gray-300 dark:border-white/10 rounded-lg text-gray-900 dark:text-white text-xs outline-none focus:border-[#2B3AA0]/50" /><button onClick={() => saveCaption(item.id)} className="w-8 h-8 rounded-lg bg-[#2B3AA0] text-white flex items-center justify-center"><Save size={12} /></button></div>
                            ) : (
                                <p onClick={() => { setEditingCaption(item.id); setCaptionValue(item.caption || ""); }} className="text-gray-700 dark:text-white/50 text-xs truncate cursor-pointer hover:text-white transition-colors">{item.caption || "Click to add caption"}</p>
                            )}
                        </div>
                        <button onClick={() => handleDelete(item.id)} className="absolute top-2 right-2 w-7 h-7 rounded-lg bg-black/50 text-rose-400 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-rose-500 hover:text-white"><Trash2 size={12} /></button>
                    </div>
                ))}
                {items.length === 0 && <div className="col-span-full text-center py-16 text-gray-400 dark:text-white/20 text-sm">No gallery items</div>}
            </div>

            {showForm && (
                <div className="relative mt-6"><div className="hidden" onClick={() => setShowForm(false)} />
                    <div className="relative w-full max-w-md bg-white dark:bg-[#0F1629] border border-gray-200 dark:border-white/5 rounded-3xl p-8 shadow-sm">
                        <button onClick={() => setShowForm(false)} className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-white/40"><X size={18} /></button>
                        <h3 className="text-gray-900 dark:text-white font-bold text-xl mb-6">Add Gallery Item</h3>
                        <div className="space-y-4">
                            <div className="flex gap-2">{["image", "video"].map(t => (<button key={t} onClick={() => setForm(f => ({ ...f, type: t }))} className={`flex-1 h-12 rounded-xl border text-xs font-bold uppercase transition-all ${form.type === t ? 'bg-[#2B3AA0] text-white border-[#2B3AA0]' : 'bg-gray-100 dark:bg-white/5 border-gray-200 dark:border-white/5 text-gray-600 dark:text-white/40'}`}>{t}</button>))}</div>
                            <FI label={form.type === "video" ? "YouTube URL" : "Image URL"} value={form.url} onChange={v => setForm(f => ({ ...f, url: v }))} />
                            <FI label="Caption" value={form.caption} onChange={v => setForm(f => ({ ...f, caption: v }))} />
                            <FI label="Category" value={form.category} onChange={v => setForm(f => ({ ...f, category: v }))} placeholder="tournament, academy, events" />
                        </div>
                        <div className="flex justify-end gap-3 mt-6">
                            <button onClick={() => setShowForm(false)} className="px-5 py-3 rounded-xl bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-white/50 font-bold text-sm">Cancel</button>
                            <button onClick={handleAdd} disabled={saving} className="px-6 py-3 rounded-xl bg-[#2B3AA0] text-white font-bold text-sm disabled:opacity-50 flex items-center gap-2">{saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} {saving ? "Saving..." : "Add Item"}</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

const FI = ({ label, value, onChange, placeholder }) => (<div className="space-y-1.5"><label className="text-[9px] font-black uppercase tracking-widest text-gray-400 dark:text-white/25 px-1">{label}</label><input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className="w-full h-12 px-4 bg-gray-50 dark:bg-[#0B1120] border border-gray-200 dark:border-white/5 rounded-xl text-gray-900 dark:text-white text-sm outline-none focus:border-[#2B3AA0]/50" /></div>);
