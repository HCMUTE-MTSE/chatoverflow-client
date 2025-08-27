import * as React from 'react';
import { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa6';
import { requestOTP } from '~/services/api/auth/forgetPassword.service';

export default function ForgetPasswordForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await requestOTP({ email }); // Gọi API gửi OTP
      if (res.success) {
        setSuccess(res.message || 'OTP đã được gửi, vui lòng kiểm tra email');
      } else {
        setError(res.message || 'Gửi OTP thất bại');
      }
    } catch (err: any) {
      console.error('Axios error full:', err);           // In ra toàn bộ error object
      console.error('Response data:', err.response);    // In ra response từ server (nếu có)
      setError(
          err.response?.data ? JSON.stringify(err.response.data) : err.message || 'Lỗi hệ thống'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
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
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}
      {success && <p className="text-green-400 text-sm">{success}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 transition font-semibold disabled:opacity-50"
      >
        <p className="text-center text-sm">{loading ? 'Sending...' : 'Continue'}</p>
      </button>

      <div className="flex items-center justify-center gap-2 text-gray-200">
        <FaArrowLeft className="w-5 h-5 hover:opacity-80" />
        <a href="/login" className="text-sm hover:opacity-80">
          Back to login
        </a>
      </div>
    </form>
  );
}
