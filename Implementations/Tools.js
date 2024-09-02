const crypto = require('crypto');
const jwt = require('jsonwebtoken');

function generateSecretKey(length) {
    return crypto.randomBytes(length).toString('hex');
}

// Generate a 256-bit (32 bytes) key
const secretKey = generateSecretKey(32);
console.log(`Generated JWT Secret Key: ${secretKey}`);

