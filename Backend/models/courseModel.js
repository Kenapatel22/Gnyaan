const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    name: {
         type: String, 
         required: true },

    description: { 
        type: String, 
        required: true },

    price: { 
        type: Number, 
        required: true },

    imageUrl: { 
        type: String, 
        required: true },
        
   /* videos: [
        {
            path: { type: String, required: true },
            title: { type: String, required: true },
            url: { type: String, required: true }
        }
    ],

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }*/
});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
