# Express TypeScript REST API

A REST API built with Node.js, Express, TypeScript and MongoDB.

## Tech Stack
- Node.js + Express
- TypeScript
- MongoDB + Mongoose
- JWT Authentication
- Bcrypt
- Cookie Parser

## Getting Started

### 1. Clone the repo
git clone https://github.com/abhibanker06/node-ts-api.git
cd node-ts-api

### 2. Install dependencies
npm install

### 3. Setup environment variables
cp .env.example .env

Fill in the values in `.env`:
- `PORT` - port to run the server on
- `MONGO_URI` - your MongoDB connection string
- `JWT_SECRET` - any random secret string
- `HOST_URL` - your frontend URL

### 4. Run the server
npm run dev

## API Routes

### Books
- GET `/books/get-books` - get all books
- POST `/books/add-books` - add a book (protected, creator only)
- PUT `/books/update-books/:id` - update a book (protected, creator only)
- DELETE `/books/delete-book/:id` - delete a book

### Users
- GET `/users/get-users` - get all users
- POST `/users/register` - register a user
- POST `/users/login` - login a user
- POST `/users/logout` - logout a user
