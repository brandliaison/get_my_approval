import axios from "axios";
import UIkit from "uikit";

const getBaseURL = () => {
    return "http://127.0.0.1:8001/api/v1/op-admin";
};

const partnerApi = axios.create({
    baseURL: getBaseURL(),
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

// Add a request interceptor to include the token and CSRF token in all requests
partnerApi.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("authToken");
        const csrfToken = localStorage.getItem("csrfToken");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        if (csrfToken) {
            config.headers["X-CSRF-TOKEN"] = csrfToken;
        }
        config.baseURL = getBaseURL(); // Dynamically set baseURL before each request
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor to handle errors globally
partnerApi.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            UIkit.notification({
                message:
                    error?.response?.data?.message ||
                    "Unauthorized access. Please log in.",
                status: "danger",
                timeout: 2000,
                pos: "top-center",
            });
            // Optional: Redirect to login page or take other actions
        }
        return Promise.reject(error);
    }
);

export const login = async (credentials) => {
    const response = await partnerApi.post("/login", credentials);
    const { token, user } = response.data;
    partnerApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    localStorage.setItem("authToken", token);
    localStorage.setItem("user", JSON.stringify(user)); // Store user details
    return response;
};

export const logout = async () => {
    await partnerApi.post("/logout");
    delete partnerApi.defaults.headers.common["Authorization"];
    localStorage.removeItem("authToken");
    localStorage.removeItem("user"); // Remove user details
};

export const checkTokenValidity = async () => {
    const token = localStorage.getItem("authToken");
    if (token) {
        partnerApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        try {
            await partnerApi.get("/token-valid");
            return true;
        } catch (error) {
            return false;
        }
    }
    return false;
};

export const gstToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTc0MzA2MTg5OSwianRpIjoiNmM3ZDk2MGEtNzg0Ny00NTBmLTk4MjUtNjJmNzk0ZjYzNTM3IiwidHlwZSI6ImFjY2VzcyIsImlkZW50aXR5IjoiZGV2LmJyYW5kbGlhaXNvbkBzdXJlcGFzcy5pbyIsIm5iZiI6MTc0MzA2MTg5OSwiZXhwIjoyMzczNzgxODk5LCJlbWFpbCI6ImJyYW5kbGlhaXNvbkBzdXJlcGFzcy5pbyIsInRlbmFudF9pZCI6Im1haW4iLCJ1c2VyX2NsYWltcyI6eyJzY29wZXMiOlsidXNlciJdfX0.spCl5gF-NNORRQtezDce2YLqXQJiUIHYBBxdEwkJKeM";
export default partnerApi;
