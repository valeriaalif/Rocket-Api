const { db } = require('../firebaseAdmin'); 
const RocketBabies = require('../Models/RocketBabiesModel');
const admin = require('firebase-admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const rocketBabiesCollection = db.collection('rocketBabies');

exports.registerRocketBabies = async (req, res, next) => {
  try {

    console.log(req.body);  
    
    const user = new RocketBabies(
      null, 
      req.body.userName,
      req.body.courseTitle,
      req.body.parent,
      req.body.nationalId,
      hashedPassword,
      req.body.email,
      req.body.age,
      req.body.birthDate,
      req.body.nationality,
      req.body.area,
      req.body.province,
      req.body.district,
      req.body.kidName
    );

    const userPlainObject = {
      userName: user.userName,
      courseTitle: user.courseTitle,
      name: user.parent,
      nationalId: user.nationalId,
      password: user.password,
      email: user.email,
      age: user.age,
      birthDate: user.birthDate,
      nationality: user.nationality,
      area: user.area,
      province: user.province,
      district: user.district,
      kidName: user.kidName,
    };

   
   await rocketBabiesCollection.add(userPlainObject);

    res.status(200).json({ token, message: 'User registered successfully' });
  } catch (error) {
    res.status(400).send(error.message);
  }
};




exports.createRocketBabies = async (req, res, next) => {
  try {
    const data = req.body;
    await rocketBabiesCollection.add(data);
    res.status(200).send('User created successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
};



exports.getAllRocketBabies = async (req, res, next) => {
  try {
    const rocketBabies = await rocketBabiesCollection.get();
    const rocketBabiesArray = [];

    if (rocketBabies.empty) {
      res.status(400).send('No Users found');
    } else {
        rocketBabies.forEach((doc) => {
        const RocketBabies = new RocketBabies(
          doc.id,
          doc.data().parent,
          doc.data().nationalId,
          doc.data().password,
          doc.data().email,
          doc.data().age,
          doc.data().birthDate,
          doc.data().nationality,
          doc.data().area,
          doc.data().province,
          doc.data().district,
          doc.data().kidName,
          doc.data().access
        );
        rocketBabiesArray.push(rocketBabies);
      });

      res.status(200).send(rocketStudentArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.getRocketBabies = async (req, res, next) => {
  try {
    const id = req.params.id;
    const RocketBabiesDoc = rocketBabiesCollection.doc(id);
    const data = await RocketBabiesDoc.get();
    if (data.exists) {
      res.status(200).send(data.data());
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.updateRocketBabies = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const RocketBabiesDoc = rocketBabiesCollection.doc(id);
    await RocketBabiesDoc.update(data);
    res.status(200).send('User updated successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.deleteRocketBabies = async (req, res, next) => {
  try {
    const id = req.params.id;
    await rocketBabiesCollection.doc(id).delete();
    res.status(200).send('User deleted successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
};
