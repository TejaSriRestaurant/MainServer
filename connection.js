const mongoose = require('mongoose');

const MONGO_URI =
  "mongodb+srv://tejasribirayani:tejasribirayani123@restaurant.eoe9cna.mongodb.net/dbforrat";

const connectDb = async () =>{
    const connection = await mongoose.connect(MONGO_URI);
    if(connection) console.log('Database Connected');
    else console.log('Database connection failed');
}

module.exports = {connectDb};