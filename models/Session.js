const mongoose = require("mongoose");

// ─── Live Class (group session tied to a Course) ───────────────────────────
const liveClassSchema = new mongoose.Schema(
  {
    course:       { type: mongoose.Schema.Types.ObjectId, ref: "Course",  required: true },
    mentor:       { type: mongoose.Schema.Types.ObjectId, ref: "Mentor",  required: true },
    title:        { type: String, required: true },
    description:  { type: String, default: "" },

    scheduledAt:  { type: Date, required: true },
    durationMins: { type: Number, default: 60 },

    // Stream
    streamUrl:    { type: String, default: "" },  // Mux / HLS URL
    recordingUrl: { type: String, default: "" },
    meetingId:    { type: String, default: "" },  // Zoom / Google Meet ID

    status:       { type: String, enum: ["scheduled", "live", "completed", "cancelled"], default: "scheduled" },

    // Attendance
    attendees:    [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    attendeeCount:{ type: Number, default: 0 },

    // Session notes / resources
    notes:        { type: String, default: "" },
    resources:    [{ name: String, url: String }],
  },
  { timestamps: true }
);

// ─── Mentor 1-on-1 Session ─────────────────────────────────────────────────
const mentorSessionSchema = new mongoose.Schema(
  {
    mentor:      { type: mongoose.Schema.Types.ObjectId, ref: "Mentor", required: true },
    student:     { type: mongoose.Schema.Types.ObjectId, ref: "User",   required: true },

    scheduledAt: { type: Date,   required: true },
    duration:    { type: Number, default: 60 },  // minutes

    topic:       { type: String, default: "" },
    meetingLink: { type: String, default: "" },

    status:      { type: String, enum: ["pending", "confirmed", "completed", "cancelled"], default: "pending" },

    // Post-session
    studentRating:  { type: Number, min: 1, max: 5 },
    studentFeedback:{ type: String, default: "" },
    sessionNotes:   { type: String, default: "" },

    // Payment
    amountPaid: { type: Number, default: 0 },
    paymentId:  { type: String, default: "" },
  },
  { timestamps: true }
);

const LiveClass     = mongoose.model("LiveClass",     liveClassSchema);
const MentorSession = mongoose.model("MentorSession", mentorSessionSchema);

module.exports = { LiveClass, MentorSession };
