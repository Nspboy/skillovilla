const mongoose = require("mongoose");

// ─── Blog Post ─────────────────────────────────────────────────────────────
const commentSchema = new mongoose.Schema({
  user:      { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  text:      { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const blogSchema = new mongoose.Schema(
  {
    title:       { type: String, required: true, trim: true },
    slug:        { type: String, required: true, unique: true, lowercase: true },
    excerpt:     { type: String, default: "" },
    content:     { type: String, required: true },
    category:    { type: String, required: true, enum: ["Career", "Tech", "Business", "Design", "Marketing"] },
    color:       { type: String, default: "#8b5cf6" },
    coverImage:  { type: String, default: "" },
    author:      { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    tags:        [{ type: String }],
    readTime:    { type: String, default: "5 min" },

    // Stats
    views:       { type: Number, default: 0 },
    likes:       [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments:    [commentSchema],

    isPublished: { type: Boolean, default: false },
    publishedAt: { type: Date },
  },
  { timestamps: true }
);

blogSchema.index({ title: "text", content: "text", tags: "text" });

// ─── Certificate ───────────────────────────────────────────────────────────
const certificateSchema = new mongoose.Schema(
  {
    student:      { type: mongoose.Schema.Types.ObjectId, ref: "User",   required: true },
    course:       { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    enrollment:   { type: mongoose.Schema.Types.ObjectId, ref: "Enrollment", required: true },

    certificateId: { type: String, required: true, unique: true }, // "SV-2026-00123"
    pdfUrl:        { type: String, default: "" },
    issuedAt:      { type: Date, default: Date.now },

    // Verification
    verificationCode: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const Blog        = mongoose.model("Blog",        blogSchema);
const Certificate = mongoose.model("Certificate", certificateSchema);

module.exports = { Blog, Certificate };
