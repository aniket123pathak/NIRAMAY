import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"

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
    phoneNo : {
      type : String,
      unique : true ,
      required : true
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
    specializations : {
        type : [String],
    },
    qualification : {
        type : [String],  
    },
    experience: {
      type: Number,
      default : 0
    },
    patient: [
      {
        type: Schema.Types.ObjectId,
        ref: "Patient",
      },
    ],
    refresh: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Doctor = mongoose.model("Doctor", doctorSchema);
