import Form from "../components/AuthForm";

function Register() {
  localStorage.clear();
  return <Form route="/api/user/register/" method="register" />;
}

export default Register;
