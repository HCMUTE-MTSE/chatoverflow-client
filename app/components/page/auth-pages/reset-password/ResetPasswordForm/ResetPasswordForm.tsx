import * as React from 'react';
import { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa6';
import { useLocation, useNavigate } from 'react-router-dom';
import { resetPasswordWithOTP } from '~/services/api/auth/forgetPassword.service';

export default function ResetPasswordForm() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || '';

  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return setError('Email not valid');

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await resetPasswordWithOTP({ email, otp, newPassword });
      if (res.success) {
        setSuccess(res.message || 'Reset password successfully');
        setTimeout(() => navigate('/login'), 1500);
      } else {
        setError(res.message || 'Reset password failed');
      }
    } catch (err: any) {
      console.error('Axios error full:', err);
      console.error('Response data:', err.response);
      setError(
        err.response?.data ? JSON.stringify(err.response.data) : err.message || 'System error'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="otp" className="block text-sm text-gray-400 mb-1">
          OTP Code
        </label>
        <input
          id="otp"
          type="number"
          placeholder="your otp code"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full px-4 py-2 mb-4 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      <div>
        <label htmlFor="new-password" className="block text-sm text-gray-400 mb-1">
          New password
        </label>
        <input
          id="new-password"
          type="password"
          placeholder="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
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
        <p className="text-center text-sm">{loading ? 'Submitting...' : 'Continue'}</p>
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
