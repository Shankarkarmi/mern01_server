const User = require("../models/user-model");
const Contact = require("../models/contact-model");

const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        console.log(users);
        if (!users || users.length === 0) {
            return res.status(400).json({ message: "No Users Found" });
        }
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

const getAllContacts = async (req, res, next) => {
    try {
        const contacts = await Contact.find();
        console.log(contacts);
        if (!contacts || contacts.length === 0) {
            return res.status(200).json({ message: "No Contacts Found", data: []  });
        }
        res.status(200).json(contacts);
    } catch (error) {
        next(error);
    }
};

const deleteUserById = async (req, res, next) => {
    try {
        const id = req.params.id;
        await User.deleteOne({ _id: id });
        return res.status(200).json({ message: "User Deleted Successfully" });
    } catch (error) {
        next(error);
    }
};
const deleteContactById = async (req, res, next) => {
    try {
        const id = req.params.id;
        await Contact.deleteOne({ _id: id });
        return res.status(200).json({ message: "User Deleted Successfully" });
    } catch (error) {
        next(error);
    }
};

module.exports = { getAllUsers, getAllContacts, deleteUserById, deleteContactById };
