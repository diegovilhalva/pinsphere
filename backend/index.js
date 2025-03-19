import  express from "express"
import userRouter from "./routes/user.route.js"

const app = express()


app.use("/users",userRouter)




app.listen(3000, () => {
    console.log("Serving is running")
})