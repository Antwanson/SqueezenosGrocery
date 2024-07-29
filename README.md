# Squeezenos Grocery

This is the server-side application for Squeezenos Grocery, providing API endpoints for managing items, orders, discounts, and users.

## Prerequisites

- Node.js (v14 or later)
- npm
- MySQL database

## Getting Started

1. Clone the repository:
   ```
   git clone <repository-url>
   cd SqueezenosGrocery/server
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following variables:
   ```
   PORT=3000
   DB_HOST=your_database_host
   DB_USER=your_database_user
   DB_PASSWORD=your_database_password
   DB_NAME=your_database_name
   ```

4. Start the server:
   ```
   node app.js
   ```

The server will start running on `http://localhost:3000` (or the port specified in your `.env` file).

## API Endpoints

- Items: `/api/items`
- Orders: `/api/orders`
- Discounts: `/api/discounts`
- Users: `/api/users`
