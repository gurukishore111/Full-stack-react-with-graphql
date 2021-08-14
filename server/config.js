const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const DB_URL = process.env.DB_URL;

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(DB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    console.log(`Mongo db connected:${conn.connection.host}`);
  } catch (error) {
    console.log(`Error${error.message}`);
    process.exit(1);
  }
};

module.exports = { connectDb };
