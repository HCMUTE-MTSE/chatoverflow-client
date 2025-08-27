import * as React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyOTP } from "~/services/api/auth/signup.service";

function VerifyRegisterForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [formData, setFormData] = React.useState({
    email,
    otp: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) {
      return setError("Email is required");
    }
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const response = await verifyOTP(formData);
      if (response.success) {
        setSuccess("OTP verified successfully!");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setError("Invalid OTP. Please try again.");
      }
    } catch (error) {
      setError("Failed to verify OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {error && <p className="text-red-400 text-sm">{error}</p>}
      {success && <p className="text-green-400 text-sm">{success}</p>}{" "}
      <div>
        <label htmlFor="otp" className="block text-sm text-gray-400 mb-1">
          OTP Code
        </label>
        <input
          id="otp"
          type="number"
          name="otp"
          placeholder="your otp code"
          value={formData.otp}
          onChange={handleChange}
          className="w-full px-4 py-2 mb-4 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 transition font-semibold"
      >
        <p className="text-center text-sm">
          {loading ? "Loading..." : "Continue"}
        </p>
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

export default VerifyRegisterForm;
