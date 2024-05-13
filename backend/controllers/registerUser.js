const userModel=require("../model/userModel")

const jwt=require("jsonwebtoken")

const registerUser=async(req,res)=>{

        try {
            const { username, email, mobile,password } = req.body;

            if(await userModel.findOne({email})){
                return res.status(400).send({
                    status_code: 400,
                    error: "Email already exists"
                });
            }

            const newUser = await userModel.create({ 
                username, email, mobile,password
            });
            await newUser.save();

            let token=jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
                data:newUser
            },process.env.JWT_SECRET)
            
            console.log("jwt--------",token);

            res.status(201).send({
                status_code: 201,
                message: 'User created successfully',
                data: {
                    username,
                    email,
                    mobile,
                    token
                }
              
            });
        } catch (error) {
            res.status(500).send({ 
                status_code: 500, 
                message:"Internal Server Error",
                error:error.message
             });
        }
}
module.exports=registerUser