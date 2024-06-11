import axios from "axios";
import { ACCESS_TOKEN } from "./constants";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Api types
type customerCreateType = {
  name: string;
  email: string;
  phone: string | number;
  address: string;
};

type customerDetailViewType = {
  pk: number
}


// Api endpoints
export async function userProfileView() {
  try {
    const response = await api.get("/api/user/profile/");
    return response.data;
  } catch (error) {
    console.error(`Failed to load user profile: ${error}`);
  }
}

export async function customerListView() {
  try {
    const response = await api.get("/api/customers/");
    return response.data;
  } catch (error) {
    console.error(`Failed to load customers: ${error}`);
  }
}


export async function customerCreate({
  name,
  email,
  phone,
  address,
}: customerCreateType) {
  try {
    const response = await api.post("/api/customers/", {name, email, phone, address});
    return response.data;
  } catch (error) {
    console.error(`Failed to create customer: ${error}`);
  }
}

export async function customerDetailView({ pk }: customerDetailViewType) {
  try {
    const response = await api.get(`api/customers/${pk}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch customer detail: ${error}`);
  }
}

export default api;
