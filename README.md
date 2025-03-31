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

# Install backend dependencies (Backend Not Ready Yet)
cd api
npm install
```

3. Set up environment variables: (Currently not applicable)

Create `.env` files in both root and api directories with necessary configurations.

4. Start the development servers:
```bash
# Start frontend
npm run dev

# Start backend in api directory (Backend Not Ready Yet)
npm run dev
```

## 🔧 Configuration

The application requires several environment variables to be set up:

### Frontend (.env)
```env
VITE_API_URL=your_api_url
```

### Backend (api/.env) (Backend Not Ready Yet)
```env
PORT=backend_port
MONGODB_URI=your_mongodb_uri
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
```

## 🌐 Project Structure

```
blogx/
├── src/                    # Frontend source files
│   ├── components/        # Reusable UI components
│   ├── screens/          # Page components
│   ├── services/         # API services
│   └── lib/             # Utility functions
├── api/                  # Backend source files
│   ├── src/
│   │   ├── config/      # Configuration files
│   │   ├── controllers/ # Route controllers
│   │   ├── models/      # Database models
│   │   ├── routes/      # API routes
│   │   └── types/       # TypeScript types
│   └── index.ts         # Entry point
└── public/              # Static assets
```

## 📱 Features Overview

1. **Blog Posts Management**
   - Create new blog posts with rich text content
   - Upload and manage images
   - Edit existing posts
   - Delete posts

2. **User Interface**
   - Responsive design for all screen sizes
   - Modern and clean UI components
   - Smooth animations and transitions
   - Intuitive navigation

3. **Search & Filter**
   - Filter posts by category
   - Search functionality
   - Sort by date, popularity, etc.

4. **Pagination**
   - Efficient loading of blog posts
   - Smooth navigation between pages

## 👨‍💻 Author

**Nafis Rayan**
- GitHub: [@NafisRayan](https://github.com/NafisRayan)
