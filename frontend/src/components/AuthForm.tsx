import { FormEvent, useState } from "react";
import api from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../services/constants";
import Input from "./Input";
import Button from "./Button";
import registerImage from "../assets/register.jpg";
import loginImage from "../assets/login.jpg";

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
  const methodName = method === "login" ? "Login" : "Sign Up";

  const registerInputs = (
    <div className="flex flex-col">
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <Input
        type="text"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        placeholder="Role"
      />
      <select
        value={department}
        onChange={handleDepartmentChange}
        className=" appearance-none border border-slate-200 text-gray-500 rounded-md block p-2 m-2 font-manrope text-[16px]"
      >
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
    <div className="flex w-full h-screen md:flex-row">
      <div className="md:w-1/2 w-full flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center w-3/4"
        >
          <h1 className=" font-epilogue text-4xl flex justify-center font-extralight mb-2">
            {methodName}
          </h1>
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          {method === "register" && registerInputs}
          <Button type="submit">{methodName}</Button>
          <div className="mt-4 flex justify-center font-manrope text-slate-500 hover:text-slate-900 transition duration-300">
            {method === "login" ? (
              <Link to="/register">Create an account</Link>
            ) : (
              <Link to="/login">Already have an account?</Link>
            )}
          </div>
        </form>
      </div>
      <div className="md:block hidden w-1/2">
        <img
          src={method === "register" ? registerImage : loginImage}
          alt="custom"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

export default Form;
