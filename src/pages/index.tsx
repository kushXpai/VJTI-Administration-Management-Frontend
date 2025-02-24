import { useState, useEffect } from "react";
import { Eye, EyeOff, Lock, User, Shield, Sun, Moon, Link } from "lucide-react";
import colors from "../styles/colors";

// Dark mode color variants
const darkModeColors = {
  ...colors,
  background: "#000000", // Pure black background
  surfaceLight: "#18181B", // Dark surface for cards
  surfaceMedium: "#27272A", // Slightly lighter for sections
  surfaceDark: "#3F3F46", // Border colors
  textPrimary: "#FFFFFF", // Pure white text
  textSecondary: "#D4D4D8", // Light gray text
  textTertiary: "#A1A1AA", // Darker gray text
  primaryLight: "#450000", // Darker red for hover states
};

export default function LoginPage() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Get current theme colors
  const currentColors = isDarkMode ? darkModeColors : colors;

  useEffect(() => {
    // Check system preference on mount
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDarkMode(prefersDark);
  }, []);

  const handleLogin = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      console.log("Login attempted with:", { userId, password });
    } catch (error) {
      console.error("Login Failed", error);
    }
  };

  const ThemeToggle = () => (
    <button
      type="button"
      onClick={() => setIsDarkMode(!isDarkMode)}
      className="absolute top-5 right-10 p-2.5 rounded-full transition-all duration-200 hover:scale-110"
      style={{
        backgroundColor: isDarkMode ? currentColors.surfaceMedium : currentColors.surfaceLight,
        border: `1px solid ${currentColors.surfaceDark}`,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
      }}
    >
      {isDarkMode ? (
        <Sun className="h-6 w-6" style={{ color: colors.warning }} />
      ) : (
        <Moon className="h-6 w-6" style={{ color: colors.secondary }} />
      )}
    </button>
  );

  return (
    <div
      className="flex items-center justify-center min-h-screen transition-colors duration-200"
      style={{ backgroundColor: currentColors.background }}
    >
      <div className="w-full max-w-xl px-4 relative"> {/* Increased max-width */}
        <ThemeToggle />
        <div
          className="rounded-xl shadow-2xl overflow-hidden transition-colors duration-200"
          style={{
            backgroundColor: currentColors.surfaceLight,
            boxShadow: isDarkMode
              ? '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
              : '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
          }}
        >

          <div
            className="px-8 py-6"
            style={{ backgroundColor: currentColors.primary }}
          >
            <h1
              className="text-3xl font-bold text-center"
              style={{ color: currentColors.textInverse }}
            >
              VJTI Administration Portal
            </h1>
          </div>

          <div className="px-8 py-10">
            <form onSubmit={handleLogin} className="space-y-8">
              <div className="space-y-2">
                <label
                  htmlFor="userId"
                  className="block text-sm font-medium transition-colors duration-200"
                  style={{ color: currentColors.textPrimary }}
                >
                  User ID
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-5 w-5" style={{ color: currentColors.textTertiary }} />
                  </div>
                  <input
                    id="userId"
                    type="text"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    className="block w-full pl-12 pr-4 py-3 rounded-lg shadow-sm text-base transition-colors duration-200"
                    style={{
                      borderColor: currentColors.surfaceDark,
                      color: currentColors.textPrimary,
                      backgroundColor: isDarkMode ? currentColors.surfaceMedium : currentColors.surfaceLight
                    }}
                    placeholder="Enter your user ID"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium transition-colors duration-200"
                  style={{ color: currentColors.textPrimary }}
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5" style={{ color: currentColors.textTertiary }} />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-12 pr-12 py-3 rounded-lg shadow-sm text-base transition-colors duration-200"
                    style={{
                      borderColor: currentColors.surfaceDark,
                      color: currentColors.textPrimary,
                      backgroundColor: isDarkMode ? currentColors.surfaceMedium : currentColors.surfaceLight
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
                      <EyeOff className="h-5 w-5" style={{ color: currentColors.textTertiary }} />
                    ) : (
                      <Eye className="h-5 w-5" style={{ color: currentColors.textTertiary }} />
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
                    className="h-4 w-4 rounded transition-colors duration-200"
                    style={{
                      borderColor: currentColors.surfaceDark,
                      accentColor: currentColors.primary
                    }}
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-3 block text-sm transition-colors duration-200"
                    style={{ color: currentColors.textSecondary }}
                  >
                    Remember me
                  </label>
                </div>
                <a
                  href="/Login/ForgotPasswordPage"
                  className="text-sm font-medium hover:underline transition-colors duration-200"
                  style={{ color: currentColors.primary }}
                >
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 rounded-lg shadow-lg text-base font-medium transition-all duration-200 hover:scale-[1.02]"
                style={{
                  backgroundColor: currentColors.primary,
                  color: currentColors.textInverse,
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = currentColors.primaryDark}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = currentColors.primary}
              >
                Login
              </button>
            </form>

            <div className="mt-8 text-center">
              <span
                className="text-base transition-colors duration-200"
                style={{ color: currentColors.textSecondary }}
              >
                Don't have an account?{" "}
              </span>
              <a
                href="/Registration/StudentRegistrationPage"
                className="text-base font-medium hover:underline transition-colors duration-200"
                style={{ color: currentColors.secondary }}
              >
                Register here
              </a>
            </div>
          </div>

          <div
            className="px-8 py-4 border-t flex justify-end transition-colors duration-200"
            style={{
              backgroundColor: currentColors.surfaceMedium,
              borderColor: currentColors.surfaceDark
            }}
          >
            <a
              href="/Admin-Dashboard/AdminDashboard"
              className="inline-flex items-center px-4 py-2 border shadow-sm text-sm font-medium rounded-lg transition-all duration-200 hover:scale-105"
              style={{
                backgroundColor: isDarkMode ? currentColors.surfaceLight : currentColors.surfaceLight,
                borderColor: currentColors.surfaceDark,
                color: currentColors.textSecondary,
                textDecoration: 'none'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = currentColors.primaryLight;
                e.currentTarget.style.color = currentColors.primary;
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = currentColors.surfaceLight;
                e.currentTarget.style.color = currentColors.textSecondary;
              }}
            >
              <Shield className="h-5 w-5 mr-2" style={{ color: currentColors.secondary }} />
              Admin Access
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}