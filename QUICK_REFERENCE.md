# Nivas Constructions - Quick Reference

## 🚀 Quick Start Commands

### First Time Setup
```bash
# Backend
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI

# Frontend
cd frontend
npm install
cp .env.example .env
# Edit .env if needed
```

### Running Development Servers

**Option 1: Two Terminals**
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm start
```

**Option 2: Windows PowerShell (Single Terminal)**
```powershell
# Start both servers
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; npm run dev"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm start"
```

## 📝 Important URLs

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Admin Login**: http://localhost:3000/admin/login

## 🔑 Create Admin (First Time Only)

**Using Postman or curl:**
```bash
POST http://localhost:5000/api/auth/create-admin
Content-Type: application/json

{
  "name": "Admin",
  "email": "admin@nivasconstructions.com",
  "password": "admin123"
}
```

## 📋 Testing Checklist

### Public Website
- [ ] Home page loads correctly
- [ ] Navigate to About page
- [ ] Navigate to Services page
- [ ] Navigate to Projects page
- [ ] Navigate to Contact page
- [ ] Submit a contact form

### Admin Panel
- [ ] Login with admin credentials
- [ ] View Dashboard statistics
- [ ] Add a new service
- [ ] Edit a service
- [ ] Delete a service
- [ ] Add a new project
- [ ] Edit a project
- [ ] Delete a project
- [ ] View enquiries
- [ ] Update enquiry status
- [ ] Delete enquiry
- [ ] Logout successfully

### API Testing
- [ ] GET /api/services (public)
- [ ] GET /api/projects (public)
- [ ] POST /api/enquiries (public)
- [ ] POST /api/auth/login
- [ ] GET /api/services/admin/all (with token)
- [ ] POST /api/services (with token)
- [ ] PUT /api/services/:id (with token)
- [ ] DELETE /api/services/:id (with token)

## 🐛 Common Issues & Solutions

### Backend won't start
```bash
# Check if port 5000 is in use
netstat -ano | findstr :5000

# Kill process if needed (Windows)
taskkill /PID <PID> /F
```

### MongoDB connection failed
- Verify connection string in `.env`
- Check MongoDB Atlas IP whitelist (add 0.0.0.0/0 for dev)
- Ensure database user credentials are correct

### Frontend API calls failing
- Check `REACT_APP_API_URL` in frontend `.env`
- Ensure backend is running on port 5000
- Check browser console for CORS errors

### Can't login to admin
- Verify admin was created successfully
- Check email and password
- Clear browser cache/localStorage
- Check backend logs for errors

## 📊 Sample Data for Testing

### Sample Service 1
```json
{
  "title": "Residential Construction",
  "description": "Complete residential building services from planning to construction",
  "isActive": true
}
```

### Sample Service 2
```json
{
  "title": "Commercial Building",
  "description": "Office buildings, retail spaces, and commercial complexes",
  "isActive": true
}
```

### Sample Project 1
```json
{
  "title": "Green Valley Apartments",
  "description": "50-unit residential complex with modern amenities and eco-friendly design",
  "location": "Chennai, Tamil Nadu",
  "status": "ongoing",
  "startDate": "2024-01-15",
  "isActive": true
}
```

### Sample Project 2
```json
{
  "title": "Tech Park Phase 1",
  "description": "Modern IT park with state-of-the-art facilities",
  "location": "Bangalore, Karnataka",
  "status": "completed",
  "startDate": "2023-06-01",
  "endDate": "2024-03-01",
  "isActive": true
}
```

## 🎯 Demo Script for Viva

1. **Introduction** (2 min)
   - Project overview
   - Tech stack explanation
   - Architecture diagram

2. **Public Website Demo** (3 min)
   - Navigate through all pages
   - Show responsive design
   - Submit a contact form

3. **Admin Panel Demo** (5 min)
   - Login to admin
   - Show dashboard statistics
   - Demonstrate CRUD operations
   - Show how changes reflect on public site

4. **Code Walkthrough** (5 min)
   - Show model schemas
   - Explain authentication flow
   - Show API endpoints
   - Explain frontend-backend connection

5. **Q&A Topics to Prepare**
   - Why MERN stack?
   - How JWT works?
   - Database schema design
   - Security measures
   - Deployment process
   - Future enhancements

## 📱 Mobile Testing

1. Open DevTools (F12)
2. Click Toggle Device Toolbar (Ctrl+Shift+M)
3. Select device (iPhone, iPad, etc.)
4. Test all pages

## 🚢 Pre-Deployment Checklist

- [ ] Remove console.log statements
- [ ] Update API URLs for production
- [ ] Set strong JWT secret
- [ ] Change default admin password
- [ ] Disable create-admin endpoint
- [ ] Add proper error logging
- [ ] Set up MongoDB indexes
- [ ] Configure CORS for production domain
- [ ] Test all features in production mode
- [ ] Create backup of database

## 📞 Support

If you encounter any issues:
1. Check this quick reference
2. Review README.md
3. Check SETUP.md for detailed instructions
4. Review error logs in terminal

---

**Happy Coding! 🎉**
