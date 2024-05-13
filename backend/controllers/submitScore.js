const scoreModel=require("../model/scoreModel")

const submitScore=async(req,res)=>{

    try{
        const { username,email,total_score } = req.body;
        const newUser = await scoreModel.create({ 
            username,email,total_score
        });
        await newUser.save();

        res.status(201).send({
            status_code: 201,
            data:newUser
        });
    }
    catch(error){
        res.status(500).send({ 
            status_code: 500, 
            message:"Internal Server Error",
            error:error.message
         });
    }

}

module.exports=submitScore