const express = require('express');
const {
registerCourse,
registerCourseBabies,
registerCourseStudents,
getAllCourses,
getAllCoursesBabies,
getAllCoursesStudents,
getCourse,
getCourseBabies,
getCourseStudents,
updateCourse,
updateCourseBabies,
updateCourseStudents,
deleteCourse,
deleteCourseBabies,
deleteCourseStudents
} = require('../Controllers/CoursesController.js');

const router = express.Router();

router.get('/getAllCourses', getAllCourses);
router.get('/getAllCoursesBabies', getAllCoursesBabies);
router.get('/getAllCoursesStudents', getAllCoursesStudents);
router.post('/registerCourse', registerCourse);
router.post('/registerCourseBabies', registerCourseBabies);
router.post('/registerCourseStudents', registerCourseStudents);
router.get('/getCourse/:id', getCourse);
router.get('/getCourseBabies/:id', getCourseBabies);
router.get('/getCourseStudents/:id', getCourseStudents);
router.put('/updateCourse/:id', updateCourse);
router.put('/updateCourseBabies/:id', updateCourseBabies);
router.put('/updateCourseStudents/:id', updateCourseStudents);
router.delete('/deleteCourse/:id', deleteCourse);
router.delete('/deleteCourseBabies/:id', deleteCourseBabies);
router.delete('/deleteCourseStudents/:id', deleteCourseStudents);

module.exports = router;