const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();


const URL1 =process.env.MONGODB;            //atlas database
const URL2 =process.env.MONGODBURL;         // local database




main().then((res)=>{
    console.log("connected to DB");
})
.catch((err)=>{
    console.log(err);

})
/*database connectivity */
async function main(){
    await mongoose.connect(process.env.ATLASDB_URL);
    
}
