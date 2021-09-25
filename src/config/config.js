module.exports = {
    DB: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    },
    JWT: {
        secret_key: process.env.JWT_SECRET_KEY
    }
}