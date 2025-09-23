import dotenv from "dotenv"
import mongoose from "mongoose";
import express from "express";
import connectDB from "./db/index.js";
import { app } from "./app.js"
dotenv.config({
    path : "./env"
})


connectDB()
.then(()=>{

    app.on("error",(error)=>{
        console.log(`Error ${error}`)
        throw error
    })

    app.listen(process.env.PORT || 8000 , ()=>{
        console.log(`Server is running On the Port : ${process.env.PORT}`);
    })
})
.catch((error)=>{
    console.log("MONGODB connection Failed !!!",error);
})