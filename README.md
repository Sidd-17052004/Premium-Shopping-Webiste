# Premium Shopping Website

A full-featured e-commerce web application built with Node.js, Express, and EJS templating. This project provides a complete online shopping experience, including user authentication, product management, cart, and order processing.

## Features

- **User Authentication**: Signup, login, password reset, and session management.
- **Product Management**: Admins can add, edit, and delete products.
- **Shopping Cart**: Users can add products to their cart and manage quantities.
- **Order Processing**: Users can place orders and view their order history.
- **Admin Panel**: Separate views for admins to manage products.
- **Error Handling**: Custom 404 and 500 error pages.
- **Responsive UI**: Styled with CSS for a modern shopping experience.

## Project Structure

```
Premium Shopping Website/
│
├── app.js                  # Main application entry point
├── controllers/            # Route controllers for business logic
│   ├── admin.js
│   ├── auth.js
│   ├── error.js
│   └── shop.js
├── middleware/
│   └── is-auth.js          # Authentication middleware
├── models/                 # Mongoose models for MongoDB
│   ├── order.js
│   ├── product.js
│   └── user.js
├── public/                 # Static assets (CSS, JS)
│   ├── css/
│   └── js/
├── routes/                 # Express route definitions
│   ├── admin.js
│   ├── auth.js
│   └── shop.js
├── utils.js                # Utility functions
├── views/                  # EJS templates for server-side rendering
│   ├── 404.ejs
│   ├── 500.ejs
│   ├── admin/
│   ├── auth/
│   ├── includes/
│   └── shop/
├── package.json
├── package-lock.json
├── Procfile                # For deployment (e.g., Heroku)
└── README.md
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [MongoDB](https://www.mongodb.com/) (local or cloud instance)

### Installation

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd Premium\ Shopping\ Website
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Set up environment variables:**
   - Create a `.env` file (if required) for sensitive data like database URI, session secrets, etc.

4. **Start MongoDB** (if running locally):
   ```
   mongod
   ```

5. **Run the application:**
   ```
   node app.js
   ```
   Or, for development with auto-reload:
   ```
   npm install -g nodemon
   nodemon app.js
   ```

6. **Visit in your browser:**
   ```
   http://localhost:3000
   ```

## Usage

- **User:** Browse products, add to cart, checkout, and view orders.
- **Admin:** Login as admin to add/edit/delete products.
- **Authentication:** Signup, login, and password reset flows are available.

## Folder Details

- **controllers/**: Handles the logic for each route (admin, auth, shop, error).
- **middleware/**: Contains authentication middleware to protect routes.
- **models/**: Mongoose schemas for products, users, and orders.
- **routes/**: Express route definitions for admin, auth, and shop.
- **public/**: Static files (CSS for styling, JS for client-side scripts).
- **views/**: EJS templates for rendering HTML pages.

## Deployment

- The included `Procfile` allows easy deployment to platforms like Heroku.
- Ensure environment variables are set for production (e.g., database URI, session secrets).

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](LICENSE) (or specify your license)

---

**Note:**  
- Update the repository URL and license section as per your project.
- Add any additional setup steps (like environment variables) if your codebase requires them.
# Premium Shopping Website

A full-featured e-commerce web application built with Node.js, Express, and EJS templating. This project provides a complete online shopping experience, including user authentication, product management, cart, and order processing.

## Features

- **User Authentication**: Signup, login, password reset, and session management.
- **Product Management**: Admins can add, edit, and delete products.
- **Shopping Cart**: Users can add products to their cart and manage quantities.
- **Order Processing**: Users can place orders and view their order history.
- **Admin Panel**: Separate views for admins to manage products.
- **Error Handling**: Custom 404 and 500 error pages.
- **Responsive UI**: Styled with CSS for a modern shopping experience.

## Project Structure

```
Premium Shopping Website/
│
├── app.js                  # Main application entry point
├── controllers/            # Route controllers for business logic
│   ├── admin.js
│   ├── auth.js
│   ├── error.js
│   └── shop.js
├── middleware/
│   └── is-auth.js          # Authentication middleware
├── models/                 # Mongoose models for MongoDB
│   ├── order.js
│   ├── product.js
│   └── user.js
├── public/                 # Static assets (CSS, JS)
│   ├── css/
│   └── js/
├── routes/                 # Express route definitions
│   ├── admin.js
│   ├── auth.js
│   └── shop.js
├── utils.js                # Utility functions
├── views/                  # EJS templates for server-side rendering
│   ├── 404.ejs
│   ├── 500.ejs
│   ├── admin/
│   ├── auth/
│   ├── includes/
│   └── shop/
├── package.json
├── package-lock.json
├── Procfile                # For deployment (e.g., Heroku)
└── README.md
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [MongoDB](https://www.mongodb.com/) (local or cloud instance)

### Installation

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd Premium\ Shopping\ Website
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Set up environment variables:**
   - Create a `.env` file (if required) for sensitive data like database URI, session secrets, etc.

4. **Start MongoDB** (if running locally):
   ```
   mongod
   ```

5. **Run the application:**
   ```
   node app.js
   ```
   Or, for development with auto-reload:
   ```
   npm install -g nodemon
   nodemon app.js
   ```

6. **Visit in your browser:**
   ```
   http://localhost:3000
   ```

## Usage

- **User:** Browse products, add to cart, checkout, and view orders.
- **Admin:** Login as admin to add/edit/delete products.
- **Authentication:** Signup, login, and password reset flows are available.

## Folder Details

- **controllers/**: Handles the logic for each route (admin, auth, shop, error).
- **middleware/**: Contains authentication middleware to protect routes.
- **models/**: Mongoose schemas for products, users, and orders.
- **routes/**: Express route definitions for admin, auth, and shop.
- **public/**: Static files (CSS for styling, JS for client-side scripts).
- **views/**: EJS templates for rendering HTML pages.

## Deployment

- The included `Procfile` allows easy deployment to platforms like Heroku.
- Ensure environment variables are set for production (e.g., database URI, session secrets).

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](LICENSE) (or specify your license)

---

**Note:**  
- Update the repository URL and license section as per your project.
- Add any additional setup steps (like environment variables) if your codebase requires them.
