const mongoose = require("mongoose");

async function connectToDatabase() {
  try {
    // await mongoose.connect('mongodb://localhost:27017/DataLensArticles', {
    await mongoose.connect(process.env.MONGODB_ATLAS, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      connectTimeoutMS: 30000,
    });
    
  } catch (error) {
    console.error("Error connecting to MongoDB:DataLensArticles", error);
  }
}

module.exports = connectToDatabase;
