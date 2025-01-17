const { db } = require('../firebaseAdmin'); 
const User = require('../Models/AuthModel');
const admin = require('firebase-admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { auth } = require('firebase-admin');
const { default: firebase } = require('firebase/compat/app');
const { initializeApp } = require('firebase-admin/app');
const firebaseAdmin = require('../firebaseAdmin');
const usersCollection = db.collection('users');


exports.registerUser = async (req, res, next) => {
  try {
    const { fullname, nationalId, age, phone, nationality, email, password } = req.body;

    if (!password) {
      return res.status(400).json({ error: 'Password is required' });
    }

    // Step 1: Create the user in Firebase Authentication using the Admin SDK
    const firebaseUser = await admin.auth().createUser({
      email,
      password,
      displayName: fullname,
    });

    const userId = firebaseUser.uid; // Firebase user ID

    // Step 2: Hash the password for your database (optional, if you need it for local use)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Step 3: Create the user object for Firestore
    const user = new User(
      userId, // Use Firebase user ID as a unique identifier
      fullname,
      nationalId,
      age,
      phone,
      nationality,
      email,
      hashedPassword,
      'user'
    );

    const userPlainObject = {
      name: user.fullname,
      nationalId: user.nationalId,
      age: user.age,
      phone: user.phone,
      nationality: user.nationality,
      email: user.email,
      password: user.password,
      access: user.access,
    };

    // Step 4: Store the user in Firestore
    const savedUserRef = await usersCollection.add(userPlainObject);

    // Step 5: Generate a JWT token
    const token = jwt.sign(
      {
        id: savedUserRef.id,
        userName: user.fullname,
        userEmail: user.email,
        userRole: user.access,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '1h' }
    );

    // Step 6: Return the token and success message
    res.status(200).json({ token, message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    console.log('Request body:', req.body); // Log the incoming request body
    const { email, password } = req.body;

    const userQuerySnapshot = await usersCollection.where('email', '==', email).limit(1).get();

  
    if (userQuerySnapshot.empty) {
      return res.status(401).json({ error: 'Authentication failed: User is not on the list' });
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



exports.createUser = async (req, res, next) => {
  try {
    const data = req.body;
    await usersCollection.add(data);
    res.status(200).send('User created successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
};



exports.getAllUsers = async (req, res, next) => {
  try {
    const rocketUser = await usersCollection.get();
    const usersArray = [];

    if (rocketUser.empty) {
      res.status(400).send('No Users found');
    } else {
        rocketUser.forEach((doc) => {
        const rocketUser = new rocketUser(
          doc.id,
          doc.data().name,
          doc.data().email,
          doc.data().password,
          doc.data().nationality,
          doc.data().age,
          doc.data().phone,
          doc.data().access
        );
        usersArray.push(rocketUser);
      });

      res.status(200).send(usersArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const userDoc = usersCollection.doc(id);
    const data = await userDoc.get();
    if (data.exists) {
      res.status(200).send(data.data());
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.getUserbyEmail = async (req, res, next) => {
  try {
    const { email, password } = req.body; // Get the email from the request body

    // Query the usersCollection to find the user by email
    const userQuerySnapshot = await usersCollection.where('email', '==', email).limit(1).get();

    if (userQuerySnapshot.empty) {
      return res.status(404).send('User not found'); // If no user found, return 404
    }

    // If a user is found, get the user data
    const userDoc = userQuerySnapshot.docs[0];
    res.status(200).send(userDoc.data()); // Send back the user data
    const passwordMatch = await bcrypt.compare(password, userData.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Authentication failed: Incorrect password' });
    }


  } catch (error) {
    res.status(400).send(error.message); // Handle errors
  }
};



exports.updateUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const userDoc = usersCollection.doc(id);
    await userDoc.update(data);
    res.status(200).send('User updated successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    await usersCollection.doc(id).delete();
    res.status(200).send('User deleted successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.forgotPwd = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required." });
  }

  try {
    // Generate a password reset email using Firebase Admin
    await sendPasswordResetEmail(auth,email)
    .then(() => console.log("Password Reset Email Sent")
    .catch((error)=> console.log(error.message)));

    // Respond with success
    res.status(200).json({
      message: "Password reset email sent successfully. Please check your email.",
    });
  } catch (error) {
    console.error("Error sending password reset email:", error);

    // Handle errors and respond with appropriate messages
    if (error.code === 'auth/user-not-found') {
      return res.status(404).json({
        message: "No user found with the provided email.",
      });
    }

    res.status(500).json({
      message: "Failed to send password reset email. Please try again later.",
    });
  }
};


// Simple logout route - just to demonstrate API structure
exports.logout = async (req, res) => {
  try {
    // Simply respond to indicate logout success
    res.status(200).json({ message: 'Logged out successfully' });

    // On the client side, you will remove the token from storage (e.g., AsyncStorage, localStorage, etc.).
  } catch (error) {
    console.error('Logout error:', error.message);
    res.status(500).json({ error: 'Logout failed' });
  }
};
