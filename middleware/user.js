const jwt = require("jsonwebtoken")
const {JWT_USER_PASSSWORD} = require("../config")



function userMidlleware(req , res ,next){
    const token = requestAnimationFrame.headers.token
    const decoded = jwt.veryfy(token , JWT_USER_PASSSWORD)

    if(decoded){
        req.userId = decoded.id;
        next()
    }else{
        res.status(403).json({
            message:"you are not signed up"
        })
    }
}

module.exports = {
    userMidlleware:userMidlleware
}