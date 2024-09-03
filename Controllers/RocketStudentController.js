const { db } = require('../firebaseAdmin'); 
const TechAcademy = require('../Models/RocketStudentModel');
const admin = require('firebase-admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const rocketStudentsCollection = db.collection('rocketStudents');

exports.registerRocketStudent = async (req, res, next) => {
  try {

    console.log(req.body);  
    
    if (!req.body.password) {  
      return res.status(400).json({ error: 'Password is required' });
    }


    const hashedPassword = await bcrypt.hash(req.body.password, 2); // 

   
    const user = new RocketStudent(
      null, 
      req.body.name,
      req.body.email,
      hashedPassword,
      req.body.nationality,
      req.body.age,
      req.body.academicDegree,
      req.body.phone,
      req.body.area,
      req.body.province,
      req.body.district,
      req.body.student,
      req.body.organization,
      'RocketStudent'
      
    );

    const userPlainObject = {
      name: user.name,
      email: user.email,
      password: user.password,
      nationality: user.nationality,
      age: user.age,
      academicDegree: user.academicDegree,
      phone: user.phone,
      area: user.area,
      province: user.province,
      district: user.district,
      student: user.student,
      organization: user.organization,
      access: user.access
    
    };

   
    const savedUserRef = await rocketStudentsCollection.add(userPlainObject);


    const token = jwt.sign(
      {
        Id: savedUserRef.id,
        userName: user.name,
        userEmail: user.email,
        userRole: user.access
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '1h' }
    );

    res.status(200).json({ token, message: 'User registered successfully' });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.loginRocketStudent = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userQuerySnapshot = await rocketStudentsCollection.where('email', '==', email).limit(1).get();

  
    if (userQuerySnapshot.empty) {
      return res.status(401).json({ error: 'Authentication failed: User not found' });
    }

   
    const userDoc = userQuerySnapshot.docs[0];
    const userData = userDoc.data(); 
    const passwordMatch = await bcrypt.compare(password, userData.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Authentication failed: Incorrect password' });
    }


    if (req.headers['authorization']) {
      authenticateToken(req, res, async () => {
        const token = jwt.sign(
          { Id: userDoc.id },
          process.env.JWT_SECRET_KEY,
          { expiresIn: '1h' }
        );
        res.status(200).json({ token });
      });
    } else {
      
      const token = jwt.sign(
        {
          Id: userDoc.id,
          userRole: userData.access,
          userName: userData.name,
          userEmail: userData.email,
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: '1h' }
      );
      res.status(200).json({ token });
    }

  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({ error: 'Login failed' });
  }
};



exports.createRocketStudent = async (req, res, next) => {
  try {
    const data = req.body;
    await rocketStudentsCollection.add(data);
    res.status(200).send('UserTechAcademy created successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
};



exports.getAllStudents = async (req, res, next) => {
  try {
    const rocketStudent = await rocketStudentsCollection.get();
    const rocketStudentArray = [];

    if (rocketStudent.empty) {
      res.status(400).send('No Users found');
    } else {
        rocketStudent.forEach((doc) => {
        const techAcademy = new TechAcademy(
          doc.id,
          doc.data().name,
          doc.data().email,
          doc.data().password,
          doc.data().nationality,
          doc.data().age,
          doc.data().academicDegree,
          doc.data().phone,
          doc.data().area,
          doc.data().province,
          doc.data().district,
          doc.data().student,
          doc.data().organization,
          doc.data().access
        );
        rocketStudentArray.push(rocketStudent);
      });

      res.status(200).send(rocketStudentArray);
    }
  } catch (error) {
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
