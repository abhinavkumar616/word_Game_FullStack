const gameModel=require("../model/gameModel")


const getData=async(req,res)=>{

        try {

            let data=await gameModel.find()
            // console.log("data",data);

            res.status(201).send({
                status_code: 201,
                data:data
            });
        } catch (error) {
            res.status(500).send({ 
                status_code: 500, 
                message:"Internal Server Error",
                error:error.message
             });
        }
}
module.exports=getData