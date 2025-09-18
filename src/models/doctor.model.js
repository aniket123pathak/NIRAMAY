import mongoose, { Schema } from "mongoose";

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
    experience: {
      type: Number,
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
