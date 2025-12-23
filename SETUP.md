# Nivas Constructions - Setup Guide

This guide will help you set up and run the Nivas Constructions Management System.

## Quick Start

### 1. Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

### 2. Environment Configuration

**Backend** - Create `backend/.env`:
```env
PORT=5000
MONGODB_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/nivas-constructions?retryWrites=true&w=majority
JWT_SECRET=nivas-constructions-super-secret-key-2024
NODE_ENV=development
```

**Frontend** - Create `frontend/.env`:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 3. MongoDB Setup

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up / Log in
3. Create a new cluster (Free tier is sufficient)
4. Click "Connect" → "Connect your application"
5. Copy the connection string
6. Replace `<password>` with your database password
7. Update `MONGODB_URI` in `backend/.env`

### 4. Create Admin User

Start the backend server:
```bash
cd backend
npm run dev
```

Then use Postman or curl to create admin:

**Using Postman:**
- Method: POST
- URL: http://localhost:5000/api/auth/create-admin
- Body (JSON):
```json
{
  "name": "Admin",
  "email": "admin@nivasconstructions.com",
  "password": "admin123"
}
```

**Using curl:**
```bash
curl -X POST http://localhost:5000/api/auth/create-admin \
  -H "Content-Type: application/json" \
  -d '{"name":"Admin","email":"admin@nivasconstructions.com","password":"admin123"}'
```

### 5. Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Backend runs on: http://localhost:5000

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```
Frontend runs on: http://localhost:3000

### 6. Access the Application

**Public Website:**
- Home: http://localhost:3000
- About: http://localhost:3000/about
- Services: http://localhost:3000/services
- Projects: http://localhost:3000/projects
- Contact: http://localhost:3000/contact

**Admin Panel:**
- Login: http://localhost:3000/admin/login
- Credentials:
  - Email: admin@nivasconstructions.com
  - Password: admin123

## Sample Data

After logging in as admin, add some sample data:

### Sample Service
- Title: Residential Construction
- Description: Complete residential building services including planning, design, and construction
- Status: Active

### Sample Project
- Title: Green Valley Apartments
- Description: 50-unit residential complex with modern amenities
- Location: Chennai, Tamil Nadu
- Status: Ongoing
- Start Date: 2024-01-01

## Troubleshooting

### Backend won't start
- Check if MongoDB URI is correct
- Ensure port 5000 is not in use
- Verify all dependencies are installed

### Frontend won't start
- Check if backend is running
- Verify REACT_APP_API_URL in .env
- Clear node_modules and reinstall: `rm -rf node_modules package-lock.json && npm install`

### Can't login
- Ensure admin was created successfully
- Check browser console for errors
- Verify backend API is accessible

### Database connection error
- Verify MongoDB Atlas IP whitelist (allow 0.0.0.0/0 for development)
- Check database user credentials
- Ensure connection string is correct

## Development Scripts

### Backend
```bash
npm start       # Production mode
npm run dev     # Development mode with nodemon
```

### Frontend
```bash
npm start       # Development server
npm run build   # Production build
npm test        # Run tests
```

## Next Steps

1. Add sample services in Admin → Services
2. Add sample projects in Admin → Projects
3. Test contact form submission
4. Customize content and styling
5. Add your own branding/logo
6. Deploy to production

## Production Deployment

### Backend (Render.com)
1. Push code to GitHub
2. Create new Web Service on Render
3. Connect repository
4. Add environment variables
5. Deploy

### Frontend (Vercel)
1. Push code to GitHub
2. Import project on Vercel
3. Set `REACT_APP_API_URL` to production backend URL
4. Deploy

## Support

For issues or questions:
- Check README.md
- Review error logs
- Check MongoDB Atlas connectivity

---

**Good Luck with your project! 🚀**
