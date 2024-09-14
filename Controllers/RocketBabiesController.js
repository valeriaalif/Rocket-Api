const { db } = require('../firebaseAdmin'); 
const RocketBabies = require('../Models/RocketBabiesModel');
const admin = require('firebase-admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const rocketBabiesCollection = db.collection('rocketBabies');

exports.registerRocketBabies = async (req, res, next) => {
  try {

    console.log(req.body);  
    
    if (!req.body.password) {  
      return res.status(400).json({ error: 'Password is required' });
    }


    const hashedPassword = await bcrypt.hash(req.body.password, 2); // 

   
    const user = new RocketBabies(
      null, 
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
      req.body.kidName,
      'RocketBabies'
      
    );

    const userPlainObject = {
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
      access: user.access
    
    };

   
    const savedUserRef = await rocketBabiesCollection.add(userPlainObject);


    const token = jwt.sign(
      {
        Id: savedUserRef.id,
        userName: user.parent,
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

exports.loginRocketBabies = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userQuerySnapshot = await rocketBabiesCollection.where('email', '==', email).limit(1).get();

  
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
          userName: userData.parent,
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
