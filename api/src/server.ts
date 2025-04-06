import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { config } from './config/config';
import { userRoutes, blogRoutes, commentRoutes } from './routes';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoUri);
    console.log('Connected to MongoDB successfully');
    
    // Start server only after successful DB connection
    app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port} in ${config.nodeEnv} mode`);
      console.log(`MongoDB connected: ${config.mongoUri}`);
    });
  } catch (error: any) {
    console.error('MongoDB connection error:', error.message);
    
    // Check if MongoDB is running locally
    if (config.mongoUri.includes('localhost') || config.mongoUri.includes('127.0.0.1')) {
      console.error('\nMake sure MongoDB is running locally. You can:');
      console.error('1. Install MongoDB from https://www.mongodb.com/try/download/community');
      console.error('2. Start MongoDB service');
      console.error('3. Or use MongoDB Atlas by updating MONGODB_URI in .env\n');
    } else if (config.mongoUri.includes('mongodb+srv')) {
      console.error('\nMongoDB Atlas connection failed. Please check:');
      console.error('1. Your network connection');
      console.error('2. MongoDB Atlas cluster status');
      console.error('3. Database user credentials');
      console.error('4. IP whitelist settings in Atlas\n');
    }
    
    // Exit process with failure in production, otherwise keep running for development
    if (config.nodeEnv === 'production') {
      process.exit(1);
    }
  }
};

// Routes
app.use('/api/users', userRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/comments', commentRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok',
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    environment: config.nodeEnv
  });
});

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false,
    message: 'Internal Server Error',
    error: config.nodeEnv === 'development' ? err.message : 'Something went wrong'
  });
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: Error) => {
  console.error('Unhandled Promise Rejection:', err.message);
  // Don't exit the process in development
  if (config.nodeEnv === 'production') {
    process.exit(1);
  }
});

// Connect to database
connectDB();

export default app;
