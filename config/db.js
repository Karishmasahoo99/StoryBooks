const mongoose=require('mongoose');
require('dotenv').config({path: './config/config'});

const connectdb= async()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useFindAndModify:false
        })
        console.log("MongoDb connected "+ conn.connection.host)
    }
    catch(err){
        console.log(err)
        process.exit(1)
    }
}

module.exports= connectdb;