const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const mongo_db_url = 'mongodb://127.0.0.1:27017/wanderlust';

 
main().then(()=>{
    console.log("connected to DB");
}).catch((err)=> {
    console.log(err);
});

async function main(){
    await mongoose.connect(mongo_db_url);
}


const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj, owner: "66e6298ac9b39e2c6322ad30"}));
    await Listing.insertMany(initData.data);
    console.log("Data was initialized");
};

initDB();

