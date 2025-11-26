#### Dự án này được làm bằng React + JS

- Các thư viện bổ trợ
- [x] Icon: react-icons;
- [x] Package manager: npm
- [x] Thư viện ui: antd

# HIT Networks

Website chia sẻ thông tin của **HIT Network**: sự kiện, bài viết tuyển dụng.  
Phát triển bằng **ReactJS + JavaScript**, UI trực quan với **Ant Design**.

## I. Develop

1. Yêu cầu: [NodeJS](https://nodejs.org/en/download/package-manager/current) (version >= 18)

2. Tải dependencies:

```bash
# npm
npm install
```

3. Chạy server ở `http://localhost:5174`:

```bash
# npm
npm run dev
```

4. Các extensions:

- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) - Check code formatting

## II. Features

```

root
├── public <-> Chứa các file public
├── src
│ ├── assets <-> Chứa các static asset
| ├── apis <-> Chứa các api
| ├── common <-> Chứa các thành phần chung header, footer
│ ├── components <-> Chứa tất cả các React components
│ ├── constants <-> Chứa tất cả các hằng / magic numbers, enum của dự án
│ ├── hooks
│ ├── layouts <-> Chứa tất cả các Layout
│ ├── middleware <-> Chứa các route middleware
│ ├── pages <-> Chứa các trang của ứng dụng
│ ├── store
│ ├── styles
| | ├── \_index.scss <-> Import file
│ │ ├── \_base.scss <-> Reset lại web
│ │ ├── \_mixis.scss <-> Define scss mixin
│ │ └── \_variables.scss <-> Define biến scss
│ ├── utils <-> Chứa các hàm util
│ ├── App.jsx <-> Component chính của ứng dụng
| ├── App.scss <-> Component chính của ứng dụng
| ├── index.scss <-> Component chính của ứng dụng
│ └── main.jsx <-> Điểm khởi đầu của ứng dụng, nơi render component gốc vào DOM.
├── .env <-> Biến mỗi trường khi phát triển/xây dựng
├── .env.example <-> Biến mỗi trường khi phát triển/xây dựng
├── .gitignore
├── .Dockerfile
├── vite.config.js <-> Chứa cấu hình của Vite
├── eslint.config.js
├── index.html
├── nginx.conf
├── package.json <-> Chứa dependencies và script của ứng dụng
├── package-lock.json <-> Chứa dependencies và script của ứng dụng
└── vite.config.js

```

### III. Các tính năng

1. Framework: [ReactJS + JS](https://react.dev/)
2. Style: [Scss](https://sass-lang.com/)
3. UI library [Ant design](https://ant.design/components/overview/),
4. Icon: [React icon](https://react-icons.github.io/react-icons/) , [Bootstrap icon](https://icons.getbootstrap.com/)
5. Code Formatter: [Prettier](https://prettier.io/)
