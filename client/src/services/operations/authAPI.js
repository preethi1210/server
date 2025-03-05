import { apiConnector } from "../apiconnector";
import { endpoints } from "../apis";
import { toast } from "react-toastify";
import { setLoading, setToken, setUser } from "../../slices/profile";

export const sendOtp = (email, navigate) => {
  return async (dispatch) => {
    const toastId = toast.loading("Sending OTP...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("POST", endpoints.SENDOTP_API, {
        email,
        checkUserPresent: true,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("OTP Sent Successfully");
      navigate("/verify-email");
    } catch (error) {
      console.error("SENDOTP API ERROR", error);
      toast.error(error.message || "Could not send OTP");
    }

    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
};

export const signUp = (accountType, firstName, lastName, email, otp, password, confirmPassword, navigate) => {
  return async (dispatch) => {
    const toastId = toast.loading("Signing up...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("POST", endpoints.SIGNUP_API, {
        accountType,
        firstName,
        lastName,
        email,
        otp,
        password,
        confirmPassword,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Signup Successful");
      navigate("/login");
    } catch (error) {
      console.error("SIGNUP API ERROR", error);
      toast.error(error.message || "Signup Failed");
    }

    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
};

export const login = (email, password, navigate) => {
  return async (dispatch) => {
    const toastId = toast.loading("Logging in...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("POST", endpoints.LOGIN_API, {
        email,
        password,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Login Successful");
      dispatch(setToken(response.data.token));

      const userImage =
        response.data?.user?.image ||
        `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`;

      dispatch(setUser({ ...response.data.user, image: userImage }));
      localStorage.setItem("token", JSON.stringify(response.data.token));
      navigate("/dashboard/my-profile");
    } catch (error) {
      console.error("LOGIN API ERROR", error);
      toast.error(error.message || "Login Failed");
    }

    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
};
