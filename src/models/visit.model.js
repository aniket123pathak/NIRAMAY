import mongoose, { Schema } from "mongoose";

const visitSchema = new Schema(
  {
    patient: {
      type: Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    dateOfVisit: {
      type: Date,
      default: Date.now,
    },
    symptoms: {
      type: [String],
      lowercase: true,
    },
    diagnosis: {
      type: String,
    },
    medicine: {
      type: [String],
    },
    reports: {
      type: [String],
    },
    bill: {
      type: Number,
    },
  },
  { timestamps: true }
);

export const Visit = mongoose.model("Visit", visitSchema);
