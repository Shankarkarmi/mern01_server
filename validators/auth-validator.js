const { z } = require("zod");

const signupSchema = z.object({
    username: z
    .string({required_error:"Name is required"})
    .trim()
    .min(3, {message: "Name must be at least of 3 chrs. "})
    .max(255, {message: "Name must not be more than 255 characters"}),
    email: z
    .string({required_error:"Email is required"})
    .email({message: "Email is not valid"})
    .min(3, {message: "Email must be at least of 3 chrs. "})
    .max(255, {message: "Name must not be more than 255 characters"}),
    phone: z
    .string({required_error:"Phone is required"})
    .trim()
    .min(10, {message: "Phone must be at least of 10 chrs. "})
    .max(20, {message: "Phone must not be more than 20 characters"}),
    password: z
    .string({required_error:"Password is required"})
    .min(7, {message: "Password must be at least of 7 chrs. "})
    .max(1024, {message: "Password must not be more than 1024 characters"}),
 
    isAdmin: z.boolean().optional().default(false), // Adding the admin field

});

const loginSchema = z.object({
    
    email: z
    .string({required_error:"Email is required"})
    .email({message: "Email is not valid"})
    .min(3, {message: "Email must be at least of 3 chrs. "})
    .max(255, {message: "Name must not be more than 255 characters"}),
  
    password: z
    .string({required_error:"Password is required"})
    .min(7, {message: "Password must be at least of 7 chrs. "})
    .max(1024, {message: "Password must not be more than 1024 characters"}),
});

module.exports = { signupSchema, loginSchema };