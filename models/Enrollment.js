const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema(
  {
    student:   { type: mongoose.Schema.Types.ObjectId, ref: "User",   required: true },
    course:    { type: mongoose.Schema.Types.ObjectId, ref: "Course",  required: true },
    status:    { type: String, enum: ["active", "completed", "paused", "refunded"], default: "active" },
    progress:  { type: Number, default: 0, min: 0, max: 100 }, // percentage

    // Per-module completion tracking
    completedModules: [{ type: Number }], // list of module order indexes

    // Payment
    amountPaid:  { type: Number, required: true },
    paymentId:   { type: String, default: "" },   // Razorpay/Stripe payment ID
    paymentDate: { type: Date,   default: Date.now },

    // Certificate issued flag
    certificateIssued: { type: Boolean, default: false },
    certificateId:     { type: mongoose.Schema.Types.ObjectId, ref: "Certificate" },

    enrolledAt:  { type: Date, default: Date.now },
    completedAt: { type: Date },
  },
  { timestamps: true }
);

// Prevent duplicate enrollment
enrollmentSchema.index({ student: 1, course: 1 }, { unique: true });

module.exports = mongoose.model("Enrollment", enrollmentSchema);
