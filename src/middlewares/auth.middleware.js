import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import jwt from "jsonwebtoken"
import { Doctor } from "../models/doctor.model.js";

export const verifyJWT = asyncHandler(async (req,_,next)=>{
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")
        if(!token){
            throw new apiError(404,"Unauthorised Request")
        } 

        const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)

        const doctor = await Doctor.findById(decodedToken._id).select("-password -refreshToken")

        if(!doctor){
            throw new apiError(404,"Invalid Acccess Token")
        }
        req.doctor = doctor;
        next();

    } catch (error) {
        throw new apiError(500,error?.message||"Invalid Acess token")
    }
})