const mongoose=require("mongoose")

const scoreModelSchema=new mongoose.Schema({

    username:{
        type:String
    },
    email:{
        type:String
    },
    total_score:{
        type:String
    }

})

const scoreModel=new mongoose.model("score",scoreModelSchema)
module.exports=scoreModel