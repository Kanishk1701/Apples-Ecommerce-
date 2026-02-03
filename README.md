🍎 Apples — Minimalist E-Commerce Platform

A full-stack dummy e-commerce platform inspired by modern online marketplaces, built completely from scratch.

Products are dummy, but everything else is real:
authentication, cart, orders, APIs, admin panel, and payment simulation.

This project is designed as a portfolio-grade system demonstrating real-world backend + frontend engineering.

🚀 Project Vision

Apples aims to replicate core e-commerce functionality with:

Elegant minimalist UI

Custom REST APIs

Authentication & authorization

Cart + checkout flow

Dummy payment gateway

Admin product management

Order tracking

Built for learning, practice, and showcasing production-style architecture.

🧱 Tech Stack
Frontend

Next.js (App Router)

React

Tailwind CSS

Zustand / Context API

Axios

Backend

Node.js

Express

MongoDB + Mongoose

JWT Authentication

Dev Tools

VS Code / AI IDE

Postman

MongoDB Compass

Git + GitHub

📁 Folder Structure
apples/
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── lib/
│   └── styles/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   └── server.js
│
└── README.md

🧭 Development Roadmap

We build in phases.

DO NOT jump ahead.

✅ Phase 0 — Planning (Week 1)
Features

User Auth

Products

Cart

Checkout

Dummy Payment

Orders

Admin Dashboard

Data Models

User

Product

Cart

Order

✅ Phase 1 — Backend Foundation
Goals

Express server

MongoDB connection

JWT auth

User register/login

Product CRUD APIs

APIs
POST /api/auth/register
POST /api/auth/login
GET  /api/products
POST /api/products (admin)

AI IDE Prompt
Create Express backend with MongoDB using Mongoose.
Add JWT auth middleware.
Create User and Product models.
Add login/register routes.

✅ Phase 2 — Frontend Foundation
Goals

Next.js setup

Tailwind

Layout

Auth pages

Product listing

Pages

/

/login

/register

/products

✅ Phase 3 — Cart System
Features

Add to cart

Remove

Quantity update

Persist cart per user

Backend:

POST /api/cart
GET /api/cart
DELETE /api/cart/:id

✅ Phase 4 — Checkout + Dummy Payment
Flow

Cart → Address → Payment → Order Created

Dummy gateway:

Fake card number

Random success/failure

Payment status saved

✅ Phase 5 — Orders

Place order

Order history

Order detail page

✅ Phase 6 — Admin Panel

Admin can:

Add products

Edit products

Delete products

View orders

Routes:

/admin/dashboard
/admin/products
/admin/orders

✅ Phase 7 — UI Polish

Minimal design

Animations

Skeleton loaders

Mobile responsive

🔐 Authentication

JWT stored in HTTP-only cookies

Protected routes

Admin role flag

💳 Dummy Payment Logic

No real gateway.

Process:

User clicks Pay

Frontend sends /api/payment

Backend randomly returns success/failure

If success → Order created

🧪 Testing

Postman for APIs

Manual UI testing

Console logging

MongoDB Compass

🌱 Environment Variables

Backend .env

MONGO_URI=
JWT_SECRET=
PORT=5000


Frontend .env.local

NEXT_PUBLIC_API_URL=http://localhost:5000

▶️ Run Project
Backend
cd backend
npm install
npm run dev

Frontend
cd frontend
npm install
npm run dev

📦 Future Improvements

Search

Filters

Pagination

Reviews

Image upload

Redis caching

🎯 Purpose

Apples is built to demonstrate:

REST API design

Authentication systems

Full-stack integration

Real e-commerce workflows

Clean UI engineering

👨‍💻 Author

Kanishk Pandey