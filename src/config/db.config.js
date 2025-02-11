const mongoose = require('mongoose');
const { dbConfig } = require('./config');

const dbInit = async() => {
    try{
        await mongoose.connect(dbConfig.mongo.url,{
            dbName: dbConfig.mongo.dbName,
            autoCreate: true,
            autoIndex: true,
        })
        console.log("Database server connected successfully...");
    }catch(exception){
        console.log("Error establishing db connection");
    }
}

dbInit();