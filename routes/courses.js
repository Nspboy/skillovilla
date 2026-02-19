const router     = require("express").Router();
const Course     = require("../models/Course");
const Enrollment = require("../models/Enrollment");
const { protect, restrictTo } = require("../middleware/auth");

// ── GET /api/courses  (public — with filter, search, pagination) ─────────
router.get("/", async (req, res) => {
  try {
    const { category, level, search, page = 1, limit = 12, featured } = req.query;
    const query = { isPublished: true };

    if (category && category !== "All") query.category = category;
    if (level    && level    !== "All") query.level    = level;
    if (featured === "true")            query.isFeatured = true;
    if (search) query.$text = { $search: search };

    const skip  = (Number(page) - 1) * Number(limit);
    const total = await Course.countDocuments(query);

    const courses = await Course.find(query)
      .populate("instructor", "name avatar")
      .sort({ isFeatured: -1, rating: -1, createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    res.status(200).json({
      status: "success",
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      data: { courses },
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

// ── GET /api/courses/:id  (public) ────────────────────────────────────────
router.get("/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate("instructor", "name avatar bio role");
    if (!course) return res.status(404).json({ status: "fail", message: "Course not found" });
    res.status(200).json({ status: "success", data: { course } });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

// ── POST /api/courses  (admin / mentor only) ──────────────────────────────
router.post("/", protect, restrictTo("admin", "mentor"), async (req, res) => {
  try {
    const course = await Course.create({ ...req.body, instructor: req.user._id });
    res.status(201).json({ status: "success", data: { course } });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
});

// ── PATCH /api/courses/:id  (admin / owning mentor) ───────────────────────
router.patch("/:id", protect, restrictTo("admin", "mentor"), async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true, runValidators: true,
    });
    if (!course) return res.status(404).json({ status: "fail", message: "Course not found" });
    res.status(200).json({ status: "success", data: { course } });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
});

// ── DELETE /api/courses/:id  (admin only) ─────────────────────────────────
router.delete("/:id", protect, restrictTo("admin"), async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.status(204).json({ status: "success", data: null });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

// ── POST /api/courses/:id/enroll  (student, protected) ────────────────────
router.post("/:id/enroll", protect, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ status: "fail", message: "Course not found" });

    const existing = await Enrollment.findOne({ student: req.user._id, course: course._id });
    if (existing) return res.status(400).json({ status: "fail", message: "Already enrolled" });

    const enrollment = await Enrollment.create({
      student:    req.user._id,
      course:     course._id,
      amountPaid: req.body.amountPaid || course.price,
      paymentId:  req.body.paymentId  || "",
    });

    // Increment enrolled count
    await Course.findByIdAndUpdate(course._id, { $inc: { enrolled: 1 } });

    res.status(201).json({ status: "success", data: { enrollment } });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
});

// ── GET /api/courses/:id/enrollments  (admin only) ────────────────────────
router.get("/:id/enrollments", protect, restrictTo("admin"), async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ course: req.params.id })
      .populate("student", "name email phone");
    res.status(200).json({ status: "success", total: enrollments.length, data: { enrollments } });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

// ── PATCH /api/courses/:id/progress  (student) ────────────────────────────
router.patch("/:id/progress", protect, async (req, res) => {
  try {
    const enrollment = await Enrollment.findOne({
      student: req.user._id,
      course:  req.params.id,
    });
    if (!enrollment) return res.status(404).json({ status: "fail", message: "Not enrolled" });

    const { moduleIndex, progress } = req.body;
    if (moduleIndex !== undefined && !enrollment.completedModules.includes(moduleIndex)) {
      enrollment.completedModules.push(moduleIndex);
    }
    if (progress !== undefined) enrollment.progress = progress;
    if (progress === 100) {
      enrollment.status      = "completed";
      enrollment.completedAt = new Date();
    }
    await enrollment.save();
    res.status(200).json({ status: "success", data: { enrollment } });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
});

module.exports = router;
