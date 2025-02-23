import React, { useState } from 'react';
import { ArrowLeft, Mail, Lock, User, CheckCircle, Loader2 } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [step, setStep] = useState(1); // 1: Username, 2: OTP, 3: New Password
  const [username, setUsername] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleOtpChange = (index: number, value: string | any[]) => {
    if (value.length > 1) return; // Prevent multi-digit input

    const newOtp = [...otp];
    newOtp[index] = value as string;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleSubmitUsername = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setStep(2);
    }, 1500);
  };

  const handleSubmitOtp = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setStep(3);
    }, 1500);
  };

  const handleSubmitNewPassword = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      // Redirect to login or show success
      window.location.href = '/login';
    }, 1500);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-xl px-4">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="px-8 py-6 bg-[#800000]">
            <div className="flex items-center">
              <h1 className="text-3xl font-bold text-white text-center flex-1">
                Reset Password
              </h1>
            </div>
          </div>

          <div className="px-8 py-10">
            {/* Step 1: Username */}
            {step === 1 && (
              <form onSubmit={handleSubmitUsername} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                    Username
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="block w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-[#800000] focus:border-[#800000]"
                      placeholder="Enter your username"
                      required
                    />
                  </div>
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-3 px-4 rounded-lg shadow-lg text-white bg-[#800000] hover:bg-[#660000] transition-colors duration-200"
                >
                  {loading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    'Send OTP'
                  )}
                </button>
              </form>
            )}

            {/* Step 2: OTP Verification */}
            {step === 2 && (
              <form onSubmit={handleSubmitOtp} className="space-y-6">
                <div className="text-center mb-8">
                  <Mail className="h-12 w-12 text-[#800000] mx-auto mb-4" />
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    Check your email
                  </h2>
                  <p className="text-gray-600">
                    We've sent a 6-digit OTP to your registered email
                  </p>
                </div>

                <div className="flex justify-center gap-2">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className="w-12 h-12 text-center text-xl rounded-lg border border-gray-300 shadow-sm focus:ring-[#800000] focus:border-[#800000]"
                    />
                  ))}
                </div>

                {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                <button
                  type="submit"
                  disabled={loading || otp.some(digit => !digit)}
                  className="w-full flex justify-center py-3 px-4 rounded-lg shadow-lg text-white bg-[#800000] hover:bg-[#660000] transition-colors duration-200"
                >
                  {loading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    'Verify OTP'
                  )}
                </button>
              </form>
            )}

            {/* Step 3: New Password */}
            {step === 3 && (
              <form onSubmit={handleSubmitNewPassword} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                    New Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="newPassword"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="block w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-[#800000] focus:border-[#800000]"
                      placeholder="Enter new password"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="block w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-[#800000] focus:border-[#800000]"
                      placeholder="Confirm new password"
                      required
                    />
                  </div>
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-3 px-4 rounded-lg shadow-lg text-white bg-[#800000] hover:bg-[#660000] transition-colors duration-200"
                >
                  {loading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    'Reset Password'
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}