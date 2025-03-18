const express = require("express")
const app = express()
const {userRouter} = require("./routes/user")
const {courseRouter} = require("./routes/course")
const {adminRouter} = require("./routes/admin")


app.use("/api/v1/user" , userRouter);
app.use("/api/v1/course" , courseRouter);
app.use("/api/v1/adminRouter" , adminRouter)

async function main(){
    await mongoose.connect("mongodb+srv://apoorv:1234512345@cluster0.itoy9.mongodb.net/coursera-app")
    app.listen(3000);
}

main()