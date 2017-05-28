var isProduction = (process.env.NODE_ENV === 'production');

module.exports = {
    port: isProduction ? process.env.PORT : 8080,
    database: isProduction ? process.env.MONGODB_URI : 'mongodb://localhost/voting'
}
