const mongoose=require("mongoose")

const gameModelSchema=new mongoose.Schema({

    words:{
        type:String
    }

})

const gameModel=new mongoose.model("game",gameModelSchema)
module.exports=gameModel