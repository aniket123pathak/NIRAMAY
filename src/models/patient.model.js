import mongoose from "mongoose";

const patientSchema = new Schema({}, {timeStamps : true});

export const Patient = mongoose.model("Patient", patientSchema);
