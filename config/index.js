require('dotenv').config();

const config = {
    dev: process.env.NODE_ENV && process.env.NODE_ENV.trim() !== 'production',
    port: process.env.PORT || 3000,
    cors: process.env.CORS,
    dbHost: process.env.DB_HOST,
    dbName: process.env.DB_NAME,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbPort: process.env.DB_PORT
}

module.exports = { config };
