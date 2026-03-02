"use client";
import React, { useState, useEffect } from "react";
import { Megaphone, Plus, Trash2, Save, Loader2, GripVertical, Eye, EyeOff, Link as LinkIcon } from "lucide-react";

export default function AnnouncementsPage() {
    const [lines, setLines] = useState([]);
    const [isVisible, setIsVisible] = useState(true);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        (async () => {
            try {
                const r = await fetch("/api/admin/site-content"); const d = await r.json();
                if (d.success) {
                    const item = (d.items || []).find(i => i.key === "top_bar_lines");
                    if (item) {
                        try {
                            const parsed = JSON.parse(item.value);
                            // Support old format (array of strings) and new format (array of objects)
                            const rawLines = parsed.lines || [];
                            setLines(rawLines.map(l => typeof l === "string" ? { text: l, link: "" } : l));
                            setIsVisible(parsed.visible !== false);
                        } catch { setLines([]); }
                    } else {
                        setLines([
                            { text: "Welcome to ThinQ Chess Academy", link: "" },
                            { text: "Admissions Open for 2026 Batch", link: "/registration" },
                            { text: "Call +91-7975820187", link: "" },
                        ]);
                    }
                }
            } catch (e) { } finally { setLoading(false); }
        })();
    }, []);

    const handleSave = async () => {
        setSaving(true);
        try {
            await fetch("/api/admin/site-content", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    key: "top_bar_lines",
                    value: JSON.stringify({ lines, visible: isVisible })
                })
            });
            setMessage("Saved!"); setTimeout(() => setMessage(""), 3000);
        } catch (e) { setMessage("Error saving"); } finally { setSaving(false); }
    };

    const addLine = () => setLines(l => [...l, { text: "", link: "" }]);
    const removeLine = (idx) => setLines(l => l.filter((_, i) => i !== idx));
    const updateLine = (idx, field, val) => setLines(l => l.map((line, i) => i === idx ? { ...line, [field]: val } : line));

    if (loading) return <div className="flex items-center justify-center py-32"><Loader2 size={40} className="animate-spin text-[#2B3AA0]" /></div>;

    return (
        <div className="space-y-6 max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Announcements</h1>
                    <p className="text-gray-500 dark:text-white/40 text-sm mt-1">Edit the scrolling announcements in the top bar. Add optional links to pages.</p>
                </div>
                <div className="flex gap-3">
                    <button onClick={() => setIsVisible(!isVisible)} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${isVisible ? 'bg-emerald-500/20 text-emerald-400' : 'bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-white/30'}`}>
                        {isVisible ? <Eye size={16} /> : <EyeOff size={16} />} {isVisible ? "Visible" : "Hidden"}
                    </button>
                    <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-5 py-2.5 bg-[#2B3AA0] text-white rounded-xl font-bold text-sm disabled:opacity-50 shadow-lg shadow-[#2B3AA0]/20">
                        {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} {saving ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </div>

            {message && <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500 text-sm font-bold border border-emerald-500/20">{message}</div>}

            <div className="space-y-4">
                {lines.map((line, idx) => (
                    <div key={idx} className="bg-white dark:bg-[#0F1629] border border-gray-200 dark:border-white/5 rounded-2xl p-5 group">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="text-gray-300 dark:text-white/10"><GripVertical size={18} /></div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-white/20">Announcement #{idx + 1}</span>
                            <button onClick={() => removeLine(idx)} className="ml-auto w-8 h-8 rounded-lg bg-gray-100 dark:bg-white/5 hover:bg-rose-500/20 text-gray-400 dark:text-white/20 hover:text-rose-400 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"><Trash2 size={14} /></button>
                        </div>
                        <div className="space-y-3">
                            <div className="space-y-1">
                                <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 dark:text-white/20 px-1">Text</label>
                                <input value={line.text} onChange={e => updateLine(idx, "text", e.target.value)} placeholder="Enter announcement text..."
                                    className="w-full h-11 px-4 bg-gray-50 dark:bg-[#0B1120] border border-gray-200 dark:border-white/5 rounded-xl text-gray-900 dark:text-white text-sm outline-none focus:border-[#2B3AA0]/50" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 dark:text-white/20 px-1 flex items-center gap-1"><LinkIcon size={10} /> Link (optional)</label>
                                <input value={line.link} onChange={e => updateLine(idx, "link", e.target.value)} placeholder="/registration or https://..."
                                    className="w-full h-11 px-4 bg-gray-50 dark:bg-[#0B1120] border border-gray-200 dark:border-white/5 rounded-xl text-gray-900 dark:text-white text-sm outline-none focus:border-[#2B3AA0]/50" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <button onClick={addLine} className="w-full h-12 border-2 border-dashed border-gray-300 dark:border-white/10 rounded-xl text-gray-500 dark:text-white/30 text-sm font-bold hover:border-[#2B3AA0]/30 hover:text-[#2B3AA0] transition-all flex items-center justify-center gap-2"><Plus size={16} /> Add Announcement</button>
        </div>
    );
}
