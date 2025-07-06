const mongoose = require('mongoose');
const dbURL = process.env.db_url;
 const connectDB = async()=>{
    try{
        await mongoose.connect(dbURL);
        console.log(dbURL);
        
    }catch(err){
        console.log(err.message);
        
    }
 }
 module.exports = connectDB;