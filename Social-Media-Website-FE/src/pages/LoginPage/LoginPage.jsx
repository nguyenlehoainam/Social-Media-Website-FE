import React from "react";
import "./LoginPage.scss";
const LoginPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div className="login-page">
      <div className="login-page-container">
        <div className="login-card">
          <div className="login-header">
            <h1>Welcome to vinbook</h1>
            <p>Sign in to continue to your account</p>
          </div>

          <form className="login-form">
            <div className="input-group">
              <div>
                <label htmlFor="email">Email Address</label>
              </div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="nguyenlehoainam@gmail.com"
              />
            </div>

            <div className="input-group">
              <div className="password-label">
                <label htmlFor="password">Password</label>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="••••••••"
              />
            </div>
            <div className="input-group">
              <button onClick={handleSubmit} type="submit">
                Sign In
              </button>
            </div>
          </form>

          <p className="footer-text">
            <a href="/register">Register!</a>
            <a href="/forgot-password">Forgot password?</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
