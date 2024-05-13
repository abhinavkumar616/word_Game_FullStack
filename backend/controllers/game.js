const gameModel=require("../model/gameModel")

const game=async(req,res)=>{

        try {
            const { words } = req.body;
            const newUser = await gameModel.create({ 
                words
            });
            await newUser.save();

            res.status(201).send({
                status_code: 201,
                data:newUser
            });
        } catch (error) {
            res.status(500).send({ 
                status_code: 500, 
                message:"Internal Server Error",
                error:error.message
             });
        }
}
module.exports=game