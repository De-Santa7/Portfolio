"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error ?? "Invalid password");
        setPassword("");
      }
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-sm">
      <div className="bg-zinc-900 border border-white/8 rounded-2xl p-8 shadow-card">
        <h1 className="text-xl font-semibold text-white mb-1">Admin Panel</h1>
        <p className="text-sm text-zinc-400 mb-6">Enter your password to continue</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm text-zinc-400 mb-1.5">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoFocus
              className="w-full bg-zinc-800 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-colors"
              placeholder="••••••••••••"
            />
          </div>

          {error && (
            <p className="text-sm text-red-400">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-accent hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-lg px-4 py-2.5 text-sm transition-colors"
          >
            {loading ? "Verifying…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
