const mongoose = require('mongoose');

async function connectToDatabase() {
  try {
    await mongoose.connect('mongodb://localhost:27017/DataLensArticles', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      connectTimeoutMS: 30000,
    });
    console.log('Connected to MongoDB DataLensArticles');
  } catch (error) {
    console.error('Error connecting to MongoDB:DataLensArticles', error);
  }
}

module.exports = connectToDatabase;
