import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

type LoginProps = {
  username: string;
  password: string;
};

export async function login({ username, password }: LoginProps) {
  const response = await axios.post(`${API_URL}/users/login`, {
    username,
    password,
  });
  return response.data;
}

