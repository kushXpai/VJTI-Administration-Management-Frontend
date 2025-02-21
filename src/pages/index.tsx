import { useState } from "react";
import { Eye, EyeOff, Lock, User, Shield } from "lucide-react";
import colors from "../styles/colors";

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
    <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: colors.background }}>
      <div className="w-full max-w-md">
        <div className="rounded-lg shadow-lg overflow-hidden" style={{ backgroundColor: colors.surfaceLight }}>
          {/* Header */}
          <div className="px-6 py-4" style={{ backgroundColor: colors.primary }}>
            <h1 className="text-2xl font-bold text-center" style={{ color: colors.textInverse }}>
              VJTI Administration Portal
            </h1>
          </div>

          <div className="px-6 py-8">
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="userId" className="block text-sm font-medium" style={{ color: colors.textPrimary }}>
                  User ID
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5" style={{ color: colors.textTertiary }} />
                  </div>
                  <input
                    id="userId"
                    type="text"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 rounded-md shadow-sm"
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
                <label htmlFor="password" className="block text-sm font-medium" style={{ color: colors.textPrimary }}>
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5" style={{ color: colors.textTertiary }} />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-10 py-2 rounded-md shadow-sm"
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
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
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
                  <label htmlFor="remember-me" className="ml-2 block text-sm" style={{ color: colors.textSecondary }}>
                    Remember me
                  </label>
                </div>
                <a href="#" className="text-sm font-medium hover:underline" style={{ color: colors.primary }}>
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border-transparent rounded-md shadow-sm text-sm font-medium"
                style={{ 
                  backgroundColor: colors.primary,
                  color: colors.textInverse,
                  borderWidth: 1,
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = colors.primaryDark}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = colors.primary}
              >
                Login
              </button>
            </form>

            <div className="mt-6 text-center">
              <span className="text-sm" style={{ color: colors.textSecondary }}>Don't have an account? </span>
              <a href="#" className="text-sm font-medium hover:underline" style={{ color: colors.secondary }}>
                Register here
              </a>
            </div>
          </div>

          <div className="px-6 py-4 border-t flex justify-end" style={{ 
            backgroundColor: colors.surfaceMedium,
            borderColor: colors.surfaceDark 
          }}>
            <button
              type="button"
              className="inline-flex items-center px-3 py-1 border shadow-sm text-sm leading-4 font-medium rounded-md"
              style={{ 
                backgroundColor: colors.surfaceLight,
                borderColor: colors.surfaceDark,
                color: colors.textSecondary
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
              <Shield className="h-4 w-4 mr-2" style={{ color: colors.secondary }} />
              Admin Access
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
