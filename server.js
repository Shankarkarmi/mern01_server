require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoute = require("./router/auth-router");
const contactRoute = require("./router/contact-router");
const serviceRoute = require("./router/service-router");
const adminRoute = require("./router/admin-router");
const connectDb = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");

const app = express();

// CORS options
const corsOptions = {
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// Middleware
app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);
app.use("/api/data", serviceRoute);
app.use("/api/admin", adminRoute);
app.use(errorMiddleware);

// Connect to the database and start the server
connectDb().then(() => {
    // Instead of app.listen(), export the app
    module.exports = app;
}).catch(err => {
    console.error("Database connection failed:", err);
    process.exit(1); // Exit process with failure
});

// Exporting the serverless handler
module.exports.handler = require("serverless-http")(app);
