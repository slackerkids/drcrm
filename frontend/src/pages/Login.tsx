import Form from "../components/AuthForm"

function Login() {
  localStorage.clear()
  return <Form route="/api/token/" method="login" />
}

export default Login