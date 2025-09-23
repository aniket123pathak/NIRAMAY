import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const doctorSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      index: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
    },
    phoneNo: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
      index: true,
      trim: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    specializations: {
      type: [String],
      enum: [
        "General Physician",
        "Family Medicine",
        "Pediatrics",
        "Geriatrics",
        "Neurology",
        "Cardiology",
        "Pulmonology",
        "Gastroenterology",
        "Nephrology",
        "Endocrinology",
        "Rheumatology",
        "Oncology",
        "Hematology",
        "Infectious Disease",
        "General Surgery",
        "Orthopedic Surgery",
        "Neurosurgery",
        "Cardiothoracic Surgery",
        "Plastic & Reconstructive Surgery",
        "Urology",
        "ENT (Ear, Nose, Throat)",
        "Ophthalmology",
        "Gynecology",
        "Obstetrics",
        "Neonatology",
        "Pediatric Surgery",
        "Radiology",
        "Pathology",
        "Anesthesiology",
        "Emergency Medicine",
        "Dermatology",
        "Psychiatry",
        "Psychology",
        "Dentistry",
        "Physiotherapy",
        "Sports Medicine",
        "Nutrition & Dietetics",
        "Occupational Medicine",
      ],
    },
    qualifications: {
      type: [String],
      enum: [
        "MBBS",
        "MD",
        "MS",
        "DM",
        "MCh",
        "BDS",
        "MDS",
        "BAMS",
        "BHMS",
        "BUMS",
        "BSMS",
        "BNYS",
        "BPT",
        "MPT",
        "PhD (Medical)",
        "DNB",
        "Diploma in Clinical Medicine",
        "Fellowship",
      ],
    },
    experience: {
      type: Number,
      default: 0,
    },
    patient: [
      {
        type: Schema.Types.ObjectId,
        ref: "Patient",
      },
    ],
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

doctorSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

doctorSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

doctorSchema.methods.generateAccessToken = async function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      userName: this.userName,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: ACCESS_TOKEN_EXPIRY,
    }
  );
};

doctorSchema.methods.generateRefreshToken = async function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const Doctor = mongoose.model("Doctor", doctorSchema);
