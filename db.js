import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const mongoURI = process.env.MONGO_URI;
const mongoDB = async() => {
   await mongoose.connect(mongoURI,{useUnifiedTopology: true},async(err,result)=>{  
       if(err) console.log("---",err)
       else{
        console.log("connected");
    
    }
            
           
            
        });
    }
    export default mongoDB;
    