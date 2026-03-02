"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
    Trophy, Plus, Edit, Trash2, Eye, Loader2, Calendar, MapPin,
    Users, ToggleLeft, ToggleRight, X, Save, ChevronRight, Upload, Image, ArrowLeft
} from "lucide-react";

export default function TournamentsPage() {
    const [tournaments, setTournaments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [view, setView] = useState("list"); // "list" | "editor"
    const [editingId, setEditingId] = useState(null);
    const [saving, setSaving] = useState(false);
    const [activeTab, setActiveTab] = useState("active");
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState("");
    const [message, setMessage] = useState("");
    const router = useRouter();

    const defaultForm = {
        name: "", description: "", startDate: "", endDate: "",
        registrationStartDate: "", registrationEndDate: "",
        location: "", flyerImage: "", defaultFee: "500", isActive: true, requireKscaId: false,
        categories: [{ id: "cat_1", name: "", fee: "", minAge: "", maxAge: "", slots: "" }],
    };
    const [form, setForm] = useState(defaultForm);

    useEffect(() => { fetchTournaments(); }, []);

    const fetchTournaments = async () => {
        try {
            const res = await fetch("/api/admin/tournaments");
            const data = await res.json();
            if (data.success) setTournaments(data.tournaments || []);
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (!file.type.startsWith('image/')) { setMessage('Please select a valid image file'); return; }
        if (file.size > 5 * 1024 * 1024) { setMessage('Image size should be less than 5MB'); return; }
        setImageFile(file);
        const reader = new FileReader();
        reader.onload = (e) => setImagePreview(e.target.result);
        reader.readAsDataURL(file);
    };

    const removeImage = () => { setImageFile(null); setImagePreview(""); setForm(f => ({ ...f, flyerImage: "" })); };

    const handleSave = async () => {
        if (!form.name.trim()) { setMessage("Tournament name is required"); return; }
        if (!form.startDate) { setMessage("Start date is required"); return; }
        if (!form.registrationStartDate) { setMessage("Registration start date is required"); return; }
        if (!form.registrationEndDate) { setMessage("Registration end date is required"); return; }

        setSaving(true);
        try {
            let flyerImage = form.flyerImage;
            if (imageFile) {
                const formData = new FormData();
                formData.append('image', imageFile);
                formData.append('type', 'tournament');
                const uploadRes = await fetch('/api/upload', { method: 'POST', body: formData });
                const uploadData = await uploadRes.json();
                if (uploadData.success) { flyerImage = uploadData.url; }
                else { setMessage('Error uploading image'); setSaving(false); return; }
            }

            let categories = form.categories.filter(c => c.name.trim());
            if (categories.length === 0) {
                categories = [{ id: 'open', name: 'Open Category', fee: form.defaultFee || '500', minAge: '', maxAge: '', slots: '50' }];
            }

            const method = editingId ? "PUT" : "POST";
            const body = { ...form, flyerImage, categories: JSON.stringify(categories) };
            if (editingId) body.id = editingId;

            const res = await fetch("/api/admin/tournaments", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
            const data = await res.json();
            if (data.success) {
                setMessage(editingId ? "Tournament updated!" : "Tournament created!");
                fetchTournaments();
                setView("list"); setEditingId(null); setForm(defaultForm);
                setImageFile(null); setImagePreview("");
                setTimeout(() => setMessage(""), 3000);
            } else { setMessage(data.error || "Failed to save"); }
        } catch (err) { console.error(err); setMessage("Error saving tournament"); }
        finally { setSaving(false); }
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure? This will also delete all registrations.")) return;
        try {
            await fetch("/api/admin/tournaments", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
            fetchTournaments(); setMessage("Tournament deleted!"); setTimeout(() => setMessage(""), 3000);
        } catch (err) { console.error(err); }
    };

    const handleEdit = (t) => {
        const cats = typeof t.categories === "string" ? JSON.parse(t.categories) : (t.categories || []);
        setForm({
            name: t.name, description: t.description || "",
            startDate: t.startDate?.split("T")[0] || "", endDate: t.endDate?.split("T")[0] || "",
            registrationStartDate: t.registrationStartDate?.split("T")[0] || "",
            registrationEndDate: t.registrationEndDate?.split("T")[0] || "",
            location: t.location || "", flyerImage: t.flyerImage || "",
            defaultFee: t.defaultFee || "500",
            isActive: t.isActive, requireKscaId: t.requireKscaId || false,
            categories: cats.length > 0 ? cats : [{ id: "cat_1", name: "", fee: "", minAge: "", maxAge: "", slots: "" }],
        });
        setImagePreview(t.flyerImage || "");
        setEditingId(t.id);
        setView("editor");
    };

    const addCategory = () => {
        setForm(prev => ({ ...prev, categories: [...prev.categories, { id: `cat_${Date.now()}`, name: "", fee: "", minAge: "", maxAge: "", slots: "" }] }));
    };
    const removeCategory = (idx) => { setForm(prev => ({ ...prev, categories: prev.categories.filter((_, i) => i !== idx) })); };
    const updateCategory = (idx, field, value) => {
        setForm(prev => ({ ...prev, categories: prev.categories.map((c, i) => i === idx ? { ...c, [field]: value } : c) }));
    };

    const getStatus = (t) => {
        const now = new Date();
        const regStart = new Date(t.registrationStartDate);
        const regEnd = new Date(t.registrationEndDate);
        const eventDate = new Date(t.startDate);
        if (now >= regStart && now <= regEnd) return { label: "LIVE", color: "bg-emerald-500/20 text-emerald-400" };
        if (now < regStart) return { label: "UPCOMING", color: "bg-blue-500/20 text-blue-400" };
        if (now > eventDate) return { label: "COMPLETED", color: "bg-gray-200 dark:bg-white/5 text-gray-500 dark:text-white/30" };
        return { label: t.isActive ? "ACTIVE" : "INACTIVE", color: t.isActive ? "bg-emerald-500/20 text-emerald-400" : "bg-gray-200 dark:bg-white/5 text-gray-500 dark:text-white/30" };
    };

    const activeTournaments = tournaments.filter(t => t.isActive);
    const pastTournaments = tournaments.filter(t => !t.isActive);

    if (loading) return <div className="flex items-center justify-center py-32"><Loader2 size={40} className="animate-spin text-[#2B3AA0]" /></div>;

    // ─── EDITOR VIEW ───
    if (view === "editor") {
        return (
            <div className="space-y-6 max-w-4xl mx-auto">
                <div className="flex items-center gap-4">
                    <button onClick={() => { setView("list"); setEditingId(null); setForm(defaultForm); setImageFile(null); setImagePreview(""); }}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-white/50 text-sm font-bold hover:bg-gray-200 dark:hover:bg-white/10 transition-all">
                        <ArrowLeft size={16} /> Back to List
                    </button>
                    <h1 className="text-2xl font-black text-gray-900 dark:text-white">{editingId ? "Edit Tournament" : "Create Tournament"}</h1>
                </div>

                {message && <div className={`p-3 rounded-xl text-sm font-bold border ${message.includes('Error') || message.includes('required') ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' : 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'}`}>{message}</div>}

                <div className="bg-white dark:bg-[#0F1629] border border-gray-200 dark:border-white/5 rounded-2xl p-6 space-y-6">
                    {/* Basic Info */}
                    <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-white/30">Basic Information</label>
                        <FormInput label="Tournament Name *" value={form.name} onChange={(v) => setForm(f => ({ ...f, name: v }))} />
                        <FormInput label="Description" value={form.description} onChange={(v) => setForm(f => ({ ...f, description: v }))} textarea />
                        <FormInput label="Location" value={form.location} onChange={(v) => setForm(f => ({ ...f, location: v }))} />
                        <FormInput label="Default Fee (₹)" type="number" value={form.defaultFee} onChange={(v) => setForm(f => ({ ...f, defaultFee: v }))} />
                    </div>

                    {/* Flyer Image Upload */}
                    <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-white/30">Tournament Flyer Image</label>
                        {(imagePreview || form.flyerImage) && (
                            <div className="relative w-48 rounded-xl overflow-hidden border border-gray-200 dark:border-white/10">
                                <img src={imagePreview || form.flyerImage} alt="Flyer preview" className="w-full h-auto" />
                                <button onClick={removeImage} className="absolute top-2 right-2 w-7 h-7 rounded-lg bg-black/60 text-white flex items-center justify-center hover:bg-rose-500"><X size={14} /></button>
                            </div>
                        )}
                        <div className="flex items-center gap-4">
                            <label className="flex items-center gap-2 px-5 py-3 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl cursor-pointer hover:bg-gray-200 dark:hover:bg-white/10 transition-all">
                                <Upload size={16} className="text-[#2B3AA0]" />
                                <span className="text-gray-700 dark:text-white text-sm font-bold">Upload Flyer</span>
                                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                            </label>
                            <span className="text-gray-400 dark:text-white/20 text-xs">JPG, PNG — Max 5MB</span>
                        </div>
                    </div>

                    {/* Dates */}
                    <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-white/30">Dates</label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormInput label="Tournament Date *" type="date" value={form.startDate} onChange={(v) => setForm(f => ({ ...f, startDate: v, endDate: v }))} />
                            <FormInput label="End Date" type="date" value={form.endDate} onChange={(v) => setForm(f => ({ ...f, endDate: v }))} />
                            <FormInput label="Registration Start Date *" type="date" value={form.registrationStartDate} onChange={(v) => setForm(f => ({ ...f, registrationStartDate: v }))} />
                            <FormInput label="Registration End Date *" type="date" value={form.registrationEndDate} onChange={(v) => setForm(f => ({ ...f, registrationEndDate: v }))} />
                        </div>
                    </div>

                    {/* Toggles */}
                    <div className="flex flex-wrap gap-4">
                        <ToggleBtn label="Active" value={form.isActive} onChange={(v) => setForm(f => ({ ...f, isActive: v }))} />
                        <ToggleBtn label="Require KSCA ID" value={form.requireKscaId} onChange={(v) => setForm(f => ({ ...f, requireKscaId: v }))} />
                    </div>

                    {/* Categories */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-white/30">Categories</label>
                            <button onClick={addCategory} className="text-[10px] font-bold text-[#2B3AA0] hover:underline">+ Add Category</button>
                        </div>
                        <p className="text-gray-400 dark:text-white/20 text-xs">Add categories for your tournament. If none added, a default "Open Category" will be created.<br /><b>Age Guidelines:</b> Under 8, Under 10, Under 12, Under 16, Open (no age limit)</p>
                        {form.categories.map((cat, idx) => (
                            <div key={idx} className="p-4 rounded-xl bg-gray-50 dark:bg-white/5 space-y-3">
                                <div className="grid grid-cols-2 md:grid-cols-5 gap-3 items-end">
                                    <div className="col-span-2"><FormInput label="Category Name" value={cat.name} onChange={(v) => updateCategory(idx, 'name', v)} /></div>
                                    <div><FormInput label="Fee (₹)" type="number" value={cat.fee} onChange={(v) => updateCategory(idx, 'fee', v)} /></div>
                                    <div><FormInput label="Slots" type="number" value={cat.slots} onChange={(v) => updateCategory(idx, 'slots', v)} /></div>
                                    <div className="flex items-end gap-2">
                                        {form.categories.length > 1 && (
                                            <button onClick={() => removeCategory(idx)} className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center hover:bg-rose-500/20 mb-0.5"><Trash2 size={14} /></button>
                                        )}
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <FormInput label="Min Age (leave empty for open)" type="number" value={cat.minAge} onChange={(v) => updateCategory(idx, 'minAge', v)} />
                                    <FormInput label="Max Age (leave empty for open)" type="number" value={cat.maxAge} onChange={(v) => updateCategory(idx, 'maxAge', v)} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer Buttons */}
                <div className="flex justify-end gap-3">
                    <button onClick={() => { setView("list"); setEditingId(null); setForm(defaultForm); }} className="px-6 py-3 rounded-xl bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-white/50 font-bold text-sm hover:bg-gray-200 dark:hover:bg-white/10">Cancel</button>
                    <button onClick={handleSave} disabled={saving} className="px-8 py-3 rounded-xl bg-[#2B3AA0] text-white font-bold text-sm hover:bg-[#1e2d80] disabled:opacity-50 flex items-center gap-2 shadow-lg shadow-[#2B3AA0]/20">
                        {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                        {saving ? 'Saving...' : 'Save Tournament'}
                    </button>
                </div>
            </div>
        );
    }

    // ─── LIST VIEW ───
    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Tournaments</h1>
                    <p className="text-gray-500 dark:text-white/40 text-sm mt-1">{tournaments.length} total • {activeTournaments.length} active • {pastTournaments.length} completed</p>
                </div>
                <button onClick={() => { setForm(defaultForm); setEditingId(null); setImageFile(null); setImagePreview(""); setView("editor"); }}
                    className="flex items-center gap-2 px-5 py-2.5 bg-[#2B3AA0] text-white rounded-xl font-bold text-sm hover:bg-[#1e2d80] transition-all shadow-lg shadow-[#2B3AA0]/20">
                    <Plus size={18} /> Create Tournament
                </button>
            </div>

            {message && <div className={`p-4 rounded-xl text-sm font-bold ${message.includes('Error') || message.includes('required') ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'}`}>{message}</div>}

            {/* Tabs */}
            <div className="flex gap-2">
                {[{ key: "active", label: `Active (${activeTournaments.length})` }, { key: "past", label: `Past (${pastTournaments.length})` }].map(tab => (
                    <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                        className={`px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${activeTab === tab.key ? 'bg-[#2B3AA0] text-white' : 'bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-white/40 hover:text-gray-700 dark:hover:text-white'}`}>
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tournament Cards */}
            <div className="space-y-4">
                {(activeTab === "active" ? activeTournaments : pastTournaments).map(t => {
                    const cats = typeof t.categories === "string" ? JSON.parse(t.categories) : (t.categories || []);
                    const status = getStatus(t);
                    return (
                        <div key={t.id} className="bg-white dark:bg-[#0F1629] border border-gray-200 dark:border-white/5 rounded-2xl p-6 hover:border-gray-300 dark:hover:border-white/10 transition-all">
                            <div className="flex flex-col md:flex-row gap-5">
                                {t.flyerImage && (
                                    <div className="w-full md:w-32 h-40 rounded-xl overflow-hidden shrink-0 bg-gray-100 dark:bg-white/5">
                                        <img src={t.flyerImage} alt={t.name} className="w-full h-full object-cover" />
                                    </div>
                                )}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-gray-900 dark:text-white font-bold text-lg truncate">{t.name}</h3>
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${status.color}`}>{status.label}</span>
                                    </div>
                                    {t.description && <p className="text-gray-500 dark:text-white/30 text-sm mb-3 line-clamp-2">{t.description}</p>}
                                    <div className="flex flex-wrap gap-4 text-xs text-gray-500 dark:text-white/40 mb-2">
                                        <span className="flex items-center gap-1"><Calendar size={12} /> Event: {new Date(t.startDate).toLocaleDateString('en-IN')}</span>
                                        <span className="flex items-center gap-1"><Calendar size={12} /> Reg: {new Date(t.registrationStartDate).toLocaleDateString('en-IN')} — {new Date(t.registrationEndDate).toLocaleDateString('en-IN')}</span>
                                        <span className="flex items-center gap-1"><MapPin size={12} /> {t.location || "TBA"}</span>
                                        <span className="flex items-center gap-1"><Users size={12} /> {cats.length} categories</span>
                                        <span className="flex items-center gap-1"><Trophy size={12} /> {t._count?.registrations || 0} entries</span>
                                    </div>
                                    {cats.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {cats.map((c, i) => (
                                                <span key={i} className="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-white/5 text-[10px] font-bold text-gray-500 dark:text-white/40">
                                                    {c.name} {c.fee ? `₹${c.fee}` : ''} {c.minAge || c.maxAge ? `(${c.minAge || '0'}–${c.maxAge || '∞'} yr)` : ''} {c.slots ? `• ${c.slots} slots` : ''}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div className="flex md:flex-col items-center gap-2 shrink-0">
                                    <button onClick={() => router.push(`/admin/tournaments/${t.id}/registrations`)} className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-white/5 hover:bg-blue-500/20 hover:text-blue-400 flex items-center justify-center text-gray-400 dark:text-white/30 transition-all" title="View Registrations"><Eye size={16} /></button>
                                    <button onClick={() => handleEdit(t)} className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-white/5 hover:bg-[#2B3AA0]/20 hover:text-[#2B3AA0] flex items-center justify-center text-gray-400 dark:text-white/30 transition-all" title="Edit"><Edit size={16} /></button>
                                    <button onClick={() => handleDelete(t.id)} className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-white/5 hover:bg-rose-500/20 hover:text-rose-400 flex items-center justify-center text-gray-400 dark:text-white/30 transition-all" title="Delete"><Trash2 size={16} /></button>
                                </div>
                            </div>
                        </div>
                    );
                })}
                {(activeTab === "active" ? activeTournaments : pastTournaments).length === 0 && (
                    <div className="text-center py-16 text-gray-400 dark:text-white/20 text-sm">No {activeTab} tournaments</div>
                )}
            </div>
        </div>
    );
}

const FormInput = ({ label, value, onChange, type = "text", textarea }) => (
    <div className="space-y-1.5">
        <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 dark:text-white/25 px-1">{label}</label>
        {textarea ? (
            <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={3} className="w-full px-4 py-3 bg-gray-50 dark:bg-[#0B1120] border border-gray-200 dark:border-white/5 rounded-xl text-gray-900 dark:text-white text-sm outline-none focus:border-[#2B3AA0]/50 resize-none" />
        ) : (
            <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className="w-full h-12 px-4 bg-gray-50 dark:bg-[#0B1120] border border-gray-200 dark:border-white/5 rounded-xl text-gray-900 dark:text-white text-sm outline-none focus:border-[#2B3AA0]/50" />
        )}
    </div>
);

const ToggleBtn = ({ label, value, onChange }) => (
    <button onClick={() => onChange(!value)} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-white/5 text-sm font-medium hover:bg-gray-200 dark:hover:bg-white/10 transition-all">
        {value ? <ToggleRight size={20} className="text-[#2B3AA0]" /> : <ToggleLeft size={20} className="text-gray-400 dark:text-white/20" />}
        <span className={value ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-white/40'}>{label}</span>
    </button>
);
