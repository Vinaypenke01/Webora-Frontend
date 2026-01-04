import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaUserShield, FaLock } from 'react-icons/fa';
import api from '../../src/services/api';

const CreateAdmin = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirm_password: '',
    otp: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  /* ---------------- INPUT HANDLER ---------------- */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(`[INPUT] ${e.target.name}:`, e.target.value);
  };
  // ================= ADMIN AUTH =================



  /* ---------------- STEP 1 ---------------- */
  const handleStep1Submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    console.log('🚀 Create Admin Step 1:', formData);

    try {
      const res = await api.createAdminStep1({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        confirm_password: formData.confirm_password,
      });

      console.log('✅ Step 1 Response:', res);

      if (res.success) {
        setStep(2);
        setSuccess('OTP sent to your email. Please verify.');
      }
    } catch (err) {
      console.error('❌ Step 1 Error:', err);
      setError(err?.error || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- STEP 2 ---------------- */
  const handleStep2Submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    console.log('🔐 Create Admin Step 2:', formData);

    try {
      const res = await api.createAdminStep2({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        otp: formData.otp,
      });

      console.log('✅ Step 2 Response:', res);

      if (res.success) {
        setSuccess('Admin account created successfully!');
        setTimeout(() => navigate('/admin/login'), 2000);
      }
    } catch (err) {
      console.error('❌ Step 2 Error:', err);
      setError(err?.error || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 px-4">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-gray-100">

        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="bg-indigo-600 text-white p-4 rounded-full shadow-lg mb-3">
            <FaUserShield size={28} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">
            Create Admin Account
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Secure administrator registration
          </p>
        </div>

        {/* Alerts */}
        {error && (
          <div className="mb-4 p-3 text-sm rounded-lg bg-red-50 text-red-600 border border-red-200">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-3 text-sm rounded-lg bg-green-50 text-green-600 border border-green-200">
            {success}
          </div>
        )}

        {/* STEP 1 */}
        {step === 1 && (
          <form onSubmit={handleStep1Submit} className="space-y-4">

            <input
              type="text"
              name="username"
              placeholder="Admin Username"
              required
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirm_password"
                placeholder="Confirm Password"
                required
                value={formData.confirm_password}
                onChange={handleChange}
                className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-lg transition disabled:opacity-60"
            >
              {loading ? 'Sending OTP...' : 'Next'}
            </button>
          </form>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <form onSubmit={handleStep2Submit} className="space-y-4">

            <div className="flex items-center gap-2 text-sm text-gray-600 bg-indigo-50 p-3 rounded-lg">
              <FaLock className="text-indigo-600" />
              Enter the OTP sent to your email
            </div>

            <input
              type="text"
              name="otp"
              placeholder="Enter OTP"
              required
              value={formData.otp}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold shadow-lg transition disabled:opacity-60"
            >
              {loading ? 'Verifying...' : 'Verify & Create Admin'}
            </button>
          </form>
        )}

      </div>
    </div>
  );
};

export default CreateAdmin;
