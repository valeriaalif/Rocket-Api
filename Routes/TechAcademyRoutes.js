const express = require('express');
const {
  loginUserTechAcademy,
  registerUserTechAcademy,
  createUserTechAcademy,
  getAllUsersTechAcademy,
  getUserTechAcademy,
  updateUserTechAcademy,
  deleteUserTechAcademy,
} = require('../Controllers/TechAcademyController.js');

const router = express.Router();

router.post('/loginUserTechAcademy', loginUserTechAcademy);
router.get('/getAllUsersTechAcademy', getAllUsersTechAcademy);
router.post('/registerUserTechAcademy', registerUserTechAcademy);
router.post('/newUserTechAcademy', createUserTechAcademy);
router.get('/getUserTechAcademy/:id', getUserTechAcademy);
router.put('/updateUserTechAcademy/:id', updateUserTechAcademy);
router.delete('/deleteUserTechAcademy/:id', deleteUserTechAcademy);

module.exports = router;