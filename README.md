# 📘 VinBook - Mạng Xã Hội Thuần Việt

**VinBook** là dự án xây dựng một nền tảng mạng xã hội thu nhỏ, cho phép người dùng kết nối, chia sẻ khoảnh khắc và tương tác với nhau. Dự án được phát triển với kiến trúc **Client-Server**, sử dụng **ReactJS (SPA)** cho Frontend và **Spring Boot (RESTful API)** cho Backend.

> **Trạng thái:** Đang phát triển
> **Demo:** 
> **API Documentation:** 

---

## 🌟 Tính Năng Chính

Dự án bao gồm các chức năng cốt lõi của một mạng xã hội hiện đại:

### 👤 Quản lý Tài khoản & Hồ sơ
* **Đăng ký & Đăng nhập:** Bảo mật với **JWT** và mã hóa mật khẩu **BCrypt**.
* **Xác thực 2 lớp:** Quên mật khẩu và lấy lại mật khẩu thông qua mã **OTP** gửi về Email.
* **Hồ sơ cá nhân (Profile):** Cập nhật ảnh đại diện (Avatar), thông tin cá nhân và quản lý danh sách bài viết của chính mình.

### 📰 Bảng tin & Tương tác
* **Newsfeed:** Hiển thị dòng thời gian các bài viết mới nhất.
* **Đăng bài (Create Post):** Hỗ trợ soạn thảo nội dung văn bản và tải lên hình ảnh (có chế độ xem trước).
* **Tương tác (Interaction):** Thả tim (Like) và Bình luận (Comment) bài viết theo thời gian thực.
* **Quản lý nội dung:** Chỉnh sửa hoặc xóa bài viết cá nhân.

---

## 🛠️ Công Nghệ Sử Dụng

### Frontend (Client-side)
* **Core:** ReactJS, JavaScript (ES6+).
* **State Management:** Redux Toolkit (Quản lý Auth state & Global state).
* **UI Framework:** Ant Design (Layout, Form, Modal, Upload).
* **Styling:** SCSS (Sass).
* **HTTP Client:** Axios (Tích hợp Interceptors xử lý Token).
* **Routing:** React Router DOM v6.

### Backend (Server-side)
* **Core:** Java (JDK 21), Spring Boot 3.5.6.
* **Database:** MySQL.
* **ORM:** Spring Data JPA.
* **Security:** Spring Security, JWT (JSON Web Token).
* **Email Service:** JavaMailSender (SMTP Gmail).
* **API Docs:** Swagger UI (OpenAPI 3.0).
* **Build Tool:** Maven.

---

## 📸 Hình Ảnh Demo

*(Thay thế các đường dẫn bên dưới bằng ảnh chụp màn hình thực tế của dự án)*

| Trang chủ (Newsfeed) | Tạo bài viết (Modal) |
|:---:|:---:|
| ![Home]() | ![Create Post](https://via.placeholder.com/600x400?text=Create+Post+Screenshot) |

| Trang cá nhân (Profile) | Chi tiết bài viết |
|:---:|:---:|
| ![Profile](https://via.placeholder.com/600x400?text=Profile+Screenshot) | ![Detail](https://via.placeholder.com/600x400?text=Post+Detail+Screenshot) |

---

## 🚀 Cài Đặt & Hướng Dẫn Chạy

### 1. Yêu cầu hệ thống (Prerequisites)
* **Node.js** (v16 trở lên) & NPM.
* **Java JDK** 21.
* **MySQL** Server.
* **Maven**.

### 2. Cài đặt Backend
1.  Di chuyển vào thư mục Backend:
    ```bash
    cd backend
    ```
2.  Cấu hình cơ sở dữ liệu trong file `src/main/resources/application.properties`:
    ```properties
    spring.datasource.url=jdbc:mysql://localhost:3306/vinbook
    spring.datasource.username=root
    spring.datasource.password=YOUR_PASSWORD
    # Cấu hình Email SMTP nếu cần test tính năng OTP
    ```
3.  Cài đặt dependencies và chạy dự án:
    ```bash
    mvn spring-boot:run
    ```
    *Server sẽ khởi động tại: `http://localhost:8080`*

### 3. Cài đặt Frontend
1.  Di chuyển vào thư mục Frontend:
    ```bash
    cd frontend
    ```
2.  Cài đặt các gói thư viện (node_modules):
    ```bash
    npm install
    ```
3.  Khởi chạy ứng dụng:
    ```bash
    npm start
    ```
    *Ứng dụng sẽ chạy tại: `http://localhost:3000`*

---

## 📂 Cấu Trúc Thư Mục

```text
VinBook/
├── backend/                # Source code Spring Boot
│   ├── src/main/java/com/vinbook
│   │   ├── config/         # Security & App Config
│   │   ├── controller/     # API Controllers
│   │   ├── entity/         # Database Models
│   │   ├── repository/     # Data Access Layer
│   │   └── service/        # Business Logic Layer
│   └── Dockerfile
│
└── frontend/               # Source code ReactJS
    ├── src/
    │   ├── components/     # UI Components (Header, Post...)
    │   ├── pages/          # Page Views (Login, Home, Profile...)
    │   ├── redux/          # Redux Slices
    │   └── services/       # API Calls (Axios)
    └── package.json
