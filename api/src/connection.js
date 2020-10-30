const mongoose = require("mongoose");

const connection = process.env.MONGODB_URI || 'mongodb://localhost/contact_db';

const connectDb = () => {
  return mongoose.connect(connection);
};

module.exports = connectDb;
