import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api"
});

// Request interceptor
API.interceptors.request.use((req) => {
  console.log("API Request:", req.method?.toUpperCase(), req.url, req.baseURL);
  const user = JSON.parse(localStorage.getItem("user") || "null");
  if (user?.token) {
    req.headers.Authorization = `Bearer ${user.token}`;
  }
  return req;
});

// Response interceptor for debugging
API.interceptors.response.use(
  (response) => {
    console.log("API Response:", response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error("API Error:", error.response?.status, error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default API;
