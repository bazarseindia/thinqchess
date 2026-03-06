"use client";
import React, { useState, useEffect } from "react";
import { FileEdit, Save, Loader2, Eye } from "lucide-react";

const PAGE_KEYS = [
    { key: "faq", label: "FAQs", description: "Frequently Asked Questions page content" },
    { key: "home_hero", label: "Home Hero", description: "Main landing page hero text (JSON format: {title, subtitle, cta})" },
    { key: "home_stats", label: "Home Stats", description: "Home page stats counters (JSON array of {label, value, suffix})" },
    { key: "footer_content", label: "Footer Content", description: "Footer descriptions and contact info (JSON format: {description, copy, phone, email, address})" },
    { key: "privacy_policy", label: "Privacy Policy", description: "Privacy policy page content" },
    { key: "terms", label: "Terms & Conditions", description: "Terms and conditions page content" },
];

export default function PagesEditorPage() {
    const [activeTab, setActiveTab] = useState("faq");
    const [content, setContent] = useState({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch("/api/admin/site-content");
                const data = await res.json();
                if (data.success) {
                    const map = {};
                    (data.items || []).forEach(i => { map[i.key] = i.value; });
                    setContent(map);
                }
            } catch (e) { }
            finally { setLoading(false); }
        })();
    }, []);

    const handleSave = async () => {
        setSaving(true);
        try {
            await fetch("/api/admin/site-content", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ key: activeTab, value: content[activeTab] || "" })
            });
        } catch (e) { }
        finally { setSaving(false); }
    };

    if (loading) return <div className="flex items-center justify-center py-32"><Loader2 size={40} className="animate-spin text-[#2B3AA0]" /></div>;

    const activePage = PAGE_KEYS.find(p => p.key === activeTab);

    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            <div><h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Pages Editor</h1><p className="text-gray-600 dark:text-white/40 text-sm mt-1">Edit page content that appears on the frontend</p></div>

            <div className="flex gap-2 flex-wrap">
                {PAGE_KEYS.map(p => (
                    <button key={p.key} onClick={() => setActiveTab(p.key)} className={`px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${activeTab === p.key ? 'bg-[#2B3AA0] text-white' : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-white/40 hover:text-white'}`}>
                        {p.label}
                    </button>
                ))}
            </div>

            <div className="bg-white dark:bg-[#0F1629] border border-gray-200 dark:border-white/5 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                    <div><h3 className="text-gray-900 dark:text-white font-bold text-lg">{activePage?.label}</h3><p className="text-gray-500 dark:text-white/30 text-xs mt-0.5">{activePage?.description}</p></div>
                    <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-5 py-2.5 bg-[#2B3AA0] text-white rounded-xl font-bold text-sm disabled:opacity-50 shadow-lg shadow-[#2B3AA0]/20">
                        {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} {saving ? "Saving..." : "Save Changes"}
                    </button>
                </div>
                <textarea
                    value={content[activeTab] || ""}
                    onChange={(e) => setContent(c => ({ ...c, [activeTab]: e.target.value }))}
                    rows={20}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-[#0B1120] border border-gray-200 dark:border-white/5 rounded-xl text-gray-900 dark:text-white text-sm font-mono outline-none focus:border-[#2B3AA0]/50 resize-y"
                    placeholder={`Enter ${activePage?.label} content here (HTML supported)...`}
                />
            </div>
        </div>
    );
}
