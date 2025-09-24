import { Doctor } from "../models/doctor.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const generateAccessAndRefreshToken = async (doctorid) => {
    try {
        const doctor = await Doctor.findById(doctorid);
        
        const accessToken = await doctor.generateAccessToken()
        const refreshToken = await doctor.generateRefreshToken()

        doctor.refreshToken = refreshToken
        await doctor.save({validateBeforeSave : false})
        return {accessToken , refreshToken}
    } catch (error) {
        throw new apiError(500,"Something went worng while Generating the access and the refresh token")
    }
}

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

  if (!/^\d{10}$/.test(phoneNo)) {
    throw new ApiError(
      400,
      "Phone number must be exactly 10 digits and contain no letters or symbols."
    );
  }

  const existedDoctor = await Doctor.findOne({
    $or: [{ userName }, { email }, { phoneNo }],
  });

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

const loginDoctor = asyncHandler(async(req,res)=>{
    const { userName , email , password } = req.body 

    if(!email && !userName){
        throw new apiError(400 , "Enter Email or username")
    }

    const doctor = await Doctor.findOne({
        $or : [{userName} , {email}]
    })

    if(!doctor){
        throw new apiError(400,"Username or Email Does not Exist...")
    }

    const isPasswordValid = await doctor.isPasswordCorrect(password)

    if(!isPasswordValid){
        throw new apiError(400,"Invalid password")
    }

    const {accessToken , refreshToken} = await generateAccessAndRefreshToken(doctor._id)

    const loggedInDoctor = await Doctor.findById(doctor._id).select("-password -refreshToken")

    const options = {
        httpOnly : true,
        secure : true
    }
    
    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new apiResponse(
            200,
            {
                doctor : loggedInDoctor , accessToken , refreshToken
            },
            "User Logged in Successfully"
        )
    )
})

const logoutDoctor = asyncHandler(async(req,res)=>{
    await Doctor.findByIdAndUpdate(
      req.doctor._id,
      {
        $set : {
          refreshToken : undefined
        }
      },
      {
        new : true
      }
    )

    const options = {
        httpOnly : true,
        secure : true
    }

    return res
    .status(200)
    .clearCookie("accessToken",options)
    .clearCookiecookie("refreshToken",options)
    .json(
        new apiResponse(200,{}, "User Logged out Successfully")
    )
})



export { 
    registerDoctor,
    loginDoctor,
    logoutDoctor
};
