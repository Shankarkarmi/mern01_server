const mongoose = require("mongoose");
const bcrypt = require("bcryptjs"); 
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require: true,
    },
    phone:{
        type:String,
        required: true,
    },
    password:{
        type:String,
        required: true,
    },
    isAdmin:{
        type:Boolean,
        default: false,
    },
});








// define the model or collection name
// Middeleware data save karne se pehle ye run hoga

userSchema.pre('save', async function(next){
    const user = this;

    if(!user.isModified("password")){
        next();
    }

    try {

        const saltRound = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(user.password, saltRound);
        user.password = hash_password;

    } catch (error) {
        next(error);
    }

});
// JSON webtoken  should be store in browser in cookies or local server


//instance method


userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
}





userSchema.methods.generateToken = async function () {
    try {
        return jwt.sign({
            userId: this._id.toString(),
            email: this.email,
            isAdmin: this.isAdmin,
        },
        process.env.JWT_SECTION_KEY,
        {
            expiresIn:"30d",
        }
    );
    } catch (error) {
        console.error(error);
    }
};





const User = new mongoose.model("User",userSchema); // convenction imp point


module.exports = User;