"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Shield, Mail, Lock, Loader2, AlertCircle, Eye, EyeOff } from "lucide-react";

export default function AdminLoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                setError("Invalid email or password. Please try again.");
            } else {
                router.push("/admin/dashboard");
            }
        } catch (err) {
            setError("An unexpected error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#0B1120] flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#2B3AA0]/20 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#2B3AA0]/10 rounded-full blur-[120px]"></div>

            <div className="w-full max-w-md relative z-10">
                {/* Logo */}
                <div className="text-center mb-10">
                    <div className="w-16 h-16 bg-[#2B3AA0] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#2B3AA0]/20">
                        <Shield size={32} className="text-[#0B1120]" />
                    </div>
                    <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight mb-2">ThinQ Admin</h1>
                    <p className="text-gray-600 dark:text-white/40 text-sm font-medium">Sign in to access the control panel</p>
                </div>

                {/* Form Card */}
                <div className="bg-white dark:bg-[#0F1629] rounded-3xl border border-gray-200 dark:border-white/5 p-8 shadow-sm">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 dark:text-white/40 px-1">Email Address</label>
                            <div className="relative">
                                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-white/20" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="admin@thinqchess.com"
                                    required
                                    className="w-full h-14 pl-12 pr-4 bg-gray-50 dark:bg-[#0B1120] border border-gray-200 dark:border-white/5 rounded-2xl text-gray-900 dark:text-white text-sm font-medium placeholder:text-white/20 outline-none focus:border-[#2B3AA0]/50 transition-colors"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 dark:text-white/40 px-1">Password</label>
                            <div className="relative">
                                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-white/20" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••••"
                                    required
                                    className="w-full h-14 pl-12 pr-12 bg-gray-50 dark:bg-[#0B1120] border border-gray-200 dark:border-white/5 rounded-2xl text-gray-900 dark:text-white text-sm font-medium placeholder:text-white/20 outline-none focus:border-[#2B3AA0]/50 transition-colors"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-white/20 hover:text-white/50 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* Error */}
                        {error && (
                            <div className="flex items-center gap-3 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20">
                                <AlertCircle size={18} className="text-rose-400 shrink-0" />
                                <p className="text-rose-400 text-sm font-medium">{error}</p>
                            </div>
                        )}

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full h-14 bg-[#2B3AA0] hover:bg-[#e5a015] text-[#0B1120] font-black text-sm uppercase tracking-[0.2em] rounded-2xl transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-3 shadow-lg shadow-[#2B3AA0]/20 hover:shadow-[#2B3AA0]/30"
                        >
                            {loading ? <><Loader2 size={18} className="animate-spin" /> Signing In...</> : 'Sign In'}
                        </button>
                    </form>
                </div>

                {/* Footer */}
                <p className="text-center text-gray-400 dark:text-white/20 text-xs font-medium mt-8">
                    © 2025 ThinQ Chess Academy • Admin Panel
                </p>
            </div>
        </div>
    );
}
