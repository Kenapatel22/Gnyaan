const mongoose = require('mongoose');

// Define the order schema
const orderSchema = new mongoose.Schema(
    {
        payment: {
            // You can define specific payment details here
        },
        buyer: {
            type: mongoose.Schema.Types.ObjectId, // Correct ObjectId type
            ref: 'User', // Ensure this matches the model name (likely "User", not "users")
        },
    },
    { timestamps: true } // This adds createdAt and updatedAt timestamps
);

// Export the Order model
module.exports = mongoose.model('Order', orderSchema);
