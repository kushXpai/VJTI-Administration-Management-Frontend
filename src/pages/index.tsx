import { useState } from "react";
import { Eye, EyeOff, Lock, User, Shield } from "lucide-react";
import colors from "../styles/colors";
import Link from "next/link";

export default function LoginPage() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      console.log("Login attempted with:", { userId, password });
    } catch (error) {
      console.error("Login Failed", error);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{ backgroundColor: colors.background }}
    >
      <div className="w-full max-w-xl px-4 relative">
        <div
          className="rounded-xl shadow-2xl overflow-hidden"
          style={{
            backgroundColor: colors.surfaceLight,
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
          }}
        >
          <div
            className="px-8 py-6"
            style={{ backgroundColor: colors.primary }}
          >
            <h1
              className="text-3xl font-bold text-center"
              style={{ color: colors.textInverse }}
            >
              VJTI Administration Portal
            </h1>
          </div>

          <div className="px-8 py-10">
            <form onSubmit={handleLogin} className="space-y-8">
              <div className="space-y-2">
                <label
                  htmlFor="userId"
                  className="block text-sm font-medium"
                  style={{ color: colors.textPrimary }}
                >
                  User ID
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-5 w-5" style={{ color: colors.textTertiary }} />
                  </div>
                  <input
                    id="userId"
                    type="text"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    className="block w-full pl-12 pr-4 py-3 rounded-lg shadow-sm text-base"
                    style={{
                      borderColor: colors.surfaceDark,
                      color: colors.textPrimary,
                      backgroundColor: colors.surfaceLight
                    }}
                    placeholder="Enter your user ID"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium"
                  style={{ color: colors.textPrimary }}
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5" style={{ color: colors.textTertiary }} />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-12 pr-12 py-3 rounded-lg shadow-sm text-base"
                    style={{
                      borderColor: colors.surfaceDark,
                      color: colors.textPrimary,
                      backgroundColor: colors.surfaceLight
                    }}
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-4 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" style={{ color: colors.textTertiary }} />
                    ) : (
                      <Eye className="h-5 w-5" style={{ color: colors.textTertiary }} />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded"
                    style={{
                      borderColor: colors.surfaceDark,
                      accentColor: colors.primary
                    }}
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-3 block text-sm"
                    style={{ color: colors.textSecondary }}
                  >
                    Remember me
                  </label>
                </div>
                <Link
                  href="/Login/ForgotPasswordPage"
                  className="text-sm font-medium hover:underline"
                  style={{ color: colors.primary }}
                >
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 rounded-lg shadow-lg text-base font-medium transition-all duration-200 hover:scale-[1.02]"
                style={{
                  backgroundColor: colors.primary,
                  color: colors.textInverse,
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = colors.primaryDark}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = colors.primary}
              >
                Login
              </button>
            </form>

            <div className="mt-8 text-center">
              <span
                className="text-base"
                style={{ color: colors.textSecondary }}
              >
                Don&apos;t have an account?{" "}
              </span>
              <Link
                href="/Registration/StudentRegistrationPage"
                className="text-base font-medium hover:underline"
                style={{ color: colors.secondary }}
              >
                Register here
              </Link>
            </div>
          </div>

          <div
            className="px-8 py-4 border-t flex justify-end"
            style={{
              backgroundColor: colors.surfaceMedium,
              borderColor: colors.surfaceDark
            }}
          >
            <Link
              href="/Admin-Dashboard/AdminDashboard"
              className="inline-flex items-center px-4 py-2 border shadow-sm text-sm font-medium rounded-lg transition-all duration-200 hover:scale-105"
              style={{
                backgroundColor: colors.surfaceLight,
                borderColor: colors.surfaceDark,
                color: colors.textSecondary,
                textDecoration: 'none'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = colors.primaryLight;
                e.currentTarget.style.color = colors.primary;
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = colors.surfaceLight;
                e.currentTarget.style.color = colors.textSecondary;
              }}
            >
              <Shield className="h-5 w-5 mr-2" style={{ color: colors.secondary }} />
              Admin Access
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}