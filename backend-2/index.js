import express from "express"
import cors from "cors"

import turfRouter from "./routes/turfRoute.js";
import userRouter from "./routes/userRoute.js";

import adminRouter from "./routes/adminRoute.js";
import { PrismaClient } from "@prisma/client";
import tournamentRouter from "./routes/tournamentRoute.js";

const prisma=new PrismaClient()



/*App Config*/
const app = express();
const PORT = 3000;
/* Middleware */
app.use(express.json())

app.use(cors())
/* DB connection */



/* API endpoints */
app.use("/api/admin",adminRouter)
app.use("/api/turfdetails",turfRouter)
app.use("/api/user",userRouter)
app.use("/api/tournament",tournamentRouter)


app.get("/test",async(req,res)=>{
    const data=await prisma.tournament.deleteMany({
        
})
    return res.json(data)
})


app.listen(PORT,()=>{
    console.log("Running........."+PORT)
});

app.get("/test",(req,res)=>{
    res.send("Hello world from express");
})
