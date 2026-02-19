const mongoose = require("mongoose");

const curriculumModuleSchema = new mongoose.Schema({
  title:    { type: String, required: true },
  duration: { type: String },
  topics:   [{ type: String }],
  order:    { type: Number },
});

const courseSchema = new mongoose.Schema(
  {
    title:       { type: String, required: true, trim: true },
    description: { type: String, required: true },
    category:    { type: String, required: true, enum: ["Tech", "Business", "Design", "Marketing"] },
    level:       { type: String, required: true, enum: ["Beginner", "Intermediate", "Advanced"] },
    duration:    { type: String, required: true },   // e.g. "6 months"
    price:       { type: Number, required: true },
    tag:         { type: String, default: "" },       // "Bestseller", "Hot", "Trending", "New", "Premium"
    color:       { type: String, default: "#8b5cf6" },
    icon:        { type: String, default: "⚡" },
    thumbnail:   { type: String, default: "" },

    // Instructor reference (User with role = mentor)
    instructor:  { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    // Aggregated stats (updated via hooks / cron)
    rating:      { type: Number, default: 0, min: 0, max: 5 },
    ratingCount: { type: Number, default: 0 },
    enrolled:    { type: Number, default: 0 },

    // Curriculum
    curriculum: [curriculumModuleSchema],

    // Schedule
    liveClassSchedule: { type: String, default: "" }, // e.g. "Mon, Wed, Fri – 7 PM IST"

    isPublished: { type: Boolean, default: false },
    isFeatured:  { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Text index for search
courseSchema.index({ title: "text", description: "text", category: "text" });

module.exports = mongoose.model("Course", courseSchema);
