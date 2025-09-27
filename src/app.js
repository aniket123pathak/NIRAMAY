import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import cors from "cors"

const app = express();

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json({
    limit:"16kb"
}))

app.use(express.urlencoded({
    limit:"16kb",
    extended:true
}))

app.use(express.static("public"))
app.use(cookieParser())

//import rotes
import doctorRouter from "./routes/doctor.routes.js"
import patientRouter from "./routes/patient.routes.js"
import visitRouter from "./routes/visit.routes.js"

app.use("/api/v1/doctors",doctorRouter)
app.use("/api/v1/patients",patientRouter)
app.use("/api/v1/visits",visitRouter)

export { app }