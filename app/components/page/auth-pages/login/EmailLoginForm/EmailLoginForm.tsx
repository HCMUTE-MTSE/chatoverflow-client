import React, { useState } from "react";
import { login } from "~/services/api/auth/login.service";

export default function EmailLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await login({ email, password });

      if (response.success && response.data?.token) {
        localStorage.setItem("token", response.data.token);
        window.location.href = "/"; // redirect
      } else {
        setError(response.message || "Login failed");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {/* Email */}
      <label htmlFor="email" className="block text-sm text-gray-400 mb-1">
        Email address
      </label>
      <input
        id="email"
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-4 py-2 mb-4 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
      />

      {/* Password */}
      <label htmlFor="password" className="block text-sm text-gray-400 mb-1">
        Password
      </label>
      <input
        id="password"
        type="password"
        placeholder="yourpassword"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-4 py-2 mb-4 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
      />

      <div className="flex items-center justify-end py-2">
        <a
          href="/forget-password"
          className="text-sm text-blue-300 hover:underline underline"
        >
          Forget password ?
        </a>
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 transition font-semibold disabled:opacity-50"
      >
        <p className="text-center text-sm">
          {loading ? "Loading..." : "Continue"}
        </p>
      </button>
    </form>
  );
}
