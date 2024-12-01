import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useMessage from "antd/es/message/useMessage";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { SignUp } from "../services/auth";
import { useEffect } from "react";
import useAuth from "../hooks/useAuth";

interface Inputs {
  email: string;
  password: string;
  confirmPassword: string;
}

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<Inputs>();
  const { user } = useAuth();
  const [message, contextHolder] = useMessage({});
  const navigate = useNavigate();
  const onSubmit = async (data: Inputs) => {
    const response = await SignUp(data);
    if (response?.error?.message) {
      return message.error("Register failed");
    }
    return message.success("Register success");
  };

  useEffect(() => {
    user !== null && navigate("/");
  }, [user]);

  return (
    <>
      {contextHolder}
      <div style={{ maxWidth: 800, margin: "auto" }}>
        <h1 style={{ textAlign: "center" }}>Register</h1>
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
          <Input
            {...register("confirmPassword", {
              required: "Confirm password is required",
              validate: (value) => {
                if (value !== watch("password")) {
                  return "Not valid password";
                }
              },
            })}
            type="password"
            style={{ marginBottom: 10 }}
            placeholder="Confirm Password"
          />
          {errors.confirmPassword && (
            <p style={{ color: "red" }}>{errors.confirmPassword.message}</p>
          )}

          <Button style={{ width: 100 }}>Submit</Button>
        </form>
        <Link to={`/login`}>Login</Link>
      </div>
    </>
  );
}

export default Register;
