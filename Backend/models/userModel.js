const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true, // removes leading and trailing whitespace
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Please enter a valid email address'], // email validation
        },
        password: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
            match: [/^\d{10}$/, 'Please enter a valid phone number'], // Optional validation for 10-digit phone number
        },
        role: {
            type: Boolean,
            default: false, // false = regular user, true = admin
        }
    },
    { timestamps: true }
);



module.exports = mongoose.model('User', userSchema);
