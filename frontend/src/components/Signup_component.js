import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { register, reset } from "../features/auth/auth.js";
import Spinner from "./Spinner.js";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { name, email, password, confirmPassword } = formData;

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/login");
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

    if (password !== confirmPassword) {
      toast.error("Password do not match");
    } else {
      const userData = { name, email, password };
      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="p-4 border rounded-lg max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-2">Signup</h2>

      <form onSubmit={handleSubmit}>
        <input
          className="block w-full p-2 border mb-2"
          type="text"
          placeholder="User name"
          name="name"
          value={name}
          onChange={onChange}
          required
        />
        <input
          className="block w-full p-2 border mb-2"
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={onChange}
          required
        />
        <input
          className="block w-full p-2 border mb-2"
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={onChange}
          required
        />
        <input
          className="block w-full p-2 border mb-2"
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={onChange}
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded w-full"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Signup;
