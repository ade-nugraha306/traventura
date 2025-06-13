import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { login, googleLogin } from "../data/api";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await login(formData);
      console.log("Regular login response:", response);

      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));

      navigate("/");
    } catch (err) {
      setError(err.message || "Login gagal. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setError("");
    setLoading(true);

    try {
      // Decode token untuk mendapatkan informasi user
      const decoded = jwtDecode(credentialResponse.credential);
      console.log("Google user info from token:", {
        name: decoded.name,
        email: decoded.email,
        picture: decoded.picture,
        sub: decoded.sub,
      });

      // Kirim token ke backend
      const response = await googleLogin(credentialResponse.credential);
      console.log("Google login response:", response);

      // Simpan token dan user ke localStorage
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));

      // Verifikasi bahwa photoURL tersimpan
      const savedUser = JSON.parse(localStorage.getItem("user"));
      console.log("Saved user data:", savedUser);

      navigate("/");
    } catch (err) {
      console.error("Google login error:", err);
      setError(err.message || "Login dengan Google gagal.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleError = () => {
    console.error("Google login failed");
    setError("Login dengan Google gagal.");
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-white px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-4 sm:p-6 md:p-8 rounded-lg w-full max-w-sm sm:max-w-md md:max-w-lg shadow-sm">
          {/* Logo/Title - Responsive text size */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 sm:mb-8">
            traventura
          </h1>

          {/* Error message */}
          {error && (
            <div className="mb-4 p-2 sm:p-3 bg-red-100 text-red-700 rounded text-sm sm:text-base">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Email input */}
            <div className="mb-4 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  ></path>
                </svg>
              </div>
              <input
                type="email"
                name="email"
                placeholder="enter your email"
                className="w-full pl-8 sm:pl-10 pr-3 py-2 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 text-sm sm:text-base"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password input */}
            <div className="mb-4 sm:mb-6 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  ></path>
                </svg>
              </div>
              <input
                type="password"
                name="password"
                placeholder="password"
                className="w-full pl-8 sm:pl-10 pr-3 py-2 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 text-sm sm:text-base"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="w-full bg-black text-white py-2 sm:py-3 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 text-sm sm:text-base font-medium transition-colors duration-200"
              disabled={loading}
            >
              {loading ? "Loading..." : "continue"}
            </button>
          </form>

          {/* Sign up link */}
          <p className="text-center text-gray-600 mt-4 text-sm sm:text-base">
            don't have account yet?{" "}
            <Link 
              to="/signup" 
              className="text-blue-600 hover:underline font-medium"
            >
              sign up
            </Link>
          </p>

          {/* Divider */}
          <div className="relative my-4 sm:my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">atau</span>
            </div>
          </div>

          {/* Google Login - Responsive sizing */}
          <div className="flex justify-center">
            <div className="w-full max-w-xs sm:max-w-sm">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                useOneTap
                theme="outline"
                size="large"
                text="signin_with"
                shape="rectangular"
                logo_alignment="center"
                width="100%"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}