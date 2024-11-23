import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import "bootstrap/dist/css/bootstrap.min.css";
import './css/Auth.css';

import AuthService from "../services/AuthService";

const schema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required!")
    .min(2, "Must be at least 2 characters!")
    .max(50, "Must be less than 50 characters!"),
  password: yup
    .string()
    .required("Password is required!")
});

const Signin = () => {
  const [responseMessage, setResponseMessage] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange"
  });

  const doSignin = async (formData) => {
    setLoading(true); 
    try {
      const result = await AuthService.login(formData);
      setResponseMessage(result.message);
      setErrorMessage(""); 
      navigate("/");
    } catch (error) {
      console.error(error);
      setErrorMessage(error.response?.data?.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-sm p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-4">Sign In</h2>
        <form onSubmit={handleSubmit(doSignin)}>
          <div className="form-group mb-3">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              {...register("username")}
              className={`form-control ${errors.username ? "is-invalid" : ""}`}
            />
            {errors.username && (
              <div className="invalid-feedback">{errors.username.message}</div>
            )}
          </div>
          <div className="form-group mb-3">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              {...register("password")}
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password.message}</div>
            )}
          </div>
          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? (
              <div className="spinner-border spinner-border-sm text-light" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
        {responseMessage && (
          <div className="alert alert-success mt-3">{responseMessage}</div>
        )}
        {errorMessage && (
          <div className="alert alert-danger mt-3">{errorMessage}</div>
        )}
      </div>
    </div>
  );
};

export default Signin;
