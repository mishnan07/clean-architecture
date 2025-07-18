# Clean Architecture Node.js + Express.js API

A RESTful API built with Node.js, Express.js, and MongoDB following Clean Architecture principles.

## Features

### User Features
- User registration with JWT token
- User login with authentication middleware
- Get user profile/details
- Add/edit/delete/list bank details
- View product list

### Admin Features
- Admin registration (separate model and table)
- Admin login with separate token & middleware
- Add/edit/delete/list products
- View user list or individual user details

## Architecture

```
src/
├── domain/entities/     # Business entities
├── usecases/           # Application business logic
├── controllers/        # Interface adapters
├── repositories/       # Data access layer
├── infrastructure/     # External frameworks & DB
├── routes/            # API routes
├── middlewares/       # Express middlewares
├── models/            # Mongoose models
├── schemas/           # Validation schemas
└── services/          # External services
```

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
```

3. Start MongoDB (make sure MongoDB is running)

4. Seed the admin user:
```bash
npm run seed:admin
```

5. Start the server:
```bash
npm run dev
```

## API Endpoints

### User Routes
- `POST /api/users/register` - User registration
- `POST /api/users/login` - User login
- `GET /api/users/profile` - Get user profile (protected)
- `POST /api/users/bank-details` - Add bank details (protected)
- `GET /api/users/bank-details` - Get user bank details (protected)
- `PUT /api/users/bank-details/:id` - Update bank details (protected)
- `DELETE /api/users/bank-details/:id` - Delete bank details (protected)

### Admin Routes
- `POST /api/admin/register` - Admin registration
- `POST /api/admin/login` - Admin login
- `POST /api/admin/products` - Create product (protected)
- `GET /api/admin/products` - Get all products (protected)
- `PUT /api/admin/products/:id` - Update product (protected)
- `DELETE /api/admin/products/:id` - Delete product (protected)

### Public Routes
- `GET /api/products` - Get all products (public)
- `GET /api/products/:id` - Get product by ID (public)

## Default Admin Credentials
- Email: admin@example.com
- Password: admin123

## Authentication

The API uses JWT tokens with separate authentication for users and admins:
- User tokens have `type: 'user'`
- Admin tokens have `type: 'admin'`

Include the token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```