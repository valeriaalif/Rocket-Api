const express = require('express');
const {
registerCourse,
getAllCourses,
getCourse,
updateCourse,
deleteCourse,
} = require('../Controllers/CoursesController.js');

const router = express.Router();

router.get('/getAllCourses', getAllCourses);
router.post('/registerCourse', registerCourse);
router.get('/getCourse/:id', getCourse);
router.put('/updateCourse/:id', updateCourse);
router.delete('/deleteCourse/:id', deleteCourse);

module.exports = router;