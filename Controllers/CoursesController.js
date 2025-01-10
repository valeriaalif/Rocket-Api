const { db } = require('../firebaseAdmin'); 
const Courses = require('../Models/CoursesModel');
const admin = require('firebase-admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const coursesCollection = db.collection('courses');
const coursesStudentsCollection = db.collection('studentcourses');
const coursesBabiesCollection = db.collection('babiescourses');

exports.registerCourse = async (req, res, next) => {
  try {

   
    const course = new Courses(
      null, 
      req.body.title,
      req.body.teacher,
      req.body.startDate,
      req.body.finishDate,
      req.body.schedule,
      req.body.duration,
      req.body.platform,
      req.body.totalHours,
      req.body.mode,
      req.body.availability,
      req.body.inscriptionEndDate,
      req.body.sendEmailDate,
      req.body.benefits,
      req.body.description,
      req.body.content,
      req.body.audience,
      req.body.requirements,
      req.body.difficulty,  
    );

    const coursePlainObject = {
      title: course.title,
      teacher: course.teacher,
      startDate: course.startDate,
      finishDate: course.finishDate,
      schedule: course.schedule,
      duration: course.duration,
      platform: course.platform,
      totalHours: course.totalHours,
      mode: course.mode,
      availability: course.availability,
      inscriptionEndDate: course.inscriptionEndDate,
      sendEmailDate: course.sendEmailDate,
      benefits: course.benefits,
      description: course.description,
      content: course.content,
      audience: course.audience,
      requirements: course.requirements,
      difficulty: course.difficulty,
    };

    await coursesCollection.add(coursePlainObject);

    res.status(200).json({ message: 'Course registered successfully' });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.registerCourseStudents = async (req, res, next) => {
  try {

   
    const course = new Courses(
      null, 
      req.body.title,
      req.body.teacher,
      req.body.startDate,
      req.body.finishDate,
      req.body.schedule,
      req.body.duration,
      req.body.platform,
      req.body.totalHours,
      req.body.mode,
      req.body.availability,
      req.body.inscriptionEndDate,
      req.body.sendEmailDate,
      req.body.benefits,
      req.body.description,
      req.body.content,
      req.body.audience,
      req.body.requirements,
      req.body.difficulty,  
    );

    const coursePlainObject = {
      title: course.title,
      teacher: course.teacher,
      startDate: course.startDate,
      finishDate: course.finishDate,
      schedule: course.schedule,
      duration: course.duration,
      platform: course.platform,
      totalHours: course.totalHours,
      mode: course.mode,
      availability: course.availability,
      inscriptionEndDate: course.inscriptionEndDate,
      sendEmailDate: course.sendEmailDate,
      benefits: course.benefits,
      description: course.description,
      content: course.content,
      audience: course.audience,
      requirements: course.requirements,
      difficulty: course.difficulty,
    };

    await coursesStudentsCollection.add(coursePlainObject);

    res.status(200).json({ message: 'Course registered successfully' });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.registerCourseBabies = async (req, res, next) => {
  try {

   
    const course = new Courses(
      null, 
      req.body.title,
      req.body.teacher,
      req.body.startDate,
      req.body.finishDate,
      req.body.schedule,
      req.body.duration,
      req.body.platform,
      req.body.totalHours,
      req.body.mode,
      req.body.availability,
      req.body.inscriptionEndDate,
      req.body.sendEmailDate,
      req.body.benefits,
      req.body.description,
      req.body.content,
      req.body.audience,
      req.body.requirements,
      req.body.difficulty,  
    );

    const coursePlainObject = {
      title: course.title,
      teacher: course.teacher,
      startDate: course.startDate,
      finishDate: course.finishDate,
      schedule: course.schedule,
      duration: course.duration,
      platform: course.platform,
      totalHours: course.totalHours,
      mode: course.mode,
      availability: course.availability,
      inscriptionEndDate: course.inscriptionEndDate,
      sendEmailDate: course.sendEmailDate,
      benefits: course.benefits,
      description: course.description,
      content: course.content,
      audience: course.audience,
      requirements: course.requirements,
      difficulty: course.difficulty,
    };

    await coursesBabiesCollection.add(coursePlainObject);

    res.status(200).json({ message: 'Course registered successfully' });
  } catch (error) {
    res.status(400).send(error.message);
  }
};





exports.getAllCourses = async (req, res, next) => {
  try {
    const courses = await coursesCollection.get();
    const coursesArray = [];

    if (courses.empty) {
      res.status(400).send('No Users found');
    } else {
      courses.forEach((doc) => {
        const course = new Courses(
          doc.id,
          doc.data().title,
          doc.data().teacher,
          doc.data().startDate,
          doc.data().finishDate,
          doc.data().schedule,
          doc.data().duration,
          doc.data().platform,
          doc.data().totalHours,
          doc.data().mode,
          doc.data().availability,
          doc.data().inscriptionEndDate,
          doc.data().sendEmailDate,
          doc.data().benefits,
          doc.data().description,
          doc.data().content,
          doc.data().audience,
          doc.data().requirements,
          doc.data().difficulty
        );
        coursesArray.push(course);
      });

      res.status(200).send(coursesArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.getAllCoursesBabies = async (req, res, next) => {
  try {
    const courses = await coursesBabiesCollection.get();
    const coursesArray = [];

    if (courses.empty) {
      res.status(400).send('No Users found');
    } else {
      courses.forEach((doc) => {
        const course = new Courses(
          doc.id,
          doc.data().title,
          doc.data().teacher,
          doc.data().startDate,
          doc.data().finishDate,
          doc.data().schedule,
          doc.data().duration,
          doc.data().platform,
          doc.data().totalHours,
          doc.data().mode,
          doc.data().availability,
          doc.data().inscriptionEndDate,
          doc.data().sendEmailDate,
          doc.data().benefits,
          doc.data().description,
          doc.data().content,
          doc.data().audience,
          doc.data().requirements,
          doc.data().difficulty
        );
        coursesArray.push(course);
      });

      res.status(200).send(coursesArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.getAllCoursesStudents = async (req, res, next) => {
  try {
    const courses = await coursesStudentsCollection.get();
    const coursesArray = [];

    if (courses.empty) {
      res.status(400).send('No Users found');
    } else {
      courses.forEach((doc) => {
        const course = new Courses(
          doc.id,
          doc.data().title,
          doc.data().teacher,
          doc.data().startDate,
          doc.data().finishDate,
          doc.data().schedule,
          doc.data().duration,
          doc.data().platform,
          doc.data().totalHours,
          doc.data().mode,
          doc.data().availability,
          doc.data().inscriptionEndDate,
          doc.data().sendEmailDate,
          doc.data().benefits,
          doc.data().description,
          doc.data().content,
          doc.data().audience,
          doc.data().requirements,
          doc.data().difficulty
        );
        coursesArray.push(course);
      });

      res.status(200).send(coursesArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.getCourse = async (req, res, next) => {
  try {
    const id = req.params.id;
    const coursesDoc = coursesCollection.doc(id);
    const data = await coursesDoc.get();
    if (data.exists) {
      res.status(200).send(data.data());
    } else {
      res.status(404).send('Course not found');
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.getCourseStudents = async (req, res, next) => {
  try {
    const id = req.params.id;
    const coursesDoc = coursesStudentsCollection.doc(id);
    const data = await coursesDoc.get();
    if (data.exists) {
      res.status(200).send(data.data());
    } else {
      res.status(404).send('Course not found');
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};


exports.getCourseBabies = async (req, res, next) => {
  try {
    const id = req.params.id;
    const coursesDoc = coursesBabiesCollection.doc(id);
    const data = await coursesDoc.get();
    if (data.exists) {
      res.status(200).send(data.data());
    } else {
      res.status(404).send('Course not found');
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};



exports.updateCourse = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    console.log("Updating course with ID:", id); // Log the ID
    console.log("Received data:", data); // Log the data
    const coursesDoc = coursesCollection.doc(id);
    await coursesDoc.update(data);
    res.status(200).send('Course updated successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.updateCourseBabies = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const coursesDoc = coursesBabiesCollection.doc(id);
    await coursesDoc.update(data);
    res.status(200).send('Course updated successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.updateCourseStudents = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const coursesDoc = coursesStudentsCollection.doc(id);
    await coursesDoc.update(data);
    res.status(200).send('Course updated successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.deleteCourse = async (req, res, next) => {
  try {
    const id = req.params.id;
    await coursesCollection.doc(id).delete();
    res.status(200).send('Course deleted successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.deleteCourseBabies = async (req, res, next) => {
  try {
    const id = req.params.id;
    await coursesBabiesCollection.doc(id).delete();
    res.status(200).send('Course deleted successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.deleteCourseStudents = async (req, res, next) => {
  try {
    const id = req.params.id;
    await coursesStudentsCollection.doc(id).delete();
    res.status(200).send('Course deleted successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
};