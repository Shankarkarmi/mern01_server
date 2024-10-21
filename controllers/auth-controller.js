const User = require("../models/user-model");

// const bcrypt = require("bcryptjs");     



const home = async(req,res) =>{
    try {
        res.status(200).send('Welcome to the page using controllers again');
    } catch (error) {
        console.log(error);
    }
}

const register = async(req,res)=>{
    try {
    //console.log(req.body);
    const {username, email, phone, password } = req.body;

    const userExist = await User.findOne({email});
    // whenever we use fiondOne method we need to await 
    if(userExist){
        return res.status(400).json({msg : "Email already exist"});                                                                                                  
    }
    
    // const saltRound = 10;

    // const hash_password = await bcrypt.hash(password, saltRound);
    // const userCreated = await User.create({username, email, phone, password:hash_password});
    

    const userCreated = await User.create({username, email, phone, password});
    
    
    res.status(201).json({ msg: "registrtion sucessful", token: await userCreated.generateToken(),userId:userCreated._id.toString(), });    
} catch (error) {
    res.status(500).json(' ERROR PAGE NOT FOUND ');    
    
}           
};


const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExist = await User.findOne({ email });
        console.log(userExist);
        if(!userExist){
            return res.status(400).json({msg : "Email does not exist"});
        }
        const user = await userExist.comparePassword(password);
        if(user){
          
            res.status(200).json({ msg: "login sucessful", token: await userExist.generateToken(),userId:userExist._id.toString(), });    

      }else{
        res.status(401).json({msg: "Invalid password"});
      }
    } catch (error) {
       res.status(500).json("internal server error");
    }
};

//
// to sand User data = User Logic
//

const user = async (req, res) => {
    try {

        const userData = req.user;
        // console.log("server response",userData);


        return res.status(200).json({ userData });

        // res.status(200).json({msg:"Hi user"});
        res.status(200).json({msg:"Hi user"});
    } catch (error) {
        console.log("Error from the user route ${error}");
    }
}



module.exports = {home, register, login, user};