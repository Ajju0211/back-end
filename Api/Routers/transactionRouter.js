const express = require('express');
const transaction = require('../Controllers/authController.js');

const router = express.Router();

router.get("/alltransection", transaction.alltransection);
router.post("/transection", transaction.transection);

module.exports = router;