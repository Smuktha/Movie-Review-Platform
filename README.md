# 🎬 Movie Review Platform

A full-stack movie review application where users can browse movies, post reviews, manage watchlists, and rate movies.  
Built with **React (Vite) + Redux + TailwindCSS** on the frontend, and **Node.js + Express + MongoDB** on the backend.

---

## 🚀 Features
- User authentication (JWT-based login/register)
- Browse movies and see detailed pages
- Add, edit, and delete reviews
- Star-based rating system
- Personalized user profile and watchlist
- Responsive UI with Tailwind CSS
- State management with Redux Toolkit

---

## 🛠️ Tech Stack
### Frontend
- React (Vite)
- Redux Toolkit
- Tailwind CSS
- Axios (API calls)

### Backend
- Node.js + Express
- MongoDB (Mongoose ODM)
- JWT Authentication
- Bcrypt password hashing

---

## ⚙️ Setup Instructions

### 1. Clone Repository
```bash
git clone https://github.com/your-username/movie-review-platform.git
cd movie-review-platform
````

### 2. Install Dependencies

**Backend**

```bash
cd backend
npm install
```

**Frontend**

```bash
cd ../frontend
npm install
```

---

## 🔑 Environment Variables

### Backend (`/backend/.env`)

Copy from `.env.example`:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/movies
JWT_SECRET=your_jwt_secret
```

### Frontend (`/frontend/.env`)

Copy from `.env.example`:

```
VITE_API_URL=http://localhost:5000/api
```

---

## 🗄️ Database Setup

* Make sure you have **MongoDB** installed and running locally or use a cloud service like **MongoDB Atlas**.
* The database name defaults to `movies` but can be changed in `.env`.

Optionally, seed sample data:

```bash
cd backend
node src/seed.js
```

---

## ▶️ Running the Application

**Backend (Express API)**

```bash
cd backend
npm start
```

**Frontend (React app)**

```bash
cd frontend
npm run dev
```

<img width="1280" height="604" alt="image" src="https://github.com/user-attachments/assets/c252a000-eaee-45f7-91e8-cb6ffb4062c9" />
<img width="1280" height="612" alt="image" src="https://github.com/user-attachments/assets/9028779f-646d-44c2-9f70-64cbeb441f36" />


---

## 📖 API Documentation

### Auth Routes (`/api/auth`)

* `POST /register` → Register a new user
* `POST /login` → Login and get JWT

### User Routes (`/api/users`)

* `GET /:id` → Get user profile
* `PUT /:id` → Update profile
* `GET /:id/watchlist` → Get user watchlist
* `POST /:id/watchlist` → Add to watchlist
* `DELETE /:id/watchlist/:movieId` → Remove from watchlist

### Movie Routes (`/api/movies`)

* `GET /` → Get all movies
* `GET /:id` → Get single movie with reviews
* `POST /` → Add new movie (admin/seed use)
* `POST /:id/reviews` → Add review to movie

---

## 📌 Notes & Design Decisions

* JWT tokens are stored in localStorage for simplicity (can be migrated to HttpOnly cookies for more security).
* Ratings are stored per review and aggregated in `ratings.js` utility.
* Watchlist is stored as an array of Movie IDs in the User model.
* Project structured for scalability (separate routes, models, middleware).

---

## 👨‍💻 Author

Developed by **Muktha** ✨
Feel free to contribute by opening issues or PRs!

```

---

👉 Do you want me to also **create a GitHub-ready repo structure** (with `.gitignore`, updated README, etc.) zipped so you can directly push it?
```
