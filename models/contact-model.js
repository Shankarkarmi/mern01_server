const {Schema, model, Mongoose} = require ("mongoose");

const contactSchema = new Schema({
    username: { type: String, required: true},
    email: { type: String, required: true},
    message: { type: String, required: true},
});

// create a model or collecton
// first letter cpital -> convenction he yei
const Contact = new model("Contact", contactSchema);
module.exports = Contact;