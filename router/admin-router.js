const express = require('express');
const adminController = require('../controllers/admin-controller');
const authMiddleware = require("../middlewares/auth-middleware");
const adminMiddleware = require('../middlewares/admin-middleware');
const router = express.Router();


router.route('/users').get(authMiddleware, adminMiddleware, adminController.getAllUsers);
router.route('/contacts').get(authMiddleware,adminMiddleware,adminController.getAllContacts);
router.route('/contacts/delete/:id').delete(authMiddleware,adminMiddleware,adminController.deleteContactById);
router.route("/users/delete/:id").delete(authMiddleware, adminMiddleware, adminController.deleteUserById);

module.exports = router;