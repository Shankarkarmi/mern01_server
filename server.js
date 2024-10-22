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

// let's take cors
const corsOptions = {
    origin: "http://localhost:5173",
    method:"GET, POST, PUT, DELETE, PATCH, HEAD ",
    creditionals: true,
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

const PORT = 5000;

connectDb().then(() => { 
app.listen(PORT,()=>{
    console.log(`server is running at port:${PORT}`);
});
});