#  E-Book Website

## Project Overview
A full-stack web application that enables users to upload and download **Books**, **Handwritten Notes**, **PDFs**, **Novels**, and other educational resources. This platform supports secure user registration and login, providing a personalized experience for each user.
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
### User Authentication
- User registration and login without middleware
- Session-based access control for protected routes

### Upload & Download Resources
- Upload e-books, handwritten notes, PDFs, novels, and more
- Download shared educational resources for free

### Wishlist System
- Add e-books to Wishlist to read them or download them later

### User Profile Management
- View and update user profile information
- Select gender or upload a custom profile picture
- View and delete books uploaded by the user

### Dashboard & Resource Management
- View all uploaded books on the main dashboard
- Easily browse educational materials uploaded by users by category

### Backend & Database
- MySQL integration for storing users, books, and uploads data
- Secure and scalable backend using Node.js and Express.js


## Installation & Setup
### Clone the Repository
```sh
git clone https://github.com/yourusername/ebook-Website.git
cd ebook-Website
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

## Future Enhancements
**Book Recommendations** based on user preferences.
**Ratings & Reviews** for e-books.

## Contributing
Feel free to fork the repository and submit pull requests with improvements!

## License
This project is open-source under the **MIT License**.

---

**Author:** M.Harshitha  
**GitHub:** [harshitharajesh19](https://github.com/harshitharajesh19)

