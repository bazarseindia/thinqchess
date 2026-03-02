"use client";
import React, { useState, useEffect } from "react";
import { Users, Plus, Edit, Trash2, Loader2, X, Save, Shield, ToggleLeft, ToggleRight } from "lucide-react";

export default function UsersPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [saving, setSaving] = useState(false);
    const defaultForm = { name: "", email: "", password: "", role: "admin", isActive: true };
    const [form, setForm] = useState(defaultForm);

    useEffect(() => { fetchUsers(); }, []);
    const fetchUsers = async () => { try { const r = await fetch("/api/admin/users"); const d = await r.json(); if (d.success) setUsers(d.users || []); } catch (e) { } finally { setLoading(false); } };

    const handleSave = async () => {
        setSaving(true);
        try {
            const method = editingId ? "PUT" : "POST"; const body = { ...form }; if (editingId) body.id = editingId;
            const r = await fetch("/api/admin/users", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
            const d = await r.json(); if (d.success) { fetchUsers(); setShowForm(false); setEditingId(null); setForm(defaultForm); }
        } catch (e) { } finally { setSaving(false); }
    };

    const handleDelete = async (id) => { if (!confirm("Delete this user?")) return; await fetch("/api/admin/users", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) }); fetchUsers(); };
    const handleEdit = (u) => { setForm({ name: u.name, email: u.email, password: "", role: u.role, isActive: u.isActive }); setEditingId(u.id); setShowForm(true); };

    const roleColors = { super_admin: "text-[#2B3AA0] bg-[#2B3AA0]/10", admin: "text-blue-400 bg-blue-500/10", viewer: "text-gray-600 dark:text-white/40 bg-gray-100 dark:bg-white/5" };

    if (loading) return <div className="flex items-center justify-center py-32"><Loader2 size={40} className="animate-spin text-[#2B3AA0]" /></div>;

    return (
        <div className="space-y-6 max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div><h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Users</h1><p className="text-gray-600 dark:text-white/40 text-sm mt-1">{users.length} admin users</p></div>
                <button onClick={() => { setForm(defaultForm); setEditingId(null); setShowForm(true); }} className="flex items-center gap-2 px-5 py-2.5 bg-[#2B3AA0] text-white rounded-xl font-bold text-sm hover:bg-white transition-all shadow-lg shadow-[#2B3AA0]/20"><Plus size={18} /> Add User</button>
            </div>

            <div className="space-y-3">
                {users.map(u => (
                    <div key={u.id} className="bg-white dark:bg-[#0F1629] border border-gray-200 dark:border-white/5 rounded-2xl p-5 hover:border-white/10 transition-all">
                        <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-[#2B3AA0] flex items-center justify-center text-gray-900 dark:text-white font-black text-lg">{u.name?.[0]}</div>
                                <div><div className="text-gray-900 dark:text-white font-bold">{u.name}</div><div className="text-gray-600 dark:text-white/40 text-xs">{u.email}</div></div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${roleColors[u.role] || roleColors.viewer}`}>{u.role?.replace('_', ' ')}</span>
                                <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${u.isActive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>{u.isActive ? 'Active' : 'Inactive'}</span>
                                <button onClick={() => handleEdit(u)} className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-white/5 hover:bg-[#2B3AA0]/20 hover:text-[#2B3AA0] flex items-center justify-center text-gray-500 dark:text-white/30 transition-all"><Edit size={14} /></button>
                                <button onClick={() => handleDelete(u.id)} className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-white/5 hover:bg-rose-500/20 hover:text-rose-400 flex items-center justify-center text-gray-500 dark:text-white/30 transition-all"><Trash2 size={14} /></button>
                            </div>
                        </div>
                    </div>
                ))}
                {users.length === 0 && <div className="text-center py-16 text-gray-400 dark:text-white/20 text-sm">No users yet</div>}
            </div>

            {showForm && (
                <div className="relative mt-6"><div className="hidden" onClick={() => setShowForm(false)} />
                    <div className="relative w-full max-w-md bg-white dark:bg-[#0F1629] border border-gray-200 dark:border-white/5 rounded-3xl p-8 shadow-sm">
                        <button onClick={() => setShowForm(false)} className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-white/40"><X size={18} /></button>
                        <h3 className="text-gray-900 dark:text-white font-bold text-xl mb-6">{editingId ? "Edit User" : "Add User"}</h3>
                        <div className="space-y-4">
                            <FI label="Name *" value={form.name} onChange={v => setForm(f => ({ ...f, name: v }))} />
                            <FI label="Email *" type="email" value={form.email} onChange={v => setForm(f => ({ ...f, email: v }))} />
                            <FI label={editingId ? "New Password (leave blank to keep)" : "Password *"} type="password" value={form.password} onChange={v => setForm(f => ({ ...f, password: v }))} />
                            <div className="space-y-1.5">
                                <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 dark:text-white/25 px-1">Role</label>
                                <div className="flex gap-2">{["super_admin", "admin", "viewer"].map(r => (<button key={r} onClick={() => setForm(f => ({ ...f, role: r }))} className={`flex-1 h-11 rounded-xl border text-[10px] font-bold uppercase transition-all ${form.role === r ? 'bg-[#2B3AA0] text-white border-[#2B3AA0]' : 'bg-gray-100 dark:bg-white/5 border-gray-200 dark:border-white/5 text-gray-600 dark:text-white/40'}`}>{r.replace('_', ' ')}</button>))}</div>
                            </div>
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

const FI = ({ label, value, onChange, type = "text" }) => (<div className="space-y-1.5"><label className="text-[9px] font-black uppercase tracking-widest text-gray-400 dark:text-white/25 px-1">{label}</label><input type={type} value={value} onChange={e => onChange(e.target.value)} className="w-full h-12 px-4 bg-gray-50 dark:bg-[#0B1120] border border-gray-200 dark:border-white/5 rounded-xl text-gray-900 dark:text-white text-sm outline-none focus:border-[#2B3AA0]/50" /></div>);
