"use client";
import React, { useState, useEffect } from "react";
import { FileText, Plus, Edit, Trash2, Loader2, Save, Eye, EyeOff, Calendar, Tag, ArrowLeft, Upload, Image } from "lucide-react";

export default function BlogsPage() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [view, setView] = useState("list"); // "list" | "editor"
    const [editingId, setEditingId] = useState(null);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState("");
    const defaultForm = { title: "", slug: "", content: "", excerpt: "", featuredImage: "", category: "", tags: "", isPublished: false };
    const [form, setForm] = useState(defaultForm);

    useEffect(() => { fetchBlogs(); }, []);
    const fetchBlogs = async () => { try { const r = await fetch("/api/admin/blogs"); const d = await r.json(); if (d.success) setBlogs(d.blogs || []); } catch (e) { } finally { setLoading(false); } };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (!file.type.startsWith('image/')) { setMessage('Please select a valid image'); return; }
        if (file.size > 5 * 1024 * 1024) { setMessage('Image must be under 5MB'); return; }
        setImageFile(file);
        const reader = new FileReader();
        reader.onload = (e) => setImagePreview(e.target.result);
        reader.readAsDataURL(file);
    };

    const handleSave = async () => {
        if (!form.title.trim()) { setMessage("Title is required"); return; }
        if (!form.content.trim()) { setMessage("Content is required"); return; }
        setSaving(true);
        try {
            let featuredImage = form.featuredImage;

            // Upload image if file selected
            if (imageFile) {
                const formData = new FormData();
                formData.append('image', imageFile);
                formData.append('type', 'blog');
                const uploadRes = await fetch('/api/upload', { method: 'POST', body: formData });
                const uploadData = await uploadRes.json();
                if (uploadData.success) { featuredImage = uploadData.url; }
                else { setMessage('Error uploading image'); setSaving(false); return; }
            }

            const method = editingId ? "PUT" : "POST";
            const body = { ...form, featuredImage }; if (editingId) body.id = editingId;
            if (!body.slug) body.slug = body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
            const r = await fetch("/api/admin/blogs", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
            const d = await r.json();
            if (d.success) {
                fetchBlogs();
                setView("list"); setEditingId(null); setForm(defaultForm);
                setImageFile(null); setImagePreview("");
                setMessage(editingId ? "Blog post updated!" : "Blog post created!");
                setTimeout(() => setMessage(""), 3000);
            }
        } catch (e) { setMessage("Error saving post"); } finally { setSaving(false); }
    };

    const handleDelete = async (id) => { if (!confirm("Delete this blog post?")) return; await fetch("/api/admin/blogs", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) }); fetchBlogs(); };
    const handleEdit = (b) => {
        setForm({ title: b.title, slug: b.slug, content: b.content || "", excerpt: b.excerpt || "", featuredImage: b.featuredImage || "", category: b.category || "", tags: b.tags || "", isPublished: b.isPublished });
        setEditingId(b.id);
        setImagePreview(b.featuredImage || "");
        setView("editor");
    };
    const togglePublish = async (b) => { await fetch("/api/admin/blogs", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...b, isPublished: !b.isPublished }) }); fetchBlogs(); };

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
                    <h1 className="text-2xl font-black text-gray-900 dark:text-white">{editingId ? "Edit Blog Post" : "New Blog Post"}</h1>
                </div>

                {message && <div className={`p-3 rounded-xl text-sm font-bold border ${message.includes('Error') || message.includes('required') ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' : 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'}`}>{message}</div>}

                <div className="bg-white dark:bg-[#0F1629] border border-gray-200 dark:border-white/5 rounded-2xl p-6 space-y-5">
                    <FI label="Title *" value={form.title} onChange={v => setForm(f => ({ ...f, title: v }))} />
                    <FI label="Slug" value={form.slug} onChange={v => setForm(f => ({ ...f, slug: v }))} placeholder="auto-generated-from-title" />
                    <FI label="Excerpt (Short description)" value={form.excerpt} onChange={v => setForm(f => ({ ...f, excerpt: v }))} textarea rows={3} />

                    {/* Featured Image */}
                    <div className="space-y-3">
                        <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 dark:text-white/25 px-1">Featured Image</label>
                        {(imagePreview || form.featuredImage) && (
                            <div className="w-full max-w-md rounded-xl overflow-hidden border border-gray-200 dark:border-white/10">
                                <img src={imagePreview || form.featuredImage} alt="Preview" className="w-full h-48 object-cover" />
                            </div>
                        )}
                        <div className="flex items-center gap-3">
                            <label className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl cursor-pointer hover:bg-gray-200 dark:hover:bg-white/10 transition-all">
                                <Upload size={16} className="text-[#2B3AA0]" />
                                <span className="text-gray-700 dark:text-white text-sm font-bold">Upload Image</span>
                                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                            </label>
                            <span className="text-gray-400 dark:text-white/20 text-xs">or</span>
                            <input value={form.featuredImage} onChange={e => { setForm(f => ({ ...f, featuredImage: e.target.value })); setImagePreview(e.target.value); }} placeholder="Paste image URL..."
                                className="flex-1 h-11 px-4 bg-gray-50 dark:bg-[#0B1120] border border-gray-200 dark:border-white/5 rounded-xl text-gray-900 dark:text-white text-sm outline-none focus:border-[#2B3AA0]/50" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <FI label="Category" value={form.category} onChange={v => setForm(f => ({ ...f, category: v }))} placeholder="Chess Tips" />
                        <FI label="Tags (comma-separated)" value={form.tags} onChange={v => setForm(f => ({ ...f, tags: v }))} placeholder="openings, strategy" />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 dark:text-white/25 px-1">Content (HTML) *</label>
                        <textarea value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} rows={20}
                            className="w-full px-4 py-3 bg-gray-50 dark:bg-[#0B1120] border border-gray-200 dark:border-white/5 rounded-xl text-gray-900 dark:text-white text-sm font-mono outline-none focus:border-[#2B3AA0]/50 resize-y" />
                    </div>

                    <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" checked={form.isPublished} onChange={e => setForm(f => ({ ...f, isPublished: e.target.checked }))} className="w-4 h-4 rounded accent-[#2B3AA0]" />
                            <span className="text-gray-700 dark:text-white text-sm font-bold">Publish immediately</span>
                        </label>
                    </div>
                </div>

                <div className="flex justify-end gap-3">
                    <button onClick={() => { setView("list"); setEditingId(null); setForm(defaultForm); }} className="px-6 py-3 rounded-xl bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-white/50 font-bold text-sm hover:bg-gray-200 dark:hover:bg-white/10">Cancel</button>
                    <button onClick={handleSave} disabled={saving} className="px-8 py-3 rounded-xl bg-[#2B3AA0] text-white font-bold text-sm disabled:opacity-50 flex items-center gap-2 shadow-lg shadow-[#2B3AA0]/20">
                        {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} {saving ? "Saving..." : "Save Post"}
                    </button>
                </div>
            </div>
        );
    }

    // ─── LIST VIEW ───
    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div><h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Blogs</h1><p className="text-gray-500 dark:text-white/40 text-sm mt-1">{blogs.length} posts</p></div>
                <button onClick={() => { setForm(defaultForm); setEditingId(null); setImageFile(null); setImagePreview(""); setView("editor"); }} className="flex items-center gap-2 px-5 py-2.5 bg-[#2B3AA0] text-white rounded-xl font-bold text-sm hover:bg-[#1e2d80] transition-all shadow-lg shadow-[#2B3AA0]/20"><Plus size={18} /> New Blog Post</button>
            </div>

            {message && <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500 text-sm font-bold border border-emerald-500/20">{message}</div>}

            <div className="space-y-3">
                {blogs.map(b => (
                    <div key={b.id} className="bg-white dark:bg-[#0F1629] border border-gray-200 dark:border-white/5 rounded-2xl p-5 hover:border-gray-300 dark:hover:border-white/10 transition-all">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex items-center gap-4 flex-1 min-w-0">
                                {b.featuredImage && (
                                    <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-gray-100 dark:bg-white/5">
                                        <img src={b.featuredImage} alt={b.title} className="w-full h-full object-cover" />
                                    </div>
                                )}
                                <div className="min-w-0">
                                    <h3 className="text-gray-900 dark:text-white font-bold text-lg truncate">{b.title}</h3>
                                    <div className="flex flex-wrap gap-3 mt-1 text-xs text-gray-500 dark:text-white/40">
                                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${b.isPublished ? 'bg-emerald-500/20 text-emerald-400' : 'bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-white/30'}`}>{b.isPublished ? "Published" : "Draft"}</span>
                                        {b.category && <span className="flex items-center gap-1"><Tag size={12} /> {b.category}</span>}
                                        <span className="flex items-center gap-1"><Calendar size={12} /> {new Date(b.createdAt).toLocaleDateString('en-IN')}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                                <button onClick={() => togglePublish(b)} className={`w-10 h-10 rounded-xl bg-gray-100 dark:bg-white/5 flex items-center justify-center transition-all ${b.isPublished ? 'hover:bg-amber-500/20 text-emerald-400' : 'hover:bg-emerald-500/20 text-gray-400 dark:text-white/30'}`} title={b.isPublished ? "Unpublish" : "Publish"}>{b.isPublished ? <Eye size={16} /> : <EyeOff size={16} />}</button>
                                <button onClick={() => handleEdit(b)} className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-white/5 hover:bg-[#2B3AA0]/20 hover:text-[#2B3AA0] flex items-center justify-center text-gray-400 dark:text-white/30 transition-all"><Edit size={16} /></button>
                                <button onClick={() => handleDelete(b.id)} className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-white/5 hover:bg-rose-500/20 hover:text-rose-400 flex items-center justify-center text-gray-400 dark:text-white/30 transition-all"><Trash2 size={16} /></button>
                            </div>
                        </div>
                    </div>
                ))}
                {blogs.length === 0 && <div className="text-center py-16 text-gray-400 dark:text-white/20 text-sm">No blog posts yet</div>}
            </div>
        </div>
    );
}

const FI = ({ label, value, onChange, type = "text", placeholder, textarea, rows = 3 }) => (
    <div className="space-y-1.5">
        <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 dark:text-white/25 px-1">{label}</label>
        {textarea ? (
            <textarea value={value} onChange={e => onChange(e.target.value)} rows={rows} placeholder={placeholder}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-[#0B1120] border border-gray-200 dark:border-white/5 rounded-xl text-gray-900 dark:text-white text-sm outline-none focus:border-[#2B3AA0]/50 resize-y" />
        ) : (
            <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
                className="w-full h-12 px-4 bg-gray-50 dark:bg-[#0B1120] border border-gray-200 dark:border-white/5 rounded-xl text-gray-900 dark:text-white text-sm outline-none focus:border-[#2B3AA0]/50" />
        )}
    </div>
);
