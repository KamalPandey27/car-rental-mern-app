# 🚗 Car Rental MERN Stack Application

A full-stack car rental platform built with MongoDB, Express.js, React.js, and Node.js. This application allows users to browse, search, and book rental cars, while car owners can list and manage their vehicles.

![Car Rental App](https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1200&h=400&fit=crop)

## ✨ Features

### 👤 User Features

- **User Authentication** - Secure login and signup with JWT tokens
- **Browse Cars** - View all available cars with detailed information
- **Advanced Search** - Search cars by brand, model, category, transmission, fuel type, and location
- **Car Details** - View complete car specifications and pricing
- **Book Cars** - Select pickup/return dates and locations
- **My Bookings** - View and manage all booking history
- **Password Recovery** - Reset password via email OTP

### 🏢 Owner Features

- **Owner Dashboard** - Dedicated dashboard for car owners
- **Add New Cars** - List new cars with images and specifications
- **Manage Cars** - Edit, update, or delist cars
- **Manage Bookings** - View and manage bookings for owned cars
- **Booking Status** - Confirm or cancel bookings

### ⚙️ Technical Features

- **Responsive Design** - Mobile-first design using Tailwind CSS
- **Image Upload** - Cloudinary integration for image storage
- **Email Notifications** - OTP and booking confirmations via email
- **RESTful API** - Well-structured backend API
- **Real-time Updates** - Toast notifications for user feedback

## 🛠️ Tech Stack

### Frontend

- **React 19** - Modern React with hooks
- **React Router v7** - Client-side routing
- **Tailwind CSS v4** - Utility-first CSS framework
- **Axios** - HTTP client for API requests
- **React Toastify** - Toast notifications
- **Vite** - Next-generation frontend tooling

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Token-based authentication
- **Bcrypt** - Password hashing
- **Cloudinary** - Cloud image storage
- **Nodemailer** - Email sending

## 📁 Project Structure

```
car-rental-mern-app/
├── Backend/
│   ├── src/
│   │   ├── controllers/     # Route handlers
│   │   ├── middleware/      # Auth & file upload middleware
│   │   ├── models/          # Mongoose schemas
│   │   ├── routes/          # API routes
│   │   ├── utils/           # Helper utilities
│   │   ├── app.js          # Express app configuration
│   │   ├── index.js         # Server entry point
│   │   └── db/             # Database connection
│   └── package.json
├── Frontend/
│   ├── src/
│   │   ├── api/            # Axios configuration
│   │   ├── assets/         # Images and icons
│   │   ├── components/     # Reusable UI components
│   │   ├── context/        # React context providers
│   │   ├── pages/          # Page components
│   │   ├── App.jsx         # Main app component
│   │   └── main.jsx        # Entry point
│   └── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- Cloudinary account (for image upload)
- Brevo/SendGrid account (for emails)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/KamalPandey27/car-rental-mern-app.git
   cd car-rental-mern-app
   ```

2. **Setup Backend**

   ```bash
   cd Backend
   npm install
   ```

3. **Setup Frontend**

   ```bash
   cd Frontend
   npm install
   ```

4. **Configure Environment Variables**

   Create `.env` file in Backend directory:

   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   ACCESS_TOKEN_SECRET=your_access_token_secret
   REFRESH_TOKEN_SECRET=your_refresh_token_secret
   ACCESS_TOKEN_EXPIRY=1d
   REFRESH_TOKEN_EXPIRY=7d
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   EMAIL_SERVICE=brevo
   EMAIL_API_KEY=your_email_api_key
   EMAIL_FROM_EMAIL=your_email@gmail.com
   ```

5. **Start Development Servers**

   Terminal 1 (Backend):

   ```bash
   cd Backend
   npm run dev
   ```

   Terminal 2 (Frontend):

   ```bash
   cd Frontend
   npm run dev
   ```

6. **Access the Application**
   - Frontend: https://car-rental-mern-app-vert.vercel.app/
   - Backend API: https://car-rental-mern-app.onrender.com

## 📱 Pages & Routes

### User Pages

| Route              | Description                  |
| ------------------ | ---------------------------- |
| `/`                | Home page with featured cars |
| `/cars`            | Browse all available cars    |
| `/car-details/:id` | View car details             |
| `/mybookings`      | User's booking history       |
| `/payment`         | Payment processing           |

### Owner Pages

| Route                    | Description                    |
| ------------------------ | ------------------------------ |
| `/owner`                 | Owner dashboard overview       |
| `/owner/add-car`         | Add new car listing            |
| `/owner/manage-cars`     | Manage owned cars              |
| `/owner/manage-bookings` | Manage bookings for owned cars |

## 🔐 API Endpoints

### Authentication

| Method | Endpoint                        | Description            |
| ------ | ------------------------------- | ---------------------- |
| POST   | `/api/v1/users/register`        | Register new user      |
| POST   | `/api/v1/users/login`           | User login             |
| POST   | `/api/v1/users/logout`          | User logout            |
| POST   | `/api/v1/users/forgot-password` | Request password reset |
| PUT    | `/api/v1/users/reset-password`  | Reset password         |

### Cars

| Method | Endpoint           | Description         |
| ------ | ------------------ | ------------------- |
| GET    | `/api/v1/cars`     | Get all cars        |
| GET    | `/api/v1/cars/:id` | Get car by ID       |
| POST   | `/api/v1/cars`     | Add new car (owner) |
| PUT    | `/api/v1/cars/:id` | Update car (owner)  |
| DELETE | `/api/v1/cars/:id` | Delete car (owner)  |

### Bookings

| Method | Endpoint               | Description           |
| ------ | ---------------------- | --------------------- |
| POST   | `/api/v1/bookings`     | Create booking        |
| GET    | `/api/v1/bookings`     | Get all bookings      |
| GET    | `/api/v1/bookings/:id` | Get booking by ID     |
| PUT    | `/api/v1/bookings/:id` | Update booking status |

## 🎨 UI Components

- **CarCard** - Car listing card with image and basic info
- **CarDetails** - Detailed car view with specifications
- **Hero** - Homepage hero section with call-to-action
- **Navbar** - Navigation with user/owner menu
- **Footer** - Site footer with links
- **PaymentPage** - Payment processing interface
- **UserMenu** - User dropdown menu
- **SideBarOwner** - Owner dashboard sidebar

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Protected routes with auth middleware
- CORS configuration
- Secure cookie handling
- Input validation and sanitization

## 📦 Key Dependencies

### Backend

| Package      | Purpose                       |
| ------------ | ----------------------------- |
| express      | Web framework                 |
| mongoose     | MongoDB ORM                   |
| jsonwebtoken | JWT tokens                    |
| bcrypt       | Password hashing              |
| cloudinary   | Image storage                 |
| nodemailer   | Email sending                 |
| multer       | File upload                   |
| cors         | Cross-origin resource sharing |
| dotenv       | Environment variables         |

### Frontend

| Package          | Purpose         |
| ---------------- | --------------- |
| react            | UI library      |
| react-router-dom | Routing         |
| axios            | HTTP client     |
| tailwindcss      | Styling         |
| react-toastify   | Notifications   |
| react-select     | Select dropdown |
| vite             | Build tool      |

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Kamal**

- GitHub: [@KamalPandey27](https://github.com/KamalPandey27)

## 🙏 Acknowledgments

- [Unsplash](https://unsplash.com) for car images
- [Cloudinary](https://cloudinary.com) for image hosting
- [Tailwind CSS](https://tailwindcss.com) for styling

---

**⭐ If you found this project helpful, please give it a star!**
