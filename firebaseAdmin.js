

const admin = require('firebase-admin');
const config = require('./config.js');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: config.firebaseConfig.storageBucket, 
});

const db = admin.firestore();

module.exports = {
    admin,
    db
  };