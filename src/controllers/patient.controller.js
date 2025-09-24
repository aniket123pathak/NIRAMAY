import { Doctor } from "../models/doctor.model.js";
import { Patient } from "../models/patient.model.js"
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const newPatient = asyncHandler(async(req,res)=>{
    
})

export {
    newPatient
}