# 手機商店（Phone Shop）

最小可行的手機專賣電商網站，使用 React + Tailwind CSS，純前端、無後端資料庫，商品資料為寫死的 mock data。

## 功能

- 商品列表頁：顯示手機圖片、名稱、價格、規格簡述
- 商品詳情頁：完整規格、多張圖片切換、加入購物車
- 購物車頁：增減數量、移除商品、顯示總金額
- 結帳頁：填寫姓名、地址、電話，送出後顯示「訂單已送出」（無金流串接）

不包含：會員系統、後台管理介面、多商家/多分類、金流串接、評論/收藏/推薦系統。

## 技術

- React 18 + React Router
- Tailwind CSS
- Vite

## 開發

```bash
cd phone-shop
npm install
npm run dev
```

## 建置

```bash
npm run build
npm run preview
```

## 專案結構

```
phone-shop/
├── index.html
├── src/
│   ├── main.jsx           # 進站點，掛載 Router 與 CartProvider
│   ├── App.jsx             # 路由設定
│   ├── index.css           # Tailwind 匯入
│   ├── data/
│   │   ├── products.js     # 8 支手機 mock 資料
│   │   └── placeholder.js  # 產生內嵌 SVG 佔位圖，無需外部圖床
│   ├── context/
│   │   └── CartContext.jsx # 購物車狀態（含 localStorage 持久化）
│   ├── components/
│   │   ├── Navbar.jsx
│   │   └── ProductCard.jsx
│   └── pages/
│       ├── ProductList.jsx
│       ├── ProductDetail.jsx
│       ├── Cart.jsx
│       └── Checkout.jsx
```
