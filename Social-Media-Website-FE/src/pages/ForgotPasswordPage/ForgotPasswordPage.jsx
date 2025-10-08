import React from "react";
import "./ForgotPasswordPage.scss";

function ForgotPasswordPage() {
  return (
    <div className="register-page">
      <div className="register-page-container">
        <div className="register-card">
          <h1 className="register-header">Welcome to Vinbook</h1>
          <p className="register-text">
            Confirm your email to continue to sign in
          </p>
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
          </div>
          <button className="register-btn" type="submit">
            Find Account
          </button>
          <div className="footer-text">
            <a href="/">Login</a>
            <a href="/register">Register</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
