import express, {Express,Request,Response} from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"
import { connectDb } from "./utils/db";
import bookRouter from "./routes/bookRouter"
import authRouter from "./routes/authRouter"


dotenv.config();

const app: Express = express();

app.use(express.json());
connectDb();

app.use(cors({
    origin : process.env.HOST_URL || '*'
}))
app.use(cookieParser());
app.get("/", (req:Request,res:Response)=>{
    res.send("Welcome!!");
})

app.use("/books",bookRouter);
app.use("/user",authRouter);

const port=process.env.PORT || 8000;

app.listen(port,()=>{
    console.log(`server running on port ${port}`)
})

