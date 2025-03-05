const BASE_URL = import.meta.env.VITE_BASE_URL || "https://localhost:5173";

export const categories = {
    CATEGORIES_API: `${BASE_URL}/course/`
};
export const endpoints = {
    SENDOTP_API: "/auth/send-otp",
    SIGNUP_API: "/auth/signup",
    LOGIN_API: "/auth/login",
  };
  