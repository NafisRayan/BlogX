# BlogX API

Backend API for the BlogX application built with Node.js, TypeScript, Express, MongoDB, Cloudinary, and Stripe.

## Project Structure

```
api/
├── src/
│   ├── config/
│   │   ├── cloudinary.ts
│   │   └── database.ts
│   ├── controllers/
│   │   └── blog.controller.ts
│   ├── models/
│   │   └── blog.model.ts
│   ├── routes/
│   │   └── blog.routes.ts
│   ├── types/
│   │   └── blog.types.ts
│   └── index.ts
├── uploads/        # Temporary storage for multer
├── dist/          # Compiled JavaScript
├── package.json
├── tsconfig.json
└── .env
```

## Environment Variables

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/blogx
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
JWT_SECRET=your_jwt_secret_key
CLIENT_URL=http://localhost:5173
```

## Available Scripts

- `npm run build`: Compile TypeScript code
- `npm start`: Start the production server
- `npm run dev`: Start the development server with hot-reload
