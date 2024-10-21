const { z } = require("zod");

const validate = (schema) => async (req, res, next) => {
    try {
        console.log("Incoming request body:", req.body); 
        
        // Convert "isAdmin" string to a boolean if present as a string
        if (req.body.isAdmin === 'true') {
            req.body.isAdmin = true;
        } else if (req.body.isAdmin === 'false') {
            req.body.isAdmin = false;
        }
        console.log("Request body before validation:", req.body);  // Log this for clarity
        const result = await schema.parse(req.body); // Use parse instead of parseAsync for synchronous parsing 
        req.body = result;  // Overwriting req.body with parsed result
        
        console.log("Incoming request body after validation:", req.body);
        next();  // Proceed to the next middleware or route handler
    } catch (err) {
        if (err instanceof z.ZodError) {
            console.log("Validation Errors:", err.errors);  // Log detailed errors from Zod
            return res.status(422).json({
                message: "Validation failed",
                errors: err.errors.map((e) => ({
                    field: e.path[0],  // The field that failed validation
                    message: e.message,  // The error message for that field
                })),
            });
        }
        else {
            console.error("Unexpected error:", err);  // Log other types of errors
            return res.status(500).json({
                message: "Internal server error",
                error: err.message || "Unknown error"
            });
        }  // Pass other errors to the error-handling middleware
    }
    
};

module.exports = validate;
