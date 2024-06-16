import axios from "axios";
import { ACCESS_TOKEN } from "./constants";
import { useNavigate } from "react-router-dom";

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
type userProfileViewPutType = {
  username: string;
  email: string;
  department: string;
  role: string;
};

type customerType = {
  id?: number;
  name: string;
  email: string;
  phone: string | number;
  address?: string;
};

type customerDetailViewType = {
  id: number;
};

type leadType = {
  id?: number;
  lead?: number;
  customer?: number;
  name: string;
  email: string;
  phone: string | number;
  status: string;
};

type leadDetailViewType = {
  id: number;
};

type interactionType = {
  id?: number;
  interaction_type: "phone" | "email" | "social_media" | "in_person";
  lead?: number;
  customer?: number;
  notes: string;
  date: string;
};

type interactionDetailViewType = {
  id: number;
};

// Api endpoints

/**
 * @returns User profile information
 */
export async function userProfileViewGet() {
  try {
    const response = await api.get("/api/user/profile/");
    return response.data;
  } catch (error) {
    console.error(`Failed to load user profile: ${error}`);
    throw error;
  }
}

/**
 * Updates user profile information
 * @returns Updated user profile information
 */
export async function userProfileViewPut({
  username,
  email,
  department,
  role,
}: userProfileViewPutType) {
  try {
    const response = await api.put("/api/user/profile/", {
      username,
      email,
      department,
      role,
    });
    return response.data;
  } catch (error) {
    console.error(`Failed to update user profile: ${error}`);
    throw error;
  }
}

/**
 * Deletes user, and redirects to login page
 * @param navigate - function from React Router to navigate
 */
export async function userProfileViewDelete(
  navigate: ReturnType<typeof useNavigate>
) {
  try {
    await api.delete("/api/user/profile/");
    navigate("/login");
  } catch (error) {
    console.error(`Failed to delete user profile: ${error}`);
    throw error;
  }
}

/**
 * @returns a list of Customers
 */
export async function customerListView() {
  try {
    const response = await api.get("/api/customers/");
    return response.data;
  } catch (error) {
    console.error(`Failed to load customers: ${error}`);
    throw error;
  }
}

/**
 * Creates new customer,
 * @returns created customer object
 */
export async function customerCreate({
  name,
  email,
  phone,
  address,
}: customerType) {
  try {
    const response = await api.post("/api/customers/", {
      name,
      email,
      phone,
      address,
    });
    return response.data;
  } catch (error) {
    console.error(`Failed to create customer: ${error}`);
    throw error;
  }
}

/**
 * Takes customer id as argument
 * @returns full information about customer
 */
export async function customerDetailViewGet({ id }: customerDetailViewType) {
  try {
    const response = await api.get(`/api/customers/${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch customer detail: ${error}`);
    throw error;
  }
}

/**
 * Takes customer id as argument
 * @returns Updated information about customer
 */
export async function customerDetailViewPut({
  id,
  name,
  email,
  phone,
  address,
}: customerType) {
  try {
    const response = await api.put(`/api/customers/${id}/`, {
      name,
      email,
      phone,
      address,
    });
    return response.data;
  } catch (error) {
    console.error(`Failed to update customer detail: ${error}`);
    throw error;
  }
}

/**
 * Takes customer id as argument
 * @param navigate - function from React Router to navigate
 */
export async function customerDetailViewDelete({ id }: customerDetailViewType) {
  try {
    const response = await api.delete(`/api/customers/${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Failed to delete chosen customer: ${error}`);
    throw error;
  }
}

/**
 * @returns a list of Leads
 */
export async function leadListView() {
  try {
    const response = await api.get("/api/leads/");
    return response.data;
  } catch (error) {
    console.error(`Failed to load leads: ${error}`);
    throw error;
  }
}

/**
 * Creates new lead,
 * @returns created lead info
 */
export async function leadCreate({ name, email, phone, status }: leadType) {
  try {
    const response = await api.post("/api/leads/", {
      name,
      email,
      phone,
      status,
    });
    return response.data;
  } catch (error) {
    console.error(`Failed to create lead: ${error}`);
    throw error;
  }
}

/**
 * Takes lead id as argument
 * @returns full information about lead
 */
export async function leadDetailViewGet({ id }: leadDetailViewType) {
  try {
    const response = await api.get(`/api/leads/${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch lead detail: ${error}`);
    throw error;
  }
}

/**
 * Takes lead id as argument
 * @returns Updated information about lead
 */
export async function leadDetailViewPut({
  id,
  name,
  email,
  phone,
  status,
}: leadType) {
  try {
    const response = await api.put(`/api/leads/${id}/`, {
      name,
      email,
      phone,
      status,
    });
    return response.data;
  } catch (error) {
    console.error(`Failed to update lead detail: ${error}`);
    throw error;
  }
}

/**
 * Takes lead id as argument
 * @param navigate - function from React Router to navigate
 */
export async function leadDetailViewDelete({ id }: leadDetailViewType) {
  try {
    const response = await api.delete(`/api/leads/${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Failed to delete chosen lead: ${error}`);
    throw error;
  }
}

/**
 * @returns a list of Interactions
 */
export async function interactionListView() {
  try {
    const response = await api.get("/api/interactions/");
    return response.data;
  } catch (error) {
    console.error(`Failed to load interactions: ${error}`);
    throw error;
  }
}

/**
 * Creates new interaction,
 * @returns created interaction info
 */
export async function interactionCreate({ payload }: any) {
  try {
    console.log(payload);
    const response = await api.post("/api/interactions/", payload);
    return response.data;
  } catch (error) {
    console.error(`Failed to create interaction: ${error}`);
    throw error;
  }
}

/**
 * Takes interaction id as argument
 * @returns full information about interaction
 */
export async function interactionDetailViewGet({
  id,
}: interactionDetailViewType) {
  try {
    const response = await api.get(`/api/interactions/${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch interaction detail: ${error}`);
    throw error;
  }
}

/**
 * Takes interaction id as argument
 * @returns Updated information about interaction
 */
export async function interactionDetailViewPut({
  id,
  interaction_type,
  notes,
  date,
}: interactionType) {
  try {
    const response = await api.put(`/api/interactions/${id}/`, {
      interaction_type,
      notes,
      date,
    });
    return response.data;
  } catch (error) {
    console.error(`Failed to update interaction detail: ${error}`);
    throw error;
  }
}

/**
 * Takes interaction id as argument
 * @param navigate - function from React Router to navigate
 */
export async function interactionDetailViewDelete({
  id,
}: interactionDetailViewType) {
  try {
    const response = await api.delete(`/api/interactions/${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Failed to delete chosen interaction: ${error}`);
    throw error;
  }
}

export default api;
