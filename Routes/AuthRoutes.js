const express = require('express');
const {
registerUser,
login,
createUser,
getAllUsers,
getUser,
updateUser,
deleteUser,
logout,
getUserbyEmail,
forgotPwd,
} = require('../Controllers/AuthController.js');

const router = express.Router();

router.post('/registerUser', registerUser);
router.post('/login', login);
router.post('/getUserbyEmail', getUserbyEmail);
router.post('/logout', logout);
router.post('/createUser', createUser);
router.get('/getAllUsers', getAllUsers);
router.get('/getUser/:id', getUser);
router.put('/updateUser/:id', updateUser);
router.delete('/deleteUser/:id', deleteUser);
router.post('/forgotPwd', forgotPwd);

module.exports = router;