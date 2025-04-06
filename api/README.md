# BlogX API

Backend API for the BlogX application built with Node.js, Express, TypeScript, and MongoDB.

## MongoDB Atlas Setup

1. Create MongoDB Atlas Account:
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up for a free account
   - Create a new project

2. Create a Cluster:
   - Click "Build a Database"
   - Choose the FREE tier option
   - Select your preferred region
   - Click "Create Cluster"

3. Configure Database Access:
   - Go to Database Access under Security
   - Click "Add New Database User"
   - Choose Password authentication
   - Create a username and password
   - Set role to "Atlas admin"
   - Remember these credentials

4. Configure Network Access:
   - Go to Network Access under Security
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)
   - Click "Confirm"

5. Get Connection String:
   - Go to your cluster
   - Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user's password
   - Replace `<dbname>` with `blogx`

6. Update .env:
```env
PORT=5000
MONGODB_URI=your_connection_string_here
NODE_ENV=development

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## Quick Start

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file with your MongoDB Atlas and Cloudinary credentials

3. Start development server:
```bash
npm run dev
```

## API Endpoints

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Blogs
- `GET /api/blogs` - Get all blogs (supports pagination & filtering)
- `GET /api/blogs/:id` - Get blog by ID
- `POST /api/blogs` - Create new blog with images
- `PUT /api/blogs/:id` - Update blog
- `DELETE /api/blogs/:id` - Delete blog
- `POST /api/blogs/:id/like` - Like a blog
- `POST /api/blogs/:id/bookmark` - Bookmark a blog

### Comments
- `GET /api/comments/blog/:blogId` - Get comments for a blog
- `POST /api/comments` - Create new comment
- `PUT /api/comments/:id` - Update comment
- `DELETE /api/comments/:id` - Delete comment

## Environment Variables

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Atlas Configuration
MONGODB_URI=your_connection_string_here

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## Error Handling

Check server logs for detailed error messages. Common issues:

1. MongoDB Connection Error:
   - Verify MongoDB Atlas credentials
   - Check connection string format
   - Ensure IP whitelist includes your IP
   - Check database user permissions

2. Cloudinary Configuration:
   - Verify credentials in .env
   - Check Cloudinary dashboard for API limits

## Development Notes

1. TypeScript Configuration:
   - Check tsconfig.json for compilation options
   - Run `npm run build` to verify TS compilation

2. File Upload:
   - Images are uploaded to Cloudinary
   - Max file size: 5MB
   - Supported formats: JPEG, PNG, WebP

## Production Deployment

1. Update environment variables:
   ```env
   NODE_ENV=production
   MONGODB_URI=your_production_mongodb_uri
   ```

2. Build the project:
   ```bash
   npm run build
   ```

3. Start production server:
   ```bash
   npm start
   ```

## License

MIT
