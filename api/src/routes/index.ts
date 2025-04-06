import { Router } from 'express';
import userRoutes from './users';
import blogRoutes from './blogs';
import commentRoutes from './comments';

// Export all routes
export {
  userRoutes,
  blogRoutes,
  commentRoutes
};

// Create and export a function to set up all routes
export const setupRoutes = (app: Router) => {
  app.use('/api/users', userRoutes);
  app.use('/api/blogs', blogRoutes);
  app.use('/api/comments', commentRoutes);
  
  // Health check route
  app.get('/health', (req, res) => {
    res.json({
      status: 'ok',
      message: 'API is running',
      timestamp: new Date().toISOString()
    });
  });
};
