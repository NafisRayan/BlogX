import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    // Try local MongoDB first
    const localUri = 'mongodb://127.0.0.1:27017/blogx';
    
    await mongoose.connect(localUri, {
      serverSelectionTimeoutMS: 5000, // 5 seconds timeout
    });

    console.log('Connected to MongoDB successfully');
    
    // Monitor for errors after initial connection
    mongoose.connection.on('error', (error) => {
      console.error('MongoDB connection error:', error);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('MongoDB disconnected. Attempting to reconnect...');
    });

    mongoose.connection.on('reconnected', () => {
      console.log('MongoDB reconnected successfully');
    });

  } catch (error) {
    console.error('MongoDB connection error:', error);
    
    // Fallback to in-memory MongoDB for development
    try {
      console.log('Attempting to use in-memory MongoDB...');
      
      // Import mongodb-memory-server only when needed
      const { MongoMemoryServer } = await import('mongodb-memory-server');
      const mongod = await MongoMemoryServer.create();
      const uri = mongod.getUri();
      
      await mongoose.connect(uri);
      console.log('Connected to in-memory MongoDB successfully');
      
    } catch (fallbackError) {
      console.error('Failed to initialize in-memory MongoDB:', fallbackError);
      process.exit(1);
    }
  }
};

// Graceful shutdown
process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close();
    console.log('MongoDB connection closed through app termination');
    process.exit(0);
  } catch (err) {
    console.error('Error closing MongoDB connection:', err);
    process.exit(1);
  }
});
