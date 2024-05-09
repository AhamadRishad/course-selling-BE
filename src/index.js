import express from "express";
import cookieParser from "cookie-parser";
import userRouter from "../routes/userRoutes.js";
import instructorRouter from "../routes/instructorRoutes.js";
import {connectDb} from "../config/db.js"
// require("dotenv").config()


const app = express()

app.use(express.json())
app.use(cookieParser());
app.use('/api/v1/user',userRouter)
app.use("/api/v1/instructor", instructorRouter);


const PORT = 3000



// require('../config/db')
connectDb();


app.get('/' , (req,res) => {
 res.send('hello world')
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})