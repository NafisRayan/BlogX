# BlogX - Full Stack Blog Application

A full-stack blog application built with React, TypeScript, Node.js, Express, and MongoDB.

## Project Structure

- `/api` - Backend API built with Node.js, Express, and TypeScript
- `/src` - Frontend application built with React and TypeScript

## Database Options

You can run this application with either a local MongoDB instance or MongoDB Atlas.

### Option 1: Local MongoDB

1. Install MongoDB Community Edition:
   - Download from: https://www.mongodb.com/try/download/community
   - Follow installation instructions for your OS
   - Start MongoDB service

2. Configure `.env` for local MongoDB:
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/blogx
NODE_ENV=development

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Option 2: MongoDB Atlas

1. Create MongoDB Atlas Account:
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up for a free account
   - Create a new project
   - Build a database (choose FREE tier)

2. Set Up Database:
   - Create a database user
   - Add your IP to the IP Access List
   - Get your connection string

3. Configure `.env` for MongoDB Atlas:
```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@<your-cluster-url>/blogx?retryWrites=true&w=majority
NODE_ENV=development

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## Getting Started

1. Install Dependencies:
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd api
npm install
cd ..
```

2. Configure Cloudinary:
   - Create account at https://cloudinary.com
   - Get API credentials from dashboard
   - Update `.env` with your Cloudinary credentials

3. Start Development Servers:

Backend:
```bash
cd api
npm run dev
```

Frontend:
```bash
# In another terminal
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## Features

- Create, read, update, and delete blog posts
- Image upload with Cloudinary integration
- Like and bookmark posts
- Comment on blog posts
- Responsive design
- Category and tag filtering
- Pagination support

## Implementation Details

### Backend
- Node.js + Express.js with TypeScript
- MongoDB with Mongoose for data storage
- Cloudinary for image uploads
- RESTful API design
- Proper error handling and validation

### Frontend
- React with TypeScript
- Tailwind CSS for styling
- Axios for API communication
- Responsive component design
- Real-time updates for likes/comments

## API Documentation

See the [API README](api/README.md) for detailed documentation of all available endpoints.

## Troubleshooting

### MongoDB Connection Issues

1. Local MongoDB:
   - Ensure MongoDB service is running
   - Check if you can connect using MongoDB Compass
   - Verify port 27017 is available

2. MongoDB Atlas:
   - Verify connection string format
   - Check if IP is whitelisted
   - Confirm database user credentials
   - Test connection using MongoDB Compass

### Cloudinary Issues

1. Image Upload Errors:
   - Verify API credentials
   - Check file size limits
   - Ensure proper file types

2. Configuration:
   - Check environment variables
   - Verify cloud name format
   - Test with Cloudinary API directly

## Development

The project uses TypeScript throughout the stack. Make sure to:
- Follow the established type definitions
- Run type checking before commits
- Keep the API documentation updated

## License

MIT
