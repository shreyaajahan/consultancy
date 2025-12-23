# Nivas Constructions - Construction Company Management System

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) web application for managing a construction company's operations with a public website and admin dashboard.

## 📋 Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Admin Credentials](#admin-credentials)
- [Deployment](#deployment)

## ✨ Features

### Public Features
- **Home Page**: Company overview, statistics, and highlights
- **About Us**: Company vision, mission, and core values
- **Services**: Dynamic listing of construction services
- **Projects**: Browse ongoing and completed projects with filtering
- **Contact**: Submit enquiries through a contact form

### Admin Features
- **Secure Login**: JWT-based authentication
- **Dashboard**: Statistics overview (projects, services, enquiries)
- **Services Management**: CRUD operations for services
- **Projects Management**: CRUD operations for projects with status tracking
- **Enquiries Management**: View, update status, and manage customer enquiries

## 🛠 Tech Stack

### Frontend
- React.js 18
- React Router DOM 6
- Axios
- React Icons
- CSS3 (Responsive Design)

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs for password hashing
- CORS enabled

## 📁 Project Structure

```
nivas-constructions/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js     # Authentication logic
│   │   ├── enquiryController.js  # Enquiry management
│   │   ├── projectController.js  # Project management
│   │   └── serviceController.js  # Service management
│   ├── middleware/
│   │   └── auth.js               # JWT authentication middleware
│   ├── models/
│   │   ├── Admin.js              # Admin model
│   │   ├── Enquiry.js            # Enquiry model
│   │   ├── Project.js            # Project model
│   │   └── Service.js            # Service model
│   ├── routes/
│   │   ├── authRoutes.js         # Auth routes
│   │   ├── enquiryRoutes.js      # Enquiry routes
│   │   ├── projectRoutes.js      # Project routes
│   │   └── serviceRoutes.js      # Service routes
│   ├── .env.example              # Environment variables template
│   ├── package.json
│   └── server.js                 # Main server file
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── admin/
│   │   │   │   └── AdminLayout.js
│   │   │   └── public/
│   │   │       ├── Footer.js
│   │   │       ├── Header.js
│   │   │       └── Layout.js
│   │   ├── pages/
│   │   │   ├── admin/
│   │   │   │   ├── AdminEnquiries.js
│   │   │   │   ├── AdminLogin.js
│   │   │   │   ├── AdminProjects.js
│   │   │   │   ├── AdminServices.js
│   │   │   │   └── Dashboard.js
│   │   │   └── public/
│   │   │       ├── About.js
│   │   │       ├── Contact.js
│   │   │       ├── Home.js
│   │   │       ├── Projects.js
│   │   │       └── Services.js
│   │   ├── services/
│   │   │   ├── api.js            # Axios configuration
│   │   │   └── apiServices.js    # API service methods
│   │   ├── styles/               # CSS files
│   │   ├── utils/
│   │   │   └── ProtectedRoute.js # Route protection
│   │   ├── App.js                # Main app component
│   │   └── index.js              # Entry point
│   ├── .env.example
│   └── package.json
│
└── README.md
```

## 🚀 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account (or local MongoDB)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

4. Update `.env` with your configuration:
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
NODE_ENV=development
```

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

4. Update `.env`:
```
REACT_APP_API_URL=http://localhost:5000/api
```

## ⚙️ Configuration

### MongoDB Setup

1. Create a MongoDB Atlas account at https://www.mongodb.com/cloud/atlas
2. Create a new cluster
3. Create a database user
4. Get your connection string
5. Update `MONGODB_URI` in backend `.env`

### Create Admin Account

After starting the backend server, use this endpoint once to create an admin:

**POST** `http://localhost:5000/api/auth/create-admin`

```json
{
  "name": "Admin",
  "email": "admin@nivasconstructions.com",
  "password": "admin123"
}
```

**Note**: Disable this endpoint in production by removing the route or adding additional security.

## 🏃 Running the Application

### Development Mode

#### Start Backend (Terminal 1):
```bash
cd backend
npm run dev
```
Backend will run on http://localhost:5000

#### Start Frontend (Terminal 2):
```bash
cd frontend
npm start
```
Frontend will run on http://localhost:3000

### Production Mode

#### Backend:
```bash
cd backend
npm start
```

#### Frontend:
```bash
cd frontend
npm run build
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/create-admin` - Create admin (disable in production)
- `GET /api/auth/profile` - Get admin profile (protected)

### Services
- `GET /api/services` - Get all active services (public)
- `GET /api/services/:id` - Get single service (public)
- `GET /api/services/admin/all` - Get all services (protected)
- `POST /api/services` - Create service (protected)
- `PUT /api/services/:id` - Update service (protected)
- `DELETE /api/services/:id` - Delete service (protected)

### Projects
- `GET /api/projects` - Get all active projects (public)
- `GET /api/projects/:id` - Get single project (public)
- `GET /api/projects/admin/all` - Get all projects (protected)
- `POST /api/projects` - Create project (protected)
- `PUT /api/projects/:id` - Update project (protected)
- `DELETE /api/projects/:id` - Delete project (protected)

### Enquiries
- `POST /api/enquiries` - Submit enquiry (public)
- `GET /api/enquiries` - Get all enquiries (protected)
- `GET /api/enquiries/stats` - Get statistics (protected)
- `GET /api/enquiries/:id` - Get single enquiry (protected)
- `PUT /api/enquiries/:id` - Update enquiry status (protected)
- `DELETE /api/enquiries/:id` - Delete enquiry (protected)

## 🔐 Admin Credentials

**Default Admin** (after creation):
- Email: admin@nivasconstructions.com
- Password: admin123

**Admin Panel**: http://localhost:3000/admin/login

## 📦 Deployment

### Backend Deployment (Heroku/Render)

1. Create account on Render.com or Heroku
2. Create new Web Service
3. Connect your GitHub repository
4. Set environment variables
5. Deploy

### Frontend Deployment (Vercel/Netlify)

1. Create account on Vercel or Netlify
2. Connect your GitHub repository
3. Set build command: `npm run build`
4. Set publish directory: `build`
5. Add environment variable: `REACT_APP_API_URL`
6. Deploy

### Environment Variables for Production

**Backend:**
- `MONGODB_URI`: Your MongoDB Atlas connection string
- `JWT_SECRET`: Strong secret key
- `NODE_ENV`: production

**Frontend:**
- `REACT_APP_API_URL`: Your deployed backend URL

## 📝 Notes

- Change default admin credentials after first login
- Disable `/api/auth/create-admin` endpoint in production
- Use strong passwords and JWT secrets
- Enable HTTPS in production
- Set up proper CORS origins for production

## 🎓 For Academic/Viva

This project demonstrates:
- Full-stack MERN development
- RESTful API design
- JWT authentication
- CRUD operations
- State management in React
- Responsive UI design
- Database modeling
- Client-server architecture

## 📄 License

This project is for educational purposes.

## 👤 Author

Nivas Constructions Development Team

---

For any queries, contact: info@nivasconstructions.com
