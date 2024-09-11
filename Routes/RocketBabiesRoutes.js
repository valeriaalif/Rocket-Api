const express = require('express');
const {
registerRocketBabies,
loginRocketBabies,
createRocketBabies,
getAllRocketBabies,
getRocketBabies,
updateRocketBabies,
deleteRocketBabies,
} = require('../Controllers/RocketBabiesController.js');

const router = express.Router();

router.post('/loginRocketBabies', loginRocketBabies);
router.get('/getAllRocketBabies', getAllRocketBabies);
router.post('/registerRocketBabies', registerRocketBabies);
router.post('/createRocketBabies', createRocketBabies);
router.get('/getRocketBabies/:id', getRocketBabies);
router.put('/updateRocketBabies/:id', updateRocketBabies);
router.delete('/deleteRocketBabies/:id', deleteRocketBabies);

module.exports = router;