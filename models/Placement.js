const mongoose = require("mongoose");

// ─── Company (Hiring Partner) ──────────────────────────────────────────────
const companySchema = new mongoose.Schema(
  {
    name:    { type: String, required: true, unique: true, trim: true },
    logo:    { type: String, default: "" },   // initials fallback
    color:   { type: String, default: "#8b5cf6" },
    website: { type: String, default: "" },
    sector:  { type: String, default: "" },
    isActive:{ type: Boolean, default: true },
  },
  { timestamps: true }
);

// ─── Job Listing ───────────────────────────────────────────────────────────
const jobSchema = new mongoose.Schema(
  {
    company:     { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },
    title:       { type: String, required: true },
    description: { type: String, default: "" },
    eligibility: { type: String, default: "" },   // e.g. "Enrolled in Full Stack program"
    type:        { type: String, enum: ["Full-Time", "Internship", "Contract"], default: "Full-Time" },
    location:    { type: String, default: "Remote" },
    package:     { type: String, default: "" },   // "30-45 LPA"
    deadline:    { type: Date },
    isOpen:      { type: Boolean, default: true },
  },
  { timestamps: true }
);

// ─── Placement Record (success story) ─────────────────────────────────────
const placementSchema = new mongoose.Schema(
  {
    student:     { type: mongoose.Schema.Types.ObjectId, ref: "User",    required: true },
    company:     { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },
    course:      { type: mongoose.Schema.Types.ObjectId, ref: "Course",  required: true },
    role:        { type: String, required: true },        // "Software Engineer"
    packageLPA:  { type: String, required: true },        // "45 LPA"
    placedAt:    { type: Date,   default: Date.now },
    testimonial: { type: String, default: "" },
    isPublic:    { type: Boolean, default: true },        // show on placement hall of fame
  },
  { timestamps: true }
);

// ─── Job Application ───────────────────────────────────────────────────────
const applicationSchema = new mongoose.Schema(
  {
    student:    { type: mongoose.Schema.Types.ObjectId, ref: "User",    required: true },
    job:        { type: mongoose.Schema.Types.ObjectId, ref: "Job",     required: true },
    status:     { type: String, enum: ["applied", "shortlisted", "interview", "offered", "rejected"], default: "applied" },
    resumeUrl:  { type: String, default: "" },
    coverLetter:{ type: String, default: "" },
    appliedAt:  { type: Date, default: Date.now },
    updatedAt:  { type: Date, default: Date.now },
  },
  { timestamps: true }
);

applicationSchema.index({ student: 1, job: 1 }, { unique: true });

const Company     = mongoose.model("Company",     companySchema);
const Job         = mongoose.model("Job",         jobSchema);
const Placement   = mongoose.model("Placement",   placementSchema);
const Application = mongoose.model("Application", applicationSchema);

module.exports = { Company, Job, Placement, Application };
