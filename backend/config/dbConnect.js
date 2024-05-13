const mongoose=require("mongoose")

async function getData(){
    try{
        await mongoose.connect(process.env.DB_KEY)
        console.log("Database connected");
    }
    catch(error){
        console.log("error",error);
    }
}
getData()