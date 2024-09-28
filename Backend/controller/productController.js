const braintree = require("braintree")
const dotenv = require("dotenv");
const orderModel = require('../models/orderModel.js');
dotenv.config();

var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

//payment gateway api
//token
const braintreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};
//payment
const braintreePaymentController = async (req, res) => {
  try {
    const { nonce } = req.body;
    let newTransaction = gateway.transaction.sale({
      amount: "5.00",
      paymentMethodNonce: nonce,
      options: {
        submitForSettlement: true,
      }
    },
      function (error, result) {
        if (result) {
          const order = new orderModel({
            payment: result,
            buyer: req.user._id
          }).save();
          res.json({ ok: true });
        } else {
          res.status(500).send(error);
        }
      });
  } catch (error) {
    console.error(error);
  }
};
module.exports = { braintreeTokenController, braintreePaymentController };