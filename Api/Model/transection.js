
const mongoose = require("mongoose");

const transactionShema = new mongoose.Schema ({
    to: String,
    value: Number,
    address: String,
});

const Transaction = mongoose.model("Transactions", transactionShema);

module.exports = Transaction