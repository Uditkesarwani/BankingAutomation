


const mongoose = require('mongoose');

async function ConnectDB(url) {
  
  
  try {
    await mongoose.connect(url);

    console.log("MongoDB Connected....");
  } catch (error) {
    console.log("Error MongoDB Connection: ", error);
  }
}

module.exports = { ConnectDB };
