"use client";
import React, { useState, useEffect } from "react";
import { Image as ImageIcon, Video, Upload, Loader2, Save, Trash2, CheckCircle2 } from "lucide-react";

const imageGroups = [
    {
        title: "Homepage - Hero",
        slots: [
            { key: "vid_home_intro", label: "Hero Video", description: "Background video for homepage hero", recommended: "1920x1080px (MP4)", accepts: "video/*,image/*", isVideo: true, fallback: "/assets/home/copy_9921C4CB-1E56-4593-8898-3B2A91782E5C.mov" },
            { key: "img_home_hero_bg", label: "Hero Fallback Image", description: "Image shown if video fails to load", recommended: "1920x1080px", accepts: "image/*", fallback: "/assets/home/Internal Tournament.jpeg" },
        ]
    },
    {
        title: "Global - Navbar",
        slots: [
            { key: "img_nav_foundation", label: "Foundation Program", description: "Navbar dropdown image", recommended: "400x300px", accepts: "image/*", fallback: "/assets/home/Course completion photo 1.jpeg" },
            { key: "img_nav_intermediate", label: "Intermediate Program", description: "Navbar dropdown image", recommended: "400x300px", accepts: "image/*", fallback: "/assets/home/Internal Tournament.jpeg" },
            { key: "img_nav_advanced", label: "Advanced Program", description: "Navbar dropdown image", recommended: "400x300px", accepts: "image/*", fallback: "/assets/home/Academy photo.jpeg" },
            { key: "img_nav_professional", label: "Professional Program", description: "Navbar dropdown image", recommended: "400x300px", accepts: "image/*", fallback: "/assets/home/Practice time.jpeg" },
            { key: "img_nav_offline", label: "Offline Programs", description: "Navbar dropdown image", recommended: "400x300px", accepts: "image/*", fallback: "/assets/home/Academy photo.jpeg" },
        ]
    },
    {
        title: "Homepage - Category Buttons",
        slots: [
            { key: "img_btn_play_fun", label: "Play For Fun", description: "Background image for Play For Fun button", recommended: "600x400px", accepts: "image/*", fallback: "/assets/home/Course completion photo 1.jpeg" },
            { key: "img_btn_tournaments", label: "Internal Tournaments", description: "Background image for Internal Tournaments button", recommended: "600x400px", accepts: "image/*", fallback: "/assets/home/Internal Tournament.jpeg" },
            { key: "img_btn_trainer", label: "Train The Trainer", description: "Background image for Train The Trainer button", recommended: "600x400px", accepts: "image/*", fallback: "/assets/home/Academy photo.jpeg" },
            { key: "img_btn_elite", label: "ThinQ Elite", description: "Background image for ThinQ Elite button", recommended: "600x400px", accepts: "image/*", fallback: "/assets/home/Practice time.jpeg" },
        ]
    },
    {
        title: "Homepage - Philosophy Section",
        slots: [
            { key: "img_home_philosophy", label: "Philosophy Image", description: "Main image showing students practicing", recommended: "800x1000px", accepts: "image/*", fallback: "/assets/home/Practice time.jpeg" },
        ]
    },
    {
        title: "Inner Pages Backgrounds",
        slots: [
            { key: "img_programs_bg", label: "Programs Background", description: "Programs page hero background", recommended: "1920x800px", accepts: "image/*", fallback: "/assets/home/Practice time.jpeg" },
            { key: "img_services_bg", label: "Services Background", description: "Services page hero background", recommended: "1920x800px", accepts: "image/*", fallback: "/assets/home/Practice time.jpeg" },
            { key: "img_free_trial_bg", label: "Free Trial Background", description: "Free Trial page background", recommended: "1920x1080px", accepts: "image/*", fallback: "/assets/home/Practice time.jpeg" },
            { key: "img_registration_bg", label: "Registration Header", description: "Registration page top image", recommended: "1920x600px", accepts: "image/*", fallback: "/assets/home/Thinq Chess Tournament.jpeg" },
            { key: "img_train_trainer_bg", label: "Train Your Trainer Background", description: "Background image for Train Your Trainer", recommended: "1920x1080px", accepts: "image/*", fallback: "/images/contact-bg.jpg" },
        ]
    }
];

export default function SiteImagesPage() {
    const [images, setImages] = useState({});
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState({});
    const [saving, setSaving] = useState({});
    const [savedStatus, setSavedStatus] = useState({});

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        try {
            const r = await fetch("/api/admin/site-content");
            const d = await r.json();
            if (d.success) {
                const mapped = {};
                (d.items || []).forEach(item => {
                    if (item.key.startsWith("site_media_")) {
                        mapped[item.key.replace("site_media_", "")] = item.value;
                    }
                });
                setImages(mapped);
            }
        } catch (e) {
            console.error("Failed to load site content", e);
        } finally {
            setLoading(false);
        }
    };

    const handleUpload = async (key, file) => {
        if (!file) return;

        // Validation based on file type
        const isVideoUpload = file.type.startsWith('video/');
        if (!file.type.startsWith('image/') && !isVideoUpload) {
            return alert('Please select an image or video file.');
        }

        if (file.size > 20 * 1024 * 1024) {
            return alert('File too large (max 20MB)');
        }

        setUploading(u => ({ ...u, [key]: true }));

        try {
            const formData = new FormData();
            formData.append('image', file); // API expects 'image', we'll pass 'file'
            formData.append('file', file);
            formData.append('type', 'site-image');

            const r = await fetch('/api/upload', { method: 'POST', body: formData });
            const d = await r.json();

            if (d.success) {
                setImages(prev => ({ ...prev, [key]: d.url }));
                // Automatically save it to Database right after upload
                await saveUrlToDB(key, d.url);
            } else {
                alert("Upload failed: " + d.error);
            }
        } catch (e) {
            console.error(e);
            alert("Error uploading file.");
        } finally {
            setUploading(u => ({ ...u, [key]: false }));
        }
    };

    const handleUrlChange = (key, url) => {
        setImages(prev => ({ ...prev, [key]: url }));
        setSavedStatus(s => ({ ...s, [key]: false }));
    };

    const saveUrlToDB = async (key, urlToSave) => {
        setSaving(s => ({ ...s, [key]: true }));
        try {
            const response = await fetch("/api/admin/site-content", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ key: `site_media_${key}`, value: typeof urlToSave === 'string' ? urlToSave : (images[key] || "") })
            });
            const data = await response.json();
            if (data.success) {
                setSavedStatus(s => ({ ...s, [key]: true }));
                setTimeout(() => setSavedStatus(s => ({ ...s, [key]: false })), 3000);
            }
        } catch (e) {
            console.error(e);
            alert("Failed to save media URL");
        } finally {
            setSaving(s => ({ ...s, [key]: false }));
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-32">
                <Loader2 size={40} className="animate-spin text-[#2B3AA0]" />
            </div>
        );
    }

    return (
        <div className="space-y-10 max-w-5xl mx-auto pb-20">
            <div>
                <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Dynamic Site Media</h1>
                <p className="text-gray-600 dark:text-white/40 text-sm mt-1">
                    Upload or paste URLs for images and videos used across the website. Changes are reflected instantly on the frontend without needing a rebuild.
                </p>
            </div>

            {imageGroups.map((group, groupIdx) => (
                <div key={groupIdx} className="space-y-5">
                    <h2 className="text-xl font-black text-gray-900 dark:text-white tracking-tight border-b border-gray-200 dark:border-white/10 pb-2">
                        {group.title}
                    </h2>

                    <div className="space-y-4">
                        {group.slots.map(slot => (
                            <div key={slot.key} className="bg-white dark:bg-[#0F1629] border border-gray-200 dark:border-white/5 rounded-2xl p-6 shadow-sm">
                                <div className="flex flex-col md:flex-row gap-6">
                                    {/* Media Preview Area */}
                                    <div className="w-full md:w-56 h-40 rounded-xl overflow-hidden bg-gray-100 dark:bg-white/5 border border-gray-300 dark:border-white/10 shrink-0 flex items-center justify-center relative group">
                                        {(images[slot.key] || slot.fallback) ? (
                                            ((images[slot.key] || slot.fallback).match(/\.(mp4|webm|mov)$/i) || slot.isVideo) ? (
                                                <video
                                                    src={images[slot.key] || slot.fallback}
                                                    className={`w-full h-full object-cover ${!images[slot.key] ? 'opacity-50 grayscale' : ''}`}
                                                    muted loop playsInline autoPlay
                                                    onError={(e) => { e.target.style.display = 'none'; }}
                                                />
                                            ) : (
                                                <img
                                                    src={images[slot.key] || slot.fallback}
                                                    alt={slot.label}
                                                    className={`w-full h-full object-cover ${!images[slot.key] ? 'opacity-50 grayscale' : ''}`}
                                                    onError={(e) => { e.target.style.display = 'none'; }}
                                                />
                                            )
                                        ) : (
                                            <div className="text-center text-gray-400 dark:text-white/15">
                                                {slot.isVideo ? <Video size={28} className="mx-auto mb-1 opacity-50" /> : <ImageIcon size={28} className="mx-auto mb-1 opacity-50" />}
                                                <span className="text-[10px] font-bold uppercase tracking-wider">No Media Set</span>
                                            </div>
                                        )}

                                        {!images[slot.key] && slot.fallback && (
                                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 text-white backdrop-blur-[2px]">
                                                {slot.isVideo ? <Video size={24} className="mb-2 opacity-80" /> : <ImageIcon size={24} className="mb-2 opacity-80" />}
                                                <span className="text-[11px] font-black uppercase tracking-widest text-[#FFB31A]">Default Set</span>
                                                <span className="text-[9px] font-bold tracking-wider opacity-60 mt-1">Ready for custom upload</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Info & Controls */}
                                    <div className="flex-1 flex flex-col justify-center space-y-4">
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h3 className="text-gray-900 dark:text-white font-bold text-lg">{slot.label}</h3>
                                                {slot.isVideo && <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#2B3AA0]/10 text-[#2B3AA0] dark:text-[#2B3AA0]">VIDEO SUPPORTED</span>}
                                            </div>
                                            <p className="text-gray-600 dark:text-white/40 text-sm mt-0.5">{slot.description}</p>
                                            <p className="text-emerald-500 text-[11px] font-bold mt-1.5 uppercase tracking-wide">
                                                Recommended: {slot.recommended}
                                            </p>
                                        </div>

                                        <div className="flex flex-col sm:flex-row gap-3">
                                            {/* URL Input & Save */}
                                            <div className="flex flex-1 gap-2">
                                                <input
                                                    value={images[slot.key] || ""}
                                                    onChange={e => handleUrlChange(slot.key, e.target.value)}
                                                    placeholder="Paste direct URL (https://...)"
                                                    className="flex-1 h-11 px-4 bg-gray-50 dark:bg-[#0B1120] border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white text-sm outline-none focus:border-[#2B3AA0]/50 focus:ring-1 focus:ring-[#2B3AA0]/50 transition-all font-mono"
                                                />
                                                <button
                                                    onClick={() => saveUrlToDB(slot.key)}
                                                    disabled={saving[slot.key]}
                                                    className={`h-11 px-5 rounded-xl flex items-center gap-2 text-sm font-bold transition-all ${savedStatus[slot.key] ? 'bg-emerald-500 text-white shadow-emerald-500/20 shadow-lg' : 'bg-gray-900 text-white hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100'}`}
                                                >
                                                    {saving[slot.key] ? <Loader2 size={16} className="animate-spin" /> : (savedStatus[slot.key] ? <CheckCircle2 size={16} /> : <Save size={16} />)}
                                                    {savedStatus[slot.key] ? 'Saved' : 'Save'}
                                                </button>
                                            </div>

                                            {/* Upload File */}
                                            <div className="shrink-0 flex items-center">
                                                <span className="text-gray-400 dark:text-white/30 text-xs font-medium mr-3">OR</span>
                                                <label className={`h-11 flex items-center gap-2 px-5 bg-white dark:bg-[#0B1120] border-2 border-dashed ${uploading[slot.key] ? 'border-[#2B3AA0]/50 text-[#2B3AA0]' : 'border-gray-300 dark:border-white/10 text-gray-600 dark:text-white/50 hover:border-[#2B3AA0]/50 hover:text-[#2B3AA0]'} rounded-xl cursor-pointer transition-all`}>
                                                    {uploading[slot.key] ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
                                                    <span className="text-sm font-bold">{uploading[slot.key] ? 'Uploading...' : 'Upload File'}</span>
                                                    <input
                                                        type="file"
                                                        accept={slot.accepts}
                                                        onChange={e => handleUpload(slot.key, e.target.files[0])}
                                                        className="hidden"
                                                        disabled={uploading[slot.key]}
                                                    />
                                                </label>
                                            </div>
                                        </div>

                                        {images[slot.key] && images[slot.key].startsWith('/upload') && (
                                            <div className="text-gray-400 dark:text-white/30 text-[10px] font-mono mt-1">
                                                File: {images[slot.key].split('/').pop()}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
