# 🛍️ ShopHub - Premium E-Commerce Platform

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-008CDD?style=for-the-badge&logo=stripe&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

**A modern, full-stack e-commerce web application built with Node.js, Express, and MongoDB**

[Live Demo](#) • [Features](#-features) • [Tech Stack](#-tech-stack) • [Installation](#-installation)

</div>

---

## 📋 Overview

ShopHub is a feature-rich online shopping platform that provides a seamless shopping experience with secure payment processing, user authentication, and an intuitive admin panel. Built with modern web technologies and deployed on Vercel with MongoDB Atlas.

## ✨ Features

### 🛒 Customer Features
- **Browse Products** - Explore 25+ products across 5 categories (Electronics, Fashion, Sports, Beauty, Books)
- **Advanced Filtering** - Filter products by category with pagination support
- **Product Details** - View comprehensive product information with high-quality images
- **Shopping Cart** - Add, update, and remove items from cart
- **Secure Checkout** - Integrated Stripe payment gateway for secure transactions
- **Order Management** - View order history and download professional PDF invoices
- **User Authentication** - Secure signup/login with password encryption (bcrypt)
- **Session Management** - Persistent cart and user sessions

### 👤 User Experience
- **Responsive Design** - Mobile-friendly interface with modern gradient UI
- **About Page** - Learn about the company mission and values
- **Intuitive Navigation** - Clean header with easy access to all sections
- **Professional Invoices** - Beautifully designed PDF invoices with company branding

### 🔐 Security Features
- **CSRF Protection** - Cross-Site Request Forgery protection
- **Password Encryption** - Secure password hashing with bcryptjs
- **Session Security** - MongoDB session store with secure cookies
- **Input Validation** - Server-side validation with express-validator
- **Helmet Security** - HTTP headers security middleware

## 🚀 Tech Stack

### Backend
- **Runtime:** Node.js v22.21.1
- **Framework:** Express.js v4.17.1
- **Database:** MongoDB with Mongoose ODM
- **Session Store:** connect-mongodb-session
- **Authentication:** bcryptjs
- **Payment:** Stripe API
- **PDF Generation:** PDFKit
- **Validation:** express-validator

### Frontend
- **Template Engine:** EJS (Embedded JavaScript)
- **Styling:** Custom CSS3 with Gradient Design
- **Images:** Unsplash CDN

### DevOps & Deployment
- **Hosting:** Vercel (Serverless)
- **Database:** MongoDB Atlas (Cloud)
- **Version Control:** Git & GitHub
- **Environment:** dotenv for configuration

### Middleware & Utilities
- **Compression:** Response compression for faster loading
- **Logging:** Morgan for HTTP request logging
- **File Upload:** Multer for image handling
- **Flash Messages:** connect-flash for user notifications

## 📦 Installation

### Prerequisites
- Node.js v14+ installed
- MongoDB Atlas account (or local MongoDB)
- Stripe account (test keys)
- Git

### Local Setup

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/premium-shopping-website.git
cd premium-shopping-website
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**

Create a `.env` file in the root directory:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/shopping_db
STRIPE_KEY=sk_test_your_stripe_secret_key
STRIPE_PUBLIC_KEY=pk_test_your_stripe_public_key
SESSION_SECRET=your_random_secret_string
PORT=3000
NODE_ENV=development
```

4. **Seed the database** (optional)
```bash
node reseed.js
node update-products.js
```

5. **Start the server**
```bash
npm start
```

6. **Access the application**
```
http://localhost:3000
```

## 🌐 Deployment (Vercel)

### Deploy to Vercel

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Login to Vercel**
```bash
vercel login
```

3. **Deploy**
```bash
vercel --prod
```

4. **Configure Environment Variables**

In Vercel Dashboard, add:
- `MONGODB_URI` - Your MongoDB Atlas connection string
- `STRIPE_KEY` - Stripe secret key
- `STRIPE_PUBLIC_KEY` - Stripe publishable key
- `SESSION_SECRET` - Random secret string
- `NODE_ENV` - `production`

### Database Setup

1. Create MongoDB Atlas cluster (free tier available)
2. Whitelist all IPs: `0.0.0.0/0`
3. Get connection string
4. Seed database from local machine:
```bash
node reseed.js
node update-products.js
```

## 📂 Project Structure

```
premium-shopping-website/
├── controllers/          # Request handlers
│   ├── shop.js          # Shop and cart logic
│   ├── auth.js          # Authentication logic
│   └── error.js         # Error handlers
├── models/              # Mongoose schemas
│   ├── product.js       # Product model
│   ├── user.js          # User model
│   └── order.js         # Order model
├── routes/              # Express routes
│   ├── shop.js          # Shop routes
│   ├── auth.js          # Auth routes
│   └── admin.js         # Admin routes
├── views/               # EJS templates
│   ├── shop/            # Shop pages
│   ├── auth/            # Login/signup pages
│   ├── admin/           # Admin pages
│   └── includes/        # Reusable components
├── public/              # Static assets
│   ├── css/             # Stylesheets
│   └── js/              # Client-side scripts
├── middleware/          # Custom middleware
│   └── is-auth.js       # Authentication middleware
├── data/                # Data storage
│   └── invoices/        # Generated invoices
├── app.js               # Express app setup
├── package.json         # Dependencies
├── vercel.json          # Vercel configuration
└── .env                 # Environment variables
```

## 🎨 Features Showcase

### Product Catalog
- 25 professionally curated products
- 5 categories: Electronics, Fashion, Sports, Beauty, Books
- High-quality Unsplash images
- Detailed product descriptions

### Payment Integration
- Stripe checkout with test mode
- Secure payment processing
- Order confirmation
- Invoice generation

### Admin Panel
- Product management (CRUD operations)
- View all products
- Edit product details

## 🔧 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGODB_URI` | MongoDB connection string | ✅ Yes |
| `STRIPE_KEY` | Stripe secret key | ✅ Yes |
| `STRIPE_PUBLIC_KEY` | Stripe publishable key | ✅ Yes |
| `SESSION_SECRET` | Session encryption secret | ✅ Yes |
| `PORT` | Server port (default: 3000) | ❌ No |
| `NODE_ENV` | Environment (development/production) | ❌ No |

## 🧪 Testing

### Test Stripe Payments

Use these test card numbers:

| Card Number | Result |
|-------------|--------|
| `4242 4242 4242 4242` | Success |
| `4000 0000 0000 9995` | Declined |

- Expiry: Any future date
- CVC: Any 3 digits
- ZIP: Any 5 digits

## 📸 Screenshots

### Homepage
Modern gradient design with featured products and intuitive navigation

### Product Listing
Grid layout with filtering, pagination, and responsive design

### Shopping Cart
Real-time cart updates with quantity management

### Checkout
Secure Stripe payment integration with professional UI

### Invoice
Professionally designed PDF invoices with branding

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Your Name**

- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your Name](https://linkedin.com/in/yourprofile)
- Email: your.email@example.com

## 🙏 Acknowledgments

- [Unsplash](https://unsplash.com) for product images
- [Stripe](https://stripe.com) for payment processing
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for database hosting
- [Vercel](https://vercel.com) for deployment platform

---

<div align="center">

### ⭐ Star this repository if you found it helpful!

**Made with ❤️ and ☕**

</div>


