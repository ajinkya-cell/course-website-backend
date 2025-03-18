const {Router, application} = require("express")
const userRouter = Router(); 
const {userModel} = require("../db")
app.use(express.json)
const jwt = require("jsonwebtoken");
const {JWT_USER_PASSSWORD} = require("../config")

const app = express()
userRouter.post("/signup" ,async function(req , res){
   const {email , password , firstName , lastName} = req.body
   //hash the passworrd , put zoc validations and put in the trycatch block
   await userModel.create({
    email:email,
    password:password,
    firstName:firstName,
    lastName:lastName
   })

   res.json({
    message:"signup succeded"
   })
})

userRouter.post("/signin" ,async function(req , res){
    const {email , password} = req.body;
    const user = await userModel.findOne({
        email:email , 
        password :password
    });
    //cant use .find because it will give all the passwords to be token thats why we have to use the usermodel.findOne
    if (user){
        const token = jwt.sign({
           id:user._id
        } , JWT_USER_PASSSWORD)
        res.json({
            token:token
        })
    }else {
        res.status(403).json({
            message:"incorrect credentials"
        })
    }
   
})

userRouter.get("/purchases" , function(req , res){
    res.json({
        message : "signup endpoint"
    })
})

module.exports = {
    userRouter:userRouter
}
