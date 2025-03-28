import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload"
import userRouter from "./routes/user.route.js";
import pinRouter from "./routes/pin.route.js";
import commentRouter from "./routes/comment.route.js";
import boardRouter from "./routes/board.route.js";
import connectDB from "./utils/connectDB.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }))
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(fileUpload({
  useTempFiles: false,
  limits: {
    fileSize: 5 * 1024 * 1024
  },
  abortOnLimit: true,
  responseOnLimit: 'File size exceeds 5MB',
  safeFileNames: true,
  preserveExtension: true
}));
app.use("/users", userRouter);
app.use("/pins", pinRouter);
app.use("/comments", commentRouter);
app.use("/boards", boardRouter);




const PORT = process.env.PORT || 4000;

app.get("/",(req,res) => {
  res.send("ok")
})


app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server running on port ${PORT}`);
});
