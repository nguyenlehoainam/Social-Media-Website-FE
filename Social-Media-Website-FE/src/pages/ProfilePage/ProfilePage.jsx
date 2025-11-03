import React, { useState } from "react";
import {
  DatePicker,
  Form,
  Input,
  Radio,
  Space,
  Button,
  // Spin, // Không cần nữa
  Upload,
} from "antd";
import dayjs from "dayjs";
import "./ProfilePage.scss";
// import { info, update } from "../../apis/userProfile.api"; // Đã xóa
// import { changePassword } from "../../apis/auth.api"; // Đã xóa
import toast from "react-hot-toast"; // Bạn có thể giữ hoặc xóa nếu không dùng

// --- Dữ liệu giả (Mock Data) ---
const infoUser = {
  fullName: "Vishnu Kumar Agrawal",
  email: "abc@gmail.com",
  gender: "MALE", // Sử dụng 'MALE', 'FEMALE', 'OTHER' như trong form
  dob: "1995-01-01",
  username: "Agrawa",
  phone: "0123456789",
  avatarUrl: "https://i.pravatar.cc/100", // Dùng ảnh placeholder
};

// Định nghĩa menuItems
const menuItems = [
  { key: "info", label: "Thông tin cá nhân" },
  { key: "edit", label: "Chỉnh sửa thông tin" },
  { key: "changePassword", label: "Đổi mật khẩu" },
];
// --- Kết thúc Dữ liệu giả ---

const ProfilePage = () => {
  const [action, setAction] = useState("info"); // Giữ state này để điều khiển tab
  const [hoverIndex, setHoverIndex] = useState(null);
  // const [infoUser, setInfoUser] = useState(); // Đã chuyển lên mock data
  const [editForm] = Form.useForm();
  const [passwordForm] = Form.useForm();
  // const [isLoading, setIsLoading] = useState(true); // Đã xóa

  // Gán giá trị ban đầu cho form "Edit" từ mock data
  // Bạn có thể đặt nó trong useEffect() [] nếu muốn
  editForm.setFieldsValue({
    fullName: infoUser.fullName || "",
    gender: infoUser.gender || "",
    dob: infoUser.dob ? dayjs(infoUser.dob) : null,
    email: infoUser.email || "",
    username: infoUser.username || "",
    phone: infoUser.phone || "",
    avatar: infoUser.avatarUrl
      ? [
          {
            uid: "-1", // Thêm uid
            name: "avatar.jpg",
            status: "done", // Thêm status
            url: infoUser.avatarUrl,
          },
        ]
      : [],
  });

  // --- Các hàm xử lý API (Đã xóa/vô hiệu hóa) ---

  // const fetchGetUser = async () => { ... };
  // useEffect(() => { ... }, []);

  const handleUpdateProfile = async (values) => {
    console.log("Dữ liệu form 'Chỉnh sửa':", values);
    // Xử lý logic cập nhật (không gọi API)
    toast.success("Đã nhấp Cập nhật! (Không gọi API)");
    setAction("info"); // Chuyển về tab thông tin
  };

  const handleChangePassword = async (values) => {
    console.log("Dữ liệu form 'Đổi mật khẩu':", values);
    // Xử lý logic đổi mật khẩu (không gọi API)
    toast.success("Đã nhấp Đổi mật khẩu! (Không gọi API)");
    passwordForm.resetFields();
    setAction("info"); // Chuyển về tab thông tin
  };

  // --- Các đoạn return loading/error (Đã xóa) ---
  // if (isLoading) { ... }
  // if (!infoUser) { ... }

  return (
    <div className="profile-page">
      {/* Phần header card */}
      <div className="profile-header-card">
        <div className="header-user-info">
          <img
            src={infoUser.avatarUrl}
            alt="Avatar"
            style={{ width: "70px", height: "70px", borderRadius: "50%" }} // Thay đổi kích thước
          />
          <div className="user-details">
            <p className="user-name">{infoUser?.fullName}</p>
            <p className="user-email">{infoUser?.email}</p>
          </div>
        </div>
        <div className="header-stats">
          <div className="stats-item">
            <p>20</p>
            <p>Posts</p>
          </div>
          <div className="stats-item">
            <p>30</p>
            <p>Recruitment</p>
          </div>
          <div className="stats-item">
            <p>50</p>
            <p>Apply</p>
          </div>
        </div>
      </div>

      {/* Phần nội dung chính */}
      <div className="profile-main-section">
        {/* Sidebar */}
        <div className="profile-sidebar">
          <ul className="sidebar-menu">
            {menuItems.map((item, index) => (
              <li
                key={item.key}
                className={`menu-item ${
                  hoverIndex === index ? "hovered" : ""
                } ${
                  action === item.key && hoverIndex === null ? "active" : ""
                }`}
                onClick={() => setAction(item.key)}
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(null)}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </div>

        <div className="profile-content-area">
          {/* Xem thong tin tai khoan */}
          {action === "info" && (
            <>
              <h4 className="content-title">Thông tin cá nhân</h4>
              <div className="info-display">
                <div className="info-item">
                  <div className="info-item--p">
                    <p>Họ và tên:</p>
                    <p>{infoUser?.fullName}</p>
                  </div>
                </div>
                <div className="info-item">
                  <div className="info-item--p">
                    <p>Giới tính:</p>
                    {/* Hiển thị text dựa trên key */}
                    <p>
                      {infoUser?.gender === "MALE"
                        ? "Nam"
                        : infoUser?.gender === "FEMALE"
                        ? "Nữ"
                        : "Khác"}
                    </p>
                  </div>
                </div>
                <div className="info-item">
                  <div className="info-item--p">
                    <p>Ngày sinh:</p>
                    <p>{dayjs(infoUser?.dob).format("DD/MM/YYYY")}</p>
                  </div>
                </div>
                <div className="info-item">
                  <div className="info-item--p">
                    <p>Email:</p>
                    <p>{infoUser?.email}</p>
                  </div>
                </div>
                <div className="info-item">
                  <div className="info-item--p">
                    <p>Tên tài khoản:</p>
                    <p>{infoUser?.username}</p>
                  </div>
                </div>
                <div className="info-item">
                  <div className="info-item--p">
                    <p>Số điện thoại:</p>
                    <p>{infoUser?.phone}</p>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Chỉnh sủa thông tin người dùng */}
          {action === "edit" && (
            <>
              <h4 className="content-title">Chỉnh sửa thông tin cá nhân</h4>
              <Form
                form={editForm}
                onFinish={handleUpdateProfile}
                className="edit-form"
                layout="vertical"
              >
                <Form.Item
                  label="Họ và tên"
                  name="fullName"
                  rules={[{ required: true, message: "Hãy nhập họ và tên" }]}
                >
                  <Input className="edit-input" placeholder="Nhập họ và tên" />
                </Form.Item>
                <Form.Item label="Giới tính" name="gender">
                  <Radio.Group>
                    <Radio value="MALE">Nam</Radio>
                    <Radio value="FEMALE">Nữ</Radio>
                    <Radio value="OTHER">Khác</Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item
                  label="Ngày sinh"
                  name="dob"
                  rules={[
                    { required: true, message: "Vui lòng chọn ngày sinh" },
                  ]}
                >
                  <DatePicker
                    className="edit-datepicker"
                    placeholder="Chọn ngày sinh"
                  />
                </Form.Item>
                <Form.Item
                  label="Số điện thoại"
                  name="phone"
                  rules={[
                    { required: true, message: "Vui lòng nhập số điện thoại" },
                  ]}
                >
                  <Input
                    className="edit-input"
                    placeholder="Nhập số điện thoại"
                  />
                </Form.Item>

                <Form.Item
                  label="Ảnh đại diện"
                  name="avatar"
                  valuePropName="fileList"
                  getValueFromEvent={(e) => e && e.fileList}
                >
                  <Upload
                    listType="picture"
                    maxCount={1}
                    beforeUpload={() => false} // Ngăn chặn upload tự động
                  >
                    <Button>Chọn ảnh</Button>
                  </Upload>
                </Form.Item>

                <Form.Item label="Email" name="email">
                  <Input className="edit-input" disabled />
                </Form.Item>
                <Form.Item label="Tên tài khoản" name="username">
                  <Input className="edit-input" disabled />
                </Form.Item>
                <Form.Item className="form-buttons">
                  <Space>
                    <Button
                      onClick={() => editForm.resetFields()}
                      className="cancel-button"
                    >
                      Hủy
                    </Button>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="submit-button"
                    >
                      Xác nhận
                    </Button>
                  </Space>
                </Form.Item>
              </Form>
            </>
          )}

          {/* Đổi mật khẩu */}
          {action === "changePassword" && (
            <>
              <h4 className="content-title">Đổi mật khẩu</h4>
              <Form
                form={passwordForm}
                onFinish={handleChangePassword}
                className="edit-form"
                layout="vertical"
              >
                <Form.Item
                  id="change-password-form"
                  label="Nhập mật khẩu cũ"
                  name="oldPassword"
                  rules={[{ required: true, message: "Hãy nhập mật khẩu cũ" }]}
                >
                  <Input.Password className="edit-input" />
                </Form.Item>
                <Form.Item
                  label="Nhập mật khẩu mới"
                  name="newPassword"
                  rules={[{ required: true, message: "Hãy nhập mật khẩu mới" }]}
                >
                  <Input.Password className="edit-input" />
                </Form.Item>
                <Form.Item
                  label="Xác nhận mật khẩu"
                  name="confirmPassword"
                  dependencies={["newPassword"]}
                  rules={[
                    { required: true, message: "Hãy xác nhận mật khẩu" },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("newPassword") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("Mật khẩu mới không khớp!")
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password className="edit-input" />
                </Form.Item>
                <Form.Item className="form-buttons">
                  <Space>
                    <Button
                      onClick={() => passwordForm.resetFields()}
                      className="cancel-button"
                    >
                      Hủy
                    </Button>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="submit-button"
                    >
                      Xác nhận
                    </Button>
                  </Space>
                </Form.Item>
              </Form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
