const express = require('express');
const { braintreeTokenController, braintreePaymentController, addCourseController } = require('../controller/productController.js');
const { requireSignIn } = require('../middleware/authMiddleware.js');
const router = express.Router();

//payments routes 
//token
router.get('/braintree/token', braintreeTokenController);
//payments
router.post('/braintree/payment', requireSignIn, braintreePaymentController);

module.exports = router;