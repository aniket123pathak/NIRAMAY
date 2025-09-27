import { Doctor } from "../models/doctor.model.js";
import { Patient } from "../models/patient.model.js";
import { Visit } from "../models/visit.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const createVisit = asyncHandler(async (req,res)=>{
    const { patientId , symptoms , dateOfVisit , medicine , bill} = req.body

    if(
        [patientId , symptoms , dateOfVisit , medicine].some((field)=>field?.trim()==="")
    ){
        throw new apiError(400,"Every field is required")
    }

    const patient = await Patient.findById(patientId);

    if(!patient){
        throw new apiError(400,"Patient does not Exist")
    }

    const visit = await Visit.create({
        patientId,
        symptoms,
        dateOfVisit,
        medicine,
        bill,
    })

    if(!visit){
        throw new apiError(500,"Something went wrong while creating the visit..!!!!")
    }

    const createdVisit = await Visit.findById(visit._id)

    await Patient.findByIdAndUpdate(
        patientId,
        {
            $push : {
                visits :  createdVisit._id
            }
        }
    ) 
})

export {
    createVisit
}