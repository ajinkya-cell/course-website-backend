const {Router} = require("express")
const adminRouter = Router(); 
const {adminModel, courseModel} = require("../db")
const jwt = require("jsonwebtoken")
const {JWT_ADMIN_PASSWORD} = require("../config");
const { adminMidlleware } = require("../middleware/admin");


adminRouter.use(adminMiddleware);
const app = express()
adminRouter.post("/signup" ,async function(req , res){
    const {email , password , firstName , lastName} = req.body
    //hash the passworrd , put zoc validations and put in the trycatch block
    await adminModel.create({
     email:email,
     password:password,
     firstName:firstName,
     lastName:lastName
    })
 
    res.json({
     message:"signin succeded"
    })
     
 })
 

adminRouter.post("/signin" ,async function(req , res){
    const {email , password} = req.body;
    const admin = await adminModel.findOne({
        email:email , 
        password :password
    });
    //cant use .find because it will give all the passwords to be token thats why we have to use the usermodel.findOne
    if (admin){
       const token =  jwt.sign({
           id:user._id
        } , JWT_ADMIN_PASSWORD)
        res.json({
            token:token
        })
    }else {
        res.status(403).json({
            message:"incorrect credentials"
        })
    }
   
    
})


//creating web3 saas in 6 hours
adminRouter.post("/course" ,adminMidlleware , async function(req , res){
   const adminId = req.userid;
   const {title , description , imageUrl , price} = req.body;
   await courseModel.create({
    title , description , imageUrl , price , creatorId:adminId
   })


   
    res.json({
        message : "course created",
        courseId:course._id
    })
})

adminRouter.put("/course" ,adminMidlleware, async function(req , res){
    const adminId = req.userid;
    const {title , description , imageUrl , price,courseId} = req.body 
    await courseModel.updateOne({
        _id: courseId , 
        creatorId : adminId
        //both of this is important otherwise there is a big vulnerablity that different people admin cant change the diferent admin id
    },{
        title , description , imageUrl , price 
       })
    res.json({
        message : "course updated"
    })
})

adminRouter.get("/course/bulk" , function(req , res){
    res.json({
        message : "signup endpoint"
    })
})


module.exports = {
    adminRouter:adminRouter
}
