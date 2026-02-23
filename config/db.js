const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // Mongoose 7+ no longer needs these options, but kept for clarity
    });
    console.log(`✅  MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`\n❌  FATAL: MongoDB connection failed: ${err.message}`);
    console.error(`💡  TIP: Make sure MongoDB is installed and running on your system.`);
    console.error(`          If you're using a local MongoDB, try running: 'mongod'\n`);
    process.exit(1);
  }
};

module.exports = connectDB;
