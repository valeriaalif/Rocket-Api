const express = require('express');
const {
registerRocketStudent,
loginRocketStudent,
createRocketStudent,
getAllStudents,
getRocketStudent,
updateRocketStudent,
deleteRocketStudent,
} = require('../Controllers/RocketStudentController.js');

const router = express.Router();

router.post('/loginRocketStudent', loginRocketStudent);
router.get('/getAllStudents', getAllStudents);
router.post('/registerRocketStudent', registerRocketStudent);
router.post('/createRocketStudent', createRocketStudent);
router.get('/getRocketStudent/:id', getRocketStudent);
router.put('/updateRocketStudent/:id', updateRocketStudent);
router.delete('/deleteRocketStudent/:id', deleteRocketStudent);

module.exports = router;