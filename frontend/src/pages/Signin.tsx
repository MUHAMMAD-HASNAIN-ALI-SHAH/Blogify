import { useState } from "react";
import { PasswordInput, TextInput } from "@mantine/core";
import useAuthStore from "../store/auth";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const { signin, authLoader } = useAuthStore();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState({ email: "", password: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors = {
      email: /^\S+@\S+$/.test(email) ? "" : "Invalid email",
      password: password.length > 0 ? "" : "Please enter the password",
    };
    setError(errors);

    if (errors.email || errors.password) return;

    const result = await signin({ email, password });
    if (result === 1) {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen w-full max-w-md mx-auto p-4 flex justify-center items-center">
      <form className="w-full" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold pb-2">Signin to continue</h1>
        <p>Please enter your email and password</p>

        <TextInput
          mt="sm"
          label="Email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
          error={error.email}
        />

        <PasswordInput
          mt="sm"
          label="Password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
          error={error.password}
        />

        <div className="flex justify-between items-center mt-3">
          <p className="pt-3">
            No account?{" "}
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="text-blue-700"
            >
              Signup
            </button>
          </p>

          <button
            disabled={!!authLoader}
            className="btn btn-primary"
            type="submit"
          >
            Signin
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signin;
