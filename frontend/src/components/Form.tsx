import { FormEvent, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../services/constants";

type FormType = {
  route: string;
  method: "login" | "register";
};

function Form({ route, method }: FormType) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [role, setRole] = useState("");

  const handleDepartmentChange = (e: any) => {
    setDepartment(e.target.value);
  };

  const navigate = useNavigate();
  const methodName = method === "login" ? "Login" : "Register";

  const registerInputs = (
    <div>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="text"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        placeholder="Role"
      />
      <select value={department} onChange={handleDepartmentChange}>
        <option value="">Select Department</option>
        <option value="human_resources">Human Resources</option>
        <option value="sales">Sales</option>
        <option value="marketing">Marketing</option>
        <option value="finance">Finance</option>
        <option value="operations">Operations</option>
        <option value="development">Development</option>
        <option value="customer_service">Customer Service</option>
      </select>
    </div>
  );

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    try {
      if (method === "login") {
        const response = await api.post(route, { username, password });
        localStorage.setItem(ACCESS_TOKEN, response.data.access);
        localStorage.setItem(REFRESH_TOKEN, response.data.refresh);
        console.log(localStorage.getItem(ACCESS_TOKEN))
        navigate("/");
      } else if (method === "register") {
        await api.post(route, {
          username,
          password,
          email,
          department,
          role,
        });
        navigate("/login");
      } else {
        navigate("/login");
      }
    } catch (error) {
      alert(error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>{methodName}</h1>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      {method === "register" && registerInputs}
      <button type="submit">{methodName}</button>
    </form>
  );
}

export default Form;
