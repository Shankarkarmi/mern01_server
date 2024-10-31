require("dotenv").config(); // ab hum dotenv use kar sakte hain
const express = require("express");
const cors = require("cors");
const app = express();
const authRoute = require("./router/auth-router");
const contactRoute = require("./router/contact-router");
const serviceRoute = require("./router/service-router");
const adminRoute = require("./router/admin-router");
const connectDb = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");


const PORT = process.env.PORT || 5000;



// let's take cors
const corsOptions = {
    origin: process.env.CLIENT_URL || "http://localhost:5173", // Use env variable for production
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD"],
    credentials: true,
};
app.use(cors(corsOptions));


app.use(express.json());  // JSON ka len den karne k lia with out any rok tok
//middleware



app.use("/api/auth", authRoute); 
app.use("/api/form", contactRoute);
app.use("/api/data", serviceRoute);


app.use("/api/admin", adminRoute);





// app.get("/",(req,res)=>{
//     res.status(200).send('Wel come to the jungle brother');
// });
// app.get("/register",(req,res)=>{
//     res.status(200).send('Welcome to the registeration page shankar');               
// })

app.use(errorMiddleware);


connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running at port: ${PORT}`);
    });
}).catch((err) => {
    console.error("Database connection failed", err);
    process.exit(1); // Exit the process if DB connection fails
});
