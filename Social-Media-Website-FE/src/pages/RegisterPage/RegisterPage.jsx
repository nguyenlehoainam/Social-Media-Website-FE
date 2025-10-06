import React from "react";
import "./RegisterPage.scss";

function RegisterPage() {
  return (
    <div className="register-page">
      <div className="register-page-container">
        <div className="register-card">
          <h1 className="register-header">Welcome to Vinbook</h1>
          <p className="register-text">register to continue to sign in</p>
          <div className="input-group">
            <div className="email-form">
              <label className="input-label" htmlFor="email">
                Email Adress{" "}
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="nguyenlehoainam@gmail.com"
              />
            </div>
            <div className="password-form">
              <label className="input-label" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                placeholder="••••••••"
              />
            </div>
            <div className="confirm-password-form">
              <label className="input-label" htmlFor="confirm-password">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirm-password"
                required
                placeholder="••••••••"
              />
            </div>
          </div>
          <button className="register-btn" type="submit">
            register
          </button>
          <div className="footer-text">
            <a href="/">Login!</a>
            <a href="/forgot-password">ForgotPassword?</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
