import mongoose, { Schema } from "mongoose";

const patientSchema = new Schema(
  {
    fullName: {
      type: String,
      index: true,
      lowercase: true,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
    },
    phoneNo: {
      type: String,
      unique: true,
      required: true,
    },
    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },
    dateOfBirth: {
      type: Date,
    },
    medicalHistory: {
      type: [String],
    },
    visits: [{
      type: Schema.Types.ObjectId,
      ref: "Visit",
      required: true,
    }],
    assignedDoctor: {
      type: Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Patient = mongoose.model("Patient", patientSchema);
