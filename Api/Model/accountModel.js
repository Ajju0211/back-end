const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
    privateKay: String,
    address: String,
});

const Account = mongoose.model("Account",accountSchema);

module.exports = Account;
