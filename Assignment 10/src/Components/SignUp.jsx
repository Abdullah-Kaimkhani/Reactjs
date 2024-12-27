import React from "react";
import "./Auth.css";

const Signup = () => {
  return (
    <div className="auth-container">
      <div className="auth-left">
        <h1>Sign Up</h1>
        <p>
          Already have an account? <a href="/login">Login here</a>
        </p>
        <form>
          <input
            type="text"
            className="auth-input"
            placeholder="Enter your name"
          />
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
          <div className="checkbox-container">
            <input type="checkbox" id="terms" />
            <label htmlFor="terms">
              By signing up, you agree to terms & conditions
            </label>
          </div>
          <button className="auth-submit">Sign Up</button>
        </form>
      </div>
      <div className="auth-right">
        <img
          src="https://static.vecteezy.com/system/resources/previews/006/912/004/original/secure-login-and-sign-up-concept-illustration-vector.jpg"
          alt="Signup Illustration"
        />
      </div>
    </div>
  );
};

export default Signup;
