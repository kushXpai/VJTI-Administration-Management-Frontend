import { useState } from "react";
import { useRouter } from "next/router";
import { Eye, EyeOff, Lock, User, Shield, Mail, AlertCircle } from "lucide-react";
import colors from "../styles/colors";
import Link from "next/link";
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client - using environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function LoginPage() {
  const [loginIdentifier, setLoginIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [needsEmailConfirmation, setNeedsEmailConfirmation] = useState(false);
  const [resendingEmail, setResendingEmail] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);

  const router = useRouter();

  const handleResendConfirmation = async () => {
    if (!loginIdentifier.includes('@')) {
      setError("Please enter a valid email address");
      return;
    }

    setResendingEmail(true);
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: loginIdentifier,
      });

      if (error) {
        throw new Error(error.message || "Failed to resend confirmation email");
      }

      setResendSuccess(true);
      setTimeout(() => setResendSuccess(false), 5000); // Reset message after 5 seconds
    } catch (error: any) {
      setError(error.message);
    } finally {
      setResendingEmail(false);
    }
  };

  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log("Login form submitted");
    setError(""); // Clear previous errors
    setNeedsEmailConfirmation(false); // Reset email confirmation state
    setIsLoading(true);

    try {
      // Check if the identifier is an email (contains @) or a CET ID
      const isEmail = loginIdentifier.includes('@');
      console.log("Login type:", isEmail ? "Email" : "CET ID");

      if (isEmail) {
        // If it's an email, try Supabase authentication
        console.log("Attempting Supabase login with:", { email: loginIdentifier });
        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
          email: loginIdentifier,
          password: password,
        });

        console.log("Supabase auth response:", { data: authData, error: authError });

        if (authError) {
          // Handle specific Supabase errors
          console.log("Supabase auth error:", authError.message);
          
          if (authError.message.includes("Email not confirmed")) {
            setNeedsEmailConfirmation(true);
            throw new Error("Email not confirmed. Please check your inbox for the verification email or request a new one.");
          } else {
            throw new Error(authError.message || "Invalid credentials. Please try again.");
          }
        }

        // Supabase login successful
        console.log("🎉 Supabase login successful!");

        // Store user data
        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem("userId", authData.user?.id || "");
        storage.setItem("userRole", "student");
        console.log("User data stored in storage");

        // Redirect to student dashboard
        console.log("Attempting redirect to /Student/StudentDashboard");
        try {
          await router.push("/Student/StudentDashboard");
          console.log("Redirect successful");
        } catch (routerError) {
          console.error("Navigation error:", routerError);
          // Fall back to hard redirect if router.push fails
          console.log("Falling back to direct URL redirect");
          window.location.href = "/Student/StudentDashboard";
        }
      } else {
        // Legacy API login code with similar logging...
        // Add your CET ID login logic here if needed
        throw new Error("CET ID login not implemented yet");
      }
    } catch (error: any) {
      console.error("❌ Login Failed", error);
      setError(error.message || "Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{ backgroundColor: colors.background }}
    >
      <div className="w-full max-w-xl px-4 relative">
        {/* Check for OTP expired error in URL */}
        {typeof window !== 'undefined' && window.location.hash.includes('otp_expired') && (
          <div className="mb-4 p-4 rounded-lg flex items-start" style={{ backgroundColor: colors.surfaceMedium }}>
            <AlertCircle className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" style={{ color: colors.secondary }} />
            <div>
              <h3 className="font-medium mb-1" style={{ color: colors.textPrimary }}>Verification link expired</h3>
              <p className="text-sm mb-2" style={{ color: colors.textSecondary }}>
                The email verification link you clicked has expired. Please enter your email below and click "Login",
                then use the "Resend verification email" option to get a new link.
              </p>
            </div>
          </div>
        )}

        <div
          className="rounded-xl shadow-2xl overflow-hidden"
          style={{
            backgroundColor: colors.surfaceLight,
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
          }}
        >
          <div className="px-8 py-6" style={{ backgroundColor: colors.primary }}>
            <h1 className="text-3xl font-bold text-center" style={{ color: colors.textInverse }}>
              VJTI Administration Portal
            </h1>
          </div>

          <div className="px-8 py-10">
            <form onSubmit={handleLogin} className="space-y-8">
              <div className="space-y-2">
                <label htmlFor="loginIdentifier" className="block text-sm font-medium" style={{ color: colors.textPrimary }}>
                  Email or CET Application ID
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-5 w-5" style={{ color: colors.textTertiary }} />
                  </div>
                  <input
                    id="loginIdentifier"
                    type="text"
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                    className="block w-full pl-12 pr-4 py-3 rounded-lg shadow-sm text-base"
                    style={{
                      borderColor: colors.surfaceDark,
                      color: colors.textPrimary,
                      backgroundColor: colors.surfaceLight
                    }}
                    placeholder="Enter your email or CET Application ID"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium" style={{ color: colors.textPrimary }}>
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
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-4 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" style={{ color: colors.textTertiary }} />
                    ) : (
                      <Eye className="h-5 w-5" style={{ color: colors.textTertiary }} />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <div className="text-red-500 text-sm p-3 rounded-lg" style={{ backgroundColor: "rgba(254, 202, 202, 0.2)" }}>
                  {error}

                  {needsEmailConfirmation && (
                    <div className="mt-2">
                      <button
                        type="button"
                        className="inline-flex items-center text-sm font-medium hover:underline"
                        style={{ color: colors.primary }}
                        onClick={handleResendConfirmation}
                        disabled={resendingEmail || resendSuccess}
                      >
                        <Mail className="h-4 w-4 mr-1" />
                        {resendingEmail ? 'Sending...' : resendSuccess ? 'Email sent!' : 'Resend verification email'}
                      </button>
                    </div>
                  )}
                </div>
              )}

              {resendSuccess && !error && (
                <div className="text-green-600 text-sm p-3 rounded-lg" style={{ backgroundColor: "rgba(187, 247, 208, 0.2)" }}>
                  Verification email sent! Please check your inbox.
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    style={{
                      borderColor: colors.surfaceDark,
                      accentColor: colors.primary
                    }}
                    disabled={isLoading}
                  />
                  <label htmlFor="remember-me" className="ml-3 block text-sm" style={{ color: colors.textSecondary }}>
                    Remember me
                  </label>
                </div>
                <Link href="/Login/ForgotPasswordPage" className="text-sm font-medium hover:underline" style={{ color: colors.primary }}>
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 rounded-lg shadow-lg text-base font-medium transition-all duration-200 hover:scale-[1.02]"
                style={{
                  backgroundColor: colors.primary,
                  color: colors.textInverse,
                  opacity: isLoading ? 0.7 : 1,
                  cursor: isLoading ? 'not-allowed' : 'pointer'
                }}
                onMouseOver={(e) => {
                  if (!isLoading) e.currentTarget.style.backgroundColor = colors.primaryDark;
                }}
                onMouseOut={(e) => {
                  if (!isLoading) e.currentTarget.style.backgroundColor = colors.primary;
                }}
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </button>
            </form>

            <div className="mt-8 text-center">
              <span className="text-base" style={{ color: colors.textSecondary }}>
                Don&apos;t have an account?{" "}
              </span>
              <Link href="/Registration/StudentRegistrationPage" className="text-base font-medium hover:underline" style={{ color: colors.secondary }}>
                Register here
              </Link>
            </div>
          </div>

          <div className="px-8 py-4 border-t flex justify-end" style={{ backgroundColor: colors.surfaceMedium, borderColor: colors.surfaceDark }}>
            <Link
              href="/Admin/AdminDashboard"
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