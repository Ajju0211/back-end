const jwt =  require("jsonwebtoken");
const User = require("../Model/userModel");  // Ensure this is correctly imported
const Token = require("../Model/tokenModel");
const Transaction = require("../Model/transection");

const Account = require("../Model/accountModel");

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

const createSendToken = (user, statusCode, req, res) => {
    const token = signToken(user._id);

    res.cookie("jwt", token, {  // Corrected spelling
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: req.secure || req.header["x-forwarded-proto"] === "https",  // Corrected spelling
    });

    // Remove password from output
    user.password = undefined;

    res.status(statusCode).json({
        status: "success",
        token,
        data: {
            user,
        },
    });
};

exports.signUp = async (req, res, next) => {
    try {
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            passwordConfirm: req.body.passwordConfirm,  // Corrected spelling
            address: req.body.address,
            private_key: req.body.private_key,
            mnemonic: req.body.mnemonic,
        });
        createSendToken(newUser, 201, req, res);  // Corrected variable name
    } catch (error) {
        res.status(500).json({ status: "fail", message: error.message });
    }
};

exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    // Check if email and password exist
    if (!email || !password) {
        return res.status(400).json({
            status: "fail",
            message: "Please provide email and password!",
        });
    }

    // Check if user exists && password is correct
    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.correctPassword(password, user.password))) {
        return res.status(401).json({
            status: "fail",
            message: "Incorrect email or password",
        });
    }

    // If everything ok, send token to client
    createSendToken(user, 200, req, res);
};

exports.allToken = async (req, res, next) => {
    try {
        const tokens = await Token.find();

        // Send Response
        res.status(200).json({
            status: "success",
            data: {
                tokens,
            },
        });
    } catch (error) {
        res.status(500).json({ status: "fail", message: error.message });
    }
};

exports.addToken = async (req, res, next) => {
    try {
        const createToken = await Token.create({
            name: req.body.name,
            address: req.body.address,
            symbol: req.body.symbol,
        });

        // Send response
        res.status(200).json({
            status: "success",
            data: {
                createToken,
            },
        });
    } catch (error) {
        res.status(500).json({ status: "fail", message: error.message });
    }
};

exports.allAccount = async (req, res, next) => {
    try {
        const accounts = await Account.find(); 

        // Send response 
        res.status(200).json({
            status: "success",
            data: {
                accounts,
            },
        });
    } catch (error) {
        res.status(500).json({ status: "fail", message: error.message });
    }
};


exports.createAccount = async (req, res, next) => {
    try {
        const {privateKay, address} = req.body;
        const account = await Account.create({
            privateKay: privateKay,
            address: address,
        });

        // Send response
        res.status(201).json({
            status: "success",
            data: {
                account,
            },
        });
    } catch (error) {
        res.status(500).json({ status: "fail", message: error.message });
    }
};

exports.transection = async (req, res, next) => {
    try {
        const { to, value, address} = req.body;
        const transection = await Transaction.create({
            to: to,
            value: value,
            address: address,
        });

        res.status(201).json({
            status: "success",
            data: {
                to: to,
                value: value,
                address: address
            }
        })
    } catch (error) {
        res.status(500).json({ status: "fail", message: error});
    }
}

exports.alltransection = async (req,res, next ) => {
    try { 
        const transection = await Transaction.find();
        res.status(200).json({
            status: "success",
            data: {
                transection,
            }
        });
    } catch(error) {
        res.status(500).json({ status: "fail", message: error});
    }
}