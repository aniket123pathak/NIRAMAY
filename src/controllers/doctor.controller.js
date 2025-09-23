import { Doctor } from "../models/doctor.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const registerDoctor = asyncHandler(async (req, res) => {
  const {
    userName,
    email,
    phoneNo,
    password,
    fullName,
    qualifications,
    specializations,
  } = req.body;
  if (
    [userName, fullName, email, phoneNo, password].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new apiError(400, "All Fields are Required !!");
  }

  if (!specializations || !qualifications) {
    throw new apiError(400, "Add Specialozation or qualification");
  }

  const existedDoctor = await Doctor.findOne({
    $or: [{ userName }, { email }, { phoneNo }],
  });

  if (!/^\d{10}$/.test(phoneNo)) {
    throw new ApiError(
      400,
      "Phone number must be exactly 10 digits and contain no letters or symbols."
    );
  }

  if (existedDoctor) {
    throw new apiError(
      409,
      "Doctor with the same userName or email already exists!!!"
    );
  }
  const avatarLocalPath = req.file?.path;
  if (!avatarLocalPath) {
    throw new apiError(400, "Avatar file is required");
  }
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  if (!avatar) {
    throw new apiError(400, "Avatar file is required");
  }

  const doctor = await Doctor.create({
    userName: userName.toLowerCase(),
    fullName,
    phoneNo,
    email,
    password,
    avatar: avatar.url,
    specializations,
    qualifications,
  });

  const createdDoctor = await Doctor.findById(doctor._id).select(
    "-password -refreshToken"
  );

  if (!createdDoctor) {
    throw new apiError(
      500,
      "Something went wrong while registering the Doctor.."
    );
  }

  return res
    .status(201)
    .json(
      new apiResponse(201, createdDoctor, "Doctor registered successfully")
    );
});

export { registerDoctor };
