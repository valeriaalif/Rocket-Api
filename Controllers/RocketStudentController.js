const { db } = require('../firebaseAdmin'); 
const RocketStudent = require('../Models/RocketStudentModel');
const admin = require('firebase-admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const rocketStudentsCollection = db.collection('rocketStudents');


exports.registerRocketStudent = async (req, res, next) => {
  try {
  


 
    const inscriptionRocketStudent = new RocketStudent(
      null, 
      req.body.userName,
      req.body.courseTitle,
      req.body.age, 
      req.body.academicDegree,
      req.body.area,
      req.body.province,
      req.body.district,
      req.body.student,
      req.body.organization,
    );

 
    const inscriptionRocketStudentPlainObject = {
      userName: inscriptionRocketStudent.userName,
      courseTitle: inscriptionRocketStudent.courseTitle,
      age: inscriptionRocketStudent.age,
      academicDegree: inscriptionRocketStudent.academicDegree,
      area: inscriptionRocketStudent.area,
      province: inscriptionRocketStudent.province,
      district: inscriptionRocketStudent.district,
      student: inscriptionRocketStudent.student,
      organization: inscriptionRocketStudent.organization,
    };

   
    await rocketStudentsCollection.add(inscriptionRocketStudentPlainObject);

    
    res.status(200).json({
      message: 'Inscription registered successfully',
    });
  } catch (error) {
    console.error("Error registering inscription:", error.message); 
    res.status(400).send(error.message);
  }
};





exports.getRocketStudent = async (req, res, next) => {
  try {
    const id = req.params.id;
    const RocketStudentDoc = rocketStudentsCollection.doc(id);
    const data = await RocketStudentDoc.get();
    if (data.exists) {
      res.status(200).send(data.data());
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.updateRocketStudent = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const RocketStudentDoc = rocketStudentsCollection.doc(id);
    await RocketStudentDoc.update(data);
    res.status(200).send('User updated successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.deleteRocketStudent = async (req, res, next) => {
  try {
    const id = req.params.id;
    await rocketStudentsCollection.doc(id).delete();
    res.status(200).send('User deleted successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
};
