import React from "react";
import "./Auth.css";

const Login = () => {
  return (
    <div className="auth-container">
      <div className="auth-left">
        <h1>Login</h1>
        <p>
          Don’t have an account? <a href="/signup">Sign up here</a>
        </p>
        <form>
          <input
            type="email"
            className="auth-input"
            placeholder="Enter your email"
          />
          <input
            type="password"
            className="auth-input"
            placeholder="Enter your password"
          />
          <button className="auth-submit">Login</button>
        </form>
      </div>
      <div className="auth-right">
        <img
          src="https://static.vecteezy.com/system/resources/previews/006/912/004/original/secure-login-and-sign-up-concept-illustration-vector.jpg"
          alt="Login Illustration"
        />
      </div>
    </div>
  );
};

export default Login;
