const userModel=require("../model/userModel")

const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

const loginUser=async(req,res)=>{

    const {email,password}=req.body

    userModel.findOne({email:email})
    .then((user)=>{
        console.log("user----",user);

        if(user){
            bcrypt.compare(password,user.password,(err,result)=>{
                if(err){
                    res.status(404).send({
                        error:err.message
                    })
                }
                else if(result){
                    let token=jwt.sign({
                        exp: Math.floor(Date.now() / 1000) + (60 * 60),
                        data:user
                    },process.env.JWT_SECRET,)
                    console.log("login token----",token);
                    res.status(200).send({
                        message:"Login Successfully",
                        token
                    })
                }
                else{
                    res.status(404).send({
                        message:"emailId & Password does not matched"
                    })
                }
            })
        }
        else{
            res.status(400).send({
                message:"No user found"
            })
        }
    })
    .catch((error)=>{
        res.status(500).send({
            error:error.message
        })
    })

}

module.exports=loginUser