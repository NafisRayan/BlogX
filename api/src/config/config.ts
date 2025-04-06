import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

// Load environment variables
dotenv.config();

// Validate required environment variables
const requiredEnvVars = [
  'MONGODB_URI',
  'CLOUDINARY_CLOUD_NAME',
  'CLOUDINARY_API_KEY',
  'CLOUDINARY_API_SECRET'
] as const;

// Create a type for the environment variables
type EnvVars = Record<typeof requiredEnvVars[number], string>;

// Validate and get environment variables
const getEnvVars = (): EnvVars => {
  const missingVars = requiredEnvVars.filter(name => !process.env[name]);
  
  if (missingVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
  }

  return requiredEnvVars.reduce((vars, name) => ({
    ...vars,
    [name]: process.env[name]!
  }), {} as EnvVars);
};

const env = getEnvVars();

// Export configuration
export const config = {
  port: parseInt(process.env.PORT || '5000', 10),
  mongoUri: env.MONGODB_URI,
  nodeEnv: process.env.NODE_ENV || 'development',
  cloudinary: {
    cloud_name: env.CLOUDINARY_CLOUD_NAME,
    api_key: env.CLOUDINARY_API_KEY,
    api_secret: env.CLOUDINARY_API_SECRET
  }
} as const;

// Configure Cloudinary
cloudinary.config({
  cloud_name: config.cloudinary.cloud_name,
  api_key: config.cloudinary.api_key,
  api_secret: config.cloudinary.api_secret
});

export { cloudinary };

// Log configuration (excluding sensitive data)
if (config.nodeEnv === 'development') {
  console.log('Configuration loaded:');
  console.log('- Port:', config.port);
  console.log('- Environment:', config.nodeEnv);
  console.log('- MongoDB: Connection string loaded');
  console.log('- Cloudinary: Configured with cloud name:', config.cloudinary.cloud_name);
}
