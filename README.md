# MERN E-Commerce Web Application

A full-stack e-commerce web application built using the MERN stack, providing product browsing, authentication, cart and wishlist management, and order placement with persistent data storage.

## Features

* User registration and login
* JWT-based authentication
* Password hashing using bcrypt
* Product browsing and product details
* Product search, filtering, and category browsing
* Add to cart and quantity management
* Persistent cart data in MongoDB
* Wishlist management with MongoDB persistence
* Checkout with delivery details
* COD and UPI payment options
* Order creation and order history
* User-specific cart, wishlist, and orders

## Tech Stack

**Frontend:** React, Tailwind CSS, Axios
**Backend:** Node.js, Express.js
**Database:** MongoDB Atlas
**Authentication:** JWT, bcrypt
**Tools:** Git, GitHub, VS Code

## Project Structure

```text
mern-ecommerce/
├── ecommerce-frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── context/
│       ├── pages/
│       ├── assets/
│       └── data/
│
├── ecommerce-backend/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── seedProducts.js
│
└── .gitignore
```

## Backend API

The backend provides REST APIs for:

* Products
* User authentication
* Cart
* Wishlist
* Orders

Protected APIs use JWT authentication through the `Authorization` header.

## Authentication Flow

1. User registers with their details.
2. Password is securely hashed using bcrypt.
3. During login, credentials are verified.
4. The backend generates a JWT containing the authenticated user's ID.
5. The frontend sends the token with protected API requests.
6. The backend verifies the token and performs user-specific operations.

## Database

MongoDB Atlas is used to persist:

* Users
* Products
* Carts
* Wishlists
* Orders

Each user's cart, wishlist, and orders are associated with their account.

## Running the Project

### Backend

```bash
cd ecommerce-backend
npm install
npm run dev
```

Create a `.env` file inside `ecommerce-backend`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### Frontend

Open another terminal:

```bash
cd ecommerce-frontend
npm install
npm start
```

The frontend communicates with the backend through REST APIs.

## Note

The `.env` file is excluded from version control and should be created locally with your own MongoDB connection string and JWT secret.
