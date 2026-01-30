# 🛍️ ShopHub - Premium E-Commerce Platform

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-008CDD?style=for-the-badge&logo=stripe&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

**A modern, full-stack e-commerce platform with secure payments and admin management**

</div>

---

## 📋 Overview

ShopHub is a production-ready e-commerce application featuring user authentication, shopping cart, Stripe payment integration, and professional PDF invoices. Built with Node.js and deployed on Vercel with MongoDB Atlas.

## ✨ Key Features

- 🛒 **Product Catalog** - 25+ products across 5 categories with pagination and filtering
- 💳 **Stripe Checkout** - Secure payment processing with test mode support
- 🔐 **Authentication** - User signup/login with bcrypt password encryption
- 📦 **Order Management** - View orders and download professional PDF invoices
- 🎨 **Admin Panel** - Complete product CRUD operations
- 📱 **Responsive Design** - Mobile-friendly gradient UI
- 🔒 **Security** - CSRF protection, session management, input validation

## 🚀 Tech Stack

**Backend:** Node.js v22.21.1, Express.js, MongoDB (Mongoose), Stripe API, PDFKit  
**Frontend:** EJS Templates, Custom CSS3  
**Security:** bcryptjs, Helmet, express-validator, CSRF tokens  
**Deployment:** Vercel (Serverless), MongoDB Atlas  

## 📦 Quick Start

### Installation

```bash
# Clone repository
git clone https://github.com/yourusername/premium-shopping-website.git
cd premium-shopping-website

# Install dependencies
npm install

# Create .env file
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/shopping_db
STRIPE_KEY=sk_test_your_stripe_secret_key
STRIPE_PUBLIC_KEY=pk_test_your_stripe_public_key
SESSION_SECRET=your_random_secret_string

# Seed database (optional)
node reseed.js

# Start server
npm start
```

Visit `http://localhost:3000`

### Deployment to Vercel

```bash
# Deploy
vercel --prod

# Add environment variables in Vercel Dashboard:
# MONGODB_URI, STRIPE_KEY, STRIPE_PUBLIC_KEY, SESSION_SECRET, NODE_ENV
```

## 🔧 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGODB_URI` | MongoDB connection string | ✅ |
| `STRIPE_KEY` | Stripe secret key | ✅ |
| `STRIPE_PUBLIC_KEY` | Stripe publishable key | ✅ |
| `SESSION_SECRET` | Session encryption secret | ✅ |

## 🧪 Test Payments

Use Stripe test card: `4242 4242 4242 4242` (any future date, any CVC)

## 📂 Project Structure

```
├── controllers/     # Request handlers (shop, auth, admin)
├── models/          # Mongoose schemas (user, product, order)
├── routes/          # Express routes
├── views/           # EJS templates
├── public/          # CSS and client-side JS
├── middleware/      # Authentication middleware
└── app.js           # Express app configuration
```


## 👨‍💻 Author

**Your Name**
- GitHub: [@Sidd-17052004](https://github.com/Sidd-17052004)
- LinkedIn: [Siddhesh Katkade](https://www.linkedin.com/in/siddhesh-katkade-tech-coder-ai/)
- Email: srkatkade@gmail.com

---

<div align="center">

**Built with Node.js, Express, MongoDB & Stripe** • [⭐ Star this repo](https://github.com/Sidd-17052004/premium-shopping-website)

</div>


