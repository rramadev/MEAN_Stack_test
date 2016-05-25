var config = {};

// MongoDB Uri
config.mongoUri = 'mongodb://localhost:27017/restaurant';
config.cookieMaxAge = 30 * 24 * 3600 * 1000; // 30 days in ms

module.exports = config;
