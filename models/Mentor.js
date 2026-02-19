const mongoose = require("mongoose");

const availableSlotSchema = new mongoose.Schema({
  day:       { type: String, required: true }, // "Monday", "Tuesday" etc.
  startTime: { type: String, required: true }, // "18:00"
  endTime:   { type: String, required: true }, // "19:00"
  isBooked:  { type: Boolean, default: false },
});

const mentorSchema = new mongoose.Schema(
  {
    user:        { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },

    // Display info
    initials:    { type: String, required: true },   // "AM", "PS"
    color:       { type: String, default: "#8b5cf6" },
    role:        { type: String, required: true },   // "Senior SDE @ Google"
    company:     { type: String, required: true },
    experience:  { type: String, required: true },   // "8 years"
    expertise:   [{ type: String }],                 // ["React", "Node.js"]
    bio:         { type: String, default: "" },
    linkedinUrl: { type: String, default: "" },

    // Pricing
    hourlyRate:  { type: Number, default: 0 },       // ₹ per session

    // Stats (updated by cron / post-session hooks)
    rating:       { type: Number, default: 0, min: 0, max: 5 },
    ratingCount:  { type: Number, default: 0 },
    totalSessions:{ type: Number, default: 0 },

    // Availability
    availableSlots: [availableSlotSchema],

    isActive:    { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Mentor", mentorSchema);
