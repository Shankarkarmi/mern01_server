const express = require("express");
const router = express.Router();

// const {home, register} = require("../controllers/auth-controller");
const authcontrollers = require("../controllers/auth-controller"); 
const { signupSchema, loginSchema }= require("../validators/auth-validator"); 
// you need to import it like this: const {signupSchema} = require("../validator/auth-validator")  ;
// const loginSchema = require("../validators/auth-validator");
const validate = require("../middlewares/validate-middleware");

const authMiddleware = require("../middlewares/auth-middleware");






// router.get("/",(req,res)=>{
//     res.status(200).send('Wel come to the');
// });

// router.route("/").get(home);
router.route("/").get(authcontrollers.home);

// router.route("/").get((req,res)=>{
//         res.status(200).send('Wel come to the');
//     });
    
// router.route("/register").get(register);
router.route("/register").post(validate(signupSchema), authcontrollers.register);

// router.route("/register").get((req,res)=>{
    //     res.status(200).send('Welcome to the registeration page shankar');               
    // });
    
    
router.route("/login").post(validate(loginSchema),authcontrollers.login);
// router.route("/login").post(validate(loginSchema),authcontrollers.login);

router.route("/user").get(authMiddleware,authcontrollers.user);

module.exports = router;
// HTTP Methods and Their Meaning
// GET   : Read data
// POST  : Create data
// PUT or PATCH  : Update data, or insert if a new id
// DELETE : Delete data