const express = require('express');
const { registerController, loginController, testController, getUserProfile } = require('../controller/authController');
const { requireSignIn, isAdmin} = require("../middleware/authMiddleware");
const userModel = require("../models/userModel");
const Course = require('../models/courseModel');
const multer = require('multer');
const path = require('path');
//router object
const router = express.Router();

//routing
//Regestring || Methods POST
router.post('/register', registerController);

//Login || Method POST
router.post('/login', loginController)

//test routes
router.get('/test', requireSignIn, isAdmin, testController);

//protected user routes
router.get('/user-auth', requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
});

//protected Admin routes
router.get('/admin-auth', requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
});

// GET all users
router.get('/all-users', async (req, res) => {
    try {
        const users = await userModel.find(); // Fetch all users
        res.status(200).json(users); // Send users data as JSON response
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Multer config for storing files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, 'uploads'); // Change to the correct directory
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Ensure unique filenames
    }
});

const upload = multer({ 
    storage,
    fileFilter: (req, file, cb) => {
        // Only accept image and video files
        if (file.mimetype.startsWith('image/') 
           // || file.mimetype.startsWith('video/')
        ) {
            cb(null, true);
        } else {
            cb(new Error('Only images  are allowed!'), false);
        }
    }
});

// add new course routes
router.post('/add-course', 
    upload.fields([
      { name: 'image', maxCount: 1 },  // Image field for course thumbnail
      // { name: 'videos', maxCount: 10 }  // Uncomment for videos
    ]), 
    async (req, res) => {
      // Log the request body and uploaded files for debugging
      console.log('Request Body:', req.body); 
      console.log('Uploaded Files:', req.files);
  
      try {
        const { name, description, price } = req.body;
  
        // Validation to ensure all fields are present
        if (!name || !description || !price || !req.files['image']) {
          return res.status(400).send({ message: 'All fields are required.' });
        }
  
        // Extract the uploaded image file information
        const image = req.files['image'][0];
  
        // Here, set the image URL to be served from your backend
        const imageUrl = `/uploads/${image.filename}`; 
  
        // Create new course document
        const newCourse = new Course({
          name: name,
          description: description,
          price: price,
          imageUrl: imageUrl, // Save image path in the course document
          // videos: videos,  // Uncomment when adding video uploads
        });
  
        // Save the course to the database
        await newCourse.save();
        res.status(201).send(newCourse);
      } catch (error) {
        console.error('Error adding course:', error);
        res.status(500).send({ message: 'Error adding course', error: error.message });
      }
  });
  
  
// Fetch all courses
router.get('/courses', async (req, res) => {
    try {
        const courses = await Course.find();
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching courses', error });
    }
});


module.exports = router;
