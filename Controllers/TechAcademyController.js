const { db } = require('../firebaseAdmin'); 
const TechAcademy = require('../Models/TechAcademyModel');
const admin = require('firebase-admin');


const techAcademyCollection = db.collection('techAcademy');

exports.createUserTechAcademy = async (req, res, next) => {
  try {
    const data = req.body;
    await techAcademyCollection.add(data);
    res.status(200).send('UserTechAcademy created successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.getAllUsersTechAcademy = async (req, res, next) => {
  try {
    const techAcademy = await techAcademyCollection.get();
    const techAcademyArray = [];

    if (techAcademy.empty) {
      res.status(400).send('No Users found');
    } else {
      techAcademy.forEach((doc) => {
        const techAcademy = new TechAcademy(
          doc.id,
          doc.data().name,
          doc.data().phone,
          doc.data().nationalId,
          doc.data().email,
          doc.data().age,
          doc.data().englishLevel,
          doc.data().birthDate,
          doc.data().nationality,
          doc.data().province,
          doc.data().district,
          doc.data().area,
          doc.data().academicDegree,
          doc.data().children,
          doc.data().organization,
          doc.data().access
        );
        techAcademyArray.push(techAcademy);
      });

      res.status(200).send(techAcademyArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.getUserTechAcademy = async (req, res, next) => {
  try {
    const id = req.params.id;
    const techAcademyDoc = techAcademyCollection.doc(id);
    const data = await techAcademyDoc.get();
    if (data.exists) {
      res.status(200).send(data.data());
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.updateUserTechAcademy = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const techAcademyDoc = techAcademyCollection.doc(id);
    await techAcademyDoc.update(data);
    res.status(200).send('User updated successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.deleteUserTechAcademy = async (req, res, next) => {
  try {
    const id = req.params.id;
    await techAcademyCollection.doc(id).delete();
    res.status(200).send('User deleted successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
};
