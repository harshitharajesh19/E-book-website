#  E-Book Exchange Website

## Project Overview
This is a **full-stack** e-book exchange platform that allows users to **buy, sell, and exchange e-books**. Users can upload e-books, add them to their cart, and download them after purchase. The platform also features **user authentication (registration & login)**, a cart system, a profile page, and a checkout process.

## Tech Stack
**Frontend:**
- HTML
- CSS
- JavaScript
- Bootstrap

**Backend:**
- Node.js
- Express.js
- MySQL
- TypeORM

## Features
**User Authentication:** Registration & login without middleware.
**Cart System:** Users can add e-books to a cart before downloading.
**Checkout Page:** Allows users to finalize their purchases.
**User Profile Page:** Users can view and update their profile information.
**MySQL Database Integration:** Stores user, e-book, and cart data.
**Secure & Scalable Backend:** Built with Node.js and Express.js.

## Installation & Setup
### Clone the Repository
```sh
git clone https://github.com/yourusername/ebook-exchange.git
cd ebook-exchange
```

### Install Dependencies
Navigate to the backend and frontend directories and install the required dependencies:
```sh
cd backend
npm install
```

```sh
cd frontend
npm install
```

### Set Up MySQL Database
- Create a new MySQL database (`e-book`)
- Update **`database.js`** with your MySQL credentials.
- Run the project, and it will auto-create necessary tables.

### Start the Server
```sh
cd backend
node index.js
```

### Run the Frontend
Simply open the HTML files in a browser or set up a simple server.

### API Endpoints
### User Authentication
- `POST /api/users` - Register a new user
- `POST /api/users/login` - Login user

### E-Book Management
- `POST /api/ebooks/upload` - Upload an e-book
- `GET /api/ebooks` - Fetch all e-books
- `GET /api/ebooks/download/:id` - Download e-book by ID

### Cart & Checkout
- `POST /api/cart/add` - Add e-book to cart
- `GET /api/cart/:userId` - View cart items
- `DELETE /api/cart/remove/:cartItemId` - Remove e-book from cart
- `POST /api/checkout` - Checkout process

## Future Enhancements
**Search & Filter System** for e-books.
**Book Recommendations** based on user preferences.
**Ratings & Reviews** for e-books.
**Profile Management Enhancements**.

## Contributing
Feel free to fork the repository and submit pull requests with improvements!

## License
This project is open-source under the **MIT License**.

---

**Author:** M.Harshitha  
**GitHub:** [harshitharajesh19](https://github.com/harshitharajesh19)

