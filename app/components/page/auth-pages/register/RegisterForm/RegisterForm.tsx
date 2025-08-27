import { signup } from "~/services/api/auth/signup.service";
import React, { useState } from "react";
import { useNavigate } from "react-router";
export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    nickName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await signup(formData);
      if (response.success) {
        // Handle successful signup
        setSuccess(
          response.message ||
            "Registration successful! Please check your email for the OTP code."
        );
        setTimeout(() => {
          navigate("/verify-register", {
            state: {
              email: response.data.email,
            },
          });
        }, 2000);
      } else {
        setError(response.message || "An error occurred");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {error && <p className="text-red-400 text-sm">{error}</p>}
      {success && <p className="text-green-400 text-sm">{success}</p>}{" "}
      <label htmlFor="username" className="block text-sm text-gray-400 mb-1">
        Username
      </label>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="yourusername"
        className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
      />
      <label htmlFor="nickname" className="block text-sm text-gray-400 mb-1">
        Nickname
      </label>
      <input
        type="text"
        name="nickName"
        value={formData.nickName}
        onChange={handleChange}
        placeholder="nickname"
        className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
      />
      <label htmlFor="email" className="block text-sm text-gray-400 mb-1">
        Email address
      </label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="you@example.com"
        className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
      />
      <label htmlFor="password" className="block text-sm text-gray-400 mb-1">
        Password
      </label>
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="yourpassword"
        className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 mt-4 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 transition font-semibold"
      >
        <p className="text-center text-sm">
          {loading ? "Loading..." : "Continue"}
        </p>
      </button>
    </form>
  );
}
