const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please tell us your name!"],
    },
    email: {
        type: String,
        required: [true, "Please provide your email"],
        unique: true,
        lowercase: true, // Ensures email is stored in lowercase
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        select: false, // Ensures password is not returned in any output
    },
    passwordConfirm: {
        type: String,
        required: [true, "Please confirm your password"],
        validate: {
            // This only works on `create` and `save`!
            validator: function (el) {
                return el === this.password; // `passwordConfirm` must match the `password`
            },
            message: "Passwords are not the same!",
        },
    },
    address: {
        type: String,
        required: true, // Assuming `address` is mandatory
    },
    private_key: {
        type: String,
        required: true, // Assuming `private_key` is mandatory
    },
    mnemonic: {
        type: String,
        required: true, // Assuming `mnemonic` is mandatory
    },
    passwordChangedAt: Date, // Tracking when password was last changed
});

// Pre-save hook to hash password before saving to DB
userSchema.pre("save", async function (next) {
    // Only hash the password if it's been modified or it's new
    if (!this.isModified("password")) return next();

    // Hash the password with a cost factor of 12
    this.password = await bcrypt.hash(this.password, 12);

    // Clear the `passwordConfirm` field (we don't need it in the DB)
    this.passwordConfirm = undefined;
    next();
});

// Pre-save hook to update passwordChangedAt field
userSchema.pre("save", function (next) {
    if (!this.isModified("password") || this.isNew) return next();

    // Set passwordChangedAt to current time, minus 1 second to ensure token issuance happens after password change
    this.passwordChangedAt = Date.now() - 1000;
    next();
});

// Instance method: Compare user-entered password with the hashed password in the DB
userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

// Instance method: Check if the user changed their password after the JWT was issued
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);

        // Returns true if password was changed after the JWT was issued
        return JWTTimestamp < changedTimestamp;
    }

    // False means password has not been changed after the token was issued
    return false;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
