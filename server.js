const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });
const app = require("./app");

const DB_URL = process.env.DB_URL;

mongoose.connect(DB_URL)
.then(() => {
    console.log("DB connection successful!");
})
.catch(err => {
    console.error("DB connection error:", err); // Error handling to catch connection errors
});

const port = 3000;

app.listen(port, () => {
    console.log(`App running on port ${port}..`);
});
 