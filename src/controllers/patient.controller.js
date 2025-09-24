import { Doctor } from "../models/doctor.model.js";
import { Patient } from "../models/patient.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const createPatient = asyncHandler(async (req, res) => {
  const { fullName, address, phoneNo, gender , bloodGroup , medicalHistory , dateOfBirth} = req.body;

  if (
    [fullName, address, phoneNo, gender].some((field) => field?.trim() === "")
  ) {
    throw new apiError(400, "Fill the all required Fields..");
  }

  if (!/^\d{10}$/.test(phoneNo)) {
    throw new apiError(
      400,
      "Phone number must be exactly 10 digits and must not contain letters or symbols."
    );
  }
  const existedPatient = await Patient.findOne({phoneNo});
  if (existedPatient) {
    throw new apiError(400, "Patient already Exist");
  }

  const patient = await Patient.create({
    fullName,
    phoneNo,
    address,
    gender,
    dateOfBirth,
    medicalHistory,
    bloodGroup,
    assignedDoctor : req.doctor._id
  })

  const createdPatient = await Patient.findById(patient._id)

  if(!createdPatient){
    throw new apiError(500,"Something went wrong while creating the Patient")
  }

  await Doctor.findByIdAndUpdate(req.doctor._id,{
    $push : {
        patients : createdPatient._id
    }
  })

  return res
  .status(201)
  .json(
    new apiResponse(
        201,
        createdPatient,
        "Patient created sucessfully.."
    )
  )
});

export { createPatient };
