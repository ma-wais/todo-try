import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/users.js'
import taskRouter from './routes/task.js'
import { config } from "dotenv";
import cookieParser from 'cookie-parser';
import cors from "cors";

config({
  path: "./data/config.env",
});
const app = express();
app.use(express.json());
app.use(cookieParser())
app.use (cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}))

app.use("/api/v1/users", userRouter)
app.use("/api/v1/task",taskRouter)

mongoose.connect("mongodb://127.0.0.1:27017", {
      dbName: "backendapi",
    }).then(() => console.log("Database Connected")).catch((e) => console.log(e));

app.get("/",(req, res) =>{
    res.send("nice")
})

app.listen(process.env.PORT,()=>{
    console.log( `server is working on, ${process.env.PORT} , in ${process.env.NODE_ENV} mode` );
})
