const express = require('express');
const router = express.Router();
const {
  authenticateUser,
  authorizePermissons,
} = require('../middleware/authentication');

const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} = require('../controllers/userController');
const { route } = require('./authRoutes');

router
  .route('/')
  .get(authenticateUser, authorizePermissons('admin', 'owner '), getAllUsers);

router.route('/showMe').get(authenticateUser, showCurrentUser);
router.route('/updateUser').patch(authenticateUser, updateUser);
router.route('/updateUserPassword').post(authenticateUser, updateUserPassword);

router.route('/:id').get(authenticateUser, getSingleUser);

module.exports = router;
