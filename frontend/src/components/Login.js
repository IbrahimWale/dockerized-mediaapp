import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { login, reset } from "../features/auth/auth.js";
import Spinner from "./Spinner.js";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    password: "",
    email: "",
  });

  const { password, email } = formData;

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/media");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = { email, password };
    dispatch(login(userData));
  };

  if (isLoading) {
    <Spinner />;
  }

  return (
    <div className="max-w-md mx-auto p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Login</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={onChange}
          required
          className="p-2 border rounded"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          name="password"
          onChange={onChange}
          required
          className="p-2 border rounded"
        />

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
