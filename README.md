🚗 Peer-to-Peer Car Rental Platform (MERN)

📌 Overview

This is a peer-to-peer car rental platform built using the MERN stack, where users can:
	•	List their own cars and earn money
	•	Book cars listed by other users
	•	Manage bookings with real-world ride lifecycle logic
	•	Receive email notifications for every booking action

The project focuses heavily on backend architecture, authentication, business logic, and production-style workflows, rather than only UI.
✨ Core Features

👤 Authentication & Security
	•	User signup & login
	•	JWT-based authentication
	•	Access token (15 minutes expiry)
	•	Refresh token mechanism
	•	Secure re-login flow when refresh token expires
	•	Axios interceptor for silent access-token refresh
	•	Protected APIs
	•	Backend restricted to authorized frontend using CORS

⸻

🚘 Car Listing & Booking System
	•	Any authenticated user can:
	•	List their car for rent
	•	Edit car details (price, location, availability)
	•	Upload multiple car images using Cloudinary
	•	Cloudinary image URLs stored securely in MongoDB
	•	Only car owners can update or manage their listings

⸻

🔄 Booking Lifecycle Management

Car owners can fully manage booking requests:
	•	Confirm booking
	•	Cancel booking
	•	Mark booking as Completed
	•	Toggle car availability
	•	Manage Pending / Confirmed / Cancelled / Completed booking states

All actions are securely validated on the backend.

⸻

💰 Monthly Earnings Calculation
	•	Users can view their monthly earnings
	•	Earnings are calculated based on:
	•	Completed rides only
	•	Helps car owners track income over time
	•	Backend-driven calculation (not frontend guesswork)

⸻

📍 Location Handling
	•	Car location is fetched using a location API
	•	Location data stored in the database
	•	Used to show pickup locations on frontend

⸻

📧 Email Notifications (SMTP)

Email notifications implemented using Nodemailer (SMTP):

Emails sent for:
	•	New booking created (sent to user + car owner)
	•	Booking confirmation
	•	Booking cancellation
	•	Booking completion

Email contains:
	•	Booking details
	•	User details
	•	Car information
	•	Booking status updates

This ensures real-world communication flow between users and car owners.

⸻

🧠 Backend Architecture
	•	Monorepo structure (frontend + backend)
	•	MVC-based backend
	•	Centralized custom error handling utility
	•	Custom error messages returned to frontend
	•	Async error handling middleware
	•	Environment-based configuration

⸻

🗄️ Database Design

MongoDB with Mongoose schemas for:
	•	Users
	•	Cars
	•	Bookings
	•	Earnings tracking

Relationships are enforced at the backend level.

⸻

🛠️ Tech Stack

Frontend
	•	React
	•	Axios
	•	React Router
	•	Axios interceptors for token refresh

Backend
	•	Node.js
	•	Express.js
	•	MongoDB
	•	Mongoose
	•	JWT (Access & Refresh Tokens)
	•	Cloudinary (image uploads)
	•	Nodemailer (SMTP)
	•	Custom error handling
	•	CORS configuration

📂 Project Structure (Monorepo)
car-rental-mern-app/
│
├── frontend/
│   ├── src/
│   └── ...
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── utils/
│   │   └── errorHandler.js
│   ├── server.js
│   └── ...
│
├── .env.example
└── README.md

🔐 Authentication Flow (High Level)
	1.	User logs in → receives access token + refresh token
	2.	Access token expires after 15 minutes
	3.	Axios interceptor automatically requests a new access token
	4.	If refresh token expires → user must log in again
	5.	All protected routes validate access tokens

⸻

🌐 Live Demo

Frontend: (to be added after deployment)
Backend API: (to be added after deployment)

⚙️ Environment Variables

Create a .env file inside the backend folder:

PORT=5000
MONGO_URI=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
CLIENT_URL=your_frontend_url
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
SMTP_EMAIL=your_email
SMTP_PASSWORD=your_email_password

▶️ How to Run Locally

Backend
cd backend
npm install
npm run dev

Frontend
cd frontend
npm install
npm start

🚀 Future Enhancements
	•	Payment gateway integration
	•	Admin dashboard
	•	Ratings & reviews
	•	Advanced availability calendar
	•	Automated testing

⸻

👨‍💻 Author

Kamal Pandey
Backend-focused MERN Developer

