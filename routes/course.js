const {Router} = require("express")
const courseRouter = Router();
const {courseModel} =  require("../db")

courseRouter.get("/preview" , function(req , res){
    res.json({
        message : "signup endpoint"
    })
})

courseRouter.post("/purchase" , function(req , res){
    res.json({
        message : "signup endpoint"
    })
})


module.exports = {
    courseRouter:courseRouter
}