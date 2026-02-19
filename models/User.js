const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name:        { type: String, required: true, trim: true },
    email:       { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone:       { type: String, trim: true, default: "" },
    password:    { type: String, required: true, minlength: 6, select: false },
    role:        { type: String, enum: ["student", "mentor", "admin"], default: "student" },
    avatar:      { type: String, default: "" },
    bio:         { type: String, default: "" },
    isVerified:  { type: Boolean, default: false },

    // Student-specific
    enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Enrollment" }],
    certificates:    [{ type: mongoose.Schema.Types.ObjectId, ref: "Certificate" }],
    hoursLearned:    { type: Number, default: 0 },
    sessionsAttended:{ type: Number, default: 0 },

    // OAuth
    googleId:   { type: String, default: "" },
    linkedinId: { type: String, default: "" },

    // Reset password
    resetToken:       { type: String, select: false },
    resetTokenExpiry: { type: Date,   select: false },
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
