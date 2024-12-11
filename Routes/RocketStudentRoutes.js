const express = require('express');
const {
registerRocketStudent,
createRocketStudent,
getRocketStudent,
updateRocketStudent,
deleteRocketStudent,
} = require('../Controllers/RocketStudentController.js');

const router = express.Router();

router.post('/registerRocketStudent', registerRocketStudent);
//router.post('/createRocketStudent', createRocketStudent);
router.get('/getRocketStudent/:id', getRocketStudent);
router.put('/updateRocketStudent/:id', updateRocketStudent);
router.delete('/deleteRocketStudent/:id', deleteRocketStudent);

module.exports = router;