import React, { useState } from "react";
import "./ProfilePage.scss";
import { FaUser } from "react-icons/fa";

const userData = {
  avatarUrl: null,
  fullName: "Vishnu Kumar Agrawal",
  username: "Agrawa",
  email: "abc@gmail.com",
  gender: "Nam",
  dob: "dd/mm/yyyy",
};

const userStats = {
  posts: 12,
  recruitments: 7,
  reply: 10,
};

const recruitmentPosts = [
  {
    date: "03 Dec",
    title: "Design Thinking",
    location: "@ Creative Town Hall",
  },
  {
    date: "12 Dec",
    title: "Information Architecture",
    location: "@ Creative Town Hall",
  },
  {
    date: "16 Dec",
    title: "Web flow Meetup",
    location: "@ Creative Town Hall",
  },
];

const ProfilePage = () => {
  const [activeView, setActiveView] = useState("info");

  const handleNavClick = (view) => {
    setActiveView(view);

    if (view === "edit") {
      // navigate('/profile/edit');
      alert("Chuyển đến trang Chỉnh sửa thông tin...");
    } else if (view === "password") {
      // navigate('/profile/change-password');
      alert("Chuyển đến trang Đổi mật khẩu...");
    }
  };

  return (
    <div className="profile-page-container new-layout">
      <main className="main-content">
        <section className="card profile-summary-card">
          <div className="avatar-container">
            {userData.avatarUrl ? (
              <img src={userData.avatarUrl} alt="Avatar" />
            ) : (
              <FaUser />
            )}
          </div>
          <div className="user-details">
            <h3>{userData.fullName}</h3>
            <p>{userData.email}</p>
          </div>
          <div className="user-stats">
            <div className="stat-item">
              <strong>{userStats.posts}</strong>
              <span>Posts</span>
            </div>
            <div className="stat-item">
              <strong>{userStats.recruitments}</strong>
              <span>Recruitments</span>
            </div>
            <div className="stat-item">
              <strong>{userStats.reply}</strong>
              <span>Reply</span>
            </div>
          </div>
        </section>

        <div className="profile-settings-container">
          <nav className="card profile-nav">
            <ul>
              <li
                className={activeView === "info" ? "active" : ""}
                onClick={() => handleNavClick("info")}
              >
                Thông tin cá nhân
              </li>
              <li
                className={activeView === "edit" ? "active" : ""}
                onClick={() => handleNavClick("edit")}
              >
                Chỉnh sửa thông tin
              </li>
              <li
                className={activeView === "password" ? "active" : ""}
                onClick={() => handleNavClick("password")}
              >
                Đổi mật khẩu
              </li>
            </ul>
          </nav>

          <section className="card profile-content-card">
            {activeView === "info" && (
              <div className="info-view">
                <h2>Thông tin cá nhân</h2>
                <div className="info-group">
                  <label>Họ và tên:</label>
                  <p>{userData.fullName}</p>
                </div>
                <div className="info-group">
                  <label>Giới tính:</label>
                  <p>{userData.gender}</p>
                </div>
                <div className="info-group">
                  <label>Ngày sinh:</label>
                  <p>{userData.dob}</p>
                </div>
                <div className="info-group">
                  <label>Email:</label>
                  <p>{userData.email}</p>
                </div>
                <div className="info-group">
                  <label>Tên tài khoản:</label>
                  <p>{userData.username}</p>
                </div>
              </div>
            )}
          </section>
        </div>
      </main>

      <aside className="sidebar">
        <section className="card widget-card">
          <h3>recruitment posts</h3>
          <ul className="widget-list">
            {recruitmentPosts.map((post, index) => (
              <li key={index} className="widget-item">
                <div className="widget-date">
                  <strong>{post.date.split(" ")[0]}</strong>
                  <span>{post.date.split(" ")[1]}</span>
                </div>
                <div className="widget-info">
                  <h4>{post.title}</h4>
                  <p>{post.location}</p>
                  <span>Details</span>
                </div>
              </li>
            ))}
          </ul>
          <a href="#" className="view-more">
            View More
          </a>
        </section>

        <section className="card widget-card">
          <h3>upcoming events</h3>
          <ul className="widget-list">
            {recruitmentPosts.map((post, index) => (
              <li key={index} className="widget-item">
                <div className="widget-date">
                  <strong>{post.date.split(" ")[0]}</strong>
                  <span>{post.date.split(" ")[1]}</span>
                </div>
                <div className="widget-info">
                  <h4>{post.title}</h4>
                  <p>{post.location}</p>
                  <span>Details</span>
                </div>
              </li>
            ))}
          </ul>
          <a href="#" className="view-more">
            View More
          </a>
        </section>
      </aside>
    </div>
  );
};

export default ProfilePage;
