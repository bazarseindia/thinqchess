"use client";
import React, { useState, useEffect } from "react";
import {
    Database, Mail, GitBranch, Shield, BarChart3, Loader2,
    Download, Trash2, RefreshCw, CheckCircle2, AlertCircle, Clock,
    FileJson, Save, AlertTriangle, XCircle
} from "lucide-react";

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState("backup");
    const [backups, setBackups] = useState([]);
    const [loading, setLoading] = useState(false);
    const [creating, setCreating] = useState(false);
    const [emailConfig, setEmailConfig] = useState({ adminEmail: "", dailyBackupEnabled: false, notifications: {} });
    const [savingEmail, setSavingEmail] = useState(false);
    const [gitData, setGitData] = useState(null);
    const [gitLoading, setGitLoading] = useState(false);
    const [securityData, setSecurityData] = useState(null);
    const [securityLoading, setSecurityLoading] = useState(false);

    const tabs = [
        { key: "backup", label: "Backups", icon: Database },
        { key: "email", label: "Email & Notifications", icon: Mail },
        { key: "git", label: "Git Status", icon: GitBranch },
        { key: "security", label: "Security", icon: Shield },
        { key: "google_sheets", label: "Google Sheets", icon: BarChart3 },
    ];

    useEffect(() => {
        if (activeTab === "backup") fetchBackups();
        if (activeTab === "email") fetchEmailConfig();
        if (activeTab === "git") fetchGitStatus();
        if (activeTab === "security") fetchSecurityCheck();
    }, [activeTab]);

    // Backup functions
    const fetchBackups = async () => { setLoading(true); try { const r = await fetch("/api/admin/backup"); const d = await r.json(); if (d.success) setBackups(d.backups || []); } catch (e) { } finally { setLoading(false); } };
    const createBackup = async () => {
        setCreating(true);
        try {
            const r = await fetch("/api/admin/backup", { method: "POST" });
            const d = await r.json();
            if (d.success && d.data) {
                // Download the backup as JSON
                const blob = new Blob([JSON.stringify(d.data, null, 2)], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a'); a.href = url; a.download = d.filename; a.click();
                URL.revokeObjectURL(url);
            }
            fetchBackups();
        } catch (e) { } finally { setCreating(false); }
    };
    const deleteBackup = async (id) => {
        if (!confirm("Delete this backup log?")) return;
        await fetch("/api/admin/backup", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
        fetchBackups();
    };

    // Email functions
    const fetchEmailConfig = async () => {
        try { const r = await fetch("/api/admin/site-content"); const d = await r.json(); if (d.success) { const item = (d.items || []).find(i => i.key === "email_config"); if (item) { try { setEmailConfig(JSON.parse(item.value)); } catch { } } } } catch (e) { }
    };
    const saveEmailConfig = async () => {
        setSavingEmail(true);
        try { await fetch("/api/admin/site-content", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ key: "email_config", value: JSON.stringify(emailConfig) }) }); } catch (e) { }
        finally { setSavingEmail(false); }
    };
    const toggleNotif = (key) => setEmailConfig(c => ({ ...c, notifications: { ...c.notifications, [key]: !c.notifications?.[key] } }));

    // Git functions
    const fetchGitStatus = async () => { setGitLoading(true); try { const r = await fetch("/api/admin/git-status"); const d = await r.json(); if (d.success) setGitData(d.git); } catch (e) { } finally { setGitLoading(false); } };

    // Security functions
    const fetchSecurityCheck = async () => { setSecurityLoading(true); try { const r = await fetch("/api/admin/security-check"); const d = await r.json(); if (d.success) setSecurityData(d.security); } catch (e) { } finally { setSecurityLoading(false); } };

    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            <div><h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Settings</h1><p className="text-gray-600 dark:text-white/40 text-sm mt-1">System configuration and maintenance</p></div>

            <div className="flex gap-2 flex-wrap">
                {tabs.map(t => {
                    const Icon = t.icon; return (
                        <button key={t.key} onClick={() => setActiveTab(t.key)} className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${activeTab === t.key ? 'bg-[#2B3AA0] text-white' : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-white/40 hover:text-white'}`}>
                            <Icon size={14} /> {t.label}
                        </button>
                    );
                })}
            </div>

            {/* Backup Tab */}
            {activeTab === "backup" && (
                <div className="bg-white dark:bg-[#0F1629] border border-gray-200 dark:border-white/5 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-gray-900 dark:text-white font-bold text-lg flex items-center gap-2"><Database size={18} className="text-[#2B3AA0]" /> Database Backups</h3>
                        <button onClick={createBackup} disabled={creating} className="flex items-center gap-2 px-5 py-2.5 bg-[#2B3AA0] text-white rounded-xl font-bold text-sm disabled:opacity-50">
                            {creating ? <Loader2 size={14} className="animate-spin" /> : <FileJson size={14} />} {creating ? "Creating..." : "Create & Download Backup"}
                        </button>
                    </div>
                    <p className="text-gray-500 dark:text-white/30 text-xs mb-6">Creates a JSON backup of all database tables and downloads it.</p>
                    {loading ? <div className="text-center py-8"><Loader2 size={24} className="animate-spin text-[#2B3AA0] mx-auto" /></div> : (
                        <div className="space-y-3">
                            {backups.map(b => (
                                <div key={b.id} className="flex items-center justify-between p-4 rounded-xl bg-gray-100 dark:bg-white/5">
                                    <div className="flex items-center gap-3">
                                        <FileJson size={18} className="text-emerald-400" />
                                        <div><div className="text-gray-900 dark:text-white text-sm font-bold">{b.filename}</div><div className="text-gray-500 dark:text-white/30 text-xs">{b.size} • {b.type} • {new Date(b.createdAt).toLocaleString('en-IN')}</div></div>
                                    </div>
                                    <button onClick={() => deleteBackup(b.id)} className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-white/5 hover:bg-rose-500/20 hover:text-rose-400 flex items-center justify-center text-gray-500 dark:text-white/30"><Trash2 size={14} /></button>
                                </div>
                            ))}
                            {backups.length === 0 && <div className="text-center py-8 text-gray-400 dark:text-white/20 text-sm">No backups yet — create your first one!</div>}
                        </div>
                    )}
                </div>
            )}

            {/* Email Tab */}
            {activeTab === "email" && (
                <div className="bg-white dark:bg-[#0F1629] border border-gray-200 dark:border-white/5 rounded-2xl p-6 space-y-5">
                    <h3 className="text-gray-900 dark:text-white font-bold text-lg flex items-center gap-2"><Mail size={18} className="text-[#2B3AA0]" /> Email Configuration</h3>
                    <div className="space-y-4">
                        <div className="space-y-1.5"><label className="text-[9px] font-black uppercase tracking-widest text-gray-400 dark:text-white/25 px-1">Admin Email (for notifications)</label><input value={emailConfig.adminEmail || ""} onChange={e => setEmailConfig(c => ({ ...c, adminEmail: e.target.value }))} placeholder="admin@thinqchess.com" className="w-full h-12 px-4 bg-gray-50 dark:bg-[#0B1120] border border-gray-200 dark:border-white/5 rounded-xl text-gray-900 dark:text-white text-sm outline-none focus:border-[#2B3AA0]/50" /></div>
                        <p className="text-gray-400 dark:text-white/20 text-xs">Set SMTP_EMAIL and SMTP_PASSWORD in .env for Gmail notifications. <a href="https://myaccount.google.com/apppasswords" target="_blank" className="text-[#2B3AA0] underline">Get Gmail App Password →</a></p>
                        <div className="space-y-3">
                            <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 dark:text-white/25 px-1">Send Notifications On</label>
                            {[
                                { key: "registration", label: "New Registration" },
                                { key: "tournament", label: "Tournament Entry" },
                                { key: "demo", label: "Demo Request" },
                                { key: "contact", label: "Contact Message" },
                                { key: "trainer", label: "Train Your Trainer" },
                            ].map(item => (
                                <label key={item.key} className="flex items-center gap-3 p-3 rounded-xl bg-gray-100 dark:bg-white/5 cursor-pointer hover:bg-white/[0.07] transition-all">
                                    <input type="checkbox" checked={emailConfig.notifications?.[item.key] ?? true} onChange={() => toggleNotif(item.key)} className="w-4 h-4 accent-[#2B3AA0]" />
                                    <span className="text-gray-900 dark:text-white text-sm font-medium">{item.label}</span>
                                </label>
                            ))}
                        </div>
                        <button onClick={() => setEmailConfig(c => ({ ...c, dailyBackupEnabled: !c.dailyBackupEnabled }))} className={`flex items-center gap-3 p-4 rounded-xl transition-all w-full ${emailConfig.dailyBackupEnabled ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/5'}`}>
                            <div className={`w-10 h-6 rounded-full flex items-center ${emailConfig.dailyBackupEnabled ? 'bg-emerald-500 justify-end' : 'bg-gray-200 dark:bg-white/10 justify-start'} transition-all`}><div className="w-5 h-5 bg-white rounded-full mx-0.5 shadow" /></div>
                            <span className="text-gray-900 dark:text-white text-sm font-medium">Daily backup email</span>
                        </button>
                    </div>
                    <button onClick={saveEmailConfig} disabled={savingEmail} className="flex items-center gap-2 px-6 py-3 bg-[#2B3AA0] text-white rounded-xl font-bold text-sm disabled:opacity-50">{savingEmail ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} {savingEmail ? "Saving..." : "Save Email Settings"}</button>
                </div>
            )}

            {/* Git Status Tab — REAL DATA */}
            {activeTab === "git" && (
                <div className="bg-white dark:bg-[#0F1629] border border-gray-200 dark:border-white/5 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-gray-900 dark:text-white font-bold text-lg flex items-center gap-2"><GitBranch size={18} className="text-[#2B3AA0]" /> Git Repository Status</h3>
                        <button onClick={fetchGitStatus} disabled={gitLoading} className="px-3 py-1.5 bg-gray-100 dark:bg-white/5 rounded-lg text-gray-600 dark:text-white/40 text-xs font-bold hover:bg-gray-200 dark:hover:bg-white/10"><RefreshCw size={12} className={gitLoading ? "animate-spin" : ""} /></button>
                    </div>
                    {gitLoading ? <div className="text-center py-8"><Loader2 size={24} className="animate-spin text-[#2B3AA0] mx-auto" /></div> : gitData ? (
                        <div className="space-y-4">
                            <StatusRow icon={<GitBranch size={16} className="text-blue-400" />} label="Branch" value={gitData.branch} status="ok" />
                            <StatusRow icon={<Clock size={16} className="text-amber-400" />} label="Last Commit" value={gitData.lastCommitMessage} status="info" />
                            <StatusRow icon={<Clock size={16} className="text-gray-600 dark:text-white/40" />} label="Commit Date" value={gitData.lastCommitDate ? new Date(gitData.lastCommitDate).toLocaleString('en-IN') : 'N/A'} status="info" />
                            <StatusRow icon={gitData.hasChanges ? <AlertTriangle size={16} className="text-amber-400" /> : <CheckCircle2 size={16} className="text-emerald-400" />} label="Uncommitted Changes" value={gitData.hasChanges ? `${gitData.uncommittedChanges} files changed` : "Clean"} status={gitData.hasChanges ? "warning" : "ok"} />
                            <StatusRow icon={<RefreshCw size={16} className="text-emerald-400" />} label="Sync Status" value={gitData.syncStatus} status="ok" />
                        </div>
                    ) : <div className="text-center py-8 text-gray-400 dark:text-white/20 text-sm">Git not available on this server</div>}
                </div>
            )}

            {/* Security Tab — REAL DATA */}
            {activeTab === "security" && (
                <div className="bg-white dark:bg-[#0F1629] border border-gray-200 dark:border-white/5 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-gray-900 dark:text-white font-bold text-lg flex items-center gap-2"><Shield size={18} className="text-[#2B3AA0]" /> Security Scan</h3>
                        <button onClick={fetchSecurityCheck} disabled={securityLoading} className="px-3 py-1.5 bg-gray-100 dark:bg-white/5 rounded-lg text-gray-600 dark:text-white/40 text-xs font-bold hover:bg-gray-200 dark:hover:bg-white/10"><RefreshCw size={12} className={securityLoading ? "animate-spin" : ""} /></button>
                    </div>
                    {securityLoading ? <div className="text-center py-8"><Loader2 size={24} className="animate-spin text-[#2B3AA0] mx-auto" /></div> : securityData ? (
                        <div className="space-y-4">
                            <StatusRow icon={securityData.dependencies.vulnerabilities > 0 ? <AlertCircle size={16} className="text-rose-400" /> : <CheckCircle2 size={16} className="text-emerald-400" />} label="Dependencies" value={securityData.dependencies.details} status={securityData.dependencies.vulnerabilities > 0 ? "error" : "ok"} />
                            <StatusRow icon={securityData.suspiciousFiles.count > 0 ? <XCircle size={16} className="text-rose-400" /> : <CheckCircle2 size={16} className="text-emerald-400" />} label="File Integrity" value={securityData.suspiciousFiles.count > 0 ? `${securityData.suspiciousFiles.count} suspicious files!` : "No suspicious files detected"} status={securityData.suspiciousFiles.count > 0 ? "error" : "ok"} />
                            {securityData.suspiciousFiles.count > 0 && (
                                <div className="ml-8 space-y-1">{securityData.suspiciousFiles.files.map((f, i) => (<div key={i} className="text-rose-400 text-xs font-mono">{f.file} ({f.ext})</div>))}</div>
                            )}
                            <StatusRow icon={securityData.environment.exists ? <CheckCircle2 size={16} className="text-emerald-400" /> : <AlertCircle size={16} className="text-rose-400" />} label="Environment" value={securityData.environment.exists ? (securityData.environment.missingKeys.length > 0 ? `Missing: ${securityData.environment.missingKeys.join(', ')}` : "All configurations secure") : ".env file missing!"} status={securityData.environment.exists && securityData.environment.missingKeys.length === 0 ? "ok" : "error"} />
                            <StatusRow icon={<Clock size={16} className="text-gray-600 dark:text-white/40" />} label="Last Scan" value={new Date(securityData.lastScan).toLocaleString('en-IN')} status="info" />
                        </div>
                    ) : <div className="text-center py-8 text-gray-400 dark:text-white/20 text-sm">Click refresh to run security scan</div>}
                </div>
            )}

            {/* Google Sheets Tab */}
            {activeTab === "google_sheets" && (
                <div className="bg-white dark:bg-[#0F1629] border border-gray-200 dark:border-white/5 rounded-2xl p-6">
                    <h3 className="text-gray-900 dark:text-white font-bold text-lg flex items-center gap-2 mb-6"><BarChart3 size={18} className="text-[#2B3AA0]" /> Google Sheets Sync</h3>
                    <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 mb-6">
                        <p className="text-amber-400 text-sm font-bold mb-2">⚙️ Setup Required</p>
                        <ol className="text-gray-600 dark:text-white/40 text-xs space-y-1 list-decimal ml-4">
                            <li>Go to <a href="https://console.cloud.google.com" target="_blank" className="text-[#2B3AA0] underline">Google Cloud Console</a></li>
                            <li>Create project → Enable <strong>Google Sheets API</strong></li>
                            <li>Create <strong>Service Account</strong> → Download JSON key</li>
                            <li>Share each Google Sheet with the service account email</li>
                            <li>Add JSON key content to <code className="bg-gray-200 dark:bg-white/10 px-1 rounded">GOOGLE_SHEETS_CREDENTIALS</code> env variable</li>
                        </ol>
                    </div>
                    <div className="space-y-4">
                        {["Course Registrations", "Tournament Entries", "Demo Requests", "Contact Messages", "Train Your Trainer"].map(form => (
                            <div key={form} className="flex items-center justify-between p-4 rounded-xl bg-gray-100 dark:bg-white/5">
                                <div className="flex items-center gap-3">
                                    <BarChart3 size={16} className="text-gray-500 dark:text-white/30" />
                                    <div><div className="text-gray-900 dark:text-white text-sm font-bold">{form}</div><div className="text-gray-500 dark:text-white/30 text-xs">Auto-syncs when Google Sheets credentials are configured</div></div>
                                </div>
                                <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-amber-500/20 text-amber-400">{process.env.GOOGLE_SHEETS_CREDENTIALS ? 'Connected' : 'Not Configured'}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

const StatusRow = ({ icon, label, value, status }) => (
    <div className="flex items-center justify-between p-4 rounded-xl bg-gray-100 dark:bg-white/5">
        <div className="flex items-center gap-3">{icon}<span className="text-gray-900 dark:text-white text-sm font-bold">{label}</span></div>
        <span className={`text-xs font-medium max-w-[60%] text-right ${status === 'ok' ? 'text-emerald-400' : status === 'error' ? 'text-rose-400' : status === 'warning' ? 'text-amber-400' : 'text-gray-600 dark:text-white/40'}`}>{value}</span>
    </div>
);
