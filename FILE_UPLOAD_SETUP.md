# File Upload Implementation - Setup Instructions

## Overview
The project now supports file uploads for project images instead of URLs. This allows users to upload images directly from their computer.

## Changes Made

### Frontend (React)
- **AdminProjects.js**: Updated form to use file input instead of URL input
  - File preview functionality added
  - FormData is used for multipart requests
  - Form state now includes `image` and `imagePreview` fields

- **AdminProjects.css**: Added styling for image preview
  - Image preview shows uploaded image before saving
  - Responsive design maintained

### Backend (Node.js/Express)
- **server.js**: Added multer configuration
  - File storage setup (saves to `/uploads` folder)
  - File filter (only image files allowed)
  - File size limit: 5MB
  - Static file serving for uploaded images

- **projectController.js**: Updated create and update methods
  - Handles file uploads from multer
  - Generates image URL from filename
  - Stores relative path in database

- **projectRoutes.js**: Added multer middleware
  - POST and PUT routes now handle file uploads
  - Files are passed via `req.file` to controllers

- **package.json**: Added multer dependency
  - `"multer": "^1.4.5-lts.1"`

- **.gitignore**: Updated to ignore uploads folder
  - Prevents large image files from being committed

- **api.js**: Updated axios interceptor
  - Automatically handles FormData without forcing JSON headers

## Installation & Setup

### 1. Install Backend Dependencies
```bash
cd backend
npm install
```

This will install multer and all other dependencies.

### 2. Create Uploads Directory
```bash
# From project root
mkdir uploads
```

Or the directory will be created automatically on first upload.

### 3. Run the Application
```bash
# Terminal 1: Start backend
cd backend
npm start

# Terminal 2: Start frontend
cd frontend
npm start
```

## Deployment Considerations

### For Production/Cloud Deployment

**Important**: The `/uploads` folder is relative to your server root. Consider these options:

#### Option 1: Local Storage (Current Implementation)
- Works well for small deployments
- Files stored on server disk
- Ensure server has write permissions to uploads directory
- Add uploads directory creation to deployment scripts

#### Option 2: Cloud Storage (Recommended for Production)
To migrate to cloud storage (AWS S3, Azure Blob, etc.), update:
1. Multer storage configuration to use cloud provider SDK
2. Return cloud URL instead of local path
3. Remove local uploads folder

Example for AWS S3:
```javascript
// Update server.js multer configuration
const s3 = new AWS.S3();
const multerS3 = require('multer-s3');

const upload = multerS3({
  s3: s3,
  bucket: process.env.S3_BUCKET_NAME,
  acl: 'public-read',
  key: (req, file, cb) => {
    cb(null, Date.now().toString() + '-' + file.originalname);
  }
});
```

### Environment Variables
Add to `.env` if using cloud storage:
```
S3_BUCKET_NAME=your-bucket-name
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
```

## API Usage

### Create Project with Image
```javascript
const formData = new FormData();
formData.append('title', 'Project Title');
formData.append('description', 'Description');
formData.append('location', 'Location');
formData.append('startDate', '2024-01-21');
formData.append('image', imageFile); // File object from input

await axios.post('/projects', formData);
```

### Update Project with New Image
```javascript
const formData = new FormData();
formData.append('title', 'Updated Title');
formData.append('image', newImageFile); // Optional, only if changing image

await axios.put(`/projects/${projectId}`, formData);
```

## File Constraints

- **Max Size**: 5MB
- **Allowed Types**: JPEG, PNG, GIF, WebP
- **Storage**: `/uploads` folder (relative to project root)
- **URL Format**: `/uploads/[filename]`

## Troubleshooting

### "ENOENT: no such file or directory" error
- Ensure `/uploads` directory exists or has write permissions
- Check server logs for detailed error

### "Only image files are allowed" error
- Verify file is a valid image (JPEG, PNG, GIF, WebP)
- Check file size doesn't exceed 5MB

### Image not displaying
- Ensure Express is serving static files from `/uploads`
- Check the URL format in database (should be `/uploads/filename`)
- Verify CORS settings allow image access

### Deployment issues
- For containerized deployments (Docker), ensure uploads volume is persistent
- Consider using cloud storage for scalability
- Test file upload before going to production

## Docker Deployment Example

Add to Dockerfile:
```dockerfile
# Create uploads directory
RUN mkdir -p /app/uploads

# Add volume in docker-compose.yml
volumes:
  - ./uploads:/app/uploads
```

## Testing

1. Go to Admin Projects page
2. Click "Add Project"
3. Fill in all required fields
4. Choose an image file
5. Preview should show the selected image
6. Submit the form
7. Image should be saved and displayed on reload
