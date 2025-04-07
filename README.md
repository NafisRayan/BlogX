# BlogX - Modern Blog Platform

A modern, full-stack blog platform built with React and TypeScript, featuring a clean UI powered by ShadCn components and TailwindCSS.

## 🌟 Features

- **Modern UI/UX**: Clean and responsive design using ShadCn UI components
- **Blog Management**: Create, read, update, and delete blog posts
- **Rich Text Editor**: Compose blogs with a feature-rich editor
- **Filtering & Search**: Easy-to-use blog filtering and search functionality
- **Pagination**: Smooth navigation through blog posts
- **Responsive Design**: Optimized for all device sizes
- **TypeScript Support**: Full type safety across the application
- **API Integration**: RESTful API backend for data management

## 🚀 Tech Stack

### Frontend
- React 18
- TypeScript
- Vite
- TailwindCSS
- ShadCn UI Components
- React Router Dom
- Radix UI Primitives

### Backend
- Node.js
- Express.js
- MongoDB
- Cloudinary (for image management)
- Multer (for file uploads)
- Express Validator (for request validation)

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/NafisRayan/BlogX.git
cd BlogX
```

2. Install dependencies:
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
```

3. Set up environment variables:

Create `.env` files in both root and backend directories.

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000
```

### Backend (.env)
```env
PORT=5000
MONGODB_URI=your_mongodb_uri
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
```

4. Start the development servers:
```bash
# Start frontend (in root directory)
npm run dev

# Start backend (in backend directory)
npm run dev
```

## 🌐 Project Structure

```
blogx/
├── src/                    # Frontend source files
│   ├── components/        # Reusable UI components
│   ├── screens/          # Page components
│   ├── hooks/            # Custom React hooks
│   └── lib/             # Utility functions
├── backend/              # Backend source files
│   ├── src/
│   │   ├── config/      # Configuration files
│   │   ├── controllers/ # Route controllers
│   │   ├── models/      # Database models
│   │   ├── routes/      # API routes
│   │   └── server.js    # Entry point
├── public/              # Static assets
└── vite.config.ts       # Vite configuration
```

## 📱 Features Overview

1. **Blog Posts Management**
   - Create new blog posts with rich text content
   - Upload and manage images through Cloudinary
   - Edit existing posts
   - Delete posts

2. **User Interface**
   - Responsive design for all screen sizes
   - Modern and clean UI components
   - Smooth animations and transitions
   - Intuitive navigation

3. **Backend Features**
   - RESTful API endpoints
   - MongoDB database integration
   - File upload handling with Multer
   - Request validation with Express Validator
   - CORS enabled for frontend communication

## 🔧 Scripts

### Frontend
- `npm run dev`: Start development server
- `npm run build`: Build for production

### Backend
- `npm run dev`: Start development server with Nodemon
- `npm start`: Start production server

## 👨‍💻 Author

**Nafis Rayan**
- GitHub: [@NafisRayan](https://github.com/NafisRayan)
