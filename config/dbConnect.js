const mongoose = require('mongoose');

exports.dbConnect = async () => {
    try{
        const DB_URL = process.env.DB_URL;
        await mongoose.connect(DB_URL);
        console.log("Database Connected");
        
    }
    catch(e) {
        console.log(e);
    }
}