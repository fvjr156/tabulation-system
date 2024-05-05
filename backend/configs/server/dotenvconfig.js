require('dotenv').config();

module.exports = {
    serverPort: process.env.SERVER_PORT,
    jwtSecret: process.env.JWT_SECRET_KEY
};