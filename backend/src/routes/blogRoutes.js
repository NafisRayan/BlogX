const express = require('express');
const router = express.Router();
const multer = require('multer');
const { check } = require('express-validator');
const blogController = require('../controllers/blogController');

// Multer configuration for handling file uploads
const upload = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.match(/^image/)) {
      return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
  }
});

// Validation middleware
const validateBlog = [
  check('authorName').notEmpty().withMessage('Author name is required'),
  check('title').notEmpty().withMessage('Title is required'),
  check('publicationDate').notEmpty().withMessage('Publication date is required'),
  check('category').notEmpty().withMessage('Category is required'),
  check('subCategory').notEmpty().withMessage('Sub-category is required'),
  check('summary').notEmpty().withMessage('Summary is required'),
  check('mainContent').notEmpty().withMessage('Main content is required')
];

// Routes
router.get('/', blogController.getBlogs);
router.get('/:id', blogController.getBlog);
router.post('/', upload.array('images', 5), validateBlog, blogController.createBlog);
router.put('/:id', upload.array('images', 5), validateBlog, blogController.updateBlog);
router.delete('/:id', blogController.deleteBlog);

module.exports = router; 