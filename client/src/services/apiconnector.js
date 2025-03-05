import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, // Correct way in Vite
  withCredentials: true, // Ensure cookies are sent if needed
});

export const apiConnector = async (method, url, data = {}, headers = {}, params = {}) => {
  try {
    const response = await axiosInstance({
      method,
      url,
      data: Object.keys(data).length ? data : undefined,
      headers: Object.keys(headers).length ? headers : undefined,
      params: Object.keys(params).length ? params : undefined,
    });

    return response;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    throw error.response?.data || { success: false, message: "Something went wrong" };
  }
};
