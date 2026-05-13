"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") ?? "/";

  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "Login failed"); return; }
      const { role } = data.user;
      if (role === "ADMIN")  { router.push("/admin/dashboard"); return; }
      if (role === "ARTIST") { router.push("/seller/dashboard"); return; }
      router.push(redirect);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-sand-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="font-display text-3xl font-semibold text-charcoal-900">HAIPPA</Link>
          <p className="text-charcoal-500 mt-2">Sign in to your account</p>
        </div>
        <div className="bg-white rounded-sm border border-sand-300 shadow-card p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-charcoal-700 mb-1.5">Email address</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                className="w-full px-4 py-2.5 border border-sand-300 rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 bg-white"
                placeholder="you@example.com" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-charcoal-700">Password</label>
                <Link href="/forgot-password" className="text-xs text-primary-500 hover:underline">Forgot password?</Link>
              </div>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
                className="w-full px-4 py-2.5 border border-sand-300 rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 bg-white"
                placeholder="••••••••" />
            </div>
            {error && <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-sm">{error}</p>}
            <button type="submit" disabled={loading}
              className="w-full py-3 bg-primary-500 text-white font-medium rounded-sm hover:bg-primary-600 transition-colors disabled:opacity-50">
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>
          <p className="text-center text-sm text-charcoal-500 mt-6">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-primary-500 hover:underline font-medium">Create one</Link>
          </p>
          <p className="text-center text-sm text-charcoal-500 mt-2">
            Are you an artist?{" "}
            <Link href="/apply" className="text-primary-500 hover:underline font-medium">Apply to sell</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
