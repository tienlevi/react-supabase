import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useMessage from "antd/es/message/useMessage";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { SignIn } from "../services/auth";
import useAuth from "../hooks/useAuth";
import { SESSION } from "../constants/enum";

interface Inputs {
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
}

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const navigate = useNavigate();
  const [message, contextHolder] = useMessage({});
  const { event } = useAuth();

  const onSubmit = async (data: Inputs) => {
    const response = await SignIn(data);
    if (response?.error?.status === 400) {
      return message.error("Login failed");
    }
    return message.success("Login success");
  };

  useEffect(() => {
    if (event === SESSION.SIGNED_IN) {
      navigate("/");
    }
  }, []);

  return (
    <>
      {contextHolder}
      <div style={{ maxWidth: 800, margin: "auto" }}>
        <h1 style={{ textAlign: "center" }}>Login</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ display: "flex", flexDirection: "column", width: "100%" }}
        >
          <Input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Not email type",
              },
            })}
            type="text"
            style={{ marginBottom: 10 }}
            placeholder="Email"
          />
          {errors.email && (
            <p style={{ color: "red" }}>{errors.email.message}</p>
          )}
          <Input
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password is more than 6 letters",
              },
            })}
            type="password"
            style={{ marginBottom: 10 }}
            placeholder="Password"
          />
          {errors.password && (
            <p style={{ color: "red" }}>{errors.password.message}</p>
          )}

          <Button style={{ width: 100 }}>Submit</Button>
        </form>
        <Link to={`/register`}>Register</Link>
      </div>
    </>
  );
}

export default Login;
